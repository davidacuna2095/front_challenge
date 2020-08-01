import React, { useState, useContext, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../context/autenticacion/AuthContext';
import useAlert from '../../hooks/useAlert';

// helper para validar si un campo esta incompleto
import { revisarAlerta } from '../../helpers/helpers';

import './Login.scss';

const Login = () => {

    // --CONTEXTS
    // Authcontext para obtener variables de usuario
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;


    // hook de history de react-router-dom
    let history = useHistory();


    // --STATES
    // State de usuario
    const [shadow, setShadow] = useState(false);
    const [data, setData] = useState({
        username: '',
        password: ''
    });
    // Destructuring
    const { username, password } = data;


    // -- CUSTOM HOOKS
    // Custom hook para mostrar alertas
    const [mostrarAlerta, Alerta] = useAlert({});


    // useEffect para manejar usuario autenticado
    useEffect(() => {
        // Si esta autenticado se indica ruta a la cual deberia navegar
        if (autenticado) {
            history.push('/board');
        }

        // Si hubo error de autenticacion mostrar error
        if (mensaje) {
            mostrarAlerta(mensaje);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, history]);

    const doLogin = e => {
        e.preventDefault();

        // Validar data completa
        if (Object.keys(data).some(key => data[key] === '')) {
            mostrarAlerta({ msg: 'Todos los campos son obligatorios', categoria: 'alerta-error' });
            setShadow(true);
            return;
        }

        // login
        iniciarSesion(data);
    }

    // Guardar info ingresada por el usuario
    const saveData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Fragment>

            {/* Mensaje de error de useAlert */}
            <Alerta />

            <div className="form-login">
                <div className="login-container">
                    <h1 className="title">Memories<span>Login</span></h1>
                    <form
                        onSubmit={(e) => doLogin(e)}
                    >
                        {/* Form usuario, hace uso de helper revisar alerta para determinar clase de error */}
                        <div className="login-form">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className={`form-control ${revisarAlerta(shadow, username)}`}
                                placeholder="Tu username"
                                value={username}
                                autoComplete="off"
                                onChange={(e) => saveData(e)}
                            />
                        </div>

                        <div className="login-form">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className={`form-control ${revisarAlerta(shadow, password)}`}
                                placeholder="Tu password"
                                value={password}
                                autoComplete="off"
                                onChange={(e) => saveData(e)}
                            />
                        </div>
                        <div className="login-form">
                            <input
                                type="submit"
                                className="btn btn-primary btn-block"
                                value="Iniciar Sesión" />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment >
    )
};

export default Login;
