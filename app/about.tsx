import React from "react";
import { Linking, Pressable, ScrollView, Text } from "react-native";
import { openBrowserAsync } from "expo-web-browser";

const githubUrl = "https://github.com/yanglee2421";

export default function About() {
  const [width, setWidth] = React.useState(0);

  return (
    <ScrollView>
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
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        android_ripple={{
          foreground: true,
          borderless: false,
          radius: width,
          color: "#000",
        }}
      >
        <Text>&copy;2024 by Yotu_Lee</Text>
      </Pressable>
    </ScrollView>
  );
}
