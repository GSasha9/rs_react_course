import { useState } from 'react';
import { useSelector } from 'react-redux';

import './main-page.scss';

import FormUncontrolled from '@/components/forms/form-uncontrolled/form-uncontrolled';
import HookForm from '@/components/forms/hook-form/hook-form';
import Modal from '@/components/modal/modal';
import Tile from '@/components/tile/tile';
import { selectFormData } from '@/store/selectors/form-data.selector';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalChild, setModalChild] = useState(
    <FormUncontrolled handleClose={handleClose} />
  );

  const data = useSelector(selectFormData);

  if (!data || !data.uncontrolledForm || !data.hookForm) {
    throw new Error('Something went wrong!');
  }

  function handleClose() {
    setIsOpen(false);
  }

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
          file={data.uncontrolledForm.file}
        />
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setModalChild(<FormUncontrolled handleClose={handleClose} />);
          }}
        >
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
          file={data.hookForm.file}
        />
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setModalChild(<HookForm handleClose={handleClose} />);
          }}
        >
          Hook form
        </button>
      </section>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        {modalChild}
      </Modal>
    </main>
  );
};

export default MainPage;
