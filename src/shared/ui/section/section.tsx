import type { Props } from '../../models/interfaces';

import './section.scss';

const Section = ({ children, className }: Props) => {
  return <section className={`section ${className ?? ''}`}>{children}</section>;
};

export default Section;
