import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function TabsLayout() {
  return (
    <NativeTabs labelStyle={{}}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="home" renderingMode="template" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="atom">
        <NativeTabs.Trigger.Label>Atom</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="science" renderingMode="template" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="apps">
        <NativeTabs.Trigger.Label>Apps</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="apps" renderingMode="template" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
