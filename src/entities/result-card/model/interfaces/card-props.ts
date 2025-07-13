import type { CardDescription } from '../types';

export interface CardProps {
  title?: string;
  name?: string;
  description: CardDescription[];
}
