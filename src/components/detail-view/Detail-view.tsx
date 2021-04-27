import React, { Component } from 'react';
import { Subscription } from 'rxjs';
import Modal from 'react-bulma-components/lib/components/modal';
import ModalCard from 'react-bulma-components/lib/components/modal/components/card';
import Media from 'react-bulma-components/lib/components/media';
import Content from 'react-bulma-components/lib/components/content';

import Store, { StoreProps } from '../../store/store';
import { Account } from '../../common/models/account';

interface State {
  isVisible: boolean;
  data?: Account;
}

class DetailView extends Component<StoreProps, State> {
  private $onDetailViewSub: Subscription | null = null;

  constructor(props: Readonly<StoreProps>) {
    super(props);

    this.state = {
      isVisible: false,
      data: void 0
    };
  }

  componentDidMount() {
    this.$onDetailViewSub = this.props.sharedOptions
      .on('onDetailView')
      .subscribe(detailViewData => {
        if (!detailViewData) return;

        const { data, value } = detailViewData;

        this.setState({ isVisible: value, data });
      });
  }

  componentWillUnmount() {
    this.$onDetailViewSub?.unsubscribe();
  }

  render(): JSX.Element | null {
    const { isVisible, data } = this.state;

    if (!data) return null;

    return (
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <Modal show={isVisible} onClose={() => {}}>
        <ModalCard aria-label="modal-wrapper">
          <ModalCard.Head showClose={false}>
            <ModalCard.Title>{data.name}</ModalCard.Title>
          </ModalCard.Head>

          <ModalCard.Body>
            <Media>
              <Media.Item>
                <Content>
                  <div>
                    <p data-testid="modal-description">{data.description}</p>
                    <p>
                      <strong>Address:</strong>{' '}
                      <span data-testid="modal-address">
                        {data.address1_line1}, {data.address1_city}, {data.address1_country}
                      </span>
                    </p>
                    <p>
                      <strong>Telephone:</strong>{' '}
                      <span data-testid="modal-telephone">{data.telephone1}</span>
                    </p>
                    <p>
                      <strong>E-mail:</strong>{' '}
                      <span data-testid="modal-email">{data.emailaddress1}</span>
                    </p>
                    <p>
                      <strong>Website:</strong>{' '}
                      <span data-testid="modal-website">{data.websiteurl}</span>
                    </p>
                  </div>
                </Content>
              </Media.Item>
            </Media>
          </ModalCard.Body>

          <ModalCard.Foot>
            <button
              type="button"
              aria-label="modal-close-button"
              className="button"
              onClick={() => this.setState({ isVisible: false })}>
              Cancel
            </button>
          </ModalCard.Foot>
        </ModalCard>
      </Modal>
    );
  }
}

export default Store.withStores(DetailView);
