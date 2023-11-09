import { ExpoConfig, ConfigContext } from "expo/config";

export default (configCtx: ConfigContext): ExpoConfig => {
  // ** ConfigContext
  const { config } = configCtx;

  return {
    ...config,
    slug: "my-app",
    name: "My App",
    plugins: [
      [
        "@stripe/stripe-react-native",
        {
          merchantIdentifier: "",
          enableGooglePay: true,
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "bd2fa275-d2d7-4d8b-99b0-c5837c92ca9c",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.gmail.yanglee2421.cn.myapp",
    },
  };
};
