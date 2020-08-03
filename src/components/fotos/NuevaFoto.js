import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import FotoContext from '../../context/fotos/FotoContext';
import ManagementContext from '../../context/management/ManagementContext';

import { useTranslation } from 'react-i18next';
// helper para validar si un campo esta incompleto
import { revisarAlerta } from '../../helpers/helpers';
import '../../styles/styles_modal.scss';

const NuevaFoto = ({ albumId, setCreando }) => {

    // Foto context. Destructuring state y functions necesarios
    const fotoContext = useContext(FotoContext);
    const { addPhoto } = fotoContext;
    // Mngmt context. Handler de alertas
    const managementContext = useContext(ManagementContext);
    const { mostrarAlerta } = managementContext;


    // --STATES
    // Handler new photo
    const [newPhoto, setNewPhoto] = useState({
        albumId,
        title: '',
        url: '',
        thumbnailUrl: ''
    });
    // State para sombrear form con campos faltantes cuando hay alert
    const [shadow, setShadow] = useState(false);


    // Destruturing
    const { title, url, thumbnailUrl } = newPhoto;

    // translator
    const { t } = useTranslation();

    // Actualizar state. Spread operator para no perder valores en caso de que hubieran mas keys
    const onChangePhoto = e => {
        setNewPhoto({
            ...newPhoto,
            [e.target.name]: e.target.value
        });
    };

    // Crea nueva foto [POST]. valida que todo este completo
    const onSubmitPhoto = e => {
        e.preventDefault();

        // Validar data completa
        if (Object.keys(newPhoto).some(key => newPhoto[key] === '')) {
            mostrarAlerta({ msg: 'Todos los campos son obligatorios', categoria: 'alerta-error' });
            setShadow(true);
            return;
        }

        addPhoto(newPhoto);
        setCreando(false);
    };

    return (
        <div className="modalContainer">
            <div className="modalContent">
                <div className="modalTitle">
                    <span>{`${t('FOTO.nueva')}`}</span>
                    <span
                        className="closeModal"
                        // Al cerrar el pop actualiza state del listado
                        onClick={() => setCreando(false)}
                    >
                        <span></span>
                        <span></span>
                    </span>
                </div>

                {/* Datos de la foto */}
                <div className="modalDetail">
                    <form
                        className="col-12"
                        onSubmit={e => onSubmitPhoto(e)}
                    >
                        <div className="row mt-4">
                            <div className="col-12">
                                <label htmlFor="title">{t('USUARIO.name')}</label>
                                <input
                                    type="text"
                                    name="title"
                                    className={`form-control ${revisarAlerta(shadow, title)}`}
                                    value={title}
                                    onChange={e => onChangePhoto(e)}
                                />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-6">
                                <label htmlFor="thumbnailUrl">Thumbnail Url</label>
                                <input
                                    type="text"
                                    name="thumbnailUrl"
                                    className={`form-control ${revisarAlerta(shadow, thumbnailUrl)}`}
                                    value={thumbnailUrl}
                                    onChange={e => onChangePhoto(e)}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="url">Url</label>
                                <input
                                    type="text"
                                    name="url"
                                    className={`form-control ${revisarAlerta(shadow, url)}`}
                                    value={url}
                                    onChange={e => onChangePhoto(e)}
                                />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12 mt-4">
                                <input
                                    type="submit"
                                    className="btn btn-block btn-primary"
                                    value={t('GENERAL.add')}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

NuevaFoto.propTypes = {
    albumId: PropTypes.string.isRequired,
    setCreando: PropTypes.func.isRequired
};

export default NuevaFoto;