import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  useTabTrigger,
} from "expo-router/ui";
import React from "react";
import { Text } from "react-native";

type TabTextProps = React.PropsWithChildren<{
  name: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}>;

const TabText = (props: TabTextProps) => {
  const theme = useTheme();
  const trigger = useTabTrigger({ name: props.name });

  const color = trigger.trigger?.isFocused
    ? theme.palette.primary.main
    : theme.palette.text.primary;

  return (
    <>
      <MaterialCommunityIcons
        name={props.icon}
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
      <TabSlot />
      <TabList
        style={{
          height: theme.spacing(14),
          backgroundColor: theme.palette.background.paper,
          borderTopColor: theme.palette.divider,
          borderTopWidth: 1,

          elevation: 12,
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
          <TabText icon="home" name="index">
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
          <TabText icon="atom" name="atom">
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
          <TabText icon="apps" name="apps">
            apps
          </TabText>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
