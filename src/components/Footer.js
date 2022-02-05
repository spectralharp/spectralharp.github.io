import './Footer.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Footer({ changePageLanguage, pageLang }) {
  return (
    <footer className='footer'>
      <div className='footer__info'>
        <p>© Chao Hsu Lin 林釗緒 2022 | All Rights Reserved</p>
        <select onChange={e => changePageLanguage(e.target.value)} defaultValue={pageLang} className='language-select' aria-label='language select'>
          <option value='en'>English</option>
          <option value='zh_tw'>繁體中文</option>
        </select>
      </div>
      <div className='footer__social'>
        <a className='bold-link footer__social-link' href='mailto:chaohsul0226@gmail.com'><FontAwesomeIcon icon={faEnvelope} /> :// Email</a>
        <a className='bold-link footer__social-link' href='https://github.com/spectralharp'><FontAwesomeIcon icon={faGithub} /> :// Github</a>
        <a className='bold-link footer__social-link' href='https://www.linkedin.com/in/chao-hsu-lin/'><FontAwesomeIcon icon={faLinkedin} /> :// LinkedIn</a>
      </div>
    </footer>
  );
}
