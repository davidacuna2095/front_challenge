import React, { useEffect, useContext } from 'react';

import Album from './Album';
import AlbumContext from '../../context/albumes/AlbumContext';

import './Album.scss';

const ListadoAlbum = () => {

    const albumContext = useContext(AlbumContext);
    const { albums, getAlbums } = albumContext;


    useEffect(() => {
        getAlbums(2);
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <ul className="listado-album">
                {albums.map(album => (
                    <Album
                        key={album.key}
                        album={album}
                    />
                ))}
            </ul>
        </div>
    )
};

export default ListadoAlbum;
