import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import Foto from '../fotos/Foto';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/forTest';
import FotoProvider from '../../context/fotos/FotoProvider';


test('render Foto div container renderizado correctamente', () => {
    const root = document.createElement("div");
    const foto = { id: 1, title: "my test", thumbnailUrl: '' };
    const deleteCurrentPhoto = jest.fn();
    ReactDOM.render(
        <I18nextProvider i18n={i18n}>
            <FotoProvider>
                <Foto foto={foto} deleteCurrentPhoto={deleteCurrentPhoto} />
            </FotoProvider>
        </I18nextProvider>, root);

    expect(root.querySelector("div").className).toBe("col-md-2 col-sm-6 mb-3");
});

test('Foto object destructuring correcto', async () => {
    const foto = { id: 1, title: "my test", thumbnailUrl: '' };
    const deleteCurrentPhoto = jest.fn();
    const { findByText } = render(
        <I18nextProvider i18n={i18n}>
            <FotoProvider>
                <Foto foto={foto} deleteCurrentPhoto={deleteCurrentPhoto} />
            </FotoProvider>
        </I18nextProvider>);

    expect(await findByText('my test')).toBeInTheDocument();
});

test('Puede hacer click en el botón', async () => {
    const foto = { id: 1, title: "my test", thumbnailUrl: '' };
    const deleteCurrentPhoto = jest.fn();
    const { getByRole } = render(
        <I18nextProvider i18n={i18n}>
            <FotoProvider>
                <Foto foto={foto} deleteCurrentPhoto={deleteCurrentPhoto} />
            </FotoProvider>
        </I18nextProvider>);

    fireEvent.click(await getByRole('button'));
});

