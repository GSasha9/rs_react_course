import type { CountryDataPoint } from './country-entry';

export type JsonType = {
  iso_code: string;
  data: CountryDataPoint[];
};
