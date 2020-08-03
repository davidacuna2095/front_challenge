import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import AlbumContext from '../../context/albumes/AlbumContext';

import { isCurrentAlbum } from '../../helpers/helpers';
import './Album.scss';

const Album = ({ album }) => {

    // --CONTEXTS
    // Album context. Destructuring state y functions necesarios
    const albumContext = useContext(AlbumContext);
    const { currentAlbum } = albumContext;

    // hook de history de react-router-dom
    let history = useHistory();

    // Destructuring album
    const { id, title } = album;

    // Dirigir a page de listado de fotos de album especifico
    // Invocar service de fotos de album especifico
    const onClickAlbum = () => {
        history.push(`/album/${id}`);
    };

    return (
        // Muestra info del album y valida si es el que se esta visualizando actualmente
        <li
            data-testid="albumDetail"
            onClick={() => onClickAlbum()}
            className={`${isCurrentAlbum(currentAlbum, id)}`}
        ><span
            className={`${isCurrentAlbum(currentAlbum, id)}`}
        >{title}</span></li>
    )
};

Album.propTypes = {
    album: PropTypes.object.isRequired
};

export default Album;
