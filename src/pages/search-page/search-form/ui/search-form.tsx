import { useCallback, useEffect } from 'react';

import './search-form.scss';

import useLocalStorageQuery from '@/hooks/use-local-storage-query';
import { useTheme } from '@/hooks/use-theme';
import type { RequestResults } from '@/shared/models/interfaces';
import Button from '@/shared/ui/button/button';
import Input from '@/shared/ui/input/input';
import DEFAULT_INPUT_VALUE from '@/shared/ui/input/models/constants/default-input-value';
import { useGetCardsByQueryAndPageQuery } from '@/store/api/comics-api';

interface SearchFormProps {
  onResults: (response: RequestResults) => void;
  onLoadingChange: (isLoading: boolean) => void;
  pageNumber: number;
}

const SearchForm = (props: SearchFormProps) => {
  const [query, setQuery] = useLocalStorageQuery('prevSearchInput');
  const { nightTheme } = useTheme();

  const { onResults, onLoadingChange, pageNumber } = props;

  const { data } = useGetCardsByQueryAndPageQuery({
    query: query,
    pageNumber: pageNumber,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = useCallback(async () => {
    setQuery(query);
  }, [setQuery, query]);

  useEffect(() => {
    onLoadingChange(true);

    if (data) {
      onResults(data);
      setQuery(query);
    }

    onLoadingChange(false);
  }, [data, onLoadingChange, onResults, query, setQuery]);

  return (
    <form
      data-testid="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="form"
    >
      <Input
        value={query.trim()}
        onChange={handleInputChange}
        placeholder={DEFAULT_INPUT_VALUE}
        name="input-search"
        className={
          nightTheme ? 'input search-input night-input' : 'input search-input'
        }
      ></Input>
      <Button
        callback={handleSearch}
        type="button"
        text={'search'}
        className="search-button"
      ></Button>
    </form>
  );
};

export default SearchForm;
