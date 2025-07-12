import React from 'react';

import type { InputProps, State } from './models/interfaces';

import './input.scss';

export default class Input extends React.Component<InputProps, State> {
  render = () => {
    return (
      <input
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder || 'enter your search query'}
        className={this.props.className || 'input'}
        value={this.props.value}
        onChange={this.props.onChange}
        name="inpit-search"
      ></input>
    );
  };
}
