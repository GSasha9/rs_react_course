import React from 'react';
import type { CardProps } from '../model/interfaces';

export default class ResultCard extends React.Component<CardProps> {
  render = () => {
    return (
      <div className="card">
        <h4 className="card-title">{this.props.title}</h4>
        <p className="card-description">{this.props.description}</p>
      </div>
    );
  };
}
