import React, { useEffect, useContext } from 'react';

import Album from './Album';
import AlbumContext from '../../context/albumes/AlbumContext';
import AuthContext from '../../context/autenticacion/AuthContext';

import './Album.scss';

const ListadoAlbum = () => {

    // -- CONTEXTS
    // Context de proyecto. Destructuring de states/functions que se precisan
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;

    const albumContext = useContext(AlbumContext);
    const { albums, getAlbums } = albumContext;

    // Obtener los albumes cuando solo en primer render
    useEffect(() => {
        if (usuario) {
            getAlbums(usuario.id);
        }
        // eslint-disable-next-line
    }, [usuario]);

    return (
        <div className="album-container">
            <ul className="listado-album">
                {/* map de albums del usuario para mostrarlos como elementos de lista */}
                {albums.map(album => (
                    <Album
                        key={album.id}
                        album={album}
                    />
                ))}
            </ul>
        </div>
    )
};

export default ListadoAlbum;
