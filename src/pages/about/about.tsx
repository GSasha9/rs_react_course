import { Link } from 'react-router-dom';

import './about.scss';

import Section from '@/shared/ui/section/section';

const About = () => {
  return (
    <Section className="about">
      <h1>My name is Sasha Hurbanava</h1>
      <p>This is my study project for learning routings and hooks.</p>
      <div className="links">
        <Link to={'https://rs.school/'}>
          <img src="./public/images.png"></img>RS School
        </Link>
        <Link to={'https://rs.school/courses/reactjs'}>
          <img src="./public/react.svg"></img>React Course
        </Link>
      </div>
    </Section>
  );
};

export default About;
