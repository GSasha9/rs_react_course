import type { Props } from '../../../../models/interfaces';
import React from 'react';

export interface ErrorBoundaryProps extends Props {
  fallback?: React.ReactNode;
}
