// RN Imports
import { useFocusEffect } from "@react-navigation/native";

// React Imports
import React from "react";

export function useRefreshOnFocus(onFocus: OnFocus) {
  const isFirstRef = React.useRef(true);

  const focusEffect = React.useCallback(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return;
    }

    onFocus();
  }, [onFocus]);

  useFocusEffect(focusEffect);
}

type OnFocus = () => void;
