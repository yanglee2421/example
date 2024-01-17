// Expo Imports
import { Link, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Theme Imports
import Colors from "@/constants/Colors";

// RN Imports
import { Pressable, useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "#8E8E8F",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon({ color }) {
            return <TabBarIcon name="code" color={color}></TabBarIcon>;
          },
          headerRight() {
            return (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    ></FontAwesome>
                  )}
                </Pressable>
              </Link>
            );
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon({ color }) {
            return <TabBarIcon name="code" color={color}></TabBarIcon>;
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="roll"
        options={{
          title: "Roll",
          tabBarIcon({ color }) {
            console.log(color);

            return <TabBarIcon name="gamepad" color={color}></TabBarIcon>;
          },
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
