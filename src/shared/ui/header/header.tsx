import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
  return (
    <header className="container header">
      <ul className="menu">
        <li className="menu-item">
          <Link to={'/search'}> Search page</Link>
        </li>
        <li className="menu-item">
          <Link to={'/about'}>About</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
