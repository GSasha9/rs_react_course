import api from '@/shared/api/api';
import type { RequestResults } from '@/shared/models/interfaces';

export const startSearch = async (
  select: string,
  query: string
): Promise<RequestResults | undefined> => {
  return api.fetchData(select, query);
};
