import React from "react";
import { Keyboard } from "react-native";

export const useKeyboardVisible = () =>
  React.useSyncExternalStore(
    (onStateChange) => {
      const subscribeShow = Keyboard.addListener(
        "keyboardDidShow",
        onStateChange,
      );
      const subscribeHide = Keyboard.addListener(
        "keyboardDidHide",
        onStateChange,
      );

      return () => {
        subscribeShow.remove();
        subscribeHide.remove();
      };
    },
    () => Keyboard.isVisible(),
  );

export const useKeyboardHeight = () =>
  React.useSyncExternalStore(
    (onStateChange) => {
      const subscribeShow = Keyboard.addListener(
        "keyboardDidShow",
        onStateChange,
      );
      const subscribeHide = Keyboard.addListener(
        "keyboardDidHide",
        onStateChange,
      );

      return () => {
        subscribeShow.remove();
        subscribeHide.remove();
      };
    },
    () => Keyboard.metrics()?.height || 0,
  );
