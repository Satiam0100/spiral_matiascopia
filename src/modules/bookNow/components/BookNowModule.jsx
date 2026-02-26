import React, { useState } from 'react';
import styles from '../styles/bookNow.module.css';

const CASA_LOGO_WHITE =
  '/images/spiral%20logos/SPIRAL%20Logos/Casa%20Spiral/Casa.spiral-white.png';

const HERO_IMAGE = '/images/photos/DSC02380.jpg';
const BOOK_EMAIL = 'andrea@spiralmstudio.com';

const carouselSlides = [
  '/images/photos/DSC02380.jpg',
  '/images/photos/DSC02040.jpg',
  '/images/photos/DSC01963.jpg',
  '/images/photos/DSC04163.jpg',
];

const BookNowModule = () => {
  const [slideIdx, setSlideIdx] = useState(0);

  const slideCount = carouselSlides.length;
  const activeSlide = carouselSlides[slideIdx] ?? carouselSlides[0];
  const goPrev = () => setSlideIdx((i) => (i - 1 + slideCount) % slideCount);
  const goNext = () => setSlideIdx((i) => (i + 1) % slideCount);

  const weekdayHref = `mailto:${BOOK_EMAIL}?subject=${encodeURIComponent(
    'Studio Rental - Weekday'
  )}`;
  const weekendHref = `mailto:${BOOK_EMAIL}?subject=${encodeURIComponent(
    'Studio Rental - Weekend'
  )}`;

  return (
    <section className={styles.page} aria-label="Book now page">
      <section
        className={styles.hero}
        aria-label="Book Now hero"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className={styles.heroOverlay} aria-hidden />
        <img
          className={styles.heroLogo}
          src={CASA_LOGO_WHITE}
          alt="CASA SPIRAL"
          loading="eager"
          decoding="async"
        />
      </section>

      <section className={styles.bookNow} aria-label="Book the studio">
        <div className={styles.titleBar}>
          <h1 className={styles.title}>BOOK THE STUDIO</h1>
        </div>

        <div className={styles.panel}>
          <div className={styles.row}>
            <span className={styles.label}>STUDIO RENTAL&nbsp;&nbsp;WEEKDAY</span>
            <a className={styles.button} href={weekdayHref}>
              BOOK NOW!
            </a>
          </div>

          <div className={styles.divider} aria-hidden />

          <div className={styles.row}>
            <span className={styles.label}>STUDIO RENTAL&nbsp;&nbsp;WEEKEND</span>
            <a className={styles.button} href={weekendHref}>
              BOOK NOW!
            </a>
          </div>
        </div>
      </section>

      <section className={styles.carouselWrap} aria-label="Studio carousel">
        <div className={styles.carousel}>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
            onClick={goPrev}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <div
            className={styles.carouselStage}
            style={{ backgroundImage: `url(${activeSlide})` }}
            aria-label="Carousel image"
          />

          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
            onClick={goNext}
            aria-label="Next photo"
          >
            ›
          </button>

          <div className={styles.carouselDots} role="tablist" aria-label="Carousel dots">
            {carouselSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.carouselDot} ${
                  idx === slideIdx ? styles.carouselDotActive : ''
                }`}
                onClick={() => setSlideIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-selected={idx === slideIdx}
                role="tab"
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.instagram} aria-label="Instagram">
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

        <div className={styles.instagramGrid} aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.instagramCell} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default BookNowModule;

