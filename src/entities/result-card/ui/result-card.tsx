import React from 'react';

import type { CardProps } from '../model/interfaces';

import './result-card.scss';

export default class ResultCard extends React.Component<CardProps> {
  render = () => {
    return (
      <div className="card">
        <h4 className="card-title">
          {this.props.title || this.props.name || 'No title'}
        </h4>
        <ul>
          {this.props.description.map((desc, index) =>
            Object.entries(desc).map(([key, value]) => (
              <li className="card__list-item" key={`${index}-${key}`}>
                <span className="list-item__prop-name">{key}:</span>{' '}
                <span>{value}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  };
}
