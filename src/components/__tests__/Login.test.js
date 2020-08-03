import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import Login from '../auth/Login';
import AuthProvider from '../../context/autenticacion/AuthProvider';
import ManagementProvider from '../../context/management/ManagementProvider';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

test('Form login rendered', () => {
    const root = document.createElement("div");
    ReactDOM.render(
        <ManagementProvider>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </ManagementProvider>, root);

    expect(root.querySelector("div").className).toBe("form-login");
});

test('Hace click en login', async () => {
    const { getByRole } = render(
        <ManagementProvider>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </ManagementProvider>);

    fireEvent.click(await getByRole('button', { name: /Iniciar Sesión/i }));
});