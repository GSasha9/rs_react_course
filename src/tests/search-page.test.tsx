// import { render, screen, waitFor } from '@testing-library/react';
// import { waitForElementToBeRemoved } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { http, HttpResponse } from 'msw';
// import { Provider } from 'react-redux';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import { beforeEach, describe, expect, test, vi } from 'vitest';

// import SearchForm from '@/shared/components/search-page/search-form/ui/search-form';

// import { appStore } from '@/store';
// import { mockResponse } from '@/tests/test-utils/mocks';
// import { server } from '@/tests/test-utils/mocks/setup-server';

// describe('Search Page', () => {
//   let callCount = 0;

//   beforeEach(() => {
//     server.resetHandlers();
//     server.use(
//       http.get('https://stapi.co/api/v1/rest/comics/search', () => {
//         callCount += 1;

//         return HttpResponse.error();
//       })
//     );
//   });
//   test('renders search form', () => {
//     render(
//       <Provider store={appStore}>
//         <MemoryRouter initialEntries={['/search']}>
//           <Routes>
//             <Route path="/search" element={<SearchPage />} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(screen.getByRole('textbox')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
//   });

//   test('updates query state on input change', async () => {
//     render(
//       <Provider store={appStore}>
//         <MemoryRouter initialEntries={['/search']}>
//           <Routes>
//             <Route
//               path="/search"
//               element={
//                 <SearchForm
//                   onSearch={vi.fn()}
//                   pageNumber={1}
//                   disabled={false}
//                 />
//               }
//             />
//           </Routes>
//         </MemoryRouter>
//       </Provider>
//     );

//     const input = screen.getByRole('textbox');

//     await userEvent.type(input, 'startrek');
//     expect((input as HTMLInputElement).value).toBe('startrek');
//   });

//   test('shows error message on failed fetch', async () => {
//     render(
//       <Provider store={appStore}>
//         <MemoryRouter initialEntries={['/search']}>
//           <Routes>
//             <Route path="/search" element={<SearchPage />} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(
//       await screen.findByText(
//         /Something went wrong. Please try again./i,
//         {},
//         { timeout: 4000 }
//       )
//     ).toBeInTheDocument();
//   });

//   test('shows loading status', async () => {
//     server.use(
//       http.get('https://stapi.co/api/v1/rest/comics/search', async () => {
//         await new Promise((r) => setTimeout(r, 100));

//         return HttpResponse.json(mockResponse);
//       })
//     );

//     render(
//       <Provider store={appStore}>
//         <MemoryRouter initialEntries={['/search']}>
//           <Routes>
//             <Route path="/search" element={<SearchPage />} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(await screen.findByTestId('spinner')).toBeInTheDocument();
//     await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'));
//   });

//   test('initialize new API call by clicking refetch button', async () => {
//     server.resetHandlers();

//     render(
//       <Provider store={appStore}>
//         <MemoryRouter initialEntries={['/search']}>
//           <Routes>
//             <Route path="/search" element={<SearchPage />} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>
//     );

//     const button = await screen.findByRole('button', { name: /refetch/i });

//     await userEvent.click(button);

//     await waitFor(() => {
//       expect(callCount).toBe(2);
//     });
//   });
// });
