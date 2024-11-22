import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type WritableDraft } from "immer";
import React from "react";

const htmlFontSize = 16;

const darkTheme = {
  palette: {
    mode: "dark",

    common: {
      black: "#000",
      white: "#fff",
    },

    primary: {
      main: "#90caf9",
      light: "#e3f2fd",
      dark: "#42a5f5",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#ce93d8",
      light: "#f3e5f5",
      dark: "#ab47bc",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    warning: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },

    grey: {},

    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)",
    },

    divider: "rgba(255, 255, 255, 0.12)",

    background: {
      paper: "#121212",
      default: "#121212",
    },

    action: {
      active: "#fff",
      activatedOpacity: 0.24,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.12,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
    },
  },

  shape: {
    borderRadius: 4,
  },

  space(abs: number) {
    return abs * 4;
  },

  typography: {
    htmlFontSize,
    fontFamily: "SpaceMono",
    fontSize: 14,
    fontWeightLight: "300" as const,
    fontWeightRegular: "400" as const,
    fontWeightMedium: "500" as const,
    fontWeightBold: "700" as const,

    body1: {
      fontFamily: "SpaceMono",
      fontWeight: "400" as const,
      fontSize: htmlFontSize * 1,
      lineHeight: htmlFontSize * 1 * 1.5,
      letterSpacing: htmlFontSize * 1 * 0.00938,
    },
    button: {
      fontFamily: "SpaceMono",
      fontWeight: "500",
      fontSize: htmlFontSize * 0.875,
      lineHeight: htmlFontSize * 0.875 * 1.75,
      letterSpacing: htmlFontSize * 0.875 * 0.02857,
      textTransform: "uppercase" as const,
    },
  },
};

type StoreState = {
  qqlykmKey: string;

  theme: typeof darkTheme;
};
type StoreActions = {
  set(
    nextStateOrUpdater:
      | StoreState
      | Partial<StoreState>
      | ((state: WritableDraft<StoreState>) => void),
  ): void;
};
type Store = StoreState & StoreActions;

export const useStorageStore = create<Store>()(
  persist(
    immer((set) => {
      return {
        set,
        qqlykmKey: "",
        theme: darkTheme,
      };
    }),
    {
      name: "useStorageStore",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);

export const useStorageHasHydrated = () =>
  React.useSyncExternalStore(
    (onStoreChange) => useStorageStore.persist.onFinishHydration(onStoreChange),
    () => useStorageStore.persist.hasHydrated(),
    () => false,
  );
