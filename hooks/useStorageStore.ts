import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type WritableDraft } from "immer";
import React from "react";

type StoreState = {
  qqlykmKey: string;
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
      return { set, qqlykmKey: "" };
    }),
    {
      name: "useStorageStore",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useStorageHasHydrated = () =>
  React.useSyncExternalStore(
    (onStoreChange) => useStorageStore.persist.onFinishHydration(onStoreChange),
    () => useStorageStore.persist.hasHydrated(),
    () => false,
  );