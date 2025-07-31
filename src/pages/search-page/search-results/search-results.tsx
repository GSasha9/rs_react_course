import type { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import ResultCard from '../result-card/ui/result-card';

import './search-results.scss';

import comicsService from '@/services/api/comics-api';

interface SearchResultsProps {
  results: Record<string, unknown>[];
  page: number;
}

const SearchResults = ({ results, page }: SearchResultsProps) => {
  const navigate = useNavigate();
  const openDetails = async (e: MouseEvent<HTMLDivElement>) => {
    const uid = e.currentTarget.getAttribute('data-uid') || '';

    const card = await comicsService.fetchDataById(uid);

    navigate(`${page || 1}/${uid}`, {
      state: { item: card, page: page },
    });
  };

  return (
    <div className="card-container">
      {results.map((item, index) => {
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
