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
  };
};
