import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => {
      return {
        count: 0,
        setCount(count) {
          if (typeof count === "number") {
            return set({ count });
          }

          return set({
            count: get().count + 1,
          });
        },
      };
    },
    {
      name: "rn-zustand-persister",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export interface ThemeStore {
  count: number;
  setCount(count?: number): void;
}
