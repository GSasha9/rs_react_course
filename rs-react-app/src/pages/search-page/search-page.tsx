import React from 'react';
import SearchForm from '../../features/search/ui/search-form';
import SearchResults from '../../widgets/search-results/search-results';
import Spinner from '../../shared/ui/spinner/spinner';

export default class SearchPage extends React.Component {
  state = {
    results: [],
    loading: false,
  };

  handleResults = (data: Record<string, unknown>[]) => {
    this.setState({ results: data });
  };

  handleLoadingChange = (isLoading: boolean) => {
    this.setState({ loading: isLoading });
  };

  render = () => {
    return (
      <>
        <main>
          <SearchForm
            onResults={this.handleResults}
            onLoadingChange={this.handleLoadingChange}
          ></SearchForm>
          {this.state.loading ? (
            <Spinner></Spinner>
          ) : this.state.results.length === 0 ? (
            <p>No results</p>
          ) : (
            this.state.results && <SearchResults results={this.state.results} />
          )}
        </main>
      </>
    );
  };
}
