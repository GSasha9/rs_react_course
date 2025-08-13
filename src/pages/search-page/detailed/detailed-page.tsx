import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import type { SelectedItem } from './models/interfaces';
import renderNestedObject from './models/utils/render-nested-object';

import './detailed-page.scss';

import Button from '@/shared/ui/button/button';
import { useFetchDataByUidQuery } from '@/store/api/comics.api';
import { comicsApi } from '@/store/api/comics.api';

const DetailedPage = () => {
  const { uid, page } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [itemData, setItemData] = useState<SelectedItem | null>(null);

  const dispatch = useDispatch();

  const { data, isLoading, isFetching, isError } = useFetchDataByUidQuery(
    uid ?? '',
    {
      skip: !uid,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (location.state?.item) {
      const categoryKey = Object.keys(location.state.item)[0];

      setItemData(location.state.item[categoryKey]);
    } else if (data) {
      const categoryKey = Object.keys(data)[0];

      setItemData(data[categoryKey]);
    }
  }, [location.state, data]);

  if (isLoading || isFetching) {
    return (
      <div className="detailed-page">
        <div>Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="detailed-page">
        <div>Something went wrong</div>
        <Link to="/search">Back to search page</Link>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="detailed-page">
        <div>Data not found</div>
        <Link to="/search">Back to search page</Link>
      </div>
    );
  }

  return (
    <div className="detailed-page" data-testid="detailedPage">
      <div className="buttons">
        <Button
          className="button-close"
          type="button"
          text="close"
          callback={() => navigate(`/search?pageNumber=${page || 1}`)}
        />
        <Button
          className="button-close"
          type="button"
          text="refetch"
          callback={() => {
            if (uid) {
              dispatch(
                comicsApi.util.invalidateTags([{ type: 'Comic', id: uid }])
              );
            }
          }}
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
    </div>
  );
};

export default DetailedPage;
