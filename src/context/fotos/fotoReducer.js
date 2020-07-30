import {
    LISTAR_FOTOS
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        // Actualiza state con fotos del album actual
        case LISTAR_FOTOS:
            return {
                ...state,
                fotos: action.payload
            }

        default:
            return state;

    }
};