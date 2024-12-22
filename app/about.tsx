import { MaterialCommunityIcons } from "@expo/vector-icons";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import { Linking, Pressable, ScrollView, Text } from "react-native";
import { useThemeStore } from "@/hooks/useThemeStore";
import { android_ripple } from "@/lib/utils";

const githubUrl = "https://github.com/yanglee2421/example";

export default function About() {
  const theme = useThemeStore((s) => s.theme);

  return (
    <ScrollView contentContainerStyle={{ padding: theme.spacing(3) }}>
      <Pressable
        onPress={async () => {
          try {
            await openBrowserAsync(githubUrl, {
              toolbarColor: "#000",
              enableBarCollapsing: true,
              enableDefaultShareMenuItem: true,

              createTask: false,
            });
          } catch {
            Linking.openURL(githubUrl);
          }
        }}
        style={[
          {
            borderWidth: 1,
            borderColor: "transparent",

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing(2),

            paddingInline: theme.spacing(4),
            paddingBlock: theme.spacing(2),
          },
        ]}
        android_ripple={android_ripple(theme.palette.action.focus)}
      >
        <MaterialCommunityIcons
          name="github"
          color={theme.palette.text.primary}
          size={theme.spacing(5)}
          style={[{ marginInlineStart: theme.spacing(-1) }]}
        />
        <Text
          style={[
            theme.typography.button,
            {
              color: theme.palette.text.primary,
            },
          ]}
        >
          &copy;2024 by Yotu_Lee
        </Text>
      </Pressable>
    </ScrollView>
  );
}
