import {
    LISTAR_ALBUMES,
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        case LISTAR_ALBUMES:
            return {
                ...state,
                albums: action.payload
            }

        default:
            return state;

    }
};