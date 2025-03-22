import { android_ripple } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fetch } from "expo/fetch";
import React from "react";
import {
  Keyboard,
  Pressable,
  RefreshControl,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { fetchChat, useCreateMessage } from "@/lib/chat";

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

type Message = {
  id: number;
  role: string | null;
  content: string | null;
};

type ChatUIProps = {
  messages: Message[];
  chatId: number;
  refreshing: boolean;
  onRefresh(): void;
};

const ChatUI = (props: ChatUIProps) => {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  const scrollRef = React.useRef<FlatList>(null);
  const timerRef = React.useRef<number>(0);

  const theme = useTheme();
  const createMessage = useCreateMessage();

  const scrollToBottom = () => {
    cancelAnimationFrame(timerRef.current);
    timerRef.current = requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setQuestion("");

    await createMessage.mutateAsync({
      chatId: props.chatId,
      role: "user",
      content: question,
    });

    const messages = [
      ...props.messages,
      {
        role: "user",
        content: question,
      },
    ];

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
      }
    );

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No reader");

    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const readable = await reader.read();
      if (readable.done) break;

      buf += decoder.decode(readable.value, { stream: true });
      setAnswer(getMessage(buf));
      scrollToBottom();
    }

    setAnswer("");
    buf += decoder.decode();
    const content = getMessage(buf);
    await createMessage.mutateAsync({
      chatId: props.chatId,
      role: "assistant",
      content,
    });
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
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            colors={[theme.palette.primary.main]}
          />
        }
        ref={scrollRef}
        style={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "auto",
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0)",
        }}
        data={props.messages}
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
                {i.item.role}:
              </Text>
              <MessageUI text={i.item.content} />
            </View>
          </View>
        )}
        ListFooterComponent={
          <>
            {!!answer && (
              <View style={{ paddingInline: theme.spacing(3) }}>
                <View>
                  <Text
                    style={[
                      theme.typography.overline,
                      { color: theme.palette.text.secondary },
                    ]}
                  >
                    Assistant:
                  </Text>
                  <MessageUI text={answer} />
                </View>
              </View>
            )}
          </>
        }
      />

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
  const local = useLocalSearchParams<{ id: string }>();
  const chatId = +local.id;
  const fetcher = fetchChat(chatId);
  const chat = useQuery(fetcher);
  const theme = useTheme();

  if (chat.isPending) return <Loading />;

  if (chat.isError) return null;

  if (!chat.data) return null;

  return (
    <ChatUI
      messages={chat.data.messages}
      chatId={chatId}
      refreshing={chat.isRefetching}
      onRefresh={() => chat.refetch()}
    />
  );
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
