import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRICING_OPTIONS, POPULAR_TAGS, SORT_OPTIONS } from '../data/categoriesData';
import { 
  Search, 
  X, 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  Sparkles, 
  MessageSquare, 
  Code2, 
  Image, 
  Video, 
  Mic, 
  Zap, 
  TrendingUp,
  RotateCcw
} from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  MessageSquare: MessageSquare,
  Code2: Code2,
  Image: Image,
  Video: Video,
  Mic: Mic,
  Zap: Zap,
  TrendingUp: TrendingUp
};

export default function SearchAndFilters() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    pricingFilter,
    setPricingFilter,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    resetFilters,
    filteredTools,
    tools
  } = useApp();

  const isFilterActive = searchQuery || selectedCategory !== 'all' || pricingFilter !== 'all' || selectedTag !== null || sortBy !== 'popular';

  return (
    <section id="directory" className="search-filter-section">
      <div className="container">
        {/* Main Search Input */}
        <div className="search-bar-wrapper">
          <Search size={20} className="search-icon-left" />
          <input
            id="main-search-input"
            type="text"
            className="search-input"
            placeholder="Search 35+ top AI tools by name, features, tags (e.g., 'code', 'photorealism', 'voice cloning')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="search-clear-right" 
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Category Carousel Pills */}
        <div className="category-pills-row">
          {CATEGORIES.map(cat => {
            const IconComponent = iconMap[cat.icon] || Sparkles;
            const count = cat.id === 'all' 
              ? tools.length 
              : tools.filter(t => t.category === cat.id).length;

            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-pill ${isActive ? 'active' : ''}`}
              >
                <IconComponent size={15} />
                <span>{cat.name}</span>
                <span className="pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-Filters: Tags, Pricing, Sort, and View Mode */}
        <div className="sub-filter-row">
          {/* Popular Tag Chips */}
          <div className="tags-scroll-container">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Tags:
            </span>
            {POPULAR_TAGS.map(tag => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`tag-filter-chip ${isSelected ? 'active' : ''}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Right Action Dropdowns */}
          <div className="filter-actions-right">
            {/* Pricing Filter */}
            <select
              className="select-filter"
              value={pricingFilter}
              onChange={(e) => setPricingFilter(e.target.value)}
            >
              {PRICING_OPTIONS.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>

            {/* Sort Options */}
            <select
              className="select-filter"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="view-toggle-group">
              <button
                onClick={() => setViewMode('grid')}
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>

            {/* Reset Filters */}
            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="btn btn-outline btn-sm"
                title="Reset all filters"
                style={{ padding: '6px 10px' }}
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
