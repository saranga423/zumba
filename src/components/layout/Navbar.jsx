/**
 * Navbar — light theme, matches Hero redesign.
 *
 * Palette (shared with Hero):
 *   cream   #FAFAF8   page background
 *   ink     #150A16   primary text
 *   pink    #E8295E   primary accent
 *   lime    #B5DB1A   secondary accent
 *
 * Font note:
 *   Expects Syne + DM Sans loaded globally in index.html:
 *   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900
 *   &family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
 *
 * Logo note:
 *   If your ZUMBA90.png is a white/light logo (designed for dark backgrounds),
 *   swap the <img> filter to:  style={{ filter: 'invert(1)' }}
 *   or supply a separate dark-variant logo file.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

/* ── Palette ────────────────────────────────────────────────────────────────── */
const C = {
  cream: '#FAFAF8',
  ink:   '#150A16',
  pink:  '#E8295E',
  lime:  '#B5DB1A',
};

const navLinks = [
  { label: 'Home',         href: '#hero'         },
  { label: 'About',        href: '#about'         },
  { label: 'Schedule',     href: '#schedule'      },
  { label: 'Gallery',      href: '/gallery', isRoute: true },
  { label: 'Testimonials', href: '#testimonials'  },
  { label: 'Location',     href: '#location'      },
  { label: 'FAQ',          href: '#faq'           },
];

/* ── Hook: active section via IntersectionObserver ─────────────────────────── */
function useActiveSection(links) {
  const location = useLocation();
  const routeMatch = links.find(
    (l) => l.isRoute && l.href === location.pathname
  );
  const [sectionActive, setSectionActive] = useState(() => {
    const initial = links.find((l) => l.isRoute && l.href === location.pathname);
    return initial ? initial.href : '';
  });

  useEffect(() => {
    const sectionIds = links
      .filter((l) => !l.isRoute && l.href.startsWith('#'))
      .map((l) => l.href.slice(1));

    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setSectionActive(`#${id}`); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [links]);

  return routeMatch ? routeMatch.href : sectionActive;
}

/* ── Desktop link — pill highlight on active ────────────────────────────────── */
function DesktopLink({ link, active }) {
  const inner = (
    <motion.span
      className="relative inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors no-underline"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color:      active ? C.pink : `rgba(21,10,22,0.62)`,
        background: active ? `rgba(232,41,94,0.08)` : 'transparent',
        transition: 'color 0.2s, background 0.2s',
      }}
      whileHover={{
        color:      C.pink,
        background: `rgba(232,41,94,0.07)`,
      }}
    >
      {link.label}
      {/* Pink dot under active label */}
      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="nav-active-dot"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
            style={{ background: C.pink }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          />
        )}
      </AnimatePresence>
    </motion.span>
  );

  const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 rounded-full';

  return link.isRoute ? (
    <Link
      to={link.href}
      className={`no-underline ${focusRing}`}
      style={{ outline: `2px solid transparent`, outlineOffset: 2, borderRadius: '999px' }}
    >
      {inner}
    </Link>
  ) : (
    <a
      href={link.href}
      className={`no-underline ${focusRing}`}
      style={{ outline: `2px solid transparent`, outlineOffset: 2, borderRadius: '999px' }}
    >
      {inner}
    </a>
  );
}

/* ── Mobile link ────────────────────────────────────────────────────────────── */
function MobileLink({ link, active, index, onClose }) {
  const inner = (
    <div className="flex items-center gap-4">
      <motion.span
        className="w-1.5 shrink-0 rounded-full"
        style={{ background: C.pink }}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: active ? 28 : 0, opacity: active ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
        aria-hidden="true"
      />
      <span
        className="font-black"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize:   'clamp(2rem, 8vw, 3rem)',
          color:      active ? C.pink : C.ink,
          letterSpacing: '-0.02em',
          transition: 'color 0.2s',
        }}
      >
        {link.label}
      </span>
    </div>
  );

  const baseProps = { onClick: onClose, className: 'no-underline block' };

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay:    index * 0.055,
        duration: 0.4,
        ease:     [0.22, 1, 0.36, 1],
      }}
    >
      {link.isRoute ? (
        <Link to={link.href} {...baseProps}>{inner}</Link>
      ) : (
        <a href={link.href} {...baseProps}>{inner}</a>
      )}
    </motion.div>
  );
}

/* ── Hamburger / Close icon ─────────────────────────────────────────────────── */
function MenuIcon({ open }) {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke={C.ink}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.g
            key="close"
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate:   0 }}
            exit={{   opacity: 0, rotate:  45 }}
            transition={{ duration: 0.22 }}
          >
            <path d="M6 18L18 6" />
            <path d="M6 6l12 12" />
          </motion.g>
        ) : (
          <motion.g
            key="open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{   opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

/* ── Navbar ─────────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(navLinks);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollToSchedule = () => {
    setMobileOpen(false);
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background:    scrolled ? 'rgba(250,250,248,0.93)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom:  scrolled ? '1px solid rgba(21,10,22,0.07)' : '1px solid transparent',
          transition:    'background 0.35s, border-color 0.35s, backdrop-filter 0.35s',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center no-underline shrink-0">
              <img
                src="/logo.png"
                alt="Zumba with Hanna"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain"
                /**
                 * If logo is white/light (designed for dark bg), uncomment:
                 * style={{ filter: 'invert(1)' }}
                 */
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <DesktopLink
                  key={link.href}
                  link={link}
                  active={activeSection === link.href}
                />
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <motion.button
                type="button"
                onClick={scrollToSchedule}
                whileHover={{
                  scale:     1.04,
                  boxShadow: '0 0 0 4px rgba(232,41,94,0.18)',
                }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: C.pink,
                  boxShadow:  '0 4px 16px rgba(232,41,94,0.32)',
                  letterSpacing: '0.01em',
                }}
              >
                Book a Class
              </motion.button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden relative z-50 p-2 rounded-lg"
              style={{ background: mobileOpen ? 'transparent' : 'transparent' }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <MenuIcon open={mobileOpen} />
            </button>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile menu overlay ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)'   }}
            exit={{   opacity: 0, clipPath: 'inset(0 0 100% 0)'  }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col overflow-y-auto"
            style={{ background: C.cream }}
          >
            {/* Subtle lime blob — brand flavour, not decoration for its own sake */}
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, rgba(181,219,26,0.13) 0%, transparent 65%)`,
                filter:     'blur(20px)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -top-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, rgba(232,41,94,0.07) 0%, transparent 65%)`,
                filter:     'blur(20px)',
              }}
            />

            {/* Links */}
            <div className="relative flex flex-col justify-center flex-1 px-8 pt-28 pb-10 gap-3">
              {navLinks.map((link, i) => (
                <MobileLink
                  key={link.href}
                  link={link}
                  active={activeSection === link.href}
                  index={i}
                  onClose={() => setMobileOpen(false)}
                />
              ))}
            </div>

            {/* Mobile CTA */}
            <motion.div
              className="relative px-8 pb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.055 + 0.1, duration: 0.4 }}
            >
              <button
                type="button"
                onClick={scrollToSchedule}
                className="w-full rounded-full py-4 text-base font-bold text-white"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: C.pink,
                  boxShadow:  '0 8px 32px rgba(232,41,94,0.38)',
                  letterSpacing: '0.01em',
                }}
              >
                Book a Class
              </button>

              {/* Studio tagline */}
              <p
                className="mt-5 text-center text-sm"
                style={{ color: 'rgba(21,10,22,0.35)', fontFamily: "'DM Sans', sans-serif" }}
              >
                Kandy's most energetic Zumba studio
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}