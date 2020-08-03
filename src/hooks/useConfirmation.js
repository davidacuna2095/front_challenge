import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import '../styles/styles_modal.scss';

const useConfirmation = (mensajeInicial) => {

    const [mostrar, setMostrar] = useState(false);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [respuesta, setRespuesta] = useState(null);
    const [detalle, setDetalle] = useState(null);

    // translator
    const { t } = useTranslation();

    // Setea mensaje de alerta, y setea timeput para quitar alerta despues de 4 segundos
    const askConfirmation = (mensajeAlerta, id) => {
        setMostrar(true);
        setDetalle(id);
        setMensaje(mensajeAlerta);
    }

    // Si confirma envia como respuesta el detalle de la misma. En este caso el id.
    const confirm = () => {
        setRespuesta(detalle);
        setDetalle(null);
    }

    // Elemento de alerta que muestra en el dom
    const Confirmation = () => (
        mostrar ?
            <div className="modalContainer">
                <div className="modalContent confirmation">
                    <div className="modalDetail confirmation">
                        <div className="row">
                            <div className="col-12">
                                <p>{t(`ALERTS.${mensaje}`)}</p>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-6">
                                <button
                                    type="button"
                                    className="btn btn-outline-success btn-block confirm"
                                    onClick={() => confirm()}
                                >{t('GENERAL.si')}</button>
                            </div>
                            <div className="col-6">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-block"
                                    onClick={() => setMostrar(false)}
                                >{t('GENERAL.no')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : null
    );

    return [respuesta, askConfirmation, setMostrar, Confirmation];

}

export default useConfirmation;
