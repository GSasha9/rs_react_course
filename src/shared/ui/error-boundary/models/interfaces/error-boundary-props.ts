import React from 'react';

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}
