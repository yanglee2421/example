import { android_ripple } from "@/lib/utils";
import { useStorageStore } from "@/hooks/useStorageStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fetch } from "expo/fetch";
import React from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useImmer } from "use-immer";

type LatestAnswerProps = {
  text: string;
};

const LatestAnswer = (props: LatestAnswerProps) => {
  const [msg, setMsg] = React.useState("");
  const timer = React.useRef<NodeJS.Timeout | number>(0);
  const theme = useStorageStore((s) => s.theme);

  React.useEffect(() => {
    if (msg === props.text) {
      clearInterval(timer.current);
      return;
    }

    timer.current = setInterval(() => {
      setMsg((p) => props.text.slice(0, p.length + 1));
    }, 4);

    return () => {
      clearInterval(timer.current);
    };
  }, [msg, props.text]);

  return (
    <Text
      style={[theme.typography.body1, { color: theme.palette.text.primary }]}
    >
      {msg}
    </Text>
  );
};

type Message = {
  assistant: string;
  user: string;
};

export default function Page() {
  const theme = useStorageStore((s) => s.theme);
  const [search, setSearch] = React.useState("");
  const [msgList, setMsgList] = useImmer<Message[]>([]);
  const scrollRef = React.useRef<ScrollView>(null);
  const timerRef = React.useRef(0);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: theme.space(3) }}
        onContentSizeChange={() => {
          cancelAnimationFrame(timerRef.current);
          timerRef.current = requestAnimationFrame(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
          });
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
                {i + 1 === msgList.length ? (
                  <LatestAnswer text={m.assistant} />
                ) : (
                  <Text
                    style={[
                      theme.typography.body1,
                      { color: theme.palette.text.primary },
                    ]}
                  >
                    {m.assistant}
                  </Text>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          borderWidth: 1,
          borderColor: "transparent",
          borderBlockStartColor: theme.palette.divider,
          elevation: 0,
          paddingInline: theme.space(3),
          paddingBlock: theme.space(2),
        }}
      >
        <View>
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
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ marginInlineStart: "auto" }}></View>
          <Pressable
            onPress={async () => {
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
                    Authorization:
                      "Bearer rCJALwydCHKaiiBolPGv:gxneLXlgwLjQQcsNnnEW",
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
            }}
            android_ripple={android_ripple(theme.palette.action.focus)}
            style={{
              flex: 0,
              justifyContent: "center",
              alignItems: "center",

              borderRadius: 99999,
              borderWidth: 1,
              borderColor: "transparent",

              width: theme.space(10),
              height: theme.space(10),

              overflow: "hidden",
            }}
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
}

const getContent = (data: string) => {
  try {
    const json = JSON.parse(data.replace("data:", ""));
    return json.choices[0].delta.content;
  } catch {
    return "";
  }
};

const example = `data:{"code":0,"message":"Success","sid":"cha000b000c@dx1905cf38fc8b86d552","id":"cha000b000c@dx1905cf38fc8b86d552","created":1719546385,"choices":[{"delta":{"role":"assistant","content":"你好"},"index":0}]}
data:{"code":0,"message":"Success","sid":"cha000b000c@dx1905cf38fc8b86d552","id":"cha000b000c@dx1905cf38fc8b86d552","created":1719546385,"choices":[{"delta":{"role":"assistant","content":"，很高兴"},"index":0}]}
data:{"code":0,"message":"Success","sid":"cha000b000c@dx1905cf38fc8b86d552","id":"cha000b000c@dx1905cf38fc8b86d552","created":1719546385,"choices":[{"delta":{"role":"assistant","content":"为你解答问题"},"index":0}]}
data:{"code":0,"message":"Success","sid":"cha000b000c@dx1905cf38fc8b86d552","id":"cha000b000c@dx1905cf38fc8b86d552","created":1719546385,"choices":[{"delta":{"role":"assistant","content":"。\n"},"index":0}]}
data:{"code":0,"message":"Success","sid":"cha000b000c@dx1905cf38fc8b86d552","id":"cha000b000c@dx1905cf38fc8b86d552","created":1719546387,"choices":[{"delta":{"role":"assistant","content":"我是讯飞星火认知大模型，由科大讯飞构建的认知智能系统。"},"index":0}]}
data:{"code":0,"message":"Success","sid":"cha000b000c@dx1905cf38fc8b86d552","id":"cha000b000c@dx1905cf38fc8b86d552","created":1719546388,"choices":[{"delta":{"role":"assistant","content":"我具备与人类进行自然交流的能力，可以高效地满足各领域的认知智能需求。"},"index":0}]}
data:{"code":0,"message":"Success","sid":"cha000b000c@dx1905cf38fc8b86d552","id":"cha000b000c@dx1905cf38fc8b86d552","created":1719546389,"choices":[{"delta":{"role":"assistant","content":"无论你有什么问题或者需要帮助的地方，我都将尽我所能提供支持和解决方案。请随时告诉我你的需求！"},"index":0}]}
data:{"code":0,"message":"Success","sid":"cha000b000c@dx1905cf38fc8b86d552","id":"cha000b000c@dx1905cf38fc8b86d552","created":1719546389,"choices":[{"delta":{"role":"assistant","content":""},"index":0}],"usage":{"prompt_tokens":6,"completion_tokens":68,"total_tokens":74}}
data:[DONE]`;

void example;
