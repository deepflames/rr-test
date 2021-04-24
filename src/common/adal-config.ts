import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: process.env['TENANT_ID'],
  clientId: process.env['CLIENT_ID'],
  endpoints: {
    api: process.env['CLIENT_URL']
  },
  cacheLocation: 'localStorage'
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch: any, url: string, options?: { [index: string]: any }): any =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
