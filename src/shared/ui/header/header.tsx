'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './header.scss';

const navItems = [
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
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
