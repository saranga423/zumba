 
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Clock3, X, Share2, Check, Search, Filter,
  Calendar, ArrowRight, MapPin, Sparkles, Phone, Mail,
} from "lucide-react";

// ─── Schedule Data (real) ────────────────────────────────────────────────────
const scheduleData = [
  {
    id: "resh-mon-morning",
    day: "Mon", dayFull: "Monday",
    time: "9:00 AM – 11:00 AM",
    name: "Zumba Fitness",
    type: "zumba",
    description: "High-energy Latin dance cardio for all levels — no experience needed, just bring your energy.",
    level: "All Levels",
    location: "Resh Dance Studio Kandy",
  },
  {
    id: "se-kala-tue-morning",
    day: "Tue", dayFull: "Tuesday",
    time: "9:00 AM – 11:00 AM",
    name: "Zumba Fitness",
    type: "zumba",
    description: "High-energy Latin dance cardio for all levels — no experience needed, just bring your energy.",
    level: "All Levels",
    location: "Nimal Senanayake Academy of Performing Arts",
  },
  {
    id: "se-kala-tue-evening",
    day: "Tue", dayFull: "Tuesday",
    time: "5:00 PM – 7:00 PM",
    name: "Zumba Fitness",
    type: "zumba",
    description: "High-energy Latin dance cardio for all levels — no experience needed, just bring your energy.",
    level: "All Levels",
    location: "Nimal Senanayake Academy of Performing Arts",
  },
  {
    id: "resh-wed-morning",
    day: "Wed", dayFull: "Wednesday",
    time: "9:00 AM – 11:00 AM",
    name: "Zumba Fitness",
    type: "zumba",
    description: "High-energy Latin dance cardio for all levels — no experience needed, just bring your energy.",
    level: "All Levels",
    location: "Resh Dance Studio Kandy",
  },
  {
    id: "se-kala-thu-morning",
    day: "Thu", dayFull: "Thursday",
    time: "9:00 AM – 11:00 AM",
    name: "Zumba Fitness",
    type: "zumba",
    description: "High-energy Latin dance cardio for all levels — no experience needed, just bring your energy.",
    level: "All Levels",
    location: "Nimal Senanayake Academy of Performing Arts",
  },
  {
    id: "se-kala-thu-evening",
    day: "Thu", dayFull: "Thursday",
    time: "5:00 PM – 7:00 PM",
    name: "Zumba Fitness",
    type: "zumba",
    description: "High-energy Latin dance cardio for all levels — no experience needed, just bring your energy.",
    level: "All Levels",
    location: "Nimal Senanayake Academy of Performing Arts",
  },
  {
    id: "resh-fri-morning",
    day: "Fri", dayFull: "Friday",
    time: "9:00 AM – 11:00 AM",
    name: "Zumba Fitness",
    type: "zumba",
    description: "High-energy Latin dance cardio for all levels — no experience needed, just bring your energy.",
    level: "All Levels",
    location: "Resh Dance Studio Kandy",
  },
  {
    id: "se-kala-sun-morning",
    day: "Sun", dayFull: "Sunday",
    time: "9:00 AM – 11:00 AM",
    name: "Zumba Fitness",
    type: "zumba",
    description: "High-energy Latin dance cardio for all levels — no experience needed, just bring your energy.",
    level: "All Levels",
    location: "Nimal Senanayake Academy of Performing Arts",
  },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── Brand Tokens ────────────────────────────────────────────────────────────
// cream: #FAF4E9 | hibiscus: #E23F73 | mango: #FF9736 | plum: #2B1330 | lime: #C8F03C

const CONTACT = {
  phone: "+94703444430",
  phoneDisplay: "+94 70 344 4430",
  email: "hannawaththalage39@gmail.com",
  whatsappBase: "https://wa.me/94703444430",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function whatsappLink(cls) {
  const msg = encodeURIComponent(
    `Hi Hanna! I'd like to join the ${cls.name} class on ${cls.dayFull} (${cls.time}) at ${cls.location}. Please let me know how to reserve my spot.`
  );
  return `${CONTACT.whatsappBase}?text=${msg}`;
}

function mailtoLink(cls) {
  const subject = encodeURIComponent(`Booking – ${cls.name} ${cls.dayFull}`);
  const body = encodeURIComponent(
    `Hi Hanna,\n\nI'd like to join the ${cls.name} class on ${cls.dayFull} (${cls.time}) at ${cls.location}.\n\nPlease let me know how to reserve my spot.\n\nThank you!`
  );
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}

// Short location label for card display
function shortLocation(loc) {
  if (loc.includes("Resh")) return "Resh Dance Studio";
  if (loc.includes("Nimal") || loc.includes("Senanayake")) return "Se Kala Academy";
  return loc;
}

// ─── ShareButton ─────────────────────────────────────────────────────────────
function ShareButton({ cls }) {
  const [copied, setCopied] = useState(false);
  const prefersReduced = useReducedMotion();

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
    } catch (error) {
      console.error("Share failed:", error);
    }
  }, [cls]);

  return (
    <button
      onClick={handleShare}
      aria-label={copied ? "Link copied" : "Share this class"}
      className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 border border-plum-border bg-plum-light text-cream/60 font-mono text-[11px] uppercase tracking-wider hover:border-mango/50 hover:text-cream transition-all"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? {} : { opacity: 0 }}
            className="flex items-center gap-1 text-lime"
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

// ─── BookModal ────────────────────────────────────────────────────────────────
// Replaces CheckoutModal — no fake form. Direct WhatsApp + email CTAs.
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} aria-hidden="true"
            className="fixed inset-0 z-40 bg-plum/80 backdrop-blur-md"
          />

          {/* Sheet */}
          <motion.div
            role="dialog" aria-modal="true" aria-label={`Book ${cls.name}`}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 inset-x-4 top-[12vh] mx-auto max-w-md bg-plum border border-plum-border rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-plum-border">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-mango">
                Reserve a Spot
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-xl text-cream/50 hover:text-cream hover:bg-plum-border transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-7">
              {/* Class summary */}
              <div className="mb-6 bg-plum-light border border-plum-border rounded-2xl p-4">
                <h4 className="font-display text-xl font-bold text-cream mb-1">{cls.name}</h4>
                <p className="font-mono text-[11px] text-cream/50 uppercase tracking-wide mb-3">
                  {cls.dayFull} · {cls.time}
                </p>
                <div className="flex items-center gap-1.5 text-mango font-mono text-[11px]">
                  <MapPin size={12} />
                  <span>{cls.location}</span>
                </div>
              </div>

              <p className="font-body text-sm text-cream/60 leading-relaxed mb-6">
                Message Hanna directly to confirm your place — she'll get back to you quickly.
              </p>

              {/* WhatsApp CTA */}
              <a
                href={whatsappLink(cls)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-lime text-plum font-mono text-xs uppercase tracking-[0.18em] font-bold hover:bg-[#d4f94e] transition-all shadow-lg shadow-[#C8F03C]/20 mb-3"
              >
                <Phone size={15} /> WhatsApp Hanna
              </a>

              {/* Email CTA */}
              <a
                href={mailtoLink(cls)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-plum-border bg-transparent text-cream/80 font-mono text-xs uppercase tracking-[0.18em] font-bold hover:border-mango/50 hover:text-cream transition-all"
              >
                <Mail size={14} /> Send an Email
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── DetailModal ──────────────────────────────────────────────────────────────
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} aria-hidden="true"
            className="fixed inset-0 z-40 bg-plum/70 backdrop-blur-md"
          />
          <motion.div
            role="dialog" aria-modal="true" aria-label={`Class details: ${cls.name}`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 inset-x-4 top-[10vh] mx-auto max-w-xl bg-plum border border-plum-border rounded-3xl max-h-[82vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-plum-border bg-plum-light">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-mango">
                {cls.dayFull} Session
              </span>
              <div className="flex items-center gap-3">
                <ShareButton cls={cls} />
                <button
                  onClick={onClose}
                  aria-label="Close class detail"
                  className="p-2 rounded-xl text-cream/50 hover:text-cream hover:bg-plum-border transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-7">
              <h4 className="font-bricolage text-3xl font-bold tracking-tight text-cream mb-3">
                {cls.name}
              </h4>
              <p className="font-inter text-cream/60 text-sm leading-relaxed mb-6">
                {cls.description}
              </p>

              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Time", value: cls.time, icon: Clock3 },
                  { label: "Level", value: cls.level, icon: Sparkles },
                ].map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="p-4 rounded-2xl bg-plum-light border border-plum-border flex flex-col gap-1.5"
                  >
                    <Icon size={14} className="text-mango" aria-hidden="true" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-cream/40 font-semibold">
                      {label}
                    </p>
                    <p className="font-inter text-xs font-bold text-cream">{value}</p>
                  </div>
                ))}
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-plum-light border border-plum-border flex items-center gap-3 mb-8">
                <MapPin size={16} className="text-hibiscus shrink-0" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-cream/40 font-semibold mb-0.5">
                    Location
                  </p>
                  <p className="font-inter text-xs font-bold text-cream">{cls.location}</p>
                </div>
              </div>

              {/* Book CTA */}
              <button
                onClick={() => { onClose(); onBook(cls); }}
                className="w-full py-4 rounded-2xl font-mono text-xs uppercase tracking-[0.18em] font-bold bg-lime text-plum hover:bg-[#d4f94e] transition-all shadow-lg shadow-[#C8F03C]/20"
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

// ─── Schedule Card ────────────────────────────────────────────────────────────
function ClassCard({ cls, onOpen, onBook }) {
  const prefersReduced = useReducedMotion();

  // Mango-led accent strip; lime pop on hover
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: prefersReduced ? 0 : 0.2 }}
      className="bg-plum-light border border-plum-border rounded-3xl p-6 flex flex-col justify-between hover:border-mango/50 transition-all cursor-pointer group relative overflow-hidden"
      onClick={() => onOpen(cls.id)}
    >
      {/* Top accent strip — hidden until hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-mango via-hibiscus to-lime opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Day pill + level badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-mango bg-mango/10 px-3 py-1 rounded-full border border-mango/30">
            {cls.dayFull}
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-cream/40 bg-plum/50 px-2.5 py-1 rounded-lg">
            {cls.level}
          </span>
        </div>

        {/* Class name */}
        <h3 className="font-bricolage text-2xl font-bold text-cream mb-2 group-hover:text-lime transition-colors">
          {cls.name}
        </h3>

        {/* Description */}
        <p className="font-inter text-cream/50 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2">
          {cls.description}
        </p>
      </div>

      {/* Footer row */}
      <div>
        <div className="pt-4 border-t border-plum-border mb-4 flex items-center justify-between text-xs text-cream/50">
          <span className="flex items-center gap-2 font-inter font-semibold">
            <Clock3 size={14} className="text-mango" /> {cls.time}
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] uppercase text-cream/30">
            <MapPin size={12} className="text-hibiscus" /> {shortLocation(cls.location)}
          </span>
        </div>

        {/* Book button */}
        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-lime text-plum hover:bg-[#d4f94e] shadow-md shadow-[#C8F03C]/10 transition-all"
          onClick={(e) => { e.stopPropagation(); onBook(cls); }}
        >
          Book Now <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Schedule() {
  const prefersReduced = useReducedMotion();
  const [activeDay, setActiveDay] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [bookCls, setBookCls] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  // Locations derived from data
  const locations = [
    { value: "All", label: "All Venues" },
    { value: "Resh Dance Studio Kandy", label: "Resh Dance Studio" },
    { value: "Nimal Senanayake Academy of Performing Arts", label: "Se Kala Academy" },
  ];

  const filtered = scheduleData.filter((c) => {
    const matchDay = activeDay === "All" || c.day === activeDay;
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchLoc = selectedLocation === "All" || c.location === selectedLocation;
    return matchDay && matchSearch && matchLoc;
  });

  const openCls = openId ? scheduleData.find((c) => c.id === openId) ?? null : null;

  return (
    <section
      id="schedule"
      ref={ref}
      className="relative py-28 px-4 sm:px-6 bg-plum text-cream selection:bg-lime selection:text-plum"
    >
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 border-b border-plum-border pb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mango/10 border border-mango/30 text-mango font-mono text-xs font-bold uppercase tracking-[0.2em] mb-3">
              <Sparkles size={12} /> Weekly Timetable
            </div>
            <h2 className="font-bricolage text-4xl sm:text-5xl font-extrabold tracking-tight text-cream">
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
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                    isSel
                      ? "bg-mango text-plum shadow-lg shadow-[#FF9736]/20"
                      : "bg-plum-light border border-plum-border text-cream/50 hover:border-mango/40 hover:text-cream"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Search & Location Filter ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-10">
          {/* Search */}
          <div className="relative md:col-span-7">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cream/30">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by class name or location…"
              className="w-full pl-11 pr-4 py-3.5 bg-plum-light border border-plum-border rounded-2xl font-inter text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-mango/60 transition-colors"
            />
          </div>

          {/* Location filter */}
          <div className="flex items-center gap-2 md:col-span-5">
            <span className="font-mono text-xs uppercase text-cream/40 font-bold flex items-center gap-1.5 shrink-0 pl-1">
              <Filter size={14} /> Venue:
            </span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-plum-light border border-plum-border rounded-2xl font-mono text-xs uppercase font-bold text-cream px-4 py-3.5 focus:outline-none focus:border-mango/60 cursor-pointer transition-colors"
            >
              {locations.map((location) => (
                <option key={location.value} value={location.value} className="bg-plum-light">
                  {location.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Cards Grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((cls, idx) => (
                <ClassCard
                  key={cls.id}
                  cls={cls}
                  idx={idx}
                  activeDay={activeDay}
                  onOpen={(id) => setOpenId(id)}
                  onBook={(c) => setBookCls(c)}
                />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full border border-dashed border-plum-border rounded-3xl py-20 text-center bg-plum-light/30"
              >
                <Calendar size={32} className="mx-auto text-cream/20 mb-3" />
                <p className="font-bricolage text-2xl font-bold text-cream mb-1">
                  No classes match
                </p>
                <p className="font-inter text-xs text-cream/40 mb-5">
                  Try a different day or clear your filters.
                </p>
                <button
                  onClick={() => { setActiveDay("All"); setSearchQuery(""); setSelectedLocation("All"); }}
                  className="font-mono text-xs uppercase font-bold px-5 py-2.5 rounded-xl bg-plum-light border border-plum-border text-cream hover:border-mango/40 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Modals ──────────────────────────────────────────────────────────── */}
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