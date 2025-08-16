'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './search-page.scss';

import useLocalStorageQuery from '@/hooks/use-local-storage-query';
import { useRouter } from '@/i18n/navigation';
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
import { selectItem } from '@/store/slices/selected-item-slice';

interface SearchPageProps {
  children?: React.ReactNode;
}

const SearchPageClient = (props: SearchPageProps) => {
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();

  const [query, setQuery] = useLocalStorageQuery('prevSearchInput');

  const currentPageNumber = Number(searchParams.get('pageNumber')) || 1;

  const uid = searchParams.get('uid');

  const { data, isLoading, isFetching, isError } =
    useGetCardsByQueryAndPageQuery(
      {
        query: query ?? '',
        pageNumber: currentPageNumber,
      },
      { refetchOnReconnect: true }
    );

  const updatePageNumberInQuery = (page: number) => {
    router.push({
      pathname: '/search',
      query: { pageNumber: String(page) },
    });
  };

  useEffect(() => {
    if (uid) {
      dispatch(selectItem({ uid, page: currentPageNumber }));
    }
  }, [uid, currentPageNumber, dispatch]);

  useEffect(() => {
    if (!searchParams.get('pageNumber')) {
      router.replace({
        pathname: '/search',
        query: { pageNumber: '1' },
      });
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
          <p className="error">{t('somethingWentWrong')}</p>
        )}
        {!isLoading && !isFetching && !isError && results.length === 0 && (
          <p>No results</p>
        )}
        {!isLoading && !isFetching && !isError && results.length > 0 && (
          <>
            <div className={`results ${isFetching ? 'fetching' : ''}`}>
              <Button
                type="button"
                text={t('refetch')}
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

export default SearchPageClient;
