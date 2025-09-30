import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import esFile from "../../assets/i18n/es.json";

export const multiLanguageModuleInitialize = () => {
  i18n.use(initReactI18next).init({
    resources: {
      es: { translation: esFile },
    },
    lng: "es",
    interpolation: {
      escapeValue: false,
    },
  });
};
