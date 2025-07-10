import type { RequestResults } from '../models/interfaces/request-results';
import { generateQueryStringPage } from '../utils';

class API {
  private static instance: API;
  private baseURL = 'http://stapi.co/api/v1/rest/';

  public static getInstance = (): API => {
    if (!API.instance) {
      API.instance = new API();
    }

    return API.instance;
  };

  fetchData = async (
    select: string = 'company',
    query: string = ''
  ): Promise<RequestResults | undefined> => {
    let request = '';
    if (query) {
      request = `${this.baseURL}${select}/search${generateQueryStringPage({ name: query })}`;
    } else {
      request = `${this.baseURL}${select}/search`;
    }
    const response = await fetch(`${request}`);

    if (response.ok) {
      const data: RequestResults = await response.json();
      console.log(data);

      return data;
    }
  };
}

const api = new API();

export default api;
