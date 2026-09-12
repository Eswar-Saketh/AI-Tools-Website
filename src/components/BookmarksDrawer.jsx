import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  Download, 
  Eye, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function BookmarksDrawer() {
  const { 
    isBookmarksDrawerOpen, 
    setIsBookmarksDrawerOpen, 
    bookmarkedTools, 
    toggleBookmark, 
    setSelectedToolForModal 
  } = useApp();

  if (!isBookmarksDrawerOpen) return null;

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookmarkedTools, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "neurovault-bookmarked-ai-tools.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <>
      <div 
        className="drawer-overlay" 
        onClick={() => setIsBookmarksDrawerOpen(false)} 
      />
      <aside className="drawer-panel">
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bookmark size={20} color="var(--accent-rose)" fill="var(--accent-rose)" />
            <h3 style={{ fontSize: '1.2rem' }}>Saved Tools ({bookmarkedTools.length})</h3>
          </div>

          <button
            onClick={() => setIsBookmarksDrawerOpen(false)}
            className="icon-action-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {bookmarkedTools.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <Bookmark size={48} style={{ opacity: 0.3, margin: '0 auto 16px auto' }} />
              <h4>No Saved Tools Yet</h4>
              <p style={{ fontSize: '0.86rem', marginTop: '6px' }}>
                Click the bookmark icon on any AI tool card to save your favorite tools for quick access.
              </p>
            </div>
          ) : (
            bookmarkedTools.map(tool => (
              <div 
                key={tool.id} 
                className="glass-card" 
                style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <img src={tool.logoUrl} alt={tool.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {tool.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {tool.pricing} • {tool.category}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => {
                      setSelectedToolForModal(tool);
                      setIsBookmarksDrawerOpen(false);
                    }}
                    className="icon-action-btn"
                    title="View Details"
                  >
                    <Eye size={14} />
                  </button>

                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-action-btn"
                    title="Launch Tool"
                  >
                    <ExternalLink size={14} />
                  </a>

                  <button
                    onClick={() => toggleBookmark(tool.id)}
                    className="icon-action-btn"
                    title="Remove from saved"
                    style={{ color: '#f87171' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {bookmarkedTools.length > 0 && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleExportJSON}
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
            >
              <Download size={14} />
              <span>Export JSON</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
