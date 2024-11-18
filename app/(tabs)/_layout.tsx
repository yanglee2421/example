import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: true }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                name="home"
                size={props.size}
                color={props.color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="atom"
        options={{
          title: "Atom",
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                name="atom"
                size={props.size}
                color={props.color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="apps"
        options={{
          title: "Apps",
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                name="apps"
                size={props.size}
                color={props.color}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
