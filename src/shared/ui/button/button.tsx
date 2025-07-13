import type { ButtonProps } from './models/interfaces/button-props';

import './button.scss';

import React from 'react';

import { LoadingContext } from '@/shared/models/contexts';

class Button extends React.Component<ButtonProps> {
  static contextType = LoadingContext;
  declare context: React.ContextType<typeof LoadingContext>;

  render = () => {
    const loading: boolean = this.context;

    return (
      <button
      className={`button ${this.props.className ?? ''}`}
      onClick={this.props.callback}
      type={this.props.type}
      disabled={loading}
    >
      {this.props.text || 'search'}
    </button>
    )
  }
}

export default Button;
