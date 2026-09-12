import React from 'react';
import { useApp } from '../context/AppContext';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';

export default function ComparisonTray() {
  const { 
    comparedTools, 
    toggleComparison, 
    clearComparison, 
    setIsCompareModalOpen 
  } = useApp();

  if (comparedTools.length === 0) return null;

  return (
    <div className="comparison-tray">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="var(--accent-primary)" />
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
            Compare ({comparedTools.length}/4)
          </span>
        </div>

        {/* Selected Tool Thumbnails */}
        <div className="compare-tray-items">
          {comparedTools.map(tool => (
            <div key={tool.id} className="compare-thumb-box" title={tool.name}>
              <img src={tool.logoUrl} alt={tool.name} className="compare-thumb" />
              <button 
                onClick={() => toggleComparison(tool.id)}
                className="compare-thumb-remove"
                title="Remove from comparison"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={clearComparison}
          className="btn btn-ghost btn-sm"
          title="Clear all selected tools"
        >
          <Trash2 size={14} />
          <span>Clear</span>
        </button>

        <button
          onClick={() => setIsCompareModalOpen(true)}
          className="btn btn-primary btn-sm"
          disabled={comparedTools.length < 2}
          style={{ opacity: comparedTools.length < 2 ? 0.6 : 1 }}
        >
          <span>Compare Now</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
