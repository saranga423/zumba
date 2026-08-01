import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from "react-icons/fa";
import { HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
// cream: #FAF4E9  hibiscus: #E23F73  mango: #FF9736  plum: #2B1330  lime: #C8F03C

const HANDLE = "@hannawaththalage";
const INSTAGRAM_URL = "https://www.instagram.com/hannawaththalage/";

const SOCIAL_LINKS = [
  {
    id: "instagram", label: "Instagram", icon: FaInstagram, color: "#E23F73", primary: true,
    href: INSTAGRAM_URL,
  },
  {
    id: "tiktok", label: "TikTok", icon: FaTiktok, color: "#C8F03C",
    href: "https://www.tiktok.com/@zumba_with_hanna",
  },
  {
    id: "youtube", label: "YouTube", icon: FaYoutube, color: "#FF9736",
    href: "https://www.youtube.com/@hannawaththalage",
  },
  {
    id: "facebook", label: "Facebook", icon: FaFacebook, color: "#4F9EF8",
    href: "https://www.facebook.com/hanna.waththalage",
  },
];

// Real stats — update as needed
const DEFAULT_STATS = [
  { label: "Members",      value: "100+"  },
  { label: "Classes / wk", value: "8"    },
  { label: "Years Active", value: "4+"   },
];

const ease = [0.16, 1, 0.3, 1];

// ─── CopyButton ───────────────────────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text; el.style.position = "absolute"; el.style.left = "-9999px";
      document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : `Copy ${text} to clipboard`}
      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border border-[#C8F03C]/40 text-lime hover:bg-[#C8F03C]/10 transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#C8F03C]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2, ease }} className="flex items-center gap-1">
            <HiCheck size={14} className="text-[#C8F03C]" /><span>Copied!</span>
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2, ease }} className="flex items-center gap-1">
            <HiOutlineClipboardCopy size={14} />Copy
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─── EditableStat ─────────────────────────────────────────────────────────────
function EditableStat({ stat, onChange }) {
  const [editing, setEditing] = useState(null);

  return (
    <div className="flex flex-col items-center px-5 first:pl-3 last:pr-3">
      {editing === "value" ? (
        <input autoFocus defaultValue={stat.value}
          onBlur={e => { onChange({ ...stat, value: e.target.value }); setEditing(null); }}
          onKeyDown={e => { if (e.key === "Enter") e.currentTarget.blur(); }}
          className="w-20 text-center text-2xl font-black tracking-tight leading-none bg-transparent border-b border-[#C8F03C]/60 text-[#C8F03C] focus:outline-none"
          aria-label={`Edit ${stat.label} value`}
        />
      ) : (
        <button onClick={() => setEditing("value")} title="Click to edit"
          className="text-2xl font-black tracking-tight leading-none text-lime hover:opacity-70 transition-opacity cursor-text">
          {stat.value}
        </button>
      )}
      {editing === "label" ? (
        <input autoFocus defaultValue={stat.label}
          onBlur={e => { onChange({ ...stat, label: e.target.value }); setEditing(null); }}
          onKeyDown={e => { if (e.key === "Enter") e.currentTarget.blur(); }}
          className="w-20 text-center text-[10px] uppercase tracking-widest bg-transparent border-b border-[#FF9736]/60 text-[#FF9736] focus:outline-none mt-1.5"
          aria-label={`Edit ${stat.label} label`}
        />
      ) : (
        <button onClick={() => setEditing("label")} title="Click to edit label"
          className="text-[10px] uppercase tracking-widest text-[#FAF4E9]/50 font-semibold mt-1.5 hover:text-[#FF9736] transition-colors cursor-text">
          {stat.label}
        </button>
      )}
    </div>
  );
}

// ─── StatsBadge ───────────────────────────────────────────────────────────────
function StatsBadge({ stats, onChangeStats }) {
  return (
    <div role="list" aria-label="Studio statistics"
      className="flex items-center justify-center divide-x divide-[#FAF4E9]/10 rounded-2xl border border-[#FF9736]/25 bg-[#FF9736]/8 px-3 py-4 w-full">
      {stats.map((stat, i) => (
        <div key={i} role="listitem">
          <EditableStat stat={stat} onChange={updated => {
            const next = [...stats]; next[i] = updated; onChangeStats(next);
          }} />
        </div>
      ))}
    </div>
  );
}

// ─── PulseRings ───────────────────────────────────────────────────────────────
function PulseRings({ color = "#FF9736", count = 3 }) {
  return (
    <div className="absolute inset-0 rounded-[30px] pointer-events-none" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i} className="absolute inset-0 rounded-[30px] border"
          style={{ borderColor: color + "55" }}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 1.08 + i * 0.06 }}
          transition={{ duration: 2.4, delay: i * 0.7, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── SocialCard ───────────────────────────────────────────────────────────────
function SocialCard({ social, isActive, onClick }) {
  const Icon = social.icon;
  return (
    <motion.button onClick={onClick} aria-pressed={isActive}
      aria-label={`${social.label}${isActive ? " (active)" : ""}`}
      whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22, ease }}
      className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#C8F03C]"
      style={{
        background:   isActive ? social.color + "18" : "rgba(250,244,233,0.04)",
        borderColor:  isActive ? social.color + "80" : "rgba(250,244,233,0.08)",
      }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
        style={{ background: isActive ? social.color + "30" : "rgba(250,244,233,0.06)" }}>
        <Icon size={17} style={{ color: social.color }} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#FAF4E9]/90 leading-none">{social.label}</p>
        <p className="text-[11px] text-[#FAF4E9]/35 mt-0.5 truncate">
          {social.href.replace("https://", "").replace("www.", "")}
        </p>
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.2, ease }}
            className="w-2 h-2 rounded-full shrink-0" style={{ background: social.color }} />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function FollowUs() {
  const qrRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [activeSocial, setActiveSocial] = useState("instagram");

  const active    = SOCIAL_LINKS.find(s => s.id === activeSocial) ?? SOCIAL_LINKS[0];
  const qrTarget  = active.href;
  const qrLabel   = active.label;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  return (
    <section
      aria-label="Follow us on social media"
      className="relative overflow-hidden py-28 bg-[#2B1330] text-[#FAF4E9] selection:bg-[#C8F03C] selection:text-[#2B1330]"
    >
      {/* Dot-grid */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #FAF4E9 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />

      {/* Ambient glow */}
      <div aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(226,63,115,0.12) 0%, rgba(255,151,54,0.08) 50%, transparent 75%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }} viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block uppercase tracking-[7px] text-xs font-bold font-mono mb-4 px-3 py-1 rounded-full border text-[#FF9736] border-[#FF9736]/30 bg-[#FF9736]/10">
            Stay Connected
          </span>
          <h2 className="font-bricolage text-4xl sm:text-6xl font-black tracking-tight mb-4 leading-[1.05] text-[#FAF4E9]">
            Join the <span className="text-[#E23F73]">Movement</span>
          </h2>
          <p className="text-[#FAF4E9]/50 text-sm sm:text-base leading-relaxed max-w-md mx-auto font-inter">
            Behind-the-scenes clips, class highlights, and Zumba energy — follow along on your favourite platform.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">

          {/* LEFT: QR card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease }} viewport={{ once: true }}
            className="relative lg:sticky lg:top-8"
          >
            {!shouldReduceMotion && <PulseRings color={active.color} count={3} />}

            <div className="relative p-0.5 rounded-[30px] shadow-2xl transition-all duration-500"
              style={{ background: `linear-gradient(135deg, ${active.color}, #E23F73, #2B1330)` }}>
              <div className="rounded-[28px] p-6 sm:p-9 flex flex-col items-center gap-6 backdrop-blur-xl"
                style={{ background: "#1c0b22" }}>

                {/* Active platform header */}
                <AnimatePresence mode="wait">
                  <motion.div key={activeSocial}
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.28, ease }}
                    className="flex items-center gap-2.5 self-start"
                  >
                    {(() => { const Icon = active.icon; return <Icon size={18} style={{ color: active.color }} aria-hidden="true" />; })()}
                    <span className="text-sm font-bold" style={{ color: active.color }}>{active.label}</span>
                  </motion.div>
                </AnimatePresence>

                {/* QR code */}
                <div ref={qrRef}
                  className="relative group p-4 rounded-2xl shadow-inner"
                  style={{ background: "#FAF4E9" }}
                  aria-label={`QR code linking to ${active.label} profile`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div key={activeSocial}
                      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.3, ease }}>
                      <QRCodeSVG value={qrTarget} size={190} bgColor="#FAF4E9" fgColor="#2B1330" level="H" includeMargin={false} />
                    </motion.div>
                  </AnimatePresence>
                  {/* Hover overlay */}
                  <div aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center rounded-2xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: "#2B1330CC" }}>
                    <a href={qrTarget} target="_blank" rel="noopener noreferrer" tabIndex={-1}
                      className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg hover:opacity-80 transition-opacity"
                      style={{ background: active.color, color: "#FAF4E9" }}>
                      Open {qrLabel}
                    </a>
                  </div>
                </div>

                {/* Handle + copy */}
                <div className="flex flex-col sm:flex-row items-center gap-3 px-5 py-3 rounded-2xl border w-full justify-center"
                  style={{ background: "#FAF4E908", borderColor: "#FAF4E915" }}>
                  <a href={qrTarget} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 font-bold text-sm transition-colors rounded focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#C8F03C] text-[#FAF4E9]"
                    onMouseEnter={e => (e.currentTarget.style.color = active.color)}
                    onMouseLeave={e => (e.currentTarget.style.color = "#FAF4E9")}
                    aria-label={`Open ${active.label} profile for ${HANDLE}`}
                  >
                    {(() => { const Icon = active.icon; return <Icon size={18} style={{ color: active.color }} aria-hidden="true" />; })()}
                    {HANDLE}
                  </a>
                  <div className="hidden sm:block h-4 w-px bg-[#FAF4E9]/20" />
                  <CopyButton text={HANDLE} />
                </div>

                <p className="text-[11px] text-[#FAF4E9]/25 tracking-wider text-center font-mono">
                  Scan to open · {active.label}
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: social list + stats */}
          <motion.div variants={container} initial="hidden"
            whileInView="show" viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <motion.p variants={item}
              className="text-[10px] font-bold uppercase tracking-widest text-[#FAF4E9]/30 font-mono">
              Choose a platform
            </motion.p>

            {SOCIAL_LINKS.map(social => (
              <motion.div key={social.id} variants={item}>
                <SocialCard social={social} isActive={activeSocial === social.id}
                  onClick={() => setActiveSocial(social.id)} />
              </motion.div>
            ))}

            <motion.div variants={item} className="pt-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#FAF4E9]/30 mb-3 font-mono">
                Studio at a glance{" "}
                <span className="normal-case text-[#FAF4E9]/20 tracking-normal font-normal">— click to edit</span>
              </p>
              <StatsBadge stats={stats} onChangeStats={setStats} />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}