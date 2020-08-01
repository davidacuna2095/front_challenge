import React, { useContext, useState } from 'react';
import { locale } from '../../config/i18n';

import AuthContext from '../../context/autenticacion/AuthContext';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import './Board.scss';


const Navbar = () => {

    // --CONTEXTS
    // Authcontext para obtener variables de usuario
    const authContext = useContext(AuthContext);
    const { usuario, cerrarSesion } = authContext;

    // --STATES
    const [mostrarMenu, setMostrarMenu] = useState(false);

    // Translator
    const { t, i18n } = useTranslation();
    // routing
    let history = useHistory();

    // onChange de cambio de idioma de la app
    const onChangeLanguaje = (lang) => {
        i18n.changeLanguage(lang);
    };

    // Configuracion del usuario
    const userConfig = () => {
        history.push('/usuario');
    };

    // Acciones para cerrar sesion
    const logOut = () => {
        cerrarSesion();
        history.push('/login');
    };

    return (
        <header className="nav-header">
            {/* Mostrar  ombre de user en navbat si existe */}
            {usuario ?
                <p className="nombre-usuario">{t(`HEADER.bienvenido`)} <span>{usuario.name}</span></p> : null
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
                <div>
                    <span
                        className="userIcon"
                        onClick={() => setMostrarMenu(!mostrarMenu)}
                    ></span>
                    {mostrarMenu ? <div className="dropMenu" style={{ 'right': '0' }}>
                        <div className="userProfile">
                            <div className="profileIcon">
                                <span
                                    className="userIcon"
                                ></span>
                            </div>
                            <div className="userProfileLogin">
                                <p>{usuario.name}</p>
                            </div>
                            <div
                                className="optionsUser"
                                onClick={() => userConfig()}
                            >
                                <span>{t('HEADER.config')}</span>
                            </div>
                            <div
                                className="optionsUser logout"
                                onClick={() => logOut()}
                            >
                                <span>{t('HEADER.logout')}</span>
                            </div>
                        </div>
                    </div> : null}
                </div>
            </nav>
        </header>
    )
};

export default Navbar;