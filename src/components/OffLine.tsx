import { onlineManager } from "@tanstack/react-query";
import React from "react";

type OffLineProps = React.PropsWithChildren<{
  fallback?: React.ReactNode;
}>;

export const OffLine = (props: OffLineProps) => {
  const isOnline = React.useSyncExternalStore(
    (onStateChange) => {
      const unsubscribe = onlineManager.subscribe(onStateChange);
      return unsubscribe;
    },
    () => onlineManager.isOnline(),
    () => false
  );

  if (isOnline) return props.children;

  return props.fallback;
};
