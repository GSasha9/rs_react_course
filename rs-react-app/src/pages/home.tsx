import { useState } from 'react';

import './home.scss';

import Modal from '@/components/modal/modal';
import Row from '@/components/row/row';
import { DATA_ENTRIES } from '@/shared/constants/data-entries';
import { type CountryDataPoint } from '@/shared/types/country-entry';

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [properties, setProperties] = useState<string[] | null>([]);
  const [data, setData] = useState(DATA_ENTRIES);
  const [, setSearch] = useState('');

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

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
      setData(DATA_ENTRIES);
    } else {
      const newArrOfData = DATA_ENTRIES.filter((el) =>
        el.country.toLocaleLowerCase().startsWith(newSearch)
      );

      setData(newArrOfData);
    }

    setSearch(newSearch);
  };

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
          <select name="sort" id="sort">
            <option value="name">name</option>
            <option value="population">population</option>
          </select>
          <select name="sort-direction" id="sort">
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
          ></input>
          <span>year</span>
          <button>show</button>
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
        {data.map((_, index) => {
          return (
            <Row data={data} index={index} key={index} property={properties} />
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