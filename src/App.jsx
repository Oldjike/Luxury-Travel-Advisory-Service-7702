import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

import Header from './components/Header';
import Footer from './components/Footer';
import FeedbackButton from './components/FeedbackButton';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PackagesPage from './pages/PackagesPage';
import questConfig from './config/questConfig';
import './App.css';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/packages" element={<PackagesPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
          {/* Global Feedback Button - Available on all pages */}
          <FeedbackButton />
        </div>
      </Router>
    </QuestProvider>
  );
}

export default App;