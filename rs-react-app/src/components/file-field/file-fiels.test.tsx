import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import FileField from './file-field';

describe('FileField component', () => {
  it('converts uploaded image to base64 and calls onFileSelect', async () => {
    const onFileSelect = vi.fn();
    const user = userEvent.setup();

    render(<FileField onFileSelect={onFileSelect} />);

    const input = screen.getByLabelText(/choose image/i) as HTMLInputElement;

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    await user.upload(input, file);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(onFileSelect).toHaveBeenCalled();

    const base64Result = onFileSelect.mock.calls[0][0];

    expect(base64Result).toMatch(/^data:image\/png;base64,/);
  });

  it('does not call onFileSelect for invalid file type', async () => {
    const onFileSelect = vi.fn();
    const user = userEvent.setup();

    render(<FileField onFileSelect={onFileSelect} />);

    const input = screen.getByLabelText(/choose image/i) as HTMLInputElement;

    const file = new File(['dummy content'], 'test.txt', {
      type: 'text/plain',
    });

    await user.upload(input, file);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(onFileSelect).not.toHaveBeenCalled();
  });

  it('does not call onFileSelect for too large files', async () => {
    const onFileSelect = vi.fn();
    const user = userEvent.setup();

    render(<FileField onFileSelect={onFileSelect} />);

    const input = screen.getByLabelText(/choose image/i) as HTMLInputElement;

    const bigFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'big.png', {
      type: 'image/png',
    });

    await user.upload(input, bigFile);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(onFileSelect).not.toHaveBeenCalled();
  });
});
