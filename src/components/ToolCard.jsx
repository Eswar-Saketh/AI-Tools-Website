import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  Bookmark, 
  ExternalLink, 
  CheckCircle2, 
  Eye, 
  Layers, 
  Share2 
} from 'lucide-react';

export default function ToolCard({ tool }) {
  const { 
    bookmarks, 
    toggleBookmark, 
    comparisonList, 
    toggleComparison, 
    setSelectedToolForModal,
    viewMode
  } = useApp();

  const isBookmarked = bookmarks.includes(tool.id);
  const isCompared = comparisonList.includes(tool.id);

  const getPricingBadgeClass = (pricing) => {
    switch (pricing) {
      case 'free': return 'badge-free';
      case 'freemium': return 'badge-freemium';
      case 'paid': return 'badge-paid';
      case 'open-source': return 'badge-open-source';
      default: return 'badge-freemium';
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#${tool.id}`);
      alert(`Link to ${tool.name} copied to clipboard!`);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="glass-card tool-card-list">
        {/* Col 1: Logo & Name */}
        <div className="tool-identity">
          <img src={tool.logoUrl} alt={tool.name} className="tool-logo" />
          <div className="tool-title-row">
            <div className="tool-name-wrap">
              <span className="tool-name">{tool.name}</span>
              {tool.verified && <CheckCircle2 size={16} className="verified-icon" />}
            </div>
            <div className="tool-rating-chip">
              <Star size={13} fill="#fbbf24" stroke="#fbbf24" />
              <span>{tool.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({tool.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Col 2: Tagline */}
        <div>
          <p className="tool-tagline" style={{ marginBottom: 0 }}>{tool.tagline}</p>
        </div>

        {/* Col 3: Pricing & Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className={`badge ${getPricingBadgeClass(tool.pricing)}`}>
            {tool.pricing.replace('-', ' ')}
          </span>
          {tool.tags && tool.tags.slice(0, 1).map((t, idx) => (
            <span key={idx} className="tool-micro-tag">{t}</span>
          ))}
        </div>

        {/* Col 4: Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
          <button 
            onClick={() => toggleBookmark(tool.id)}
            className={`icon-action-btn ${isBookmarked ? 'bookmarked' : ''}`}
            title={isBookmarked ? "Remove Bookmark" : "Save Tool"}
          >
            <Bookmark size={15} fill={isBookmarked ? "currentColor" : "none"} />
          </button>

          <button 
            onClick={() => setSelectedToolForModal(tool)}
            className="btn btn-secondary btn-sm"
          >
            <Eye size={14} /> View
          </button>

          <a 
            href={tool.websiteUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-primary btn-sm"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    );
  }

  // Grid View Card
  return (
    <div className="glass-card tool-card">
      <div>
        {/* Top Header */}
        <div className="tool-card-header">
          <div className="tool-identity">
            <img src={tool.logoUrl} alt={tool.name} className="tool-logo" />
            <div className="tool-title-row">
              <div className="tool-name-wrap">
                <span className="tool-name">{tool.name}</span>
                {tool.verified && <CheckCircle2 size={16} className="verified-icon" />}
              </div>
              <div className="tool-rating-chip">
                <Star size={13} fill="#fbbf24" stroke="#fbbf24" />
                <span>{tool.rating}</span>
                <span style={{ color: 'var(--text-muted)' }}>({tool.reviewsCount})</span>
              </div>
            </div>
          </div>

          <div className="card-top-actions">
            <button
              onClick={handleShare}
              className="icon-action-btn"
              title="Share Tool"
            >
              <Share2 size={14} />
            </button>

            <button
              onClick={() => toggleBookmark(tool.id)}
              className={`icon-action-btn ${isBookmarked ? 'bookmarked' : ''}`}
              title={isBookmarked ? "Remove Bookmark" : "Save Tool"}
            >
              <Bookmark size={15} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Pricing Badge & Tagline */}
        <div style={{ marginBottom: '10px' }}>
          <span className={`badge ${getPricingBadgeClass(tool.pricing)}`}>
            {tool.pricing.replace('-', ' ')}
          </span>
          {tool.featured && (
            <span className="badge badge-featured" style={{ marginLeft: '6px' }}>
              Featured
            </span>
          )}
        </div>

        <p className="tool-tagline">{tool.tagline}</p>

        {/* Tags */}
        <div className="tool-tags-wrap">
          {tool.tags && tool.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="tool-micro-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="tool-card-footer">
        <div className="card-footer-left">
          <label className="compare-checkbox-label">
            <input 
              type="checkbox" 
              checked={isCompared} 
              onChange={() => toggleComparison(tool.id)} 
              style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
            />
            <span>Compare</span>
          </label>
        </div>

        <div className="card-footer-right">
          <button
            onClick={() => setSelectedToolForModal(tool)}
            className="btn btn-secondary btn-sm"
          >
            <Eye size={13} />
            <span>Details</span>
          </button>

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
          >
            <span>Try</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
