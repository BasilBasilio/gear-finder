import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEng from './Translation/en.json';
import translationIta from './Translation/ita.json';

const resources = {
  en: {
    translation: translationEng,
  },
  ita: {
    translation: translationIta,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lng') || 'en',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
