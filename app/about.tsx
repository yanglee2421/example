import React from "react";
import { Linking, ScrollView } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import { Button } from "tamagui";
import { Github } from "@tamagui/lucide-icons";

const githubUrl = "https://github.com/yanglee2421";

export default function About() {
  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      <Button
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
        icon={<Github />}
      >
        &copy;2024 by Yotu_Lee
      </Button>
    </ScrollView>
  );
}
