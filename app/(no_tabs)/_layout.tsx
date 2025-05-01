import { useTheme } from "@/hooks/useTheme";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const theme = useTheme();

  return <Slot />;
}
