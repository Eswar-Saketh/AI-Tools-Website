import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  Check, 
  XCircle, 
  Bookmark, 
  Sparkles, 
  Layers, 
  MessageSquarePlus, 
  Send,
  ShieldAlert,
  ThumbsUp,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ToolDetailModal() {
  const { 
    selectedToolForModal, 
    setSelectedToolForModal, 
    bookmarks, 
    toggleBookmark, 
    tools,
    addToolReview 
  } = useApp();

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!selectedToolForModal) return null;

  const tool = selectedToolForModal;
  const isBookmarked = bookmarks.includes(tool.id);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    addToolReview(tool.id, reviewRating, reviewText, authorName);
    
    // Fire celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setReviewSubmitted(true);
    setReviewText('');
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const handleAlternativeClick = (altName) => {
    const matched = tools.find(t => t.name.toLowerCase().includes(altName.toLowerCase()) || altName.toLowerCase().includes(t.name.toLowerCase()));
    if (matched) {
      setSelectedToolForModal(matched);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedToolForModal(null)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-freemium">{tool.category?.toUpperCase()}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Est. {tool.releaseYear}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => toggleBookmark(tool.id)}
              className={`icon-action-btn ${isBookmarked ? 'bookmarked' : ''}`}
              title={isBookmarked ? "Saved" : "Save Tool"}
            >
              <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
            </button>

            <button
              onClick={() => setSelectedToolForModal(null)}
              className="icon-action-btn"
              title="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Hero Banner */}
          <div className="modal-hero-banner">
            <img src={tool.logoUrl} alt={tool.name} className="modal-tool-logo" />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.6rem' }}>{tool.name}</h2>
                {tool.verified && <CheckCircle2 size={18} className="verified-icon" />}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', marginBottom: '10px' }}>
                {tool.tagline}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <div className="tool-rating-chip" style={{ fontSize: '0.9rem' }}>
                  <Star size={15} fill="#fbbf24" stroke="#fbbf24" />
                  <strong>{tool.rating}</strong>
                  <span style={{ color: 'var(--text-muted)' }}>({tool.reviewsCount} verified reviews)</span>
                </div>

                <span className="badge badge-free" style={{ fontSize: '0.78rem' }}>
                  {tool.priceDetails || tool.pricing}
                </span>
              </div>
            </div>

            <div>
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-md"
              >
                <span>Launch Tool</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {tool.tags?.map((tag, idx) => (
              <span key={idx} className="tool-micro-tag" style={{ padding: '4px 10px' }}>
                <Tag size={12} style={{ display: 'inline', marginRight: '4px' }} />
                {tag}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div>
            <h4 className="detail-section-title">
              <Sparkles size={16} color="var(--accent-primary)" />
              Overview & Capabilities
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.94rem' }}>
              {tool.overview}
            </p>
          </div>

          {/* Key Features */}
          {tool.keyFeatures && (
            <div>
              <h4 className="detail-section-title">
                <Check size={16} color="#10b981" />
                Key Highlights
              </h4>
              <div className="feature-bullets-grid">
                {tool.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="feature-bullet-item">
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', marginTop: '8px', flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros & Cons */}
          {(tool.pros || tool.cons) && (
            <div className="pros-cons-grid">
              {tool.pros && (
                <div className="pros-box">
                  <h5 style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', fontSize: '0.92rem' }}>
                    <ThumbsUp size={15} /> What Users Love (Pros)
                  </h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tool.pros.map((p, idx) => (
                      <li key={idx} style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#34d399' }}>+</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tool.cons && (
                <div className="cons-box">
                  <h5 style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', fontSize: '0.92rem' }}>
                    <ShieldAlert size={15} /> Considerations (Cons)
                  </h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tool.cons.map((c, idx) => (
                      <li key={idx} style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#f87171' }}>–</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Pricing Tiers Table */}
          {tool.pricingTiers && tool.pricingTiers.length > 0 && (
            <div>
              <h4 className="detail-section-title">
                <Layers size={16} color="var(--accent-cyan)" />
                Pricing Plans & Tiers
              </h4>
              <div className="pricing-table-grid">
                {tool.pricingTiers.map((tier, idx) => (
                  <div key={idx} className="pricing-card">
                    <div>
                      <div className="pricing-card-name">{tier.name}</div>
                      <div className="pricing-card-price">{tier.price}</div>
                    </div>
                    <ul className="pricing-features-list">
                      {tier.features?.map((f, fIdx) => (
                        <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Check size={12} color="var(--accent-emerald)" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alternatives */}
          {tool.alternatives && tool.alternatives.length > 0 && (
            <div>
              <h4 className="detail-section-title">Top Alternatives</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {tool.alternatives.map((alt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAlternativeClick(alt)}
                    className="btn btn-secondary btn-sm"
                  >
                    <span>{alt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="reviews-container">
            <h4 className="detail-section-title">
              <MessageSquarePlus size={16} color="var(--accent-amber)" />
              Community Reviews ({tool.userReviews?.length || 0})
            </h4>

            {/* List user reviews */}
            {tool.userReviews && tool.userReviews.length > 0 ? (
              <div style={{ marginTop: '12px' }}>
                {tool.userReviews.map((rev) => (
                  <div key={rev.id} className="review-card-item">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{rev.author}</span>
                        <div style={{ display: 'flex', color: '#fbbf24' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              fill={i < rev.rating ? "#fbbf24" : "none"} 
                              stroke="#fbbf24" 
                            />
                          ))}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{rev.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                No written reviews yet. Be the first to share your experience with {tool.name}!
              </p>
            )}

            {/* Submit Review Form */}
            <form onSubmit={handleReviewSubmit} style={{ background: 'var(--bg-tertiary)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginTop: '16px' }}>
              <h5 style={{ fontSize: '0.92rem', marginBottom: '12px' }}>Leave a Rating & Review</h5>

              <div style={{ display: 'flex', gap: '14px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Your Name (e.g. Alex M.)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem'
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Rating:</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#fbbf24' }}
                      >
                        <Star 
                          size={18} 
                          fill={star <= reviewRating ? "#fbbf24" : "none"} 
                          stroke="#fbbf24" 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                placeholder={`What was your experience using ${tool.name}? Share key benefits or workflow tips...`}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={3}
                required
                style={{
                  width: '100%',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  resize: 'vertical',
                  marginBottom: '10px'
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {reviewSubmitted ? (
                  <span style={{ color: 'var(--accent-emerald)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={16} /> Thank you! Your review was recorded.
                  </span>
                ) : <span />}

                <button type="submit" className="btn btn-primary btn-sm">
                  <Send size={13} />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
