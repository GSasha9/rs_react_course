import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import type { SelectedItem } from './models/interfaces';
import renderNestedObject from './models/utils/render-nested-object';

import './deatiled-page.scss';

import api from '@/shared/api/api';
import Button from '@/shared/ui/button/button';

const DetailedPage = () => {
  const { uid, page } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [itemData, setItemData] = useState<SelectedItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (location.state?.item) {
        const categoryKey = Object.keys(location.state.item)[0];

        setItemData(location.state.item[categoryKey]);
        setIsLoading(false);
      } else if (uid) {
        const fetched = await api.fetchDataById(uid);
        const categoryKey = Object.keys(fetched)[0];

        setItemData(fetched[categoryKey]);
        setIsLoading(false);
      }
    };

    loadData();
  }, [location.state, uid]);

  if (isLoading) {
    return <div className="detailed-page">Loading...</div>;
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
      <Button
        className="button-close"
        type="button"
        text="close"
        callback={() => navigate(`/search?pageNumber=${page || 1}`)}
      />
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
