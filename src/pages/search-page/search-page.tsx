import { useState } from 'react';

import SearchForm from './search-form/ui/search-form';
import SearchResults from './search-results/search-results';

import './search-page.scss';

import { LoadingContext } from '@/shared/models/contexts';
import type { RequestResults } from '@/shared/models/interfaces';
import Pagination from '@/shared/ui/pagination/pagination';
import Section from '@/shared/ui/section/section';
import Spinner from '@/shared/ui/spinner/spinner';

const SearchPage = () => {
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleResults = (response: RequestResults) => {
    const resultsArray = Object.entries(response).find(
      ([key, value]) => key !== 'sort' && key !== 'page' && Array.isArray(value)
    )?.[1] as Record<string, unknown>[];

    if (!resultsArray) return;

    setPages(response.page.totalPages);

    if (JSON.stringify(resultsArray) !== JSON.stringify(results)) {
      setResults(resultsArray);
      setError(false);
    }
  };

  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <>
      <LoadingContext.Provider value={loading}>
        <Section className="section-form">
          <SearchForm
            onResults={handleResults}
            onLoadingChange={handleLoadingChange}
            onError={handleError}
          ></SearchForm>
        </Section>
        <Section className="section-results">
          {loading && <Spinner />}
          {!loading && error && (
            <p className="error">Something went wrong. Please try again.</p>
          )}
          {!loading && !error && results.length === 0 && <p>No results</p>}
          {!loading && !error && results.length > 0 && (
            <>
              <SearchResults results={results} />
              <Pagination pages={pages} />
            </>
          )}
        </Section>
      </LoadingContext.Provider>
    </>
  );
};

export default SearchPage;
