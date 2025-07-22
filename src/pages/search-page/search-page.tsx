import { useState } from 'react';

import SearchForm from './search-form/ui/search-form';
import SearchResults from './search-results/search-results';

import './search-page.scss';

import { LoadingContext } from '@/shared/models/contexts';
import ErrorBoundary from '@/shared/ui/error-boundary/error-boundary';
import Section from '@/shared/ui/section/section';
import Spinner from '@/shared/ui/spinner/spinner';

const SearchPage = () => {
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleResults = (data: Record<string, unknown>[]) => {
    if (JSON.stringify(data) !== JSON.stringify(results)) {
      setResults(data);
      setError(false);
    }
  };

  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <>
      <LoadingContext.Provider value={loading}>
        <ErrorBoundary>
          <main className="main" data-testid="main">
            <Section className="section-form">
              <SearchForm
                onResults={handleResults}
                onLoadingChange={handleLoadingChange}
                onError={handleError}
              ></SearchForm>
            </Section>
            <Section className="section-results">
              {loading && <Spinner />}
              {!loading && error && (
                <p className="error">Something went wrong. Please try again.</p>
              )}
              {!loading && !error && results.length === 0 && <p>No results</p>}
              {!loading && !error && results.length > 0 && (
                <SearchResults results={results} />
              )}
            </Section>
          </main>
        </ErrorBoundary>
      </LoadingContext.Provider>
    </>
  );
};

export default SearchPage;

// export default class SearchPage extends React.Component {
//   state = {
//     results: [],
//     loading: false,
//     error: false,
//   };

//   handleResults = (data: Record<string, unknown>[]) => {
//     this.setState({ results: data });
//   };

//   handleLoadingChange = (isLoading: boolean) => {
//     this.setState({ loading: isLoading });
//   };

//   handleError = (error: Error) => {
//     this.setState({ error });
//   };

//   render = () => {
//     if (this.state.error) {
//       throw new Error('Page error');
//     }

//     return (
//       <>
//         <LoadingContext.Provider value={this.state.loading}>
//           <ErrorBoundary>
//             <main className="main" data-testid="main">
//               <Section className="section-form">
//                 <SearchForm
//                   onResults={this.handleResults}
//                   onLoadingChange={this.handleLoadingChange}
//                   onError={this.handleError}
//                 ></SearchForm>
//               </Section>
//               <Section className="section-results">
//                 {this.state.loading ? (
//                   <Spinner />
//                 ) : this.state.results.length === 0 ? (
//                   <p>No results</p>
//                 ) : (
//                   this.state.results && (
//                     <SearchResults results={this.state.results} />
//                   )
//                 )}
//               </Section>
//             </main>
//           </ErrorBoundary>
//         </LoadingContext.Provider>
//       </>
//     );
//   };
// }
