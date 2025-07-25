import type { MouseEvent } from 'react';
import { Link } from 'react-router';

import ResultCard from '../result-card/ui/result-card';
import type { SearchResultsProps } from './models/interfaces';

import api from '@/shared/api/api';

const SearchResults = (props: SearchResultsProps) => {
  const category = localStorage.getItem('prevSearchSelect') || 'company';
  const openDetails = async (e: MouseEvent<HTMLDivElement>) => {
    const uid = e.currentTarget.getAttribute('data-uid') || '';

    await api.fetchDataById(category, uid);
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
          <Link
            key={typeof item.uid === 'string' ? item.uid : index}
            to={`${category}/${item.uid}`}
          >
            <ResultCard
              key={typeof item.uid === 'string' ? item.uid : index}
              title={title}
              description={description}
              onClick={openDetails}
              uid={`${item.uid}`}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;
