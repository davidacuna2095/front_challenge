import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import ListadoAlbum from '../album/ListadoAlbum';
import AlbumForm from '../album/AlbumForm'

import './Board.scss';

const Sidebar = () => {

    // translator
    const { t } = useTranslation();

    // Para navegar en routing
    let history = useHistory();

    const goHome = () => {
        history.push('/board');
    }

    return (
        <aside>
            <h1
                className="title"
                onClick={() => goHome()}
            >Memories<span>Keeper</span></h1>

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