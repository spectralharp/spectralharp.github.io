import './App.scss';

import i18n from '../data/i18n.json';
import projectsData from '../data/projects.json';
import gamesData from '../data/games.json';

import Background from './Background';
import Projects from './Projects';
import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

import {
  useState
} from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default function App() {
  const savedLang = loadLanguage();
  const [pageLang, setPageLang] = useState(savedLang);

  const cpl = function changePageLanguage(language) {
    // Save to storage
    localStorage.setItem('pageLanguage', language);
    // Update page
    document.documentElement.lang = i18n[language].bcp47;
    document.title = i18n[language].loc.title;
    // Update state
    setPageLang(language);
  }

  const projects = (
    <Projects
      pageLang={pageLang}
      title={i18n[pageLang].loc.projects}
      projects={projectsData}
      route='/projects'
    />
  );

  const games = (
    <Projects
      pageLang={pageLang}
      title={i18n[pageLang].loc.games}
      projects={gamesData}
      route='/games'
    />
  );

  return (
    <BrowserRouter>
      <a className='skip-navigation bold-link' href='#mainContent'>Skip Navigation</a>
      <Background />
      <NavBar pageLang={pageLang} />

      <main id='mainContent'>
        <ScrollToTop>
          <Routes>

            <Route
              path='/'
              element={<Home pageLang={pageLang} />}
            />

            <Route
              path='/about'
              element={<About pageLang={pageLang} />}
            />

            <Route
              path='/projects/*'
              element={projects}
            />

            <Route
              path='/games/*'
              element={games}
            />

          </Routes>
        </ScrollToTop>
      </main>

      <Footer
        changePageLanguage={cpl}
        pageLang={pageLang}
      />
    </BrowserRouter>
  );
}

function loadLanguage() {
  // Grab the page language
  let savedLang = localStorage.getItem('pageLanguage');
  // If no saved language or language is not found, default to Chinese
  if (!savedLang || !i18n[savedLang]) {
    savedLang = 'zh_tw';
  }
  document.documentElement.lang = i18n[savedLang].bcp47;
  document.title = i18n[savedLang].loc.title;

  return savedLang;
}


