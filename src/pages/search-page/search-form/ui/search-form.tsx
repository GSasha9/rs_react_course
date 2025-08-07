import { useCallback, useEffect } from 'react';

import { startSearch } from '../utils';

import './search-form.scss';

import useLocalStorageQuery from '@/hooks/use-local-storage-query';
import type { RequestResults } from '@/shared/models/interfaces';
import Button from '@/shared/ui/button/button';
import Input from '@/shared/ui/input/input';

interface SearchFormProps {
  onResults: (response: RequestResults) => void;
  onLoadingChange: (isLoading: boolean) => void;
  pageNumber: number;
}

const SearchForm = (props: SearchFormProps) => {
  const [query, setQuery] = useLocalStorageQuery('prevSearchInput');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { onResults, onLoadingChange, pageNumber } = props;

  const handleSearch = useCallback(async () => {
    try {
      onLoadingChange(true);
      const results = await startSearch(query, pageNumber);

      if (results) {
        onResults(results);
        setQuery(query);
      } else {
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      onLoadingChange(false);
    }
  }, [onResults, onLoadingChange, setQuery, query, pageNumber]);

  useEffect(() => {
    handleSearch();
  }, [pageNumber]);

  return (
    <form
      data-testid="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="form"
    >
      <Input value={query.trim()} onChange={handleInputChange}></Input>
      <Button callback={handleSearch} type="button" text={'search'}></Button>
    </form>
  );
};

export default SearchForm;
