import Image from 'next/image';
import Link from 'next/link';
import { getMessages } from 'next-intl/server';

import './about.scss';

import Section from '@/shared/ui/section/section';

enum SchoolLinks {
  SCHOOL = 'https://rs.school/',
  REACT_CORSE = 'https://rs.school/courses/reactjs',
}

interface AboutPageProps {
  params: { locale: string };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const messages = await getMessages({ locale: params.locale });

  return (
    <Section className="about">
      <h1>{messages.myNameIsSahaH}</h1>
      <p>{messages.thisIsMyStudyProject}</p>
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
