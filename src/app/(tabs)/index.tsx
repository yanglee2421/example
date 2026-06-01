import { AppHeader } from "@/components/app-header";
import { Column, Host, Text } from "@expo/ui";
import { Surface } from "@expo/ui/jetpack-compose";

export default function HomeScreen() {
  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="Home" showBack={false} />
          <Text>Home</Text>
        </Column>
      </Surface>
    </Host>
  );
}
