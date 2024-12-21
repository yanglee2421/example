import { onAnimationFrame } from "@/lib/utils";
import React from "react";

export const useLocaleDate = () =>
  React.useSyncExternalStore(
    onAnimationFrame,
    () => getDateString(),
    () => getDateString(),
  );

const getDateString = () =>
  new Date().toLocaleDateString(void 0, {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
