import React, { useContext, useEffect } from 'react';

import FotoContext from '../../context/fotos/FotoContext';
import { useTranslation } from 'react-i18next';

import useAlert from '../../hooks/useAlert';
import useConfirmation from '../../hooks/useConfirmation';

import './Fotos.scss';

const Foto = ({ foto }) => {

    // Foto context. Destructuring state y functions necesarios
    const fotoContext = useContext(FotoContext);
    const { mensaje, deletePhoto, mostrarAlertaFoto, setDetalleFoto } = fotoContext;

    // -- CUSTOM HOOKS
    // Custom hook para mostrar alertas
    const [mostrarAlerta, Alerta] = useAlert({});
    // Preguntar para borrar
    const [respuesta, askConfirmation, Confirmation] = useConfirmation('');

    // translator
    const { t } = useTranslation();

    // Destructuring de foto
    const { id, title, thumbnailUrl } = foto;

    // Detectar cambio en mensaje de alerta
    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje);
        }
        // Para limpiar state de alerta
        mostrarAlertaFoto(null);
        // eslint-disable-next-line
    }, [mensaje]);

    // Detectar cambio en respuesta para eliminar
    useEffect(() => {
        console.log(respuesta, id)
        if (respuesta) {
            deletePhoto(id);
        }
        // eslint-disable-next-line
    }, [respuesta]);

    const onClickDelete = () => {
        askConfirmation('confirmardelimg');
    }

    return (
        <div className="col-md-2 col-sm-6 mb-3">
            {/* De useAlert */}
            <Alerta />
            <Confirmation />
            <div className="card">
                <img alt={`foto${id}`} className="card-img-top" src={thumbnailUrl} />

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

export default Foto;