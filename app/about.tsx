import { SocialIcon, useTheme } from "@rneui/themed";
import { openURL } from "expo-linking";
import { openBrowserAsync } from "expo-web-browser";
import { ScrollView } from "react-native";

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
            openURL(githubUrl);
          }
        }}
        type="github"
      />
    </ScrollView>
  );
}
