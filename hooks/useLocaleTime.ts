import { onAnimationFrame } from "@/lib/utils";
import React from "react";

export function useLocaleTime() {
  return React.useSyncExternalStore(
    onAnimationFrame,
    () => getTimeString(),
    () => getTimeString(),
  );
}

function getTimeString() {
  return new Date().toLocaleTimeString(void 0, {
    timeStyle: "short",
    hour12: false,
  });
}
