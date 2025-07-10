import React from 'react';
import type { State, InputProps } from './models/interfaces';

export default class Input extends React.Component<InputProps, State> {
  render = () => {
    return (
      <input
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder || 'enter your search query'}
        className={this.props.className || 'input'}
        value={this.props.value}
        onChange={this.props.onChange}
      ></input>
    );
  };
}
