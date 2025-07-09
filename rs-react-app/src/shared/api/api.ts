import type { RequestResults } from '../models/interfaces/request-results';

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
    query: string = 'animal'
  ): Promise<RequestResults | undefined> => {
    const response = await fetch(`${this.baseURL}${query}/search`);

    if (response.ok) {
      const data: RequestResults = await response.json();
      console.log(data);

      return data;
    }
  };
}

const api = new API();

export default api;
