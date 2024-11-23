import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useStorageStore } from "@/hooks/useStorageStore";
import { Pressable } from "react-native";
import React from "react";

export default function TabsLayout() {
  const theme = useStorageStore((s) => s.theme);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.palette.background.paper,
          borderBottomColor: theme.palette.divider,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: theme.palette.text.primary,
          fontFamily: theme.typography.body1.fontFamily,
        },

        sceneStyle: {
          backgroundColor: theme.palette.background.default,
        },

        tabBarActiveTintColor: theme.palette.primary.main,
        tabBarStyle: {
          backgroundColor: theme.palette.background.paper,
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.body1.fontFamily,
        },
        tabBarButton(props) {
          return (
            <TabBarButton {...props}>
              {props.children}
            </TabBarButton>
          );
        },
      }}
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

function TabBarButton(
  props: React.PropsWithChildren<{
    onPress?(e: NonNullable<unknown>): void;
    style?: NonNullable<unknown> | null;
  }>,
) {
  const theme = useStorageStore((s) => s.theme);

  return (
    <Pressable
      onPress={props.onPress}
      style={props.style}
      android_ripple={{
        borderless: false,
        foreground: true,
        color: theme.palette.action.focus,
      }}
    >
      {props.children}
    </Pressable>
  );
}
