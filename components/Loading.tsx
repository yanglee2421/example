import { useThemeStore } from "@/hooks/useThemeStore";
import { Text, View } from "react-native";

export const Loading = () => {
  const theme = useThemeStore((s) => s.theme);

  return (
    <View style={[{ padding: theme.spacing(6) }]}>
      <Text
        style={[theme.typography.body1, { color: theme.palette.text.primary }]}
      >
        Loading...
      </Text>
    </View>
  );
};
