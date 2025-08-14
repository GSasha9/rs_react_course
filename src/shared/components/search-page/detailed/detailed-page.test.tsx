import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { beforeEach } from 'node:test';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import { server } from '../../../../tests/test-utils/mocks/setup-server';
import DetailedPage from './detailed-page';

import { appStore } from '@/store';

const mockItem = {
  comics: {
    title: 'Test Comic',
    author: 'Test Author',
    year: 2023,
    nested: {
      publisher: 'Test Publisher',
    },
  },
};

describe('Detailed page', () => {
  beforeEach(() => {
    server.resetHandlers();
  });
  test('renders detailed page correctly with route state', () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter
          initialEntries={[{ pathname: '/details', state: { item: mockItem } }]}
        >
          <Routes>
            <Route path="/details" element={<DetailedPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('detailedPage')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    expect(screen.getByText(/Test Comic/)).toBeInTheDocument();
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
    expect(screen.getByText(/Test Publisher/)).toBeInTheDocument();
  });

  test('shows error message on failed fetch', async () => {
    server.use(
      http.get('https://stapi.co/api/v1/rest/comics', () => {
        return HttpResponse.error();
      })
    );

    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/details/CCMA0000134202']}>
          <Routes>
            <Route path="/details/:uid" element={<DetailedPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(
      await screen.findByText(/Something went wrong/i)
    ).toBeInTheDocument();
  });

  test('detailed card data cashed', async () => {
    let callCountForCash = 0;

    server.use(
      http.get('https://stapi.co/api/v1/rest/comics', async ({ request }) => {
        callCountForCash += 1;

        const url = new URL(request.url);
        const uid = url.searchParams.get('uid');

        if (uid === 'CCMA0000189821') {
          await new Promise((r) => setTimeout(r, 300));

          return HttpResponse.json({
            comics: {
              uid,
              title: `Mock Comic with UID ${uid}`,
              description: 'Some description',
            },
          });
        }

        return HttpResponse.json({
          comics: null,
        });
      })
    );

    const { rerender } = render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/details/CCMA0000189821']}>
          <Routes>
            <Route path="/details/:uid" element={<DetailedPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(
      await screen.findByText(/Mock Comic with UID CCMA0000189821/)
    ).toBeInTheDocument();
    expect(callCountForCash).toBe(1);

    rerender(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/details/CCMA0000189821']}>
          <Routes>
            <Route path="/details/:uid" element={<DetailedPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(
      await screen.findByText(/Mock Comic with UID CCMA0000189821/)
    ).toBeInTheDocument();
    expect(callCountForCash).toBe(1);
  });

  test('initialize new API call by clicking refetch button', async () => {
    let callCount = 0;

    server.resetHandlers();
    server.use(
      http.get('https://stapi.co/api/v1/rest/comics', async ({ request }) => {
        callCount += 1;

        const url = new URL(request.url);
        const uid = url.searchParams.get('uid');

        if (uid === 'CCMA0000060022') {
          await new Promise((r) => setTimeout(r, 300));

          return HttpResponse.json({
            comics: {
              uid,
              title: `Mock Comic with UID ${uid}`,
              description: 'Some description',
            },
          });
        }

        return HttpResponse.json({
          comics: null,
        });
      })
    );

    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/details/CCMA0000060022']}>
          <Routes>
            <Route path="/details/:uid" element={<DetailedPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(
      await screen.findByText(/Mock Comic with UID CCMA0000060022/)
    ).toBeInTheDocument();
    expect(callCount).toBe(1);

    const button = screen.getByRole('button', { name: /refetch/i });

    await userEvent.click(button);

    await screen.findByText(/Mock Comic with UID CCMA0000060022/);

    expect(callCount).toBe(2);
  });
});
