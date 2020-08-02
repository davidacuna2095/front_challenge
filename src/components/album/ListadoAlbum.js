import React, { useEffect, useContext, Fragment } from 'react';

import Album from './Album';
import AlbumContext from '../../context/albumes/AlbumContext';
import AuthContext from '../../context/autenticacion/AuthContext';

import useFilter from '../../hooks/useFilter';

import './Album.scss';

const ListadoAlbum = () => {

    // -- CONTEXTS
    // Context de autenticacion. Destructuring de states/functions que se precisan
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;
    // Context. get albums
    const albumContext = useContext(AlbumContext);
    const { albums, getAlbums } = albumContext;


    // -- CUSTOM HOOKS
    // Filtrado de contenido
    const [filteredValues, Filtrado] = useFilter(albums, 'albumUseFilter', 'labelAlbum');


    // Detectar cambio de usuario
    useEffect(() => {
        if (usuario) getAlbums(usuario.id);
        // eslint-disable-next-line
    }, [usuario]);

    return (
        <Fragment>
            <Filtrado />
            <div className="album-container">
                <ul className="listado-album">
                    {/* map de albums filtrados del usuario para mostrarlos como elementos de lista */}
                    {filteredValues.map(album => (
                        <Album
                            key={album.id}
                            album={album}
                        />
                    ))}
                </ul>
            </div>
        </Fragment>
    )
};

export default ListadoAlbum;
