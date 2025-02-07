import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// Static translations
import english from "./locales/en/translation.json";
import spanish from "./locales/es/translation.json";
import mandarin from "./locales/zh/translation.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Default fallback language
    lng: "en", // Initial language
    debug: true, // Enable debug logs for development
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    resources: {
      en: {
        translation: english,
      },
      es: {
        translation: spanish,
      },
      zh: {
        translation: mandarin,
      },
    },
    ns: ["translation"], // Default namespace
    defaultNS: "translation", // Set default namespace
  });

i18n.languages = ["en", "es", "zh"]; // Supported languages

export default i18n;
