"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./HomePage.css";

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const techRows = [
    ["React", "Next.js", "TypeScript", "Node.js", "Python", "Go", "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL", "TensorFlow", "PyTorch", "Redis"],
    ["Vue.js", "Angular", "NestJS", "Django", "FastAPI", "Spring Boot", ".NET", "Azure", "GCP", "Terraform", "Elasticsearch", "Kafka", "Hugging Face", "Figma", "Vercel"],
  ];

  const stats = [
    { value: "200+", label: "Projects" },
    { value: "98%", label: "Satisfaction" },
    { value: "40+", label: "Technologies" },
    { value: "5yrs", label: "Experience" },
  ];

  return (
    <main className={`nc-hero ${visible ? "nc-hero--visible" : ""}`}>

      {/* Noise texture overlay */}
      <div className="nc-noise" aria-hidden="true" />

      {/* Thin top border accent */}
      <div className="nc-top-bar" aria-hidden="true" />

    

      {/* Hero body */}
      <section className="nc-body">

        {/* Eyebrow */}
        <p className="nc-eyebrow">
          <span className="nc-dot" aria-hidden="true" />
          Enterprise Software · Cloud · AI
        </p>

        {/* Headline */}
        <h1 className="nc-headline">
          <span className="nc-line nc-line--1">We build</span>
          <span className="nc-line nc-line--2">
            software that <em>scales.</em>
          </span>
        </h1>

        {/* Sub */}
        <p className="nc-sub">
          High-performance systems, cloud infrastructure, and AI pipelines
          <br className="nc-br" />
          for companies that move fast and build to last.
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

      {/* Tech marquee */}
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
                  <span className="nc-chip" key={i}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>

    </main>
  );
}
