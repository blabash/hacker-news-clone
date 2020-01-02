import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeContext from '../contexts/themeContext';

interface Props {}

const Navbar: React.FC<Props> = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <nav className={`navbar navbar-${theme}`}>
      <ul className='navbar-links'>
        <li className='navbar-link'>
          <NavLink to='/' exact activeStyle={{ color: 'red' }}>
            Top
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' activeStyle={{ color: 'red' }}>
            New
          </NavLink>
        </li>
      </ul>
      <button
        className={`navbar-lightswitch navbar-lightswitch-${theme}`}
        onClick={toggleTheme}
      >
        {theme === 'dark' ? '💡' : '🔦'}
      </button>
    </nav>
  );
};

export default Navbar;
