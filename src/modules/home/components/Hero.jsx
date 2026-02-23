import React from 'react';
import styles from '../styles/home.module.css';

const SPIRAL_LOGO_WHITE =
  '/images/spiral%20logos/SPIRAL%20Logos/Full/Spiral-logo-white.png';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <img
            className={styles.heroLogoImage}
            src={SPIRAL_LOGO_WHITE}
            alt="SPIRAL Marketing Studio"
            loading="eager"
            decoding="async"
          />
        </h1>
      </div>
    </section>
  );
};

export default Hero;
