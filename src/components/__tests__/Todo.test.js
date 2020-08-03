import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import Todo from '../todo/Todo';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/forTest';

test('render Todo div container renderizado correctamente', () => {
    const root = document.createElement("div");
    const todo = { id: 1, title: "my test", completed: true };
    const onChangeCompletado = jest.fn();
    ReactDOM.render(
        <I18nextProvider i18n={i18n}>
            <Todo todo={todo} onChangeCompletado={onChangeCompletado} />
        </I18nextProvider>, root);

    expect(root.querySelector("div").className).toBe("completado");
});

test('Todo object destructuring correcto', async () => {
    const todo = { id: 1, title: "my test", completed: true };
    const onChangeCompletado = jest.fn();
    const { findByText } = render(
        <I18nextProvider i18n={i18n}>
            <Todo todo={todo} onChangeCompletado={onChangeCompletado} />
        </I18nextProvider>);

    expect(await findByText('my test')).toBeInTheDocument();
});

test('Muestra boton de estado completo cuando completed true', async () => {
    const todo = { id: 1, title: "my test", completed: true };
    const onChangeCompletado = jest.fn();
    const { getByRole } = render(
        <I18nextProvider i18n={i18n}>
            <Todo todo={todo} onChangeCompletado={onChangeCompletado} />
        </I18nextProvider>);

    fireEvent.click(await getByRole('button', { name: /completo/i }));
});

test('Muestra boton de estado incompleto cuando completed false', async () => {
    const todo = { id: 1, title: "my test", completed: false };
    const onChangeCompletado = jest.fn();
    const { getByRole } = render(
        <I18nextProvider i18n={i18n}>
            <Todo todo={todo} onChangeCompletado={onChangeCompletado} />
        </I18nextProvider>);

    fireEvent.click(await getByRole('button', { name: /incompleto/i }));
});
