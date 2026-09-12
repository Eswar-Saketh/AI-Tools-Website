import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Flame, 
  ExternalLink, 
  Star, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Eye
} from 'lucide-react';

export default function Hero() {
  const { toolOfTheDay, setSelectedToolForModal, tools } = useApp();

  return (
    <section className="hero-section">
      <div className="container">
        {/* Glowing Hero Pill */}
        <div className="hero-badge animate-float">
          <Sparkles size={14} className="gradient-text" />
          <span>Next-Generation AI Intelligence Hub</span>
        </div>

        {/* Hero Title */}
        <h1 className="hero-title">
          Discover the Frontier of <br />
          <span className="gradient-text">Artificial Intelligence</span> Tools
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Curated directory of top-tier AI models, autonomous coding agents, neural video suites, 
          and creative engines. Search, compare, and test live prompts in one unified workspace.
        </p>

        {/* Live Stats */}
        <div className="hero-stats-row">
          <div className="stat-item">
            <span className="stat-value gradient-text-cyan">{tools.length}+</span>
            <span className="stat-label">Curated Tools</span>
          </div>
          <div className="stat-item">
            <span className="stat-value gradient-text">8</span>
            <span className="stat-label">Core Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-value gradient-text-emerald">4.9★</span>
            <span className="stat-label">Avg Quality Rating</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: 'var(--accent-amber)' }}>100%</span>
            <span className="stat-label">Free Live Sandbox</span>
          </div>
        </div>

        {/* Spotlight Tool of the Day */}
        {toolOfTheDay && (
          <div className="spotlight-card">
            <div className="spotlight-left">
              <img 
                src={toolOfTheDay.logoUrl} 
                alt={toolOfTheDay.name} 
                className="spotlight-img"
              />
              <div className="spotlight-meta">
                <div className="spotlight-tag">
                  <Flame size={14} color="#f43f5e" /> Tool of the Day
                </div>
                <h3 className="spotlight-title">{toolOfTheDay.name}</h3>
                <p className="spotlight-desc">{toolOfTheDay.tagline}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setSelectedToolForModal(toolOfTheDay)}
                className="btn btn-secondary btn-sm"
              >
                <Eye size={14} /> Quick Preview
              </button>
              <a 
                href={toolOfTheDay.websiteUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary btn-sm"
              >
                <span>Visit Tool</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
