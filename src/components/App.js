import './App.scss';
import i18n from '../data/i18n.json';

import projectsData from '../data/projects.json';
import gamesData from '../data/games.json';
import otherData from '../data/other.json';

import Background from './Background';
import Projects from './Projects';
import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

import { useLanguage, LanguageContext } from '../context/language-context';

import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default function App() {
  const [language, changeLanguage] = useLanguage(i18n);

  const projects = (
    <Projects
      title={language.loc.projects}
      projects={projectsData}
      route='/projects'
    />
  );

  const games = (
    <Projects
      title={language.loc.games}
      projects={gamesData}
      route='/games'
    />
  );

  const other = (
    <Projects
      title={language.loc.other}
      projects={otherData}
      route='/other'
    />
  );

  return (
    <LanguageContext.Provider value={language}>
      <HashRouter>
        <a className='skip-navigation bold-link' href='#mainContent'>Skip Navigation</a>
        <Background />
        <NavBar />

        <main id='mainContent'>
          <ScrollToTop>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/about'
                element={<About />}
              />
              <Route
                path='/projects/*'
                element={projects}
              />
              <Route
                path='/games/*'
                element={games}
              />
              <Route
                path='/other'
                element={other}
              />
            </Routes>
          </ScrollToTop>
        </main>

        <Footer changeLanguage={changeLanguage} />
      </HashRouter>
    </LanguageContext.Provider>
  );
}


