import React, { memo, useCallback, useMemo, useState } from 'react';

import './home.scss';

import { useGetCountriesByYearQuery } from '@/api/countries-api';
import Modal from '@/components/modal/modal';
import Spinner from '@/components/spinner/spinner';
import Table from '@/components/table/table';
import { type CountryEntry } from '@/shared/types/country-entry';

const HomePage = memo(function HomePage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState(2023);
  const [filter, setFilter] = useState<'name' | 'population'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { data, isLoading, isError } = useGetCountriesByYearQuery(year);

  const openModal = useCallback(() => setIsOpenModal(true), []);
  const closeModal = useCallback(() => setIsOpenModal(false), []);

  const handleColumns = useCallback((value: string) => {
    setColumns((prev) => {
      if (!prev) return [value];

      if (prev.includes(value)) return prev.filter((el) => el !== value);

      return [...prev, value];
    });
  }, []);

  const handleFilters = (value: string) => {
    if (value === 'name' || value === 'population') setFilter(value);
    else if (value === 'asc' || value === 'desc') setSortDirection(value);
  };

  const filteredData = useMemo(() => {
    if (!data) return [];

    let result: CountryEntry[] = data;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();

      result = result.filter((el) => el.country.toLowerCase().startsWith(term));
    }

    result = [...result].sort((a, b) => {
      let cmp = 0;

      if (filter === 'name') cmp = a.country.localeCompare(b.country);
      else if (filter === 'population')
        cmp =
          (a.requestedYear.population ?? 0) - (b.requestedYear.population ?? 0);

      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [data, searchTerm, filter, sortDirection]);

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error loading data</div>;

  return (
    <main className="main">
      <div className="controls">
        <div className="controls__search controls__item">
          <input
            type="text"
            placeholder="search country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
          />
        </div>

        <div className="controls__sort controls__item">
          <label htmlFor="sort">Sort by:</label>
          <select
            name="sort"
            id="sort"
            onChange={(e) => handleFilters(e.target.value)}
          >
            <option value="name">name</option>
            <option value="population">population</option>
          </select>

          <select
            name="sort-direction"
            id="sort-direction"
            onChange={(e) => handleFilters(e.target.value)}
          >
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </div>

        <div className="controls__year controls__item">
          <label htmlFor="year">Info for</label>
          <input
            id="year"
            type="number"
            name="year"
            placeholder="enter year(numbers only)"
            value={year}
            onChange={(e) => setYear(Number(e.currentTarget.value))}
          />
          <span>year</span>
        </div>

        <button className="controls_button" onClick={openModal}>
          Add columns
        </button>
      </div>

      <Table columns={columns} rows={filteredData} />

      {isOpenModal && (
        <Modal handleClose={closeModal} handleProperties={handleColumns} />
      )}
    </main>
  );
});

export default HomePage;
