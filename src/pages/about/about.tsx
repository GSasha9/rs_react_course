import { Link } from 'react-router-dom';

import Section from '@/shared/ui/section/section';

const About = () => {
  return (
    <Section className="about">
      <h1>My name is Sasha Hurbanava</h1>
      <p>This is my study project for learning routings and hooks.</p>
      <Link to={'https://rs.school/'}>RS School</Link>
      <Link to={'https://rs.school/courses/reactjs'}>React Course</Link>
    </Section>
  );
};

export default About;
