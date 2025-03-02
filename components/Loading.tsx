import { useTheme } from "@/hooks/useTheme";
import { ActivityIndicator, View } from "react-native";
import { c } from "@/lib/styles";

export const Loading = () => {
  const theme = useTheme();

  return (
    <View style={[c.p_6]}>
      <ActivityIndicator size="large" color={theme.palette.primary.main} />
    </View>
  );
};
