import './row.scss';

import type { CountryEntry } from '@/shared/types/country-entry';

interface RowProps {
  data: CountryEntry[];
  index: number;
}

const Row = ({ data, index }: RowProps) => {
  const item = data[index];

  return (
    <div className="row">
      <span className="row_item">{item.country}</span>
      <span className="row_item">{item.last.year}</span>
      <span className="row_item">{item.last.population}</span>
      <span className="row_item">{item.last.cement_co2}</span>
      <span className="row_item">{item.last.cement_co2_per_capita}</span>
    </div>
  );
};

export default Row;
