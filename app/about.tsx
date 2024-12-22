import { MaterialCommunityIcons } from "@expo/vector-icons";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useThemeStore } from "@/hooks/useThemeStore";
import { android_ripple } from "@/lib/utils";
import * as Application from "expo-application";

const githubUrl = "https://github.com/yanglee2421/example";

const infos = [
  {
    label: "App ID",
    value: Application.applicationId,
  },
  {
    label: "App Name",
    value: Application.applicationName,
  },
  {
    label: "App Version",
    value: Application.nativeApplicationVersion,
  },
  {
    label: "Build Version",
    value: Application.nativeBuildVersion,
  },
];

export default function About() {
  const theme = useThemeStore((s) => s.theme);

  return (
    <ScrollView contentContainerStyle={{ padding: theme.spacing(3) }}>
      {infos.map((i) => (
        <View
          key={i.value}
          style={[
            styles.listItem,
            {
              paddingInline: theme.spacing(0),
              paddingBlock: theme.spacing(1.5),
            },
          ]}
        >
          <Text
            style={[
              theme.typography.body1,
              { color: theme.palette.text.primary },
            ]}
          >
            {i.label}
          </Text>
          <Text
            style={[
              theme.typography.body2,
              { color: theme.palette.text.secondary },
            ]}
          >
            {i.value}
          </Text>
        </View>
      ))}

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

const styles = StyleSheet.create({
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

    borderWidth: 1,
    borderColor: "transparent",
  },
});
