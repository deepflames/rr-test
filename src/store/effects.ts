import { StoreEffects } from './store';
import DataService from '../common/services/data-service';

const dataService = DataService.getInstance();

const effects: StoreEffects = ({ store, sharedOptions }) => {
  sharedOptions.on('onData').subscribe(async data => {
    try {
      sharedOptions.set('onPreloader')(true);

      const result = data || (await dataService.getAccounts());
      result && store.set('data')(result);

      sharedOptions.set('onPreloader')(false);
    } catch (err) {
      console.log(err);
      sharedOptions.set('onPreloader')(false);
    }
  });

  sharedOptions.on('onSearch').subscribe(async value => {
    try {
      if (!value) {
        sharedOptions.set('onData')(null);
        return;
      }

      sharedOptions.set('onPreloader')(true);

      const filter = sharedOptions.get('onFilter');
      const result = await dataService.searchOnAccounts({ value, filter });
      result && sharedOptions.set('onData')(result);

      sharedOptions.set('onPreloader')(false);
    } catch (err) {
      console.log(err);
      sharedOptions.set('onPreloader')(false);
    }
  });

  sharedOptions.on('onFilter').subscribe(async filter => {
    try {
      sharedOptions.set('onPreloader')(true);

      const value = sharedOptions.get('onSearch');
      const result = await dataService.searchOnAccounts({ value, filter });
      result && sharedOptions.set('onData')(result);

      sharedOptions.set('onPreloader')(false);
    } catch (err) {
      console.log(err);
      sharedOptions.set('onPreloader')(false);
    }
  });

  return { store, sharedOptions };
};

export default effects;
