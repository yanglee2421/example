const { getDefaultConfig } = require("expo/metro-config");
const { wrapWithReanimatedMetroConfig } = require(
  "react-native-reanimated/metro-config",
);

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("sql"); // <--- add this

module.exports = wrapWithReanimatedMetroConfig(config);
