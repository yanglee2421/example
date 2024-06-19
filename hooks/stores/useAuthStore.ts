import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware/persist";

export const useAuthStore = create(
  persist(
    (set, get) => {
      return {};
    },
    {
      name: "useAuthStore",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
