import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, TrendingDown, PenLine, X, Send, CheckCircle2 } from "lucide-react";
import testimonials from "../../data/testimonials.json";
import SectionLabel from "../ui/SectionLabel";

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ─── Avatar colour palette ────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "#E23F73", "#FF9736", "#C8F03C", "#7C3AED", "#0EA5E9", "#F59E0B",
];

function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function getAvatarColor(name) {
  let hash = 0;
  for (let c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─── StarRow ─────────────────────────────────────────────────────────────────
function StarRow({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          strokeWidth={0}
          className={i < rating ? "fill-yellow text-yellow" : "fill-white/15 text-white/15"}
        />
      ))}
    </div>
  );
}

// ─── Interactive star picker ──────────────────────────────────────────────────
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1" role="group" aria-label="Select rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < (hovered || value);
        return (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1} star${i > 0 ? "s" : ""}`}
            onClick={() => onChange(i + 1)}
            onMouseEnter={() => setHovered(i + 1)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded"
          >
            <Star
              size={26}
              strokeWidth={filled ? 0 : 1.5}
              className={filled ? "fill-yellow text-yellow" : "fill-transparent text-white/30"}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── Add Review Modal ─────────────────────────────────────────────────────────
function AddReviewModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", quote: "", rating: 0 });
  const [error, setError] = useState("");

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!form.quote.trim()) return setError("Please write your review.");
    if (form.rating === 0) return setError("Please select a star rating.");
    setError("");
    onSubmit(form);
  };

  const inputClass =
    "w-full bg-white/5 border border-white/15 hover:border-pink/40 focus:border-pink/70 focus:outline-none rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-md bg-[#1a0d22] border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <h3 className="font-bebas text-white text-3xl mb-1">
          LEAVE A <span className="text-pink">REVIEW</span>
        </h3>
        <p className="text-white/40 text-xs mb-7">
          Share your Zumba experience with the community!
        </p>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-white/50 text-[11px] font-bold uppercase tracking-widest mb-1.5">
            Your Name
          </label>
          <input
            type="text"
            placeholder="e.g. Nimasha P."
            value={form.name}
            onChange={set("name")}
            maxLength={40}
            className={inputClass}
          />
        </div>

        {/* Review */}
        <div className="mb-4">
          <label className="block text-white/50 text-[11px] font-bold uppercase tracking-widest mb-1.5">
            Your Review
          </label>
          <textarea
            placeholder="What did you love about the classes?"
            value={form.quote}
            onChange={set("quote")}
            maxLength={300}
            rows={4}
            className={`${inputClass} resize-none`}
          />
          <p className="text-right text-white/20 text-[11px] mt-1">
            {form.quote.length}/300
          </p>
        </div>

        {/* Stars */}
        <div className="mb-6">
          <label className="block text-white/50 text-[11px] font-bold uppercase tracking-widest mb-2">
            Rating
          </label>
          <StarPicker value={form.rating} onChange={(r) => setForm((p) => ({ ...p, rating: r }))} />
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-pink text-xs mb-4"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 bg-pink hover:bg-pink/85 text-white font-bold text-sm uppercase tracking-widest px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-pink/20 cursor-pointer"
        >
          <Send size={15} strokeWidth={2.5} />
          Submit Review
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Thank You overlay ────────────────────────────────────────────────────────
function ThankYou({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="flex flex-col items-center text-center bg-[#1a0d22] border border-white/10 rounded-3xl p-10 max-w-sm w-full shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", bounce: 0.5 }}
        >
          <CheckCircle2 size={56} className="text-pink mb-4" strokeWidth={1.5} />
        </motion.div>
        <h3 className="font-bebas text-white text-3xl mb-2">
          THANK YOU!
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-7">
          Your review has been added. We love hearing from our crew! 🎉
        </p>
        <button
          type="button"
          onClick={onClose}
          className="bg-pink hover:bg-pink/85 text-white font-bold text-sm uppercase tracking-widest px-8 py-3 rounded-xl transition-colors cursor-pointer"
        >
          Back to Reviews
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [userReviews, setUserReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const allTestimonials = [
    ...testimonials,
    ...userReviews,
  ];

  const handleSubmit = (form) => {
    const newReview = {
      id:           `user-${Date.now()}`,
      name:         form.name,
      initials:     getInitials(form.name),
      avatarColor:  getAvatarColor(form.name),
      quote:        form.quote,
      rating:       form.rating,
      since:        "New member",
      transformation: null,
    };
    setUserReviews((prev) => [newReview, ...prev]);
    setShowModal(false);
    setShowThankYou(true);
  };

  return (
    <>
      <section id="testimonials" className="relative overflow-hidden bg-dark py-24" ref={ref}>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* ── Header ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <SectionLabel>Real Talk</SectionLabel>
            <h2 className="font-bebas text-white text-5xl md:text-7xl mt-3">
              LOVED BY<span className="text-pink"> OUR CREW</span>
            </h2>
            <div className="w-28 h-1 bg-linear-to-r from-pink to-yellow mx-auto mt-5 rounded-full" />
          </motion.div>

          {/* ── Cards ──────────────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid md:grid-cols-3 gap-6"
          >
            {allTestimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={cardVariants}
                className="
                  relative flex flex-col
                  bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-pink/30
                  rounded-2xl p-7 backdrop-blur-lg
                  transition-colors duration-300
                "
              >
                <Quote
                  size={34}
                  className="text-pink/25 mb-2"
                  strokeWidth={0}
                  fill="currentColor"
                />

                <p className="text-white/80 text-[15px] leading-relaxed flex-1">
                  {t.quote}
                </p>

                {t.transformation && (
                  <div className="inline-flex items-center gap-1.5 self-start mt-5 bg-pink/10 border border-pink/25 rounded-full px-3 py-1">
                    <TrendingDown size={13} className="text-pink" strokeWidth={2.5} />
                    <span className="text-pink text-xs font-bold tracking-wide">
                      {t.transformation}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                    style={{ backgroundColor: t.avatarColor }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.since}</p>
                  </div>
                  <div className="ml-auto">
                    <StarRow rating={t.rating} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Add Review CTA ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 flex flex-col items-center gap-3"
          >
            <p className="text-white/40 text-sm">Tried a class? Let others know!</p>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-pink hover:bg-pink/85 text-white font-bold text-sm uppercase tracking-widest px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-pink/20 cursor-pointer"
            >
              <PenLine size={16} strokeWidth={2.5} />
              Add Your Review
            </button>
          </motion.div>

        </div>
      </section>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <AddReviewModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
          />
        )}
        {showThankYou && (
          <ThankYou onClose={() => setShowThankYou(false)} />
        )}
      </AnimatePresence>
    </>
  );
}