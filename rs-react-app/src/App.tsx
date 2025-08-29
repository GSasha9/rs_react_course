import { Suspense, useState } from 'react';

import Spinner from './components/spinner/spinner';
import HomePage from './pages/home';
import fetchData from './shared/utils/fetch-data';

export default function App() {
  const [year, setYear] = useState(2023);
  const [resource, setResource] = useState(() => fetchData(year));

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    setResource(fetchData(newYear));
  };

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <HomePage resources={resource} handleYear={handleYearChange} />
      </Suspense>
    </>
  );
}
