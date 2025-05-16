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
    // Tailwind object-fit utilities
    // https://tailwindcss.com/docs/object-fit
    object_contain: {
      objectFit: "contain", // object-contain
    },
    object_cover: {
      objectFit: "cover", // object-cover
    },
    object_fill: {
      objectFit: "fill", // object-fill
    },
    object_none: {
      objectFit: "none", // object-none
    },
    object_scale_down: {
      objectFit: "scale-down",
    },
    // Tailwind overflow utilities
    // https://tailwindcss.com/docs/overflow
    overflow_hidden: {
      overflow: "hidden", // overflow-hidden
    },
    overflow_visible: {
      overflow: "visible", // overflow-visible
    },
    overflow_scroll: {
      overflow: "scroll", // overflow-scroll
    },
    // Tailwind position utilities
    // https://tailwindcss.com/docs/position
    static: {
      position: "static", // position-static
    },
    absolute: {
      position: "absolute", // position-absolute
    },
    relative: {
      position: "relative", // position-relative
    },
    // Tailwind top/right/bottom/left/inset utilities
    // https://tailwindcss.com/docs/top-right-bottom-left
    top_0: { top: 0 }, // top-0
    right_0: { right: 0 }, // right-0
    bottom_0: { bottom: 0 }, // bottom-0
    left_0: { left: 0 }, // left-0
    inset_0: { inset: 0 }, // inset-0
  });
};
