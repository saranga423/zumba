import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Star, Quote, TrendingDown, PenLine, X, Send,
  CheckCircle2, ChevronLeft, ChevronRight,
} from "lucide-react";
import testimonials from "../../data/testimonials.json";
import SectionLabel from "../ui/SectionLabel";

// ── Helpers ───────────────────────────────────────────────────────────────────
const AVATAR_COLORS = ["#E23F73","#FF9736","#9AC900","#7C3AED","#0EA5E9","#F59E0B"];

function getInitials(name) {
  return name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}
function getAvatarColor(name) {
  let h = 0;
  for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  page:       "#FFFFFF",
  surface:    "#F6F4F0",
  border:     "#E8E4DE",
  ink:        "#1A1118",
  inkMid:     "#6B6070",
  inkFaint:   "#B8B0BC",
  pink:       "#E23F73",
  pinkLight:  "#fde8ef",
  pinkBorder: "#f9bad0",
  pinkDark:   "#b01d4e",
  mango:      "#FF9736",
  lime:       "#9AC900",
  yellow:     "#F59E0B",
  accentBar:  "linear-gradient(90deg,#E23F73,#FF9736,#9AC900)",
};

// ── Stats ─────────────────────────────────────────────────────────────────────
function computeStats(items) {
  if (!items.length) return { avg: "0.0", dist: [], total: 0 };
  const avg = (items.reduce((s, t) => s + t.rating, 0) / items.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map((star) => {
    const count = items.filter((t) => t.rating === star).length;
    return { star, count, pct: Math.round((count / items.length) * 100) };
  });
  return { avg, dist, total: items.length };
}

// ── StarRow ───────────────────────────────────────────────────────────────────
function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={0}
          style={{ fill: i < rating ? T.yellow : "#D9D3CF" }} />
      ))}
    </div>
  );
}

// ── StarPicker ────────────────────────────────────────────────────────────────
function StarPicker({ value, onChange }) {
  const [hov, setHov] = useState(0);
  return (
    <div className="flex gap-1.5" role="group" aria-label="Select rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < (hov || value);
        return (
          <button key={i} type="button"
            aria-label={`${i + 1} star${i ? "s" : ""}`}
            onClick={() => onChange(i + 1)}
            onMouseEnter={() => setHov(i + 1)}
            onMouseLeave={() => setHov(0)}
            className="transition-transform active:scale-90"
            style={{ transform: hov === i + 1 ? "scale(1.18)" : "scale(1)" }}
          >
            <Star size={30} strokeWidth={on ? 0 : 1.5}
              style={{ fill: on ? T.yellow : "transparent", color: on ? T.yellow : T.inkFaint,
                       filter: on ? "drop-shadow(0 0 4px rgba(245,158,11,0.5))" : "none" }} />
          </button>
        );
      })}
    </div>
  );
}

// ── RatingSummary ─────────────────────────────────────────────────────────────
function RatingSummary({ items, inView }) {
  const { avg, dist, total } = computeStats(items);
  const numAvg = parseFloat(avg);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 px-6 py-6 rounded-2xl border"
      style={{ background: T.surface, borderColor: T.border }}>

      {/* Left: big score */}
      <div className="flex flex-col items-center justify-center shrink-0 sm:pr-6 sm:border-r"
        style={{ borderColor: T.border }}>
        <div className="text-6xl font-extrabold leading-none tabular-nums"
          style={{ color: T.ink, fontVariantNumeric: "tabular-nums" }}>{avg}</div>
        <StarRow rating={Math.round(numAvg)} size={18} />
        <div className="text-xs font-semibold mt-2 tracking-wide"
          style={{ color: T.inkFaint }}>{total} review{total !== 1 ? "s" : ""}</div>
      </div>

      {/* Right: bar chart */}
      <div className="flex-1 w-full flex flex-col justify-center gap-2">
        {dist.map(({ star, pct, count }) => (
          <div key={star} className="flex items-center gap-2.5">
            <span className="text-[11px] font-bold w-3 text-right shrink-0 tabular-nums"
              style={{ color: T.inkMid }}>{star}</span>
            <Star size={9} strokeWidth={0} style={{ fill: T.yellow, flexShrink: 0 }} />
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: T.border }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: inView ? `${pct}%` : 0 }}
                transition={{ duration: 0.9, delay: (5 - star) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg,${T.pink},${T.mango})` }}
              />
            </div>
            <span className="text-[10px] w-5 shrink-0 tabular-nums text-right"
              style={{ color: T.inkFaint }}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TestimonialCard ───────────────────────────────────────────────────────────
function TestimonialCard({ item, compact = false }) {
  return (
    <div className="flex flex-col h-full rounded-2xl border"
      style={{
        background: "#FFFFFF",
        borderColor: T.pink,
        boxShadow: "0 2px 24px rgba(226,63,115,0.10), 0 1px 4px rgba(26,17,24,0.05)",
        padding: compact ? "20px" : "28px",
      }}>

      <Quote size={24} strokeWidth={0} fill={T.pink}
        style={{ opacity: 0.35, marginBottom: 12, flexShrink: 0 }} />

      <p className="leading-relaxed flex-1"
        style={{ color: T.inkMid, fontSize: compact ? 13 : 14 }}>
        {item.quote}
      </p>

      {item.transformation && (
        <div className="inline-flex items-center gap-1.5 self-start mt-4 rounded-full px-3 py-1"
          style={{ background: T.pinkLight, border: `1px solid ${T.pinkBorder}` }}>
          <TrendingDown size={11} style={{ color: T.pink }} strokeWidth={2.5} />
          <span className="text-xs font-bold" style={{ color: T.pinkDark }}>{item.transformation}</span>
        </div>
      )}

      <div className="flex items-center gap-3 mt-5 pt-5 border-t" style={{ borderColor: T.border }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs"
          style={{ background: item.avatarColor }}>{item.initials}</div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm leading-tight truncate" style={{ color: T.ink }}>{item.name}</p>
          <p className="text-xs mt-0.5" style={{ color: T.inkFaint }}>{item.since}</p>
        </div>
        <StarRow rating={item.rating} size={13} />
      </div>
    </div>
  );
}

// ── Ghost card (faded peek) ───────────────────────────────────────────────────
function GhostCard({ item }) {
  return (
    <div className="h-full rounded-2xl border p-6 flex flex-col"
      style={{ background: T.surface, borderColor: T.border }}>
      <Quote size={20} strokeWidth={0} fill={T.inkFaint}
        style={{ opacity: 0.25, marginBottom: 10, flexShrink: 0 }} />
      <p className="text-xs leading-relaxed flex-1 line-clamp-5"
        style={{ color: T.inkFaint }}>{item.quote}</p>
      <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: T.border }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[10px]"
          style={{ background: item.avatarColor }}>{item.initials}</div>
        <p className="text-xs font-semibold truncate" style={{ color: T.inkFaint }}>{item.name}</p>
      </div>
    </div>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────
function Carousel({ items }) {
  const [index, setIndex] = useState(0);
  const [dir,   setDir]   = useState(0);
  const total = items.length;
  const dragStartX = useRef(null);

  const go = useCallback((d) => {
    setDir(d);
    setIndex((i) => (i + d + total) % total);
  }, [total]);

  // Auto-advance every 6 s (pause on interaction)
  const timerRef = useRef(null);
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(1), 6000);
  };
  useEffect(() => { resetTimer(); return () => clearInterval(timerRef.current); }, [go]);

  const handleGo = (d) => { resetTimer(); go(d); };
  const handleDot = (i) => { setDir(i > index ? 1 : -1); setIndex(i); resetTimer(); };

  // Swipe support
  const onPointerDown = (e) => { dragStartX.current = e.clientX; };
  const onPointerUp   = (e) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > 40) handleGo(dx < 0 ? 1 : -1);
  };

  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;

  const mainVariants = {
    enter: (d) => ({ x: d > 0 ? "40%" : "-40%", opacity: 0, scale: 0.94 }),
    center:      { x: 0, opacity: 1, scale: 1 },
    exit:  (d) => ({ x: d > 0 ? "-40%" : "40%", opacity: 0, scale: 0.94 }),
  };

  return (
    <div className="select-none">
      {/* 3-column peek layout */}
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* Left ghost — clickable */}
        <button type="button" onClick={() => handleGo(-1)} aria-label="Previous review"
          className="rounded-2xl text-left transition-opacity duration-300 hover:opacity-70"
          style={{ minHeight: 240 }}>
          <GhostCard item={items[prev]} />
        </button>

        {/* Active card */}
        <div className="overflow-hidden rounded-2xl" style={{ minHeight: 240 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={index} custom={dir}
              variants={mainVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <TestimonialCard item={items[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right ghost — clickable */}
        <button type="button" onClick={() => handleGo(1)} aria-label="Next review"
          className="rounded-2xl text-left transition-opacity duration-300 hover:opacity-70"
          style={{ minHeight: 240 }}>
          <GhostCard item={items[next]} />
        </button>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between mt-5">
        {/* Pill dots */}
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button key={i} type="button" onClick={() => handleDot(i)}
              aria-label={`Review ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                height: 6,
                width:  i === index ? 22 : 6,
                background: i === index
                  ? `linear-gradient(90deg,${T.pink},${T.mango})`
                  : T.border,
              }}
            />
          ))}
        </div>

        {/* Counter + arrows */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold tabular-nums" style={{ color: T.inkFaint }}>
            {index + 1} / {total}
          </span>
          <div className="flex gap-1.5">
            {[[-1, ChevronLeft], [1, ChevronRight]].map(([d, Icon]) => (
              <button key={d} type="button" onClick={() => handleGo(d)}
                aria-label={d < 0 ? "Previous" : "Next"}
                className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200"
                style={{ background: "#fff", borderColor: T.border, color: T.inkMid }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = T.pink;
                  e.currentTarget.style.color = T.pink;
                  e.currentTarget.style.background = T.pinkLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.color = T.inkMid;
                  e.currentTarget.style.background = "#fff";
                }}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AddReviewModal ────────────────────────────────────────────────────────────
function AddReviewModal({ onClose, onSubmit }) {
  const [form,  setForm]  = useState({ name: "", quote: "", rating: 0 });
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name.trim())  return setError("Please enter your name.");
    if (!form.quote.trim()) return setError("Please write your review.");
    if (!form.rating)       return setError("Please select a star rating.");
    setError("");
    onSubmit(form);
  };

  // Close on Escape
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  const fieldStyle = {
    background: T.surface,
    border: `1.5px solid ${T.border}`,
    color: T.ink,
    borderRadius: 12,
    padding: "10px 14px",
    fontSize: 14,
    width: "100%",
    outline: "none",
    transition: "border-color 0.18s, box-shadow 0.18s",
    fontFamily: "inherit",
  };
  const focusStyle = { borderColor: T.pink, boxShadow: `0 0 0 3px rgba(226,63,115,0.10)` };
  const blurStyle  = { borderColor: T.border, boxShadow: "none" };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(26,17,24,0.50)", backdropFilter: "blur(10px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full sm:max-w-md shadow-2xl"
        style={{
          background: "#FFFFFF",
          border: `1px solid ${T.border}`,
          borderRadius: "24px 24px 0 0",
        }}
        // Fully rounded on desktop
        data-sm-rounded="24px"
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-0 sm:hidden">
          <div className="w-10 h-1 rounded-full" style={{ background: T.border }} />
        </div>

        <div className="p-6 sm:p-8">
          {/* Close */}
          <button type="button" onClick={onClose} aria-label="Close"
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: T.surface, color: T.inkMid }}
            onMouseEnter={(e) => e.currentTarget.style.background = T.border}
            onMouseLeave={(e) => e.currentTarget.style.background = T.surface}
          >
            <X size={15} />
          </button>

          {/* Accent strip */}
          <div className="h-1 w-12 rounded-full mb-5" style={{ background: T.accentBar }} />

          <h3 className="font-bebas text-3xl leading-none mb-1" style={{ color: T.ink }}>
            Leave a <span style={{ color: T.pink }}>Review</span>
          </h3>
          <p className="text-xs mb-6" style={{ color: T.inkFaint }}>
            Share your Zumba experience with the community
          </p>

          <div className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-[11px] font-bold tracking-widest mb-1.5"
                style={{ color: T.inkMid }}>Your name</label>
              <input type="text" placeholder="e.g. Nimasha P." value={form.name}
                onChange={set("name")} maxLength={40} style={fieldStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
              />
            </div>

            {/* Review */}
            <div>
              <label className="block text-[11px] font-bold tracking-widest mb-1.5"
                style={{ color: T.inkMid }}>Your review</label>
              <textarea placeholder="What did you love about the classes?" value={form.quote}
                onChange={set("quote")} maxLength={300} rows={4}
                style={{ ...fieldStyle, resize: "none" }}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
              />
              <p className="text-right text-[10px] mt-1" style={{ color: T.inkFaint }}>
                {form.quote.length} / 300
              </p>
            </div>

            {/* Stars */}
            <div>
              <label className="block text-[11px] font-bold tracking-widest mb-2"
                style={{ color: T.inkMid }}>Your rating</label>
              <StarPicker value={form.rating}
                onChange={(r) => setForm((p) => ({ ...p, rating: r }))} />
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-xs mt-3" style={{ color: T.pink }}>{error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button type="button" onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 font-bold text-sm tracking-wide px-6 py-3.5 rounded-xl mt-5 transition-all active:scale-[0.98]"
            style={{ background: T.pink, color: "#fff",
                     boxShadow: `0 4px 20px rgba(226,63,115,0.28)` }}
            onMouseEnter={(e) => e.currentTarget.style.filter = "brightness(1.08)"}
            onMouseLeave={(e) => e.currentTarget.style.filter = "none"}
          >
            <Send size={14} strokeWidth={2.5} /> Submit Review
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── ThankYou ──────────────────────────────────────────────────────────────────
function ThankYou({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(26,17,24,0.50)", backdropFilter: "blur(10px)" }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="flex flex-col items-center text-center max-w-xs w-full shadow-2xl"
        style={{ background: "#FFFFFF", border: `1px solid ${T.border}`, borderRadius: 24, padding: 40 }}
      >
        <div className="h-1 w-16 rounded-full mb-8" style={{ background: T.accentBar }} />

        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
            style={{ background: T.pinkLight }}>
            <CheckCircle2 size={36} strokeWidth={1.5} style={{ color: T.pink }} />
          </div>
        </motion.div>

        <h3 className="font-bebas text-4xl leading-none mb-2" style={{ color: T.ink }}>
          Thank you!
        </h3>
        <p className="text-sm leading-relaxed mb-8" style={{ color: T.inkMid }}>
          Your review has been added. We love hearing from our crew! 🎉
        </p>
        <button type="button" onClick={onClose}
          className="font-bold text-sm tracking-wide px-8 py-3 rounded-xl transition-all active:scale-95"
          style={{ background: T.pink, color: "#fff", boxShadow: `0 4px 20px rgba(226,63,115,0.28)` }}
          onMouseEnter={(e) => e.currentTarget.style.filter = "brightness(1.08)"}
          onMouseLeave={(e) => e.currentTarget.style.filter = "none"}
        >
          Back to Reviews
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [ref, inView]    = useInView({ triggerOnce: true, threshold: 0.08 });
  const [userReviews, setUserReviews] = useState([]);
  const [showModal,   setShowModal]   = useState(false);
  const [showThanks,  setShowThanks]  = useState(false);

  const all = [...testimonials, ...userReviews];

  const handleSubmit = (form) => {
    setUserReviews((prev) => [{
      id:             `user-${Date.now()}`,
      name:           form.name,
      initials:       getInitials(form.name),
      avatarColor:    getAvatarColor(form.name),
      quote:          form.quote,
      rating:         form.rating,
      since:          "New member",
      transformation: null,
    }, ...prev]);
    setShowModal(false);
    setShowThanks(true);
  };

  return (
    <>
      <section
        id="testimonials"
        ref={ref}
        className="relative overflow-hidden py-20"
        style={{ background: T.page }}
      >
        {/* Top accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
          style={{ background: T.accentBar }} />

        {/* Ambient blobs */}
        <div className="absolute top-16 -left-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(226,63,115,0.06) 0%,transparent 70%)" }} />
        <div className="absolute bottom-16 -right-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(245,158,11,0.06) 0%,transparent 70%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <SectionLabel>Real Talk</SectionLabel>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-2">
              <h2 className="font-bebas text-5xl md:text-6xl leading-none" style={{ color: T.ink }}>
                Loved by{" "}
                <span style={{
                  background: `linear-gradient(135deg,${T.pink},${T.mango})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>our crew</span>
              </h2>

              <button type="button" onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 self-start sm:self-auto font-bold text-sm tracking-wide px-5 py-2.5 rounded-xl border shrink-0 transition-all active:scale-95"
                style={{ background: "#fff", borderColor: T.pink, color: T.pink }}
                onMouseEnter={(e) => { e.currentTarget.style.background = T.pinkLight; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
              >
                <PenLine size={14} strokeWidth={2.5} /> Write a review
              </button>
            </div>

            <div className="mt-5 h-px" style={{ background: T.border }} />
          </motion.div>

          {/* ── Rating summary ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.48, delay: 0.08 }}
            className="mb-7"
          >
            <RatingSummary items={all} inView={inView} />
          </motion.div>

          {/* ── Carousel ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.48, delay: 0.16 }}
          >
            {all.length >= 3 ? (
              <Carousel items={all} />
            ) : all.length > 0 ? (
              /* Fallback: just show cards in a simple column if fewer than 3 */
              <div className="flex flex-col gap-4">
                {all.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-sm" style={{ color: T.inkFaint }}>
                No reviews yet — be the first!
              </div>
            )}
          </motion.div>

        </div>
      </section>

      <AnimatePresence>
        {showModal && (
          <AddReviewModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />
        )}
        {showThanks && (
          <ThankYou onClose={() => setShowThanks(false)} />
        )}
      </AnimatePresence>
    </>
  );
}