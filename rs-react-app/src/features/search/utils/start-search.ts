import api from '../../../shared/api/api';
import type { RequestResults } from '../../../shared/models/interfaces/request-results';

export const startSearch = async (): Promise<RequestResults | undefined> => {
  try {
    const result = await api.fetchData();

    return result;
  } catch {
    throw new Error('failed to fetch data');
  }
};
