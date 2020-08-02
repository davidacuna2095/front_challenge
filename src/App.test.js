import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('existe route de login', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
