import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './modules/home/pages/HomePage.jsx';
import './styles/global.css';
import ServicesPage from './modules/services/pages/ServicesPage.jsx';
import PortfolioPage from './modules/portfolio/pages/PortfolioPage.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;