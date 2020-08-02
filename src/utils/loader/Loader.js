import React from 'react';
import './Loader.scss';
import '../../styles/styles_modal.scss';

const Loader = ({ mostrar }) => {

    return (
        mostrar ?
            <div className="modalContainer">
                <div className="modalContent loader">
                    <div className="modalDetail loader">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>
                </div>
            </div> : null
    )
};

export default Loader;