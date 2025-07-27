import type { MouseEvent } from 'react';
import { useNavigate } from 'react-router';

import ResultCard from '../result-card/ui/result-card';
import type { SearchResultsProps } from './models/interfaces';

import './search-results.scss';

import api from '@/shared/api/api';

const SearchResults = (props: SearchResultsProps) => {
  const navigate = useNavigate();
  const openDetails = async (e: MouseEvent<HTMLDivElement>) => {
    const uid = e.currentTarget.getAttribute('data-uid') || '';

    const card = await api.fetchDataById(uid);

    navigate(`${props.page || 1}/${uid}`, {
      state: { item: card, page: props.page },
    });
  };

  return (
    <div className="card-container">
      {props.results.map((item, index) => {
        const title =
          typeof item.title === 'string'
            ? item.title
            : typeof item.name === 'string'
              ? item.name
              : 'No title';

        const description = [];

        for (const prop in item) {
          const value = item[prop];

          if (
            value !== null &&
            value !== undefined &&
            prop !== 'uid' &&
            prop !== 'title' &&
            prop !== 'name'
          ) {
            description.push({ [prop]: String(value) });
          }
        }

        return (
          <ResultCard
            key={typeof item.uid === 'string' ? item.uid : index}
            title={title}
            description={description}
            onClick={openDetails}
            uid={`${item.uid}`}
          />
        );
      })}
    </div>
  );
};

export default SearchResults;
