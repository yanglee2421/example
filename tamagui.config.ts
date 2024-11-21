import { color, radius, size, space, themes, zIndex } from "@tamagui/themes";
import { createTamagui, createTokens } from "tamagui";
import defaultConfig from "@tamagui/config/v3";

const tokens = createTokens({
  size,
  space,
  zIndex,
  color,
  radius,

  palette: {
    primary: "#6366f1",
  },
});

export const config = createTamagui({
  ...defaultConfig,
  themes,
  tokens,
});

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {
    ignoreLint: void;
  }
}
