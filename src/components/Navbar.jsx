import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Search, 
  Bookmark, 
  PlusCircle, 
  Layers, 
  Cpu, 
  Compass, 
  Menu, 
  X 
} from 'lucide-react';

export default function Navbar() {
  const { 
    bookmarks, 
    setIsBookmarksDrawerOpen, 
    setIsSubmitModalOpen, 
    comparisonList, 
    setIsCompareModalOpen 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K / '/'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('main-search-input');
        if (searchInput) {
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const focusSearch = () => {
    const searchInput = document.getElementById('main-search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToPlayground = (e) => {
    e.preventDefault();
    const playgroundEl = document.getElementById('playground');
    if (playgroundEl) {
      playgroundEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToDirectory = (e) => {
    e.preventDefault();
    const dirEl = document.getElementById('directory');
    if (dirEl) {
      dirEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <a href="#" className="logo-group">
          <div className="logo-icon-box">
            <Sparkles size={22} className="animate-pulse-glow" />
          </div>
          <div className="logo-text">
            <span>Neuro<span className="gradient-text">Vault</span></span>
            <span className="badge badge-freemium" style={{ fontSize: '0.65rem', padding: '2px 7px' }}>AI 2026</span>
          </div>
        </a>

        {/* Nav Links */}
        <nav className="nav-links">
          <button 
            onClick={scrollToDirectory} 
            className="nav-link"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <Compass size={16} /> Directory
          </button>
          
          <button 
            onClick={scrollToPlayground} 
            className="nav-link"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <Cpu size={16} /> AI Playground
          </button>

          {comparisonList.length > 0 && (
            <button 
              onClick={() => setIsCompareModalOpen(true)}
              className="nav-link"
              style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#a5b4fc', cursor: 'pointer' }}
            >
              <Layers size={16} /> Compare ({comparisonList.length})
            </button>
          )}
        </nav>

        {/* Actions (Search, Bookmarks, Submit) */}
        <div className="nav-actions">
          <button onClick={focusSearch} className="nav-search-btn" title="Quick Search (Cmd+K)">
            <Search size={15} />
            <span>Search tools...</span>
            <span className="kbd-badge">⌘K</span>
          </button>

          {/* Bookmarks Drawer Trigger */}
          <button 
            onClick={() => setIsBookmarksDrawerOpen(true)} 
            className="icon-action-btn"
            title="Saved Tools"
            style={{ position: 'relative' }}
          >
            <Bookmark size={17} />
            {bookmarks.length > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--accent-rose)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(244, 63, 94, 0.6)'
                }}
              >
                {bookmarks.length}
              </span>
            )}
          </button>

          {/* Submit Tool Button */}
          <button 
            onClick={() => setIsSubmitModalOpen(true)} 
            className="btn btn-primary btn-sm"
            style={{ padding: '8px 16px' }}
          >
            <PlusCircle size={16} />
            <span>Submit Tool</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="icon-action-btn"
            style={{ display: 'none' }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
