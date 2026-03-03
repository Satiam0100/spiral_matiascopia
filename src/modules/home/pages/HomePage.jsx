import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import WhatWeDo from '../components/WhatWedo';
import PhotoCarousel from '../components/PhotoCarousel';
import GalleryCarousel from '../components/GalleryCarousel';
import OurServices from '../components/OurServices';
import RecentWork from '../components/RecentWork';
import RegimeWork from '../components/Regimework';
import InstagramGrid from '../components/InstagramGrid';
import Footer from '../components/Footer';
import styles from '../styles/home.module.css';

const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <Navigation />
      <Hero />
      <WhatWeDo />
      <PhotoCarousel />
      <GalleryCarousel />
      <OurServices />
      <RecentWork />
      <RegimeWork />
      <InstagramGrid />
      <Footer />
    </main>
  );
};

export default HomePage;
