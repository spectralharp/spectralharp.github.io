import './Home.scss';

import i18n from '../data/i18n.json';

export default function Home({ pageLang }) {
  return (
    <section className='home'>
      <h1 className='home__title title'>
        <span className='home__title-top'>By</span>
        <span className='home__subtitle'>{i18n[pageLang].loc.homeTitle}</span>
        <hr className='home__rule'/>
        <span className='home__title-bot'>Chao</span>
      </h1>
      <div className='home__moon'></div>
    </section>
  );
}
