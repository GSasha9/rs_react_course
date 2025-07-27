import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import type { SelectedItem } from './models/interfaces';
import renderNestedObject from './models/utils/render-nested-object';

import './deatiled-page.scss';

import Button from '@/shared/ui/button/button';

const DetailedPage = () => {
  const location = useLocation();
  const item = location.state?.item;

  const navigate = useNavigate();

  if (!item)
    return (
      <div className="detailed-page">
        <div>Data not found</div>
        <Link to={'/search'}>Back to search page</Link>
      </div>
    );

  const categoryKey = Object.keys(item)[0];
  const itemData: SelectedItem = item[categoryKey];

  if (!itemData) return;

  return (
    <div className="detailed-page">
      <Button
        className="button-close"
        type="button"
        text="close"
        callback={() => navigate(-1)}
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
