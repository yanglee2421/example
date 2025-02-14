import { android_ripple } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fetch } from "expo/fetch";
import React from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useImmer } from "use-immer";
import Markdown from "react-native-markdown-display";
import { useLocalSearchParams } from "expo-router";

type LatestAnswerProps = {
  text: string;
};

const LatestAnswer = (props: LatestAnswerProps) => {
  const [msg, setMsg] = React.useState("");
  const theme = useTheme();

  React.useEffect(() => {
    if (msg === props.text) return;
    if (!props.text.startsWith(msg)) return;

    const timer = setTimeout(() => {
      setMsg((p) => props.text.slice(0, p.length + 1));
    }, 4);

    return () => {
      clearTimeout(timer);
    };
  }, [msg, props.text]);

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
      {msg}
    </Markdown>
  );
};

type Message = {
  assistant: string;
  user: string;
};

export default function Page() {
  const [search, setSearch] = React.useState("");

  const scrollRef = React.useRef<ScrollView>(null);
  const timerRef = React.useRef<NodeJS.Timeout | number>(0);

  const local = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const [msgList, setMsgList] = useImmer<Message[]>([]);

  console.log(local.id);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setSearch("");
    setMsgList((d) => {
      d.push({ user: search, assistant: "" });
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
          last.assistant = buf
            .split("data:")
            .map((i) => getContent(i))
            .filter(Boolean)
            .join("");
        }
      });

      if (readable.done) {
        break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: theme.spacing(3) }}
        onContentSizeChange={() => {
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
          }, 16);
        }}
      >
        {msgList.map((m, i) => (
          <View key={i}>
            {!!m.user && (
              <View>
                <Text
                  style={[
                    theme.typography.overline,
                    { color: theme.palette.text.secondary },
                  ]}
                >
                  You:
                </Text>
                <Text
                  selectable
                  style={[
                    theme.typography.body1,
                    { color: theme.palette.text.primary },
                  ]}
                >
                  {m.user}
                </Text>
              </View>
            )}
            {!!m.assistant && (
              <View>
                <Text
                  style={[
                    theme.typography.overline,
                    { color: theme.palette.text.secondary },
                  ]}
                >
                  Assistant:
                </Text>
                <LatestAnswer text={m.assistant} />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View
        style={[
          styles.chatFormWrapper,
          {
            paddingInline: theme.spacing(3),
            paddingBlock: theme.spacing(3),

            borderTopColor: theme.palette.divider,
          },
        ]}
      >
        <View
          style={[
            styles.chatForm,
            {
              borderColor: theme.palette.divider,
              borderRadius: theme.shape.borderRadius,
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
    </View>
  );
}

const getContent = (data: string) => {
  try {
    const json = JSON.parse(data.replace("data:", ""));
    return json.choices[0].delta.content;
  } catch {
    return "";
  }
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  chatFormWrapper: {
    borderTopWidth: 1,
  },
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
