import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import './modal.scss';

const container = document.getElementById('root');

if (!container) throw new Error('Root container not found');

interface ModalProps {
  children: React.ReactElement;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  useEffect(() => {
    const closeOnEscKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null;

    document.body.addEventListener('keydown', closeOnEscKey);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscKey);
    };
  });

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal"
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) {
          handleClose();
        }
      }}
    >
      <div className="modal-content">
        {' '}
        <button className="close" onClick={handleClose}>
          Close
        </button>
        {children}
      </div>
    </div>,

    container
  );
};

export default Modal;
