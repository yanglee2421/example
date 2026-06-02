import { AppHeader } from "@/components/app-header";
import { Button, Column, Host, Icon, List, Row, Spacer, Text } from "@expo/ui";
import { HorizontalDivider, ListItem, Surface } from "@expo/ui/jetpack-compose";
import { fillMaxWidth } from "@expo/ui/jetpack-compose/modifiers";
import * as Application from "expo-application";
import { openBrowserAsync } from "expo-web-browser";
import { Linking } from "react-native";
import { t } from "try";

const githubUrl = "https://github.com/yanglee2421/example";

export default function About() {
  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="About" />
          <List>
            <ListItem>
              <ListItem.OverlineContent>
                <Text>App ID</Text>
              </ListItem.OverlineContent>
              <ListItem.HeadlineContent>
                <Text>{Application.applicationId || ""}</Text>
              </ListItem.HeadlineContent>
              <ListItem.LeadingContent>
                <Icon
                  name={Icon.select({
                    android: import("@expo/material-symbols/id_card.xml"),
                    ios: "0.circle.ar",
                  })}
                />
              </ListItem.LeadingContent>
            </ListItem>
            <HorizontalDivider />
            <ListItem>
              <ListItem.OverlineContent>
                <Text>App Name</Text>
              </ListItem.OverlineContent>
              <ListItem.HeadlineContent>
                <Text>{Application.applicationName || ""}</Text>
              </ListItem.HeadlineContent>
              <ListItem.LeadingContent>
                <Icon
                  name={Icon.select({
                    android: import("@expo/material-symbols/badge.xml"),
                    ios: "0.circle.ar",
                  })}
                />
              </ListItem.LeadingContent>
            </ListItem>
            <HorizontalDivider />
            <ListItem>
              <ListItem.OverlineContent>
                <Text>App Version</Text>
              </ListItem.OverlineContent>
              <ListItem.HeadlineContent>
                <Text>{Application.nativeApplicationVersion || ""}</Text>
              </ListItem.HeadlineContent>
              <ListItem.LeadingContent>
                <Icon
                  name={Icon.select({
                    android: import("@expo/material-symbols/numbers.xml"),
                    ios: "0.circle.ar",
                  })}
                />
              </ListItem.LeadingContent>
            </ListItem>
            <HorizontalDivider />
            <ListItem>
              <ListItem.OverlineContent>
                <Text>Build Version</Text>
              </ListItem.OverlineContent>
              <ListItem.HeadlineContent>
                <Text>{Application.nativeBuildVersion || ""}</Text>
              </ListItem.HeadlineContent>
              <ListItem.LeadingContent>
                <Icon
                  name={Icon.select({
                    android: import("@expo/material-symbols/build.xml"),
                    ios: "0.circle.ar",
                  })}
                />
              </ListItem.LeadingContent>
            </ListItem>
          </List>
          <Spacer flexible />
          <Row style={{ padding: 14 }}>
            <Button
              modifiers={[fillMaxWidth()]}
              variant="text"
              onPress={async () => {
                const [ok] = await t(async () => {
                  await openBrowserAsync(githubUrl, {
                    enableBarCollapsing: true,
                    enableDefaultShareMenuItem: true,
                    createTask: false,
                  });
                });

                if (ok) return;

                Linking.openURL(githubUrl);
              }}
            >
              <Row alignment="center" spacing={8}>
                <Icon
                  name={Icon.select({
                    android: import("@expo/material-symbols/bug_report.xml"),
                    ios: "0.circle.ar",
                  })}
                />
                <Text>Open GitHub</Text>
              </Row>
            </Button>
          </Row>
        </Column>
      </Surface>
    </Host>
  );
}
