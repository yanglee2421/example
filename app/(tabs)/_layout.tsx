import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: true }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="atom"
        options={{
          title: "Atom",
        }}
      />
      <Tabs.Screen
        name="apps"
        options={{
          title: "Apps",
        }}
      />
    </Tabs>
  );
}
