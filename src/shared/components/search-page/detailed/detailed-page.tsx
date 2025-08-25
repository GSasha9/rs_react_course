'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { SelectedItem } from './models/interfaces';
import renderNestedObject from './models/utils/render-nested-object';

import './detailed-page.scss';

import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import Button from '@/shared/ui/button/button';
import { useFetchDataByUidQuery } from '@/store/api/comics.api';
import { comicsApi } from '@/store/api/comics.api';
import { clearItem } from '@/store/slices/selected-item-slice';

interface DetailedPageProps {
  uid: string;
  page: number;
}

const DetailedPage = ({ uid, page }: DetailedPageProps) => {
  const router = useRouter();
  const t = useTranslations();
  const dispatch = useDispatch();

  const [itemData, setItemData] = useState<SelectedItem | null>(null);

  const { data, isLoading, isFetching, isError } = useFetchDataByUidQuery(
    uid ?? '',
    {
      skip: !uid,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (data) {
      const categoryKey = Object.keys(data)[0];

      setItemData(data[categoryKey]);
    }
  }, [data]);

  const handleClose = () => {
    dispatch(clearItem());
    router.replace({
      pathname: '/search',
      query: { pageNumber: `${page || 1}` },
    });
  };

  const handleRefetch = () => {
    if (uid) {
      dispatch(comicsApi.util.invalidateTags([{ type: 'Comic', id: uid }]));
    }
  };

  let content: React.ReactNode;

  if (isLoading || isFetching) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = (
      <>
        <div>{t('somethingWentWrong')}</div>
        <Link href="/">{t('backToSearchPage')}</Link>
      </>
    );
  } else if (!itemData) {
    content = (
      <>
        <div>{t('noResults')}</div>
        <Link href="/">{t('backToSearchPage')}</Link>
      </>
    );
  } else {
    content = (
      <>
        <div className="buttons">
          <Button
            className="button-close"
            type="button"
            text={t('close')}
            callback={handleClose}
          />
          <Button
            className="button-close"
            type="button"
            text={t('refetch')}
            callback={handleRefetch}
          />
        </div>

        <ul>
          {Object.entries(itemData).map(([key, value]) => {
            if (value === null || value === false || key === 'uid') return null;

            return (
              <li className="card__list-item" key={key}>
                <span className="list-item__prop-name">{key}:</span>{' '}
                {Array.isArray(value) ? (
                  <ul className="nested-list">
                    {value.map((entry, index) => (
                      <li key={index}>
                        {typeof entry === 'object' && entry !== null
                          ? renderNestedObject(entry as Record<string, unknown>)
                          : String(entry)}
                      </li>
                    ))}
                  </ul>
                ) : typeof value === 'object' ? (
                  renderNestedObject(value as Record<string, unknown>)
                ) : (
                  <span>{String(value)}</span>
                )}
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  return (
    <div className="detailed-page" data-testid="detailedPage">
      {content}
    </div>
  );
};

export default DetailedPage;
