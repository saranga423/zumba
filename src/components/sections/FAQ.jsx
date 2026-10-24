import { useState, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown, HelpCircle, MessageCircle,
  Search, Sparkles, Star, X,
} from "lucide-react";
import faqs from "../../data/faq.json";

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE  — light theme, consistent across all sections
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  base:    "#FAFAF8",
  card:    "#FFFFFF",
  ink:     "#150A16",
  pink:    "#E8295E",
  lime:    "#B5DB1A",
  coral:   "#FF6B35",
  border:  "rgba(21,10,22,0.07)",
  surface: "rgba(21,10,22,0.04)",
  muted:   "rgba(21,10,22,0.38)",
  subtle:  "rgba(21,10,22,0.55)",
};

const FALLBACK_ICONS = [
  <HelpCircle size={18} strokeWidth={2.2} key="help"      />,
  <Sparkles   size={18} strokeWidth={2.2} key="sparkles"  />,
  <Star       size={18} strokeWidth={2.2} key="star"      />,
];

// Pre-filled WhatsApp link for the bottom CTA
const WA_LINK = `https://wa.me/94703444430?text=${encodeURIComponent(
  "Hi Hanna! I have a question about your Zumba classes."
)}`;

// ─────────────────────────────────────────────────────────────────────────────
// ANSWER PANEL  (desktop right column)
// ─────────────────────────────────────────────────────────────────────────────

function AnswerPanel({ item, prefersReduced }) {
  if (!item) return null;
  const icon = item.icon ?? FALLBACK_ICONS[item.originalIndex % FALLBACK_ICONS.length];
  const num  = String(item.originalIndex + 1).padStart(2, "0");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl p-8 overflow-hidden h-full"
        style={{
          background: C.card,
          border:     `1px solid ${C.border}`,
          boxShadow:  "0 8px 40px rgba(21,10,22,0.06), 0 2px 8px rgba(21,10,22,0.04)",
        }}
      >
        {/* Ghost number watermark */}
        <div
          aria-hidden="true"
          className="absolute top-4 right-6 font-black leading-none select-none"
          style={{
            fontSize:         "clamp(5rem,12vw,8rem)",
            color:            "transparent",
            WebkitTextStroke: "1.5px rgba(232,41,94,0.1)",
            fontFamily:       "'Syne', sans-serif",
          }}
        >
          {num}
        </div>

        {/* Subtle top gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, ${C.pink}, ${C.coral}, ${C.lime})` }}
        />

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-md"
          style={{
            background: `linear-gradient(135deg, ${C.pink}, ${C.coral})`,
            color:       "#FFFFFF",
          }}
        >
          {icon}
        </div>

        {/* Question */}
        <h3
          className="font-black leading-snug tracking-tight mb-5 pr-16"
          style={{
            color:      C.ink,
            fontFamily: "'Syne', sans-serif",
            fontSize:   "clamp(1.2rem,2.5vw,1.6rem)",
          }}
        >
          {item.question}
        </h3>

        {/* Pink divider */}
        <div
          className="w-10 h-0.5 mb-6 rounded-full"
          style={{ background: `linear-gradient(90deg, ${C.pink}, ${C.coral})` }}
        />

        {/* Answer */}
        <p
          className="text-sm sm:text-base leading-relaxed"
          style={{ color: C.subtle }}
        >
          {item.answer}
        </p>

        {/* Bottom label */}
        <div className="mt-8 flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: C.lime }}
          />
          <span
            className="font-mono text-[10px] uppercase tracking-[2px] font-bold"
            style={{ color: C.muted }}
          >
            From Hanna
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION LIST ITEM  (desktop left column)
// ─────────────────────────────────────────────────────────────────────────────

function QuestionItem({ item, isActive, onClick }) {
  const icon = item.icon ?? FALLBACK_ICONS[item.originalIndex % FALLBACK_ICONS.length];
  const num  = String(item.originalIndex + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className="group w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all duration-200 relative"
      style={{
        background: isActive ? "rgba(232,41,94,0.07)"  : "transparent",
        border:     `1px solid ${isActive ? "rgba(232,41,94,0.2)" : "transparent"}`,
      }}
    >
      {/* Active left border */}
      <div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-300"
        style={{
          background: `linear-gradient(180deg, ${C.pink}, ${C.coral})`,
          opacity:    isActive ? 1 : 0,
        }}
      />

      {/* Icon badge */}
      <span
        className="shrink-0 flex h-7 w-7 items-center justify-center rounded-xl"
        style={{
          background: isActive ? "rgba(232,41,94,0.12)" : "rgba(255,255,255,0.02)",
          color:      isActive ? C.pink : C.coral,
          border:     `1px solid ${isActive ? "rgba(232,41,94,0.18)" : "transparent"}`,
        }}
        aria-hidden="true"
      >
        {icon}
      </span>

      {/* Number */}
      <span
        className="font-mono text-[10px] font-bold shrink-0 tabular-nums"
        style={{ color: isActive ? C.pink : C.muted }}
      >
        {num}
      </span>

      {/* Question text */}
      <span
        className="text-sm font-semibold leading-snug flex-1 min-w-0"
        style={{ color: isActive ? C.pink : C.subtle }}
      >
        {item.question}
      </span>

      {/* Chevron on hover/active */}
      <ChevronDown
        size={14}
        strokeWidth={2.5}
        className="shrink-0 -rotate-90 transition-all duration-200"
        style={{
          color:   isActive ? C.pink : "transparent",
          opacity: isActive ? 1 : 0,
        }}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE ACCORDION ITEM
// ─────────────────────────────────────────────────────────────────────────────

function AccordionItem({ item, isOpen, onToggle, index, prefersReduced }) {
  const icon = item.icon ?? FALLBACK_ICONS[item.originalIndex % FALLBACK_ICONS.length];

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: prefersReduced ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: C.card,
        border:     `1px solid ${isOpen ? "rgba(232,41,94,0.25)" : C.border}`,
        boxShadow:  isOpen
          ? "0 8px 32px rgba(232,41,94,0.1), 0 2px 8px rgba(21,10,22,0.06)"
          : "0 2px 6px rgba(21,10,22,0.04)",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
    >
      {/* Pink top gradient strip — visible when open */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${C.pink}, ${C.coral}, ${C.lime})`,
          opacity:    isOpen ? 1 : 0,
        }}
      />

      {/* Question button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-4 px-5 py-5 text-left cursor-pointer"
      >
        {/* Icon badge */}
        <span
          className="shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen
              ? `linear-gradient(135deg, ${C.pink}, ${C.coral})`
              : C.surface,
            color:      isOpen ? "#FFFFFF" : C.coral,
            boxShadow:  isOpen ? `0 4px 14px rgba(232,41,94,0.3)` : "none",
          }}
        >
          {icon}
        </span>

        {/* Question */}
        <span
          className="flex-1 text-base font-black leading-snug tracking-tight transition-colors"
          style={{
            color:      isOpen ? C.pink : C.ink,
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {item.question}
        </span>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, type: "spring", stiffness: 280, damping: 22 }}
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: isOpen ? `linear-gradient(135deg, ${C.pink}, ${C.coral})` : C.surface,
            border:     isOpen ? "none" : `1px solid ${C.border}`,
          }}
        >
          <ChevronDown
            size={16}
            strokeWidth={2.5}
            style={{ color: isOpen ? "#FFFFFF" : C.muted }}
          />
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height:  { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.26, delay: 0.06 },
            }}
            className="overflow-hidden"
          >
            <p
              className="px-5 pb-6 pt-3 text-sm sm:text-base leading-relaxed"
              style={{
                borderTop: `1px solid ${C.border}`,
                color:     C.subtle,
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function FAQ() {
  const prefersReduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);
  const [query,     setQuery]     = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs.map((item, i) => ({ ...item, originalIndex: i }));
    return faqs
      .map((item, i) => ({ ...item, originalIndex: i }))
      .filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
      );
  }, [query]);

  const updateQuery = (value) => {
    const q = value.trim().toLowerCase();
    const nextFiltered = faqs
      .map((item, i) => ({ ...item, originalIndex: i }))
      .filter(
        (item) =>
          !q ||
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
      );

    setQuery(value);
    setOpenIndex((current) => {
      const stillValid = nextFiltered.some(
        (item) => item.originalIndex === current
      );
      return !stillValid && nextFiltered.length > 0
        ? nextFiltered[0].originalIndex
        : current;
    });
  };

  const activeItem = filtered.find((item) => item.originalIndex === openIndex) ?? filtered[0] ?? null;

  const toggle = (originalIndex) =>
    setOpenIndex((prev) => (prev === originalIndex ? -1 : originalIndex));

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-28"
      style={{ background: C.base }}
    >
      {/* ── Background ───────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(21,10,22,0.1) 1px, transparent 1px)",
            backgroundSize:  "32px 32px",
            opacity:         0.4,
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: "rgba(232,41,94,0.06)" }}
        />
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px]"
          style={{ background: "rgba(181,219,26,0.06)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Eyebrow */}
          <span
            className="inline-block uppercase tracking-[8px] text-xs font-bold font-mono mb-3 px-3 py-1 rounded-full"
            style={{
              color:      C.coral,
              background: "rgba(255,107,53,0.08)",
              border:     "1px solid rgba(255,107,53,0.25)",
            }}
          >
            Frequently Asked Questions
          </span>

          {/* Headline */}
          <h2
            className="font-black tracking-tight mb-4 leading-none"
            style={{
              color:      C.ink,
              fontFamily: "'Syne', sans-serif",
              fontSize:   "clamp(2.8rem,8vw,5.5rem)",
            }}
          >
            Before You{" "}
            <span
              style={{
                backgroundImage:      `linear-gradient(90deg, ${C.pink}, ${C.coral}, ${C.lime})`,
                backgroundClip:       "text",
                WebkitBackgroundClip: "text",
                color:                "transparent",
              }}
            >
              Book
            </span>
          </h2>

          <p
            className="text-sm sm:text-base leading-relaxed max-w-md mx-auto"
            style={{ color: C.muted }}
          >
            Everything you need to know before joining your first Zumba class.
          </p>
        </motion.div>

        {/* ── Search ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="relative mb-10 max-w-lg mx-auto"
        >
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            strokeWidth={2.5}
            style={{ color: C.coral }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Search questions…"
            className="w-full pl-11 pr-11 py-3.5 rounded-2xl text-sm transition-all"
            style={{
              background: C.card,
              border:     `1px solid ${C.border}`,
              color:      C.ink,
              outline:    "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onFocus={(e)  => (e.target.style.borderColor = C.pink)}
            onBlur={(e)   => (e.target.style.borderColor = C.border)}
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                onClick={() => updateQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                style={{ background: C.surface }}
              >
                <X size={13} strokeWidth={2.5} style={{ color: C.muted }} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════
            DESKTOP — two-column layout (lg+)
        ════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex gap-6 items-start">

          {/* Left: question list */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-1 overflow-y-auto"
            style={{
              width:     "300px",
              flexShrink: 0,
              maxHeight: "520px",
              // Hide scrollbar but keep it functional
              scrollbarWidth: "none",
            }}
          >
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <QuestionItem
                  key={item.id}
                  item={item}
                  isActive={item.originalIndex === openIndex}
                  onClick={() => setOpenIndex(item.originalIndex)}
                />
              ))
            ) : (
              <div
                className="rounded-2xl px-4 py-6 text-center"
                style={{ background: C.surface, border: `1px solid ${C.border}` }}
              >
                <p className="text-sm font-semibold" style={{ color: C.muted }}>
                  No results for "{query}"
                </p>
                <button
                  onClick={() => updateQuery("")}
                  className="mt-2 text-xs font-bold underline underline-offset-2 transition-colors"
                  style={{ color: C.pink }}
                >
                  Clear search
                </button>
              </div>
            )}
          </motion.div>

          {/* Right: answer panel */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 min-w-0"
          >
            {activeItem ? (
              <AnswerPanel item={activeItem} prefersReduced={prefersReduced} />
            ) : (
              <div
                className="rounded-3xl p-8 flex flex-col items-center justify-center text-center"
                style={{
                  background: C.surface,
                  border:     `1.5px dashed ${C.border}`,
                  minHeight:  "260px",
                }}
              >
                <HelpCircle size={32} className="mb-3" style={{ color: C.muted }} />
                <p className="text-sm font-semibold" style={{ color: C.muted }}>
                  No results — try a different keyword
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            MOBILE — accordion (< lg)
        ════════════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {filtered.map((item, listIndex) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={item.originalIndex === openIndex}
                    onToggle={() => toggle(item.originalIndex)}
                    index={listIndex}
                    prefersReduced={prefersReduced}
                  />
                ))}
              </ul>
            ) : (
              <motion.div
                key="empty-mobile"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16 rounded-3xl"
                style={{
                  background: C.surface,
                  border:     `1.5px dashed ${C.border}`,
                }}
              >
                <span className="text-4xl mb-4 block">🔍</span>
                <p
                  className="font-black text-xl mb-1"
                  style={{ color: C.ink, fontFamily: "'Syne', sans-serif" }}
                >
                  No results for "{query}"
                </p>
                <p className="text-sm mt-2" style={{ color: C.muted }}>
                  Try a different keyword or{" "}
                  <button
                    onClick={() => updateQuery("")}
                    className="underline underline-offset-2 cursor-pointer font-bold transition-colors"
                    style={{ color: C.pink }}
                  >
                    clear the search
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Still have questions? CTA ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl p-7"
          style={{
            background: C.card,
            border:     `1px solid ${C.border}`,
            boxShadow:  "0 4px 20px rgba(21,10,22,0.05)",
          }}
        >
          <div>
            <p
              className="font-black text-lg mb-1"
              style={{ color: C.ink, fontFamily: "'Syne', sans-serif" }}
            >
              Still have a question?
            </p>
            <p className="text-sm" style={{ color: C.muted }}>
              Ask Hanna directly — she'll get back to you quickly.
            </p>
          </div>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] font-bold shrink-0 transition-all"
            style={{
              background: C.lime,
              color:      C.ink,
              boxShadow:  `0 6px 24px rgba(181,219,26,0.35)`,
            }}
          >
            {/* WhatsApp icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Ask on WhatsApp
            <MessageCircle size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default FAQ;