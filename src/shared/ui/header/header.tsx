'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import './header.scss';

import { pathnames } from '@/i18n/config';
import { Link } from '@/i18n/navigation';

const navItems: {
  to: keyof typeof pathnames;
  label: string;
  testId: string;
}[] = [
  {
    to: '/search',
    label: 'Search page',
    testId: 'navSearch',
  },
  {
    to: '/about',
    label: 'About',
    testId: 'navAbout',
  },
];

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <header className={`container header ${className}`}>
      <ul className="menu">
        {navItems.map(({ to, label, testId }) => (
          <li key={testId} className="menu-item">
            <Link
              href={to}
              data-testid={testId}
              className={pathname === to ? 'active' : ''}
            >
              <span>{t(label)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
