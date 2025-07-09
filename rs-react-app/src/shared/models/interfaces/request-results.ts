import type { Page } from '../types';

export interface RequestResults {
  page: Page;
  sort: object;
  [key: string]: unknown;
}
