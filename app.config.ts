import type { ExpoConfig } from "expo/config";
export default {
  name: "blank-rn",
  slug: "blank-rn",
  scheme: "blank-rn",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.yanglee2421.blankrn",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.yanglee2421.blankrn",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: ["expo-router", "expo-localization"],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "15d0ab82-88a8-46b0-a9be-1c1df8bf84e7",
    },
  },
} satisfies ExpoConfig;
