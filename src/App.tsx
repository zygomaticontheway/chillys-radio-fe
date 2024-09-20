import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import StationPage from './pages/StationPage';
import TopStationsPage from './pages/TopStationsPage';
import CountryPage from './pages/CountryPage';
import LanguagePage from './pages/LanguagePage';
import TagsPage from './pages/TagsPage';
import Layout from './components/layout/layout';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stations/:stationId" element={<StationPage />} />
          <Route path="/top-stations" element={<TopStationsPage />} />
          <Route path="/country" element={<CountryPage />} />
          <Route path="/language" element={<LanguagePage />} />
          <Route path="/tags" element={<TagsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;