import type { Props } from '../../../../models/interfaces';

export interface ButtonProps extends Props {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}
