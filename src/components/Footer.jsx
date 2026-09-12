import React from 'react';
import { Sparkles, Globe, Share2, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { setSelectedCategory } = useApp();

  const handleCategoryFilter = (catId) => {
    setSelectedCategory(catId);
    const directorySection = document.getElementById('directory');
    if (directorySection) {
      directorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div>
            <div className="logo-group" style={{ marginBottom: '14px' }}>
              <div className="logo-icon-box">
                <Sparkles size={20} />
              </div>
              <div className="logo-text">
                <span>Neuro<span className="gradient-text">Vault</span></span>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', maxWidth: '320px', marginBottom: '16px' }}>
              The definitive directory, comparison engine, and prompt playground for artificial intelligence applications.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="icon-action-btn" title="GitHub">
                <Globe size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="icon-action-btn" title="Twitter / X">
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
              Top Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              <li>
                <button onClick={() => handleCategoryFilter('llm-text')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  LLMs & Chatbots
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryFilter('code-dev')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  Autonomous Coding & Dev
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryFilter('image-art')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  Image & Generative Art
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryFilter('video-motion')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  Video & 3D Motion
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryFilter('audio-voice')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  Voice Synthesis & Audio
                </button>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
              Platform & Tools
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              <li><a href="#playground">Live AI Sandbox</a></li>
              <li><a href="#directory">Compare Tools</a></li>
              <li><a href="#directory">Verified Leaderboards</a></li>
              <li><a href="#directory">Submit AI Startup</a></li>
              <li><a href="#directory">API Documentation</a></li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
              System & Community
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              <span>All 36 Models Operational</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Updated continuously with daily intelligence feeds from HuggingFace, OpenAI, Anthropic, and open-source releases.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} NeuroVault AI. All rights reserved. Built for AI researchers and builders.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Crafted with</span>
            <Heart size={14} color="#f43f5e" fill="#f43f5e" />
            <span>for the AI Community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
