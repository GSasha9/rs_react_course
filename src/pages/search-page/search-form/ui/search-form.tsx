import { useCallback, useEffect } from 'react';

import type { SearchFormProps } from '../models/interfaces';
import { startSearch } from '../utils';

import './search-form.scss';

import useLocalStorageQuery from '@/hooks/use-local-storage-query';
import Button from '@/shared/ui/button/button';
import Input from '@/shared/ui/input/input';

const SearchForm = (props: SearchFormProps) => {
  const [query, setQuery] = useLocalStorageQuery('prevSearchInput');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { onResults, onLoadingChange, onError } = props;

  const handleSearch = useCallback(async () => {
    try {
      onLoadingChange(true);
      const results = await startSearch(query, props.pageNumber);

      if (results) {
        onResults(results);
        setQuery(query);
      } else {
        return;
      }
    } catch (err) {
      if (onError) {
        onError(err as Error);
      } else {
        console.error(err);
      }
    } finally {
      onLoadingChange(false);
    }
  }, [onResults, onLoadingChange, setQuery, onError, query, props.pageNumber]);

  useEffect(() => {
    handleSearch();
  }, [props.pageNumber]);

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
      <Button callback={handleSearch} type="button"></Button>
    </form>
  );
};

export default SearchForm;
