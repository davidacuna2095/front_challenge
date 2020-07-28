
import React, { useReducer } from 'react';
import {
    LISTAR_ALBUMES
} from '../../types';

import AlbumContext from './AlbumContext';
import albumReducer from './albumReducer.js';
import axiosClient from '../../config/axios';

const AlbumProvider = (props) => {

    // State inicial
    const initialState = {
        albums: []
    };

    // Usar Reducer
    const [state, dispatch] = useReducer(albumReducer, initialState);

    // Funciones que modifican action

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

    return (
        <AlbumContext.Provider
            value={{
                albums: state.albums,
                getAlbums
            }}
        >
            {props.children}
        </AlbumContext.Provider>
    )

}

export default AlbumProvider;