
import React, { useReducer } from 'react';
import {
    LISTAR_ALBUMES,
    AGREGAR_ALBUM,
    ALBUM_ACTUAL
} from '../../types';

import AlbumContext from './AlbumContext';
import albumReducer from './albumReducer.js';
import axiosClient from '../../config/axios';

const AlbumProvider = (props) => {

    // State inicial
    const initialState = {
        albums: [],
        currentAlbum: null
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

    // Setter de album actual en el scope del usuario para mostrar fotos de acuerdo a album seleccionado
    const setCurrentAlbum = albumId => {
        dispatch({
            type: ALBUM_ACTUAL,
            payload: albumId
        });
    };

    // Variables y funciones que estarán disponibles en scope del context
    return (
        <AlbumContext.Provider
            value={{
                albums: state.albums,
                currentAlbum: state.currentAlbum,
                getAlbums,
                addAlbum,
                setCurrentAlbum
            }}
        >
            {props.children}
        </AlbumContext.Provider>
    )

}

export default AlbumProvider;