// RN Imports
import { Platform } from "react-native";

export function toIsIos() {
  return Platform.OS === "ios";
}
