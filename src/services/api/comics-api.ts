// import type { RequestResults } from '@/shared/models/interfaces';

// export class ComicsApi {
//   private baseURL = 'https://stapi.co/api/v1/rest/comics';

//   public fetchData = async (
//     query: string = '',
//     pageNumber: number
//   ): Promise<RequestResults | undefined> => {
//     const url = `${this.baseURL}/search?pageNumber=${pageNumber}`;

//     try {
//       let response: Response;

//       if (!query) {
//         response = await fetch(url);
//       } else {
//         response = await fetch(url, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: new URLSearchParams({
//             title: query,
//             name: query,
//           }).toString(),
//         });
//       }

//       if (!response.ok) {
//         const errorBody = await response.text();

//         throw new Error(`Error ${response.status}: ${errorBody}`);
//       }

//       const data: RequestResults = await response.json();

//       return data;
//     } catch (err) {
//       if (err instanceof Error) throw err;

//       throw new Error('Unknown error');
//     }
//   };

//   public fetchDataById = async (id: string) => {
//     const url = `${this.baseURL}?uid=${id}`;

//     try {
//       const response: Response = await fetch(url);

//       if (!response.ok) {
//         const errorBody = await response.text();

//         throw new Error(`Error ${response.status}: ${errorBody}`);
//       }

//       const item = await response.json();

//       return item;
//     } catch (err) {
//       if (err instanceof Error) {
//         throw err;
//       }

//       throw new Error('Unknown error');
//     }
//   };
// }

// const comicsService = new ComicsApi();

// export default comicsService;
