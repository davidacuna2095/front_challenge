import React, { useContext, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AlbumContext from '../../context/albumes/AlbumContext';
import FotoContext from '../../context/fotos/FotoContext';
import ManagementContext from '../../context/management/ManagementContext';

import DetalleFoto from '../../components/fotos/DetalleFoto';
import NuevaFoto from '../../components/fotos/NuevaFoto';
import Foto from './Foto';

import usePaginator from '../../hooks/usePaginator.js';
import useConfirmation from '../../hooks/useConfirmation';

import { useTranslation } from 'react-i18next';

import './Fotos.scss';

const ListadoFotos = () => {

    // -- CONTEXTS
    // Album context. Destructuring state y functions necesarios
    const albumContext = useContext(AlbumContext);
    const { currentAlbum, setCurrentAlbum } = albumContext;
    // Foto context. Destructuring state y functions necesarios
    const fotoContext = useContext(FotoContext);
    const { fotos, currentPhoto, mensaje, deletePhoto, getPhotos } = fotoContext;
    // Mngmt context. Handler de alertas
    const managementContext = useContext(ManagementContext);
    const { mostrarAlerta } = managementContext;



    // -- CUSTOM HOOK
    // Paginador de lado de cliente Retorna array con elementos a mostrar y elemento visual de paginación
    const [currentContent, Paginar] = usePaginator(12, fotos);
    // Custom hook Preguntar para borrar
    const [respuesta, askConfirmation, setMostrar, Confirmation] = useConfirmation('');


    // --STATES
    const [creando, setCreando] = useState(false);


    // Hook useParams de react-router-dom para detectar cambio de param id del album
    let { id } = useParams();
    // translator
    const { t } = useTranslation();


    // Detectar cambio param en routing.
    useEffect(() => {
        if (id !== currentAlbum) {
            setCurrentAlbum(parseInt(id));
            getPhotos(id);
        }
        // eslint-disable-next-line
    }, [id]);

    // Detectar cambio en mensaje de alerta.
    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje);
            setMostrar(false);
        }
        // eslint-disable-next-line
    }, [mensaje]);

    // Detectar cambio en respuesta para eliminar.
    useEffect(() => {
        if (respuesta) deletePhoto(respuesta);
        // eslint-disable-next-line
    }, [respuesta]);

    // Mostar mensaje de confirmacion
    const deleteCurrentPhoto = idPhoto => {
        askConfirmation('confirmardelimg', idPhoto);
    }

    return (
        <Fragment>
            <div className={`col-12`}>
                <button
                    type="button"
                    className={`add-button`}
                    onClick={() => setCreando(true)}
                ><span className="fotoAdd"> {"+"} </span></button>
            </div>
            {/* De useConfirmation */}
            <Confirmation />
            {creando ? <NuevaFoto setCreando={setCreando} albumId={id} /> : null}
            {currentPhoto ? <DetalleFoto /> : null}
            <h3>{t('ALBUM.tusfotos')}</h3>

            <div
                className="row"
            >
                {currentContent.map(foto => (
                    <Foto
                        key={foto.id}
                        foto={foto}
                        deleteCurrentPhoto={deleteCurrentPhoto}
                    />
                ))}
                {/* De custom hook usePaginator */}
                <Paginar />
            </div>

        </Fragment>
    )
};

export default ListadoFotos;
