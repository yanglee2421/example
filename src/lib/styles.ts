import { StyleSheet } from "react-native";

export const c = StyleSheet.create({
  // Layout
  static: {
    position: "static",
  },
  absolute: {
    position: "absolute",
  },
  relative: {
    position: "relative",
  },

  // Flexbox
  flex_1: {
    flex: 1,
  },

  // Spacing
  p_px: {
    padding: 1,
  },
  px_px: {
    paddingBlock: 1,
  },
  py_px: {
    paddingBlock: 1,
  },
  p_6: {
    padding: 4 * 6,
  },

  // Typography
  text_center: {
    textAlign: "center",
  },

  //
  shadow_2xs: {
    elevation: 2,
  },
  shadow_xs: {
    elevation: 4,
  },
  shadow_sm: {
    elevation: 6,
  },
  shadow_md: {
    elevation: 6,
  },
  shadow_lg: {
    elevation: 8,
  },
});
