import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import languageDetector from "i18next-browser-languagedetector";

import uzTranslation from "./locale/uz.json";
import ruTranslation from "./locale/ru.json";
import enTranslation from "./locale/en.json";

const language = localStorage.getItem('fruteacorpLng') || 'uz'

i18n
.use(Backend)
.use(languageDetector)
.use(initReactI18next)
.init({
    fallbackLng : 'uz',
    lng: language,
    debug: false,
    resources: {
        uz: {translation: uzTranslation},
        ru: {translation: ruTranslation},
        en: {translation: enTranslation}
    }
})

export default i18n