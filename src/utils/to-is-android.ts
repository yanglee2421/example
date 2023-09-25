// RN Imports
import { Platform } from "react-native";

export function toIsAndroid() {
  return Platform.OS === "android";
}
