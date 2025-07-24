import { RESOURCE_OPTIONS } from '../models/constants';
import type { RequestResults } from '../models/interfaces/request-results';

export class API {
  private static instance: API;
  private baseURL = 'https://stapi.co/api/v1/rest/';

  public static getInstance = (): API => {
    if (!API.instance) {
      API.instance = new API();
    }

    return API.instance;
  };

  fetchData = async (
    select: string = RESOURCE_OPTIONS[0].key,
    query: string = '',
    pageNumber: number
  ): Promise<RequestResults | undefined> => {
    const url = `${this.baseURL}${select}/search?pageNumber=${pageNumber}`;

    try {
      let response: Response;

      if (!query) {
        response = await fetch(url);
      } else {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            title: `${query}`,
            name: `${query}`,
          }).toString(),
        });
      }

      if (!response.ok) {
        const errorBody = await response.text();

        throw new Error(`Error ${response.status}: ${errorBody}`);
      }

      const data: RequestResults = await response.json();

      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }

      throw new Error('Unknown error');
    }
  };
}

const api = new API();

export default api;
