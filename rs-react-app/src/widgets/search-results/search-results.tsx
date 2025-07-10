import React from 'react';
import ResultCard from '../../entities/result-card/ui/result-card';
import type { SearchResultsProps } from './models/interfaces';

export default class SearchResults extends React.Component<SearchResultsProps> {
  render = () => {
    return (
      <div className="card-container">
        {this.props.results.map((item, index) => {
          const title =
            typeof item.title === 'string'
              ? item.title
              : typeof item.name === 'string'
                ? item.name
                : 'No title';

          return (
            <ResultCard
              key={typeof item.uid === 'string' ? item.uid : index}
              title={title}
            />
          );
        })}
      </div>
    );
  };
}
