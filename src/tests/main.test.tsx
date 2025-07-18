import { expect, test, vi } from 'vitest';

const renderMock = vi.fn();
const createRootMock = vi.fn(() => ({
  render: renderMock,
}));

vi.mock('react-dom/client', () => ({
  createRoot: createRootMock,
}));

test('renders App into root container', async () => {
  const root = document.createElement('div');

  root.id = 'root';
  document.body.appendChild(root);

  await import('../main.tsx');

  expect(createRootMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledTimes(1);
});
