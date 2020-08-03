import React from 'react';

import { useTranslation } from 'react-i18next';
// helper para validar si un campo esta incompleto
import { revisarAlerta } from '../../helpers/helpers';

const Input = ({ containerClass, labelClass, labelValue, tipo, value, name, placeholder, inputClass, shadow, onChange, hasLabel = true, }) => {

    // translator
    const { t } = useTranslation();

    return (
        <div className={containerClass}>
            {hasLabel ? <label className={labelClass} htmlFor={name}>{t(labelValue)}</label> : null}
            <input
                type={tipo}
                name={name}
                className={`${inputClass} ${revisarAlerta(shadow, value)}`}
                placeholder={t(placeholder)}
                value={tipo === 'submit' ? t(value) : value}
                autoComplete="off"
                onChange={tipo === 'submit' ? null : e => onChange(e)}
            />
        </div>
    )
}

export default Input;