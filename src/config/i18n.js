import enTranslation from '../i18n/en.json';
import esTranslation from '../i18n/es.json';


export const defaultLocale = "es";
export const resources = {
    en: {
        translation: enTranslation,
    },
    es: {
        translation: esTranslation,
    },
};

export const locale = [
    {
        name: 'Español',
        code: 'es'
    },
    {
        name: 'English',
        code: 'en'
    },
];