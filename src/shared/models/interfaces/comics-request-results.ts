import type { Page } from './page';

export interface ComicsRequestResults {
  page: Page;
  sort: object;
  [key: string]: unknown;
}
