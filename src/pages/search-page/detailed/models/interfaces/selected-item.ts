import type { Writer } from '.';
import type { Character } from '.';

export interface SelectedItem {
  title?: string;
  numberOfPages?: number;
  publishedDay?: number;
  publishedMonth?: number;
  publishedYear?: number;
  photonovel?: boolean;
  adaptation?: boolean;
  yearFrom?: number;
  yearTo?: number;

  writers?: Writer[];
  characters?: Character[];

  [key: string]: unknown;
}
