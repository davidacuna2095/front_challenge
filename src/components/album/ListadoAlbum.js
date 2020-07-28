import React, { useEffect, useContext } from 'react';

import Album from './Album';
import AlbumContext from '../../context/albumes/AlbumContext';

import './Album.scss';

const ListadoAlbum = () => {

    // -- CONTEXTS
    // Context de proyecto. Destructuring de states/functions que se precisan
    const albumContext = useContext(AlbumContext);
    const { albums, getAlbums } = albumContext;

    // Obtener los albumes cuando solo en primer render
    useEffect(() => {
        getAlbums(2);
        // eslint-disable-next-line
    }, []);

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
