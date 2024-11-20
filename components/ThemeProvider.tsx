import React from "react";
import { TamaguiProvider, Theme } from "tamagui";
import { config } from "@/tamagui.config";
import { useColorScheme } from "react-native";

export function ThemeProvider(props: React.PropsWithChildren) {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme}>
        {props.children}
      </Theme>
    </TamaguiProvider>
  );
}
