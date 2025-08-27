import rawData from '../../owid-co2-data.json';
import { type CountryEntry } from '../types/country-entry';

export const DATA_ENTRIES: CountryEntry[] = Object.entries(rawData).map(
  ([country, obj]) => {
    const d = obj.data;
    const last = d[d.length - 1];

    return { country, iso_code: obj.iso_code, last };
  }
);
