import { StyleSheet } from "react-native";

export const useClassNames = () => {
  const rem = 16;
  return StyleSheet.create({
    aspect_square: {
      aspectRatio: "1/1",
    },
    aspect_video: {
      aspectRatio: "16/9",
    },
    aspect_auto: {
      aspectRatio: "auto",
    },
    box_border: {
      boxSizing: "border-box",
    },
    box_content: {
      boxSizing: "content-box",
    },
    flex: {
      display: "flex",
    },
    hidden: {
      display: "none",
    },
    contents: {
      display: "contents",
    },
    isolate: {
      isolation: "isolate",
    },
    isolation_auto: {
      isolation: "auto",
    },
    object_contain: {
      objectFit: "contain",
    },
    object_cover: {
      objectFit: "cover",
    },
    object_fill: {
      objectFit: "fill",
    },
    object_none: {
      objectFit: "none",
    },
    object_scale_down: {
      objectFit: "scale-down",
    },
    overflow_hidden: {
      overflow: "hidden",
    },
    overflow_visible: {
      overflow: "visible",
    },
    overflow_scroll: {
      overflow: "scroll",
    },
    static: {
      position: "static",
    },
    absolute: {
      position: "absolute",
    },
    relative: {
      position: "relative",
    },
    top_0: { top: 0 },
    right_0: { right: 0 },
    bottom_0: { bottom: 0 },
    left_0: { left: 0 },
    inset_0: { inset: 0 },
    inset_x_0: { insetInline: 0 },
    inset_y_0: { insetBlock: 0 },
  });
};
