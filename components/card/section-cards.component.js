import style from './section-cards.module.css';
import { Card } from '../card/card.component';

export const SectionCards = ({ title, videos = [], size = 'medium' }) => {
  return (
    <section className={style.container}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.cardWrapper}>
        {videos.map((video) => (
          <Card size={size} imageUrl={video.imageUrl} />
        ))}
      </div>
    </section>
  );
};
