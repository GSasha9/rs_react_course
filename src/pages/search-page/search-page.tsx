import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

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
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('Something went wrong. Please try again.');

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageNumber = Number(searchParams.get('pageNumber')) || 0;

  useEffect(() => {
    if (location.pathname === '/search' && currentPageNumber === 0) {
      setSearchParams({ pageNumber: '1' });
    }
  });

  const handleResults = (response: RequestResults) => {
    const resultsArray = Object.entries(response).find(
      ([key, value]) => key !== 'sort' && key !== 'page' && Array.isArray(value)
    )?.[1] as Record<string, unknown>[];

    if (!resultsArray) return;

    setPageNumber(response.page.totalPages);

    if (JSON.stringify(resultsArray) !== JSON.stringify(results)) {
      setResults(resultsArray);
      setError('');
    }
  };

  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <>
      <LoadingContext.Provider value={loading}>
        <Section className="section-form">
          <SearchForm
            onResults={handleResults}
            onLoadingChange={handleLoadingChange}
            pageNumber={currentPageNumber}
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
              <div className="results">
                <SearchResults results={results} page={currentPageNumber} />
                <div className={`details`}>
                  <Outlet />
                </div>
              </div>
              <Pagination pages={pageNumber} activeNumber={currentPageNumber} />
            </>
          )}
        </Section>
      </LoadingContext.Provider>
    </>
  );
};

export default SearchPage;
