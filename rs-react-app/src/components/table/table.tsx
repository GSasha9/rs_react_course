import { memo, Profiler } from 'react';

import Row from '../row/row';

import type {
  CountryDataPoint,
  CountryEntry,
} from '@/shared/types/country-entry';

interface TableProps {
  columns?: string[];
  rows: CountryEntry[];
}

const Table = memo(function Table({ columns, rows }: TableProps) {
  return (
    <Profiler
      id="profiler_table"
      onRender={(
        id,
        phase,
        actualDuration,
        startTime,
        commitTime,
        interactions
      ) => {
        console.log({
          id,
          phase,
          actualDuration,
          startTime,
          commitTime,
          interactions,
        });
      }}
    >
      <div className="table">
        <div className="table_head">
          <span className="table_head-item">Country</span>
          <span className="table_head-item">ISO_code</span>
          <span className="table_head-item">Year</span>
          <span className="table_head-item">Population</span>
          <span className="table_head-item">Cement_co2</span>
          <span className="table_head-item">Cement_co2_per_capita</span>
          {columns &&
            columns.map((el) => {
              const key = el as keyof CountryDataPoint;

              return (
                <span className="table_head-item" key={key}>
                  {key}
                </span>
              );
            })}
        </div>

        {rows.map((el) => {
          return (
            <Row
              item={el}
              key={`${el.country}-${el.requestedYear.year}`}
              property={columns}
            />
          );
        })}
      </div>
    </Profiler>
  );
});

export default Table;
