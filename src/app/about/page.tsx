import Image from 'next/image';
import Link from 'next/link';

import './about.scss';

import Section from '@/shared/ui/section/section';

enum SchoolLinks {
  SCHOOL = 'https://rs.school/',
  REACT_CORSE = 'https://rs.school/courses/reactjs',
}

export default function AboutPage() {
  return (
    <Section className="about">
      <h1>My name is Sasha Hurbanava</h1>
      <p>This is my study project for learning routings and hooks.</p>
      <div className="links">
        <Link href={SchoolLinks.SCHOOL} title="school">
          <Image src="/images.png" alt="logo_school" width={150} height={100} />
        </Link>
        <Link href={SchoolLinks.REACT_CORSE} title="react course">
          <Image
            src="/react.svg"
            alt="logo_react_course"
            width={150}
            height={100}
          />
        </Link>
      </div>
    </Section>
  );
}
