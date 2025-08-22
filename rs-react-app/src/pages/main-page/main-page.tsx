import { useState } from 'react';

import './main-page.scss';

import FormUncontrolled from '@/components/forms/form-uncontrolled/form-uncontrolled';
import Modal from '@/components/modal/modal';
import Tile from '@/components/tile/tile';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <main className="main">
      <section className="section">
        <Tile />
        <button type="button" onClick={() => setIsOpen(true)}>
          Uncontrolled form
        </button>
      </section>
      <section className="section">
        <Tile />
        <button type="button">Hook form</button>
      </section>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <FormUncontrolled />
      </Modal>
    </main>
  );
};

export default MainPage;
