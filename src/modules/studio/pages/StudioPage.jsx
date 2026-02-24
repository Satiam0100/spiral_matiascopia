import React from 'react';
import Navigation from '../../home/components/Navigation';
import Footer from '../../home/components/Footer';
import StudioModule from '../components/StudioModule';

const StudioPage = () => {
  return (
    <main>
      <Navigation />
      <StudioModule />
      <Footer />
    </main>
  );
};

export default StudioPage;

