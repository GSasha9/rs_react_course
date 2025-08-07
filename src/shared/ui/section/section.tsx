import './section.scss';

const Section = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <section className={`section ${className}`} data-testid="section">
      {children}
    </section>
  );
};

export default Section;
