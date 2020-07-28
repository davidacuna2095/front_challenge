import React, { useState } from 'react';
import { locale } from '../../config/i18n';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import './Board.scss';


const Navbar = () => {

    const { t, i18n } = useTranslation();

    const onChangeLanguaje = (lang) => {
        i18n.changeLanguage(lang);
    };

    const [usuario, setUsuario] = useState({
        nombre: 'Guest'
    });

    const cerrarSesion = () => {

    }

    return (
        <header className="nav-header">
            {usuario ?
                <p className="nombre-usuario">{t(`HEADER.bienvenido`)} <span>{usuario.nombre}</span></p> : null
            }

            <nav className="nav-util">
                <select
                    className={`form-control`}
                    name="language"
                    onChange={e => onChangeLanguaje(e.target.value)}
                >
                    {locale.map(item => (
                        <option
                            key={item.code}
                            value={item.code}
                        >{t(`LANGS.${item.code}`)}</option>
                    ))}
                </select>

                <Link
                    to={"/login"}
                    onClick={() => { cerrarSesion() }}
                >{t(`HEADER.logout`)}</Link>
            </nav>
        </header>
    )
};

export default Navbar;