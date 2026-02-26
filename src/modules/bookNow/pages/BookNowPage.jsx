import React from 'react';
import Navigation from '../../home/components/Navigation';
import Footer from '../../home/components/Footer';
import BookNowModule from '../components/BookNowModule';

const BookNowPage = () => {
  return (
    <main>
      <Navigation />
      <BookNowModule />
      <Footer />
    </main>
  );
};

export default BookNowPage;

