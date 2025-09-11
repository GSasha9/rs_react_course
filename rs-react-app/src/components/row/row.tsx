import { memo } from 'react';

import './row.scss';

import type {
  CountryDataPoint,
  CountryEntry,
} from '@/shared/types/country-entry';

interface RowProps {
  item: CountryEntry;
  property?: string[] | null;
}

const Row = memo(function Row({ item, property }: RowProps) {
  return (
    <div className="row">
      <span className="row_item">{item.country}</span>
      <span className="row_item">{item.isoCode}</span>
      <span className="row_item">{item.requestedYear.year}</span>
      <span className="row_item">{item.requestedYear.population}</span>
      <span className="row_item">{item.requestedYear.cementCo2}</span>
      <span className="row_item">{item.requestedYear.cementCo2PerCapita}</span>
      {property &&
        property.map((el) => {
          const key = el as keyof CountryDataPoint;

          return (
            <span className="row_item" key={key}>
              {item.requestedYear[key]}
            </span>
          );
        })}
    </div>
  );
});

export default Row;
