'use client';

import ResultCard from '../result-card/ui/result-card';

import './search-results.scss';

import { useRouter } from '@/i18n/navigation';
import { useAppDispatch } from '@/store/redux-hooks';
import { selectItem } from '@/store/slices/selected-item-slice';

interface SearchResultsProps {
  results: Record<string, unknown>[];
  page: number;
}

const SearchResults = ({ results, page = 1 }: SearchResultsProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSelectItem = (uid: string) => {
    dispatch(selectItem({ uid: uid, page: page }));

    router.replace({
      pathname: '/search',
      query: {
        pageNumber: String(page),
        uid: uid,
      },
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
            onClick={() => handleSelectItem(String(item.uid))}
            uid={`${item.uid}`}
          />
        );
      })}
    </div>
  );
};

export default SearchResults;
