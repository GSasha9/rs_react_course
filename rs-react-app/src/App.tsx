import { Suspense, useCallback, useState } from 'react';

import Spinner from './components/spinner/spinner';
import HomePage from './pages/home';
import fetchData from './shared/utils/fetch-data';

export default function App() {
  const [year, setYear] = useState(2023);
  const [resource, setResource] = useState(() => fetchData(year));

  const handleYearChange = useCallback((requestedYear: number) => {
    setYear((prev) => {
      if (prev === requestedYear) return prev;

      setResource(fetchData(requestedYear));

      return requestedYear;
    });
  }, []);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <HomePage resources={resource} handleYear={handleYearChange} />
      </Suspense>
    </>
  );
}
