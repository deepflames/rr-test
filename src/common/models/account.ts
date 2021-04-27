import { Base } from './base';

export class Account extends Base {
  name?: string = void 0;
  accountnumber?: string = void 0;
  address1_line1?: string = void 0;
  address1_city?: string = void 0;
  address1_country?: string = void 0;
  address1_stateorprovince?: string = void 0;
  description?: string = void 0;
}
