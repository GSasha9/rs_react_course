import React from 'react';

import './search-page.scss';

import SearchForm from '@/features/search/ui/search-form';
import Button from '@/shared/ui/button/button';
import ErrorBoundary from '@/shared/ui/error-boundary/error-boundary';
import Section from '@/shared/ui/section/section';
import Spinner from '@/shared/ui/spinner/spinner';
import SearchResults from '@/widgets/search-results/search-results';

export default class SearchPage extends React.Component {
  state = {
    results: [],
    loading: false,
    error: null,
    crashForm: false,
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
    return (
      <>
        <ErrorBoundary>
          <main className="main">
            <Section className="section-form">
              <ErrorBoundary>
                {this.state.error && (
                  <p className="error">Error: {this.state.error}</p>
                )}
                <SearchForm
                  crash={this.state.crashForm}
                  onResults={this.handleResults}
                  onLoadingChange={this.handleLoadingChange}
                  onError={this.handleError}
                ></SearchForm>
              </ErrorBoundary>
              <Button
                className="error-button-form"
                callback={() => {
                  this.setState({ crashForm: true });
                }}
                text="crash form"
              />
              <Button
                className="error-button-page"
                callback={() => {
                  this.setState(() => {
                    throw new Error('Page error');
                  });
                }}
                text="throw Page Error"
              />
            </Section>
            <Section className="section-results">
              {this.state.loading ? (
                <Spinner />
              ) : this.state.results.length === 0 ? (
                <p>No results</p>
              ) : (
                this.state.results && (
                  <SearchResults results={this.state.results} />
                )
              )}
            </Section>
          </main>
        </ErrorBoundary>
      </>
    );
  };
}
