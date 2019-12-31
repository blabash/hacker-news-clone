import React, { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeContext from '../contexts/themeContext';

interface Props {}

const Navbar: React.FC<Props> = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact activeStyle={{ color: 'green' }}>
            Top
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' activeStyle={{ color: 'green' }}>
            New
          </NavLink>
        </li>
      </ul>
      <button onClick={() => toggleTheme()}>
        {theme === 'dark' ? '💡' : '🔦'}
      </button>
    </nav>
  );
};

export default Navbar;
