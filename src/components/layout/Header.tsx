"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import TiletPattern from "../ui/TiletPattern";
import "./Header.css";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAdminKeyVisible, setIsAdminKeyVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const autoHideTimer = useRef<NodeJS.Timeout | null>(null);

  const LONG_PRESS_DELAY = 2000;
  const SLIDE_OUT_DURATION = 2000;
  const VISIBLE_DURATION = 1000;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clearTimers = () => {
    if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
    if (autoHideTimer.current)  { clearTimeout(autoHideTimer.current);  autoHideTimer.current = null;  }
  };

  const showKeyAndScheduleHide = () => {
    setIsAdminKeyVisible(true);
    if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
    autoHideTimer.current = setTimeout(() => {
      setIsAdminKeyVisible(false);
      autoHideTimer.current = null;
    }, SLIDE_OUT_DURATION + VISIBLE_DURATION);
  };

  const startLongPress = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => {
      showKeyAndScheduleHide();
      longPressTimer.current = null;
    }, LONG_PRESS_DELAY);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
  };

  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  const handleKeyClick = () => clearTimers();
  const handleMobileLinkClick = () => setIsMobileNavOpen(false);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMobileNavOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => { return () => clearTimers(); }, []);

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">

          {/* Logo + Key Icon */}
          <div
            className="header-logo-wrapper"
            onMouseDown={startLongPress}
            onMouseUp={cancelLongPress}
            onMouseLeave={cancelLongPress}
            onTouchStart={startLongPress}
            onTouchEnd={cancelLongPress}
            onTouchCancel={cancelLongPress}
            onContextMenu={handleContextMenu}
          >
            <Link href="/" className="header-logo">
              <Image
                src="/images/NiColl.png"
                alt="Tilet Technologies"
                width={130}
                height={32}
                priority
                className="logo-image"
              />
            </Link>

            {/* 🔐 Hidden key icon */}
            <div className={`key-icon ${isAdminKeyVisible ? "visible" : ""}`}>
              <Link href="/admin/auth" className="key-link" title="Admin Access" onClick={handleKeyClick}>
                <span className="key-emoji">🔑</span>
              </Link>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="header-nav-desktop">
            <ul>
              <li><Link href="/"        className="nav-link">Home</Link></li>
              <li><Link href="/about"   className="nav-link">About</Link></li>
              <li><Link href="/services" className="nav-link">Services</Link></li>
              <li><Link href="/reviews" className="nav-link">Reviews</Link></li>
              <li><Link href="/contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>

          {/* Burger */}
          <button
            className={`header-burger ${isMobileNavOpen ? "open" : ""}`}
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileNavOpen}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`mobile-nav ${isMobileNavOpen ? "open" : ""}`}>
          <nav>
            <ul>
              <li><Link href="/"         onClick={handleMobileLinkClick} className="mobile-nav-link">Home</Link></li>
              <li><Link href="/about"    onClick={handleMobileLinkClick} className="mobile-nav-link">About</Link></li>
              <li><Link href="/services" onClick={handleMobileLinkClick} className="mobile-nav-link">Services</Link></li>
              <li><Link href="/reviews"  onClick={handleMobileLinkClick} className="mobile-nav-link">Reviews</Link></li>
              <li><Link href="/contact"  onClick={handleMobileLinkClick} className="mobile-nav-link">Contact</Link></li>
            </ul>
          </nav>
        </div>

        {/* Ethiopian Tilet horizontal ribbon below header */}
        <div className="header-tilet-strip" aria-hidden="true">
          <TiletPattern height={7} opacity={0.65} />
        </div>
      </header>
    </>
  );
}