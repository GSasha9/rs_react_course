import type { QueryParams } from '../models/interfaces';

export const generateQueryStringPage = (queryParams: QueryParams): string =>
  queryParams ? `?title=${queryParams.name}&name=${queryParams.name}` : ``;
