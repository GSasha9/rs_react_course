import { useState } from 'react';
import { useSelector } from 'react-redux';

import './main-page.scss';

import FormUncontrolled from '@/components/forms/form-uncontrolled/form-uncontrolled';
import HookForm from '@/components/forms/hook-form/hook-form';
import Modal from '@/components/modal/modal';
import Tile from '@/components/tile/tile';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { selectFormData } from '@/store/selectors/form-data.selector';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalChild, setModalChild] = useState(
    <FormUncontrolled handleClose={handleClose} />
  );

  const { uncontrolledForm, hookForm } = useSelector(selectFormData);

  if (!uncontrolledForm || !hookForm) {
    throw new Error(ERROR_MESSAGES.unknown);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <main className="main">
      <section className="section">
        <Tile
          name={uncontrolledForm.name}
          age={uncontrolledForm.age}
          email={uncontrolledForm.email}
          password={uncontrolledForm.password}
          gender={uncontrolledForm.gender}
          acceptTC={uncontrolledForm.acceptTC}
          country={uncontrolledForm.country}
          file={uncontrolledForm.file}
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
          name={hookForm.name}
          age={hookForm.age}
          email={hookForm.email}
          password={hookForm.password}
          gender={hookForm.gender}
          acceptTC={hookForm.acceptTC}
          country={hookForm.country}
          file={hookForm.file}
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
