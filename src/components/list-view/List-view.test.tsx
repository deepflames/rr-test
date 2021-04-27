import React, { useEffect } from 'react';
import { screen, render } from '@testing-library/react';

import Store from '../../store/store';
import ListView from './List-view';
import { Account } from '../../common/models/account';

const testData = [
  { ...new Account().setMap({ address1_stateorprovince: 'unknown1' }) },
  { ...new Account().setMap({ address1_stateorprovince: 'unknown2' }) }
];

describe('<ListView />', () => {
  test('renders without crashing', () => {
    render(
      <Store.Container>
        <ListView />
      </Store.Container>
    );

    expect(screen.getByTestId('list-view')).toBeTruthy();
  });

  test('should not render without the data', () => {
    const Wrapper = () => {
      const store = Store.useStores();

      useEffect(() => {
        store.store.set('data')(null);
      }, []);

      return (
        <>
          Store.withStores(
          <ListView {...store} />)
        </>
      );
    };

    render(
      <Store.Container>
        <Wrapper />
      </Store.Container>
    );

    expect(screen.getByTestId('list-view').innerHTML).toHaveLength(0);
  });

  test('should render the card type', () => {
    const Wrapper = () => {
      const store = Store.useStores();

      useEffect(() => {
        store.store.set('data')(testData as Account[]);
        store.sharedOptions.set('viewType')(1);
      }, []);

      return (
        <>
          Store.withStores(
          <ListView {...store} />)
        </>
      );
    };

    render(
      <Store.Container>
        <Wrapper />
      </Store.Container>
    );

    expect(screen.getByTestId('card-type')).toBeTruthy();
  });

  test('should render the data with the card type', () => {
    const Wrapper = () => {
      const store = Store.useStores();

      testData[0].accountnumber = '1';
      testData[1].accountnumber = '2';

      useEffect(() => {
        store.store.set('data')(testData as Account[]);
        store.sharedOptions.set('viewType')(1);
      }, []);

      return (
        <>
          Store.withStores(
          <ListView {...store} />)
        </>
      );
    };

    render(
      <Store.Container>
        <Wrapper />
      </Store.Container>
    );

    expect(screen.getByTestId('card-type').innerHTML).toBeTruthy();
  });

  test('should render the data with the list type', () => {
    const Wrapper = () => {
      const store = Store.useStores();

      testData[0].accountnumber = '1';
      testData[1].accountnumber = '2';

      useEffect(() => {
        store.store.set('data')(testData as Account[]);
        store.sharedOptions.set('viewType')(0);
      }, []);

      return (
        <>
          Store.withStores(
          <ListView {...store} />)
        </>
      );
    };

    render(
      <Store.Container>
        <Wrapper />
      </Store.Container>
    );

    expect(screen.getByTestId('list-type-0').innerHTML).toBeTruthy();
  });
});
