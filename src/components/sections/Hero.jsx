/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Play,
  X,
  Users,
  CalendarCheck,
  Flame,
  Trophy,
  Sparkles,
} from "lucide-react";

import previewReel from "../../assets/videos/v11.mp4";

const heroSlides = [
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80",
  "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=1600&q=80",
];

const SLIDE_INTERVAL_MS = 6000;

const stats = [
  { num: "4+",   label: "Years Experience", icon: CalendarCheck },
  { num: "100+", label: "Happy Members",    icon: Users          },
  { num: "12",   label: "Weekly Classes",   icon: Flame          },
  { num: "4.9★", label: "Avg. Rating",      icon: Trophy         },
];

const headlineWords = ["DANCE.", "SWEAT.", "REPEAT."];

const todaySchedule = [
  { time: "06:00", label: "Morning Burn",    durationMins: 50 },
  { time: "10:00", label: "Zumba Gold",      durationMins: 50 },
  { time: "18:00", label: "Zumba Fusion",    durationMins: 60 },
  { time: "19:30", label: "Weekend Warrior", durationMins: 60 },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getNextClass(schedule, now = new Date()) {
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  for (const item of schedule) {
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
    const mq       = window.matchMedia("(hover: hover) and (pointer: fine)");
    const listener = (e) => setCanHover(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return canHover;
}

// ---------------------------------------------------------------------------
// FloatingParticles — multi-colour: pink / yellow / coral mix
// ---------------------------------------------------------------------------

const PARTICLE_COLORS = [
  "bg-pink/40",
  "bg-yellow/35",
  "bg-orange/30",
];

function FloatingParticles({ count = 18 }) {
  const shouldReduceMotion = useReducedMotion();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setParticles([]);
    } else {
      setParticles(
        Array.from({ length: count }, (_, i) => ({
          id:       i,
          left:     Math.random() * 100,
          size:     1.5 + Math.random() * 3.5,
          duration: 9 + Math.random() * 12,
          delay:    Math.random() * 10,
          drift:    (Math.random() - 0.5) * 70,
          // alternate colours so particles feel varied, not monochrome
          color:    PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        }))
      );
    }
  }, [count, shouldReduceMotion]);

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

// ---------------------------------------------------------------------------
// LiveClassCard — with animate-live-pulse glow ring
// ---------------------------------------------------------------------------

function LiveClassCard({ nextClass }) {
  if (!nextClass) return null;
  const isLive = nextClass.status === "live";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="
        inline-flex items-center gap-3
        rounded-2xl border border-[#FFF8F0]/15 bg-[#FFF8F0]/[0.07] backdrop-blur-2xl
        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
        px-5 py-3 mb-6
      "
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {isLive && (
          /* animate-live-pulse: coloured glow ring-out, more vivid than plain ping */
          <span className="absolute inline-flex h-full w-full rounded-full bg-pink animate-live-pulse" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            isLive ? "bg-pink" : "bg-orange"
          }`}
        />
      </span>

      <span className="text-left text-sm text-[#FFF8F0]/85">
        <span className="font-bold text-[#FFF8F0]">
          {isLive ? "Live Now" : "Next Class Today"}
        </span>
        <span className="text-[#FFF8F0]/60">
          {" "}· {nextClass.label} · {nextClass.time}
        </span>
      </span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// StatCard — line-reveal accent, flip-in number, border-spin on hover
// ---------------------------------------------------------------------------

function StatCard({ item, index }) {
  const Icon = item.icon;
  const staggerDelay = `${1 + index * 0.1}s`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 1 + index * 0.1, ease: [0.34, 1.4, 0.64, 1] }}
      whileHover={{ y: -10, scale: 1.05 }}
      /* border-spin: conic gradient border rotates in on hover */
      className="
        border-spin
        group relative overflow-hidden rounded-2xl
        border border-[#FFF8F0]/10 bg-[#FFF8F0]/5 backdrop-blur-xl
        py-8 px-5 shadow-[0_4px_24px_rgba(0,0,0,0.25)]
        transition-shadow duration-300
        hover:shadow-[0_8px_40px_rgba(255,45,120,0.28)]
      "
    >
      {/* Top accent line — animate-line-reveal: grows left→right on load */}
      <span
        className="
          absolute top-0 left-0 right-0 h-0.5
          opacity-40 group-hover:opacity-100 transition-opacity duration-300
          [background:linear-gradient(to_right,#FF2D78,#FF6B35,#FFD600)]
          animate-line-reveal
        "
        style={{ "--stagger-delay": staggerDelay }}
      />

      {/* Icon — breathe animation so it feels alive */}
      <Icon
        size={22}
        className="mx-auto mb-3 text-yellow/80 animate-breathe"
        style={{ animationDelay: staggerDelay }}
        strokeWidth={2}
      />

      {/* Stat number — animate-flip-in: 3D perspective entrance */}
      <div
        className="
          font-[Bricolage_Grotesque] font-bold text-5xl md:text-6xl
          bg-clip-text text-transparent animate-flip-in
        "
        style={{
          backgroundImage:  "linear-gradient(135deg,#FFD600,#FF6B35)",
          animationDelay:   staggerDelay,
        }}
      >
        {item.num}
      </div>

      <div className="mt-2 text-sm tracking-[2px] uppercase text-[#FFF8F0]/60">
        {item.label}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// VideoModal
// ---------------------------------------------------------------------------

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
              className="
                absolute -top-12 right-0 md:-right-12
                w-10 h-10 rounded-full
                bg-[#FFF8F0]/10 hover:bg-[#FFF8F0]/20
                flex items-center justify-center text-[#FFF8F0]
                transition-colors
                focus-visible:outline-2 focus-visible:outline-yellow focus-visible:outline-offset-2
              "
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

// ---------------------------------------------------------------------------
// Hero (default export)
// ---------------------------------------------------------------------------

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const watchButtonRef                = useRef(null);
  const prefersReducedMotion          = useReducedMotion();
  const canHover                      = useHoverCapable();
  const enableParallax                = canHover && !prefersReducedMotion;

  const nextClass = useMemo(() => getNextClass(todaySchedule), []);

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
  const mouseX   = useMotionValue(0);
  const mouseY   = useMotionValue(0);
  const springX  = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.5 });
  const springY  = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.5 });
  const bgX      = useTransform(springX, (v) => v * 14);
  const bgY      = useTransform(springY, (v) => v * 14);
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

  /* Scroll to booking / schedule section */
  const handleBookClick = useCallback(() => {
    document
      .getElementById("schedule")
      ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  /* Headline stagger variants */
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
      className="relative isolate min-h-screen flex items-center justify-center overflow-hidden text-center"
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
            {/* animate-ken-burns: slow scale drift keeps background alive */}
            <motion.div
              className={`
                absolute inset-0 bg-cover bg-center transform-gpu
                ${!prefersReducedMotion ? "animate-ken-burns" : "scale-[1.08]"}
              `}
              style={{
                backgroundImage: `url(${heroSlides[slideIndex]})`,
                x: enableParallax ? bgX : 0,
                y: enableParallax ? bgY : 0,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dark overlay ─────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 transform-gpu"
        style={{
          background:
            "linear-gradient(135deg,rgba(26,26,46,0.95),rgba(26,26,46,0.78),rgba(26,26,46,0.95))",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      {/* ── Glow blobs ───────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Pink — top-right, drifts + breathes */}
        <motion.div
          animate={prefersReducedMotion ? {} : { x: [0, 44, 0], y: [0, -32, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className={`
            absolute -top-48 -right-48 w-162.5 h-162.5 rounded-full blur-[120px] transform-gpu
            ${!prefersReducedMotion ? "animate-breathe" : ""}
          `}
          style={{ background: "rgba(255,45,120,0.20)" }}
        />
        {/* Yellow — bottom-left */}
        <motion.div
          animate={prefersReducedMotion ? {} : { x: [0, -32, 0], y: [0, 44, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className={`
            absolute -bottom-40 -left-40 w-112.5 h-112.5 rounded-full blur-[100px] transform-gpu
            ${!prefersReducedMotion ? "animate-breathe" : ""}
          `}
          style={{ background: "rgba(255,214,0,0.17)", animationDelay: "1.5s" }}
        />
        {/* Coral — centre */}
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.18, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full blur-[80px] transform-gpu"
          style={{ background: "rgba(255,107,53,0.14)" }}
        />
      </div>

      {/* ── Floating particles ───────────────────────────────────────────── */}
      {!prefersReducedMotion && <FloatingParticles count={18} />}

      {/* ── Decorative grid ──────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,248,240,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(255,248,240,.09) 1px,transparent 1px)",
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
        {/* Live class indicator */}
        <div>
          <LiveClassCard nextClass={nextClass} />
        </div>

        {/* Headline — word-by-word blur+slide reveal */}
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-[Bricolage_Grotesque] font-extrabold text-[clamp(4rem,12vw,9rem)] leading-[0.9] tracking-tight"
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              variants={headlineWord}
              className={`block ${
                i === 1
                  ? /* "SWEAT." — text-gradient-shimmer: sweeping animated gradient */
                    "text-gradient-shimmer"
                  : ""
              }`}
              style={i !== 1 ? { color: "#FFF8F0" } : undefined}
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
          className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-[#FFF8F0]/70 leading-relaxed"
        >
          Transform your fitness journey through energetic dance workouts,
          incredible music, and a community that motivates you every step of the way.
          <span className="block mt-3 text-[#FFF8F0] font-semibold">
            First Trial Class Completely FREE
          </span>
        </motion.p>

        {/* ── CTAs ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          {/* Primary CTA — Fiesta Pink gradient */}
          <div className="group relative">
            {/* Glow halo */}
            <div
              className="
                absolute -inset-1 rounded-full opacity-0
                group-hover:opacity-60 blur-lg transition-opacity duration-300
              "
              style={{ background: "linear-gradient(135deg,#FF2D78,#FF6B35)" }}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={handleBookClick}
              className="
                relative inline-flex items-center gap-2
                rounded-full px-8 py-4 text-sm md:text-base font-semibold uppercase tracking-wide
                text-dark shadow-[0_4px_24px_rgba(255,45,120,0.4)]
                transition-transform duration-300
                hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(255,45,120,0.55)]
                active:translate-y-0
                focus-visible:outline-2 focus-visible:outline-yellow focus-visible:outline-offset-2
              "
              style={{ background: "linear-gradient(135deg,#FF2D78,#FF6B35)" }}
            >
              <Sparkles size={18} />
              Claim Your Free Class
            </button>
          </div>

          {/* Secondary CTA — ghost / cream, btn-shimmer on hover */}
          <div className="group relative">
            <div
              className="
                absolute -inset-1 rounded-full bg-[#FFF8F0]/30
                opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300
              "
              aria-hidden="true"
            />
            <button
              ref={watchButtonRef}
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="
                btn-shimmer
                relative inline-flex items-center gap-2
                rounded-full border border-[#FFF8F0]/25 bg-[#FFF8F0]/10 backdrop-blur-xl
                px-8 py-4 text-sm md:text-base font-semibold uppercase tracking-wide text-[#FFF8F0]
                shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                hover:bg-[#FFF8F0]/20 hover:border-[#FFF8F0]/40 transition-colors
                focus-visible:outline-2 focus-visible:outline-yellow focus-visible:outline-offset-2
              "
            >
              <Play size={18} />
              Watch Us In Action
            </button>
          </div>
        </motion.div>

        {/* ── Stats — 4-card grid ───────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, i) => (
            <StatCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </motion.div>

      {/* ── Slide indicators ─────────────────────────────────────────────── */}
      {heroSlides.length > 1 && (
        <div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
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
              className={`
                h-1.5 rounded-full transition-all duration-300
                focus-visible:outline-2 focus-visible:outline-yellow focus-visible:outline-offset-2
                ${i === slideIndex
                  ? "w-6 bg-pink"
                  : "w-1.5 bg-[#FFF8F0]/35 hover:bg-[#FFF8F0]/60"}
              `}
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