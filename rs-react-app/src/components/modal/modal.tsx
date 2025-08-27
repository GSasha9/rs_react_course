import './modal.scss';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ isOpen, handleClose }: ModalProps) => {
  if (!isOpen) return;

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) handleClose();
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div className="properties">
        <button className="close" onClick={handleClose}>
          Close
        </button>
        <label className="properties-item" htmlFor="cumulative_cement_co2">
          <input type="checkbox" name="cumulative_cement_co2" />
          cumulative cement co2
        </label>
        <label className="properties-item" htmlFor="methane">
          <input type="checkbox" name="methane" />
          methane
        </label>
        <label
          className="properties-item"
          htmlFor="temperature_change_from_co2"
        >
          <input type="checkbox" name="temperature_change_from_co2" />
          temperature change from co2
        </label>
        <label className="properties-item" htmlFor="oil_co2">
          <input type="checkbox" name="oil_co2" />
          oil_co2
        </label>
      </div>
    </div>
  );
};

export default Modal;
