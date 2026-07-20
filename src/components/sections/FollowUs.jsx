import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebook,
  FaLinkedin, // Added a new social icon
} from "react-icons/fa";
import {
  HiOutlineClipboardCopy,
  HiCheck,
} from "react-icons/hi";

// ─── Config (Updated Links & Added Platform) ───────────────────────────────
const HANDLE = "@hannawaththalage";
const INSTAGRAM_URL = "https://www.instagram.com/hannawaththalage/";

const SOCIAL_LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: FaInstagram,
    color: "#E1306C",
    primary: true,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@hanna123_00?_r=1&_t=ZS-986Ky5Q3JOH",
    icon: FaTiktok,
    color: "#69C9D0",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@hannawaththalage",
    icon: FaYoutube,
    color: "#FF0000",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/hannawaththalage",
    icon: FaFacebook,
    color: "#1877F2",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hannawaththalage", // Updated sample link
    icon: FaLinkedin,
    color: "#0A66C2",
  },
];

const STATS = [
  { label: "Followers", value: "15.2K" }, // Updated style/stat value
  { label: "Posts", value: "410+" },
  { label: "Students", value: "650+" },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : `Copy ${text} to clipboard`}
      className="
        group inline-flex items-center gap-1.5
        rounded-full px-3.5 py-1.5
        text-xs font-semibold
        border border-purple-500/30
        text-purple-600 hover:bg-purple-500/10
        transition-all duration-200
        focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-purple-500
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            className="flex items-center gap-1"
          >
            <HiCheck className="text-emerald-500" size={14} />
            <span className="text-emerald-500">Copied!</span>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1"
          >
            <HiOutlineClipboardCopy size={14} />
            Copy
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function StatsBadge({ stats }) {
  return (
    <div
      role="list"
      aria-label="Studio statistics"
      className="
        flex items-center justify-center gap-0 divide-x divide-white/15
        rounded-2xl bg-white/10 backdrop-blur-md border border-white/20
        px-3 py-4 mb-10 mx-auto
        max-w-xs sm:max-w-sm
        shadow-xl shadow-black/5
      "
    >
      {stats.map(({ label, value }) => (
        <div
          key={label}
          role="listitem"
          className="flex flex-col items-center px-4 first:pl-2 last:pr-2"
        >
          <span className="text-2xl font-black text-white tracking-tight leading-none">{value}</span>
          <span className="text-[10px] uppercase tracking-widest text-white/70 font-semibold mt-1.5">{label}</span>
        </div>
      ))}
    </div>
  );
}

function SocialPill({ social }) {
  const Icon = social.icon;
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow on ${social.label}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="
        group flex items-center gap-2
        rounded-full px-4 py-2.5
        bg-white/10 backdrop-blur-sm border border-white/20
        hover:border-white/40 hover:bg-white/20
        shadow-md
        transition-colors duration-200
        focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white
      "
    >
      <Icon
        size={17}
        style={{ color: social.color }}
        aria-hidden="true"
      />
      <span className="text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
        {social.label}
      </span>
    </motion.a>
  );
}

// ─── Main Component (Enhanced Styles & Spring Animations) ──────────────────

export default function FollowUs() {
  const qrRef = useRef(null);

  return (
    <section
      aria-label="Follow us on social media"
      className="relative overflow-hidden py-28 bg-slate-950 text-white"
    >
      {/* Modern Mesh/Dot background texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #c084fc 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Dynamic multi-stop radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-tr from-purple-600/20 via-pink-600/20 to-amber-500/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating ambient orbs with staggered spring/infinite animations */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-purple-500/15 blur-2xl pointer-events-none"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-pink-500/15 blur-2xl pointer-events-none"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">

        {/* — Header with staggered spring entrance — */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="inline-block uppercase tracking-[8px] text-pink-400 text-xs font-bold mb-3 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
            Stay Connected
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 font-sans">
            Follow Us on{" "}
            <span className="bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Instagram
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
            Scan the code to check out class highlights, event announcements, and
            exclusive behind-the-scenes moments from the studio.
          </p>
        </motion.div>

        {/* — Stats ribbon — */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <StatsBadge stats={STATS} />
        </motion.div>

        {/* — QR card with interactive hover states — */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          viewport={{ once: true }}
          className="inline-block relative"
        >
          {/* Animated gradient ring border */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-1 rounded-4xl opacity-75 blur-md"
            style={{
              background:
                "linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4], rotate: [0, 180, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Main Card Container */}
          <div className="relative p-0.5 rounded-[30px] bg-linear-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-2xl shadow-purple-950/50">
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-[28px] p-6 sm:p-9 flex flex-col items-center gap-6">

              {/* QR with custom smooth zoom overlay */}
              <div
                ref={qrRef}
                className="relative group p-4 bg-white rounded-2xl shadow-inner"
                aria-label={`QR code linking to ${INSTAGRAM_URL}`}
              >
                <QRCodeSVG
                  value={INSTAGRAM_URL}
                  size={190}
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                  level="H"
                  includeMargin={false}
                />

                {/* Hover overlay */}
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0 flex items-center justify-center
                    rounded-2xl bg-slate-950/85 backdrop-blur-sm
                    opacity-0 group-hover:opacity-100
                    transition-all duration-300 ease-out
                  "
                >
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    className="text-xs font-bold text-white uppercase tracking-widest px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 transition-colors shadow-lg"
                  >
                    Open Instagram ↗
                  </a>
                </div>
              </div>

              {/* Handle + Copy Button container */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-800/60 border border-slate-700/60 px-5 py-3 rounded-2xl">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2.5
                    text-white font-bold text-sm
                    hover:text-pink-400 transition-colors
                    focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-pink-500
                    rounded
                  "
                  aria-label="Open Instagram profile for @hannawaththalage"
                >
                  <FaInstagram size={18} className="text-pink-500" aria-hidden="true" />
                  {HANDLE}
                </a>

                <div className="hidden sm:block h-4 w-px bg-slate-700" />

                <CopyButton text={HANDLE} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* — More socials grid — */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <p className="text-slate-400 text-xs uppercase tracking-[5px] font-semibold mb-5">
            Also find us on
          </p>
          <nav aria-label="Additional social media links">
            <ul className="flex flex-wrap justify-center gap-3" role="list">
              {SOCIAL_LINKS.filter((s) => !s.primary).map((social) => (
                <li key={social.id}>
                  <SocialPill social={social} />
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

      </div>
    </section>
  );
}