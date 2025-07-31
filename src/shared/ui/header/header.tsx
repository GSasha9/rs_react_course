import { NavLink } from 'react-router-dom';

import './header.scss';

import { ROUTES } from '@/router/router';
import getNavLink from '@/shared/models/utils/getNavLink';

const Header = () => {
  return (
    <header className="container header">
      <ul className="menu">
        <li className="menu-item">
          <NavLink
            to={ROUTES.searchPage.path}
            data-testid="navSearch"
            className={getNavLink}
          >
            <span>Search page</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to={ROUTES.aboutPage.path}
            data-testid="navAbout"
            className={getNavLink}
          >
            <span>About</span>
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
