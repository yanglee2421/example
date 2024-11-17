import { onAnimationFrame } from "@/lib/utils";
import React from "react";

export function useLocaleDate() {
  return React.useSyncExternalStore(
    onAnimationFrame,
    () => getDateString(),
    () => getDateString(),
  );
}

function getDateString() {
  return new Date().toLocaleDateString(void 0, {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
}
