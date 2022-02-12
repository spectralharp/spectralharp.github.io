import './NavBar.scss';

import logo from '../images/logo.svg';
import i18n from '../data/i18n.json';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


function NavBar({pageLang}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="nav-wrapper">
      <nav className="nav">
        <NavLink to="/">
          <img className="nav__brand" src={logo} alt="logo"/>
        </NavLink>

        <button
          className="nav__menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="open navigation menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <ul className={`nav__links ${menuOpen ? "active" : ""}`}>
          <li>
            <NavLink
              className={({ isActive }) => isActive ? 'nav__link--active' : 'nav__link' }
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              {i18n[pageLang].loc.about}
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => isActive ? 'nav__link--active' : 'nav__link' }
              to="/projects"
              onClick={() => setMenuOpen(false)}
            >
              {i18n[pageLang].loc.projects}
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => isActive ? 'nav__link--active' : 'nav__link' }
              to="/games"
              onClick={() => setMenuOpen(false)}
            >
              {i18n[pageLang].loc.games}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;