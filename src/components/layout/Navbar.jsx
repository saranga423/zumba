import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../assets/ZUMBA6.png';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Gallery', href: '/gallery', isRoute: true },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Location', href: '#location' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const desktopLinkClass =
    'px-3 py-2 text-sm font-medium text-[#FAF4E9]/80 hover:text-[#FF9736] transition-colors relative group no-underline focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2 rounded';

  const mobileLinkClass =
    'font-[Bricolage_Grotesque] font-bold text-3xl sm:text-4xl text-[#FAF4E9] hover:text-[#FF9736] transition-colors tracking-wide no-underline';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
          scrolled
            ? 'bg-[#2B1330]/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group no-underline">
              <img
                src={logo}
                alt="Zumba with Hanna"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain"
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link key={link.href} to={link.href} className={desktopLinkClass}>
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E23F73] group-hover:w-3/4 transition-all duration-300" />
                  </Link>
                ) : (
                  <a key={link.href} href={link.href} className={desktopLinkClass}>
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E23F73] group-hover:w-3/4 transition-all duration-300" />
                  </a>
                )
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-110 text-[#FAF4E9] p-2 focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2 rounded"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-99 bg-[#2B1330]/98 backdrop-blur-lg pt-24 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col items-center gap-4 p-8">
              {navLinks.map((link, i) =>
                link.isRoute ? (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={mobileLinkClass}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={mobileLinkClass}
                  >
                    {link.label}
                  </motion.a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}