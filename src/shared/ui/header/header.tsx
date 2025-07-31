import { NavLink } from 'react-router-dom';

import './header.scss';

import getNavLink from '@/shared/models/utils/getNavLink';

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

const Header = () => {
  return (
    <header className="container header">
      <ul className="menu">
        {navItems.map(({ to, label, testId }) => (
          <li key={testId} className="menu-item">
            <NavLink to={to} data-testid={testId} className={getNavLink}>
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
