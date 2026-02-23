import React from 'react';
import Navigation from '../../home/components/Navigation';
import Footer from '../../home/components/Footer';
import ServicesModule from '../components/ServicesModule';

const ServicesPage = () => {
  return (
    <main>
      <Navigation />
      <ServicesModule />
      <Footer />
    </main>
  );
};

export default ServicesPage;

