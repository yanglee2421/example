import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import React from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabTextProps = React.PropsWithChildren<{
  href: string;
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}>;

const TabText = (props: TabTextProps) => {
  const theme = useTheme();
  const pathname = usePathname();

  const isActive = pathname === props.href;
  const color = isActive
    ? theme.palette.primary.main
    : theme.palette.text.primary;

  return (
    <>
      <MaterialCommunityIcons
        name={props.name}
        style={{
          color,
          fontSize: theme.typography.h5.fontSize,
        }}
      />
      <Text
        style={[
          theme.typography.body2,
          {
            color,
          },
        ]}
      >
        {props.children}
      </Text>
    </>
  );
};

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.palette.background.default }}
      >
        <TabSlot />
      </SafeAreaView>
      <TabList
        style={{
          height: theme.spacing(14),
          backgroundColor: theme.palette.background.paper,
          borderTopColor: theme.palette.divider,
          borderTopWidth: 1,
        }}
      >
        <TabTrigger
          name="index"
          href="/"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          android_ripple={{ color: theme.palette.action.focus }}
        >
          <TabText href="/" name="home">
            home
          </TabText>
        </TabTrigger>
        <TabTrigger
          name="atom"
          href="/atom"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          android_ripple={{ color: theme.palette.action.focus }}
        >
          <TabText href="/atom" name="atom">
            atom
          </TabText>
        </TabTrigger>

        <TabTrigger
          name="apps"
          href="/apps"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          android_ripple={{ color: theme.palette.action.focus }}
        >
          <TabText href="/apps" name="apps">
            apps
          </TabText>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

type TabBarButtonProps = React.PropsWithChildren<{
  onPress?(e: NonNullable<unknown>): void;
  style?: NonNullable<unknown> | null;
}>;

const TabBarButton = (props: TabBarButtonProps) => {
  const theme = useTheme();

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
};
