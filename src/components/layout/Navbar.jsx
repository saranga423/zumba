import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/ZUMBA90.png';

const navLinks = [
  { label: 'Home',         href: '#hero'         },
  { label: 'About',        href: '#about'         },
  { label: 'Schedule',     href: '#schedule'      },
  { label: 'Gallery',      href: '/gallery', isRoute: true },
  { label: 'Testimonials', href: '#testimonials'  },
  { label: 'Location',     href: '#location'      },
  { label: 'FAQ',          href: '#faq'           },
];

// ─── Hook: track which section is in view ────────────────────────────────────
function useActiveSection(links) {
  const location = useLocation();
  const [active, setActive] = useState(() => {
    // Initialize with route match if applicable
    const routeMatch = links.find(
      (l) => l.isRoute && l.href === location.pathname
    );
    return routeMatch ? routeMatch.href : '';
  });

  useEffect(() => {
    // For route links, match by pathname
    const routeMatch = links.find(
      (l) => l.isRoute && l.href === location.pathname
    );
    if (routeMatch) { 
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(routeMatch.href); 
      return; 
    }
  }, [location.pathname, links]);

  useEffect(() => {
    const sectionIds = navLinks
      .filter((l) => !l.isRoute && l.href.startsWith('#'))
      .map((l) => l.href.slice(1));

    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return active;
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const activeSection = useActiveSection(navLinks);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href) => activeSection === href;

  // ── Desktop link ──────────────────────────────────────────────────────────
  const DesktopLink = ({ link }) => {
    const active = isActive(link.href);
    const base =
      'relative px-3 py-2 text-sm font-medium transition-colors no-underline focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2 rounded group';
    const color = active
      ? 'text-[#FF9736]'
      : 'text-[#FAF4E9]/70 hover:text-[#FF9736]';

    const inner = (
      <>
        {link.label}
        {/* Underline — hibiscus, expands when active or hovered */}
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#E23F73] transition-all duration-300 ${
            active ? 'w-3/4' : 'w-0 group-hover:w-3/4'
          }`}
        />
      </>
    );

    return link.isRoute ? (
      <Link to={link.href} className={`${base} ${color}`}>{inner}</Link>
    ) : (
      <a href={link.href} className={`${base} ${color}`}>{inner}</a>
    );
  };

  // ── Mobile link ───────────────────────────────────────────────────────────
  const MobileLink = ({ link, index }) => {
    const active = isActive(link.href);
    const base =
      'font-bricolage font-bold text-3xl sm:text-4xl tracking-wide no-underline transition-colors';
    const color = active ? 'text-[#FF9736]' : 'text-[#FAF4E9] hover:text-[#FF9736]';

    const content = link.isRoute ? (
      <Link
        to={link.href}
        onClick={() => setMobileOpen(false)}
        className={`${base} ${color}`}
      >
        {link.label}
      </Link>
    ) : (
      <a
        href={link.href}
        onClick={() => setMobileOpen(false)}
        className={`${base} ${color}`}
      >
        {link.label}
      </a>
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="flex items-center gap-3"
      >
        {/* Active dot indicator */}
        {active && (
          <span className="w-2 h-2 rounded-full bg-[#FF9736] shrink-0" aria-hidden="true" />
        )}
        {content}
      </motion.div>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#2B1330]/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
              <img
                src={logo}
                alt="Zumba with Hanna"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain"
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <DesktopLink key={link.href} link={link} />
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block shrink-0">
              <a
                href="#schedule"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#C8F03C] text-[#2B1330] font-mono text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#d4f94e] transition-colors shadow-md shadow-[#C8F03C]/20 no-underline focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2"
              >
                Book a Class
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-50 text-[#FAF4E9] p-2 focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2 rounded"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#2B1330]/98 backdrop-blur-lg pt-24 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col items-center gap-5 p-8">
              {navLinks.map((link, i) => (
                <MobileLink key={link.href} link={link} index={i} />
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05 }}
                className="mt-4 w-full max-w-xs"
              >
                <a
                  href="#schedule"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-4 rounded-2xl bg-[#C8F03C] text-[#2B1330] font-mono text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#d4f94e] transition-colors shadow-lg shadow-[#C8F03C]/20 no-underline"
                >
                  Book a Class
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}