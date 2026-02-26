import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/services.module.css';

const ServiceItem = ({ id, title, description, imageUrl }) => {
  return (
    <article className={styles.serviceItem}>
      <div className={styles.serviceInfo}>
        <div className={styles.serviceTop}>
          <span className={styles.serviceNumber}>{id}</span>
          <h3 className={styles.serviceTitle} data-service-id={id}>
            {title}
          </h3>
        </div>
        <p className={styles.serviceDescription}>{description}</p>
      </div>

      <div className={styles.serviceMedia}>
        <img
          className={styles.serviceImage}
          src={imageUrl}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <Link to="/book-now" className={styles.packagesBtn}>
          PACKAGES
        </Link>
      </div>
    </article>
  );
};

export default ServiceItem;

