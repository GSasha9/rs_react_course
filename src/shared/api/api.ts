import type { RequestResults } from '../models/interfaces/request-results';

export class API {
  private static instance: API;
  private baseURL = 'https://stapi.co/api/v1/rest/comics';

  public static getInstance = (): API => {
    if (!API.instance) {
      API.instance = new API();
    }

    return API.instance;
  };

  fetchData = async (
    query: string = '',
    pageNumber: number
  ): Promise<RequestResults | undefined> => {
    const url = `${this.baseURL}/search?pageNumber=${pageNumber}`;

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

  fetchDataById = async (id: string) => {
    const url = `${this.baseURL}?uid=${id}`;

    try {
      const response: Response = await fetch(url);

      if (!response.ok) {
        const errorBody = await response.text();

        throw new Error(`Error ${response.status}: ${errorBody}`);
      }

      const item = await response.json();

      return item;
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
