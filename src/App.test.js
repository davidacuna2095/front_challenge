import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/forTest';

test('existe route de login', () => {
  const { getByText } = render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>);
  const linkElement = getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
