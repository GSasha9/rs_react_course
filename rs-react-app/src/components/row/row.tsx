import './row.scss';

import type {
  CountryDataPoint,
  CountryEntry,
} from '@/shared/types/country-entry';

interface RowProps {
  data: CountryEntry[];
  index: number;
  property?: (keyof CountryDataPoint)[];
}

const Row = ({ data, index, property }: RowProps) => {
  const item = data[index];

  return (
    <div className="row">
      <span className="row_item">{item.country}</span>
      <span className="row_item">{item.iso_code}</span>
      <span className="row_item">{item.last.year}</span>
      <span className="row_item">{item.last.population}</span>
      <span className="row_item">{item.last.cement_co2}</span>
      <span className="row_item">{item.last.cement_co2_per_capita}</span>
      {property &&
        property.map((el: keyof CountryDataPoint) => (
          <span className="row_item" key={el}>
            {item.last[el]}
          </span>
        ))}
    </div>
  );
};

export default Row;
