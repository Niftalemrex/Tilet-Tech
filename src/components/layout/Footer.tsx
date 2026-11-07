import Link from "next/link";
import Image from "next/image";
import TiletPattern from "../ui/TiletPattern";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { href: "/",        label: "Home"     },
    { href: "/about",   label: "About"    },
    { href: "/services",label: "Services" },
    { href: "/reviews", label: "Reviews"  },
    { href: "/contact", label: "Contact"  },
  ];

  return (
    <footer className="footer">

      {/* Top authentic Ethiopian Tilet embroidery ribbon */}
      <div className="footer-tilet-bar" aria-hidden="true">
        <TiletPattern height={11} opacity={0.65} />
      </div>

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <Image
              src="/images/NiColl.png"
              alt="Tilet Technologies"
              width={130}
              height={36}
              className="footer-logo-img"
            />
          </Link>
          <p className="footer-tagline">
            We build Web, Mobile, AI, Cloud, and Cybersecurity solutions
            <br />for companies that move fast and build to last.
          </p>
          {/* Social / badge row — extend as needed */}
          <div className="footer-badge">
            <span className="footer-dot" aria-hidden="true" />
            Addis Ababa, Ethiopia · Global Delivery
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3 className="footer-heading">Contact</h3>
          <ul className="footer-contact">
            <li>
              <span className="footer-contact-label">Email</span>
              <a href="mailto:Niftalemawel@gmail.com" className="footer-link">
                Niftalemawel@gmail.com
              </a>
            </li>
            <li>
              <span className="footer-contact-label">Phone</span>
              <a href="tel:+251939193603" className="footer-link">
                +251 939 193 603
              </a>
            </li>
            <li>
              <span className="footer-contact-label">Location</span>
              <span className="footer-contact-value">Addis Ababa, Ethiopia</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span>© {year} Tilet Technologies. All rights reserved.</span>
        <span className="footer-bottom-accent">Zero-Trust Security & Precision Engineering.</span>
      </div>

    </footer>
  );
}