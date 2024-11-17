import { SocialIcon, useTheme } from "@rneui/themed";
import { openBrowserAsync } from "expo-web-browser";
import { Linking, ScrollView } from "react-native";

const githubUrl = "https://github.com/yanglee2421";

export default function About() {
  const { theme } = useTheme();

  return (
    <ScrollView>
      <SocialIcon
        onPress={async () => {
          try {
            await openBrowserAsync(githubUrl, {
              toolbarColor: theme.colors.background,
              enableBarCollapsing: true,
              enableDefaultShareMenuItem: true,

              createTask: false,
            });
          } catch {
            Linking.openURL(githubUrl);
          }
        }}
        type="github"
      />
    </ScrollView>
  );
}
