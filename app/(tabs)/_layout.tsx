import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import { TabBarIcon } from "@/components";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "#8E8E8F",
        // tabBarBackground() {
        //   return <View style={styles.tabBarBg}></View>;
        // },
        tabBarInactiveBackgroundColor: "rgba(255,255,255,0.5)",
        tabBarActiveBackgroundColor: "rgba(255,255,255,0.5)",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon({ color }) {
            return <TabBarIcon name="code" color={color} />;
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
                    />
                  )}
                </Pressable>
              </Link>
            );
          },
          // tabBarBackground() {
          //   return <View style={styles.tabBarBg}></View>;
          // },
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon({ color }) {
            return <TabBarIcon name="code" color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="roll"
        options={{
          title: "Roll",
          tabBarIcon({ color }) {
            return <TabBarIcon name="gamepad" color={color} />;
          },
        }}
      />
    </Tabs>
  );
}

// const styles = StyleSheet.create({
//   tabBarBg: {
//     position: "absolute",
//     height: 180,
//     // backgroundColor: "rgba(0,0,0,.5)",
//     // backgroundColor: "red",
//   },
// });
