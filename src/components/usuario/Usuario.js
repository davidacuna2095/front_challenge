import React, { Fragment, useContext, useState, useEffect } from 'react';

import AuthContext from '../../context/autenticacion/AuthContext';
import ManagementContext from '../../context/management/ManagementContext';

import { useTranslation } from 'react-i18next';
import Input from '../../utils/input/Input';

const Usuario = () => {

    // --CONTEXTS
    // Authcontext para obtener variables de usuario
    const authContext = useContext(AuthContext);
    const { usuario, updateUser } = authContext;
    // Mngmt context. Handler de alertas
    const managementContext = useContext(ManagementContext);
    const { mostrarAlerta } = managementContext;


    // Objeto base, para manejo de latencia de context y evitar null
    const usuarioModel = { name: '', username: '', email: '', phone: '', website: '' }


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
                <div className="row mt-4">
                    <Input
                        containerClass="col-6"
                        labelClass=""
                        labelValue="USUARIO.name"
                        tipo="text"
                        value={name}
                        name="name"
                        placeholder="USUARIO.name"
                        inputClass="form-control"
                        shadow={shadow}
                        onChange={saveData}
                    />
                    <Input
                        containerClass="col-6"
                        labelClass=""
                        labelValue="USUARIO.username"
                        tipo="text"
                        value={username}
                        name="username"
                        placeholder="USUARIO.username"
                        inputClass="form-control"
                        shadow={shadow}
                        onChange={saveData}
                    />
                </div>
                <div className="row mt-4">
                    <Input
                        containerClass="col-12"
                        labelClass=""
                        labelValue="USUARIO.email"
                        tipo="text"
                        value={email}
                        name="email"
                        placeholder="USUARIO.email"
                        inputClass="form-control"
                        shadow={shadow}
                        onChange={saveData}
                    />
                </div>
                <div className="row mt-2">
                    <Input
                        containerClass="col-6"
                        labelClass=""
                        labelValue="USUARIO.phone"
                        tipo="text"
                        value={phone}
                        name="phone"
                        placeholder="USUARIO.phone"
                        inputClass="form-control"
                        shadow={shadow}
                        onChange={saveData}
                    />
                    <Input
                        containerClass="col-6"
                        labelClass=""
                        labelValue="USUARIO.website"
                        tipo="text"
                        value={website}
                        name="website"
                        placeholder="USUARIO.website"
                        inputClass="form-control"
                        shadow={shadow}
                        onChange={saveData}
                    />
                </div>
                <div className="row mt-3">
                    <Input
                        containerClass="col-12"
                        tipo="submit"
                        value="GENERAL.update"
                        inputClass="btn btn-block btn-outline-primary"
                        shadow={false}
                        hasLabel={false}
                    />
                </div>
            </form>
        </Fragment>
    );
};

export default Usuario;
