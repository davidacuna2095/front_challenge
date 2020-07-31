import React, { useContext, Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Foto from './Foto';

import AlbumContext from '../../context/albumes/AlbumContext';
import FotoContext from '../../context/fotos/FotoContext';
import DetalleFoto from '../../components/fotos/DetalleFoto';

import usePaginator from '../../hooks/usePaginator.js';
import { useTranslation } from 'react-i18next';

import './Fotos.scss';

const ListadoFotos = () => {

    // -- CONTEXTS
    // Album context. Destructuring state y functions necesarios
    const albumContext = useContext(AlbumContext);
    const { currentAlbum, setCurrentAlbum } = albumContext;

    // Foto context. Destructuring state y functions necesarios
    const fotoContext = useContext(FotoContext);
    const { fotos, currentPhoto, getPhotos } = fotoContext;

    // -- CUSTOM HOOK
    // Paginador de lado de cliente. Se envia cantidad de elementos a mostrar y array original
    // Retorna array con elementos a mostrar y elemento visual de paginación
    const [currentContent, Paginar] = usePaginator(12, fotos);

    // hook de params de react-router-dom para detectar cambio de param id del album
    let { id } = useParams();

    // translator
    const { t } = useTranslation();

    // Detectar cambio en url por navegacion en el id para cargar de nuevo
    useEffect(() => {
        if (id !== currentAlbum) {
            setCurrentAlbum(parseInt(id));
            getPhotos(id);
        }
        // eslint-disable-next-line
    }, [id])

    return (
        <Fragment>
            {currentPhoto ? <DetalleFoto /> : null}
            <h3>{t('ALBUM.tusfotos')}</h3>
            <div
                className="row"
            >
                {currentContent.map(foto => (
                    <Foto
                        key={foto.id}
                        foto={foto}
                    />
                ))}
                {/* De custom hook usePaginator */}
                <Paginar />
            </div>
        </Fragment>
    )
};

export default ListadoFotos;
