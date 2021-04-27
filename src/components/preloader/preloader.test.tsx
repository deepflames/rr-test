import React from 'react';
import { screen, render } from '@testing-library/react';
import Preloader from './preloader';

describe('<Preloader />', () => {
  test('renders without crashing', () => {
    render(<Preloader />);

    expect(screen.getByTestId('preloader')).toBeTruthy();
  });
});
