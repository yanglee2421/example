import { Tabs } from "expo-router";
import { getToken, useTheme } from "tamagui";
import { Atom, Home, LayoutGrid } from "@tamagui/lucide-icons";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.background.get(),
        },
        headerTitleStyle: {
          color: theme.color.get(),
        },

        sceneStyle: {
          backgroundColor: theme.background.get(),
        },

        tabBarActiveTintColor: getToken("$palette.primary"),
        tabBarStyle: {
          backgroundColor: theme.background.get(),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon(props) {
            return <Home size={props.size} color={props.color} />;
          },
        }}
      />
      <Tabs.Screen
        name="atom"
        options={{
          title: "Atom",
          tabBarIcon(props) {
            return <Atom size={props.size} color={props.color} />;
          },
        }}
      />
      <Tabs.Screen
        name="apps"
        options={{
          title: "Apps",
          tabBarIcon(props) {
            return <LayoutGrid size={props.size} color={props.color} />;
          },
        }}
      />
    </Tabs>
  );
}
