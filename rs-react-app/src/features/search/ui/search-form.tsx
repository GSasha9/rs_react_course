import React from 'react';
import Input from '../../../shared/ui/input/input';
import Button from '../../../shared/ui/button/button';
import type { RequestResults } from '../../../shared/models/interfaces/request-results';
import { startSearch } from '../utils';

export default class SearchForm extends React.Component<{
  onResults: (data: RequestResults) => void;
}> {
  state = {
    query: '',
  };

  handleSearch = async (): Promise<void> => {
    const results = await startSearch();

    if (results) this.props.onResults(results);
  };

  render = () => {
    return (
      <form>
        <Input></Input>
        <Button callback={this.handleSearch} type="button"></Button>
      </form>
    );
  };
}
