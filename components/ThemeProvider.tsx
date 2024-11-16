import {
  createTheme,
  ThemeProvider as RneuiThemeProvider,
} from "@rneui/themed";
import React from "react";
import { useColorScheme } from "react-native";

const commonTheme = {
  lightColors: {
    primary: "#6366f1",
    secondary: "#9ca3af",
    error: "#ef4444",
    warning: "#f59e0b",
    success: "#22c55e",

    divider: "#e4e4e7",
    background: "#ffffff",
    white: "#ffffff",
    black: "#09090b",
  },
  darkColors: {
    primary: "#6366f1",
    secondary: "#9ca3af",
    error: "#ef4444",
    warning: "#f59e0b",
    success: "#22c55e",

    divider: "#27272a",
    background: "#09090b",
    white: "#09090b",
    black: "#fafafa",
  },
  components: {
    Icon: {
      type: "material-community",
    },
    Text: { style: { fontFamily: "SpaceMono" } },
  },
};

const lightTheme = createTheme({
  mode: "light",
  ...commonTheme,
});

const darkTheme = createTheme({
  mode: "dark",
  ...commonTheme,
});

export const ThemeProvider = (props: React.PropsWithChildren) => {
  const colorScheme = useColorScheme();

  return (
    <RneuiThemeProvider
      theme={colorScheme === "dark" ? darkTheme : lightTheme}
    >
      {props.children}
    </RneuiThemeProvider>
  );
};
