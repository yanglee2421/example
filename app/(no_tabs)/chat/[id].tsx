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
import { useImmer } from "use-immer";
import Markdown from "react-native-markdown-display";
import { useLocalSearchParams } from "expo-router";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import * as schemas from "@/db/schema";
import { Loading } from "@/components/Loading";

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
  enable?: boolean;
};

const MessageUI = (props: MessageUIProps) => {
  const [msg, setMsg] = React.useState("");
  const theme = useTheme();

  React.useEffect(() => {
    if (!props.enable) return;
    if (msg === props.text) return;
    if (!props.text.startsWith(msg)) return;

    const timer = setTimeout(() => {
      setMsg((p) => props.text.slice(0, p.length + 1));
    }, 4);

    return () => {
      clearTimeout(timer);
    };
  }, [msg, props.text, props.enable]);

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
      {props.enable ? msg : props.text}
    </Markdown>
  );
};

type Message = {
  assistant: string;
  user: string;
};

type ChatUIProps = {
  messages: Message[];
  chatId: number;
  refreshing: boolean;
  onRefresh(): void;
};

const ChatUI = (props: ChatUIProps) => {
  const [search, setSearch] = React.useState("");

  const scrollRef = React.useRef<FlatList>(null);
  const timerRef = React.useRef<NodeJS.Timeout | number>(0);

  const theme = useTheme();
  const queryClient = useQueryClient();
  const [msgList, setMsgList] = useImmer<Message[]>(props.messages);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setSearch("");
    setMsgList((d) => {
      d.push({ user: search, assistant: "" });
    });

    await db.insert(schemas.messageTable).values({
      chatId: props.chatId,
      role: "user",
      content: search,
    });

    const res = await fetch(
      "https://spark-api-open.xf-yun.com/v1/chat/completions",
      {
        method: "POST",
        body: JSON.stringify({
          model: "4.0Ultra",
          messages: [
            ...msgList
              .flatMap((i) => Object.entries(i))
              .map(([key, val]) => ({
                role: key,
                content: val,
              })),
            {
              role: "user",
              content: search,
            },
          ],
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

    if (!reader) {
      return;
    }

    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const readable = await reader.read();
      const decocded = decoder.decode(readable.value, {
        stream: true,
      });
      console.log("decocded", decocded);
      buf += decocded;

      setMsgList((d) => {
        const last = d.at(-1);

        if (last) {
          last.assistant = getMessage(buf);
        }
      });

      if (readable.done) {
        const content = getMessage(buf);

        await db.insert(schemas.messageTable).values({
          chatId: props.chatId,
          role: "assistant",
          content,
        });
        await db
          .update(schemas.chatTable)
          .set({ id: props.chatId, name: content });
        await queryClient.invalidateQueries({
          queryKey: fetchChat(props.chatId).queryKey,
        });
        break;
      }
    }
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
        onContentSizeChange={() => {
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
          }, 16);
        }}
        style={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "auto",
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0)",
        }}
        data={msgList}
        renderItem={(i) => (
          <View key={i.index} style={{ paddingInline: theme.spacing(3) }}>
            {!!i.item.user && (
              <View>
                <Text
                  style={[
                    theme.typography.overline,
                    { color: theme.palette.text.secondary },
                  ]}
                >
                  You:
                </Text>
                <MessageUI text={i.item.user} />
              </View>
            )}
            {!!i.item.assistant && (
              <View>
                <Text
                  style={[
                    theme.typography.overline,
                    { color: theme.palette.text.secondary },
                  ]}
                >
                  Assistant:
                </Text>
                <MessageUI text={i.item.assistant} />
              </View>
            )}
          </View>
        )}
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
            value={search}
            onChangeText={setSearch}
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

const fetchChat = (id: number) =>
  queryOptions({
    queryKey: ["db.query.chatTable.findFirst", id],
    queryFn() {
      return db.query.chatTable.findFirst({
        where: eq(schemas.chatTable.id, id),
        with: {
          messages: true,
        },
      });
    },
  });

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
      messages={chat.data.messages.map((i) => {
        if (i.role === "user") {
          return {
            user: i.content || "",
            assistant: "",
          };
        }

        return {
          user: "",
          assistant: i.content || "",
        };
      })}
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
