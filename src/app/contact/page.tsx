"use client";

import React, { useEffect, useRef, useState } from "react";
import StructuredData from "../../components/seo/StructuredData";
import "./ContactPage.css";

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible]   = useState(false);
  const [form, setForm]             = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>(".cp-info-item, .cp-faq-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setForm({ name: "", email: "", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setSubmitting(false);
    }
  }

  const contactData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Tilet Technologies",
    url: "https://tilet-technology.vercel.app/contact",
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: "+251-939-193603",
      contactType: "Customer Support & Incident Desk",
      areaServed: "ET",
      availableLanguage: ["English", "Amharic"],
    }],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Getu Commercial Center, Bole",
      addressLocality: "Addis Ababa",
      postalCode: "1000",
      addressCountry: "ET",
    },
  };

  const faqs = [
    { q: "How quickly do you respond?",         a: "We respond within 24 hours during business days. For urgent cybersecurity incidents, our hotline responds immediately." },
    { q: "Do you offer security audits & penetration tests?", a: "Yes, we perform comprehensive web/network penetration testing, cloud vulnerability assessments, and ISO 27001 / SOC 2 readiness audits." },
    { q: "Do you support international clients?",a: "Yes, we work with enterprises and startups globally via encrypted communications, Git workflows, and dedicated PM dashboards." },
    { q: "What core services do you offer?",     a: "Full-stack web development, mobile apps (iOS & Android), AI solutions, cloud computing, cybersecurity defense, UI/UX design, and IT consulting." },
  ];

  return (
    <>
      <StructuredData data={contactData} />

      <div
        className={`cp-page ${isVisible ? "cp-page--visible" : ""}`}
        ref={sectionRef}
      >
        {/* Top accent bar */}
        <div className="cp-top-bar" aria-hidden="true" />

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="cp-hero">
          <div className="cp-container">
            <p className="cp-eyebrow">
              <span className="cp-dot" aria-hidden="true" />
              Get in touch
            </p>
            <h1 className="cp-headline">
              Let's start a <em>conversation.</em>
            </h1>
            <p className="cp-sub">
              Have a project in mind? We'd love to hear about it.
              Reach out and let's build something great together.
            </p>
          </div>
        </section>

        <div className="cp-divider" aria-hidden="true" />

        {/* ── Main grid ─────────────────────────────────── */}
        <section className="cp-main">
          <div className="cp-container cp-layout">

            {/* ── Left: info ── */}
            <aside className="cp-aside">

              {/* Contact details */}
              <div className="cp-panel">
                <p className="cp-panel-eyebrow">Reach us</p>
                <h2 className="cp-panel-title">Contact information.</h2>

                <div className="cp-info-list">
                  {[
                    { label: "Phone",    note: "Mon – Fri, 9 am – 6 pm", value: "+251 939 193 603",      href: "tel:+251939193603"             },
                    { label: "Email",    note: "24 / 7 support",          value: "Niftalemrex@gmail.com", href: "mailto:Niftalemrex@gmail.com"  },
                    { label: "Office",   note: "Bole, Addis Ababa, ET",   value: "Getu Commercial Center",href: undefined                       },
                  ].map((item, i) => (
                    <div className="cp-info-item" key={i}>
                      <div className="cp-info-item-glow" aria-hidden="true" />
                      <p className="cp-info-label">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="cp-info-value">{item.value}</a>
                      ) : (
                        <p className="cp-info-value">{item.value}</p>
                      )}
                      <p className="cp-info-note">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="cp-panel cp-panel--hours">
                <p className="cp-panel-eyebrow">Availability</p>
                <h2 className="cp-panel-title">Business hours.</h2>
                <div className="cp-hours">
                  {[
                    { days: "Monday – Friday", time: "9:00 AM – 6:00 PM", closed: false },
                    { days: "Saturday",        time: "10:00 AM – 2:00 PM",closed: false },
                    { days: "Sunday",          time: "Closed",            closed: true  },
                  ].map((row, i) => (
                    <div className="cp-hours-row" key={i}>
                      <span className="cp-hours-days">{row.days}</span>
                      <span className={`cp-hours-time ${row.closed ? "cp-hours-time--closed" : ""}`}>
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="cp-panel cp-panel--social">
                <p className="cp-panel-eyebrow">Follow us</p>
                <div className="cp-social">
                  {[
                    { label: "Facebook",  href: "#", symbol: "f"  },
                    { label: "Twitter/X", href: "#", symbol: "𝕏"  },
                    { label: "LinkedIn",  href: "#", symbol: "in" },
                    { label: "Instagram", href: "#", symbol: "ig" },
                  ].map((s, i) => (
                    <a key={i} href={s.href} className="cp-social-btn" aria-label={s.label}>
                      {s.symbol}
                    </a>
                  ))}
                </div>
              </div>

            </aside>

            {/* ── Right: form ── */}
            <div className="cp-form-col">
              <div className="cp-panel cp-panel--form">
                <p className="cp-panel-eyebrow">Send us a message</p>
                <h2 className="cp-panel-title">We'll reply within 24 hours.</h2>

                {success && (
                  <div className="cp-success">
                    ✓ Message sent — we'll be in touch shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="cp-form">
                  <div className="cp-form-row">
                    <div className="cp-field">
                      <label htmlFor="cp-name" className="cp-label">Full name</label>
                      <input
                        id="cp-name"
                        type="text"
                        placeholder="e.g. Abebe Girma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="cp-input"
                        required
                      />
                    </div>
                    <div className="cp-field">
                      <label htmlFor="cp-email" className="cp-label">Email address</label>
                      <input
                        id="cp-email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="cp-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="cp-field">
                    <label htmlFor="cp-message" className="cp-label">Your message</label>
                    <textarea
                      id="cp-message"
                      placeholder="Tell us about your project or inquiry…"
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="cp-textarea"
                      required
                    />
                  </div>

                  <div className="cp-checkbox-row">
                    <input type="checkbox" id="cp-consent" className="cp-checkbox" required />
                    <label htmlFor="cp-consent" className="cp-checkbox-label">
                      I agree to the <a href="/privacy" className="cp-link">privacy policy</a> and
                      consent to being contacted.
                    </label>
                  </div>

                  <button type="submit" disabled={submitting} className="cp-submit">
                    {submitting ? (
                      <><span className="cp-spinner" aria-hidden="true" /> Sending…</>
                    ) : (
                      <>
                        Send message
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

        <div className="cp-divider" aria-hidden="true" />

        {/* ── Map ───────────────────────────────────────── */}
        <section className="cp-map-section">
          <div className="cp-container">
            <div className="cp-map-header">
              <p className="cp-panel-eyebrow">Find us</p>
              <h2 className="cp-map-title">Our location.</h2>
              <p className="cp-map-sub">Visit us at our office in Addis Ababa, Ethiopia.</p>
            </div>
            <div className="cp-map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.845008905784!2d38.76958806966799!3d9.002166623768426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85ae1242b7f9%3A0xcd63ab57ec12af64!2sGetu%20Commercial%20Center.!5e0!3m2!1sen!2set!4v1773867270452!5m2!1sen!2set"
                className="cp-map"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Getu Commercial Center Location"
              />
            </div>
          </div>
        </section>

        <div className="cp-divider" aria-hidden="true" />

        {/* ── FAQ ───────────────────────────────────────── */}
        <section className="cp-faq">
          <div className="cp-container">
            <div className="cp-faq-header">
              <p className="cp-panel-eyebrow">FAQ</p>
              <h2 className="cp-faq-title">Common questions.</h2>
              <p className="cp-faq-sub">Quick answers to what people ask most.</p>
            </div>

            <div className="cp-faq-grid">
              {faqs.map((faq, i) => (
                <div className="cp-faq-card" key={i}>
                  <div className="cp-faq-card-glow" aria-hidden="true" />
                  <span className="cp-faq-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="cp-faq-q">{faq.q}</h3>
                  <p className="cp-faq-a">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}