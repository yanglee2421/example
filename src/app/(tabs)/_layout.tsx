import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs labelStyle={{}}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="atom">
        <NativeTabs.Trigger.Label>Atom</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="science" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="apps">
        <NativeTabs.Trigger.Label>Apps</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="apps" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
