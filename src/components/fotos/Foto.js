import React from 'react';

import './Fotos.scss';

const Foto = ({ foto }) => {

    // Destructuring de foto
    const { albumId, id, title, thumbnailUrl } = foto;

    return (
        <div className="col-md-2 col-sm-6 mb-3">
            <div className="card">
                <img alt={`foto${id}`} className="card-img-top" src={thumbnailUrl} />

                <div className="edicion">
                    <span className="delete"></span>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ 'float': 'right' }}
                    >Editar</button>
                </div>

                <span className="foto-title">{title}</span>
            </div>
        </div>
    )
};

export default Foto;