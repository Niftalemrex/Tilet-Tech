"use client";

import React, { useEffect, useState } from "react";
import StructuredData from "../../components/seo/StructuredData";
import { getReviews, Review } from "../../lib/fetchReviews";
import Card from "../../components/ui/Card";
import "./ReviewsPage.css";

export default function ReviewsPage() {
  const [reviews, setReviews]           = useState<Review[]>([]);
  const [loading, setLoading]           = useState(true);
  const [formStatus, setFormStatus]     = useState<"idle" | "success" | "error">("idle");
  const [form, setForm]                 = useState({ name: "", comment: "", rating: 5 });
  const [submitting, setSubmitting]     = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  async function loadReviews() {
    try {
      const data = await getReviews();
      setReviews(data || []);
    } catch (err) {
      console.error(err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadReviews(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("idle");
    if (!form.name.trim() || !form.comment.trim()) {
      alert("Please fill all fields");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setFormStatus("success");
      setForm({ name: "", comment: "", rating: 5 });
      await loadReviews();
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  const filteredReviews = activeFilter
    ? reviews.filter((r) => Math.floor(r.rating) === activeFilter)
    : reviews;

  const totalReviews = reviews.length;
  const avgRating    = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "5.0";

  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => Math.floor(r.rating) === stars).length,
    percentage: totalReviews > 0
      ? (reviews.filter((r) => Math.floor(r.rating) === stars).length / totalReviews) * 100
      : 0,
  }));

  const reviewsData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NiCol Technologies",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: totalReviews,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.comment,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: "5" },
      datePublished: r.created_at,
    })),
  };

  return (
    <>
      <StructuredData data={reviewsData} />

      <div className="rv-page">
        {/* Top accent bar */}
        <div className="rv-top-bar" aria-hidden="true" />

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="rv-hero">
          <div className="rv-container">
            <p className="rv-eyebrow">
              <span className="rv-dot" aria-hidden="true" />
              Client Reviews
            </p>
            <h1 className="rv-headline">
              What our <em>clients</em> say.
            </h1>
            <p className="rv-sub">
              Join 50+ satisfied businesses that have transformed their digital presence with us.
            </p>

            {/* Stats row */}
            <div className="rv-stats">
              <div className="rv-stat">
                <span className="rv-stat-value">{avgRating}</span>
                <span className="rv-stat-label">Average Rating</span>
                <div className="rv-stars" aria-label={`${avgRating} out of 5 stars`}>
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className={`rv-star ${s <= Number(avgRating) ? "rv-star--filled" : ""}`}>★</span>
                  ))}
                </div>
              </div>
              <div className="rv-stat-divider" aria-hidden="true" />
              <div className="rv-stat">
                <span className="rv-stat-value">{totalReviews}</span>
                <span className="rv-stat-label">Total Reviews</span>
                <span className="rv-stat-trend">↑ 20% this month</span>
              </div>
              <div className="rv-stat-divider" aria-hidden="true" />
              <div className="rv-stat">
                <span className="rv-stat-value">98%</span>
                <span className="rv-stat-label">Satisfaction Rate</span>
                <span className="rv-stat-trend">↑ 12% vs last month</span>
              </div>
            </div>
          </div>
        </section>

        <div className="rv-divider" aria-hidden="true" />

        {/* ── Main ─────────────────────────────────────── */}
        <section className="rv-main">
          <div className="rv-container rv-layout">

            {/* ── Left: form + distribution ── */}
            <aside className="rv-aside">

              {/* Form */}
              <div className="rv-panel">
                <p className="rv-panel-eyebrow">Share your experience</p>
                <h2 className="rv-panel-title">Write a review.</h2>

                <form onSubmit={handleSubmit} className="rv-form">
                  <div className="rv-field">
                    <label htmlFor="rv-name" className="rv-label">Your name</label>
                    <input
                      id="rv-name"
                      type="text"
                      placeholder="e.g. Abebe Girma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="rv-input"
                      required
                    />
                  </div>

                  <div className="rv-field">
                    <label className="rv-label">Rating</label>
                    <div className="rv-rating-row">
                      {[1,2,3,4,5].map((r) => (
                        <button
                          key={r}
                          type="button"
                          className={`rv-rating-btn ${(hoveredRating || form.rating) >= r ? "rv-rating-btn--on" : ""}`}
                          onClick={() => setForm({ ...form, rating: r })}
                          onMouseEnter={() => setHoveredRating(r)}
                          onMouseLeave={() => setHoveredRating(0)}
                          aria-label={`${r} star${r > 1 ? "s" : ""}`}
                        >★</button>
                      ))}
                      <span className="rv-rating-label">{form.rating} / 5</span>
                    </div>
                  </div>

                  <div className="rv-field">
                    <label htmlFor="rv-comment" className="rv-label">Your review</label>
                    <textarea
                      id="rv-comment"
                      placeholder="Tell us about your experience..."
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      className="rv-textarea"
                      rows={5}
                      required
                    />
                  </div>

                  <button type="submit" disabled={submitting} className="rv-submit">
                    {submitting ? (
                      <><span className="rv-spinner" aria-hidden="true" /> Submitting…</>
                    ) : (
                      <>
                        Submit review
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>

                  {formStatus === "success" && (
                    <p className="rv-form-msg rv-form-msg--success">
                      ✓ Thank you for your review!
                    </p>
                  )}
                  {formStatus === "error" && (
                    <p className="rv-form-msg rv-form-msg--error">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </div>

              {/* Distribution */}
              {totalReviews > 0 && (
                <div className="rv-panel rv-panel--dist">
                  <p className="rv-panel-eyebrow">Breakdown</p>
                  <h2 className="rv-panel-title">Rating distribution.</h2>
                  <div className="rv-dist">
                    {ratingCounts.map(({ stars, count, percentage }) => (
                      <div
                        key={stars}
                        className={`rv-dist-row ${activeFilter === stars ? "rv-dist-row--active" : ""}`}
                        onClick={() => setActiveFilter(activeFilter === stars ? null : stars)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setActiveFilter(activeFilter === stars ? null : stars)}
                        aria-pressed={activeFilter === stars}
                      >
                        <span className="rv-dist-label">{stars}★</span>
                        <div className="rv-dist-track">
                          <div className="rv-dist-fill" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="rv-dist-count">{count}</span>
                      </div>
                    ))}
                  </div>
                  {activeFilter && (
                    <button className="rv-clear" onClick={() => setActiveFilter(null)}>
                      Clear filter
                    </button>
                  )}
                </div>
              )}
            </aside>

            {/* ── Right: list ── */}
            <div className="rv-list-col">
              <div className="rv-list-header">
                <h2 className="rv-list-title">Customer reviews</h2>
                <span className="rv-list-count">
                  {filteredReviews.length} {filteredReviews.length === 1 ? "review" : "reviews"}
                </span>
              </div>

              {loading ? (
                <div className="rv-state">
                  <span className="rv-spinner" aria-hidden="true" />
                  <p>Loading reviews…</p>
                </div>
              ) : filteredReviews.length === 0 ? (
                <div className="rv-state">
                  <p className="rv-state-title">
                    {activeFilter ? `No ${activeFilter}-star reviews yet.` : "No reviews yet."}
                  </p>
                  <p className="rv-state-sub">Be the first to share your experience.</p>
                  {activeFilter && (
                    <button className="rv-clear" onClick={() => setActiveFilter(null)}>
                      View all reviews
                    </button>
                  )}
                </div>
              ) : (
                <div className="rv-cards">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="rv-card">
                      <div className="rv-card-top">
                        <div className="rv-card-left">
                          <div className="rv-avatar" aria-hidden="true">
                            {review.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="rv-reviewer-name">{review.name}</p>
                            <div className="rv-stars" aria-label={`${review.rating} out of 5`}>
                              {[1,2,3,4,5].map((s) => (
                                <span key={s} className={`rv-star ${s <= review.rating ? "rv-star--filled" : ""}`}>★</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {review.created_at && (
                          <span className="rv-date">
                            {new Date(review.created_at).toLocaleDateString("en-US", {
                              year: "numeric", month: "short", day: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                      <p className="rv-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </section>

        <div className="rv-divider" aria-hidden="true" />

        {/* ── Trust badges ─────────────────────────────── */}
        <section className="rv-trust">
          <div className="rv-container rv-trust-grid">
            {[
              { icon: "✦", label: "Verified Reviews"       },
              { icon: "⌁", label: "Secure & Private"       },
              { icon: "◎", label: "Real Customer Feedback"  },
              { icon: "✓", label: "Authentic Experiences"   },
            ].map((b, i) => (
              <div className="rv-badge" key={i}>
                <span className="rv-badge-icon" aria-hidden="true">{b.icon}</span>
                <span className="rv-badge-label">{b.label}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}