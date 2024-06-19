import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { AuthGuard } from "@/components/guard/AuthGuard";

export default function TabsLayout() {
  return (
    <AuthGuard>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="cog" color={color} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
