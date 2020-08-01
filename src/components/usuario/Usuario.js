import React, { Fragment, useContext, useState, useEffect } from 'react';

import AuthContext from '../../context/autenticacion/AuthContext';

import { useTranslation } from 'react-i18next';
import useAlert from '../../hooks/useAlert';

// helper para validar si un campo esta incompleto
import { revisarAlerta } from '../../helpers/helpers';

const Usuario = () => {

    // --CONTEXTS
    // Authcontext para obtener variables de usuario
    const authContext = useContext(AuthContext);
    const { usuario, updateUser } = authContext;

    // Objeto base, para manejo de latencia de context y evitar null
    const usuarioModel = { name: '', username: '', email: '', phone: '', website: '' }


    // -- CUSTOM HOOKS
    // Custom hook para mostrar alertas
    const [mostrarAlerta, Alerta] = useAlert({});


    // --STATES
    // State para valores de edicion del usuario
    const [shadow, setShadow] = useState(false);
    const [nuevoUsuario, setNuevoUsuario] = useState(usuarioModel);

    // Destructuring
    const { name, username, email, phone, website } = nuevoUsuario;

    // translator
    const { t } = useTranslation();


    // Detectar update de usuario
    useEffect(() => {
        if (usuario) {
            setNuevoUsuario(usuario);
        } else {
            setNuevoUsuario(usuarioModel);
        }
        // eslint-disable-next-line
    }, [usuario])


    // -- Funciones
    // Actualizar state. Spread operator pactualizar key especifica
    const saveData = e => {
        setNuevoUsuario({
            ...nuevoUsuario,
            [e.target.name]: e.target.value
        })
    }

    // Actualizar usuario
    const onSubmitUser = e => {
        e.preventDefault();

        if (Object.keys(nuevoUsuario).some(key => nuevoUsuario[key] === '')) {
            mostrarAlerta({ msg: t('ALERTS.required'), categoria: 'alerta-error' });
            setShadow(true);
            return;
        }
        setShadow(false);

        updateUser(nuevoUsuario);
        mostrarAlerta({ msg: t('ALERTS.deleteUserSuc'), categoria: 'alerta-ok' });
    }

    return (
        <Fragment>
            <h3>{t('HEADER.config')}</h3>

            <form
                className="col-12"
                onSubmit={e => onSubmitUser(e)}
            >
                <Alerta />
                <div className="row mt-4">
                    <div className="col-6">
                        <label htmlFor="name">{t('USUARIO.name')}</label>
                        <input
                            type="text"
                            name="name"
                            className={`form-control ${revisarAlerta(shadow, name)}`}
                            value={name}
                            onChange={e => saveData(e)}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="username">{t('USUARIO.username')}</label>
                        <input
                            type="text"
                            name="username"
                            className={`form-control ${revisarAlerta(shadow, username)}`}
                            value={username}
                            onChange={e => saveData(e)}
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <label htmlFor="email">{t('USUARIO.email')}</label>
                        <input
                            type="text"
                            name="email"
                            className={`form-control ${revisarAlerta(shadow, email)}`}
                            value={email}
                            onChange={e => saveData(e)}
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6">
                        <label htmlFor="phone">{t('USUARIO.phone')}</label>
                        <input
                            type="text"
                            name="phone"
                            className={`form-control ${revisarAlerta(shadow, phone)}`}
                            value={phone}
                            onChange={e => saveData(e)}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="website">{t('USUARIO.website')}</label>
                        <input
                            type="text"
                            name="website"
                            className={`form-control ${revisarAlerta(shadow, website)}`}
                            value={website}
                            onChange={e => saveData(e)}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <input
                            type="submit"
                            className="btn btn-block btn-primary"
                            value={t('GENERAL.update')}
                        />
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

export default Usuario;
