import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Field, Control } from 'react-bulma-components/lib/components/form';
import Icon from 'react-bulma-components/lib/components/icon';

import './Navigation.scss';
import Store, { StoreProps } from '../../store/store';
import { Account } from '../../common/models/account';

interface State {
  activeViewType: number;
}

class Navigation extends Component<StoreProps, State> {
  private searchRef: HTMLInputElement | null = null;

  private onSearch$ = new Subject<string>();
  private $onSearchSub?: Subscription;

  constructor(props: Readonly<StoreProps>) {
    super(props);

    this.state = {
      activeViewType: 0
    };

    this.onSearch = this.onSearch.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onViewType = this.onViewType.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount() {
    this.$onSearchSub = this.onSearch$.pipe(debounceTime(500)).subscribe(value => {
      this.props.sharedOptions.set('onSearch')(value);
    });
  }

  componentWillUnmount() {
    this.$onSearchSub?.unsubscribe();
  }

  render(): JSX.Element {
    const { store } = this.props;
    const data = store.get('data');

    return (
      <Field
        className="is-horizontal is-grouped is-grouped-centered navigation"
        data-testid="navigation">
        <div className="field-body">
          <Field className="has-addons">
            <Control className="is-expanded has-icons-left">
              <input
                ref={ref => (this.searchRef = ref)}
                aria-label="search-input"
                type="text"
                className="input"
                placeholder="Search"
                onChange={this.onSearch}
              />
              <Icon align="left">
                <span className="ion-md-search" />
              </Icon>
            </Control>

            <Control>
              <div className="select">
                <select
                  aria-label="statecode-input"
                  defaultValue="statecode:number:0"
                  onChange={this.onFilter}>
                  <option data-testid="active" value="statecode:number:0">
                    Active
                  </option>
                  <option data-testid="inactive" value="statecode:number:1">
                    Inactive
                  </option>
                </select>
              </div>
            </Control>

            <Control>
              <div className="select">
                <select aria-label="stateorprovince-input" onChange={this.onFilter}>
                  {this.getStateOrProvince(data).map((item, index: number) => (
                    <option
                      data-testid={`sop:${item}`}
                      key={index}
                      value={`address1_stateorprovince:string:${item}`}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </Control>

            <Control>
              <button
                aria-label="reset-button"
                type="button"
                className="button"
                data-type={0}
                onClick={this.onReset}>
                Reset
              </button>
            </Control>
          </Field>

          <Field className="has-addons is-flex-grow-0">
            <Control>
              <button
                aria-label="list-button"
                type="button"
                className={`button list-button ${
                  this.state.activeViewType === 0 ? 'is-active' : ''
                }`}
                data-type={0}
                onClick={this.onViewType}>
                <Icon>
                  <span className="ion-md-reorder" />
                </Icon>
              </button>
            </Control>
            <Control>
              <button
                aria-label="card-button"
                type="button"
                className={`button card-button ${
                  this.state.activeViewType === 1 ? 'is-active' : ''
                }`}
                data-type={1}
                onClick={this.onViewType}>
                <Icon>
                  <span className="ion-md-apps" />
                </Icon>
              </button>
            </Control>
          </Field>
        </div>
      </Field>
    );
  }

  private getStateOrProvince(data: Account[] | null): (string | undefined)[] {
    return data
      ? data
          .filter(item => item.address1_stateorprovince)
          .map(item => item.address1_stateorprovince)
          .filter((item, index, self) => self.indexOf(item) === index)
      : [];
  }

  private onSearch(event: ChangeEvent): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.onSearch$.next(value);
  }

  private onFilter(event: ChangeEvent): void {
    const value = (event.target as HTMLSelectElement)?.value;
    this.props.sharedOptions.set('onFilter')(value);

    if (this.searchRef && value === '-1') {
      this.searchRef.value = '';
      this.onSearch$.next(void 0);
    }
  }

  private onViewType(event: MouseEvent): void {
    const target = event.currentTarget as HTMLButtonElement;
    const viewTypeString = target.dataset['type'];
    if (!viewTypeString) return;

    const viewType = parseInt(viewTypeString, 10);
    this.setState({ activeViewType: viewType });
    this.props.sharedOptions.set('viewType')(viewType);
  }

  private onReset(): void {
    this.props.sharedOptions.set('onFilter')('all:-1');

    if (this.searchRef) {
      this.searchRef.value = '';
      this.onSearch$.next(void 0);
    }
  }
}

export default Store.withStores(Navigation);
