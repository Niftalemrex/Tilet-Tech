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
      name: "NiCol Technologies",
      url: "https://www.nicol.com/services",
    },
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "AI Solutions",
      "Cloud Computing",
      "UI/UX Design",
      "IT Consulting",
    ],
    areaServed: "ET",
    description:
      "NiCol Technologies provides web, mobile, AI, cloud, design, and consulting services to Ethiopian businesses and startups.",
  };

  const serviceList: Service[] = [
    {
      title: "Web Development",
      description:
        "Responsive, modern websites using React, Next.js, and Tailwind CSS. Full-stack solutions with optimal performance and SEO.",
      icon: "fa-solid fa-laptop-code",
      stats: { projects: "50+", satisfaction: "98%" },
    },
    {
      title: "Mobile App Development",
      description:
        "Native Android & iOS apps using Kotlin, Java, Flutter, and Dart. Cross-platform solutions with seamless UX.",
      icon: "fa-solid fa-mobile-screen",
      stats: { projects: "30+", satisfaction: "95%" },
    },
    {
      title: "AI Solutions",
      description:
        "Intelligent solutions using Python, OpenCV, and machine learning. Custom AI models for your business needs.",
      icon: "fa-solid fa-robot",
      stats: { projects: "20+", satisfaction: "97%" },
    },
    {
      title: "Cloud Computing",
      description:
        "Scalable cloud infrastructure on AWS, Azure, and Google Cloud. DevOps practices for continuous delivery.",
      icon: "fa-solid fa-cloud",
      stats: { projects: "25+", satisfaction: "96%" },
    },
    {
      title: "UI/UX Design",
      description:
        "User-centered design with modern aesthetics. Wireframing, prototyping, and user testing for optimal experiences.",
      icon: "fa-solid fa-paint-brush",
      stats: { projects: "40+", satisfaction: "99%" },
    },
    {
      title: "IT Consulting",
      description:
        "Strategic technology advice, architecture planning, and digital transformation for businesses of all sizes.",
      icon: "fa-solid fa-headset",
      stats: { projects: "60+", satisfaction: "100%" },
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