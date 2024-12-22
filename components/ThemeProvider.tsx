import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { useThemeStore, darkTheme, lightTheme } from "@/hooks/useThemeStore";

export function ThemeProvider(props: React.PropsWithChildren) {
  const theme = useThemeStore((s) => s.theme);
  const set = useThemeStore((s) => s.set);
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    set((d) => {
      if (colorScheme === "dark") {
        d.theme = darkTheme;
      } else {
        d.theme = lightTheme;
      }
    });
    return;
  }, [colorScheme, set]);

  return (
    <>
      <StatusBar
        animated
        barStyle={
          theme.palette.mode === "dark" ? "light-content" : "dark-content"
        }
        backgroundColor={theme.palette.background.default}
      />
      {props.children}
    </>
  );
}
