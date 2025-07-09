import React from 'react';
import SearchForm from '../../features/search/ui/search-form';
import type { RequestResults } from '../../shared/models/interfaces/request-results';

export default class SearchPage extends React.Component {
  state = {
    results: undefined,
  };

  handleResults = (data: RequestResults) => {
    this.setState({ results: data });
  };

  render = () => {
    return (
      <>
        <main>
          <SearchForm onResults={this.handleResults}></SearchForm>
        </main>
      </>
    );
  };
}
