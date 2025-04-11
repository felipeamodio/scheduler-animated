import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        add_more: "Add more",
        from: "From:",
        to: "To:",
        monday: "Monday",
        tuesday: "Tuesday",
        Wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
      },
    },
    pt: {
      translation: {
        add_more: "Adicionar",
        from: "De:",
        to: "Para:",
        monday: "Segunda-feira",
        tuesday: "Terça-feira",
        Wednesday: "Quarta-feira",
        thursday: "Quinta-feira",
        friday: "Sexta-feira",
        saturday: "Sábado",
        sunday: "Domingo",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
