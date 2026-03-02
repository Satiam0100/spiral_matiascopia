import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/home.module.css';

const leftLinks = ['Home', 'Services', 'Portfolio', 'About'];
const rightLinks = ['The Studio', 'Book Now', 'Contact Us'];

const SPIRAL_LOGO_WHITE =
  '/images/spiral%20logos/SPIRAL%20Logos/Full/Spiral-logo-white.png';

const leftLinkTo = (item) => {
  const key = item.toLowerCase().replace(' ', '-');
  if (key === 'home') return '/';
  if (key === 'services') return '/services';
  if (key === 'portfolio') return '/portfolio';
  if (key === 'about') return '/about';
  return `/#${key}`;
};

const sectionLinkTo = (item) => `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
const rightLinkTo = (item) => {
  if (item === 'The Studio') return '/studio';
  if (item === 'Book Now') return '/book-now';
  return sectionLinkTo(item);
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 10);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const scrollTopIfAlreadyHome = (to) => (e) => {
    if (to !== '/') return;
    if (location.pathname === '/' && !location.hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <nav className={styles.nav}>
        <ul className={styles.navLeft}>
          {leftLinks.map((item) => (
            <li key={item}>
              <Link to={leftLinkTo(item)} onClick={scrollTopIfAlreadyHome(leftLinkTo(item))}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className={styles.logoBlock}
          aria-label="Spiral home"
          onClick={scrollTopIfAlreadyHome('/')}
        >
          <img
            className={styles.logoImage}
            src={SPIRAL_LOGO_WHITE}
            alt="SPIRAL Marketing Studio"
            loading="eager"
            decoding="async"
          />
        </Link>
        <ul className={styles.navRight}>
          {rightLinks.map((item) => (
            <li key={item}>
              <Link to={rightLinkTo(item)}>{item}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
