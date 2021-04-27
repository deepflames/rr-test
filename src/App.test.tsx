import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container.getElementsByClassName('_app').length).toBe(1);
  });
});
