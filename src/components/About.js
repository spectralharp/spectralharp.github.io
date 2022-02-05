import './About.scss';
import i18n from '../data/i18n.json';

export default function About({ pageLang }) {
  return (
    <section className='section-about container'>
      <h1 className='title'>{i18n[pageLang].loc.about} : //</h1>
      <img src='/images/profile.png' alt='Headshot' data-aos='fade-up' data-aos-delay='50' />
      <h2 className='title' data-aos='fade-up' data-aos-delay='100'>Web Developer / Game Developer / Artist</h2>
      <p data-aos='fade-up' data-aos-delay='150'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit dignissim nulla quis volutpat. Nunc pretium tellus lacus, sed tempus felis iaculis et. Sed in metus massa. Pellentesque ac hendrerit ligula. Maecenas et pellentesque mauris, at vestibulum dui. Nam dapibus egestas tortor, vel auctor lacus porta eu. Suspendisse at nisl sit amet quam dignissim gravida. Duis ac est dictum, gravida sapien vel, tincidunt massa. Fusce placerat tincidunt finibus. Nam volutpat vehicula iaculis.
      </p>
    </section>
  );
}
