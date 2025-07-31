import type { CardProps } from '../model/interfaces';

import './result-card.scss';

import Input from '@/shared/ui/input/input';

const ResultCard = ({ title, uid, onClick, name, description }: CardProps) => {
  return (
    <div className="card" data-uid={uid} onClick={onClick}>
      <Input
        type="checkbox"
        className="card-checkbox"
        onClick={(e) => e.stopPropagation()}
        data-checkboxUid={uid}
      ></Input>
      <h4 className="card-title">{title || name || 'No title'}</h4>
      <ul>
        {description.map((description, index) =>
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
