import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Modal from './modal';

describe('Modal component', () => {
  const handleClose = vi.fn();

  const modalContentText = 'Modal Content';

  beforeEach(() => {
    const root = document.createElement('div');

    root.setAttribute('id', 'root');
    document.body.appendChild(root);
  });

  afterEach(() => {
    const root = document.getElementById('root');

    if (root) {
      document.body.removeChild(root);
    }
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} handleClose={handleClose}>
        <div>{modalContentText}</div>
      </Modal>
    );

    expect(screen.queryByText(modalContentText)).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} handleClose={handleClose}>
        <div>{modalContentText}</div>
      </Modal>
    );

    expect(screen.getByText(modalContentText)).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} handleClose={handleClose}>
        <div>{modalContentText}</div>
      </Modal>
    );

    const closeButton = screen.getByText(/close/i);

    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });

  it('calls handleClose when clicking outside the modal content', async () => {
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} handleClose={handleClose}>
        <div>{modalContentText}</div>
      </Modal>
    );

    const overlay = screen.getByText(modalContentText).parentElement
      ?.parentElement as HTMLElement;

    await user.click(overlay);

    expect(handleClose).toHaveBeenCalled();
  });

  it('calls handleClose when pressing ESC key', () => {
    render(
      <Modal isOpen={true} handleClose={handleClose}>
        <div>{modalContentText}</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(handleClose).toHaveBeenCalled();
  });

  it('renders content inside portal', () => {
    render(
      <Modal isOpen={true} handleClose={handleClose}>
        <div>{modalContentText}</div>
      </Modal>
    );

    expect(document.body).toContainElement(screen.getByText(modalContentText));
  });
});
