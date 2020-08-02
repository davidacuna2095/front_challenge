import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import '../styles/styles_filter.scss';

const useFilter = (contenido, key, label) => {

    // -- STATES
    // Palabra por la que se esta filtrando
    const [filtro, setFiltro] = useState('');
    // Array de filtered values de acuerdo a la palabra del state de filtro
    const [filteredValues, setFilteredValues] = useState(contenido);

    // Translator
    const { t } = useTranslation();

    useEffect(() => {
        if (contenido) {
            setFilteredValues(contenido);
            setFiltro('');
        }
        // eslint-disable-next-line
    }, [contenido]);

    // Detecta cambio en input de filter para realizar filtrado sobre array actual de albumes
    const onChangeFilter = e => {
        const palabra = e.target.value.toLowerCase();
        setFiltro(palabra);

        // no aplicar filtro si es vacio
        if (palabra === '') {
            setFilteredValues(contenido);
            return;
        }

        // match de la palabra con alguno de los atributos de album
        let filteredArray = contenido.filter(value => {
            return Object.keys(value).some(key =>
                value[key].toString().toLowerCase().includes(palabra)
            );
        });
        setFilteredValues(filteredArray);

    };


    const Filtrado = () => (
        <span key={`${key}Span`} className="input_container">
            <input
                key={key}
                type="input"
                className="inputMeli"
                placeholder="Filtra acá"
                name={`${key}Input`}
                id={`${key}Input`}
                autoFocus={filtro.length > 0}
                autoComplete="off"
                value={filtro}
                onChange={e => onChangeFilter(e)}
            />
            <label
                key={`${key}Label`}
                htmlFor={`${key}Input`}
                className="labelMeli"
            >{t(`GENERAL.${label}`)}</label>
        </span>
    );

    return [filteredValues, Filtrado];

}

export default useFilter;
