import { useTheme } from "@/hooks/useTheme";
import { ActivityIndicator, View } from "react-native";
import { c } from "@/lib/styles";
import React from "react";

type LoadingProps = {
  slotProps?: {
    ActivityIndicator?: React.ComponentProps<typeof ActivityIndicator>;
  };
};

export const Loading = (props: LoadingProps) => {
  const { slotProps = {} } = props;

  const theme = useTheme();

  return (
    <View style={[c.p_6]}>
      <ActivityIndicator
        size="large"
        color={theme.palette.primary.main}
        {...slotProps.ActivityIndicator}
      />
    </View>
  );
};
