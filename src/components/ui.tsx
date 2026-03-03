import { useTheme } from "@/hooks/useTheme";
import { View } from "react-native";

export const Divider = () => {
  const theme = useTheme();
  return <View style={{ height: 1, backgroundColor: theme.palette.divider }} />;
};
