import React from 'react';
import styles from '../styles/home.module.css';

const photos = [
  '/images/photos/DSC02040.jpg',
  '/images/photos/DSC01963.jpg',
  '/images/photos/DSC02380.jpg',
  '/images/photos/DSC04163.jpg',
  '/images/photos/DSC02285.jpg',
  '/images/photos/DSC01989.jpg',
  '/images/photos/DSC02408.jpg',
  '/images/photos/DSC02284.jpg',
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

