import React, { useEffect } from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Store from '../../store/store';
import Navigation from './Navigation';
import { Account } from '../../common/models/account';

const testData = [
  { ...new Account().setMap({ address1_stateorprovince: 'unknown1' }) },
  { ...new Account().setMap({ address1_stateorprovince: 'unknown2' }) }
];

describe('<Navigation />', () => {
  test('renders without crashing', () => {
    render(
      <Store.Container>
        <Navigation />
      </Store.Container>
    );

    expect(screen.getByTestId('navigation')).toBeTruthy();
    expect(screen.getByLabelText('search-input')).toBeTruthy();
    expect(screen.getByLabelText('statecode-input')).toBeTruthy();
    expect(screen.getByLabelText('stateorprovince-input')).toBeTruthy();
    expect(screen.getByLabelText('reset-button')).toBeTruthy();
    expect(screen.getByLabelText('list-button')).toBeTruthy();
    expect(screen.getByLabelText('card-button')).toBeTruthy();
  });

  test('should type text', () => {
    render(
      <Store.Container>
        <Navigation />
      </Store.Container>
    );

    const searchInput = screen.getByLabelText('search-input') as HTMLInputElement;
    userEvent.type(searchInput, 'some text');

    expect(searchInput.value).toBe('some text');
  });

  test('should select options', () => {
    const Wrapper = () => {
      const store = Store.useStores();

      useEffect(() => {
        store.store.set('data')(testData as Account[]);
      }, []);

      return (
        <>
          Store.withStores(
          <Navigation {...store} />)
        </>
      );
    };

    render(
      <Store.Container>
        <Wrapper />
      </Store.Container>
    );

    const stateCodeInput = screen.getByLabelText('statecode-input') as HTMLSelectElement;
    const stateOrProvinceInput = screen.getByLabelText('stateorprovince-input');

    userEvent.selectOptions(stateCodeInput, ['statecode:number:1']);
    expect((screen.getByTestId('active') as HTMLOptionElement).selected).toBe(false);
    expect((screen.getByTestId('inactive') as HTMLOptionElement).selected).toBe(true);

    userEvent.selectOptions(stateOrProvinceInput, ['address1_stateorprovince:string:unknown2']);
    expect((screen.getByTestId('sop:unknown1') as HTMLOptionElement).selected).toBe(false);
    expect((screen.getByTestId('sop:unknown2') as HTMLOptionElement).selected).toBe(true);
  });

  test('should reset the search field', () => {
    render(
      <Store.Container>
        <Navigation />
      </Store.Container>
    );

    const resetButton = screen.getByLabelText('reset-button') as HTMLButtonElement;
    const searchInput = screen.getByLabelText('search-input') as HTMLInputElement;
    userEvent.click(resetButton);

    expect(searchInput.value).toBe('');
  });

  test('should change the list view', () => {
    const { container } = render(
      <Store.Container>
        <Navigation />
      </Store.Container>
    );

    const cardButton = screen.getByLabelText('card-button') as HTMLButtonElement;
    userEvent.click(cardButton);

    expect(container.querySelector('.button.card-button.is-active')).not.toBe(null);
  });
});
