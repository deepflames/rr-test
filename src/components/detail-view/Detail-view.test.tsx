import React, { useEffect } from 'react';
import { screen, render } from '@testing-library/react';

import Store from '../../store/store';
import DetailView from './Detail-view';
import { Account } from '../../common/models/account';
import userEvent from '@testing-library/user-event';

const testData = new Account().setMap({
  name: 'unknown',
  accountnumber: '001',
  address1_line1: 'address1',
  address1_city: 'city 1',
  address1_country: 'country1',
  address1_stateorprovince: 'unknown',
  description: 'description',
  telephone1: '+1',
  websiteurl: 'http://some-url',
  emailaddress1: 'some@mail'
});

describe('<DetailView />', () => {
  test('should not render without data', () => {
    const { container } = render(
      <Store.Container>
        <DetailView />
      </Store.Container>
    );

    expect(container.innerHTML).toBe('');
  });

  test('should render with data', () => {
    const Wrapper = () => {
      const store = Store.useStores();

      useEffect(() => {
        store.sharedOptions.set('onDetailView')({ data: testData as Account, value: true });
      }, []);

      return (
        <>
          <DetailView {...store} />
        </>
      );
    };

    render(
      <Store.Container>
        <Wrapper />
      </Store.Container>
    );

    expect(screen.getByLabelText('modal-wrapper')).toBeTruthy();
    expect(screen.getByTestId('modal-description').textContent).toEqual(testData.description);
    expect(screen.getByTestId('modal-address').textContent).toEqual(
      `${testData.address1_line1}, ${testData.address1_city}, ${testData.address1_country}`
    );
    expect(screen.getByTestId('modal-telephone').textContent).toEqual(testData.telephone1);
    expect(screen.getByTestId('modal-email').textContent).toEqual(testData.emailaddress1);
    expect(screen.getByTestId('modal-website').textContent).toEqual(testData.websiteurl);
  });

  test('should be empty when closed', () => {
    const Wrapper = () => {
      const store = Store.useStores();

      useEffect(() => {
        store.sharedOptions.set('onDetailView')({ data: testData as Account, value: true });
      }, []);

      return (
        <>
          <DetailView {...store} />
        </>
      );
    };

    const { container } = render(
      <Store.Container>
        <Wrapper />
      </Store.Container>
    );

    const closeButton = screen.getByLabelText('modal-close-button') as HTMLButtonElement;
    userEvent.click(closeButton);

    expect(container.innerHTML).toBe('');
  });
});
