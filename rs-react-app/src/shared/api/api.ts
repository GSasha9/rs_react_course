import type { RequestResults } from '../models/interfaces/request-results';
import { RESOURCE_OPTIONS } from '../models/constants';

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
    select: string = RESOURCE_OPTIONS[0].key,
    query: string = ''
  ): Promise<RequestResults | undefined> => {
    console.log(RESOURCE_OPTIONS[0].key);
    if (!query) {
      const response = await fetch(`${this.baseURL}${select}/search`);
      if (response.ok) {
        const data: RequestResults = await response.json();
        console.log(data);
        return data;
      }
    } else {
      const response = await fetch(`${this.baseURL}${select}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          title: `${query}`,
          name: `${query}`,
        }).toString(),
      });
      const data: RequestResults = await response.json();
      console.log(data);
      return data;
    }
  };
}

const api = new API();

export default api;
