import './Footer.scss';

import i18n from '../data/i18n.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { LanguageContext, LanguageSelect } from '../context/language-context';

export default function Footer({ changeLanguage }) {

  const language = useContext(LanguageContext);

  return (
    <footer className='footer'>
      <div className='footer__info'>
        <p>© Chao Hsu Lin 林釗緒 2022 |&nbsp;All&nbsp;Rights&nbsp;Reserved</p>
        <LanguageSelect i18n={i18n} language={language} changeLanguage={changeLanguage}/>
      </div>
      <div className='footer__social'>
        <a
          className='bold-link footer__social-link'
          href='mailto:chaohsul0226@gmail.com'
        >
          <FontAwesomeIcon icon={faEnvelope} /> :// Email
        </a>
        <a
          className='bold-link footer__social-link'
          href='https://github.com/spectralharp'
        >
          <FontAwesomeIcon icon={faGithub} /> :// Github
        </a>
        <a
          className='bold-link footer__social-link'
          href='https://www.linkedin.com/in/chao-hsu-lin/'
        >
          <FontAwesomeIcon icon={faLinkedin} /> :// LinkedIn
        </a>
      </div>
    </footer>
  );
}
