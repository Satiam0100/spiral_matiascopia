import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';

const services = [
  { id: '01', title: 'SOCIAL MEDIA MANAGEMENT' },
  { id: '02', title: 'ALL ACCESS CONTENT DAYS' },
  { id: '03', title: 'Graphic Design' },
];

const OurServices = () => {
  return (
    <section className={styles.ourServices}>
      <div className={styles.ourServicesInner}>
        <div className={styles.servicesLeft}>
          <h2 className={styles.sectionLabel}>OUR SERVICES</h2>
          {services.map((s) => (
            <div key={s.id} className={styles.serviceRow}>
              <span className={styles.serviceNumber}>{s.id}</span>
              <span className={styles.serviceTitle} data-service-id={s.id}>{s.title}</span>
            </div>
          ))}
        </div>
        <div className={styles.servicesRight}>
          <h2 className={styles.sectionLabel}>OUR SERVICES</h2>
          {services.map((s) => (
            <div key={s.id} className={styles.serviceRow}>
              <Link to="/services" className={styles.learnMoreBtn}>
                LEARN MORE
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
