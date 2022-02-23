import './Home.scss';

import { useContext } from 'react';
import { LanguageContext } from '../context/language-context';

export default function Home() {

  const language = useContext(LanguageContext);

  return (
    <section className='home'>
      <h1 className='home__title title'>
        <span className='home__title-top'>By</span>
        <span className='home__subtitle'>{language.loc.homeTitle}</span>
        <hr className='home__rule'/>
        <span className='home__title-bot'>Chao</span>
      </h1>
      <div className='home__moon'></div>
    </section>
  );
}
