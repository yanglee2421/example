import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "react-native";

export const Loading = () => {
  const theme = useTheme();

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
