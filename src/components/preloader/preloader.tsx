import React, { Component } from 'react';

import './preloader.scss';

export default class Preloader extends Component {
  render(): JSX.Element {
    return (
      <div className="preloader" data-testid="preloader">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
