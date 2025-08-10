import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';

import SearchForm from './search-form/ui/search-form';
import SearchResults from './search-results/search-results';

import './search-page.scss';

import useLocalStorageQuery from '@/hooks/use-local-storage-query';
import type { RequestResults } from '@/shared/models/interfaces';
import Button from '@/shared/ui/button/button';
import Pagination from '@/shared/ui/pagination/pagination';
import Section from '@/shared/ui/section/section';
import SelectedCardFlyout from '@/shared/ui/selected-card-flyout/selected-card-flyout';
import Spinner from '@/shared/ui/spinner/spinner';
import { useGetCardsByQueryAndPageQuery } from '@/store/api/comics-api';
import { comicsApi } from '@/store/api/comics-api';

const SearchPage = () => {
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useLocalStorageQuery('prevSearchInput');

  const currentPageNumber = Number(searchParams.get('pageNumber')) || 1;

  const { data, isLoading, isFetching, isError } =
    useGetCardsByQueryAndPageQuery(
      {
        query: query ?? '',
        pageNumber: currentPageNumber,
      },
      { refetchOnReconnect: true }
    );

  useEffect(() => {
    if (!searchParams.get('pageNumber')) {
      setSearchParams({ pageNumber: '1' });
    }
  }, [setSearchParams, searchParams]);

  const handleResults = useCallback(
    (response: RequestResults) => {
      const resultsArray = Object.entries(response).find(
        ([key, value]) =>
          key !== 'sort' && key !== 'page' && Array.isArray(value)
      )?.[1] as Record<string, unknown>[];

      if (!resultsArray) return;

      setPageNumber(response.page.totalPages);

      if (JSON.stringify(resultsArray) !== JSON.stringify(results)) {
        setResults(resultsArray);
      }
    },
    [results]
  );

  useEffect(() => {
    if (data) {
      handleResults(data);
    }
  }, [data, handleResults]);

  return (
    <>
      <Section className="section-form">
        <SearchForm
          disabled={isLoading || isFetching}
          pageNumber={currentPageNumber}
          onSearch={(newQuery) => {
            setQuery(newQuery);
            setSearchParams({ pageNumber: '1' });
          }}
        ></SearchForm>
      </Section>
      <Section className="section-results">
        {(isLoading || isFetching) && <Spinner />}
        {!isLoading && !isFetching && isError && (
          <p className="error">Something went wrong. Please try again.</p>
        )}
        {!isLoading && !isFetching && !isError && results.length === 0 && (
          <p>No results</p>
        )}
        {!isLoading && !isFetching && !isError && results.length > 0 && (
          <>
            <div className={`results ${isFetching ? 'fetching' : ''}`}>
              <Button
                type="button"
                text="refetch"
                callback={() =>
                  dispatch(comicsApi.util.invalidateTags([{ type: 'Search' }]))
                }
                className="refetch-button"
              />
              <SearchResults results={results} page={currentPageNumber} />
              <div className={`details`}>
                <Outlet />
              </div>
            </div>
            <Pagination pages={pageNumber} activeNumber={currentPageNumber} />
          </>
        )}
        <SelectedCardFlyout></SelectedCardFlyout>
      </Section>
    </>
  );
};

export default SearchPage;
