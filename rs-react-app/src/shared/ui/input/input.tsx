import React from 'react';
import type { State, InputProps } from './models/interfaces';

export default class Input extends React.Component<InputProps, State> {
  state: State = {
    isEmpty: true,
    value: localStorage.getItem('previousSearchRequest') || '',
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      isEmpty: e.target?.value.trim() === '',
      value: e.target?.value,
    });
  };

  render = () => {
    return (
      <input
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder || 'enter your search query'}
        className={this.props.className || 'input'}
        value={this.state.value}
        onChange={this.handleInputChange}
      ></input>
    );
  };
}
