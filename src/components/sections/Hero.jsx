/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Add to your index.html <head> (or global CSS) for best results:
 * <link rel="preconnect" href="https://fonts.googleapis.com" />
 * <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
 *
 * Color tokens:
 *   --cream:  #FAFAF8   page background
 *   --ink:    #150A16   primary text
 *   --pink:   #E8295E   primary accent
 *   --lime:   #B5DB1A   secondary accent
 *   --coral:  #FF6B35   tertiary accent
 */

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { Play, X, Users, CalendarCheck, Flame, Trophy } from "lucide-react";
import previewReel from "../../assets/videos/v14.mp4";

/* ── Palette ────────────────────────────────────────────────────────────────── */
const C = {
  cream:  "#FAFAF8",
  ink:    "#150A16",
  pink:   "#E8295E",
  lime:   "#B5DB1A",
  coral:  "#FF6B35",
};

/* ── Data ───────────────────────────────────────────────────────────────────── */
const heroImages = [
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=85",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85",
  "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=1200&q=85",
];
const SLIDE_INTERVAL_MS = 7000;

const stats = [
  { num: "4+",   label: "Years Active",   icon: CalendarCheck },
  { num: "100+", label: "Members",        icon: Users         },
  { num: "8",    label: "Weekly Classes", icon: Flame         },
  { num: "4.9★", label: "Rated",         icon: Trophy        },
];

const allClasses = [
  { day: 1, time: "09:00", label: "Zumba Fitness — Resh",    durationMins: 120 },
  { day: 2, time: "09:00", label: "Zumba Fitness — Se Kala", durationMins: 120 },
  { day: 2, time: "17:00", label: "Zumba Fitness — Se Kala", durationMins: 120 },
  { day: 3, time: "09:00", label: "Zumba Fitness — Resh",    durationMins: 120 },
  { day: 4, time: "09:00", label: "Zumba Fitness — Se Kala", durationMins: 120 },
  { day: 4, time: "17:00", label: "Zumba Fitness — Se Kala", durationMins: 120 },
  { day: 5, time: "09:00", label: "Zumba Fitness — Resh",    durationMins: 120 },
  { day: 0, time: "09:00", label: "Zumba Fitness — Se Kala", durationMins: 120 },
];

function getNextClass(now = new Date()) {
  const todayDay   = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const today      = allClasses.filter((c) => c.day === todayDay);
  for (const item of today) {
    const [h, m] = item.time.split(":").map(Number);
    const start  = h * 60 + m;
    const end    = start + item.durationMins;
    if (minutesNow >= start && minutesNow < end) return { ...item, status: "live" };
    if (minutesNow < start)                       return { ...item, status: "upcoming" };
  }
  return null;
}

/* ── Live Pill ──────────────────────────────────────────────────────────────── */
function LivePill({ nextClass, prefersReduced }) {
  if (!nextClass) return null;
  const isLive = nextClass.status === "live";
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2 rounded-full text-xs font-semibold px-4 py-2 mb-8"
      style={{
        background: isLive ? "rgba(232,41,94,0.08)" : "rgba(181,219,26,0.15)",
        border:     `1.5px solid ${isLive ? "rgba(232,41,94,0.3)" : "rgba(181,219,26,0.5)"}`,
        color:      isLive ? C.pink : "#5A7A00",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.03em",
      }}
    >
      <motion.span
        className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: isLive ? C.pink : "#79BE00" }}
        animate={isLive && !prefersReduced ? { scale: [1, 1.9, 1], opacity: [1, 0.35, 1] } : {}}
        transition={{ duration: 1.3, repeat: Infinity }}
      />
      {isLive ? "Class live now" : "Up next"} · {nextClass.label} · {nextClass.time}
    </motion.div>
  );
}

/* ── Display Headline ───────────────────────────────────────────────────────── */
function Headline({ prefersReduced }) {
  const lines = [
    {
      text: "FEEL IT.",
      style: {
        color: "transparent",
        WebkitTextStroke: "2.5px " + C.ink,
      },
    },
    {
      text: "MOVE IT.",
      style: {
        backgroundImage: `linear-gradient(100deg, ${C.pink} 0%, ${C.coral} 50%, ${C.lime} 100%)`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextStroke: "0px",
      },
    },
    {
      text: "LOVE IT.",
      style: { color: C.ink, WebkitTextStroke: "0px" },
    },
  ];

  return (
    <h1
      className="font-black leading-[0.9] tracking-tight"
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(3.4rem, 9.5vw, 8rem)",
      }}
    >
      {lines.map((line, i) => (
        <motion.span
          key={line.text}
          className="block"
          style={line.style}
          initial={{ opacity: 0, x: -48, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{
            duration: prefersReduced ? 0.01 : 0.75,
            delay: prefersReduced ? 0 : 0.15 + i * 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line.text}
        </motion.span>
      ))}
    </h1>
  );
}

/* ── Stats Strip ────────────────────────────────────────────────────────────── */
function StatsStrip() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-stretch mt-12"
      style={{
        background:   "rgba(21,10,22,0.04)",
        border:       `1px solid rgba(21,10,22,0.09)`,
        borderRadius: "18px",
        overflow:     "hidden",
      }}
    >
      {stats.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.35 + i * 0.1, ease: [0.34, 1.5, 0.64, 1] }}
            className="flex-1 flex flex-col items-center py-5 px-2 gap-1 cursor-default select-none"
            style={{
              borderRight: i < stats.length - 1
                ? "1px solid rgba(21,10,22,0.07)"
                : "none",
            }}
          >
            <Icon size={15} style={{ color: C.pink, opacity: 0.85 }} strokeWidth={1.8} />
            <div
              className="font-black text-xl md:text-2xl tabular-nums"
              style={{ fontFamily: "'Syne', sans-serif", color: C.ink }}
            >
              {item.num}
            </div>
            <div
              className="text-[9px] tracking-widest uppercase text-center"
              style={{ color: "rgba(21,10,22,0.38)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {item.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ── Floating Image Panel ───────────────────────────────────────────────────── */
function ImagePanel({ slideIndex, prefersReduced }) {
  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>

      {/* Soft background blob */}
      <div
        className="absolute"
        style={{
          inset: "-10%",
          borderRadius: "50%",
          background: `radial-gradient(ellipse at 60% 40%, rgba(232,41,94,0.1) 0%, rgba(181,219,26,0.08) 55%, transparent 75%)`,
          filter: "blur(24px)",
        }}
        aria-hidden="true"
      />

      {/* Image blob — organic pill shape */}
      <motion.div
        className="relative overflow-hidden z-10"
        style={{
          width:  "min(380px, 78vw)",
          height: "min(460px, 82vw)",
          borderRadius: "48% 52% 44% 56% / 42% 38% 62% 58%",
          boxShadow: `0 40px 100px rgba(232,41,94,0.18), 0 8px 28px rgba(0,0,0,0.1)`,
        }}
        animate={prefersReduced ? {} : {
          borderRadius: [
            "48% 52% 44% 56% / 42% 38% 62% 58%",
            "52% 48% 56% 44% / 58% 62% 38% 42%",
            "48% 52% 44% 56% / 42% 38% 62% 58%",
          ],
          y: [0, -10, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={slideIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImages[slideIndex]})` }}
            />
            {/* Subtle warm tint */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  160deg,
                  rgba(232,41,94,0.12) 0%,
                  rgba(255,107,53,0.06) 50%,
                  rgba(181,219,26,0.08) 100%
                )`,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Badge — members */}
      <motion.div
        className="absolute bottom-8 -left-2 md:left-2 flex items-center gap-3 rounded-2xl px-4 py-3 z-20"
        style={{
          background:  "#FFFFFF",
          boxShadow:   "0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(232,41,94,0.06)",
          border:      "1px solid rgba(232,41,94,0.1)",
          fontFamily:  "'DM Sans', sans-serif",
        }}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(232,41,94,0.1)" }}
        >
          <Users size={16} style={{ color: C.pink }} />
        </div>
        <div>
          <div
            className="font-black text-lg leading-none"
            style={{ color: C.ink, fontFamily: "'Syne', sans-serif" }}
          >
            100+
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: "rgba(21,10,22,0.45)" }}>
            Active Members
          </div>
        </div>
      </motion.div>

      {/* Badge — rating */}
      <motion.div
        className="absolute top-6 -right-2 md:right-2 flex items-center gap-2.5 rounded-2xl px-4 py-3 z-20"
        style={{
          background:  C.pink,
          boxShadow:   `0 12px 40px rgba(232,41,94,0.4)`,
          fontFamily:  "'DM Sans', sans-serif",
        }}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Trophy size={16} style={{ color: "#FFFFFF", opacity: 0.9 }} />
        <div>
          <div
            className="font-black text-lg leading-none text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            4.9★
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
            Rated Kandy
          </div>
        </div>
      </motion.div>

      {/* Decorative dots */}
      <motion.div
        className="absolute -top-4 left-12 w-14 h-14 rounded-full z-0"
        style={{ background: C.lime, opacity: 0.75 }}
        animate={prefersReduced ? {} : { scale: [1, 1.18, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-20 right-2 w-9 h-9 rounded-full z-0"
        style={{ background: C.coral, opacity: 0.55 }}
        animate={prefersReduced ? {} : { y: [0, -10, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        aria-hidden="true"
      />
      <div
        className="absolute top-24 right-10 w-5 h-5 rounded-full z-0"
        style={{ background: C.pink, opacity: 0.35 }}
        aria-hidden="true"
      />
    </div>
  );
}

/* ── Video Modal ────────────────────────────────────────────────────────────── */
function VideoModal({ isOpen, onClose, triggerRef }) {
  const closeRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  const handleClose = useCallback(() => {
    videoRef.current?.pause();
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{
            backdropFilter: "blur(18px)",
            background:     "rgba(21,10,22,0.8)",
          }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Studio preview video"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.93 }}
            transition={{ type: "spring", stiffness: 310, damping: 28 }}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={handleClose}
              aria-label="Close video"
              className="absolute -top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)", color: "#FFFFFF" }}
            >
              <X size={20} />
            </button>
            <video
              ref={videoRef}
              src={previewReel}
              className="w-full max-h-[80vh] rounded-2xl"
              style={{ boxShadow: `0 0 80px rgba(232,41,94,0.3), 0 0 30px rgba(0,0,0,0.4)` }}
              autoPlay
              controls
              loop
              playsInline
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [isVideoOpen, setIsVideoOpen]   = useState(false);
  const watchButtonRef                  = useRef(null);
  const prefersReducedMotion            = useReducedMotion();
  const nextClass                       = useMemo(() => getNextClass(), []);

  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setTimeout(
      () => setSlideIndex((i) => (i + 1) % heroImages.length),
      SLIDE_INTERVAL_MS
    );
    return () => clearTimeout(id);
  }, [prefersReducedMotion, slideIndex]);

  const handleBookClick = useCallback(() => {
    document.getElementById("schedule")?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen overflow-hidden"
      style={{ background: C.cream }}
    >
      {/* ── Background layer ───────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Top-right pink halo */}
        <motion.div
          className="absolute -top-48 -right-48 w-170 h-170 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(232,41,94,0.09) 0%, transparent 65%)`,
          }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Bottom-left lime halo */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-125 h-125 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(181,219,26,0.11) 0%, transparent 60%)`,
          }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(21,10,22,0.12) 1px, transparent 1px)`,
            backgroundSize:  "30px 30px",
            opacity: 0.4,
          }}
        />
        {/* Ghost "ZUMBA" watermark — very faint on light bg */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontSize:          "clamp(7rem,28vw,22rem)",
            fontFamily:        "'Syne', sans-serif",
            fontWeight:        900,
            letterSpacing:     "-0.07em",
            color:             "transparent",
            WebkitTextStroke:  "1.5px rgba(21,10,22,0.05)",
            userSelect:        "none",
            lineHeight:        1,
            pointerEvents:     "none",
          }}
        >
          ZUMBA
        </div>
      </div>

      {/* ── Main layout ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-screen max-w-7xl mx-auto px-6 md:px-12 xl:px-16 pt-28 pb-20 gap-10 lg:gap-16">

        {/* Left column — text content */}
        <div className="flex-1 flex flex-col items-start" style={{ maxWidth: 580 }}>

          <LivePill nextClass={nextClass} prefersReduced={prefersReducedMotion} />

          <Headline prefersReduced={prefersReducedMotion} />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-base md:text-lg leading-relaxed"
            style={{
              color:      "rgba(21,10,22,0.52)",
              maxWidth:   "42ch",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Kandy's most energetic Zumba classes — Latin rhythms, great music,
            and a community that lifts you every single session.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            {/* Primary — pink */}
            <motion.button
              type="button"
              onClick={handleBookClick}
              whileHover={{ scale: 1.04, boxShadow: `0 0 0 5px rgba(232,41,94,0.18), 0 12px 40px rgba(232,41,94,0.4)` }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: C.pink,
                boxShadow:  `0 8px 28px rgba(232,41,94,0.38)`,
                letterSpacing: "0.01em",
              }}
            >
              Book a Class
            </motion.button>

            {/* Secondary — ghost outline */}
            <motion.button
              ref={watchButtonRef}
              type="button"
              onClick={() => setIsVideoOpen(true)}
              whileHover={{ scale: 1.04, background: "rgba(21,10,22,0.05)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "transparent",
                border:     `1.5px solid rgba(21,10,22,0.18)`,
                color:      C.ink,
                letterSpacing: "0.01em",
              }}
            >
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full"
                style={{ background: C.pink }}
              >
                <Play size={11} fill="white" color="white" />
              </span>
              Watch in Action
            </motion.button>
          </motion.div>

          {/* Stats */}
          <StatsStrip />
        </div>

        {/* Right column — image panel */}
        <motion.div
          className="flex-1 w-full lg:w-auto shrink-0"
          style={{ maxWidth: 520 }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ImagePanel slideIndex={slideIndex} prefersReduced={prefersReducedMotion} />
        </motion.div>
      </div>

      {/* Slide navigation dots */}
      {heroImages.length > 1 && (
        <div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
          role="tablist"
          aria-label="Slides"
        >
          {heroImages.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === slideIndex}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlideIndex(i)}
              animate={{
                width:   i === slideIndex ? 26 : 6,
                opacity: i === slideIndex ? 1 : 0.3,
              }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="h-1.5 rounded-full"
              style={{ background: i === slideIndex ? C.pink : "rgba(21,10,22,0.4)" }}
            />
          ))}
        </div>
      )}

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        triggerRef={watchButtonRef}
      />
    </section>
  );
}