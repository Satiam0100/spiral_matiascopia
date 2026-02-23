import React from 'react';
import styles from '../styles/portfolio.module.css';

const PortfolioItem = ({ title, category, imageUrl }) => {
  return (
    <article className={styles.portfolioCard}>
      <div className={styles.portfolioMedia}>
        <img
          className={styles.portfolioImage}
          src={imageUrl}
          alt={title}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.portfolioScrim} aria-hidden />
        <div className={styles.portfolioCaption}>
          <span className={styles.portfolioCategory}>{category}</span>
          <h3 className={styles.portfolioTitle}>{title}</h3>
        </div>
      </div>
    </article>
  );
};

export default PortfolioItem;

