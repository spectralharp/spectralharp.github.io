import './NavBar.scss';

import logo from '../images/logo.svg';
import i18n from '../data/i18n.json';
import { Link,} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


function NavBar({pageLang}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='nav-wrapper'>
      <nav className='nav'>
        <Link to='/'><img src={logo} alt='logo' className='nav__brand'/></Link>
        <button
          className='nav__menu-toggle'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label='open navigation menu'
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul className={`nav__links ${menuOpen ? 'active' : ''}`}>
          <li className='nav__links-item'>
            <Link className='bold-link' to='/about' onClick={() => setMenuOpen(false)}>{i18n[pageLang].loc.about}</Link>
          </li>
          <li className='nav__links-item'>
            <Link className='bold-link' to='/projects' onClick={() => setMenuOpen(false)}>{i18n[pageLang].loc.projects}</Link>
          </li>
          <li className='nav__links-item'>
            <Link className='bold-link' to='/games' onClick={() => setMenuOpen(false)}>{i18n[pageLang].loc.games}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;