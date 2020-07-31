
import React, { useReducer } from 'react';
import {
    LISTAR_FOTOS,
    ELIMINAR_FOTO,
    ALERTA_FOTO,
    DETALLE_FOTO,
    EDITAR_FOTO
} from '../../types';

import FotoContext from './FotoContext';
import fotoReducer from './fotoReducer.js';
import axiosClient from '../../config/axios';

const FotoProvider = (props) => {

    // State inicial
    const initialState = {
        fotos: [],
        currentPhoto: null,
        mensaje: null
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

    // [DELETE] Borra foto con idPhoto
    const deletePhoto = async idPhoto => {
        try {
            const response = await axiosClient.delete(`/photos/${idPhoto}`);
            if (response.status !== 200) {
                throw new Error('deletePhotoError');
            }

            dispatch({
                type: ELIMINAR_FOTO,
                payload: idPhoto
            });

            // Muestra mensaje de borrado exitoso
            mostrarAlertaFoto({ msg: 'deletePhotoSuc', categoria: 'alerta-ok', t: true });

        } catch (error) {
            mostrarAlertaFoto({ msg: 'deletePhotoError', categoria: 'alerta-error', t: true });
        }
    };

    // Para definir mensaje de alerta, asi como definir si se va a mostrar o no
    const mostrarAlertaFoto = alerta => {
        dispatch({
            type: ALERTA_FOTO,
            payload: alerta
        });
    };

    // Setea foto que se esta mostrando en detalle
    const setDetalleFoto = foto => {
        dispatch({
            type: DETALLE_FOTO,
            payload: foto
        });
    };

    // [PATCH] Actualiza valor especifico de la foto. En este caso el titulo
    const editPhoto = async (data, id) => {
        try {
            const response = await axiosClient.patch(`/photos/${id}`, data);

            dispatch({
                type: EDITAR_FOTO,
                payload: response.data
            });

            // Muestra mensaje de edicion exitosa
            mostrarAlertaFoto({ msg: 'patchPhotoSuc', categoria: 'alerta-ok', t: true });
        } catch (error) {
            console.log(error);
        }
    }

    // Variables y funciones que estarán disponibles en scope del context
    return (
        <FotoContext.Provider
            value={{
                fotos: state.fotos,
                currentPhoto: state.currentPhoto,
                mensaje: state.mensaje,
                getPhotos,
                deletePhoto,
                mostrarAlertaFoto,
                setDetalleFoto,
                editPhoto
            }}
        >
            {props.children}
        </FotoContext.Provider>
    )

}

export default FotoProvider;