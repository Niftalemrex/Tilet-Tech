"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./ServicesPage.css";
import StructuredData from "../../components/seo/StructuredData";

interface ServiceStat {
  projects: string;
  satisfaction: string;
}

interface Service {
  title: string;
  description: string;
  icon: string;
  stats: ServiceStat;
}

const ServicesPage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const basePath = "/services/our-services";

  const servicesData = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "Tilet Technologies",
      url: "https://tilet-technology.vercel.app/services",
    },
    serviceType: [
      "Cybersecurity & Zero Trust",
      "Web Development",
      "Mobile App Development",
      "AI & Machine Learning",
      "Cloud Infrastructure & DevOps",
      "UI/UX Design & Architecture",
      "IT Security Consulting",
    ],
    areaServed: "ET",
    description:
      "Tilet Technologies provides cybersecurity, web, mobile, AI, cloud, and security consulting services to Ethiopian businesses and international enterprises.",
  };

  const serviceList: Service[] = [
    {
      title: "Web Development",
      description:
        "Full-stack web applications and platforms using React, Next.js, Node.js, and TypeScript. Optimized for ultra-fast performance, SEO, and enterprise scale.",
      icon: "fa-solid fa-laptop-code",
      stats: { projects: "70+", satisfaction: "99%" },
    },
    {
      title: "Mobile App Development",
      description:
        "High-performance native Android & iOS and cross-platform apps using Flutter, React Native, Kotlin, and Swift. Seamless UX with real-time offline-first sync.",
      icon: "fa-solid fa-mobile-screen",
      stats: { projects: "45+", satisfaction: "98%" },
    },
    {
      title: "AI Solutions & Machine Learning",
      description:
        "Intelligent AI pipelines, computer vision, OpenCV, predictive neural models, and enterprise LLM integrations customized for your business workflows.",
      icon: "fa-solid fa-robot",
      stats: { projects: "30+", satisfaction: "98%" },
    },
    {
      title: "Cybersecurity & Zero Trust",
      description:
        "Proactive threat defense, penetration testing, SIEM SOC monitoring, DevSecOps pipelines, vulnerability audits, and ISO 27001 / SOC 2 compliance engineering.",
      icon: "fa-solid fa-shield-halved",
      stats: { projects: "40+", satisfaction: "100%" },
    },
    {
      title: "Cloud Computing & DevOps",
      description:
        "Auto-scaling cloud infrastructure on AWS, Azure, and Google Cloud with Kubernetes, Docker, Terraform, and automated CI/CD continuous deployment.",
      icon: "fa-solid fa-cloud",
      stats: { projects: "50+", satisfaction: "99%" },
    },
    {
      title: "UI/UX & Product Design",
      description:
        "User-centered digital design, interactive Figma prototypes, wireframing, design systems, and rigorous usability testing for optimal conversion.",
      icon: "fa-solid fa-paint-brush",
      stats: { projects: "55+", satisfaction: "99%" },
    },
    {
      title: "IT Consulting & Architecture",
      description:
        "Strategic technology advice, enterprise software architecture planning, digital transformation roadmaps, and 24/7 technical advisory.",
      icon: "fa-solid fa-headset",
      stats: { projects: "75+", satisfaction: "100%" },
    },
  ];

  useEffect(() => {
    setIsVisible(true);

    const section = sectionRef.current;
    if (!section) return;

    // Mouse radial glow on cards
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>(".sp-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      });
    };

    section.addEventListener("mousemove", handleMouseMove);

    // Scroll-in observer
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sp-card").forEach((c) => observer.observe(c));

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const handleCardClick = (): void => {
    router.push(basePath);
  };

  return (
    <section
      id="services"
      className={`sp-page ${isVisible ? "sp-page--visible" : ""}`}
      ref={sectionRef}
      aria-label="Our Services"
    >
      <StructuredData data={servicesData} />

      {/* Top accent bar */}
      <div className="sp-top-bar" aria-hidden="true" />

      <div className="sp-container">

        {/* ── Header ── */}
        <div className="sp-header">
          <p className="sp-eyebrow">
            <span className="sp-dot" aria-hidden="true" />
            What we do
          </p>
          <h1 className="sp-headline">
            Professional <em>solutions</em>
            <br />built to last.
          </h1>
          <p className="sp-sub">
            From concept to deployment, we deliver high-quality solutions tailored to your needs.
            Experience excellence with our comprehensive service offerings.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="sp-grid">
          {serviceList.map((service, idx) => (
            <article
              key={idx}
              className="sp-card"
              role="link"
              tabIndex={0}
              onClick={handleCardClick}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick();
                }
              }}
              aria-labelledby={`sp-title-${idx}`}
              style={{ "--card-index": idx } as React.CSSProperties}
            >
              {/* Icon */}
              <div className="sp-card-icon" aria-hidden="true">
                <i className={service.icon} />
              </div>

              {/* Title */}
              <h3 id={`sp-title-${idx}`} className="sp-card-title">
                {service.title}
              </h3>

              {/* Description */}
              <p className="sp-card-desc">{service.description}</p>

              {/* Stats */}
              <div className="sp-card-stats">
                <div className="sp-stat">
                  <span className="sp-stat-value">{service.stats.projects}</span>
                  <span className="sp-stat-label">Projects</span>
                </div>
                <div className="sp-stat-divider" aria-hidden="true" />
                <div className="sp-stat">
                  <span className="sp-stat-value">{service.stats.satisfaction}</span>
                  <span className="sp-stat-label">Satisfaction</span>
                </div>
              </div>

              {/* CTA row */}
              <div className="sp-card-cta">
                <span className="sp-card-cta-label">Learn more</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Hover glow */}
              <div className="sp-card-glow" aria-hidden="true" />
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesPage;