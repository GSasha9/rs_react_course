import type { Option } from './option';

export interface SelectProps {
  options: Option[];
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
