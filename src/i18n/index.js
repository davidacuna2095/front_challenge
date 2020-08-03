import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from '../config/i18n';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'es',
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });


export default i18n;
