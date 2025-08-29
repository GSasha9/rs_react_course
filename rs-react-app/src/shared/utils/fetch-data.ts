import type { CountryEntry } from '../types/country-entry';
import type { JsonType } from '../types/json-type';

const fetchData = (year?: number) => {
  let status = 'pending';
  let result: CountryEntry[] | Error;

  const promise = fetch('/owid-co2-data.json')
    .then((res) => res.json())
    .then(
      (dataJson: Record<string, JsonType>) => {
        const DATA_ENTRIES: CountryEntry[] = Object.entries(dataJson)
          .map(([country, obj]) => {
            const newObj = obj as JsonType;
            const d = newObj.data;
            let last;

            if (!year) {
              last = d[d.length - 1];
            } else {
              last = d.filter((el) => el.year === year)[0];
            }

            if (!last) return null;

            return { country, iso_code: newObj.iso_code, last };
          })
          .filter((entry): entry is CountryEntry => entry !== null);

        status = 'success';
        result = DATA_ENTRIES;
      },
      (error) => {
        status = 'error';
        result = error;
      }
    );

  return {
    read() {
      if (status === 'pending') throw promise;

      if (status === 'error') throw result;

      return result as CountryEntry[];
    },
  };
};

export default fetchData;
