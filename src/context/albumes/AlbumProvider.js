
import React, { useReducer } from 'react';
import {
    LISTAR_ALBUMES,
    AGREGAR_ALBUM
} from '../../types';

import AlbumContext from './AlbumContext';
import albumReducer from './albumReducer.js';
import axiosClient from '../../config/axios';

const AlbumProvider = (props) => {

    // State inicial
    const initialState = {
        albums: []
    };

    // Usar Reducer: Le paso el reducer y estado inicial
    const [state, dispatch] = useReducer(albumReducer, initialState);

    // --Funciones que modifican action

    // [GET] Obtener albumes
    const getAlbums = async userId => {

        try {
            const response = await axiosClient.get(`/albums?userId=${userId}`);

            dispatch({
                type: LISTAR_ALBUMES,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] Añadir album a usuario actual
    const addAlbum = async album => {

        try {
            const response = await axiosClient.post(`/albums?userId=${album.userId}`, album);

            dispatch({
                type: AGREGAR_ALBUM,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Variables y funciones que estarán disponibles en scope del context
    return (
        <AlbumContext.Provider
            value={{
                albums: state.albums,
                getAlbums,
                addAlbum
            }}
        >
            {props.children}
        </AlbumContext.Provider>
    )

}

export default AlbumProvider;