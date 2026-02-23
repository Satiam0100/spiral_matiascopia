import React from 'react';
import styles from '../styles/home.module.css';

const WhatWeDo = () => {
  return (
    <section className={styles.whatWeDoWrap}>
      <div className={styles.whatWeDo}>
        <h2 className={styles.whatWeDoLabel}>WHAT WE DO</h2>
        <p className={styles.whatWeDoText}>
          We capture the pulse of your brand and translate it into visuals that resonate.
          Every detail is <strong>intentional</strong>, every project a new chapter. At Spiral,
          we don&apos;t just create content—we create <strong>meaning</strong>.
        </p>
        <button type="button" className={styles.workWithUsBtn}>WORK WITH US</button>
      </div>
    </section>
  );
};

export default WhatWeDo;
