import { useSelector } from 'react-redux';

import './modal.scss';

import { store } from '@/store';
import { getColumns } from '@/store/selectors/columns.selector';
import { handleColumns } from '@/store/slices/columns-slice';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleProperties: (value: string) => void;
}

const Modal = ({ isOpen, handleClose, handleProperties }: ModalProps) => {
  const checkedInput = useSelector(getColumns)[0].name;

  if (!isOpen) return;

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) handleClose();
  };

  const handleCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
    store.dispatch(handleColumns(e.currentTarget.value));
    handleProperties(e.currentTarget.value);
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div className="properties">
        <button className="close" onClick={handleClose}>
          Close
        </button>
        <label className="properties-item" htmlFor="cumulative_cement_co2">
          <input
            type="checkbox"
            name="cumulative_cement_co2"
            defaultChecked={checkedInput.includes('cumulative_cement_co2')}
            value="cumulative_cement_co2"
            onClick={(e) => handleCheckbox(e)}
          />
          cumulative cement co2
        </label>
        <label className="properties-item" htmlFor="methane">
          <input
            type="checkbox"
            name="methane"
            defaultChecked={checkedInput.includes('methane')}
            value="methane"
            onClick={(e) => handleCheckbox(e)}
          />
          methane
        </label>
        <label
          className="properties-item"
          htmlFor="temperature_change_from_co2"
        >
          <input
            type="checkbox"
            name="temperature_change_from_co2"
            defaultChecked={checkedInput.includes(
              'temperature_change_from_co2'
            )}
            value="temperature_change_from_co2"
            onClick={(e) => handleCheckbox(e)}
          />
          temperature change from co2
        </label>
        <label className="properties-item" htmlFor="oil_co2">
          <input
            type="checkbox"
            name="oil_co2"
            defaultChecked={checkedInput.includes('oil_co2')}
            value="oil_co2"
            onClick={(e) => handleCheckbox(e)}
          />
          oil_co2
        </label>
      </div>
    </div>
  );
};

export default Modal;
