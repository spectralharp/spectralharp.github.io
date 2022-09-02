import './Projects.scss';

import i18n from '../data/i18n.json';
import labelData from '../data/label.json';
import ReactMarkdown from 'react-markdown';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { LanguageContext } from '../context/language-context';

function Projects({ title, projects, route }) {

  const projectKeys = Object.keys(projects);

  const items = projectKeys.map((k) => {
    const project = projects[k];
    return (
      <ProjectListItem
        key={k}
        path={k}
        project={project}
      />
    );
  });

  const projectList = (
    <section className='projects container'>
      <h1
        className='projects__title title'
        data-aos="fade-right"
        key={title}
      >
        {title} : //
      </h1>
      <ul className='projects__list'>
        {items}
      </ul>
    </section>
  )

  const project = (
    <Project
      projects={projects}
      returnRoute={route}
    />
  );

  return (
    <Routes>
      <Route path=':projId' element={project} />
      <Route path='*' element={projectList} />
    </Routes>
  );
}

function ProjectListItem({path, project}) {

  const pageLang = useContext(LanguageContext);
  const [imgLoaded, setImgLoaded] = useState(false);
  const {width, height} = project.projectImageSize;
  const inner = (
    <>
      <img
      className='projects__item-image'
      style={ { backgroundColor: project.theme, ...(imgLoaded ? undefined : { color: 'transparent' })}}
      width={width}
      height={height}
      src={project.projectImage}
      alt={project.title[pageLang.code]}
      onLoad={()=>setImgLoaded(true)}
      onError={()=>setImgLoaded(true)}
      />
      <figcaption className='projects__item-info'>
        <h2 className='projects__item-name title'>
          {project.title[pageLang.code]}
        </h2>
        <p className='projects__item-description'>
          {project.snippet[pageLang.code]}
        </p>
      </figcaption>
    </>
  );
  return (
    <li
      data-aos='fade-up'
      className='projects__item'
    >
      {
        project.outward ?
        <a className='projects__item-link' href={project.link}>{inner}</a>
        :
        <Link className='projects__item-link' to={path}>{inner}</Link>
      }
    </li>
  );

}

function Project({ projects, returnRoute }) {

  const pageLang = useContext(LanguageContext);
  let { projId } = useParams();

  const project = projects[projId];

  const screenshots = project.screenshots.map((screenshot, index) => (
    <li key={`${projId}_${index}`}>
      <img
        className='project__screenshots-img'
        src={screenshot}
        alt={`${project.title[pageLang.code]} screenshot ${index}`}
      />
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
        <span
          className='project__tag-label'
          style={{backgroundColor: lbl.color}}
        >
        </span>
        {lbl.name}
      </li>
    );
  });

  return (
    <section className='project'>
      <header className='project__header'>
        <div
          className='project__hero'
          style={{
            backgroundColor: project.theme,
            backgroundImage: `url('${project.headerImage}')`,
            backgroundSize: project.headerSize
          }}
        >
          <Link to={returnRoute} className='project__btn-return bold-link'>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          {project.logoImage && <img className='project__logo' src={project.logoImage} alt={project.title[pageLang]}/>}
        </div>
      </header>
      <section className='project__info container'>
        <div className='project__title'>
          <h1 className='project__name' style={{borderColor: project.theme === "transparent" ? '' : project.theme}}>
            {project.title[pageLang.code]}
          </h1>
          <a className='project__visit-link' href={project.link} target='_blank' rel='noreferrer'>
            {pageLang.loc.linkToProject}&nbsp;<FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>
        <ul className='project__tags'>
          {tags}
        </ul>
        <hr className='project__hr'/>
        <ReactMarkdown
          children={project.description[pageLang.code]}
          components={{
            p: ({node, ...props}) => <p className='project__description'  {...props} />
          }}
        />
        <ul className='project__screenshots'>
          {screenshots}
        </ul>
      </section>
    </section>
  );
}
export default Projects;