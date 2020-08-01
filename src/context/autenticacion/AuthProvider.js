import React, { useReducer } from 'react';
import AuthContext from "./AuthContext";
import authReducer from "./authReducer";

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    CERRAR_SESION,
    UPDATE_USUARIO
} from '../../types';

const AuthProvider = (props) => {

    // Initial state

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: false,
        usuario: null,
        mensaje: null
    };

    // reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Funciones de action

    // Validar que usuario existe para iniciar sesión
    const iniciarSesion = async data => {
        try {
            const response = await axiosClient.get(`/users?username=${data.username}`);
            const [usuario] = response.data;
            if (usuario) {
                dispatch({
                    type: LOGIN_EXITOSO,
                    payload: usuario
                });
            } else {
                // --IMPORTANTE: Se valida de esta forma por estructura de api y no server
                // Validacion de que usuario no existe
                const alerta = {
                    msg: 'Usuario o credenciales incorrectas.',
                    categoria: 'alerta-error'
                }
                dispatch({
                    type: LOGIN_ERROR,
                    payload: alerta
                });
            }
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error autenticando al usuario.',
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    // -- IMPORTANTE: Utilizo localstorage al no poder validar con un servider
    // Funcion para verificar que usuario esta autentica. Para accesos privados
    const returnAuthUser = async () => {
        // Si la request retorna token se almacena para agregarlo en el cliente de axios
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }

        try {
            let response = localStorage.getItem('usuario');
            if (response) {
                response = JSON.parse(response);
                dispatch({
                    type: OBTENER_USUARIO,
                    payload: response
                });
            }

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error autenticando al usuario.',
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    // Limpia localStorage y retorna a valor default state
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    };

    // Actualiza un usuario
    const updateUser = async usuariodto => {

        try {
            const response = await axiosClient.put(`/users/${usuariodto.id}`, usuariodto);
            const updated_usuer = response.data;

            dispatch({
                type: UPDATE_USUARIO,
                payload: updated_usuer
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                iniciarSesion,
                returnAuthUser,
                cerrarSesion,
                updateUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

};

export default AuthProvider;