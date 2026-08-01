import { useState, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, HelpCircle, Search, Sparkles, Star, X } from "lucide-react";
import faqs from "../../data/faq.json";

const FALLBACK_ICONS = [
  <HelpCircle size={18} strokeWidth={2.2} key="help" />, 
  <Sparkles size={18} strokeWidth={2.2} key="sparkles" />,
  <Star size={18} strokeWidth={2.2} key="star" />,
];

// ─── Brand tokens ─────────────────────────────────────────────────────────────
// cream: #FAF4E9 | hibiscus: #E23F73 | mango: #FF9736 | plum: #2B1330 | lime: #C8F03C

function FAQ() {
  const prefersReduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);
  const [query, setQuery] = useState("");

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

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-28 bg-plum text-cream selection:bg-lime selection:text-plum"
    >
      {/* Dot grid — cream on plum */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #FAF4E9 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Mango glow — bottom-left */}
      <div aria-hidden="true" className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(255,151,54,0.12)" }} />

      {/* Hibiscus glow — top-right */}
      <div aria-hidden="true" className="absolute -top-16 -right-16 w-60 h-60 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(226,63,115,0.09)" }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block uppercase tracking-[8px] text-mango text-xs font-bold font-mono mb-3 px-3 py-1 rounded-full bg-mango/10 border border-mango/25">
            Frequently Asked Questions
          </span>

          <h2 className="font-bricolage text-5xl sm:text-7xl font-black tracking-tight mb-4 text-cream leading-none">
            Before You{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #FF9736, #E23F73, #C8F03C)" }}>
              Book
            </span>
          </h2>

          <p className="text-cream/50 text-sm sm:text-base leading-relaxed max-w-md mx-auto font-inter">
            Everything you need to know before joining your first Zumba class.
          </p>
        </motion.div>

        {/* ── Search ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="relative mb-8"
        >
          <Search size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-mango pointer-events-none"
            strokeWidth={2.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="w-full pl-11 pr-11 py-3.5 rounded-2xl text-sm font-inter text-cream bg-plum-light border border-plum-border placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-mango/40 transition-all"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }}
                onClick={() => setQuery("")} aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center bg-cream/10 hover:bg-cream/20 transition-colors cursor-pointer"
              >
                <X size={13} className="text-cream/60" strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── List ─────────────────────────────────────────────────────── */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {filtered.map((item, listIndex) => {
                const isOpen = item.originalIndex === openIndex;
                const icon   = item.icon ?? FALLBACK_ICONS[item.originalIndex % FALLBACK_ICONS.length];

                return (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: prefersReduced ? 0 : 24, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                    transition={{ duration: 0.45, delay: prefersReduced ? 0 : listIndex * 0.07, type: "spring", bounce: 0.25 }}
                    viewport={{ once: true, margin: "-40px" }}
                    className="rounded-3xl overflow-hidden transition-all duration-300"
                    style={{
                      background: isOpen ? "#38203f" : "rgba(250,244,233,0.04)",
                      border:     isOpen ? "1px solid rgba(255,151,54,0.45)" : "1px solid rgba(250,244,233,0.10)",
                      boxShadow:  isOpen ? "0 12px 40px rgba(0,0,0,0.30)" : "none",
                    }}
                  >
                    <div className="flex">
                      {/* Accent bar */}
                      <div className="w-1 shrink-0 rounded-l-3xl transition-opacity duration-300"
                        style={{ background: "linear-gradient(180deg, #FF9736, #E23F73)", opacity: isOpen ? 1 : 0 }} />

                      <div className="flex-1 min-w-0">
                        <button
                          type="button"
                          onClick={() => setOpenIndex(isOpen ? -1 : item.originalIndex)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center gap-4 px-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2 cursor-pointer"
                        >
                          {/* Icon */}
                          <span className="shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-all duration-300"
                            style={{
                              background: isOpen ? "linear-gradient(135deg, #FF9736, #E23F73)" : "rgba(255,151,54,0.15)",
                              transform:  isOpen ? "scale(1.05)" : "scale(1)",
                              boxShadow:  isOpen ? "0 4px 14px rgba(255,151,54,0.30)" : "none",
                            }}>
                            {icon}
                          </span>

                          {/* Question */}
                          <span className="flex-1 text-base sm:text-lg font-black font-bricolage tracking-tight leading-snug transition-colors"
                            style={{ color: isOpen ? "#FF9736" : "#FAF4E9" }}>
                            {item.question}
                          </span>

                          {/* Chevron */}
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.35, type: "spring", stiffness: 280, damping: 22 }}
                            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                            style={{ background: "linear-gradient(135deg, #FF9736, #E23F73)" }}
                          >
                            <ChevronDown size={16} className="text-white" strokeWidth={2.5} />
                          </motion.div>
                        </button>

                        {/* Answer */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0, y: -6 }}
                              animate={{ height: "auto", opacity: 1, y: 0 }}
                              exit={{ height: 0, opacity: 0, y: -4 }}
                              transition={{
                                height:  { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 0.28, delay: 0.05 },
                                y:       { duration: 0.28, delay: 0.05 },
                              }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-6 pt-4 text-sm sm:text-base leading-relaxed font-inter text-cream/60"
                                style={{ borderTop: "1px solid rgba(250,244,233,0.08)" }}>
                                {item.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}
              className="text-center py-16 rounded-3xl bg-plum-light border border-plum-border"
            >
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="font-bricolage font-black text-xl text-cream/70">No results for "{query}"</p>
              <p className="font-inter text-sm text-cream/40 mt-2">
                Try a different keyword or{" "}
                <button onClick={() => setQuery("")}
                  className="text-mango underline underline-offset-2 cursor-pointer hover:text-hibiscus transition-colors">
                  clear the search
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default FAQ;