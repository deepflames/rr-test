export default class ApiService {
  apiPath(path: string): string {
    return `/api/data/v9.1/${path}`;
  }
}
