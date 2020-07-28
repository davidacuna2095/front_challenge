import React, { useState } from 'react';
import { locale } from '../../config/i18n';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import './Board.scss';


const Navbar = () => {

    // Translator
    const { t, i18n } = useTranslation();

    // onChange de cambio de idioma de la app
    const onChangeLanguaje = (lang) => {
        i18n.changeLanguage(lang);
    };

    const [usuario, setUsuario] = useState({
        nombre: 'Guest'
    });

    // acciones al hacer logout
    const cerrarSesion = () => {

    }

    return (
        <header className="nav-header">
            {/* Mostrar  ombre de user en navbat si existe */}
            {usuario ?
                <p className="nombre-usuario">{t(`HEADER.bienvenido`)} <span>{usuario.nombre}</span></p> : null
            }

            <nav className="nav-util">
                {/* Select para cambiar idioma */}
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

                {/* Cerrar sesion */}
                <Link
                    to={"/login"}
                    onClick={() => { cerrarSesion() }}
                >{t(`HEADER.logout`)}</Link>
            </nav>
        </header>
    )
};

export default Navbar;