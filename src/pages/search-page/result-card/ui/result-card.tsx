import type { CardProps } from '../model/interfaces';

import './result-card.scss';

const ResultCard = (props: CardProps) => {
  return (
    <div className="card" data-uid={props.uid} onClick={props.onClick}>
      <h4 className="card-title">{props.title || props.name || 'No title'}</h4>
      <ul>
        {props.description.map((description, index) =>
          Object.entries(description).map(([key, value]) => (
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
