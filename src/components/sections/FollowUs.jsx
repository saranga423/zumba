 
import { useState, useRef, useCallback, forwardRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from "react-icons/fa";
import { HiOutlineClipboardCopy, HiCheck, HiOutlineDownload, HiExternalLink } from "react-icons/hi";

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE  — light theme, consistent across all sections
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  base:    "#FFFFFF",
  page:    "#FAFAF8",
  ink:     "#150A16",
  pink:    "#E8295E",
  lime:    "#B5DB1A",
  coral:   "#FF6B35",
  border:  "rgba(21,10,22,0.07)",
  surface: "rgba(21,10,22,0.04)",
  muted:   "rgba(21,10,22,0.38)",
  subtle:  "rgba(21,10,22,0.55)",
};

// Stat value colours (first stat = pink, second = coral, third = dark lime)
const STAT_COLORS = [C.pink, C.coral, "#4A7A00"];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL DATA — real brand colours for platform recognition on light bg
// ─────────────────────────────────────────────────────────────────────────────

const HANDLE       = "@hannawaththalage";
const INSTAGRAM_URL = "https://www.instagram.com/hannawaththalage/";

const SOCIAL_LINKS = [
  {
    id: "instagram", label: "Instagram", icon: FaInstagram,
    color: "#E8295E",  // brand pink (matches C.pink)
    href: INSTAGRAM_URL,
    description: "Class highlights & daily energy",
    action: "Follow",
    primary: true,
  },
  {
    id: "tiktok", label: "TikTok", icon: FaTiktok,
    color: "#69C9D0",  // TikTok aqua — readable, distinct from Instagram
    href: "https://www.tiktok.com/@zumba_with_hanna",
    description: "30-sec dance clips & trending moves",
    action: "Follow",
  },
  {
    id: "youtube", label: "YouTube", icon: FaYoutube,
    color: "#FF0000",  // YouTube red — instantly recognisable
    href: "https://youtube.com/@hannawaththalage-y3z?si=AYd2CMTQtLIvoqO3",
    description: "Full class videos & tutorials",
    action: "Subscribe",
  },
  {
    id: "facebook", label: "Facebook", icon: FaFacebook,
    color: "#1877F2",  // Facebook blue — instantly recognisable
    href: "https://www.facebook.com/hanna.waththalage",
    description: "Community updates & events",
    action: "Follow",
  },
];

const DEFAULT_STATS = [
  { label: "Members",      value: "100+" },
  { label: "Classes / wk", value: "8"   },
  { label: "Years Active", value: "4+"  },
];

const ease = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────────────────────────────────
// QR EXPORT HELPER  — white canvas (matches light QR background)
// ─────────────────────────────────────────────────────────────────────────────

async function downloadQRCode(svgElement, filename) {
  if (!svgElement) return;
  const serializer = new XMLSerializer();
  const svgString  = serializer.serializeToString(svgElement);
  const svgBlob    = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url        = URL.createObjectURL(svgBlob);
  try {
    const image      = new Image();
    const exportSize = 800;
    await new Promise((resolve, reject) => {
      image.onload  = resolve;
      image.onerror = reject;
      image.src     = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width  = exportSize;
    canvas.height = exportSize;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, exportSize, exportSize);
    ctx.drawImage(image, 0, 0, exportSize, exportSize);
    const link      = document.createElement("a");
    link.href       = canvas.toDataURL("image/png");
    link.download   = filename;
    link.click();
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// COPY BUTTON
// ─────────────────────────────────────────────────────────────────────────────

function CopyButton({ text, accentColor = C.pink }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = Object.assign(document.createElement("textarea"), {
        value: text, style: "position:absolute;left:-9999px",
      });
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : `Copy ${text}`}
      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200"
      style={{
        border:     `1px solid ${accentColor}40`,
        color:      copied ? "#4A7A00" : accentColor,
        background: copied ? "rgba(74,122,0,0.06)" : "transparent",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span key="check"
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2, ease }}
            className="flex items-center gap-1"
          >
            <HiCheck size={14} /> Copied!
          </motion.span>
        ) : (
          <motion.span key="copy"
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2, ease }}
            className="flex items-center gap-1"
          >
            <HiOutlineClipboardCopy size={14} /> Copy handle
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOWNLOAD BUTTON
// ─────────────────────────────────────────────────────────────────────────────

function DownloadButton({ onDownload }) {
  const [saved, setSaved] = useState(false);

  const handleClick = async () => {
    await onDownload();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? "QR code saved" : "Save QR code as image"}
      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200"
      style={{
        border:     `1px solid ${C.coral}40`,
        color:      saved ? "#4A7A00" : C.coral,
        background: saved ? "rgba(74,122,0,0.06)" : "transparent",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {saved ? (
          <motion.span key="saved"
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2, ease }}
            className="flex items-center gap-1"
          >
            <HiCheck size={14} /> Saved!
          </motion.span>
        ) : (
          <motion.span key="save"
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2, ease }}
            className="flex items-center gap-1"
          >
            <HiOutlineDownload size={14} /> Save QR
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EDITABLE STAT  — inline click-to-edit, light colours
// ─────────────────────────────────────────────────────────────────────────────

function EditableStat({ stat, onChange, valueColor }) {
  const [editing, setEditing] = useState(null);

  return (
    <div className="flex flex-col items-center px-5 first:pl-3 last:pr-3">
      {editing === "value" ? (
        <input
          autoFocus
          defaultValue={stat.value}
          onBlur={(e)    => { onChange({ ...stat, value: e.target.value }); setEditing(null); }}
          onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
          className="w-20 text-center text-2xl font-black bg-transparent focus:outline-none"
          style={{
            color:        valueColor,
            borderBottom: `2px solid ${valueColor}`,
            fontFamily:   "'Syne', sans-serif",
          }}
          aria-label={`Edit ${stat.label} value`}
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditing("value")}
          title="Click to edit"
          className="text-2xl font-black tracking-tight leading-none hover:opacity-70 transition-opacity cursor-text"
          style={{ color: valueColor, fontFamily: "'Syne', sans-serif" }}
        >
          {stat.value}
        </button>
      )}

      {editing === "label" ? (
        <input
          autoFocus
          defaultValue={stat.label}
          onBlur={(e)    => { onChange({ ...stat, label: e.target.value }); setEditing(null); }}
          onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
          className="w-20 text-center text-[10px] uppercase tracking-widest bg-transparent focus:outline-none mt-1.5 font-mono"
          style={{
            color:        C.coral,
            borderBottom: `1px solid ${C.coral}60`,
          }}
          aria-label={`Edit ${stat.label} label`}
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditing("label")}
          title="Click to edit label"
          className="text-[10px] uppercase tracking-widest font-semibold mt-1.5 hover:opacity-70 transition-opacity cursor-text font-mono"
          style={{ color: C.muted }}
        >
          {stat.label}
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS BADGE  — horizontal strip, light surface
// ─────────────────────────────────────────────────────────────────────────────

function StatsBadge({ stats, onChangeStats }) {
  return (
    <div
      role="list"
      aria-label="Studio statistics"
      className="flex items-center justify-center divide-x w-full rounded-2xl px-3 py-4"
      style={{
        background:   C.surface,
        border:       `1px solid ${C.border}`,
        divideColor:  C.border,
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          role="listitem"
          style={{ borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : "none" }}
        >
          <EditableStat
            stat={stat}
            valueColor={STAT_COLORS[i % STAT_COLORS.length]}
            onChange={(updated) => {
              const next = [...stats];
              next[i] = updated;
              onChangeStats(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM CARD  — large grid card, replaces the original compact list item
// Uses forwardRef for keyboard roving tabindex
// ─────────────────────────────────────────────────────────────────────────────

const PlatformCard = forwardRef(function PlatformCard(
  { social, isActive, onClick, onKeyDown },
  ref
) {
  const Icon = social.icon;

  return (
    <motion.button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22, ease }}
      className="relative flex flex-col items-start gap-4 p-5 rounded-2xl text-left w-full transition-all duration-300"
      style={{
        background: isActive ? `${social.color}0D` : C.base,
        border:     `1px solid ${isActive ? social.color + "50" : C.border}`,
        boxShadow:  isActive
          ? `0 8px 28px ${social.color}20, 0 2px 8px rgba(21,10,22,0.06)`
          : "0 2px 6px rgba(21,10,22,0.04)",
      }}
    >
      {/* Active indicator dot */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full"
            style={{ background: social.color }}
          />
        )}
      </AnimatePresence>

      {/* Platform icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
        style={{
          background: `${social.color}15`,
          boxShadow:  isActive ? `0 4px 16px ${social.color}30` : "none",
        }}
      >
        <Icon size={22} style={{ color: social.color }} aria-hidden="true" />
      </div>

      {/* Platform name + description */}
      <div className="flex-1">
        <p
          className="font-black text-base leading-none mb-1.5"
          style={{ color: C.ink, fontFamily: "'Syne', sans-serif" }}
        >
          {social.label}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
          {social.description}
        </p>
      </div>

      {/* Action label */}
      <div
        className="flex items-center gap-1.5 text-xs font-bold"
        style={{ color: social.color }}
      >
        {social.action}
        <motion.span
          animate={{ x: isActive ? 3 : 0 }}
          transition={{ duration: 0.25 }}
        >
          →
        </motion.span>
      </div>
    </motion.button>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// QR PANEL  — full-width horizontal strip, sits below the platform grid
// ─────────────────────────────────────────────────────────────────────────────

function QRPanel({ active, qrRef, onDownload, prefersReduced }) {
  const Icon = active.icon;

  return (
    <motion.div
      layout
      className="flex flex-col sm:flex-row items-center gap-8 rounded-3xl p-7"
      style={{
        background: C.page,
        border:     `1px solid ${C.border}`,
        boxShadow:  "0 4px 24px rgba(21,10,22,0.05)",
      }}
    >
      {/* QR code — link wraps the whole tile */}
      <a
        ref={qrRef}
        href={active.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${active.label} profile — or scan with another device`}
        className="relative group block shrink-0 p-4 rounded-2xl"
        style={{
          background: "#FFFFFF",
          border:     `1px solid ${C.border}`,
          boxShadow:  `0 4px 20px rgba(21,10,22,0.08)`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReduced ? {} : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3, ease }}
          >
            {/* fgColor = ink, bgColor = white — no dark canvas hack needed */}
            <QRCodeSVG
              value={active.href}
              size={160}
              bgColor="#FFFFFF"
              fgColor="#150A16"
              level="H"
              includeMargin={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Hover affordance */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: "rgba(250,250,248,0.94)" }}
        >
          <span
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-md text-white"
            style={{ background: active.color }}
          >
            <HiExternalLink size={14} /> Open {active.label}
          </span>
        </span>
      </a>

      {/* Info + actions */}
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        {/* Platform pill */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: `${active.color}15` }}
          >
            <Icon size={15} style={{ color: active.color }} aria-hidden="true" />
          </div>
          <span
            className="font-bold text-sm"
            style={{ color: active.color }}
          >
            {active.label}
          </span>
        </div>

        {/* Handle */}
        <p
          className="font-black text-2xl sm:text-3xl leading-none"
          style={{ color: C.ink, fontFamily: "'Syne', sans-serif" }}
        >
          {HANDLE}
        </p>

        {/* Instruction */}
        <p className="text-sm" style={{ color: C.muted }}>
          Tap the QR to open, or scan it with another device to follow on {active.label}.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <CopyButton text={HANDLE} accentColor={active.color} />
          <DownloadButton onDownload={onDownload} />

          {/* Direct follow link */}
          <a
            href={active.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white transition-all"
            style={{
              background: active.color,
              boxShadow:  `0 4px 16px ${active.color}40`,
            }}
          >
            <HiExternalLink size={14} />
            {active.action} on {active.label}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function FollowUs() {
  const qrRef                = useRef(null);
  const cardRefs             = useRef([]);
  const shouldReduceMotion   = useReducedMotion();
  const [stats, setStats]    = useState(DEFAULT_STATS);
  const [activeSocial, setActiveSocial] = useState("instagram");

  const active = SOCIAL_LINKS.find((s) => s.id === activeSocial) ?? SOCIAL_LINKS[0];

  // Roving keyboard navigation (same logic as original)
  const handleCardKeyDown = useCallback((event, index) => {
    const last = SOCIAL_LINKS.length - 1;
    let next = null;
    if (event.key === "ArrowDown"  || event.key === "ArrowRight") next = index === last ? 0       : index + 1;
    if (event.key === "ArrowUp"    || event.key === "ArrowLeft")  next = index === 0    ? last     : index - 1;
    if (event.key === "Home")                                      next = 0;
    if (event.key === "End")                                       next = last;
    if (next !== null) {
      event.preventDefault();
      setActiveSocial(SOCIAL_LINKS[next].id);
      cardRefs.current[next]?.focus();
    }
  }, []);

  const handleDownloadQR = useCallback(async () => {
    const svg = qrRef.current?.querySelector("svg");
    await downloadQRCode(svg, `zumba-with-hanna-${activeSocial}-qr.png`);
  }, [activeSocial]);

  const container = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  return (
    <section
      aria-label="Follow us on social media"
      className="relative overflow-hidden py-28"
      style={{ background: C.base }}
    >
      {/* ── Background ───────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(21,10,22,0.1) 1px, transparent 1px)",
            backgroundSize:  "28px 28px",
            opacity:         0.38,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px]"
          style={{
            background: `radial-gradient(ellipse, rgba(232,41,94,0.06) 0%, rgba(255,107,53,0.04) 50%, transparent 75%)`,
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[110px]"
          style={{ background: "rgba(181,219,26,0.05)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span
            className="inline-block uppercase tracking-[7px] text-xs font-bold font-mono mb-3 px-3 py-1 rounded-full"
            style={{
              color:      C.coral,
              background: "rgba(255,107,53,0.08)",
              border:     "1px solid rgba(255,107,53,0.25)",
            }}
          >
            Stay Connected
          </span>

          <h2
            className="font-black tracking-tight mb-4 leading-[1.05]"
            style={{
              color:      C.ink,
              fontFamily: "'Syne', sans-serif",
              fontSize:   "clamp(2.6rem,7vw,5rem)",
            }}
          >
            Join the{" "}
            <span style={{ color: C.pink }}>Movement</span>
          </h2>

          <p className="text-sm sm:text-base leading-relaxed max-w-md mx-auto" style={{ color: C.muted }}>
            Behind-the-scenes clips, class highlights, and Zumba energy — follow along on your favourite platform.
          </p>
        </motion.div>

        {/* ── Stats strip ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest font-mono mb-3 text-center"
            style={{ color: C.muted }}
          >
            Studio at a glance{" "}
            <span
              className="normal-case tracking-normal font-normal ml-1"
              style={{ color: "rgba(21,10,22,0.28)" }}
            >
              — click any value to edit
            </span>
          </p>
          <StatsBadge stats={stats} onChangeStats={setStats} />
        </motion.div>

        {/* ── Platform cards — 2×2 mobile / 4-col desktop ──────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-6"
        >
          <motion.p
            variants={fadeUp}
            id="platform-tablist-label"
            className="text-[10px] font-bold uppercase tracking-widest font-mono mb-3"
            style={{ color: C.muted }}
          >
            Choose a platform — this controls the QR code below
          </motion.p>

          <motion.div
            variants={fadeUp}
            role="tablist"
            aria-labelledby="platform-tablist-label"
            aria-orientation="horizontal"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {SOCIAL_LINKS.map((social, i) => (
              <PlatformCard
                key={social.id}
                ref={(el) => (cardRefs.current[i] = el)}
                social={social}
                isActive={activeSocial === social.id}
                onClick={() => setActiveSocial(social.id)}
                onKeyDown={(e) => handleCardKeyDown(e, i)}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* ── QR Panel ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          viewport={{ once: true }}
        >
          <QRPanel
            active={active}
            qrRef={qrRef}
            onDownload={handleDownloadQR}
            prefersReduced={shouldReduceMotion}
          />
        </motion.div>

      </div>
    </section>
  );
}