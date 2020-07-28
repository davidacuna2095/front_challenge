import {
    LISTAR_ALBUMES,
    AGREGAR_ALBUM
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        // Actualiza state albums con albumes actuales del usuario
        case LISTAR_ALBUMES:
            return {
                ...state,
                albums: action.payload
            }

        // Agrega nuevo album a los albums actulaes del usuario
        case AGREGAR_ALBUM:
            return {
                ...state,
                albums: [
                    action.payload,
                    ...state.albums
                ]
            }

        default:
            return state;

    }
};