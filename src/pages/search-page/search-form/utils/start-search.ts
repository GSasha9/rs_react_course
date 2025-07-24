import api from '@/shared/api/api';
import type { RequestResults } from '@/shared/models/interfaces';

export const startSearch = async (
  select: string,
  query: string,
  pageNumber: number
): Promise<RequestResults | undefined> => {
  const page = pageNumber !== 0 ? pageNumber - 1 : 0;

  return api.fetchData(select, query, page);
};
