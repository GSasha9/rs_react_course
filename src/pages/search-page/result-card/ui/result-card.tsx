import type { CardProps } from '../model/interfaces';

import './result-card.scss';

const ResultCard = (props: CardProps) => {
  return (
    <div className="card">
      <h4 className="card-title">{props.title || props.name || 'No title'}</h4>
      <ul>
        {props.description.map((desc, index) =>
          Object.entries(desc).map(([key, value]) => (
            <li className="card__list-item" key={`${index}-${key}`}>
              <span className="list-item__prop-name">{key}:</span>{' '}
              <span>{value}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ResultCard;
