import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_AI_TOOLS } from '../data/aiToolsData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Always dark theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  // Tools state with custom additions and reviews stored in localStorage
  const [tools, setTools] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('neurovault_custom_tools');
      const customList = savedCustom ? JSON.parse(savedCustom) : [];
      
      const savedReviews = localStorage.getItem('neurovault_tool_reviews');
      const reviewsMap = savedReviews ? JSON.parse(savedReviews) : {};

      const combined = [...customList, ...INITIAL_AI_TOOLS];

      return combined.map(tool => {
        if (reviewsMap[tool.id]) {
          const userReviews = reviewsMap[tool.id];
          const allRatings = [tool.rating, ...userReviews.map(r => r.rating)];
          const avg = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
          return {
            ...tool,
            rating: Number(avg.toFixed(2)),
            reviewsCount: tool.reviewsCount + userReviews.length,
            userReviews: userReviews
          };
        }
        return { ...tool, userReviews: [] };
      });
    } catch (e) {
      console.error("Error reading saved tools:", e);
      return INITIAL_AI_TOOLS.map(t => ({ ...t, userReviews: [] }));
    }
  });

  // Filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pricingFilter, setPricingFilter] = useState('all');
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Bookmarks
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('neurovault_bookmarks');
      return saved ? JSON.parse(saved) : ['claude-3-5', 'cursor', 'flux-1', 'bolt-new'];
    } catch {
      return ['claude-3-5', 'cursor', 'flux-1'];
    }
  });

  useEffect(() => {
    localStorage.setItem('neurovault_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (toolId) => {
    setBookmarks(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId);
      } else {
        return [...prev, toolId];
      }
    });
  };

  // Comparison Tray
  const [comparisonList, setComparisonList] = useState([]);

  const toggleComparison = (toolId) => {
    setComparisonList(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId);
      } else {
        if (prev.length >= 4) {
          alert("You can compare up to 4 AI tools at a time.");
          return prev;
        }
        return [...prev, toolId];
      }
    });
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  // Modals & Drawers
  const [selectedToolForModal, setSelectedToolForModal] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isBookmarksDrawerOpen, setIsBookmarksDrawerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Submit New Tool
  const submitNewTool = (toolData) => {
    const newTool = {
      ...toolData,
      id: 'tool-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      bookmarksCount: 1,
      releaseYear: new Date().getFullYear(),
      verified: true,
      featured: true,
      toolOfTheDay: false,
      userReviews: []
    };

    setTools(prev => [newTool, ...prev]);

    try {
      const savedCustom = localStorage.getItem('neurovault_custom_tools');
      const customList = savedCustom ? JSON.parse(savedCustom) : [];
      localStorage.setItem('neurovault_custom_tools', JSON.stringify([newTool, ...customList]));
    } catch (e) {
      console.error("Error saving new tool:", e);
    }
  };

  // Add Review
  const addToolReview = (toolId, rating, reviewText, author = "Verified User") => {
    const newReview = {
      id: 'rev-' + Date.now(),
      rating: Number(rating),
      text: reviewText,
      author: author || "Anonymous AI Explorer",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setTools(prevTools => {
      return prevTools.map(tool => {
        if (tool.id === toolId) {
          const updatedUserReviews = [newReview, ...(tool.userReviews || [])];
          const allRatings = [tool.rating, ...updatedUserReviews.map(r => r.rating)];
          const avg = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
          return {
            ...tool,
            rating: Number(avg.toFixed(2)),
            reviewsCount: tool.reviewsCount + 1,
            userReviews: updatedUserReviews
          };
        }
        return tool;
      });
    });

    try {
      const savedReviews = localStorage.getItem('neurovault_tool_reviews');
      const reviewsMap = savedReviews ? JSON.parse(savedReviews) : {};
      const toolReviews = reviewsMap[toolId] || [];
      reviewsMap[toolId] = [newReview, ...toolReviews];
      localStorage.setItem('neurovault_tool_reviews', JSON.stringify(reviewsMap));
    } catch (e) {
      console.error("Error saving review:", e);
    }
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPricingFilter('all');
    setSelectedTag(null);
    setSortBy('popular');
  };

  // Filtered & Sorted Tools Memo
  const filteredTools = useMemo(() => {
    return tools
      .filter(tool => {
        // Search Query match
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesName = tool.name.toLowerCase().includes(query);
          const matchesTagline = tool.tagline?.toLowerCase().includes(query);
          const matchesOverview = tool.overview?.toLowerCase().includes(query);
          const matchesTags = tool.tags?.some(tag => tag.toLowerCase().includes(query));
          if (!matchesName && !matchesTagline && !matchesOverview && !matchesTags) {
            return false;
          }
        }

        // Category match
        if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
          return false;
        }

        // Pricing match
        if (pricingFilter !== 'all' && tool.pricing !== pricingFilter) {
          return false;
        }

        // Tag match
        if (selectedTag && !tool.tags?.includes(selectedTag)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') {
          return (b.bookmarksCount || 0) - (a.bookmarksCount || 0);
        }
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        if (sortBy === 'newest') {
          return (b.releaseYear || 0) - (a.releaseYear || 0);
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [tools, searchQuery, selectedCategory, pricingFilter, selectedTag, sortBy]);

  // Spotlight tool of the day
  const toolOfTheDay = useMemo(() => {
    return tools.find(t => t.toolOfTheDay) || tools[0];
  }, [tools]);

  // Bookmarked tools objects
  const bookmarkedTools = useMemo(() => {
    return tools.filter(t => bookmarks.includes(t.id));
  }, [tools, bookmarks]);

  // Compared tools objects
  const comparedTools = useMemo(() => {
    return tools.filter(t => comparisonList.includes(t.id));
  }, [tools, comparisonList]);

  return (
    <AppContext.Provider
      value={{
        theme: 'dark',
        tools,
        filteredTools,
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
        bookmarks,
        toggleBookmark,
        bookmarkedTools,
        comparisonList,
        toggleComparison,
        clearComparison,
        comparedTools,
        toolOfTheDay,
        selectedToolForModal,
        setSelectedToolForModal,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        isBookmarksDrawerOpen,
        setIsBookmarksDrawerOpen,
        isCompareModalOpen,
        setIsCompareModalOpen,
        submitNewTool,
        addToolReview,
        resetFilters
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
