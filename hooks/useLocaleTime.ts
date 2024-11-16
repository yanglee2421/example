import React from "react";

export function useLocaleTime(languageTag: string) {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      let animate = 0;

      const run = () => {
        animate = requestAnimationFrame(run);
        onStoreChange();
      };

      run();

      return () => cancelAnimationFrame(animate);
    },
    () => getTimeString(languageTag),
    () => getTimeString(languageTag),
  );
}

function getTimeString(languageTag: string) {
  return new Date().toLocaleTimeString(languageTag, {
    timeStyle: "short",
    hour12: false,
  });
}
