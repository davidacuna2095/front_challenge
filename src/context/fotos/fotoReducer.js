import {
    LISTAR_FOTOS,
    ELIMINAR_FOTO,
    ALERTA_FOTO,
    DETALLE_FOTO,
    EDITAR_FOTO
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        // Actualiza state con fotos del album actual
        case LISTAR_FOTOS:
            return {
                ...state,
                fotos: action.payload
            }

        case ELIMINAR_FOTO:
            return {
                ...state,
                fotos: state.fotos.filter(foto => foto.id !== action.payload)
            }

        case ALERTA_FOTO:
            return {
                ...state,
                mensaje: action.payload
            }

        case DETALLE_FOTO:
            return {
                ...state,
                currentPhoto: action.payload
            }

        case EDITAR_FOTO:
            return {
                ...state,
                fotos: state.fotos.map(foto => foto.id === action.payload.id ? action.payload : foto)
            }

        default:
            return state;

    }
};