export type CountryDataPoint = {
  year: number;
  population?: number;
  cementCo2?: number;
  cementCo2PerCapita?: number;
};

export type CountryEntry = {
  country: string;
  isoCode: string;
  requestedYear: CountryDataPoint;
};
