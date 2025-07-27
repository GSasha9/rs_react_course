import { NavLink } from 'react-router-dom';

import './header.scss';

const Header = () => {
  return (
    <header className="container header">
      <ul className="menu">
        <li className="menu-item">
          <NavLink
            to={'/search'}
            data-testid="navSearch"
            className={({ isActive, isPending }) => {
              return isActive ? 'active' : isPending ? 'pending' : '';
            }}
          >
            {' '}
            <span>Search page</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to={'/about'}
            data-testid="navAbout"
            className={({ isActive, isPending }) => {
              return isActive ? 'active' : isPending ? 'pending' : '';
            }}
          >
            <span>About</span>
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
