import React from 'react';
import SearchForm from '../../features/search/ui/search-form';
import SearchResults from '../../widgets/search-results/search-results';

export default class SearchPage extends React.Component {
  state = {
    results: undefined,
  };

  handleResults = (data: Record<string, unknown>[]) => {
    this.setState({ results: data });
  };

  render = () => {
    return (
      <>
        <main>
          <SearchForm onResults={this.handleResults}></SearchForm>
          {this.state.results && <SearchResults results={this.state.results} />}
        </main>
      </>
    );
  };
}
