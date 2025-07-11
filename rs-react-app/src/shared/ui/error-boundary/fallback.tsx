import React from 'react';
import type { FallbackProps } from './models/interfaces';

export default class Fallback extends React.Component<FallbackProps> {
  render = () => {
    return (
      <>
        <div>{this.props.message}</div>
        <button onClick={this.props.onClick}>Cancel</button>
      </>
    );
  };
}
