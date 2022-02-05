import './Projects.scss';

import i18n from '../data/i18n.json';
import labelData from '../data/label.json';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Projects({ title, description, projects, pageLang, route }) {

  const items = Object.keys(projects).map((k) => (
    <li
      key={k}
      data-aos='fade-up'
      className='projects__item'
    >
      <Link
        to={k}
        className='projects__item-link'
      >
        <figure style={{
            backgroundImage: `url('${projects[k].projectImage}')`,
            backgroundColor: projects[k].theme
          }}
          className='projects__item-image'
        >
        </figure>
        <figcaption className='projects__item-info'>
          <h2 className='projects__item-name title'>{projects[k].title[pageLang]}</h2>
          <p className='projects__item-description'>{projects[k].snippet[pageLang]}</p>
        </figcaption>
      </Link>
    </li>
  ));

  return (
    <Routes>
      <Route path=':projId' element={<Project projects={projects} pageLang={pageLang} returnRoute={route}/>} />
      <Route path='*' element={(
        <section className='projects container'>
          <h1 className='projects__title title' key={title}>{title} : //</h1>
          <ul className='projects__list'>
            {items}
          </ul>
        </section>
      )} />
    </Routes>
  );
}

function Project({ projects, pageLang, returnRoute }) {

  let { projId } = useParams();

  const project = projects[projId];

  const screenshots = project.screenshots.map((screenshot, index) => (
    <li key={`${projId}_${index}`}>
      <img className='project__screenshots-img' src={screenshot} alt={`${project.title[pageLang]} screenshot ${index}`}/>
    </li>
  ));

  const tags = project.tags.map((tag, index) => {
    let lbl = labelData[tag];

    if(lbl === undefined) {
      lbl = {
        name: tag,
        color: "white",
      }
    }

    return (
      <li className='project__tag' key={`${projId}_tag_${index}`}>
        <span className='project__tag-label' style={{backgroundColor: lbl.color}}></span>{lbl.name}
      </li>
    );
  });

  return (
    <section className='project'>
      <header className='project__header'>
        <div className='project__hero' style={{backgroundImage: `url('${project.headerImage}')`}}>
          <Link to={returnRoute} className='project__btn-return bold-link'>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          {project.logoImage && <img className='project__logo' src={project.logoImage} alt={project.title[pageLang]}/>}
        </div>
      </header>
      <section className='project__info container'>
        <div className='project__title'>
          <h1 className='project__name'>{project.title[pageLang]}</h1>
          <a className='project__visit-link bold-link' href={project.link} target='_blank' rel='noreferrer'>
            {i18n[pageLang].loc.linkToProject}&nbsp;<FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>
        <ul className='project__tags'>
          {tags}
        </ul>
        <hr className='project__hr'/>
        <p className='project__description'>{project.description[pageLang]}</p>
        <ul className='project__screenshots'>
          {screenshots}
        </ul>
      </section>
    </section>
  );
}
export default Projects;