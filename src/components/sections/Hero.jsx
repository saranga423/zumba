 
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Play, X, Users, CalendarCheck, Flame, Trophy } from "lucide-react";

import previewReel from "../../assets/videos/v1.mp4";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
// cream: #FAF4E9 | hibiscus: #E23F73 | mango: #FF9736 | plum: #2B1330 | lime: #C8F03C

// ─── Slide images ─────────────────────────────────────────────────────────────
const heroSlides = [
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80",
  "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=1600&q=80",
];

const SLIDE_INTERVAL_MS = 6000;

// ─── Real stats ───────────────────────────────────────────────────────────────
const stats = [
  { num: "4+",   label: "Years Experience", icon: CalendarCheck },
  { num: "100+", label: "Happy Members",    icon: Users         },
  { num: "8",    label: "Weekly Classes",   icon: Flame         },
  { num: "4.9★", label: "Avg. Rating",     icon: Trophy        },
];

// ─── Headline ─────────────────────────────────────────────────────────────────
const headlineWords = ["FEEL IT.", "MOVE IT.", "LOVE IT."];

// ─── Real schedule — keyed to day-of-week, 24-hr start + duration ─────────────
// Mon/Wed/Fri/Sun: 09:00–11:00 at respective studios
// Tue/Thu morning: 09:00–11:00 | Tue/Thu evening: 17:00–19:00
const allClasses = [
  { day: 1, time: "09:00", label: "Zumba Fitness — Resh",     durationMins: 120 },
  { day: 2, time: "09:00", label: "Zumba Fitness — Se Kala",  durationMins: 120 },
  { day: 2, time: "17:00", label: "Zumba Fitness — Se Kala",  durationMins: 120 },
  { day: 3, time: "09:00", label: "Zumba Fitness — Resh",     durationMins: 120 },
  { day: 4, time: "09:00", label: "Zumba Fitness — Se Kala",  durationMins: 120 },
  { day: 4, time: "17:00", label: "Zumba Fitness — Se Kala",  durationMins: 120 },
  { day: 5, time: "09:00", label: "Zumba Fitness — Resh",     durationMins: 120 },
  { day: 0, time: "09:00", label: "Zumba Fitness — Se Kala",  durationMins: 120 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getNextClass(now = new Date()) {
  const todayDay     = now.getDay(); // 0=Sun … 6=Sat
  const minutesNow   = now.getHours() * 60 + now.getMinutes();
  const todayClasses = allClasses.filter((c) => c.day === todayDay);

  for (const item of todayClasses) {
    const [h, m]       = item.time.split(":").map(Number);
    const startMinutes = h * 60 + m;
    const endMinutes   = startMinutes + item.durationMins;
    if (minutesNow >= startMinutes && minutesNow < endMinutes)
      return { ...item, status: "live" };
    if (minutesNow < startMinutes)
      return { ...item, status: "upcoming" };
  }
  return null;
}

function useHoverCapable() {
  const [canHover, setCanHover] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const listener = (e) => setCanHover(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return canHover;
}

// ─── FloatingParticles — brand colours ───────────────────────────────────────
const PARTICLE_COLORS = [
  "bg-[#FF9736]/40",  // mango
  "bg-[#E23F73]/35",  // hibiscus
  "bg-[#C8F03C]/30",  // lime
];

function FloatingParticles({ count = 18 }) {
  const prefersReduced = useReducedMotion();
  const particles = useMemo(() => {
    if (prefersReduced) return [];

    return Array.from({ length: count }, (_, i) => {
      const seed = (i + 1) * 37 + count * 11;
      const normalized = ((seed * 13) % 1000) / 1000;

      return {
        id:       i,
        left:     normalized * 100,
        size:     1.5 + (((seed * 19) % 1000) / 1000) * 3.5,
        duration: 9 + (((seed * 23) % 1000) / 1000) * 12,
        delay:    (((seed * 29) % 1000) / 1000) * 10,
        drift:    (((seed * 31) % 1000) / 1000 - 0.5) * 70,
        color:    PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      };
    });
  }, [count, prefersReduced]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute rounded-full blur-[1px] ${p.color}`}
          style={{ left: `${p.left}%`, width: p.size, height: p.size, bottom: -20 }}
          animate={{
            y:       [0, -(window.innerHeight * 0.92)],
            x:       [0, p.drift],
            opacity: [0, 0.9, 0.6, 0],
            scale:   [0.8, 1.2, 0.9],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}

// ─── LiveClassCard ────────────────────────────────────────────────────────────
function LiveClassCard({ nextClass }) {
  if (!nextClass) return null;
  const isLive = nextClass.status === "live";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] px-5 py-3 mb-6"
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {isLive && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-hibiscus animate-ping" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            isLive ? "bg-hibiscus" : "bg-mango"
          }`}
        />
      </span>
      <span className="text-left text-sm text-white/85">
        <span className="font-bold text-white">
          {isLive ? "Live Now" : "Next Class Today"}
        </span>
        <span className="text-white/60">
          {" "}· {nextClass.label} · {nextClass.time}
        </span>
      </span>
    </motion.div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 1 + index * 0.1, ease: [0.34, 1.4, 0.64, 1] }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl py-8 px-5 shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(255,151,54,0.28)]"
    >
      {/* Top accent strip */}
      <span className="absolute top-0 left-0 right-0 h-0.5 opacity-40 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-mango via-hibiscus to-lime" />

      <Icon size={22} className="mx-auto mb-3 text-mango/80" strokeWidth={2} />

      <div
        className="font-extrabold text-5xl md:text-6xl bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(135deg,#FF9736,#E23F73)" }}
      >
        {item.num}
      </div>

      <div className="mt-2 text-sm tracking-[2px] uppercase text-white/60">
        {item.label}
      </div>
    </motion.div>
  );
}

// ─── VideoModal ───────────────────────────────────────────────────────────────
function VideoModal({ isOpen, onClose, triggerRef }) {
  const closeButtonRef = useRef(null);
  const videoRef       = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6 backdrop-blur-sm"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Studio preview video"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0   }}
            exit={{   opacity: 0, scale: 0.92,  y: 8   }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label="Close video"
              className="absolute -top-12 right-0 md:-right-12 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2"
            >
              <X size={20} />
            </button>
            <video
              ref={videoRef}
              src={previewReel}
              className="w-full max-h-[80vh] rounded-2xl shadow-2xl"
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const watchButtonRef       = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const canHover             = useHoverCapable();
  const enableParallax       = canHover && !prefersReducedMotion;

  const nextClass = useMemo(() => getNextClass(), []);

  /* Background slideshow */
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion || heroSlides.length < 2) return;
    const id = setTimeout(
      () => setSlideIndex((i) => (i + 1) % heroSlides.length),
      SLIDE_INTERVAL_MS
    );
    return () => clearTimeout(id);
  }, [prefersReducedMotion, slideIndex]);

  /* Mouse parallax */
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.5 });
  const bgX     = useTransform(springX, (v) => v * 14);
  const bgY     = useTransform(springY, (v) => v * 14);
  const contentX = useTransform(springX, (v) => v * -6);
  const contentY = useTransform(springY, (v) => v * -6);

  const handleMouseMove = useCallback(
    (e) => {
      if (!enableParallax) return;
      mouseX.set(e.clientX / window.innerWidth  - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    },
    [enableParallax, mouseX, mouseY]
  );

  /* Scroll to schedule */
  const handleBookClick = useCallback(() => {
    document
      .getElementById("schedule")
      ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  /* Headline stagger */
  const headlineContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.18,
        delayChildren:   0.15,
      },
    },
  };

  const headlineWord = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    show: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative isolate min-h-screen flex items-center justify-center overflow-hidden text-center pt-20"
    >
      {/* ── Background slideshow ─────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={slideIndex}
            className="absolute inset-0"
            initial={{ x: prefersReducedMotion ? 0 : "100%", opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{   x: prefersReducedMotion ? 0 : "-100%", opacity: 0.6 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.1, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center transform-gpu scale-105"
              style={{
                backgroundImage: `url(${heroSlides[slideIndex]})`,
                x: enableParallax ? bgX : 0,
                y: enableParallax ? bgY : 0,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Overlay — plum-tinted ────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 transform-gpu"
        style={{
          background:
            "linear-gradient(135deg,rgba(43,19,48,0.96),rgba(43,19,48,0.80),rgba(43,19,48,0.96))",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      {/* ── Glow blobs — brand colours ───────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Hibiscus — top-right */}
        <motion.div
          animate={prefersReducedMotion ? {} : { x: [0, 44, 0], y: [0, -32, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute -top-48 -right-48 w-162.5 h-162.5 rounded-full blur-[120px] transform-gpu"
          style={{ background: "rgba(226,63,115,0.20)" }}
        />
        {/* Mango — bottom-left */}
        <motion.div
          animate={prefersReducedMotion ? {} : { x: [0, -32, 0], y: [0, 44, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-112.5 h-112.5 rounded-full blur-[100px] transform-gpu"
          style={{ background: "rgba(255,151,54,0.18)" }}
        />
        {/* Lime — centre */}
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.18, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full blur-[80px] transform-gpu"
          style={{ background: "rgba(200,240,60,0.10)" }}
        />
      </div>

      {/* ── Floating particles ───────────────────────────────────────────── */}
      {!prefersReducedMotion && <FloatingParticles count={18} />}

      {/* ── Decorative grid ──────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,244,233,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(250,244,233,.09) 1px,transparent 1px)",
          backgroundSize: "70px 70px",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <motion.div
        className="container relative z-20 px-6 transform-gpu"
        style={{
          x: enableParallax ? contentX : 0,
          y: enableParallax ? contentY : 0,
        }}
      >
        {/* Live class badge */}
        <div>
          <LiveClassCard nextClass={nextClass} />
        </div>

        {/* Headline */}
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-bricolage font-extrabold text-[clamp(4rem,12vw,9rem)] leading-[0.9] tracking-tight"
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              variants={headlineWord}
              className={`block ${
                i === 1
                  ? "bg-linear-to-r from-mango via-hibiscus to-lime bg-clip-text text-transparent"
                  : ""
              }`}
              style={i !== 1 ? { color: "#FAF4E9" } : undefined}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed"
        >
          Kandy's most energetic Zumba classes — Latin rhythms, great music,
          and a community that lifts you every session.
        </motion.p>

        {/* ── CTAs ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          {/* Primary — lime Book a Class */}
          <div className="group relative">
            <div
              className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-60 blur-lg transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg,#C8F03C,#FF9736)" }}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={handleBookClick}
              className="relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm md:text-base font-bold uppercase tracking-wide bg-lime text-plum shadow-[0_4px_24px_rgba(200,240,60,0.35)] hover:bg-[#d4f94e] transition-colors focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2"
            >
              Book a Class
            </button>
          </div>

          {/* Secondary — ghost Watch Us In Action */}
          <div className="group relative">
            <div
              className="absolute -inset-1 rounded-full bg-white/30 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300"
              aria-hidden="true"
            />
            <button
              ref={watchButtonRef}
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-xl px-8 py-4 text-sm md:text-base font-semibold uppercase tracking-wide text-white shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:border-white/40 transition-colors focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2"
            >
              <Play size={18} />
              Watch Us In Action
            </button>
          </div>
        </motion.div>

        {/* ── Stats ────────────────────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, i) => (
            <StatCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </motion.div>

      {/* ── Slide indicators ─────────────────────────────────────────────── */}
      {heroSlides.length > 1 && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
          role="tablist"
          aria-label="Background image"
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === slideIndex}
              aria-label={`Show background image ${i + 1}`}
              onClick={() => setSlideIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2 ${
                i === slideIndex
                  ? "w-6 bg-mango"
                  : "w-1.5 bg-white/35 hover:bg-white/60"
              }`}
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