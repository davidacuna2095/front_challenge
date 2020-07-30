import React, { useContext } from 'react';
import { locale } from '../../config/i18n';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/autenticacion/AuthContext';
import AlbumContext from '../../context/albumes/AlbumContext';

import { useTranslation } from 'react-i18next';

import './Board.scss';


const Navbar = () => {

    // --CONTEXTS
    // Authcontext para obtener variables de usuario
    const authContext = useContext(AuthContext);
    const { usuario, cerrarSesion } = authContext;
    // AlbumContext para obtener variables de album y quitarlo al cerrar sesion
    const albumContext = useContext(AlbumContext);
    const { setCurrentAlbum } = albumContext;

    // Translator
    const { t, i18n } = useTranslation();

    // onChange de cambio de idioma de la app
    const onChangeLanguaje = (lang) => {
        i18n.changeLanguage(lang);
    };

    // Acciones para cerrar sesion mas retornar currentalbum a null
    const logOut = () => {
        setCurrentAlbum(null);
        cerrarSesion();
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
                <Link
                    to={"/login"}
                    onClick={() => { logOut() }}
                >{t(`HEADER.logout`)}</Link>
            </nav>
        </header>
    )
};

export default Navbar;