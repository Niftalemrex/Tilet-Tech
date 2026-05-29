'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RecentProjects.css';

// ── Images ────────────────────────────────────────────
import limsFigma1      from '../../../images/Figma (1).png';
import limsFigma2      from '../../../images/Figma (2).png';
import limsFigma3      from '../../../images/Figma (3).png';
import limsFigma4      from '../../../images/Figma (4).png';
import limsFigma5      from '../../../images/Figma (5).png';
import limsFigma6      from '../../../images/Figma (6).png';
import limsFigma7      from '../../../images/Figma (7).png';
import limsDashboard   from '../../../images/Lims D.png';
import wemsDashboard   from '../../../images/Wedding D.png';
import limsAmharic     from '../../../images/lims p Amharic.png';
import limsArabic1     from '../../../images/Arabic (1).png';
import limsArabic2     from '../../../images/Arabic (2).png';
import wemsDashboardAlt from '../../../images/Wems p.png';
import limsExtra1      from '../../../images/lims p (1).png';
import limsExtra2      from '../../../images/lims p (2).png';
import wemsExtra       from '../../../images/lims p (3).png';
import wemsVendor      from '../../../images/lims p (5).png';

// ── Data ──────────────────────────────────────────────
const figmaProjects = [
  { id: 1,  title: 'LIMS – Reports & Analytics',    category: 'LIMS', tags: ['Figma', 'UI/UX', 'Data Analytics'],            image: limsFigma1, description: 'The analytics module provides comprehensive reports for management and quality control. Users can generate custom reports with multiple filters, export data to PDF or Excel, and schedule automatic report delivery. The design includes a dashboard with KPIs such as average turnaround time, test volume per day, and technician workload.' },
  { id: 2,  title: 'LIMS – Performance Matrix',     category: 'LIMS', tags: ['Figma', 'UI/UX', 'Performance'],               image: limsFigma2, description: 'A dedicated performance matrix dashboard that tracks key lab metrics: sample processing times, technician efficiency, instrument uptime, and turnaround delays. Managers can drill down into individual performance data and export reports for review.' },
  { id: 3,  title: 'LIMS – Custom Report Builder',  category: 'LIMS', tags: ['Figma', 'UI/UX', 'Reporting'],                 image: limsFigma3, description: 'Empower users to create their own reports with a drag-and-drop builder. Choose from a wide range of data fields and apply advanced filters. Reports can be saved as templates, shared with colleagues, and scheduled for automated delivery.' },
  { id: 4,  title: 'LIMS – Inventory Tracking',     category: 'LIMS', tags: ['Figma', 'UI/UX', 'Inventory'],                 image: limsFigma4, description: 'Manage laboratory inventory with real-time stock levels, low-stock alerts, and reorder suggestions. The system tracks batch numbers, expiry dates, and usage history. Barcode scanning simplifies item check-in/out.' },
  { id: 5,  title: 'LIMS – Equipment Management',   category: 'LIMS', tags: ['Figma', 'UI/UX', 'Equipment'],                 image: limsFigma5, description: 'Track all laboratory equipment with maintenance schedules, calibration records, and service history. The module displays real-time equipment status and sends reminders for upcoming calibrations.' },
  { id: 6,  title: 'LIMS – Consumables Inventory',  category: 'LIMS', tags: ['Figma', 'UI/UX', 'Consumables'],               image: limsFigma6, description: 'Focused on managing consumables such as gloves, tubes, and swabs. The interface provides stock levels per location, low-stock thresholds, and automatic reorder suggestions with one-click procurement.' },
  { id: 7,  title: 'LIMS – Sample Management',      category: 'LIMS', tags: ['Figma', 'UI/UX', 'Sample Tracking'],           image: limsFigma7, description: 'End-to-end sample tracking from registration to disposal using a Kanban board. Each card displays sample ID, patient name, test type, and priority. The system logs every action for full audit traceability.' },
];

const dashboardProjects = [
  {
    id: 8,
    title: 'LIMS Dashboard (Live)',
    category: 'LIMS',
    tags: ['Dashboard', 'Production', 'React'],
    image: limsDashboard,
    description: 'The actual dashboard built with React, Node.js, and PostgreSQL. Shows real-time metrics: total samples processed today, pending tests, average turnaround time, and a breakdown by department. Charts update every minute and the layout is fully customisable per user.',
  },
  {
    id: 9,
    title: 'WEMS Dashboard',
    category: 'WEMS',
    tags: ['Dashboard', 'Production', 'Event Management'],
    image: wemsDashboard,
    description: "The Wedding Event Management System dashboard gives event planners a bird's-eye view of all weddings. Displays upcoming events, vendor lists, budget overview, and task progress with a drag-and-drop calendar and notification centre.",
  },
  {
    id: 13,
    title: 'WEMS Dashboard \u2013 Alternate View',
    category: 'WEMS',
    tags: ['Dashboard', 'Vendor Management'],
    image: wemsDashboardAlt,
    description: 'An alternative view focused on vendor management and budget tracking. Presents vendor profiles, contracts, and payment schedules in a side panel alongside a Gantt chart for vendor tasks and a performance rating system.',
  },
];

const localizationProjects = [
  { id: 10, title: 'Amharic Language Support',       category: 'LIMS', tags: ['Localization', 'Amharic'],                    image: limsAmharic, description: 'Full LIMS localisation into Amharic, including all UI strings, Amharic data entry, and culturally adapted reporting. Done in collaboration with Ethiopian lab technicians to ensure accuracy and improve adoption.' },
  { id: 11, title: 'Arabic Support – UI',            category: 'LIMS', tags: ['Localization', 'Arabic', 'RTL'],              image: limsArabic1, description: 'Full right-to-left layout for Arabic-speaking users. All menus, buttons, and forms mirror correctly. Translation covers all modules including navigation, error messages, and tooltips with correct Arabic pluralisation.' },
  { id: 12, title: 'Arabic Support – Reports',       category: 'LIMS', tags: ['Localization', 'Arabic', 'Reporting'],        image: limsArabic2, description: 'Reports generated in Arabic with RTL orientation preserved in PDF and Excel exports. A language toggle lets users switch between Arabic and English on the fly without restarting the system.' },
];

const additionalProjects = [
  { id: 14, title: 'LIMS – Financial Management',    category: 'LIMS', tags: ['Financial', 'Billing', 'Invoicing'],          image: limsExtra1, description: 'Complete financial management handling invoicing, payments, and revenue tracking. Automatically generates bills based on tests ordered, applies insurance or discounts, and integrates with local payment gateways including Chapa and CBE Birr.' },
  { id: 15, title: 'LIMS – Inventory Management',    category: 'LIMS', tags: ['Inventory', 'Stock', 'Supplies'],             image: limsExtra2, description: 'Comprehensive inventory tracking for reagents, consumables, and equipment with real-time stock levels, low-stock alerts, expiry date tracking, and purchase order management. Barcode scanning simplifies item check-in/out.' },
  { id: 16, title: 'WEMS – Inventory Dashboard',     category: 'WEMS', tags: ['Inventory', 'Wedding', 'Supplies'],          image: wemsExtra,   description: 'Manage all wedding-related inventory: decorations, tableware, linens, lighting, and more. Planners can reserve items for specific weddings, track returns, and reorder supplies with a calendar view across multiple events.' },
  { id: 17, title: 'WEMS – Tech Equipment',          category: 'WEMS', tags: ['Technology', 'Equipment', 'Event Tech'],     image: wemsVendor,  description: 'Specialised dashboard for managing event technology: sound systems, lighting, projectors, and staging. Displays equipment availability, maintenance schedules, and technical requirements per event with vendor schedule integration.' },
];

// ── Reusable showcase rows ─────────────────────────────
function ShowcaseRows({ projects }: { projects: typeof dashboardProjects }) {
  return (
    <div className="rp-rows">
      {projects.map((project, idx) => (
        <div key={project.id} className={`rp-row ${idx % 2 === 0 ? 'rp-row--left' : 'rp-row--right'}`}>
          <div className="rp-row-image">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="rp-img"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          <div className="rp-row-content">
            <p className="rp-row-category">{project.category}</p>
            <h3 className="rp-row-title">{project.title}</h3>
            <p className="rp-row-desc">{project.description}</p>
            <div className="rp-tags">
              {project.tags.map((tag, i) => (
                <span className="rp-tag" key={i}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Section header ─────────────────────────────────────
function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="rp-section-header">
      <p className="rp-eyebrow">
        <span className="rp-dot" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="rp-section-title">{title}</h2>
      <p className="rp-section-sub">{sub}</p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────
export default function RecentProjects() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="rp-main">

      {/* Top accent bar */}
      <div className="rp-top-bar" aria-hidden="true" />

      {/* ── Section 1: Dashboards ── */}
      <section className="rp-section">
        <div className="rp-container">
          <SectionHeader
            eyebrow="Production"
            title="Real-world dashboards."
            sub="Live, production-ready dashboards built with modern frameworks and deployed to the cloud."
          />
          <ShowcaseRows projects={dashboardProjects} />
        </div>
      </section>

      <div className="rp-divider" aria-hidden="true" />

      {/* ── Section 2: Figma slider ── */}
      <section className="rp-section rp-section--dark">
        <div className="rp-slider-header rp-container">
          <SectionHeader
            eyebrow="Design"
            title="UI/UX Figma designs."
            sub="High-fidelity interface designs crafted in Figma before production build."
          />
        </div>

        <div className="rp-swiper-wrap">
          <Swiper
            modules={[Navigation, Pagination, Keyboard, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            keyboard={{ enabled: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="rp-swiper"
          >
            {figmaProjects.map((project, idx) => (
              <SwiperSlide key={project.id}>
                <div className="rp-slide">
                  {/* Image 70% */}
                  <div className="rp-slide-img">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="rp-img"
                      priority={idx === 0}
                      quality={100}
                      unoptimized
                    />
                  </div>
                  {/* Text 30% */}
                  <div className="rp-slide-text">
                    <div className="rp-slide-inner">
                      <p className="rp-slide-category">{project.category}</p>
                      <h2 className="rp-slide-title">{project.title}</h2>
                      <p className="rp-slide-desc">{project.description}</p>
                      <div className="rp-tags">
                        {project.tags.map((tag, i) => (
                          <span className="rp-tag" key={i}>{tag}</span>
                        ))}
                      </div>
                      <p className="rp-slide-counter">
                        {String(activeIndex + 1).padStart(2, '0')} / {String(figmaProjects.length).padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <div className="rp-divider" aria-hidden="true" />

      {/* ── Section 3: Localization ── */}
      <section className="rp-section">
        <div className="rp-container">
          <SectionHeader
            eyebrow="Localisation"
            title="Multilingual support."
            sub="Localised interfaces for Amharic and Arabic, including full RTL support and culturally adapted content."
          />
          <ShowcaseRows projects={localizationProjects} />
        </div>
      </section>

      <div className="rp-divider" aria-hidden="true" />

      {/* ── Section 4: Enhanced Functionality ── */}
      <section className="rp-section">
        <div className="rp-container">
          <SectionHeader
            eyebrow="Modules"
            title="Enhanced functionality."
            sub="Specialised modules that extend the core systems with financial, inventory, and tech management."
          />
          <ShowcaseRows projects={additionalProjects} />
        </div>
      </section>

    </main>
  );
}