import './spinner.scss';

import type { Props } from '@/shared/models/interfaces';

const Spinner = ({ children }: Props) => {
  return (
    <>
      <div className="spinner" data-testid="spinner">
        {children}
      </div>
    </>
  );
};

export default Spinner;
