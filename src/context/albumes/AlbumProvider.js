import React, { useReducer } from 'react';
import {
    LISTAR_ALBUMES,
    AGREGAR_ALBUM,
    ALBUM_ACTUAL,
    LOADING_ALBUM
} from '../../types';

import AlbumContext from './AlbumContext';
import albumReducer from './albumReducer.js';
import Loader from '../../utils/loader/Loader';
import axiosClient from '../../config/axios';

const AlbumProvider = (props) => {

    // State inicial
    const initialState = {
        albums: [],
        currentAlbum: null,
        loading: false
    };

    // Usar Reducer: Le paso el reducer y estado inicial
    const [state, dispatch] = useReducer(albumReducer, initialState);

    // --Funciones que modifican action

    // [GET] Obtener albumes
    const getAlbums = async userId => {
        setLoading();
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
        setLoading();
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

    // Para poner loader en caso de latencia en peticion
    const setLoading = () => {
        dispatch({
            type: LOADING_ALBUM
        });
    };

    // Variables y funciones que estarán disponibles en scope del context
    return (<>
        <AlbumContext.Provider
            value={{
                albums: state.albums,
                currentAlbum: state.currentAlbum,
                loading: state.loading,
                getAlbums,
                addAlbum,
                setCurrentAlbum
            }}
        >
            {props.children}
        </AlbumContext.Provider>
        <Loader mostrar={state.loading} /></>
    )

}

export default AlbumProvider;