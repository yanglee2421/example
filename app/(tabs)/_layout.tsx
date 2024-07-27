import { Icon, useTheme } from "@rneui/themed";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.theme.colors.primary,
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
          title: "qrcode",
          tabBarIcon({ color }) {
            return <Icon name="qrcode" size={28} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Settings",
          tabBarIcon({ color }) {
            return <Icon name="account" size={28} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
