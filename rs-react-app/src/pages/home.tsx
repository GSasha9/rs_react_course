import React, { memo, useCallback, useMemo, useState } from 'react';

import './home.scss';

import Modal from '@/components/modal/modal';
import Table from '@/components/table/table';
import { type CountryEntry } from '@/shared/types/country-entry';

interface HomePageProps {
  resources: {
    read: () => CountryEntry[];
  };
  handleYear: (year: number) => void;
}

const HomePage = memo(function HomePage({
  resources,
  handleYear,
}: HomePageProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [columns, setColumns] = useState<string[] | null>([]);
  const [searchData, setSearchData] = useState<CountryEntry[] | null>(null);
  const [, setSearchRequest] = useState('');
  const [year, setYear] = useState(2023);
  const [filter, setFilter] = useState('name');
  const [filterDirection, setFilterDirection] = useState('asc');

  const data = resources.read();

  const openModal = useCallback(() => setIsOpenModal(true), []);

  const closeModal = useCallback(() => setIsOpenModal(false), []);

  function handleFilters(value: string) {
    if (value === 'name' || value === 'population') {
      setFilter(value);
    } else if (value === 'asc' || value === 'desc') {
      setFilterDirection(value);
    }

    applyFilters();
  }

  const applyFilters = useCallback(() => {
    const dataForFilter = searchData ?? data;
    const filteredData = [...dataForFilter].sort((a, b) => {
      let cmp = 0;

      if (filter === 'name') {
        cmp = a.country.localeCompare(b.country);
      } else if (filter === 'population') {
        cmp =
          (a.requestedYear.population ?? 0) - (b.requestedYear.population ?? 0);
      }

      return filterDirection === 'asc' ? cmp : -cmp;
    });

    setSearchData(filteredData);
  }, [filter, filterDirection, searchData, data]);

  const handleColumns = useCallback((value: string) => {
    setColumns((prev) => {
      if (!prev) return [value];

      if (prev.includes(value)) return prev.filter((el) => el !== value);

      return [...prev, value];
    });
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      {
        const newSearch = value.toLocaleLowerCase();

        if (newSearch === '') {
          setSearchData(null);
        } else {
          const newArrOfData = data.filter((el) =>
            el.country.toLocaleLowerCase().startsWith(newSearch)
          );

          setSearchData(newArrOfData);
        }

        setSearchRequest(newSearch);
      }
    },
    [data]
  );

  const rows = useMemo(() => searchData ?? [...data], [searchData, data]);

  return (
    <main className="main">
      <div className="controls">
        <div className="controls__search controls__item">
          <input
            type="text"
            placeholder="search country..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;

              handleSearch(value);
            }}
          ></input>
        </div>
        <div className="controls__sort controls__item">
          <label htmlFor="sort">Sort by:</label>
          <select
            name="sort"
            id="sort"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const value = e.target.value;

              handleFilters(value);
            }}
          >
            <option value="name">name</option>
            <option value="population">population</option>
          </select>
          <select
            name="sort-direction"
            id="sort-direction"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const value = e.currentTarget.value;

              handleFilters(value);
            }}
          >
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </div>
        <div className="controls__year controls__item">
          <label htmlFor="year">Info for</label>
          <input
            id="year"
            name="year"
            placeholder="enter year(numbers only)"
            onChange={(e) => setYear(Number(e.currentTarget.value))}
          ></input>
          <span>year</span>
          <button
            onClick={() => {
              handleYear(year);
            }}
          >
            show
          </button>
        </div>
        <button className="controls_button" onClick={openModal}>
          Add columns
        </button>
      </div>

      <Table columns={columns ? columns : []} rows={rows} />

      <Modal
        isOpen={isOpenModal}
        handleClose={closeModal}
        handleProperties={handleColumns}
      ></Modal>
    </main>
  );
});

export default HomePage;
