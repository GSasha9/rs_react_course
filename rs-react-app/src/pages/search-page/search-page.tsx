import React from 'react';

import './search-page.scss';

import SearchForm from '@/features/search/ui/search-form';
import Section from '@/shared/ui/section/section';
import Spinner from '@/shared/ui/spinner/spinner';
import SearchResults from '@/widgets/search-results/search-results';

export default class SearchPage extends React.Component {
  state = {
    results: [],
    loading: false,
    error: null,
  };

  handleResults = (data: Record<string, unknown>[]) => {
    this.setState({ results: data });
  };

  handleLoadingChange = (isLoading: boolean) => {
    this.setState({ loading: isLoading });
  };

  handleError = (error: Error) => {
    this.setState({ error });
  };

  render = () => {
    if (this.state.error) {
      throw this.state.error;
    }

    return (
      <>
        <main className="main">
          <Section className="section-form">
            <SearchForm
              onResults={this.handleResults}
              onLoadingChange={this.handleLoadingChange}
              onError={this.handleError}
            ></SearchForm>
          </Section>
          <Section className="section-results">
            {this.state.loading ? (
              <Spinner></Spinner>
            ) : this.state.results.length === 0 ? (
              <p>No results</p>
            ) : (
              this.state.results && (
                <SearchResults results={this.state.results} />
              )
            )}
          </Section>
        </main>
      </>
    );
  };
}
