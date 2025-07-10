import api from '../../../shared/api/api';
import type { RequestResults } from '../../../shared/models/interfaces/request-results';

export const startSearch = async (
  select: string,
  query: string
): Promise<RequestResults | undefined> => {
  try {
    const result = await api.fetchData(select, query);

    return result;
  } catch {
    throw new Error('failed to fetch data');
  }
};
