import './About.scss';
import { useContext } from 'react';
import { LanguageContext } from '../context/language-context';
import ReactMarkdown from 'react-markdown';

export default function About() {

  const language = useContext(LanguageContext);

  return (
    <section className="about container">
      <h1 className="title">
        {language.loc.about} : //
      </h1>
      <div className='info-box'>
        <div className='about__profile'>
          <img
            className='about__pfp'
            src="/images/profile.jpg"
            alt="Headshot"
            data-aos="zoom-in"
            data-aos-delay="50"
            width={200}
            height={200}
         />
        </div>
      </div>
      <h2 className='about__flavor-item'>{language.about.name}</h2>
      <h3
        className="title"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Web Developer / Game Developer / Artist
      </h3>
      <div
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <ReactMarkdown children={language.about.bio} />

      </div>
    </section>
  );
}
