import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import Album from '../album/Album';
import AlbumProvider from '../../context/albumes/AlbumProvider';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

test('Album object destructuring correcto', async () => {
    const album = { id: 1, title: "my test" };
    const { findByText } = render(
        <AlbumProvider>
            <Album album={album} />
        </AlbumProvider>
    );

    expect(await findByText('my test')).toBeInTheDocument();
});

test('Elemento li que representa un album', () => {
    const album = { id: 1, title: "my test" };
    const { getByTestId } = render(
        <AlbumProvider>
            <Album album={album} />
        </AlbumProvider>
    );

    expect(getByTestId('albumDetail')).toBeInTheDocument();
});
