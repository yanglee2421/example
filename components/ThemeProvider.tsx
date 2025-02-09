import React from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, ThemeContext } from "@/hooks/useTheme";
import { useStorageStore, type Mode } from "@/hooks/useStorageStore";

function modeToHasSelector(mode: Mode, isDark: boolean) {
  switch (mode) {
    case "system":
      return isDark;

    case "dark":
      return true;
    case "light":
      return false;
  }
}

export function ThemeProvider(props: React.PropsWithChildren) {
  const colorScheme = useColorScheme();
  const mode = useStorageStore((s) => s.mode);
  const isDark = colorScheme === "dark";
  const theme = modeToHasSelector(mode, isDark) ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
}
