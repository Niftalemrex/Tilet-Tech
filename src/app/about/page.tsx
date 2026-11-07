"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./AboutPage.css";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  icon: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const AboutPage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);

    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>(".value-card, .team-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mouse-x", `${x}%`);
        card.style.setProperty("--mouse-y", `${y}%`);
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const milestones: Milestone[] = [
    { year: "2020", title: "Company Founded",       description: "Tilet Technologies was established with a vision to transform Ethiopian businesses through resilient technology and digital innovation." },
    { year: "2021", title: "First 20+ Systems",     description: "Successfully delivered mission-critical web and mobile solutions for local startups and enterprises." },
    { year: "2022", title: "AI & Cloud Expansion",  description: "Launched production AI models, computer vision systems, and cloud consulting services for enterprise clients." },
    { year: "2024", title: "Cyber Defense & SOC",   description: "Established our premier Cybersecurity division, providing zero-trust architecture, threat defense, and ISO 27001 readiness." },
  ];

  const values = [
    { title: "Innovation",     icon: "fa-solid fa-lightbulb", description: "Pushing boundaries with cutting-edge software architecture, AI, and creative engineering." },
    { title: "Zero-Trust Security", icon: "fa-solid fa-shield-halved", description: "Securing every layer of infrastructure with rigorous audits, defense-in-depth, and strict encryption." },
    { title: "Integrity",      icon: "fa-solid fa-handshake", description: "Building lasting trust through transparency, ethical hacking, and uncompromising standards." },
    { title: "Client Success", icon: "fa-solid fa-trophy",    description: "Your business resilience is our success — we measure our achievements by your enterprise growth." },
  ];

  const teamMembers: TeamMember[] = [
    { name: "Niftalem Awel",    role: "Founder & Chief Architect", bio: "Full-stack architect & security strategist with 10+ years experience in resilient high-scale systems.", icon: "fa-solid fa-user-shield" },
    { name: "Hibist Demu",      role: "Lead AI Engineer",          bio: "AI specialist focused on neural networks, machine learning, and computer vision systems.", icon: "fa-solid fa-brain" },
    { name: "Merdekiyos Tasew", role: "SecOps & Cloud Lead",       bio: "Expert in zero-trust cloud infrastructure, penetration testing, and Kubernetes orchestration.", icon: "fa-solid fa-terminal" },
    { name: "Abel Tesfu",       role: "Product & UX Director",     bio: "Passionate about crafting intuitive, high-performance, and accessible user experiences.", icon: "fa-solid fa-compass-drafting" },
  ];

  return (
    <section
      id="about"
      className={`about-page ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
      aria-label="About Us"
    >
      {/* Top accent bar */}
      <div className="about-top-bar" aria-hidden="true" />

      <div className="about-container">

        {/* ── Hero ─────────────────────────────────────── */}
        <div className="about-hero">
          <p className="about-eyebrow">
            <span className="about-dot" aria-hidden="true" />
            Who We Are
          </p>

          <h1 className="about-headline">
            Building <em>digital excellence</em>
            <br />in Ethiopia.
          </h1>

          <p className="about-sub">
            Tilet Technologies is a premier software development and cybersecurity company dedicated to
            transforming Ethiopian businesses through innovative full-stack web platforms, mobile apps,
            AI solutions, cloud infrastructure, and advanced cybersecurity defense.
            We combine global engineering standards with deep local craftsmanship.
          </p>
        </div>

        {/* ── Stats ────────────────────────────────────── */}
        <div className="about-stats">
          {[
            { value: "50+",  label: "Projects Completed"  },
            { value: "10+",  label: "Industries Served"   },
            { value: "24/7", label: "Support Available"   },
            { value: "99%",  label: "Client Satisfaction" },
          ].map((s, i) => (
            <div className="about-stat" key={i}>
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Meaning of Tilet ────────────────────────── */}
        <div className="about-heritage-card">
          <div className="about-heritage-inner">
            <div className="about-geez-stamp">ጥለት</div>
            <div className="about-heritage-text">
              <h3 className="about-heritage-title">The Philosophy of Tilet (ጥለት)</h3>
              <p className="about-heritage-desc">
                In Ethiopian tradition, <strong>ጥለት (Tilet)</strong> represents the intricate, hand-woven geometric embroidery bordering traditional garments. It stands for patience, interlocking harmony, and structural perfection. At Tilet Technologies, we carry this heritage into modern software engineering—weaving together full-stack applications, artificial intelligence, and impenetrable cybersecurity defense into enduring digital architectures.
              </p>
            </div>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────── */}
        <div className="about-divider" aria-hidden="true" />

        {/* ── Mission ──────────────────────────────────── */}
        <div className="about-mission">
          <div className="about-mission-text">
            <p className="about-section-eyebrow">Our Mission</p>
            <h2 className="about-section-title">
              Technology that <em>transforms.</em>
            </h2>
            <p className="about-body">
              To empower Ethiopian businesses with world-class technology solutions that drive
              growth, efficiency, and innovation. We believe in the power of technology to
              transform industries and improve lives.
            </p>
            <blockquote className="about-quote">
              <span className="about-quote-mark">"</span>
              Technology is best when it brings people together and solves real problems.
            </blockquote>
          </div>

          <div className="about-mission-visual" aria-hidden="true">
            <div className="about-mission-box">
              <i className="fa-solid fa-rocket about-mission-icon" />
              <span>Innovation in Action</span>
            </div>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────── */}
        <div className="about-divider" aria-hidden="true" />

        {/* ── Journey ──────────────────────────────────── */}
        <div className="about-journey">
          <p className="about-section-eyebrow centered">Our Journey</p>
          <h2 className="about-section-title centered">
            Built <em>milestone</em> by milestone.
          </h2>

          <div className="about-timeline">
            {milestones.map((m, i) => (
              <div className="about-timeline-item" key={i}>
                <div className="about-timeline-year">{m.year}</div>
                <div className="about-timeline-line" aria-hidden="true">
                  <span className="about-timeline-node" />
                </div>
                <div className="about-timeline-body">
                  <h3 className="about-timeline-title">{m.title}</h3>
                  <p className="about-timeline-desc">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────── */}
        <div className="about-divider" aria-hidden="true" />

        {/* ── Values ───────────────────────────────────── */}
        <div className="about-values">
          <p className="about-section-eyebrow centered">Core Values</p>
          <h2 className="about-section-title centered">
            What we <em>stand for.</em>
          </h2>

          <div className="about-values-grid">
            {values.map((v, i) => (
              <div
                className="value-card"
                key={i}
                style={{ "--card-index": i } as React.CSSProperties}
              >
                <div className="value-card-icon">
                  <i className={v.icon} />
                </div>
                <h3 className="value-card-title">{v.title}</h3>
                <p className="value-card-desc">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────── */}
        <div className="about-divider" aria-hidden="true" />

        {/* ── Team ─────────────────────────────────────── */}
        <div className="about-team">
          <p className="about-section-eyebrow centered">The Team</p>
          <h2 className="about-section-title centered">
            Meet the <em>people</em> behind the work.
          </h2>

          <div className="about-team-grid">
            {teamMembers.map((member, i) => (
              <div className="team-card" key={i}>
                <div className="team-card-icon">
                  <i className={member.icon} />
                </div>
                <h3 className="team-card-name">{member.name}</h3>
                <p className="team-card-role">{member.role}</p>
                <p className="team-card-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────── */}
        <div className="about-cta">
          <p className="about-section-eyebrow centered">Get In Touch</p>
          <h2 className="about-cta-title">
            Ready to start your <em>project?</em>
          </h2>
          <p className="about-cta-sub">
            Let's discuss how we can help bring your ideas to life.
          </p>
          <button className="about-cta-btn" onClick={() => router.push("/contact")}>
            Contact us today
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutPage;