import { Suspense } from 'react';

import Spinner from './components/spinner/spinner';
import HomePage from './pages/home';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      {' '}
      <HomePage />
    </Suspense>
  );
}

export default App;
