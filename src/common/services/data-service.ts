import axios, { AxiosResponse } from 'axios';
import ApiService from './api-service';
import { adalApiFetch } from '../adal-config';
import { Account } from '../models/account';

export default class DataService extends ApiService {
  private static instance: DataService;

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }

    return DataService.instance;
  }

  getAccounts(): Promise<Account[] | null> {
    const path = this.apiPath('accounts');
    return adalApiFetch(axios.get, path, void 0).then((res: AxiosResponse) =>
      res.data.value
        ? res.data.value.map((o: { [index: string]: unknown }) => new Account().setMap(o))
        : null
    );
  }

  searchOnAccounts(opts: { value?: string; filter?: string }): Promise<Account[] | null> {
    let path = `${this.apiPath('accounts')}?`;

    if (opts.value) {
      path = `${path}$filter=contains(name, '${opts.value}')`;
    }

    if (opts.filter) {
      const splitFilter = opts.filter.split(':');
      const filterName = splitFilter[0];
      const filterType = splitFilter[1];
      const filterValue = splitFilter[2];

      if (filterName !== 'all') {
        if (opts.value) {
          path =
            filterType === 'number'
              ? `${path} and ${filterName} eq ${filterValue}`
              : `${path} and ${filterName} eq '${filterValue}'`;
        } else {
          path =
            filterType === 'number'
              ? `${path}$filter=${filterName} eq ${filterValue}`
              : `${path}$filter=${filterName} eq '${filterValue}'`;
        }
      }
    }

    return adalApiFetch(axios.get, path, void 0).then((res: AxiosResponse) =>
      res.data.value
        ? res.data.value.map((o: { [index: string]: unknown }) => new Account().setMap(o))
        : null
    );
  }
}
