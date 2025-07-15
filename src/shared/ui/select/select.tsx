import React from 'react';

import type { SelectProps } from './models/interfaces';

import './select.scss';

import { LoadingContext } from '@/shared/models/contexts';

export default class Select extends React.Component<SelectProps> {
  static contextType = LoadingContext;
  declare context: React.ContextType<typeof LoadingContext>;
  render = () => {
    const loading: boolean = this.context;

    return (
      <select
        name="select"
        className="select"
        onChange={this.props.onChange}
        value={this.props.value}
        disabled={loading}
      >
        {this.props.options.map((el, index) => (
          <option key={index}>{el.key}</option>
        ))}
      </select>
    );
  };
}
