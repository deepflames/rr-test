import React, { Component } from 'react';

import './App.scss';
import Store from './store/store';
import Main from './components/main/Main';

export default class App extends Component {
  render(): JSX.Element {
    return (
      <div className="_app">
        <Store.Container>
          <Main />
        </Store.Container>
      </div>
    );
  }
}
