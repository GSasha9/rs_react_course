import type { Props } from '../../../../models/interfaces';

export interface FallbackProps extends Props {
  message: string;
  onClick: () => void;
}
