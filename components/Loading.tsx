import { useStorageStore } from "@/hooks/useStorageStore";
import { Text, View } from "react-native";

export const Loading = () => {
  const theme = useStorageStore((s) => s.theme);

  return (
    <View style={[{ padding: theme.space(6) }]}>
      <Text
        style={[theme.typography.body1, { color: theme.palette.text.primary }]}
      >
        Loading...
      </Text>
    </View>
  );
};
