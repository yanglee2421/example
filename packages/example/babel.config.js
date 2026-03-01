module.exports = function (api) {
  api.cache(true);
  return {
    /**
     * zod need unstable_transformImportMeta to be set to true
     */
    presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
    plugins: [
      /**
       * Drizzle need this to load sql files
       * and run migrations
       * @link https://orm.drizzle.team/docs/connect-expo-sqlite#update-config-files
       */
      ["inline-import", { extensions: [".sql"] }],
      "react-native-worklets/plugin",
    ],
  };
};
