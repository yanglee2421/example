import { useStorageStore } from "@/hooks/useStorageStore";
import React from "react";
import { StatusBar } from "react-native";

export function ThemeProvider(props: React.PropsWithChildren) {
  const theme = useStorageStore((s) => s.theme);

  return (
    <>
      <StatusBar
        animated
        barStyle={theme.palette.mode === "dark"
          ? "light-content"
          : "dark-content"}
        backgroundColor={theme.palette.background.default}
      />
      {props.children}
    </>
  );
}
