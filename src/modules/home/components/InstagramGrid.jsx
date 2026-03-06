import React from 'react';
import styles from '../styles/home.module.css';
import ElfsightInstagramFeed from '../../../components/ElfsightInstagramFeed';

const InstagramGrid = () => {
  return (
    <section className={styles.instagramSection}>
      <div className={styles.instagramTop}>
        <a
          className={styles.instagramHandle}
          href="https://www.instagram.com/spiral.mstudio/"
          target="_blank"
          rel="noreferrer"
        >
          @SPIRAL.MSTUDIO
        </a>
      </div>
      <div className={styles.instagramGrid}>
        <ElfsightInstagramFeed />
      </div>
    </section>
  );
};

export default InstagramGrid;
