import './NavBar.scss';

import logo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { LanguageContext } from '../context/language-context';



function NavBar() {

  const language = useContext(LanguageContext);
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
          <BarLink to="/about" setMenuOpen={setMenuOpen}>{language.loc.about}</BarLink>
          <BarLink to="/projects" setMenuOpen={setMenuOpen}>{language.loc.projects}</BarLink>
          <BarLink to="/games" setMenuOpen={setMenuOpen}>{language.loc.games}</BarLink>
          <BarLink to="/other" setMenuOpen={setMenuOpen}>{language.loc.other}</BarLink>
        </ul>
      </nav>
    </div>
  );
}

function BarLink({ children, to, setMenuOpen }) {
  return (
    <li>
      <NavLink
        className={({ isActive }) => isActive ? 'nav__link--active' : 'nav__link' }
        to={to}
        onClick={() => setMenuOpen(false)}
      >
        {children}
      </NavLink>
    </li>
  )
}

export default NavBar;