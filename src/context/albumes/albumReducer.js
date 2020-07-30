import {
    LISTAR_ALBUMES,
    AGREGAR_ALBUM,
    ALBUM_ACTUAL
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

        // Setea el album que se esta visualizando
        case ALBUM_ACTUAL:
            return {
                ...state,
                currentAlbum: action.payload
            }

        default:
            return state;

    }
};