import React, { Component } from 'react';
import Section from 'react-bulma-components/lib/components/section';

import './Main.scss';
import Store, { StoreProps } from '../../store/store';
import ListView from '../list-view/List-view';
import Navigation from '../navigation/Navigation';
import Preloader from '../preloader/preloader';

class Main extends Component<StoreProps, unknown> {
  async componentDidMount(): Promise<void> {
    await this.getData();
  }

  render(): JSX.Element {
    const { store, sharedOptions } = this.props;
    const data = store.get('data');
    const isPreloaderVisible = sharedOptions.get('onPreloader');

    return (
      <div className="_main">
        {isPreloaderVisible && <Preloader />}

        <Section className="_navigation">
          <Navigation />
        </Section>

        <Section className="_list-view">{data && <ListView />}</Section>
      </div>
    );
  }

  private async getData(): Promise<void> {
    this.props.sharedOptions.set('onData')(null);
  }
}

export default Store.withStores(Main);
