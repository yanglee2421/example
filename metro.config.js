/** @type {import('expo/metro-config').MetroConfig} */
const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

/**
 * Drizzle need this to work with sql files
 */
config.resolver.sourceExts.push("sql");

module.exports = wrapWithReanimatedMetroConfig(config);
