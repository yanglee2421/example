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

export default function Page() {
  const theme = useStorageStore((s) => s.theme);
  const [search, setSearch] = React.useState("");
  const [msgList, setMsgList] = React.useState<string[]>([]);
  const [msg, setMsg] = React.useState("");

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: theme.space(3) }}
      >
        {msgList.map((m, i) => (
          <View key={i}>
            <Text
              style={[
                theme.typography.body1,
                { color: theme.palette.text.primary },
              ]}
            >
              {m}
            </Text>
          </View>
        ))}
        <View>
          <Text
            style={[
              theme.typography.body1,
              { color: theme.palette.text.primary },
            ]}
          >
            {msg}
          </Text>
        </View>
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
              setMsg("");

              const res = await fetch(
                "https://spark-api-open.xf-yun.com/v1/chat/completions",
                {
                  method: "POST",
                  body: JSON.stringify({
                    model: "4.0Ultra",
                    messages: [
                      {
                        role: "system",
                        content: "你是知识渊博的助理",
                      },
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

              console.log(res);

              const reader = res.body?.getReader();

              if (reader) {
                const decoder = new TextDecoder();
                let content = "";

                while (true) {
                  const { done, value } = await reader.read();
                  const decocded = decoder.decode(value, { stream: true });
                  console.log(decocded);
                  content += getContent(decocded);
                  setMsg(content);

                  if (done) {
                    setMsg("");
                    setMsgList((prev) => [...prev, content]);
                    break;
                  }
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
    const json = JSON.parse(data.replace("data: ", ""));
    return json.choices[0].delta.content;
  } catch {
    return "";
  }
};
