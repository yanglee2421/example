import { onAnimationFrame } from "@/lib/utils";
import React from "react";

export const useLocaleTime = () =>
  React.useSyncExternalStore(
    onAnimationFrame,
    () => getTimeString(),
    () => getTimeString(),
  );

const getTimeString = () =>
  new Date().toLocaleTimeString(void 0, {
    timeStyle: "short",
    hour12: false,
  });
