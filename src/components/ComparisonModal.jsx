import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ExternalLink, Star, CheckCircle2, Check, Minus } from 'lucide-react';

export default function ComparisonModal() {
  const { 
    isCompareModalOpen, 
    setIsCompareModalOpen, 
    comparedTools, 
    toggleComparison 
  } = useApp();

  if (!isCompareModalOpen || comparedTools.length === 0) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsCompareModalOpen(false)}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '1100px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.35rem' }}>AI Tools Side-by-Side Comparison</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Comparing {comparedTools.length} selected tools
            </p>
          </div>

          <button
            onClick={() => setIsCompareModalOpen(false)}
            className="icon-action-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="modal-body" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '650px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '16px', textAlign: 'left', width: '22%', color: 'var(--text-muted)' }}>
                  Attributes
                </th>
                {comparedTools.map(tool => (
                  <th key={tool.id} style={{ padding: '16px', textAlign: 'center', width: `${78 / comparedTools.length}%` }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <img src={tool.logoUrl} alt={tool.name} style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
                      <div style={{ fontWeight: 700, fontSize: '1rem' }}>{tool.name}</div>
                      <a
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Visit <ExternalLink size={11} />
                      </a>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Category */}
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Category</td>
                {comparedTools.map(tool => (
                  <td key={tool.id} style={{ padding: '14px', textAlign: 'center' }}>
                    <span className="badge badge-freemium">{tool.category}</span>
                  </td>
                ))}
              </tr>

              {/* Pricing */}
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Pricing Model</td>
                {comparedTools.map(tool => (
                  <td key={tool.id} style={{ padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, textTransform: 'capitalize', color: 'var(--accent-cyan)' }}>
                      {tool.pricing.replace('-', ' ')}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {tool.priceDetails}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Rating & Reviews</td>
                {comparedTools.map(tool => (
                  <td key={tool.id} style={{ padding: '14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                      <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                      <strong>{tool.rating} / 5.0</strong>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      ({tool.reviewsCount} reviews)
                    </div>
                  </td>
                ))}
              </tr>

              {/* Key Features */}
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Key Strengths</td>
                {comparedTools.map(tool => (
                  <td key={tool.id} style={{ padding: '14px', verticalAlign: 'top' }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {tool.keyFeatures?.slice(0, 3).map((f, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                          <Check size={12} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Tags & Capabilities */}
              <tr>
                <td style={{ padding: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Supported Tags</td>
                {comparedTools.map(tool => (
                  <td key={tool.id} style={{ padding: '14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                      {tool.tags?.map((t, idx) => (
                        <span key={idx} className="tool-micro-tag">{t}</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
