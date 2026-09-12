import React, { useState } from 'react';
import { Mail, Sparkles, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 }
    });

    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="container">
      <div className="newsletter-card">
        <div className="hero-badge" style={{ marginBottom: '14px' }}>
          <Mail size={14} />
          <span>Weekly AI Radar</span>
        </div>

        <h2 style={{ fontSize: '2.1rem', marginBottom: '12px' }}>
          Never Miss a <span className="gradient-text">Breakthrough AI Release</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '0.98rem' }}>
          Join 42,000+ founders, engineers, and creators getting our weekly curated breakdown of the hottest newly benchmarked AI models, open-source weights, and developer tools.
        </p>

        {subscribed ? (
          <div style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: 'var(--radius-full)', color: '#34d399', fontWeight: 600 }}>
            <Check size={18} />
            <span>You're subscribed! Welcome to the frontier.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              required
              placeholder="Enter your work email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
            />
            <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
              <span>Subscribe Free</span>
              <ArrowRight size={15} />
            </button>
          </form>
        )}

        <div style={{ marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          🔒 Zero spam. Unsubscribe anytime in 1 click.
        </div>
      </div>
    </section>
  );
}
