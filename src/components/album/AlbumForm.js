import React, { Fragment, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AlbumContext from '../../context/albumes/AlbumContext';
import useAlert from '../../hooks/useAlert';

// helper para validar si un campo esta incompleto
import { revisarAlerta } from '../../helpers/helpers';

import './Album.scss';

const AlbumForm = () => {

    // -- CONTEXTS
    // Album context. Destructuring state y functions necesarios
    const albumContext = useContext(AlbumContext);
    const { addAlbum } = albumContext;


    // -- STATES
    // State para mostrar formulario de nuevo album
    const [mostrar, setMostrar] = useState(false);

    // State para sombrear form con campos faltantes cuando hay alert
    const [shadow, setShadow] = useState(false);

    // State para instancia de album
    const [album, setAlbum] = useState({
        title: ''
    });
    // Object destructuring para get title
    const { title } = album;

    // -- CUSTOM HOOKS
    // Custom hook para mostrar alertas
    const [mostrarAlerta, Alerta] = useAlert({});


    // translator
    const { t } = useTranslation();

    // -- FUNCTIONS
    // Handles change en formulario de album
    const onChangeAlbum = e => {
        setAlbum({
            ...album,
            [e.target.name]: e.target.value
        });
    };

    // ArrayFunction para añadir nuevo album
    const onSubmitAlbum = e => {
        e.preventDefault();

        // Validar campos completos
        if (album.title === '') {
            mostrarAlerta({ msg: t('ALERTS.required'), categoria: 'alerta-error' });
            setShadow(true);
            return;
        }
        // Si es valido retorna a estado default
        setShadow(false);

        // Agregar album a travñes context
        album.userId = 2; // Seteo aca el id (sin uso del state) ya que es un proceso que haria el backend con el token/usuario autenticado
        addAlbum(album);

        //Reiniciar Formulario
        setAlbum({
            title: ''
        });
        // setMostrar(false);

    };

    // Function para cambiar state de mostrar de acuerdo a valor actual
    const mostrarFormulario = () => {
        setMostrar(mostrar ? false : true);
    }

    return (
        <Fragment>
            <div className={`col-12`}>
                <button
                    type="button"
                    className={`add-button`}
                    onClick={() => mostrarFormulario()}
                ><span> {mostrar ? "-" : "+"} </span></button>
            </div>

            {/* Alerta de custum hook useAlert */}
            <Alerta />

            {/* ternario para mostrar formulario segun state */}
            {mostrar
                ?
                <form
                    className="album-add-form"
                    onSubmit={onSubmitAlbum}
                >
                    {/* Se hace uso de helper para validadr uso de class para sombrear campo con alert */}
                    <input
                        className={`form-control ${revisarAlerta(shadow, title)}`}
                        type="text"
                        name="title"
                        placeholder={t('ALBUM.nombre')}
                        value={title}
                        onChange={(e) => onChangeAlbum(e)}
                    />

                    {/* Submit para enviar form */}
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value={t('GENERAL.add')}
                    />

                </form>
                :
                null
            }

        </Fragment>
    )
};

export default AlbumForm;
