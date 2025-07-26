import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { Link } from 'react-router-dom';

import type { SelectedItem } from './models/interfaces';

import './deatiled-page.scss';

import Button from '@/shared/ui/button/button';

const DetailedPage = () => {
  const location = useLocation();
  const item: SelectedItem = location.state?.item;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  console.log(item);

  if (!item)
    return (
      <div className="detailed-page">
        <div>Data not found</div>
        <Link to={'/search'}>Back to search page</Link>
      </div>
    );

  const categoryKey = Object.keys(item)[0];
  const itemData = item[categoryKey];

  console.log(itemData);

  if (!itemData) return;

  return (
    <div className="detailed-page">
      <ul>
        {Object.entries(itemData).map(([key, value]) => (
          <li className="card__list-item" key={key}>
            <span className="list-item__prop-name">{key}:</span>{' '}
            {Array.isArray(value) ? (
              <ul>
                {value.length > 0 ? (
                  value.map((el, i) => (
                    <li key={i}>
                      {typeof el === 'object' ? JSON.stringify(el) : String(el)}
                    </li>
                  ))
                ) : (
                  <li>(empty)</li>
                )}
              </ul>
            ) : (
              <span>{String(value)}</span>
            )}
          </li>
        ))}
      </ul>
      <Button
        type={'button'}
        text="close"
        onClick={() => navigate(`/search?${searchParams.toString()}`)}
      ></Button>
    </div>
  );
};

export default DetailedPage;
