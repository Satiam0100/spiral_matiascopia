import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';

const navLeft = ['HOME', 'SERVICES', 'PORTFOLIO'];
const navRight = ['THE STUDIO', 'BOOK NOW', 'CONTACT US'];

const SPIRAL_LOGO_WHITE =
  '/images/spiral%20logos/SPIRAL%20Logos/Full/Spiral-logo-white.png';

const leftHref = (item) => {
  const key = item.toLowerCase().replace(/\s+/g, '-');
  if (key === 'home') return '/';
  if (key === 'services') return '/services';
  if (key === 'portfolio') return '/portfolio';
  return `/#${key}`;
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h3 className={styles.footerLabel}>NAVIGATION</h3>
            <div className={styles.footerNavGrid}>
              <ul className={styles.footerNav}>
                {navLeft.map((item) => (
                  <li key={item}>
                    <Link to={leftHref(item)}>{item}</Link>
                  </li>
                ))}
              </ul>
              <ul className={styles.footerNav}>
                {navRight.map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.footerColCenter}>
            <Link to="/" aria-label="Spiral home">
              <img
                className={styles.footerLogoImage}
                src={SPIRAL_LOGO_WHITE}
                alt="SPIRAL Marketing Studio"
                loading="lazy"
                decoding="async"
              />
            </Link>
          </div>
          <div className={`${styles.footerCol} ${styles.footerColRight}`}>
            <h3 className={styles.footerLabel}>LETS CONNECT!</h3>
            <div className={styles.footerConnectLinks}>
              <a href="#" className={styles.footerLink}>INSTAGRAM</a>
              <a href="#" className={styles.footerLink}>TIKTOK</a>
            </div>
            <p className={styles.footerEmail}>EMAIL: ANDREA@SPIRALMSTUDIO.COM</p>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          © 2025 SPIRAL MARKETING STUDIO. ALL rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
