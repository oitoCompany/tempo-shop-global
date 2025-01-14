import i18next from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
  en: {
    translation: './lang/en.json'
  },
  he: {
    translation: './lang/en.json'
  }
};

i18next
  .use(initReactI18next) 
  .init({
    resources,
    lng: "he",

    keySeparator: false, 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18next;