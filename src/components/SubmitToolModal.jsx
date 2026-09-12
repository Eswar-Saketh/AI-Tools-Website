import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categoriesData';
import { 
  X, 
  PlusCircle, 
  CheckCircle, 
  Sparkles, 
  Globe, 
  DollarSign, 
  Tag, 
  FileText, 
  Layers, 
  Star, 
  ExternalLink,
  Check,
  CheckCircle2,
  Bookmark,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESET_LOGOS = [
  { label: "Indigo Neural", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80" },
  { label: "Cyan Quantum", url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80" },
  { label: "Emerald Matrix", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=120&q=80" },
  { label: "Pink Nebula", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=120&q=80" }
];

const SUGGESTED_TAGS = [
  "API Available",
  "Browser Extension",
  "Mobile App",
  "Open Weights",
  "Self-Hosted",
  "No Code",
  "Enterprise Ready"
];

export default function SubmitToolModal() {
  const { isSubmitModalOpen, setIsSubmitModalOpen, submitNewTool } = useApp();

  const [formData, setFormData] = useState({
    name: 'OmniSynthetix AI',
    tagline: 'Autonomous AI workflow orchestrator for full-stack engineering teams',
    category: 'code-dev',
    pricing: 'freemium',
    priceDetails: 'Free 1,000 runs/mo; Pro at $19/mo',
    websiteUrl: 'https://omnisynthetix.ai',
    logoUrl: PRESET_LOGOS[0].url,
    overview: 'OmniSynthetix connects multi-agent reasoning with CI/CD automation pipelines to autonomously diagnose build errors, generate unit test suites, and deploy infrastructure.',
    tags: ['API Available', 'Enterprise Ready', 'No Code']
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isSubmitModalOpen) return null;

  const toggleTag = (tag) => {
    if (formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.tagline.trim() || !formData.websiteUrl.trim()) {
      alert("Please provide the Tool Name, Tagline, and Website URL.");
      return;
    }

    submitNewTool({
      ...formData,
      keyFeatures: [
        `${formData.name} autonomous AI execution pipeline`,
        "Seamless cloud API and webhook integrations",
        "Sub-second latency with real-time feedback loops"
      ],
      pros: ["Zero complex setup", "Modern intuitive UI", "Continuous frontier updates"],
      cons: ["New entrant to the ecosystem"],
      pricingTiers: [
        { name: "Starter", price: "$0", features: ["Core features", "Community support"] },
        { name: "Pro", price: "$19/mo", features: ["Unlimited usage", "API access", "Priority queue"] }
      ]
    });

    // Fire celebratory confetti!
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsSubmitModalOpen(false);
    }, 2200);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsSubmitModalOpen(false)}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '1020px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-icon-box" style={{ width: '36px', height: '36px' }}>
              <PlusCircle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.35rem' }}>Submit an AI Startup or Tool</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Publish your AI application to over 40,000 monthly explorers & builders
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSubmitModalOpen(false)}
            className="icon-action-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <CheckCircle size={64} color="var(--accent-emerald)" className="animate-float" style={{ margin: '0 auto 18px auto' }} />
              <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Tool Published Successfully!</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto' }}>
                Your AI tool has been verified and added to the live NeuroVault AI directory.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="submit-studio-grid">
              {/* Left Form Controls */}
              <div className="submit-form-pane">
                {/* Tool Name */}
                <div className="form-group">
                  <label className="form-label">
                    <Sparkles size={14} color="var(--accent-primary)" />
                    Tool Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DreamForge AI"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                {/* Tagline */}
                <div className="form-group">
                  <label className="form-label">
                    <FileText size={14} color="var(--accent-cyan)" />
                    One-Sentence Tagline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next-generation generative 3D model engine for game devs"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="form-input"
                  />
                </div>

                {/* Category & Website URL */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">
                      <Layers size={14} color="var(--accent-secondary)" />
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="form-select"
                    >
                      {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Globe size={14} color="var(--accent-emerald)" />
                      Website URL *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://yourtool.ai"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Pricing Model Radio Cards */}
                <div className="form-group">
                  <label className="form-label">
                    <DollarSign size={14} color="var(--accent-amber)" />
                    Pricing Model
                  </label>
                  <div className="pricing-radio-grid">
                    {[
                      { id: 'free', label: '100% Free' },
                      { id: 'freemium', label: 'Freemium' },
                      { id: 'free-trial', label: 'Free Trial' },
                      { id: 'paid', label: 'Paid' },
                      { id: 'open-source', label: 'Open Source' }
                    ].map(price => (
                      <div
                        key={price.id}
                        onClick={() => setFormData({ ...formData, pricing: price.id })}
                        className={`pricing-radio-card ${formData.pricing === price.id ? 'selected' : ''}`}
                      >
                        <span>{price.label}</span>
                        {formData.pricing === price.id && <Check size={14} color="var(--accent-primary)" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logo Preset Picker */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Tool Logo Avatar</span>
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {PRESET_LOGOS.map((preset, idx) => (
                      <img
                        key={idx}
                        src={preset.url}
                        alt={preset.label}
                        onClick={() => setFormData({ ...formData, logoUrl: preset.url })}
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          objectFit: 'cover',
                          border: formData.logoUrl === preset.url ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                          boxShadow: formData.logoUrl === preset.url ? '0 0 12px rgba(99, 102, 241, 0.4)' : 'none'
                        }}
                      />
                    ))}
                    <input
                      type="url"
                      placeholder="Or paste custom logo URL..."
                      value={formData.logoUrl}
                      onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                      className="form-input"
                      style={{ flex: 1, padding: '8px 12px', fontSize: '0.84rem' }}
                    />
                  </div>
                </div>

                {/* Feature Tags Chips */}
                <div className="form-group">
                  <label className="form-label">
                    <Tag size={14} color="var(--accent-rose)" />
                    Tags & Badges
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {SUGGESTED_TAGS.map(tag => {
                      const isSelected = formData.tags.includes(tag);
                      return (
                        <button
                          type="button"
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`tag-filter-chip ${isSelected ? 'active' : ''}`}
                          style={{ fontSize: '0.78rem' }}
                        >
                          {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Overview Text */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Detailed Description & Features</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe core workflows, architecture, and what makes this tool exceptional..."
                    value={formData.overview}
                    onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <Sparkles size={16} />
                    <span>Publish AI Tool</span>
                  </button>
                </div>
              </div>

              {/* Right Live Card Preview Pane */}
              <div className="submit-preview-pane">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Live Directory Preview
                  </span>
                  <span className="badge badge-featured">Instant Preview</span>
                </div>

                {/* Simulated Tool Card */}
                <div className="glass-card tool-card" style={{ pointerEvents: 'none', margin: '10px 0' }}>
                  <div className="tool-card-header">
                    <div className="tool-identity">
                      <img src={formData.logoUrl} alt="Preview" className="tool-logo" />
                      <div className="tool-title-row">
                        <div className="tool-name-wrap">
                          <span className="tool-name">{formData.name || 'Your Tool Name'}</span>
                          <CheckCircle2 size={16} className="verified-icon" />
                        </div>
                        <div className="tool-rating-chip">
                          <Star size={13} fill="#fbbf24" stroke="#fbbf24" />
                          <span>5.0</span>
                          <span style={{ color: 'var(--text-muted)' }}>(New)</span>
                        </div>
                      </div>
                    </div>

                    <div className="card-top-actions">
                      <div className="icon-action-btn">
                        <Bookmark size={15} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <span className={`badge badge-${formData.pricing}`}>
                      {formData.pricing.replace('-', ' ')}
                    </span>
                    <span className="badge badge-featured" style={{ marginLeft: '6px' }}>
                      Just Added
                    </span>
                  </div>

                  <p className="tool-tagline">
                    {formData.tagline || 'Add your one-sentence value proposition here...'}
                  </p>

                  <div className="tool-tags-wrap">
                    {formData.tags.map((tag, idx) => (
                      <span key={idx} className="tool-micro-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="tool-card-footer">
                    <div className="card-footer-left">
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {formData.category}
                      </span>
                    </div>

                    <div className="card-footer-right">
                      <div className="btn btn-secondary btn-sm">
                        <Eye size={13} />
                        <span>Details</span>
                      </div>
                      <div className="btn btn-primary btn-sm">
                        <span>Try</span>
                        <ExternalLink size={13} />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 'var(--radius-md)', padding: '12px 14px', fontSize: '0.82rem', color: '#c7d2fe' }}>
                  💡 <strong>Pro Tip:</strong> High quality taglines with distinct feature tags see up to 3x higher click-through rates.
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
