import type { CardProps } from '../model/interfaces';

import './result-card.scss';

import {
  addCard,
  deleteCard,
} from '@/features/selected-cards/selected-card-slice';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { useAppSelector } from '@/hooks/redux-hooks';
import Input from '@/shared/ui/input/input';

const ResultCard = ({ title, uid, onClick, name, description }: CardProps) => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.selectedCardsCount.cardUID);

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const checkbox = e.currentTarget;

    const uid = checkbox.dataset.checkboxuid;

    if (!uid) return;

    if (checkbox.checked) {
      console.log(uid);

      if (!uid) return;

      dispatch(addCard(uid));
    } else {
      dispatch(deleteCard(uid));
    }
  };

  return (
    <div className="card" data-uid={uid} onClick={onClick}>
      <Input
        type="checkbox"
        className="card-checkbox"
        onClick={handleCheckboxClick}
        data-checkboxuid={uid}
        checked={
          typeof uid !== 'undefined'
            ? cards.indexOf(uid) !== -1
              ? true
              : false
            : false
        }
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
