import { Alert } from "react-native";

export const nativeConfirm = (
  title: string,
  message: string,
  cancelText?: string,
  confirmText?: string,
) => {
  return new Promise<void>((resolve, reject) => {
    Alert.alert(title, message, [
      {
        text: cancelText || "Cancel",
        onPress: reject,
      },
      {
        text: confirmText || "Confirm",
        onPress: () => resolve(),
      },
    ]);
  });
};
