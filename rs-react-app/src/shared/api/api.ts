export default class API {
  private baseURL = 'http://stapi.co/api/v1/rest/';
  fetchData = async (query: string = 'book'): Promise<void> => {
    const response = await fetch(`${this.baseURL}${query}/search`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };
}
