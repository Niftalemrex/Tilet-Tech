"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import EthiopianTiletBackground from "../components/ui/EthiopianTiletBackground";
import "./HomePage.css";

// Real production project screenshots
import limsDashboard from "../images/Lims D.png";
import wemsDashboard from "../images/Wedding D.png";
import wemsAlt from "../images/Wems p.png";

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { value: "200+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "40+", label: "Technologies" },
    { value: "5+ yrs", label: "Engineering Excellence" },
  ];

  const capabilities = [
    {
      num: "01",
      title: "Full-Stack Web Development",
      desc: "Robust web platforms and SaaS applications engineered with Next.js, React, Node.js, and TypeScript. Optimized for high throughput, sub-second latency, and SEO dominance.",
      tags: ["Next.js", "React 19", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"],
      icon: "fa-solid fa-code",
    },
    {
      num: "02",
      title: "Mobile App Development",
      desc: "Cross-platform and native iOS & Android applications built with Flutter, React Native, Swift, and Kotlin. Offline-first data synchronization, sleek gestures, and frictionless user flows.",
      tags: ["Flutter", "React Native", "iOS / Swift", "Android / Kotlin", "REST APIs"],
      icon: "fa-solid fa-mobile-screen-button",
    },
    {
      num: "03",
      title: "Applied AI & Machine Learning",
      desc: "Custom computer vision systems, OpenCV analysis, predictive neural models, and enterprise LLM integrations that automate complex workflows and provide real-time business insights.",
      tags: ["Python", "PyTorch", "TensorFlow", "Computer Vision", "LLMs", "FastAPI"],
      icon: "fa-solid fa-brain",
    },
    {
      num: "04",
      title: "Cloud Infrastructure & Cybersecurity",
      desc: "Resilient cloud architectures on AWS, Azure, and Google Cloud with Kubernetes containerization, coupled with zero-trust defense, penetration testing, and security compliance.",
      tags: ["AWS", "Docker", "Kubernetes", "Zero Trust", "Penetration Testing", "CI/CD"],
      icon: "fa-solid fa-shield-halved",
    },
  ];

  const featuredProjects = [
    {
      id: 0,
      client: "Healthcare & Diagnostics",
      title: "LIMS Enterprise Laboratory System",
      desc: "A mission-critical laboratory information management system handling thousands of daily clinical samples, automated turnaround matrix analytics, and custom Amharic and Arabic multilingual interfaces.",
      tags: ["React", "PostgreSQL", "Analytics Dashboard", "Multilingual", "Healthcare"],
      image: limsDashboard,
      metrics: "Over 50,000 samples processed with 99.98% platform uptime.",
    },
    {
      id: 1,
      client: "Event Technology",
      title: "WEMS Event Management & Logistics",
      desc: "A comprehensive event planning platform providing real-time scheduling, vendor contract oversight, inventory tracking, and localized payment gateway integration.",
      tags: ["Next.js", "Node.js", "Vendor Logistics", "Payment Integrations"],
      image: wemsDashboard,
      metrics: "Reduced planning turnaround by 40% for multi-venue events.",
    },
    {
      id: 2,
      client: "Enterprise Resource Management",
      title: "Operations & Equipment Matrix",
      desc: "Specialized inventory and tech equipment scheduling system providing real-time availability tracking, automated maintenance workflows, and secure role-based access.",
      tags: ["TypeScript", "Resource Tracking", "Cloud Architecture", "RBAC Security"],
      image: wemsAlt,
      metrics: "Real-time visibility across 500+ critical equipment assets.",
    },
  ];

  const principles = [
    {
      title: "Performance by Design",
      desc: "We engineer systems with minimal bundle sizes, optimized database queries, edge caching, and responsive layouts that perform seamlessly on any connection.",
      icon: "fa-solid fa-bolt",
    },
    {
      title: "Security-First Architecture",
      desc: "Every system we deliver incorporates zero-trust principles, hardened authentication, OWASP compliance, and end-to-end data encryption by default.",
      icon: "fa-solid fa-lock",
    },
    {
      title: "Complete Lifecycle Ownership",
      desc: "From initial UI/UX Figma prototypes to full-stack implementation, cloud deployment, and 24/7 technical support, we take full responsibility for your product.",
      icon: "fa-solid fa-diagram-project",
    },
  ];

  const techRows = [
    ["React", "Next.js", "TypeScript", "Node.js", "Flutter", "Python", "Go", "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL", "TensorFlow", "PyTorch", "Redis"],
    ["Vue.js", "Angular", "Swift", "Kotlin", "Django", "FastAPI", "Spring Boot", ".NET", "Azure", "GCP", "Terraform", "Splunk", "Zero Trust", "OWASP", "Figma", "Vercel"],
  ];

  return (
    <main className={`nc-hero ${visible ? "nc-hero--visible" : ""}`}>

      {/* Subtle Noise Texture */}
      <div className="nc-noise" aria-hidden="true" />

      {/* Top thin accent line */}
      <div className="nc-top-bar" aria-hidden="true" />

      {/* Subtle, hidden Ethiopian woven background */}
      <EthiopianTiletBackground />

      {/* ── 1. HERO SECTION ─────────────────────────────── */}
      <section className="nc-body">

        {/* Eyebrow & Ethiopian Tilet Heritage Badge */}
        <div className="nc-eyebrow-container">
          <p className="nc-eyebrow">
            <span className="nc-dot" aria-hidden="true" />
            Full-Stack Development · Mobile Apps · AI Solutions · Cybersecurity
          </p>
          <div className="nc-tilet-heritage">
            <span className="nc-geez-pill">ጥለት</span>
            <span className="nc-tilet-sep" aria-hidden="true">◆</span>
            <span className="nc-tilet-subtext">The Art of Woven Code</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="nc-headline">
          <span className="nc-line nc-line--1">We build</span>
          <span className="nc-line nc-line--2">
            software that <em>scales.</em>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="nc-sub">
          High-performance web applications, native mobile apps, AI pipelines,
          <br className="nc-br" />
          and enterprise cybersecurity for companies that move fast and build to last.
        </p>

        {/* Actions */}
        <div className="nc-actions">
          <button
            className="nc-btn nc-btn--primary"
            onClick={() => router.push("/services/our-services")}
          >
            View services
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className="nc-btn nc-btn--ghost"
            onClick={() => router.push("/contact")}
          >
            Start a project
          </button>
          <button
            className="nc-btn nc-btn--subtle"
            onClick={() => {
              const el = document.getElementById("featured-work");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Featured work ↓
          </button>
        </div>

        {/* Stats */}
        <div className="nc-stats">
          {stats.map((s, i) => (
            <div className="nc-stat" key={i}>
              <span className="nc-stat-value">{s.value}</span>
              <span className="nc-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

      </section>

      {/* ── 2. FEATURED WORK SHOWCASE ───────────────────── */}
      <section id="featured-work" className="nc-showcase-section">
        <div className="nc-container">
          <div className="nc-section-head">
            <p className="nc-eyebrow">
              <span className="nc-dot" aria-hidden="true" />
              Selected Production Work
            </p>
            <h2 className="nc-section-title">
              Proven systems in <em>production.</em>
            </h2>
            <p className="nc-section-desc">
              Real platforms developed by Tilet Technologies serving thousands of active users with zero downtime.
            </p>
          </div>

          {/* Project switcher tabs */}
          <div className="nc-project-tabs">
            {featuredProjects.map((p, idx) => (
              <button
                key={p.id}
                className={`nc-project-tab ${activeProject === idx ? "active" : ""}`}
                onClick={() => setActiveProject(idx)}
              >
                <span className="nc-tab-index">0{idx + 1}</span>
                <span className="nc-tab-label">{p.title.split("–")[0].split(" ")[0]} {p.title.split("–")[0].split(" ")[1] || ""}</span>
              </button>
            ))}
          </div>

          {/* Active project display */}
          <div className="nc-showcase-card">
            <div className="nc-showcase-visual">
              <Image
                src={featuredProjects[activeProject].image}
                alt={featuredProjects[activeProject].title}
                className="nc-showcase-img"
                priority
              />
            </div>
            <div className="nc-showcase-info">
              <p className="nc-showcase-client">{featuredProjects[activeProject].client}</p>
              <h3 className="nc-showcase-title">{featuredProjects[activeProject].title}</h3>
              <p className="nc-showcase-desc">{featuredProjects[activeProject].desc}</p>
              
              <div className="nc-showcase-metric">
                <i className="fa-solid fa-chart-line" />
                <span>{featuredProjects[activeProject].metrics}</span>
              </div>

              <div className="nc-showcase-tags">
                {featuredProjects[activeProject].tags.map((t, i) => (
                  <span className="nc-tag" key={i}>{t}</span>
                ))}
              </div>

              <div className="nc-showcase-link-row">
                <Link href="/services/our-services" className="nc-inline-link">
                  View case study breakdown
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CAPABILITIES GRID ────────────────────────── */}
      <section className="nc-capabilities-section">
        <div className="nc-container">
          <div className="nc-section-head">
            <p className="nc-eyebrow">
              <span className="nc-dot" aria-hidden="true" />
              What We Do
            </p>
            <h2 className="nc-section-title">
              Full-spectrum <em>capabilities.</em>
            </h2>
            <p className="nc-section-desc">
              Four unified disciplines designed to protect, accelerate, and scale modern digital products.
            </p>
          </div>

          <div className="nc-capabilities-grid">
            {capabilities.map((c) => (
              <div className="nc-cap-card" key={c.num}>
                <div className="nc-cap-top">
                  <span className="nc-cap-num">{c.num}</span>
                  <div className="nc-cap-icon">
                    <i className={c.icon} />
                  </div>
                </div>
                <h3 className="nc-cap-title">{c.title}</h3>
                <p className="nc-cap-desc">{c.desc}</p>
                <div className="nc-cap-tags">
                  {c.tags.map((tag, ti) => (
                    <span className="nc-tag" key={ti}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ENGINEERING PRINCIPLES ───────────────────── */}
      <section className="nc-principles-section">
        <div className="nc-container">
          <div className="nc-section-head">
            <p className="nc-eyebrow">
              <span className="nc-dot" aria-hidden="true" />
              Engineering Standard
            </p>
            <h2 className="nc-section-title">
              How we <em>engineer</em> software.
            </h2>
            <p className="nc-section-desc">
              We hold every line of code to the highest enterprise benchmarks.
            </p>
          </div>

          <div className="nc-principles-grid">
            {principles.map((pr, idx) => (
              <div className="nc-principle-card" key={idx}>
                <div className="nc-principle-icon">
                  <i className={pr.icon} />
                </div>
                <h3 className="nc-principle-title">{pr.title}</h3>
                <p className="nc-principle-desc">{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CALL TO ACTION ───────────────────────────── */}
      <section className="nc-cta-section">
        <div className="nc-container">
          <div className="nc-cta-box">
            <div className="nc-cta-content">
              <p className="nc-eyebrow">
                <span className="nc-dot" aria-hidden="true" />
                Let's Build Together
              </p>
              <h2 className="nc-cta-title">
                Have a project in mind? Let's <em>talk.</em>
              </h2>
              <p className="nc-cta-desc">
                From new product development to enterprise cloud and cybersecurity audits,
                our engineering team is ready to deliver.
              </p>
              <div className="nc-cta-actions">
                <button
                  className="nc-btn nc-btn--primary"
                  onClick={() => router.push("/contact")}
                >
                  Start a project
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  className="nc-btn nc-btn--ghost"
                  onClick={() => router.push("/services")}
                >
                  Explore all services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TECH MARQUEE ─────────────────────────────── */}
      <footer className="nc-footer">
        <span className="nc-stack-label">Stack</span>
        <div className="nc-marquee-wrap">
          {techRows.map((row, ri) => (
            <div
              key={ri}
              className={`nc-marquee-row ${ri % 2 === 0 ? "nc-left" : "nc-right"}`}
            >
              <div className="nc-track">
                {[...row, ...row, ...row].map((t, i) => (
                  <span className="nc-chip" key={i}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>

    </main>
  );
}
