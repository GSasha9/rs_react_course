import './spinner.scss';

const Spinner = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <div className="spinner" data-testid="spinner">
        {children}
      </div>
    </>
  );
};

export default Spinner;
