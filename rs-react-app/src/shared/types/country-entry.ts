export type CountryDataPoint = {
  year: number;
  population?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
};

export type CountryEntry = {
  country: string;
  iso_code: string;
  last: CountryDataPoint;
};
