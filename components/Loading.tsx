import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "react-native";
import { c } from "@/lib/styles";

export const Loading = () => {
  const theme = useTheme();

  return (
    <View style={[c.p_6]}>
      <Text
        style={[theme.typography.body1, { color: theme.palette.text.primary }]}
      >
        Loading...
      </Text>
    </View>
  );
};
