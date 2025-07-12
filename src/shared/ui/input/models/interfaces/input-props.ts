import type { Props } from '../../../../models/interfaces';

export interface InputProps extends Props {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
