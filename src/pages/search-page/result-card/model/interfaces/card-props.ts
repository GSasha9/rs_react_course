import type { MouseEvent } from 'react';

import type { CardDescription } from '../types';

export interface CardProps {
  title?: string;
  name?: string;
  description: CardDescription[];
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  uid?: string;
}
