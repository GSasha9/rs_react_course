'use client';
import { useSearchParams } from 'next/navigation';

import type { CardProps } from '../model/interfaces';

import './result-card.scss';

import { useSelectedCards } from '@/hooks/use-selected-cards';
import Input from '@/shared/ui/input/input';
import type { Card } from '@/store/slices/selected-cards-slice';

const ResultCard = ({ title, uid, onClick, name, description }: CardProps) => {
  const { cards, addCard, deleteCard } = useSelectedCards();

  const [searchParams] = useSearchParams();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const checkbox = e.currentTarget;
    const uid = checkbox.dataset.checkboxuid;

    const descriptionText = description
      .map((item) =>
        Object.entries(item)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')
      )
      .join('; ');

    const newCard: Card = {
      uid: uid ?? '',
      title: (title || name) ?? 'No title',
      description: descriptionText ?? '',
      url: `${searchParams.toString()}/${uid}`,
    };

    if (!uid) return;

    if (checkbox.checked) {
      addCard(newCard);
    } else {
      deleteCard(newCard);
    }
  };

  return (
    <div className="card" data-uid={uid} onClick={onClick}>
      <Input
        type="checkbox"
        className="card-checkbox"
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        data-checkboxuid={uid}
        data-testid="checkbox"
        checked={
          typeof uid !== 'undefined'
            ? cards.find((el) => el.uid === uid)
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
