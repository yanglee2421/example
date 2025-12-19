import AsyncStorage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import React from "react";

export type Mode = "light" | "dark" | "system";

type Store = {
  qqlykmKey: string;
  mode: Mode;
};

const createInitialState = (): Store => {
  return {
    qqlykmKey: "GY7rE1J3f4ovi4wGONXshLHOHv",
    mode: "system",
  };
};

export const useStorageStore = create<Store>()(
  persist(immer(createInitialState), {
    name: "useStorageStore",
    storage: createJSONStorage(() => AsyncStorage),
    version: 3,
  }),
);

export const useStorageHasHydrated = () =>
  React.useSyncExternalStore(
    (onStoreChange) => useStorageStore.persist.onFinishHydration(onStoreChange),
    () => useStorageStore.persist.hasHydrated(),
    () => false,
  );
