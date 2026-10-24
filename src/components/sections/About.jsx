import {
  useReducedMotion,
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  GraduationCap,
  Heart,
  MapPin,
  Pause,
  Play,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE IMPORTS  (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

import imgTt          from "../../assets/i99.jpg";
import imgInstructor3 from "../../assets/instructor3.jpg";
import imgI25         from "../../assets/i25.jpg";
import imgI27         from "../../assets/i27.jpg";
import imgI16         from "../../assets/i16.jpg";
import imgI26         from "../../assets/i26.jpg";
import imgI28         from "../../assets/i28.jpg";
import imgI88         from "../../assets/i88.jpg";
import imgInstructor4 from "../../assets/instructor4.jpg";
import imgInstructor1 from "../../assets/instructor1.jpg";
import imgI7          from "../../assets/i7.jpg";
import imgI5          from "../../assets/i5.jpg";
import imgInstructor2 from "../../assets/instructor2.jpg";

// ─────────────────────────────────────────────────────────────────────────────
// BRAND  — light theme palette
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  base:  "#FFFFFF",    // section background (white, distinct from hero's #FAFAF8)
  page:  "#FAFAF8",    // page background
  ink:   "#150A16",    // primary text
  pink:  "#E8295E",    // primary accent
  lime:  "#B5DB1A",    // secondary accent
  coral: "#FF6B35",    // tertiary accent
  // helpers
  border:  "rgba(21,10,22,0.07)",
  surface: "rgba(21,10,22,0.04)",
  muted:   "rgba(21,10,22,0.38)",
  subtle:  "rgba(21,10,22,0.55)",
};

const START_YEAR     = 2022;
const SLIDE_INTERVAL = 4200;

// Focus ring — pink ring on white offset for light backgrounds
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8295E]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES  (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

const slides = [
  { src: imgTt,          title: "Move With Confidence",  description: "Every movement is a chance to become stronger.",          alt: "Hanna leading a warm-up stretch"             },
  { src: imgInstructor3, title: "Find Your Rhythm",      description: "High-energy music. Simple moves. Big smiles.",            alt: "Hanna counting out a rhythm"                 },
  { src: imgI25,         title: "Dance Your Way",        description: "Fitness becomes fun when you stop counting the minutes.", alt: "Hanna breaking down a step sequence"          },
  { src: imgI27,         title: "Energy In Every Step",  description: "A positive space where everyone can belong.",             alt: "Hanna demonstrating arm placement"           },
  { src: imgI16,         title: "Express Yourself",      description: "There is no perfect dancer — only your own rhythm.",      alt: "Hanna mid-turn during a routine"             },
  { src: imgI26,         title: "Learn Together",        description: "Progress feels better when we experience it together.",   alt: "Hanna explaining footwork to the class"      },
  { src: imgI28,         title: "One Team",              description: "Different people. One beat. One incredible community.",   alt: "Hanna and class dancing in formation"        },
  { src: imgI88,         title: "Smile More",            description: "Because fitness should make you feel alive.",             alt: "Hanna and class laughing during a break"     },
  { src: imgInstructor4, title: "Personal Guidance",     description: "Supportive coaching that meets you where you are.",       alt: "Hanna giving one-on-one feedback"            },
  { src: imgInstructor1, title: "Better Movement",       description: "Build confidence, coordination and body awareness.",      alt: "Hanna adjusting posture or stance"           },
  { src: imgI7,          title: "Celebrate Progress",    description: "Every class is another reason to be proud of yourself.",  alt: "Hanna and the full group finishing a routine"},
  { src: imgI5,          title: "Community First",       description: "The best workouts are the ones you look forward to.",     alt: "Hanna with class posing after a session"     },
  { src: imgInstructor2, title: "Passion Into Practice", description: "Teaching with energy, care and purpose.",                 alt: "Hanna reviewing choreography notes"          },
];

// ─────────────────────────────────────────────────────────────────────────────
// AFFILIATIONS  (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

const affiliations = [
  { label: "Resh Dance Studio Kandy",                      icon: MapPin        },
  { label: "Nimal Senanayake Academy of Performing Arts",  icon: MapPin        },
  { label: "Green Angels International School — Gelioya",  icon: GraduationCap },
  { label: "Green Angels International Educational Institute", icon: GraduationCap },
];

// ─────────────────────────────────────────────────────────────────────────────
// TICKER ITEMS  (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

const tickerItems = [
  "Zumba Fitness", "Latin Rhythms", "Certified Instructor", "Kandy, Sri Lanka",
  "100+ Members", "Cardio Dance", "All Levels Welcome", "Feel The Beat",
];

// ─────────────────────────────────────────────────────────────────────────────
// COUNTER  (unchanged logic)
// ─────────────────────────────────────────────────────────────────────────────

function Counter({ to, suffix = "", duration = 1200, start = false }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let af;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) af = requestAnimationFrame(tick);
    };
    af = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(af);
  }, [to, duration, start]);
  return <>{value}{suffix}</>;
}

// ─────────────────────────────────────────────────────────────────────────────
// COUNT-IN  — adapted for light background
// ─────────────────────────────────────────────────────────────────────────────

function CountIn({ reducedMotion = false }) {
  const beats = [5, 6, 7, 8];
  const [active, setActive]  = useState(reducedMotion ? beats.length - 1 : 0);
  const [showGo, setShowGo]  = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      if (index >= beats.length) {
        setShowGo(true);
        window.setTimeout(() => { setShowGo(false); setActive(0); }, 950);
        index = -1;
        return;
      }
      setActive(index);
    }, 460);
    return () => clearInterval(interval);
  }, [reducedMotion, beats.length]);

  const beatColor = (i) => [C.pink, C.coral, C.lime, C.pink][i];

  return (
    <div
      className="flex items-center gap-2.5 rounded-full px-4 py-2"
      style={{ border: `1px solid ${C.border}`, background: C.surface }}
    >
      <span className="sr-only">Five, six, seven, eight — go. The count every class starts on.</span>
      <div aria-hidden="true" className="flex items-center gap-1.5">
        {beats.map((beat, i) => (
          <span key={beat} className="flex items-center">
            <span
              className="font-mono text-sm font-bold transition-all duration-300 sm:text-base"
              style={{
                color:     active >= i ? beatColor(i) : "rgba(21,10,22,0.25)",
                opacity:   active >= i ? 1 : 0.5,
                transform: active === i && !reducedMotion ? "scale(1.3)" : "scale(1)",
              }}
            >
              {beat}
            </span>
            {i < beats.length - 1 && (
              <span className="mx-1.5 h-1 w-1 rounded-full" style={{ background: C.border }} />
            )}
          </span>
        ))}
      </div>
      <span
        aria-hidden="true"
        className="ml-0.5 font-mono text-[9px] font-bold uppercase tracking-[2px] transition-opacity duration-300"
        style={{ color: C.lime, opacity: showGo ? 1 : 0 }}
      >
        — go
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REVEAL WRAPPER  (unchanged logic)
// ─────────────────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, direction = "up", reducedMotion = false, className = "" }) {
  const initial = {
    up:    { opacity: 0, y:  35 },
    down:  { opacity: 0, y: -35 },
    left:  { opacity: 0, x: -35 },
    right: { opacity: 0, x:  35 },
  };
  return (
    <motion.div
      initial={reducedMotion ? false : initial[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TICKER  — adapted for light background
// ─────────────────────────────────────────────────────────────────────────────

function Ticker({ reverse = false, reducedMotion = false }) {
  const items = [...tickerItems, ...tickerItems, ...tickerItems];
  const dotColors = [C.pink, C.coral, C.lime];

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        borderTop:    `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={reducedMotion ? {} : { x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
        transition={{ duration: reverse ? 32 : 26, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-3">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: dotColors[index % 3] }}
            />
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[3px] sm:text-xs"
              style={{ color: "rgba(21,10,22,0.32)" }}
            >
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INSTRUCTOR GALLERY  — frame adapted for light; image overlays stay dark
//   (photo text needs a dark gradient beneath it regardless of page theme)
// ─────────────────────────────────────────────────────────────────────────────

function InstructorGallery({ reducedMotion = false }) {
  const [current,    setCurrent]    = useState(0);
  const [direction,  setDirection]  = useState(1);
  const [paused,     setPaused]     = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback((index, dir = 1) => {
    setDirection(dir);
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const previous = useCallback(() => goTo(current - 1, -1), [current, goTo]);
  const next     = useCallback(() => goTo(current + 1,  1), [current, goTo]);

  useEffect(() => {
    if (paused || reducedMotion || isHovering) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, reducedMotion, isHovering]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  previous();
      if (e.key === "ArrowRight") next();
      if (e.key === " ") { e.preventDefault(); setPaused((v) => !v); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, previous]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : previous();
    touchStartX.current = null;
  };

  const variants = {
    enter:  (d) => ({ opacity: 0, x: reducedMotion ? 0 : d > 0 ?  80 : -80, scale: reducedMotion ? 1 : 0.96 }),
    center:         { opacity: 1, x: 0, scale: 1 },
    exit:   (d) => ({ opacity: 0, x: reducedMotion ? 0 : d > 0 ? -80 :  80, scale: reducedMotion ? 1 : 0.96 }),
  };

  const active = slides[current];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Outer pink halo — works on light bg */}
      <div
        className="absolute -inset-3 -z-10 rounded-4xl blur-xl"
        style={{
          background: `linear-gradient(135deg, rgba(232,41,94,0.14), rgba(255,107,53,0.06), rgba(181,219,26,0.1))`,
          opacity: 0.7,
        }}
      />

      {/* Image frame */}
      <div
        className="relative aspect-4/5 overflow-hidden rounded-4xl sm:aspect-[4/4.8]"
        style={{
          border:    `1px solid ${C.border}`,
          boxShadow: "0 24px 80px rgba(21,10,22,0.1), 0 4px 16px rgba(21,10,22,0.06)",
          background: "#f0ece8",
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current}
            src={active.src}
            alt={active.alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        {/* Dark gradient overlay — necessary for text legibility over photos */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(to top, rgba(10,4,12,0.94) 0%, rgba(10,4,12,0.3) 38%, transparent 68%),
              linear-gradient(135deg, rgba(10,4,12,0.22), transparent 52%)
            `,
          }}
        />

        {/* Live Energy badge */}
        <div className="absolute left-5 top-5 z-10">
          <div
            className="flex items-center gap-2 rounded-full px-3 py-2 backdrop-blur-xl"
            style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.22)" }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: C.lime }} />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[2px] text-white/75">Live Energy</span>
          </div>
        </div>

        {/* Slide counter */}
        <div className="absolute right-5 top-5 z-10">
          <div
            className="rounded-full px-3 py-2 font-mono text-[10px] text-white/55 backdrop-blur-xl"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)" }}
          >
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </div>
        </div>

        {/* Slide text */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[3px]" style={{ color: C.lime }}>
                {active.title}
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-white/70 sm:text-base">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-5 flex items-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`View photo ${i + 1}`}
                aria-current={i === current}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`group flex h-5 items-center rounded-full ${FOCUS_RING}`}
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width:           i === current ? 28 : 5,
                    height:          5,
                    backgroundColor: i === current ? C.lime : "rgba(255,255,255,0.25)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Prev / Next — stay dark glass (over photos) */}
        {[
          { fn: previous, label: "Previous photo", Icon: ChevronLeft,  pos: "left-4"  },
          { fn: next,     label: "Next photo",     Icon: ChevronRight, pos: "right-4" },
        ].map(({ fn, label, Icon, pos }) => (
          <button
            key={label}
            type="button"
            onClick={fn}
            aria-label={label}
            className={`absolute ${pos} top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/15 ${FOCUS_RING}`}
          >
            <Icon size={19} />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-0.5 overflow-hidden rounded-full" style={{ background: C.border }}>
        {!paused && !reducedMotion && (
          <motion.div
            key={current}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
            className="h-full"
            style={{ background: `linear-gradient(90deg, ${C.pink}, ${C.coral}, ${C.lime})` }}
          />
        )}
      </div>

      {/* Controls row */}
      <div className="mt-3 flex items-center justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[2px]" style={{ color: C.muted }}>
          Swipe to explore
        </p>
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[2px] transition-all ${FOCUS_RING}`}
          style={{
            border:     `1px solid ${C.border}`,
            background: C.surface,
            color:      C.muted,
          }}
        >
          {paused ? <><Play size={10} />Play</> : <><Pause size={10} />Pause</>}
        </button>
      </div>

      {/* ── Floating badges ───────────────────────────────────────────────── */}

      {/* Experience — white card, coral accent */}
      <motion.div
        animate={reducedMotion ? {} : { y: [-6, 6, -6], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-3 -top-5 z-30 hidden rounded-2xl p-4 shadow-xl sm:block lg:-right-8"
        style={{
          background:  "#FFFFFF",
          border:      `1px solid rgba(255,107,53,0.2)`,
          boxShadow:   "0 8px 32px rgba(21,10,22,0.08)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: `rgba(255,107,53,0.1)`, color: C.coral }}
          >
            <Trophy size={17} />
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[2px]" style={{ color: C.muted }}>
              Experience
            </p>
            <p className="font-black text-2xl leading-none" style={{ color: C.coral, fontFamily: "'Syne', sans-serif" }}>
              {new Date().getFullYear() - START_YEAR}+
            </p>
          </div>
        </div>
      </motion.div>

      {/* Community — keep pink bg for color contrast on light page */}
      <motion.div
        animate={reducedMotion ? {} : { y: [6, -6, 6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-5 -left-3 z-30 hidden rounded-2xl p-4 shadow-xl sm:block lg:-left-8"
        style={{ background: C.pink, border: "1px solid rgba(255,255,255,0.15)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
            <Users size={17} color="white" />
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[2px] text-white/65">Community</p>
            <p className="font-black text-2xl leading-none text-white" style={{ fontFamily: "'Syne', sans-serif" }}>100+</p>
          </div>
        </div>
      </motion.div>

      {/* Certified — lime pill */}
      <motion.div
        animate={reducedMotion ? {} : { y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute -right-5 bottom-32 z-30 hidden items-center gap-2 rounded-full px-4 py-2.5 lg:flex"
        style={{
          background: `rgba(181,219,26,0.14)`,
          border:     `1px solid rgba(181,219,26,0.45)`,
        }}
      >
        <Star size={11} fill={C.lime} stroke={C.lime} />
        <span className="font-mono text-[9px] font-bold uppercase tracking-[2px]" style={{ color: "#4A6A00" }}>
          Certified
        </span>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD  — light surface
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({ value, suffix, label, icon: Icon, color, glow, startCounter, reducedMotion }) {
  return (
    <motion.div
      whileHover={reducedMotion ? {} : { y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl p-4"
      style={{
        background:  "#FFFFFF",
        border:      `1px solid ${C.border}`,
        boxShadow:   "0 2px 12px rgba(21,10,22,0.04)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ backgroundColor: glow }}
      />
      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: `${color}12`, color }}
          >
            <Icon size={14} />
          </div>
        </div>
        <p
          className="font-black leading-none tracking-tight text-3xl sm:text-4xl"
          style={{ color, fontFamily: "'Syne', sans-serif" }}
        >
          <Counter to={value} suffix={suffix} start={startCounter} />
        </p>
        <p className="mt-2 font-mono text-[9px] uppercase leading-tight tracking-[1.5px]" style={{ color: C.muted }}>
          {label}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  const reducedMotion     = useReducedMotion();
  const yearsExperience   = Math.max(1, new Date().getFullYear() - START_YEAR);
  const [statsVisible, setStatsVisible] = useState(false);

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ backgroundColor: C.base }}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          BACKGROUND SYSTEM — light
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Pink top-left halo */}
        <div
          className="absolute -left-40 top-0 h-150 w-150 rounded-full blur-[130px]"
          style={{ backgroundColor: "rgba(232,41,94,0.06)" }}
        />
        {/* Coral bottom-right halo */}
        <div
          className="absolute -right-40 bottom-0 h-150 w-150 rounded-full blur-[140px]"
          style={{ backgroundColor: "rgba(255,107,53,0.05)" }}
        />
        {/* Lime centre halo */}
        <div
          className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
          style={{ backgroundColor: "rgba(181,219,26,0.05)" }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(21,10,22,0.1) 1px, transparent 1px)",
            backgroundSize:  "32px 32px",
            opacity: 0.4,
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          TOP TICKER
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 pt-5">
        <Ticker reducedMotion={reducedMotion} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          INTRO
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-6 sm:pt-28 lg:pb-16">
        <Reveal reducedMotion={reducedMotion}>
          <div className="flex flex-col items-center text-center">

            {/* Eyebrow pill */}
            <div
              className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background:   `rgba(232,41,94,0.07)`,
                border:       `1px solid rgba(232,41,94,0.25)`,
              }}
            >
              <Flame size={12} style={{ color: C.pink }} />
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-[3px]"
                style={{ color: C.pink }}
              >
                Meet Your Instructor
              </span>
            </div>

            {/* HANNA headline — ink on white, keeps the dramatic scale */}
            <h2
              className="max-w-5xl font-black uppercase leading-[0.82] tracking-[-0.06em]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span
                className="block"
                style={{ color: C.ink, fontSize: "clamp(4.5rem,15vw,10rem)" }}
              >
                HANNA
              </span>
              <span
                className="block"
                style={{
                  color:            "transparent",
                  WebkitTextStroke: `1.5px ${C.pink}`,
                  letterSpacing:    "0.08em",
                  fontSize:         "clamp(2rem,6vw,4.8rem)",
                }}
              >
                WATHTHALAGE
              </span>
            </h2>

            {/* Count-in + location */}
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
              <span
                className="hidden h-px w-10 sm:block sm:w-16"
                style={{ background: `linear-gradient(to right, transparent, ${C.coral})` }}
              />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <CountIn reducedMotion={reducedMotion} />
                <p
                  className="font-mono text-[9px] uppercase tracking-[3px] sm:text-xs"
                  style={{ color: C.coral }}
                >
                  Zumba Instructor · Kandy, Sri Lanka
                </p>
              </div>
              <span
                className="hidden h-px w-10 sm:block sm:w-16"
                style={{ background: `linear-gradient(to left, transparent, ${C.coral})` }}
              />
            </div>

            {/* Intro statement */}
            <p className="mt-8 max-w-2xl text-sm leading-7 sm:text-base" style={{ color: "rgba(21,10,22,0.45)" }}>
              More than a workout. More than a dance class.
              <span style={{ color: "rgba(21,10,22,0.8)" }}>
                {" "}It's a space to move, connect, laugh and become the strongest version of yourself.
              </span>
            </p>

          </div>
        </Reveal>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN CONTENT GRID
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:pb-32">
        <div className="grid items-start gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 xl:gap-28">

          {/* ── LEFT — Gallery ──────────────────────────────────────────── */}
          <Reveal direction="left" reducedMotion={reducedMotion}>
            <InstructorGallery reducedMotion={reducedMotion} />
          </Reveal>

          {/* ── RIGHT — Content ─────────────────────────────────────────── */}
          <div className="lg:pt-3">

            {/* Section heading with pink left border */}
            <Reveal reducedMotion={reducedMotion}>
              <div
                className="relative border-l-[3px] pl-5 sm:pl-6"
                style={{ borderColor: C.pink }}
              >
                <p
                  className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[3px]"
                  style={{ color: C.pink }}
                >
                  The Woman Behind The Energy
                </p>
                <h3
                  className="max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                  style={{ color: C.ink, fontFamily: "'Syne', sans-serif" }}
                >
                  Inspiring Confidence
                  <br />
                  <span style={{ color: C.pink }}>Through Dance.</span>
                </h3>
              </div>
            </Reveal>

            {/* Body copy */}
            <Reveal delay={0.1} reducedMotion={reducedMotion}>
              <div className="mt-8 space-y-5">
                <p className="text-base leading-8 sm:text-lg" style={{ color: "rgba(21,10,22,0.68)" }}>
                  Hanna found Zumba as a way to stay active while doing what she loves most — dance.
                  A personal passion grew into a mission: help people move freely, smile without
                  holding back, and feel at home in their own skin.
                </p>
                <p className="text-sm leading-7 sm:text-base" style={{ color: "rgba(21,10,22,0.45)" }}>
                  Her classes combine energetic Latin rhythms, easy-to-follow choreography and an
                  atmosphere where nobody has to feel judged. Whether you're stepping into your first
                  class or you've been dancing for years, there's always room for you.
                </p>
              </div>
            </Reveal>

            {/* Personality tags */}
            <Reveal delay={0.18} reducedMotion={reducedMotion}>
              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  { icon: Heart,    text: "Positive Energy" },
                  { icon: Zap,      text: "High Energy"     },
                  { icon: Users,    text: "Community"       },
                  { icon: Sparkles, text: "Good Vibes"      },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 rounded-full px-3 py-2"
                    style={{ border: `1px solid ${C.border}`, background: C.surface }}
                  >
                    <Icon size={12} style={{ color: C.lime }} />
                    <span
                      className="font-mono text-[9px] uppercase tracking-[1.5px]"
                      style={{ color: C.subtle }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Stats */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              onViewportEnter={() => setStatsVisible(true)}
              className="mt-10 grid grid-cols-3 gap-2.5 sm:gap-3"
            >
              <StatCard
                value={100} suffix="+" label="Happy Members"
                icon={Users}   color={C.pink}  glow={`${C.pink}44`}
                startCounter={statsVisible} reducedMotion={reducedMotion}
              />
              <StatCard
                value={yearsExperience} suffix="+" label="Years Teaching"
                icon={Trophy}  color={C.coral} glow={`${C.coral}44`}
                startCounter={statsVisible} reducedMotion={reducedMotion}
              />
              <StatCard
                value={2} suffix="" label="Locations"
                icon={MapPin}  color={C.lime}  glow={`${C.lime}44`}
                startCounter={statsVisible} reducedMotion={reducedMotion}
              />
            </motion.div>

            {/* Affiliations */}
            <Reveal delay={0.3} reducedMotion={reducedMotion}>
              <div className="mt-10">
                <div className="mb-4 flex items-center gap-3">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[3px]" style={{ color: C.muted }}>
                    Where You'll Find Her
                  </p>
                  <div className="h-px flex-1" style={{ background: C.border }} />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {affiliations.map(({ label, icon: Icon }, i) => (
                    <motion.div
                      key={label}
                      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                      whileHover={reducedMotion ? {} : { y: -2 }}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-300"
                      style={{
                        border:     `1px solid ${C.border}`,
                        background: "#FFFFFF",
                      }}
                    >
                      <div
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: `rgba(255,107,53,0.1)`, color: C.coral }}
                      >
                        <Icon size={12} />
                      </div>
                      <span
                        className="font-mono text-[10px] leading-5 transition-colors"
                        style={{ color: "rgba(21,10,22,0.45)" }}
                      >
                        {label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.38} reducedMotion={reducedMotion}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/blog"
                  className={`group relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 font-bold text-sm no-underline ${FOCUS_RING}`}
                  style={{
                    background: C.lime,
                    color:      C.ink,
                    boxShadow:  `0 8px 28px rgba(181,219,26,0.35)`,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {/* Shimmer */}
                  <span
                    className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    aria-hidden="true"
                  />
                  <Sparkles size={15} />
                  <span className="relative">Read Hanna's Story</span>
                  <ArrowRight size={15} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href="#location"
                  className={`group inline-flex w-fit items-center gap-2 rounded-full font-mono text-xs uppercase tracking-[1.5px] no-underline transition-colors ${FOCUS_RING}`}
                  style={{ color: C.muted }}
                >
                  <MapPin size={14} />
                  <span>Find a studio</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          QUOTE STRIP — subtle pink blush background
      ═══════════════════════════════════════════════════════════════════════ */}
      <div
        className="relative z-10"
        style={{
          borderTop:    `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          background:   "rgba(232,41,94,0.025)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <Reveal reducedMotion={reducedMotion}>
            <div
              className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full"
              style={{ border: `1px solid rgba(232,41,94,0.18)`, background: "rgba(232,41,94,0.07)" }}
            >
              <Heart size={18} fill={C.pink} stroke={C.pink} />
            </div>
            <blockquote
              className="font-black leading-[1.05] tracking-tight"
              style={{
                color:      C.ink,
                fontSize:   "clamp(1.8rem,4.5vw,3.5rem)",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              "Don't dance because you have to.
              <br />
              <span style={{ color: C.pink }}>Dance because you can.</span>"
            </blockquote>
            <p className="mt-7 font-mono text-[9px] uppercase tracking-[3px]" style={{ color: C.muted }}>
              The Hanna Waththalage Philosophy
            </p>
          </Reveal>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          BOTTOM TICKER
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10">
        <Ticker reverse reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}