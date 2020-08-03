import enTranslation from '../i18n/en.json';
import esTranslation from '../i18n/es.json';


export const defaultLocale = "es";

// Langs disponibles, con map a json de isiomas correspondiente
export const resources = {
    en: {
        translation: enTranslation,
    },
    es: {
        translation: esTranslation,
    },
};

// Array con detalles de cada idioma
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