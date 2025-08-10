import { Link } from 'react-router-dom';

import './about.scss';

import Section from '@/shared/ui/section/section';

enum SchoolLinks {
  SCHOOL = 'https://rs.school/',
  REACT_CORSE = 'https://rs.school/courses/reactjs',
}

const About = () => {
  return (
    <Section className="about">
      <h1>My name is Sasha Hurbanava</h1>
      <p>This is my study project for learning routings and hooks.</p>
      <div className="links">
        <Link to={SchoolLinks.SCHOOL} title="school">
          <img src="/images.png"></img>
        </Link>
        <Link to={SchoolLinks.REACT_CORSE} title="react course">
          <img src="/react.svg"></img>
        </Link>
      </div>
    </Section>
  );
};

export default About;
