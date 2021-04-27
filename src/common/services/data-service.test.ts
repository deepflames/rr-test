import DataService from './data-service';

jest.mock('../adal-config', () => {
  return {
    adalApiFetch: jest
      .fn()
      .mockResolvedValue({ data: { value: [{ name: 'unknown1', accountnumber: '1' }] } })
  };
});

describe('data-service', () => {
  const dataService = new DataService();

  test('should be in place', () => {
    expect(DataService.getInstance).toBeTruthy();
    expect(dataService).toBeTruthy();
  });

  test('should fetch accounts', () => {
    dataService.getAccounts().then(res => {
      expect(res).toEqual([{ name: 'unknown1', accountnumber: '1' }]);
    });
  });

  test('should fetch with filters', () => {
    dataService
      .searchOnAccounts({ value: 'search value', filter: 'statecode:number:0' })
      .then(res => {
        expect(res).toEqual([{ name: 'unknown1', accountnumber: '1' }]);
      });
  });
});
