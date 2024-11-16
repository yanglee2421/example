import i18next from "i18next";
import "intl-pluralrules";
import { initReactI18next } from "react-i18next";
import { en } from "./en";
import { zh } from "./zh";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  ns: ["translation", "common"],
  defaultNS: "translation",
  fallbackNS: "common",
  // lng: "en-US",
  fallbackLng: "en",
  resources: {
    en,
    zh,
  },
});
