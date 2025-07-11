import type { Props } from '../../models/interfaces';

const Spinner = ({ children }: Props) => {
  return (
    <>
      <div className="spinner">Loading{children}</div>
    </>
  );
};

export default Spinner;
