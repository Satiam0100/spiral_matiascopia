import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './modules/home/pages/HomePage.jsx';
import './styles/global.css';
import ServicesPage from './modules/services/pages/ServicesPage.jsx';
import PortfolioPage from './modules/portfolio/pages/PortfolioPage.jsx';
import AboutPage from './modules/about/pages/AboutPage.jsx';
import StudioPage from './modules/studio/pages/StudioPage.jsx';
import ScrollToHash from './components/ScrollToHash.jsx';

function App() {
  return (
    <div className="App">
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;