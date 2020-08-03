import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import FotoContext from '../../context/fotos/FotoContext';
import ManagementContext from '../../context/management/ManagementContext';

import { useTranslation } from 'react-i18next';
import '../../styles/styles_modal.scss';

import Input from '../../utils/input/Input';

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
                            <Input
                                containerClass="col-12"
                                labelClass="labelFoto"
                                labelValue="FOTO.title"
                                tipo="text"
                                value={title}
                                name="title"
                                placeholder="FOTO.placetitulo"
                                inputClass="form-control"
                                shadow={shadow}
                                onChange={onChangePhoto}
                            />
                        </div>
                        <div className="row mt-4">
                            <Input
                                containerClass="col-6"
                                labelClass="labelFoto"
                                labelValue="FOTO.thumbnailUrl"
                                tipo="text"
                                value={thumbnailUrl}
                                name="thumbnailUrl"
                                placeholder="FOTO.placeurl"
                                inputClass="form-control"
                                shadow={shadow}
                                onChange={onChangePhoto}
                            />
                            <Input
                                containerClass="col-6"
                                labelClass="labelFoto"
                                labelValue="FOTO.url"
                                tipo="text"
                                value={url}
                                name="url"
                                placeholder="FOTO.placeurl"
                                inputClass="form-control"
                                shadow={shadow}
                                onChange={onChangePhoto}
                            />
                        </div>
                        <div className="row mt-4">
                            <Input
                                containerClass="col-12 mt-4"
                                tipo="submit"
                                value="GENERAL.add"
                                inputClass="btn btn-block btn-outline-primary"
                                shadow={false}
                                hasLabel={false}
                            />
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