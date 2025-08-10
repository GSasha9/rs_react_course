import comicsService from '@/services/api/comics-api';
import type { RequestResults } from '@/shared/models/interfaces';

export const startSearch = async (
  query: string,
  pageNumber: number
): Promise<RequestResults | undefined> => {
  const page = pageNumber !== 0 ? pageNumber - 1 : 0;

  return comicsService.fetchData(query, page);
};
