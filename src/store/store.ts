import { Store, createConnectedStoreAs, EffectsAs } from 'undux/dist.esnext/index.js';
import effects from './effects';
import { Account } from '../common/models/account';

type StoreType = {
  data: Account[] | null;
};

type SharedOptionsType = {
  filter: number;
  viewType: number;
  onData: Account[] | null;
  onSearch?: string;
  onFilter: string;
  onPreloader: boolean;
};

////////////////////////////////////////////////////////////////////////////////

const initialStore: StoreType = {
  data: null
};

const initialSharedOptions: SharedOptionsType = {
  filter: 0,
  onData: null,
  viewType: 0,
  onSearch: void 0,
  onFilter: '-1',
  onPreloader: false
};

////////////////////////////////////////////////////////////////////////////////

export default createConnectedStoreAs(
  {
    store: initialStore,
    sharedOptions: initialSharedOptions
  },
  effects
);

export type StoreProps = {
  store: Store<StoreType>;
  sharedOptions: Store<SharedOptionsType>;
};

export type StoreEffects = EffectsAs<{
  store: StoreType;
  sharedOptions: SharedOptionsType;
}>;
