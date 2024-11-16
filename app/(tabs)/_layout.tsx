import { Icon, useTheme } from "@rneui/themed";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.divider,
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.black,
        },

        sceneStyle: {
          backgroundColor: theme.colors.background,
        },

        tabBarStyle: {
          borderTopWidth: 1,
          borderBlockStartColor: theme.colors.divider,
          backgroundColor: theme.colors.background,
        },
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon({ color }) {
            return <Icon name="home" size={28} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="qrcode"
        options={{
          title: "QRcode Ccaner",
          tabBarIcon({ color }) {
            return <Icon name="qrcode-scan" size={28} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Settings",
          tabBarIcon({ color }) {
            return <Icon name="cog-outline" size={28} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
