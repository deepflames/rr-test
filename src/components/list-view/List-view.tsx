import React, { Component } from 'react';
import { Subscription } from 'rxjs';
import Box from 'react-bulma-components/lib/components/box';
import Media from 'react-bulma-components/lib/components/media';
import Content from 'react-bulma-components/lib/components/content';
import Tag from 'react-bulma-components/lib/components/tag';
import Columns from 'react-bulma-components/lib/components/columns';
import Card from 'react-bulma-components/lib/components/card';

import './List-view.scss';
import Store, { StoreProps } from '../../store/store';
import { Account } from '../../common/models/account';

interface State {
  viewType: number;
}

class ListView extends Component<StoreProps, State> {
  private $onViewTypeSub?: Subscription;

  constructor(props: Readonly<StoreProps>) {
    super(props);

    this.state = {
      viewType: 0
    };
  }

  componentDidMount() {
    this.$onViewTypeSub = this.props.sharedOptions
      .on('viewType')
      .subscribe(viewType => this.setState({ viewType }));
  }

  componentWillUnmount() {
    this.$onViewTypeSub?.unsubscribe();
  }

  render(): JSX.Element {
    const { store } = this.props;
    const { viewType } = this.state;
    const data = store.get('data');

    return (
      <div className="list-view">
        {viewType === 0 &&
          data?.map(
            (item: Account, index) =>
              item.accountnumber && (
                <Box key={index}>
                  <Media>
                    <Media.Item>
                      <Content>
                        <h5>{item.name}</h5>
                        <Tag>
                          {item.address1_line1}, {item.address1_city}, {item.address1_country}
                        </Tag>
                        <p className="is-multiline">{item.description}</p>
                      </Content>
                    </Media.Item>
                  </Media>
                </Box>
              )
          )}

        {viewType === 1 && (
          <Columns className="is-multiline">
            {data?.map(
              (item: any, index) =>
                item.accountnumber && (
                  <Columns.Column key={index} className="is-one-third">
                    <Card>
                      <Card.Content>
                        <Media>
                          <Media.Item>
                            <Content>
                              <h5>{item.name}</h5>
                              <Tag>
                                {item.address1_line1}, {item.address1_city}, {item.address1_country}
                              </Tag>
                              <p className="is-multiline">{item.description}</p>
                            </Content>
                          </Media.Item>
                        </Media>
                      </Card.Content>
                    </Card>
                  </Columns.Column>
                )
            )}
          </Columns>
        )}
      </div>
    );
  }
}

export default Store.withStores(ListView);
