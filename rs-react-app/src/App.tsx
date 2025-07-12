import SearchPage from './pages/search-page/search-page';
import ErrorBoundary from './shared/ui/error-boundary/error-boundary';

import './styles/style.scss';

function App() {
  return (
    <>
      <ErrorBoundary>
        <SearchPage></SearchPage>
      </ErrorBoundary>
    </>
  );
}

export default App;
