import './spinner.scss';

import type { Props } from '@/shared/models/interfaces';

const Spinner = ({ children }: Props) => {
  return (
    <>
      <div className="spinner">Loading{children}</div>
    </>
  );
};

export default Spinner;
