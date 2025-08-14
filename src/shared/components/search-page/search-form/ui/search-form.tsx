import { useState } from 'react';

import './search-form.scss';

import { useTheme } from '@/hooks/use-theme';
import Button from '@/shared/ui/button/button';
import Input from '@/shared/ui/input/input';
import DEFAULT_INPUT_VALUE from '@/shared/ui/input/models/constants/default-input-value';

interface SearchFormProps {
  disabled: boolean;
  pageNumber: number;
  onSearch: (query: string) => void;
}

const SearchForm = (props: SearchFormProps) => {
  const { nightTheme } = useTheme();
  const [input, setInput] = useState('');

  const { onSearch, disabled } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    onSearch(input);
  };

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
        value={input}
        onChange={handleInputChange}
        placeholder={DEFAULT_INPUT_VALUE}
        name="input-search"
        className={
          nightTheme ? 'input search-input night-input' : 'input search-input'
        }
        disabled={disabled}
      ></Input>
      <Button
        callback={handleSearch}
        type="button"
        text={'search'}
        className="search-button"
        disabled={disabled}
      ></Button>
    </form>
  );
};

export default SearchForm;
