import React from 'react';
import styles from '../styles/services.module.css';

const CASA_LOGO_WHITE =
  '/images/spiral%20logos/SPIRAL%20Logos/Casa%20Spiral/Casa.spiral-white.png';

const polaroids = [
  {
    src: 'https://images.unsplash.com/photo-1520975958225-27d5d70b28ee?auto=format&fit=crop&w=900&q=80',
    className: styles.polaroidTopLeft,
  },
  {
    src: 'https://images.unsplash.com/photo-1520975958225-27d5d70b28ee?auto=format&fit=crop&w=900&q=80',
    className: styles.polaroidTopRight,
  },
  {
    src: 'https://images.unsplash.com/photo-1520975958225-27d5d70b28ee?auto=format&fit=crop&w=900&q=80',
    className: styles.polaroidBottomLeft,
  },
  {
    src: 'https://images.unsplash.com/photo-1520975958225-27d5d70b28ee?auto=format&fit=crop&w=900&q=80',
    className: styles.polaroidBottomRight,
  },
];

const BrandShowcase = () => {
  return (
    <section className={styles.brandShowcase}>
      <div className={styles.brandMaroon}>
        {polaroids.map((p, idx) => (
          <figure key={idx} className={`${styles.polaroid} ${p.className}`} aria-hidden>
            <img className={styles.polaroidImage} src={p.src} alt="" loading="lazy" decoding="async" />
          </figure>
        ))}

        <div className={styles.brandCenter}>
          <img
            className={styles.brandMonogram}
            src={CASA_LOGO_WHITE}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <div className={styles.brandHeadline}>
            <span className={styles.brandScript}>Lifting brands</span>
            <span className={styles.brandCaps}>BEYOND THE ORDINARY</span>
          </div>
          <div className={styles.brandSub}>SPIRAL MARKETING STUDIO</div>
        </div>
      </div>

      <div className={styles.brandStrip}>
        <div className={styles.brandStripInner}>
          <span className={styles.brandHandle}>@SPIRAL.MSTUDIO</span>
        </div>
        <div className={styles.brandGrid} aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.brandGridCell} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;

