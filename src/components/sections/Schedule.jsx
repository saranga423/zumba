import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Clock3, X, Share2, Check, Search, Filter,
  Calendar, ArrowRight, MapPin, Sparkles, Phone,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULE DATA  (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

const scheduleData = [
  {
    id: "resh-mon-morning",
    day: "Mon", dayFull: "Monday",
    time: "9:00 AM – 11:00 AM",
    name: "Resh Monday Morning Zumba Fitness",
    type: "zumba",
    description: "High-energy Latin dance cardio for all levels — no experience needed, just bring your energy.",
    level: "All Levels",
    location: "Resh Dance Studio Kandy",
  },
  {
    id: "se-kala-tue-morning",
    day: "Tue", dayFull: "Tuesday",
    time: "9:00 AM – 11:00 AM, 5:00 PM – 7:00 PM",
    name: "Se-Kala Tuesday Zumba Fitness",
    type: "Se-Kala Tuesday Zumba Fitness",
    description: "Low-impact Latin rhythms designed for active older adults and beginners — feel the music at your own pace.",
    level: "Beginner",
    location: "Nimal Senanayake Academy of Performing Arts",
  },

  {
    id: "resh-wed-morning",
    day: "Wed", dayFull: "Wednesday",
    time: "9:00 AM – 11:00 AM",
    name: "Resh Wednesday Morning",
    type: "zumba",
    description: "High-energy Latin dance cardio for all levels — no experience needed, just bring your energy.",
    level: "All Levels",
    location: "Resh Dance Studio Kandy",
  },
  {
    id: "Se Kala Thursday Zumba Fitness",
    day: "Thu", dayFull: "Thursday",
    time: "9:00 AM – 11:00 AM, 5:00 PM – 7:00 PM",
    name: "Se Kala Thursday Zumba Fitness",
    type: "Se Kala Thursday Zumba Fitness",
    description: "A super-fun dance fitness class made for kids — big moves, great music, and lots of smiles.",
    level: "Kids (7–11)",
    location: "Nimal Senanayake Academy of Performing Arts",
  },
  {
    id: "Resh Friday Morning",
    day: "Fri", dayFull: "Friday",
    time: "9:00 AM – 11:00 AM",
    name: "Resh Friday Morning",
    type: "Resh Friday Morning",
    description: "Classic Zumba moves plus light weights to sculpt and tone — dance your way to stronger muscles.",
    level: "Intermediate",
    location: "Resh Dance Studio Kandy",
  },
  {
    id: "Se Kala Sunday Zumba Fitness",
    day: "Sun", dayFull: "Sunday",
    time: "9:00 AM – 11:00 AM",
    name: "Zumba Fitness",
    type: "zumba",
    description: "High-energy Latin dance cardio for all levels — no experience needed, just bring your energy.",
    level: "All Levels",
    location: "Nimal Senanayake Academy of Performing Arts",
  },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sun"];

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE  — light theme, consistent with Hero / Navbar / About
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  base:    "#FAFAF8",   // section background
  card:    "#FFFFFF",   // card / modal background
  ink:     "#150A16",   // primary text
  pink:    "#E8295E",   // primary accent
  lime:    "#B5DB1A",   // secondary accent (WhatsApp CTA)
  coral:   "#FF6B35",   // tertiary accent (day labels, time icons)
  border:  "rgba(21,10,22,0.07)",
  surface: "rgba(21,10,22,0.04)",
  muted:   "rgba(21,10,22,0.38)",
  subtle:  "rgba(21,10,22,0.55)",
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT  (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

const CONTACT = {
  phone:        "+94703444430",
  phoneDisplay: "+94 70 344 4430",
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS  (unchanged logic)
// ─────────────────────────────────────────────────────────────────────────────

function whatsappLink(cls) {
  const msg = encodeURIComponent(
    `Hi Hanna,\n\nI'd like to join the ${cls.name} class on ${cls.dayFull} (${cls.time}) at ${cls.location}.\n\nPlease let me know how to reserve my spot.\n\nThank you!`
  );
  return `https://wa.me/${CONTACT.phone.replace(/\+/g, "")}?text=${msg}`;
}

function shortLocation(loc) {
  if (loc.includes("Resh"))                                return "Resh Dance Studio";
  if (loc.includes("Nimal") || loc.includes("Senanayake")) return "Se Kala Academy";
  return loc;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARE BUTTON  — adapted for light bg
// ─────────────────────────────────────────────────────────────────────────────

function ShareButton({ cls }) {
  const [copied, setCopied]  = useState(false);
  const prefersReduced       = useReducedMotion();

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}#schedule-${cls.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: cls.name, text: `${cls.name} — ${cls.dayFull} ${cls.time}`, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  }, [cls]);

  return (
    <button
      onClick={handleShare}
      aria-label={copied ? "Link copied" : "Share this class"}
      className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all"
      style={{
        border:     `1px solid ${C.border}`,
        background: C.surface,
        color:      C.muted,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? {} : { opacity: 0 }}
            className="flex items-center gap-1"
            style={{ color: "#4A7000" }}
          >
            <Check size={12} /> Copied
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? {} : { opacity: 0 }}
            className="flex items-center gap-1"
          >
            <Share2 size={12} /> Share
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOK MODAL  — white, light theme
// ─────────────────────────────────────────────────────────────────────────────

function BookModal({ cls, onClose }) {
  useEffect(() => {
    if (!cls) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cls, onClose]);

  if (!cls) return null;

  return (
    <AnimatePresence>
      {cls && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-40 backdrop-blur-md"
            style={{ background: "rgba(21,10,22,0.55)" }}
          />

          {/* Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Book ${cls.name}`}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 inset-x-4 top-[12vh] mx-auto max-w-md rounded-3xl shadow-2xl overflow-hidden"
            style={{ background: C.card, border: `1px solid ${C.border}` }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{
                borderBottom: `1px solid ${C.border}`,
                background:   C.surface,
              }}
            >
              <span
                className="font-mono text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: C.coral }}
              >
                Reserve a Spot
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-xl transition-colors"
                style={{ color: C.muted }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-7">
              {/* Class summary */}
              <div
                className="mb-6 rounded-2xl p-4"
                style={{ background: C.surface, border: `1px solid ${C.border}` }}
              >
                <h4
                  className="text-xl font-bold mb-1"
                  style={{ color: C.ink, fontFamily: "'Syne', sans-serif" }}
                >
                  {cls.name}
                </h4>
                <p className="font-mono text-[11px] uppercase tracking-wide mb-3" style={{ color: C.muted }}>
                  {cls.dayFull} · {cls.time}
                </p>
                <div className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: C.pink }}>
                  <MapPin size={12} />
                  <span>{cls.location}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: C.subtle }}>
                Message Hanna directly to confirm your place — she'll get back to you quickly.
              </p>

              {/* WhatsApp CTA — lime kept for green/WhatsApp association */}
              <a
                href={whatsappLink(cls)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-mono text-xs uppercase tracking-[0.18em] font-bold transition-all mb-3"
                style={{
                  background: C.lime,
                  color:      C.ink,
                  boxShadow:  `0 8px 24px rgba(181,219,26,0.35)`,
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Hanna
              </a>

              {/* Phone fallback */}
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-mono text-xs uppercase tracking-[0.18em] font-bold transition-all"
                style={{
                  border:     `1px solid ${C.border}`,
                  background: "transparent",
                  color:      C.subtle,
                }}
              >
                <Phone size={14} /> {CONTACT.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL MODAL  — white, light theme
// ─────────────────────────────────────────────────────────────────────────────

function DetailModal({ cls, onClose, onBook }) {
  useEffect(() => {
    if (!cls) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cls, onClose]);

  if (!cls) return null;

  return (
    <AnimatePresence>
      {cls && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-40 backdrop-blur-md"
            style={{ background: "rgba(21,10,22,0.5)" }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Class details: ${cls.name}`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 inset-x-4 top-[10vh] mx-auto max-w-xl rounded-3xl max-h-[82vh] overflow-y-auto shadow-2xl"
            style={{ background: C.card, border: `1px solid ${C.border}` }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{
                borderBottom: `1px solid ${C.border}`,
                background:   C.surface,
              }}
            >
              <span
                className="font-mono text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: C.coral }}
              >
                {cls.dayFull} Session
              </span>
              <div className="flex items-center gap-3">
                <ShareButton cls={cls} />
                <button
                  onClick={onClose}
                  aria-label="Close class detail"
                  className="p-2 rounded-xl transition-colors"
                  style={{ color: C.muted }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-7">
              <h4
                className="text-3xl font-bold tracking-tight mb-3"
                style={{ color: C.ink, fontFamily: "'Syne', sans-serif" }}
              >
                {cls.name}
              </h4>
              <p className="text-sm leading-relaxed mb-6" style={{ color: C.subtle }}>
                {cls.description}
              </p>

              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Time",  value: cls.time,  icon: Clock3    },
                  { label: "Level", value: cls.level, icon: Sparkles  },
                ].map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="p-4 rounded-2xl flex flex-col gap-1.5"
                    style={{ background: C.surface, border: `1px solid ${C.border}` }}
                  >
                    <Icon size={14} style={{ color: C.coral }} aria-hidden="true" />
                    <p className="font-mono text-[10px] uppercase tracking-widest font-semibold" style={{ color: C.muted }}>
                      {label}
                    </p>
                    <p className="text-xs font-bold" style={{ color: C.ink }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Location */}
              <div
                className="p-4 rounded-2xl flex items-center gap-3 mb-8"
                style={{ background: C.surface, border: `1px solid ${C.border}` }}
              >
                <MapPin size={16} style={{ color: C.pink }} className="shrink-0" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: C.muted }}>
                    Location
                  </p>
                  <p className="text-xs font-bold" style={{ color: C.ink }}>{cls.location}</p>
                </div>
              </div>

              {/* Book CTA */}
              <button
                onClick={() => { onClose(); onBook(cls); }}
                className="w-full py-4 rounded-2xl font-mono text-xs uppercase tracking-[0.18em] font-bold transition-all"
                style={{
                  background: C.pink,
                  color:      "#FFFFFF",
                  boxShadow:  `0 8px 28px rgba(232,41,94,0.35)`,
                }}
              >
                Book This Class
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLASS CARD  — white surface, pink accent strip on hover
// ─────────────────────────────────────────────────────────────────────────────

function ClassCard({ cls, onOpen, onBook }) {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: prefersReduced ? 0 : 0.2 }}
      className="relative flex flex-col justify-between rounded-3xl p-6 cursor-pointer overflow-hidden"
      style={{
        background:  C.card,
        border:      `1px solid ${hovered ? "rgba(232,41,94,0.3)" : C.border}`,
        boxShadow:   hovered
          ? "0 8px 32px rgba(232,41,94,0.1), 0 2px 8px rgba(21,10,22,0.06)"
          : "0 2px 8px rgba(21,10,22,0.04)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onClick={() => onOpen(cls.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pink top accent strip — appears on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: `linear-gradient(90deg, ${C.pink}, ${C.coral}, ${C.lime})`,
        }}
      />

      <div>
        {/* Day pill + level badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,107,53,0.1)",
              border:     "1px solid rgba(255,107,53,0.28)",
              color:      C.coral,
            }}
          >
            {cls.dayFull}
          </span>
          <span
            className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg"
            style={{ background: C.surface, color: C.muted }}
          >
            {cls.level}
          </span>
        </div>

        {/* Class name */}
        <h3
          className="text-2xl font-bold mb-2 transition-colors duration-200"
          style={{
            color:      hovered ? C.pink : C.ink,
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {cls.name}
        </h3>

        {/* Description */}
        <p
          className="text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2"
          style={{ color: C.subtle }}
        >
          {cls.description}
        </p>
      </div>

      {/* Footer */}
      <div>
        <div
          className="pt-4 mb-4 flex items-center justify-between text-xs"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <span className="flex items-center gap-2 font-semibold" style={{ color: C.subtle }}>
            <Clock3 size={14} style={{ color: C.coral }} /> {cls.time}
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] uppercase" style={{ color: C.muted }}>
            <MapPin size={12} style={{ color: C.pink }} /> {shortLocation(cls.location)}
          </span>
        </div>

        {/* Book button — pink */}
        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all"
          style={{
            background: C.pink,
            color:      "#FFFFFF",
            boxShadow:  `0 4px 16px rgba(232,41,94,0.28)`,
          }}
          onClick={(e) => { e.stopPropagation(); onBook(cls); }}
        >
          Book Now <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Schedule() {
  const prefersReduced = useReducedMotion();
  const [activeDay,         setActiveDay]         = useState("All");
  const [openId,            setOpenId]            = useState(null);
  const [bookCls,           setBookCls]           = useState(null);
  const [searchQuery,       setSearchQuery]       = useState("");
  const [selectedLocation,  setSelectedLocation]  = useState("All");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const locations = [
    { value: "All",                                             label: "All Venues"       },
    { value: "Resh Dance Studio Kandy",                        label: "Resh Dance Studio" },
    { value: "Nimal Senanayake Academy of Performing Arts",    label: "Se Kala Academy"   },
  ];

  const filtered = scheduleData.filter((c) => {
    const matchDay    = activeDay === "All" || c.day === activeDay;
    const matchSearch = (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchLoc = selectedLocation === "All" || c.location === selectedLocation;
    return matchDay && matchSearch && matchLoc;
  });

  const openCls = openId ? scheduleData.find((c) => c.id === openId) ?? null : null;

  return (
    <section
      id="schedule"
      ref={ref}
      className="relative py-28 px-4 sm:px-6"
      style={{
        background: C.base,
        // selection highlight
        WebkitUserSelect: "text",
      }}
    >
      {/* Subtle background halos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 w-125 h-125 rounded-full blur-[120px]"
          style={{ background: "rgba(232,41,94,0.05)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full blur-[120px]"
          style={{ background: "rgba(181,219,26,0.06)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-6xl mx-auto"
      >

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-8 gap-6"
          style={{ borderBottom: `1px solid ${C.border}` }}
        >
          <div>
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-[0.2em] mb-3"
              style={{
                background: "rgba(255,107,53,0.08)",
                border:     "1px solid rgba(255,107,53,0.25)",
                color:      C.coral,
              }}
            >
              <Sparkles size={12} /> Weekly Timetable
            </div>

            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
              style={{ color: C.ink, fontFamily: "'Syne', sans-serif" }}
            >
              Class Schedule
            </h2>
          </div>

          {/* Day filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {["All", ...WEEK_DAYS].map((day) => {
              const isSel = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0"
                  style={{
                    background: isSel ? C.pink    : C.card,
                    color:      isSel ? "#FFFFFF" : C.subtle,
                    border:     `1px solid ${isSel ? C.pink : C.border}`,
                    boxShadow:  isSel ? `0 4px 16px rgba(232,41,94,0.28)` : "none",
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Search & Venue Filter ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-10">

          {/* Search */}
          <div className="relative md:col-span-7">
            <span
              className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              style={{ color: C.muted }}
            >
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by class name or location…"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm transition-colors"
              style={{
                background:   C.card,
                border:       `1px solid ${C.border}`,
                color:        C.ink,
                outline:      "none",
                fontFamily:   "'DM Sans', sans-serif",
              }}
              onFocus={(e)  => (e.target.style.borderColor = C.pink)}
              onBlur={(e)   => (e.target.style.borderColor = C.border)}
            />
          </div>

          {/* Venue filter */}
          <div className="flex items-center gap-2 md:col-span-5">
            <span
              className="font-mono text-xs uppercase font-bold flex items-center gap-1.5 shrink-0 pl-1"
              style={{ color: C.muted }}
            >
              <Filter size={14} /> Venue:
            </span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full rounded-2xl font-mono text-xs uppercase font-bold px-4 py-3.5 cursor-pointer transition-colors"
              style={{
                background: C.card,
                border:     `1px solid ${C.border}`,
                color:      C.ink,
                outline:    "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = C.pink)}
              onBlur={(e)  => (e.target.style.borderColor = C.border)}
            >
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Cards Grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((cls) => (
                <ClassCard
                  key={cls.id}
                  cls={cls}
                  onOpen={(id) => setOpenId(id)}
                  onBook={(c)  => setBookCls(c)}
                />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full rounded-3xl py-20 text-center"
                style={{
                  border:     `1.5px dashed ${C.border}`,
                  background: C.surface,
                }}
              >
                <Calendar size={32} className="mx-auto mb-3" style={{ color: C.muted }} />
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ color: C.ink, fontFamily: "'Syne', sans-serif" }}
                >
                  No classes match
                </p>
                <p className="text-xs mb-5" style={{ color: C.muted }}>
                  Try a different day or clear your filters.
                </p>
                <button
                  onClick={() => {
                    setActiveDay("All");
                    setSearchQuery("");
                    setSelectedLocation("All");
                  }}
                  className="font-mono text-xs uppercase font-bold px-5 py-2.5 rounded-xl transition-colors"
                  style={{
                    background: C.card,
                    border:     `1px solid ${C.border}`,
                    color:      C.subtle,
                  }}
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>

      {/* ── Modals ────────────────────────────────────────────────────────── */}
      <DetailModal
        cls={openCls}
        onClose={() => setOpenId(null)}
        onBook={(c) => setBookCls(c)}
      />
      <BookModal
        cls={bookCls}
        onClose={() => setBookCls(null)}
      />
    </section>
  );
}