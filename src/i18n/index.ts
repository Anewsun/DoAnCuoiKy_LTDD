import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationVi from "./vi.json";

const resources = {
  vi: {
    translation: translationVi,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "vi",
  keySeparator: ".",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
