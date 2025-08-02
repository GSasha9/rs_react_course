import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import SearchPage from '@/pages/search-page/search-page';
import { setupStore } from '@/tests/test-utils/utils/setup-store';

const renderSearchPage = () => {
  const store = setupStore();

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route path="search" element={<SearchPage />}></Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('SelectedCardFlyout', () => {
  test('renders with correct number of items', async () => {
    renderSearchPage();

    const checkboxes = await screen.findAllByTestId('checkbox');

    expect(checkboxes.length).toBeGreaterThan(0);
    await userEvent.click(checkboxes[0]);

    expect(screen.getByText('1 items are selected')).toBeInTheDocument();
  });

  test('unselect all button works correctly', async () => {
    renderSearchPage();

    const checkboxes = await screen.findAllByTestId('checkbox');

    expect(checkboxes.length).toBeGreaterThan(0);
    await userEvent.click(checkboxes[0]);

    const unselectBtn = screen.getByRole('button', { name: /unselect all/i });

    await userEvent.click(unselectBtn);

    expect(screen.queryByText(/1 items are selected/i)).not.toBeInTheDocument();
  });
});
