'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './search-page.scss';

//import useLocalStorageQuery from '@/hooks/use-local-storage-query';
import SearchForm from '@/shared/components/search-page/search-form/ui/search-form';
import SearchResults from '@/shared/components/search-page/search-results/search-results';
import type { ComicsRequestResults } from '@/shared/models/interfaces';
import Button from '@/shared/ui/button/button';
import Pagination from '@/shared/ui/pagination/pagination';
import Section from '@/shared/ui/section/section';
import SelectedCardFlyout from '@/shared/ui/selected-card-flyout/selected-card-flyout';
import Spinner from '@/shared/ui/spinner/spinner';
import { useGetCardsByQueryAndPageQuery } from '@/store/api/comics.api';
import { comicsApi } from '@/store/api/comics.api';

interface SearchPageProps {
  children: React.ReactNode;
}

const SearchPage = (props: SearchPageProps) => {
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();

  //const [query, setQuery] = useLocalStorageQuery('prevSearchInput');
  const [query, setQuery] = [
    '',
    (q: string) => {
      return q;
    },
  ];

  const currentPageNumber = Number(searchParams.get('pageNumber')) || 1;

  const { data, isLoading, isFetching, isError } =
    useGetCardsByQueryAndPageQuery(
      {
        query: query ?? '',
        pageNumber: currentPageNumber,
      },
      { refetchOnReconnect: true }
    );

  const updatePageNumberInQuery = (page: number) => {
    const query = new URLSearchParams(searchParams.toString());

    query.set('pageNumber', String(page));

    router.push(`/search?${query.toString()}`);
  };

  useEffect(() => {
    if (!searchParams.get('pageNumber')) {
      const query = new URLSearchParams(searchParams.toString());

      query.set('pageNumber', '1');
      router.replace(`/search?${query.toString()}`);
    }
  }, [searchParams, router]);

  const handleResults = useCallback(
    (response: ComicsRequestResults) => {
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
            updatePageNumberInQuery(1);
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
                  dispatch(
                    comicsApi.util.invalidateTags([
                      {
                        type: 'Comic',
                        id: `${query || 'all'}-${currentPageNumber}`,
                      },
                    ])
                  )
                }
                className="refetch-button"
              />
              <SearchResults results={results} page={currentPageNumber} />
              <div className={`details`}>{props.children}</div>
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
