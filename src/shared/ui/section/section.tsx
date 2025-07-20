import type { Props } from '../../models/interfaces';

import './section.scss';

const Section = ({ children, className }: Props) => {
  return (
    <section className={`section ${className ?? ''}`} data-testid="section">
      {children}
    </section>
  );
};

export default Section;
