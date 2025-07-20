import React from 'react';

import type { InputProps, State } from './models/interfaces';

import './input.scss';

import { LoadingContext } from '@/shared/models/contexts';

export default class Input extends React.Component<InputProps, State> {
  static contextType = LoadingContext;
  declare context: React.ContextType<typeof LoadingContext>;
  render = () => {
    const loading: boolean = this.context;

    return (
      <input
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder || 'enter your search query'}
        className={this.props.className || 'input'}
        value={this.props.value}
        onChange={this.props.onChange}
        name="inpit-search"
        disabled={loading}
      ></input>
    );
  };
}
