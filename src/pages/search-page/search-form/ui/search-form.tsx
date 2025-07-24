import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { SearchFormProps } from '../models/interfaces';
import { startSearch } from '../utils';

import './search-form.scss';

import { RESOURCE_OPTIONS } from '@/shared/models/constants';
import Button from '@/shared/ui/button/button';
import Input from '@/shared/ui/input/input';
import Select from '@/shared/ui/select/select';

const SearchForm = (props: SearchFormProps) => {
  const [select, setSelect] = useState(
    localStorage.getItem('prevSearchSelect') || RESOURCE_OPTIONS[0].key
  );
  const [query, setQuery] = useState(
    localStorage.getItem('prevSearchInput') || ''
  );

  const [searchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get('pageNumber')) || 0;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { onResults, onLoadingChange, onError } = props;

  const handleSearch = useCallback(async () => {
    try {
      onLoadingChange(true);
      const results = await startSearch(select, query, pageNumber);

      if (results) {
        onResults(results);
        localStorage.setItem('prevSearchSelect', select);
        localStorage.setItem('prevSearchInput', query);
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
  }, [onResults, onLoadingChange, onError, select, query, pageNumber]);

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
      <Select
        options={RESOURCE_OPTIONS}
        value={select}
        onChange={handleSelectChange}
      ></Select>
      <Input value={query.trim()} onChange={handleInputChange}></Input>
      <Button callback={handleSearch} type="button"></Button>
    </form>
  );
};

export default SearchForm;
