import { android_ripple } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fetch } from "expo/fetch";
import React from "react";
import {
  Keyboard,
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { useLocalSearchParams } from "expo-router";
import { db } from "@/db/db";
import * as schemas from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import type { Message, MessageInAPI } from "@/db/schema";

const getContent = (data: string) => {
  try {
    const json = JSON.parse(data.replace("data:", ""));
    return json.choices[0].delta.content;
  } catch {
    return "";
  }
};

const getMessage = (buf: string) =>
  buf
    .split("data:")
    .map((i) => getContent(i))
    .filter(Boolean)
    .join("");

type MessageUIProps = {
  text: string;
};

const MessageUI = (props: MessageUIProps) => {
  const theme = useTheme();

  return (
    <Markdown
      style={{
        body: {
          ...theme.typography.body1,
          color: theme.palette.text.primary,
        },
        fence: {
          ...theme.typography.body1,
          color: theme.palette.info.dark,
        },
        code_inline: {
          ...theme.typography.body1,
          color: theme.palette.info.dark,
        },
      }}
    >
      {props.text}
    </Markdown>
  );
};

const ChatUI = () => {
  const [question, setQuestion] = React.useState("");
  const [sendButtonStatus, setSendButtonStatus] = React.useState<
    "idle" | "loading" | "streaming"
  >("idle");

  const scrollRef = React.useRef<FlatList>(null);
  const timerRef = React.useRef(0);
  const controllerRef = React.useRef<AbortController | null>(null);

  const theme = useTheme();
  const local = useLocalSearchParams<{ id: string }>();

  const completionId = +local.id;

  const completion = useLiveQuery(
    db.query.completionTable.findFirst({
      where: eq(schemas.completionTable.id, completionId),
      // Will not trigger re-render when messages change
      // with: { messages: true },
    }),
    [completionId],
  );

  // Use this instead of completion.data?.messages to get the latest messages
  const completionMessages = useLiveQuery(
    db.query.messageTable.findMany({
      where: eq(schemas.messageTable.completionId, completionId),
    }),
    [completionId],
  );

  const scrollToBottom = () => {
    cancelAnimationFrame(timerRef.current);
    timerRef.current = requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  };

  const runFetch = async (id: number, messages: MessageInAPI[]) => {
    controllerRef.current = new AbortController();
    const res = await fetch(
      "https://spark-api-open.xf-yun.com/v1/chat/completions",
      {
        method: "POST",
        body: JSON.stringify({
          model: "4.0Ultra",
          messages,
          stream: true,
          tools: [
            {
              type: "web_search",
              web_search: {
                enable: false,
              },
            },
          ],
        }),
        headers: {
          Authorization: "Bearer rCJALwydCHKaiiBolPGv:gxneLXlgwLjQQcsNnnEW",
        },
        signal: controllerRef.current.signal,
      },
    );

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No reader");

    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const readable = await reader.read();
      if (readable.done) break;

      buf += decoder.decode(readable.value, { stream: true });
      await db
        .update(schemas.messageTable)
        .set({
          answer: getMessage(buf),
          status: "pending",
        })
        .where(eq(schemas.messageTable.id, id));
    }

    // Clear stream cache in decoder
    buf += decoder.decode();
    await db
      .update(schemas.messageTable)
      .set({
        answer: getMessage(buf),
        status: "success",
      })
      .where(eq(schemas.messageTable.id, id));
  };

  const runChat = async (id: number, messages: MessageInAPI[]) => {
    setSendButtonStatus("loading");
    await runFetch(id, messages).catch(async (e) => {
      await db
        .update(schemas.messageTable)
        .set({
          answer: e.message,
          status: "error",
        })
        .where(eq(schemas.messageTable.id, id));
    });
    setSendButtonStatus("idle");
  };

  const runRetry = async (id: number, messages: MessageInAPI[]) => {
    await db
      .update(schemas.messageTable)
      .set({ status: "loading" })
      .where(eq(schemas.messageTable.id, id));
    await runChat(id, messages);
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setQuestion("");

    await db.transaction(async (tx) => {
      if (!completion.data) throw new Error("No completion data");

      const messages = completionMessages.data
        .flatMap((i) => [
          { role: "user" as const, content: i.question || "" },
          { role: "assistant" as const, content: i.answer || "" },
        ])
        .concat({ role: "user", content: question });

      const [{ id }] = await tx
        .insert(schemas.messageTable)
        .values({
          question,
          questionDate: new Date(),
          status: "loading",
          completionId: completion.data.id,
          messages,
        })
        .returning({ id: schemas.messageTable.id });

      await runChat(id, messages);
    });
  };

  const handleRetry = async (id: number, messages: MessageInAPI[]) => {
    await db.transaction(async (tx) => {
      await runRetry(id, messages);
    });
  };

  const renderMessages = () => {
    if (completion.error) {
      return <Text>{completion.error.message}</Text>;
    }

    if (!completion.data) {
      return <Text>No Data</Text>;
    }

    return (
      <FlatList<Message>
        ref={scrollRef}
        style={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "auto",
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0)",
        }}
        data={completionMessages.data}
        keyExtractor={(i) => i.id.toString()}
        renderItem={(i) => (
          <View key={i.item.id} style={{ paddingInline: theme.spacing(3) }}>
            <View>
              <Text
                style={[
                  theme.typography.overline,
                  { color: theme.palette.text.secondary },
                ]}
              >
                {i.item.question}:
              </Text>
              <MessageUI text={i.item.answer || ""} />
            </View>
          </View>
        )}
      />
    );
  };

  return (
    <View
      style={{
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0)",
      }}
    >
      {renderMessages()}
      <View
        style={[
          {
            paddingInline: theme.spacing(2),
            paddingBlock: theme.spacing(1.5),
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0)",
            borderBlockStartColor: theme.palette.divider,
          },
        ]}
      >
        <View
          style={{
            paddingInline: theme.spacing(1.5),
            paddingBlockStart: theme.spacing(1),
          }}
        >
          <TextInput
            value={question}
            onChangeText={setQuestion}
            onFocus={scrollToBottom}
            multiline
            placeholder="Search"
            placeholderTextColor={theme.palette.text.secondary}
            style={[
              theme.typography.body1,
              { color: theme.palette.text.primary },
            ]}
            selectionColor={theme.palette.primary.main}
          />
        </View>

        <View style={styles.charFormBar}>
          <View style={styles.chatFormBarSpace}></View>
          <Pressable
            onPress={handleSubmit}
            disabled={sendButtonStatus !== "idle"}
            android_ripple={android_ripple(theme.palette.action.focus)}
            style={[
              styles.chatSubmit,
              {
                width: theme.spacing(10),
                height: theme.spacing(10),
              },
            ]}
          >
            <MaterialCommunityIcons
              size={theme.typography.h5.fontSize}
              color={theme.palette.primary.main}
              name="send-outline"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default function Page() {
  return <ChatUI />;
}

const styles = StyleSheet.create({
  chatForm: {
    elevation: 0,
  },
  charFormBar: {
    flexDirection: "row",
  },
  chatFormBarSpace: {
    marginInlineStart: "auto",
  },
  chatSubmit: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 99999,
    borderWidth: 1,
    borderColor: "transparent",

    overflow: "hidden",
  },
});
