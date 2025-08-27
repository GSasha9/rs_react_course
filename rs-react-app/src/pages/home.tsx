import { useState } from 'react';

import './home.scss';

import Modal from '@/components/modal/modal';
import Row from '@/components/row/row';
import { DATA_ENTRIES } from '@/shared/constants/data-entries';

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <main className="main">
      <div className="controls">
        <div className="controls__search">
          <input type="text" placeholder="search country..."></input>
        </div>
        <div className="controls__sort">
          <label htmlFor="sort">Sort by:</label>
          <select name="sort" id="sort">
            <option value="name">name</option>
            <option value="population">population</option>
          </select>
        </div>
        <button onClick={openModal}>Add columns</button>
      </div>
      <div className="table">
        <div className="table_head">
          <span className="table_head-item">Country</span>
          <span className="table_head-item">ISO_code</span>
          <span className="table_head-item">Year</span>
          <span className="table_head-item">Population</span>
          <span className="table_head-item">Cement_co2</span>
          <span className="table_head-item">Cement_co2_per_capita</span>
        </div>
        {DATA_ENTRIES.map((_, index) => {
          return <Row data={DATA_ENTRIES} index={index} key={index} />;
        })}
      </div>
      <Modal isOpen={isOpenModal} handleClose={closeModal}></Modal>
    </main>
  );
};

export default HomePage;
