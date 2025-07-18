import React from 'react';

import Fallback from './fallback';
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from './models/interfaces';

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasErrors: false,
    message: '',
  };

  static getDerivedStateFromError = (
    error: Error
  ): Partial<ErrorBoundaryState> => {
    return { hasErrors: true, message: error.message };
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  errorReset = () => {
    this.setState({
      message: '',
      hasErrors: false,
    });
    window.location.reload();
  };

  render = () => {
    if (this.state.hasErrors) {
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <Fallback
          message={this.state.message}
          onClick={this.errorReset}
        ></Fallback>
      );
    }

    return this.props.children;
  };
}
