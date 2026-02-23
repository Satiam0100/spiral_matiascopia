import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';

const WhatWeDo = () => {
  return (
    <section id="the-studio" className={styles.whatWeDoWrap}>
      <div className={styles.whatWeDo}>
        <h2 className={styles.whatWeDoLabel}>WHAT WE DO</h2>
        <p className={styles.whatWeDoText}>
          We capture the pulse of your brand and translate it into visuals that resonate.
          Every detail is <strong>intentional</strong>, every project a new chapter. At Spiral,
          we don&apos;t just create content—we create <strong>meaning</strong>.
        </p>
        <Link to="/#contact-us" className={styles.workWithUsBtn}>
          WORK WITH US
        </Link>
      </div>
    </section>
  );
};

export default WhatWeDo;
