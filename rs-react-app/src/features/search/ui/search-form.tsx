import React from 'react';
import Input from '../../../shared/ui/input/input';
import Button from '../../../shared/ui/button/button';
import { startSearch } from '../utils';
import Select from '../../../shared/ui/select/select';
import { RESOURCE_OPTIONS } from '../../../shared/models/constants';

export default class SearchForm extends React.Component<{
  onResults: (data: Record<string, unknown>[]) => void;
  onLoadingChange: (isLoading: boolean) => void;
  onError?: (error: Error) => void;
}> {
  state = {
    select: localStorage.getItem('prevSearchSelect') || RESOURCE_OPTIONS[0].key,
    query: localStorage.getItem('prevSearchInput') || '',
  };

  componentDidMount = (): void => {
    this.handleSearch();
  };

  handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ select: e.target.value });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSearch = async (): Promise<void> => {
    try {
      this.props.onLoadingChange(true);
      const results = await startSearch(this.state.select, this.state.query);
      if (results) {
        const resultsArray = Object.entries(results).find(
          ([key, value]) =>
            key !== 'sort' && key !== 'page' && Array.isArray(value)
        )?.[1] as Record<string, unknown>[];
        if (!resultsArray) return;
        this.props.onResults(resultsArray);
        localStorage.setItem('prevSearchSelect', this.state.select);
        localStorage.setItem('prevSearchInput', this.state.query);
      }
    } catch (err) {
      if (this.props.onError) {
        this.props.onError(err as Error);
      } else {
        console.error(err);
      }
    } finally {
      this.props.onLoadingChange(false);
    }
  };

  render = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.handleSearch();
        }}
      >
        <Select
          options={RESOURCE_OPTIONS}
          value={this.state.select}
          onChange={this.handleSelectChange}
        ></Select>
        <Input
          value={this.state.query.trim()}
          onChange={this.handleInputChange}
        ></Input>
        <Button callback={this.handleSearch} type="button"></Button>
      </form>
    );
  };
}
