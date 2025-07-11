import type { Props } from '../../models/interfaces';

const Section = ({ children }: Props) => {
  return <section className="section">{children}</section>;
};

export default Section;
