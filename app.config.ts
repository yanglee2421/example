import type { ExpoConfig } from "expo/config";
export default {
  name: "example",
  slug: "example",
  scheme: "example",
  version: "0.0.3",
  orientation: "portrait",
  icon: "./assets/3.jpg",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.jpg",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  // Platform
  ios: {
    supportsTablet: true,
    bundleIdentifier: "app.vercel.yanglee2421",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/3.jpg",
      backgroundColor: "#ffffff",
    },
    package: "app.vercel.yanglee2421",
  },

  // Expo SDK Config
  plugins: [
    "expo-font",
    "expo-router",
    "expo-localization",
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
        recordAudioAndroid: true,
      },
    ],
  ],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "8b802171-0869-40bc-a384-ca9d63811f2b",
    },
  },
  newArchEnabled: true,
} satisfies ExpoConfig;
