import React from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchAndFilters from './components/SearchAndFilters';
import ToolGrid from './components/ToolGrid';
import AIPlayground from './components/AIPlayground';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ToolDetailModal from './components/ToolDetailModal';
import ComparisonModal from './components/ComparisonModal';
import SubmitToolModal from './components/SubmitToolModal';
import BookmarksDrawer from './components/BookmarksDrawer';
import ComparisonTray from './components/ComparisonTray';
import './styles/App.css';

function MainLayout() {
  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar />

      {/* Hero Banner & Live Spotlight */}
      <Hero />

      {/* Real-time Search, Category Bar & Filters */}
      <SearchAndFilters />

      {/* Curated AI Tools Directory Grid / List */}
      <ToolGrid />

      {/* Interactive AI Prompt & Model Simulation Playground */}
      <AIPlayground />

      {/* Weekly AI Digest Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Comparison Dock */}
      <ComparisonTray />

      {/* Interactive Overlays & Modals */}
      <ToolDetailModal />
      <ComparisonModal />
      <SubmitToolModal />
      <BookmarksDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
