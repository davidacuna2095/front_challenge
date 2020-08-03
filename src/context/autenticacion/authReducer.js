import {
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    CERRAR_SESION,
    UPDATE_USUARIO
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload);
            // -- IMPORTANTE: Utilizo localstorage al no poder validar con un servider
            localStorage.setItem('usuario', JSON.stringify(action.payload));
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                mensaje: null,
                token: localStorage.getItem('token')
            }

        case LOGIN_ERROR:
            localStorage.removeItem('token');
            // -- IMPORTANTE: Utilizo localstorage al no poder validar con un servider
            localStorage.removeItem('usuario');
            return {
                ...state,
                token: null,
                mensaje: action.payload
            }

        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                mensaje: null
            }

        case CERRAR_SESION:
            localStorage.removeItem('token');
            // -- IMPORTANTE: Utilizo localstorage al no poder validar con un servider
            localStorage.removeItem('usuario');
            return {
                ...state,
                token: null,
                autenticado: false,
                usuario: null
            }

        case UPDATE_USUARIO:
            return {
                ...state,
                usuario: action.payload
            }

        default:
            return state;

    }
};