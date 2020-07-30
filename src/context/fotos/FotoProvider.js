
import React, { useReducer } from 'react';
import {
    LISTAR_FOTOS
} from '../../types';

import FotoContext from './FotoContext';
import fotoReducer from './fotoReducer.js';
import axiosClient from '../../config/axios';

const FotoProvider = (props) => {

    // State inicial
    const initialState = {
        fotos: [],
        currentPhoto: null
    };

    // Usar Reducer: Le paso el reducer y estado inicial
    const [state, dispatch] = useReducer(fotoReducer, initialState);

    // --Funciones que modifican action

    // [GET] Obtener fotos del album actual
    const getPhotos = async albumId => {

        try {
            const response = await axiosClient.get(`/photos?albumId=${albumId}`);

            dispatch({
                type: LISTAR_FOTOS,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Variables y funciones que estarán disponibles en scope del context
    return (
        <FotoContext.Provider
            value={{
                fotos: state.fotos,
                currentPhoto: state.currentPhoto,
                getPhotos
            }}
        >
            {props.children}
        </FotoContext.Provider>
    )

}

export default FotoProvider;