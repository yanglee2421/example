import React from "react";

export function useLocaleDate(languageTag: string) {
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
    () => getDateString(languageTag),
    () => getDateString(languageTag),
  );
}

function getDateString(languageTag: string) {
  return new Date().toLocaleDateString(languageTag, {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
}
