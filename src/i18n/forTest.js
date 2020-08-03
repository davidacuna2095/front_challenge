import i18n from 'i18next';

i18n
    .init({
        resources: {
            en: {},
            de: {}
        },
        lng: 'es',
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;