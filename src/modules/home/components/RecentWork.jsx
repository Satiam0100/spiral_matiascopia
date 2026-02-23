import React from 'react';
import styles from '../styles/home.module.css';

const RecentWork = () => {
  return (
    <section className={styles.recentWork}>
      <div className={styles.recentWorkOverlay} />
      <div className={styles.recentWorkContent}>
        <h1 className={styles.recentWorkTitle}>
          <span className={styles.recentWorkTitleTop}>RECENT</span>
          <span className={styles.recentWorkTitleBottom}>WORK</span>
        </h1>
        <div className={styles.recentWorkCta}>
          <button type="button" className={styles.portfolioBtn}>PORTFOLIO</button>
        </div>
      </div>
    </section>
  );
};

export default RecentWork;
