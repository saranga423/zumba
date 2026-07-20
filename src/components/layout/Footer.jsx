import { motion } from "framer-motion";

// ─── Data ──────────────────────────────────────────────────────────────────

const footerLinks = [
  { label: "Schedule", href: "#schedule" },
  { label: "About",    href: "#about" },
  { label: "Gallery",  href: "#gallery" },
  { label: "Contact",  href: "#location" },
  { label: "FAQ",      href: "#faq" },
  { label: "Privacy Policy", href: "#Privacy" },
];

const socials = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@hanna.waththalage?is_from_webapp=1&sender_device=pc",
    glowColor: "rgba(105,201,208,0.45)",
    hoverBg: "#000000",
    hoverBorder: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/hanna.waththalage/",
    glowColor: "rgba(24,119,242,0.45)",
    hoverBg: "#1877F2",
    hoverBorder: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hannawaththalage/",
    glowColor: "rgba(214,36,159,0.45)",
    hoverGradient:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.069 1.645.069 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.645.069-4.849.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608C4.518 2.497 5.785 2.225 7.151 2.163 8.417 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.132 4.602.443 3.678 1.367c-.924.924-1.235 2.097-1.295 3.375C3.013 8.332 3 8.741 3 12s.013 3.668.072 4.948c.06 1.278.371 2.451 1.295 3.375s2.097 1.235 3.375 1.295C8.332 20.987 8.741 21 12 21s3.668-.013 4.948-.072c1.278-.06 2.451-.371 3.375-1.295s1.235-2.097 1.295-3.375C20.987 15.668 21 15.259 21 12s-.013-3.668-.072-4.948c-.06-1.278-.371-2.451-1.295-3.375s-2.097-1.235-3.375-1.295C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a3.999 3.999 0 1 1 0-7.998A3.999 3.999 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0-2.881-.001A1.44 1.44 0 0 0 18.406 4z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hannawaththalage39@gmail.com",
    glowColor: "rgba(255,255,255,0.15)",
    hoverBg: "rgba(255,255,255,0.1)",
    hoverBorder: "rgba(255,255,255,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 12.713l11.985-9.713H.015L12 12.713zm0 2.574L.015 5.001v13.998h23.97V5.001L12 15.287z" />
      </svg>
    ),
  },
];

// ─── SocialIcon ────────────────────────────────────────────────────────────

function SocialIcon({ social, index }) {
  return (
    <motion.a
      key={social.label}
      href={social.href}
      target={social.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={`Follow on ${social.label}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.92 }}
      style={{ "--glow": social.glowColor }}
      className="
        group relative w-11 h-11 rounded-full
        border border-white/20
        flex items-center justify-center
        text-white transition-all duration-250
        focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-yellow
        overflow-hidden
      "
    >
      {/* Animated glow behind icon */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0 rounded-full opacity-0
          group-hover:opacity-100 transition-opacity duration-300
          blur-md scale-110
        "
        style={{ background: social.glowColor }}
      />

      {/* Fill layer for brand colors on hover — driven by inline style per social */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0 rounded-full opacity-0
          group-hover:opacity-100 transition-opacity duration-200
        "
        style={
          social.hoverGradient
            ? { background: social.hoverGradient }
            : { background: social.hoverBg, borderColor: social.hoverBorder }
        }
      />

      <span className="relative z-10">{social.icon}</span>
    </motion.a>
  );
}

// ─── BackToTop ─────────────────────────────────────────────────────────────

function BackToTop() {
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.92 }}
      className="
        group flex flex-col items-center gap-1.5
        text-white/30 hover:text-yellow
        transition-colors duration-200
        focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-yellow
        rounded
      "
    >
      <span
        aria-hidden="true"
        className="
          w-8 h-8 rounded-full border border-white/15
          group-hover:border-yellow/50
          flex items-center justify-center
          transition-colors duration-200
        "
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </span>
      <span className="text-[10px] uppercase tracking-[3px]">Top</span>
    </motion.button>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      className="relative bg-navy text-white pt-20 pb-10 px-[8%] overflow-hidden"
      aria-label="Site footer"
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Ambient glow from bottom-center */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-130 h-65 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(236,72,153,0.09) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* ── Tagline block — the visual anchor ── */}
        <div className="text-center mb-12">
          <p className="font-times text-3xl sm:text-4xl text-white/80 tracking-wide mb-1">
            Dance.{" "}
            <span className="text-pink">Sweat.</span>{" "}
            Repeat.
          </p>
          {/* Gradient rule that echoes the brand palette */}
          <div
            aria-hidden="true"
            className="mx-auto mt-4 h-px w-24 rounded-full"
            style={{
              background: "linear-gradient(to right, #ec4899, #f97316, #eab308)",
            }}
          />
        </div>

        {/* ── Three-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mb-14">

          {/* Col 1 — Brand identity */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center md:items-start gap-3"
          >
            <p className="uppercase tracking-[5px] text-pink text-[11px] font-semibold">
              ZumbaFit Studio
            </p>
            <p className="text-white/40 text-sm leading-relaxed text-center md:text-left max-w-55">
              Sri Lanka's vibrant Zumba community — every beat, every move, every class.
            </p>
          </motion.div>

          {/* Col 2 — Navigation */}
          <nav aria-label="Footer navigation" className="flex justify-center">
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col items-center gap-2.5 list-none"
            >
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="
                      relative text-white/45 hover:text-yellow text-sm
                      transition-colors duration-200
                      after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                      after:w-0 after:h-px after:bg-yellow
                      after:transition-[width] after:duration-300
                      hover:after:w-full
                      focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-yellow
                      rounded-sm
                    "
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </nav>

          {/* Col 3 — Socials + back-to-top */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center md:items-end gap-5"
          >
            <p className="uppercase tracking-[4px] text-white/25 text-[10px]">
              Follow along
            </p>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <SocialIcon key={s.label} social={s} index={i} />
              ))}
            </div>
            <BackToTop />
          </motion.div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="border-t pt-6 text-center"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-white/25 text-xs leading-relaxed">
            © {new Date().getFullYear()} ZUMBA with HANNA. All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            ZUMBA® is a registered trademark of Zumba Fitness, LLC.
            ZUMBA with HANNA is independently owned and operated.
          </p>
        </div>

      </motion.div>
    </footer>
  );
}