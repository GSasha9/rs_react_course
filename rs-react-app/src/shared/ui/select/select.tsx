import React from 'react';
import type { SelectProps } from './models/interfaces';

export default class Select extends React.Component<SelectProps> {
  render = () => {
    return (
      <select onChange={this.props.onChange} value={this.props.value}>
        {this.props.options.map((el, index) => (
          <option key={index}>{el.key}</option>
        ))}
      </select>
    );
  };
}
