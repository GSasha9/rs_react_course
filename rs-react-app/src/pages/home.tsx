import React, { useState } from 'react';
import { useEffect } from 'react';

import './home.scss';

import Modal from '@/components/modal/modal';
import Row from '@/components/row/row';
import { type CountryDataPoint } from '@/shared/types/country-entry';
import { type CountryEntry } from '@/shared/types/country-entry';
import type { JsonType } from '@/shared/types/json-type';

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [properties, setProperties] = useState<string[] | null>([]);
  const [data, setData] = useState<CountryEntry[]>([]);
  const [searchData, setSearchData] = useState<CountryEntry[] | null>(null);
  const [, setSearch] = useState('');
  const [year, setYear] = useState(2023);
  const [filter, setFilter] = useState('name');
  const [filterDirection, setFilterDirection] = useState('asc');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(year?: number) {
    const data = await fetch('/owid-co2-data.json');

    const dataJson = await data.json();

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

    setData(DATA_ENTRIES);
  }

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  function handleFilters(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;

    if (value === 'name' || value === 'population') {
      setFilter(value);
    } else if (value === 'asc' || value === 'desc') {
      setFilterDirection(value);
    }

    const sortField =
      value === 'name' || value === 'population' ? value : filter;
    const sortDirection =
      value === 'asc' || value === 'desc' ? value : filterDirection;

    const actualData = searchData ?? data;

    const filteredData = [...actualData].sort((a, b) => {
      let cmp = 0;

      if (sortField === 'name') {
        cmp = a.country.localeCompare(b.country);
      } else if (sortField === 'population') {
        cmp = (a.last.population ?? 0) - (b.last.population ?? 0);
      }

      return sortDirection === 'asc' ? cmp : -cmp;
    });

    setSearchData(filteredData);
  }

  const handleProperties = (value: string) => {
    if (!properties) {
      setProperties([value]);
    } else if (properties.includes(value)) {
      setProperties(properties.filter((el) => el !== value));
    } else {
      setProperties([...properties, value]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.currentTarget.value.toLocaleLowerCase();

    if (newSearch === '') {
      setSearchData(null);
    } else {
      const newArrOfData = data.filter((el) =>
        el.country.toLocaleLowerCase().startsWith(newSearch)
      );

      setSearchData(newArrOfData);
    }

    setSearch(newSearch);
  };

  const rows = searchData ?? data;

  return (
    <main className="main">
      <div className="controls">
        <div className="controls__search controls__item">
          <input
            type="text"
            placeholder="search country..."
            onChange={handleSearch}
          ></input>
        </div>
        <div className="controls__sort controls__item">
          <label htmlFor="sort">Sort by:</label>
          <select
            name="sort"
            id="sort"
            onChange={(e) => {
              handleFilters(e);
            }}
          >
            <option value="name">name</option>
            <option value="population">population</option>
          </select>
          <select
            name="sort-direction"
            id="sort-direction"
            onChange={(e) => {
              handleFilters(e);
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
          <button onClick={() => fetchData(year)}>show</button>
        </div>
        <button className="controls_button" onClick={openModal}>
          Add columns
        </button>
      </div>
      <div className="table">
        <div className="table_head">
          <span className="table_head-item">Country</span>
          <span className="table_head-item">ISO_code</span>
          <span className="table_head-item">Year</span>
          <span className="table_head-item">Population</span>
          <span className="table_head-item">Cement_co2</span>
          <span className="table_head-item">Cement_co2_per_capita</span>
          {properties &&
            properties.map((el) => {
              const key = el as keyof CountryDataPoint;

              return (
                <span className="table_head-item" key={key}>
                  {key}
                </span>
              );
            })}
        </div>

        {rows.map((_, index) => {
          return (
            <Row
              data={searchData ? searchData : data}
              index={index}
              key={index}
              property={properties}
            />
          );
        })}
      </div>
      <Modal
        isOpen={isOpenModal}
        handleClose={closeModal}
        handleProperties={handleProperties}
      ></Modal>
    </main>
  );
};

export default HomePage;
