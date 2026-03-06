import React from 'react';
import styles from '../styles/home.module.css';

const photos = [
  '/images/optimized/DSC02040_960.jpg',
  '/images/optimized/DSC01963_960.jpg',
  '/images/optimized/DSC02380_960.jpg',
  '/images/optimized/DSC04163_960.jpg',
  '/images/optimized/DSC02285_960.jpg',
  '/images/optimized/DSC01989_960.jpg',
  '/images/optimized/DSC02408_960.jpg',
  '/images/optimized/DSC02284_960.jpg',
];

const PhotoCarousel = () => {
  return (
    <section className={styles.photoCarousel} aria-label="Home photo carousel">
      <div className={styles.photoCarouselTrack}>
        <div className={styles.photoCarouselMarquee}>
          <div className={styles.photoCarouselGroup}>
            {photos.map((src) => (
              <figure key={`a-${src}`} className={styles.photoCarouselItem} aria-hidden="true">
                <img className={styles.photoCarouselImg} src={src} alt="" loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
          <div className={styles.photoCarouselGroup} aria-hidden="true">
            {photos.map((src) => (
              <figure key={`b-${src}`} className={styles.photoCarouselItem}>
                <img className={styles.photoCarouselImg} src={src} alt="" loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;

