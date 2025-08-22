import { useState } from 'react';
import { useSelector } from 'react-redux';

import './main-page.scss';

import FormUncontrolled from '@/components/forms/form-uncontrolled/form-uncontrolled';
import Modal from '@/components/modal/modal';
import Tile from '@/components/tile/tile';
import { selectFormData } from '@/store/selectors/form-data.selector';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const data = useSelector(selectFormData);

  if (!data || !data.uncontrolledForm || !data.hookForm) {
    throw new Error('Something went wrong!');
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <main className="main">
      <section className="section">
        <Tile
          name={data.uncontrolledForm.name}
          age={data.uncontrolledForm.age}
          email={data.uncontrolledForm.email}
          password={data.uncontrolledForm.password}
          gender={data.uncontrolledForm.gender}
          acceptTC={data.uncontrolledForm.acceptTC}
          country={data.uncontrolledForm.country}
        />
        <button type="button" onClick={() => setIsOpen(true)}>
          Uncontrolled form
        </button>
      </section>
      <section className="section">
        <Tile
          name={data.hookForm.name}
          age={data.hookForm.age}
          email={data.hookForm.email}
          password={data.hookForm.password}
          gender={data.hookForm.gender}
          acceptTC={data.hookForm.acceptTC}
          country={data.hookForm.country}
        />
        <button type="button">Hook form</button>
      </section>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <FormUncontrolled />
      </Modal>
    </main>
  );
};

export default MainPage;
