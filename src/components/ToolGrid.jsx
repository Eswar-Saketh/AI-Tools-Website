import React from 'react';
import { useApp } from '../context/AppContext';
import ToolCard from './ToolCard';
import { SearchX, Sparkles, RotateCcw } from 'lucide-react';

export default function ToolGrid() {
  const { filteredTools, viewMode, resetFilters, searchQuery, selectedCategory, pricingFilter } = useApp();

  return (
    <section className="tools-section">
      <div className="container">
        {/* Results Count Bar */}
        <div className="tools-count-bar">
          <div>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredTools.length}</strong> AI Tools
            {selectedCategory !== 'all' && <span> in this category</span>}
          </div>
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 ? (
          <div className="empty-state">
            <SearchX className="empty-icon animate-float" />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>No AI Tools Found</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 20px auto' }}>
              We couldn't find any tools matching your active search or filter criteria. Try adjusting your query or resetting filters.
            </p>
            <button onClick={resetFilters} className="btn btn-primary">
              <RotateCcw size={15} />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'tools-grid' : 'tools-list'}>
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
