import { useId, useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  bg:     "#150A16",
  cream:  "#FAFAF8",
  pink:   "#E8295E",
  lime:   "#B5DB1A",
  coral:  "#FF6B35",
  border: "rgba(250,250,248,0.07)",
  muted:  "rgba(250,250,248,0.35)",
  subtle: "rgba(250,250,248,0.55)",
};

const WA_LINK = `https://wa.me/94703444430?text=${encodeURIComponent(
  "Hi Hanna! I'd like to find out more about your Zumba classes."
)}`;

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B5DB1A]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#150A16]";

const ease = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const footerLinks = [
  { label: "Classes",  href: "#hero"     },
  { label: "Schedule", href: "#schedule" },
  { label: "About",    href: "#about"    },
  { label: "Gallery",  href: "/gallery"  },
  { label: "Exercise Library", href: "/exercises" },
  { label: "Location", href: "#location" },
  { label: "FAQ",      href: "#faq"      },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/hannawaththalage/",
    glowColor: "rgba(214,36,159,0.55)",
    hoverGradient: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.069 1.645.069 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.645.069-4.849.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608C4.518 2.497 5.785 2.225 7.151 2.163 8.417 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.132 4.602.443 3.678 1.367c-.924.924-1.235 2.097-1.295 3.375C2.175 8.332 2.163 8.741 2.163 12s.013 3.668.072 4.948c.06 1.278.371 2.451 1.295 3.375s2.097 1.235 3.375 1.295C8.332 20.987 8.741 21 12 21s3.668-.013 4.948-.072c1.278-.06 2.451-.371 3.375-1.295s1.235-2.097 1.295-3.375C20.987 15.668 21 15.259 21 12s-.013-3.668-.072-4.948c-.06-1.278-.371-2.451-1.295-3.375s-2.097-1.235-3.375-1.295C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a3.999 3.999 0 1 1 0-7.998A3.999 3.999 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0-2.881-.001A1.44 1.44 0 0 0 18.406 4z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@zumba_with_hanna",
    glowColor: "rgba(105,201,208,0.5)",
    hoverBg: "#69C9D0",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@hannawaththalage-y3z?si=k1NT_HDupzC0wLbi",
    glowColor: "rgba(255,0,0,0.4)",
    hoverBg: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/hanna.waththalage",
    glowColor: "rgba(24,119,242,0.5)",
    hoverBg: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ATMOSPHERIC BACKGROUND — noise + slow conic sweep + two radial pools
// ─────────────────────────────────────────────────────────────────────────────
function AtmosphericBg() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* SVG noise filter applied via feColorMatrix */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="footer-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="overlay" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Noise overlay */}
      <div
        className="absolute inset-0"
        style={{
          filter: "url(#footer-noise)",
          opacity: 0.06,
          background: C.cream,
        }}
      />

      {/* Slow-rotating conic wash — the one ambient motion */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{
            background: `conic-gradient(from 0deg at 35% 60%,
              rgba(232,41,94,0.07) 0deg,
              rgba(21,10,22,0) 90deg,
              rgba(181,219,26,0.05) 180deg,
              rgba(21,10,22,0) 270deg,
              rgba(232,41,94,0.07) 360deg)`,
            transformOrigin: "35% 60%",
          }}
        />
      )}

      {/* Pink radial pool — bottom-left */}
      <div
        className="absolute"
        style={{
          bottom: "-10%",
          left: "-5%",
          width: "55%",
          height: "70%",
          background: "radial-gradient(ellipse at center, rgba(232,41,94,0.13) 0%, transparent 68%)",
        }}
      />

      {/* Lime radial pool — upper-right, dimmer */}
      <div
        className="absolute"
        style={{
          top: "-15%",
          right: "-8%",
          width: "45%",
          height: "55%",
          background: "radial-gradient(ellipse at center, rgba(181,219,26,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Thin horizontal horizon line — adds spatial depth */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "42%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(232,41,94,0.12) 30%, rgba(181,219,26,0.08) 70%, transparent)",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAGLINE — tight stacked type, outline word glows through from behind
// ─────────────────────────────────────────────────────────────────────────────
function DisplayTagline() {
  const prefersReduced = useReducedMotion();

  const words = [
    {
      text: "DANCE.",
      // Solid cream — anchors the stack
      style: {
        color: C.cream,
        letterSpacing: "-0.035em",
      },
    },
    {
      text: "SWEAT.",
      // Outline only — background atmosphere glows through the stroke
      // We fake a gradient stroke via background-clip on a pseudo-layer
      isOutline: true,
      style: {
        color: "transparent",
        WebkitTextStroke: `2px transparent`,
        letterSpacing: "-0.035em",
        // The real gradient stroke comes from a background behind clip
      },
    },
    {
      text: "REPEAT.",
      // Filled with the brand gradient, slightly narrower tracking
      style: {
        backgroundImage: `linear-gradient(105deg, ${C.pink} 0%, ${C.coral} 42%, ${C.lime} 100%)`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        letterSpacing: "-0.03em",
      },
    },
  ];

  return (
    <div className="relative select-none" aria-label="Dance. Sweat. Repeat.">
      {words.map((w, i) => (
        <motion.div
          key={w.text}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.13, ease }}
          className="relative block"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 10.5vw, 8rem)",
            lineHeight: 0.86,
            ...w.style,
          }}
          aria-hidden={i > 0}
        >
          {w.isOutline ? (
            // Outline word: stack two layers — gradient fill clipped to text
            // on top at low opacity gives a "glowing through" effect
            <span className="relative inline-block">
              {/* Gradient fill at low opacity — seen through the outline */}
              <span
                aria-hidden="true"
                className="absolute inset-0 select-none"
                style={{
                  backgroundImage: `linear-gradient(105deg, ${C.pink} 0%, ${C.coral} 50%, ${C.lime} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  opacity: 0.22,
                  fontFamily: "inherit",
                  fontWeight: "inherit",
                  fontSize: "inherit",
                  lineHeight: "inherit",
                  letterSpacing: w.style.letterSpacing,
                }}
              >
                {w.text}
              </span>
              {/* The stroked outline on top */}
              <span
                style={{
                  backgroundImage: `linear-gradient(105deg, ${C.pink} 0%, ${C.coral} 50%, ${C.lime} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  WebkitTextStroke: "1.5px",
                  // Stroke colour is set by the background-clip gradient
                  paintOrder: "stroke fill",
                }}
              >
                {w.text}
              </span>
            </span>
          ) : (
            w.text
          )}
        </motion.div>
      ))}

      {/* Thin gradient rule beneath — same palette as REPEAT. word */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.55, ease }}
        className="mt-6 h-px origin-left"
        style={{
          background: `linear-gradient(90deg, ${C.pink}, ${C.coral} 45%, ${C.lime} 80%, transparent)`,
          maxWidth: "28rem",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL ICON
// ─────────────────────────────────────────────────────────────────────────────
function SocialIcon({ social, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow on ${social.label}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ scale: 1.14, y: -2 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-200 ${FOCUS_RING}`}
      style={{
        border: `1px solid ${hovered ? "rgba(250,250,248,0.2)" : C.border}`,
        color: C.cream,
      }}
    >
      {/* Ambient glow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg scale-150"
        style={{ background: social.glowColor }}
      />
      {/* Fill */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={
          social.hoverGradient
            ? { background: social.hoverGradient }
            : { background: social.hoverBg }
        }
      />
      <span className="relative z-10">{social.icon}</span>
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BACK TO TOP — scroll-progress ring
// ─────────────────────────────────────────────────────────────────────────────
function BackToTop() {
  const [progress, setProgress] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const R = 18;
  const circ = 2 * Math.PI * R;
  const dashOffset = circ - (Math.min(progress, 100) / 100) * circ;

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })}
      aria-label={`Back to top — ${Math.round(progress)}% scrolled`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`group flex flex-col items-center gap-1 rounded ${FOCUS_RING}`}
    >
      <div className="relative w-11 h-11 flex items-center justify-center" aria-hidden="true">
        <svg width="44" height="44" viewBox="0 0 48 48" className="absolute inset-0">
          <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(250,250,248,0.08)" strokeWidth="2" />
          {!prefersReduced && (
            <circle
              cx="24" cy="24" r={R}
              fill="none"
              stroke={C.pink}
              strokeWidth="2"
              strokeDasharray={circ}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
              style={{ transition: "stroke-dashoffset 0.12s linear" }}
            />
          )}
        </svg>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          className="relative z-10 transition-colors duration-200 group-hover:stroke-[#E8295E]"
          style={{ color: "rgba(250,250,248,0.38)" }}
        >
          <polyline points="13 10 8 4 3 10" />
        </svg>
      </div>
      <span className="text-[9px] tracking-[3px] font-mono transition-colors duration-200 group-hover:text-[#E8295E]"
        style={{ color: "rgba(250,250,248,0.22)" }}>
        Top
      </span>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NEWSLETTER
// ─────────────────────────────────────────────────────────────────────────────
function NewsletterSignup() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) { setStatus("error"); return; }
    console.log("Newsletter signup:", email);
    setStatus("success");
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.28, ease }}
      className="flex flex-col gap-3"
    >
      <p className="text-sm font-semibold" style={{ color: "rgba(250,250,248,0.75)" }}>
        Stay in the loop
      </p>
      <p className="text-xs leading-relaxed" style={{ color: "rgba(250,250,248,0.38)", maxWidth: "18rem" }}>
        Class updates and new schedule alerts — no spam, ever.
      </p>

      <div aria-live="polite">
        {status === "success" ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold"
            style={{ color: C.lime }}
          >
            You're in — see you on the dance floor.
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
            <label htmlFor={inputId} className="sr-only">Email address</label>
            <input
              ref={inputRef}
              id={inputId}
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
              placeholder="your@email.com"
              required
              aria-describedby={status === "error" ? `${inputId}-error` : undefined}
              className="w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200"
              style={{
                background: "rgba(250,250,248,0.06)",
                border: `1px solid ${status === "error" ? `${C.pink}70` : "rgba(250,250,248,0.1)"}`,
                color: C.cream,
                outline: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={(e) => (e.target.style.borderColor = `${C.lime}55`)}
              onBlur={(e) => (e.target.style.borderColor = status === "error" ? `${C.pink}70` : "rgba(250,250,248,0.1)")}
            />

            {status === "error" && (
              <p id={`${inputId}-error`} role="alert" className="text-xs" style={{ color: C.pink }}>
                Please enter a valid email address.
              </p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${FOCUS_RING}`}
              style={{
                background: `linear-gradient(135deg, ${C.pink}, ${C.coral})`,
                boxShadow: `0 4px 22px rgba(232,41,94,0.35)`,
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Notify me
            </motion.button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: C.bg, paddingTop: "clamp(5rem, 10vw, 8rem)", paddingBottom: "2.5rem" }}
      aria-label="Site footer"
    >
      <AtmosphericBg />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Tagline — full bleed typographic centerpiece ─────────────── */}
        <div className="mb-16 lg:mb-20">
          <DisplayTagline />
        </div>

        {/* ── Content grid — asymmetric: brand wide, two nav cols, newsletter wide ── */}
        {/*    Mobile: single column. Tablet: 2-col. Desktop: 4-col asymmetric.      */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16"
          style={{
            // On large screens: 2fr 1fr 1fr 1.6fr
            // brand gets the most room on the left, newsletter on the right
          }}
        >
          {/* Large-screen layout override via inline grid */}
          <style>{`
            @media (min-width: 1024px) {
              .footer-grid {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1.6fr;
                gap: 3rem;
                align-items: start;
              }
            }
          `}</style>
          <div className="footer-grid sm:contents lg:contents" style={{}} />
        </div>

        {/* Actual grid — wraps all four cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.6fr] gap-10 lg:gap-12 items-start mb-16">

          {/* Col 1 — Brand ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
            className="flex flex-col gap-5"
          >
            {/* Wordmark */}
            <div>
              <p
                className="text-xs font-mono font-semibold tracking-widest mb-1"
                style={{ color: C.pink, letterSpacing: "0.18em" }}
              >
                Zumba with Hanna
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(250,250,248,0.38)", maxWidth: "22ch" }}>
                Sri Lanka's vibrant Zumba community — every beat, every move, every class.
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 self-start rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 hover:scale-[1.03] ${FOCUS_RING}`}
              style={{
                background: "rgba(181,219,26,0.10)",
                border: "1px solid rgba(181,219,26,0.22)",
                color: C.lime,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(181,219,26,0.18)";
                e.currentTarget.style.borderColor = "rgba(181,219,26,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(181,219,26,0.10)";
                e.currentTarget.style.borderColor = "rgba(181,219,26,0.22)";
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Hanna
            </a>

            {/* Socials */}
            <div className="flex gap-2.5 flex-wrap pt-1">
              {socials.map((s, i) => (
                <SocialIcon key={s.label} social={s} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Navigation ────────────────────────────────────────── */}
          <motion.nav
            aria-label="Footer navigation"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14, ease }}
          >
            <p className="text-xs font-semibold mb-4" style={{ color: "rgba(250,250,248,0.28)", letterSpacing: "0.14em" }}>
              Navigate
            </p>
            <ul className="flex flex-col gap-2.5 list-none">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`group relative inline-flex items-center text-sm transition-colors duration-200 rounded-sm ${FOCUS_RING}`}
                    style={{ color: "rgba(250,250,248,0.38)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.cream)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,250,248,0.38)")}
                  >
                    {/* Animated underline */}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 group-hover:w-full"
                      style={{ width: 0, background: C.pink }}
                    />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Col 3 — Back to top + location ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="flex flex-col gap-6"
          >
            <BackToTop />

            {/* Location pill */}
            <div
              className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-1.5"
              style={{
                background: "rgba(250,250,248,0.04)",
                border: "1px solid rgba(250,250,248,0.07)",
              }}
            >
              {/* Pulsing location dot */}
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-60"
                  style={{ background: C.pink }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: C.pink }} />
              </span>
              <span className="text-xs font-mono" style={{ color: "rgba(250,250,248,0.28)" }}>
                Kandy, Sri Lanka
              </span>
            </div>
          </motion.div>

          {/* Col 4 — Newsletter ────────────────────────────────────────── */}
          <NewsletterSignup />
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <p className="text-xs" style={{ color: "rgba(250,250,248,0.18)" }}>
            © {new Date().getFullYear()} Zumba with Hanna. All rights reserved.
          </p>

          {/* Thin gradient accent line — echoes tagline palette */}
          <div
            className="hidden sm:block h-px flex-1 mx-6"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(232,41,94,0.20), rgba(181,219,26,0.15), transparent)`,
            }}
          />

          <p className="text-xs font-mono" style={{ color: "rgba(250,250,248,0.18)" }}>
            Built with ♥ in Sri Lanka
          </p>
        </div>

      </div>
    </footer>
  );
}