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
            const jsonData = obj as JsonType;
            const jsonCountryData = jsonData.data;
            let requestedYear;

            if (!year) {
              requestedYear = jsonCountryData[jsonCountryData.length - 1];
            } else {
              requestedYear = jsonCountryData.filter(
                (el) => el.year === year
              )[0];
            }

            if (!requestedYear) return null;

            return { country, iso_code: jsonData.iso_code, requestedYear };
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
