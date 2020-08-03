import React, { useContext, useState } from 'react';

import FotoContext from '../../context/fotos/FotoContext';
import { useTranslation } from 'react-i18next';

import '../../styles/styles_modal.scss';

const DetalleFoto = () => {

    // Foto context. Destructuring state y functions necesarios
    const fotoContext = useContext(FotoContext);
    const { currentPhoto, setDetalleFoto, editPhoto } = fotoContext;


    // translator
    const { t } = useTranslation();


    // Destructuring
    const { id, albumId, title, thumbnailUrl } = currentPhoto;


    // --STATES
    const [newTitle, setNewTitle] = useState({ title });
    const [disabled, setDisabled] = useState(true);


    // Actualizar state. Spread operator para no perder valores en caso de que hubieran mas keys
    const onChangePhoto = e => {
        setNewTitle({
            ...newTitle,
            [e.target.name]: e.target.value
        });
    };

    // Sube cambios, actualiza foto con [PATCH] ya que en este caso solo modifica atributo
    const onSubmitPhoto = e => {
        e.preventDefault();
        editPhoto(newTitle, id);
        setDetalleFoto(null);
    };

    return (
        <div className="modalContainer">
            <div className="modalContent">
                <div className="modalTitle">
                    <span>{`${t('FOTO.foto')} ${id}`}</span>
                    <span
                        className="closeModal"
                        // Al cerrar el pop mediante context setea currentPhoto null, y esto hace que no sea visible el popup         
                        onClick={() => setDetalleFoto(null)}
                    >
                        <span></span>
                        <span></span>
                    </span>
                </div>

                {/* Detalle de la foto y posibilidad cambiar title */}
                <div className="modalDetail">
                    <div className="row">
                        <div className="col-6">
                            <img height="300px" alt={`fotoDetalle${id}`} className="card-img-top" src={thumbnailUrl} />
                        </div>
                        <div className="col-6">
                            <label className="labelFoto" htmlFor="albumId">{t('FOTO.idAlbum')}</label>
                            <p
                                name="albumId"
                            >{albumId}</p>
                            <form
                                onSubmit={e => onSubmitPhoto(e)}
                            >
                                <label className="labelFoto" htmlFor="title">{t('FOTO.title')}</label>
                                <div className="container-icon left-addon">
                                    <span
                                        className="iconEdit"
                                        onClick={() => setDisabled(!disabled)}
                                    ></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        autoComplete="off"
                                        value={newTitle.title}
                                        onChange={e => onChangePhoto(e)}
                                        disabled={disabled}
                                    />
                                </div>
                                {!disabled ?
                                    <input
                                        type="submit"
                                        style={{ 'marginTop': '30px' }}
                                        className="btn btn-primary btn-block"
                                        value={t('GENERAL.save')}
                                    />
                                    : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetalleFoto;