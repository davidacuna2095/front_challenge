import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import FotoContext from '../../context/fotos/FotoContext';
import { useTranslation } from 'react-i18next';

import './Fotos.scss';

const Foto = ({ foto, deleteCurrentPhoto }) => {

    // Foto context. Destructuring state y functions necesarios
    const fotoContext = useContext(FotoContext);
    const { setDetalleFoto } = fotoContext;

    // translator
    const { t } = useTranslation();

    // Destructuring de foto
    const { id, title, thumbnailUrl } = foto;

    // Handles photo escogicada para eliminar.
    const onClickDelete = () => {
        deleteCurrentPhoto(id);
    };

    return (
        <div className="col-md-2 col-sm-6 mb-3">
            <div className="card">
                <img width="90px" height="140px" alt={`foto${id}`} className="card-img-top" src={thumbnailUrl} />

                <div className="edicion">
                    <span
                        className="delete"
                        onClick={() => onClickDelete()}
                    ></span>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ 'float': 'right' }}
                        onClick={() => setDetalleFoto(foto)}
                    >{t('GENERAL.editar')}</button>
                </div>

                <span
                    className="foto-title"
                >{title}</span>
            </div>
        </div>
    )
};

Foto.propTypes = {
    foto: PropTypes.object.isRequired,
    deleteCurrentPhoto: PropTypes.func.isRequired
};

export default Foto;