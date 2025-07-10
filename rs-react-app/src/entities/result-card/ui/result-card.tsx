import React from 'react';
import type { CardProps } from '../model/interfaces';

export default class ResultCard extends React.Component<CardProps> {
  render = () => {
    return (
      <div className="card">
        <h4 className="card-title">
          {this.props.title || this.props.name || 'No title'}
        </h4>
        <ul>
          {/* {Object.entries(this.props.description).map(([key, value]) => (
            <li className="card__list-item" key={key}>
              {key} : {value}
            </li>
          ))} */}
          ;
        </ul>
      </div>
    );
  };
}
