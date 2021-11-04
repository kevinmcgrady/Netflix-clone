import Head from 'next/head';

import styles from '../styles/Home.module.css';

import { NavBar } from '../components/nav/navbar.component';
import { Banner } from '../components/banner/banner.component';
import { SectionCards } from '../components/card/section-cards.component';
import { getVideos, getPopularVideos } from '../lib/videos';

// server-side rendered
export async function getServerSideProps() {
  const disneyVideos = await getVideos('disney trailers');
  const productivityVideos = await getVideos('productivity');
  const travelVideos = await getVideos('travel');
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      popularVideos,
    },
  };
}

const Home = ({
  disneyVideos = [],
  productivityVideos = [],
  travelVideos = [],
  popularVideos = [],
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name='description' content='A Netflix clone' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.main}>
        <NavBar />

        <Banner
          title='Clifford the Red Dog'
          subTitle='A very cute dog'
          imageUrl='/static/clifford.webp'
        />

        <div className={styles.sectionWrapper}>
          <SectionCards
            title='Disney'
            size='large'
            videos={[...disneyVideos]}
          />
          <SectionCards
            title='Travel'
            size='small'
            videos={[...travelVideos]}
          />
          <SectionCards
            title='Productivity'
            size='medium'
            videos={[...productivityVideos]}
          />
          <SectionCards
            title='Popular'
            size='small'
            videos={[...popularVideos]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
