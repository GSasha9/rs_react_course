import { createPortal } from 'react-dom';

const container = document.getElementById('root');

if (!container) throw new Error('Root container not found');

interface ModalProps {
  children: React.ReactElement;
  isOpen: boolean;
}

const Modal = ({ children, isOpen }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal">{children}</div>,

    container
  );
};

export default Modal;
