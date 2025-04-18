import AsyncStorage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type WritableDraft } from "immer";
import React from "react";

export type Mode = "light" | "dark" | "system";
type StoreState = {
  qqlykmKey: string;
  mode: Mode;
};
type StoreActions = {
  set(
    nextStateOrUpdater:
      | StoreState
      | Partial<StoreState>
      | ((state: WritableDraft<StoreState>) => void)
  ): void;
};
type Store = StoreState & StoreActions;

export const useStorageStore = create<Store>()(
  persist(
    immer((set) => {
      return {
        set,
        qqlykmKey: "GY7rE1J3f4ovi4wGONXshLHOHv",
        mode: "system",
      };
    }),
    {
      name: "useStorageStore",
      storage: createJSONStorage(() => AsyncStorage),
      version: 3,
    }
  )
);

export const useStorageHasHydrated = () =>
  React.useSyncExternalStore(
    (onStoreChange) => useStorageStore.persist.onFinishHydration(onStoreChange),
    () => useStorageStore.persist.hasHydrated(),
    () => false
  );
