import type { Page } from './page';

export interface RequestResults {
  page: Page;
  sort: object;
  [key: string]: unknown;
}
