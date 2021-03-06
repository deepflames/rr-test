import { Store, createConnectedStoreAs, EffectsAs } from 'undux';
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
  onDetailView?: { data?: Account; value: boolean };
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
  onFilter: 'all:-1',
  onPreloader: false,
  onDetailView: void 0
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
