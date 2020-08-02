import React, { useEffect, useContext, useState } from 'react';

import Album from './Album';
import AlbumContext from '../../context/albumes/AlbumContext';
import AuthContext from '../../context/autenticacion/AuthContext';

import './Album.scss';

const ListadoAlbum = () => {

    // -- CONTEXTS
    // Context de autenticacion. Destructuring de states/functions que se precisan
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;
    // Context. get albums
    const albumContext = useContext(AlbumContext);
    const { albums, getAlbums } = albumContext;


    // -- STATES
    // Palabra por la que se esta filtrando
    const [filtro, setFiltro] = useState('');
    // Array de filtered values de acuerdo a la palabra del state de filtro
    const [filteredValues, setFilteredValues] = useState(albums);

    // Detectar cambio de usuario
    useEffect(() => {
        if (usuario) getAlbums(usuario.id);
        // eslint-disable-next-line
    }, [usuario]);

    // Detectar cambio de albumes
    useEffect(() => {
        if (albums) setFilteredValues(albums);
        // eslint-disable-next-line
    }, [albums]);

    // Detecta cambio en input de filter para realizar filtrado sobre array actual de albumes
    const onChangeFilter = e => {
        const palabra = e.target.value.toLowerCase();
        setFiltro(palabra);

        // no aplicar filtro si es vacio
        if (palabra === '') {
            setFilteredValues(albums);
            return;
        }

        // match de la palabra con alguno de los atributos de album
        let filteredArray = albums.filter(value => {
            return Object.keys(value).some(key =>
                value[key].toString().toLowerCase().includes(palabra)
            );
        });
        setFilteredValues(filteredArray);

    };

    return (
        <div className="album-container">
            <span className="input_container">
                <input
                    type="input"
                    className="inputMeli"
                    placeholder="Filtra acá"
                    name="filtroAlbum"
                    id='filtroAlbum'
                    value={filtro}
                    onChange={e => onChangeFilter(e)}
                />
                <label
                    htmlFor="filtroAlbum"
                    className="labelMeli"
                >Filtra acá</label>
            </span>
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
    )
};

export default ListadoAlbum;
