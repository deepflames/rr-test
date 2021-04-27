import React, { useEffect } from 'react';
import { screen, render } from '@testing-library/react';

import Store from '../../store/store';
import Main from './Main';

describe('<Main />', () => {
  test('renders without crashing', () => {
    render(
      <Store.Container>
        <Main />
      </Store.Container>
    );

    expect(screen.getByTestId('main-wrapper')).toBeTruthy();
    expect(screen.getByTestId('navigation-wrapper')).toBeTruthy();
    expect(screen.getByTestId('list-view-wrapper')).toBeTruthy();
  });

  test('should show the preloader', () => {
    const Wrapper = () => {
      const store = Store.useStores();

      useEffect(() => {
        store.sharedOptions.set('onPreloader')(true);
      }, []);

      return (
        <>
          Store.withStores(
          <Main {...store} />)
        </>
      );
    };

    render(
      <Store.Container>
        <Wrapper />
      </Store.Container>
    );

    expect(screen.getByTestId('preloader')).toBeTruthy();
  });

  test('should not show the <ListView />', () => {
    const Wrapper = () => {
      const store = Store.useStores();

      useEffect(() => {
        store.store.set('data')(null);
      }, []);

      return (
        <>
          Store.withStores(
          <Main {...store} />)
        </>
      );
    };

    render(
      <Store.Container>
        <Wrapper />
      </Store.Container>
    );

    expect(screen.getByTestId('list-view-wrapper').innerHTML).toHaveLength(0);
  });
});
