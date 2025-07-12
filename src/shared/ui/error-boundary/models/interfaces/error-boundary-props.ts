import React from 'react';

import type { Props } from '../../../../models/interfaces';

export interface ErrorBoundaryProps extends Props {
  fallback?: React.ReactNode;
}
