import React from 'react';
import { useTranslation } from 'react-i18next';

import ListadoAlbum from '../album/ListadoAlbum';
import AlbumForm from '../album/AlbumForm'

import './Board.scss';

const Sidebar = () => {

    // translator
    const { t } = useTranslation();

    return (
        <aside>
            <h1 className="title">Memories<span>Keeper</span></h1>

            {/* Formulario para añadir nuevo album */}
            <AlbumForm />

            <div className="form-sidebar">

                {/* Listado de albumes */}
                <h2>{t('HEADER.subtitle')}</h2>
                <ListadoAlbum />

            </div>

        </aside>
    )
};

export default Sidebar;