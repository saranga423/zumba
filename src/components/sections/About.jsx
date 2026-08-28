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
  ArrowDownRight,
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
// IMAGE IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

import imgTt from "../../assets/tt.jpg";
import imgInstructor3 from "../../assets/instructor3.jpg";
import imgI25 from "../../assets/i25.jpg";
import imgI27 from "../../assets/i27.jpg";
import imgI16 from "../../assets/i16.jpg";
import imgI26 from "../../assets/i26.jpg";
import imgI28 from "../../assets/i28.jpg";
import imgI88 from "../../assets/i88.jpg";
import imgInstructor4 from "../../assets/instructor4.jpg";
import imgInstructor1 from "../../assets/instructor1.jpg";
import imgI7 from "../../assets/i7.jpg";
import imgI5 from "../../assets/i5.jpg";
import imgInstructor2 from "../../assets/instructor2.jpg";

// ─────────────────────────────────────────────────────────────────────────────
// BRAND
// ─────────────────────────────────────────────────────────────────────────────

const COLORS = {
  cream: "#FAF4E9",
  hibiscus: "#E23F73",
  mango: "#FF9736",
  plum: "#2B1330",
  plumLight: "#432348",
  lime: "#C8F03C",
};

const START_YEAR = 2022;
const SLIDE_INTERVAL = 4200;

// Focus ring, shared across every interactive element so keyboard users get
// one consistent, visible affordance regardless of what sits underneath it.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B1330]";

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES
// ─────────────────────────────────────────────────────────────────────────────

const slides = [
  {
    src: imgTt,
    title: "Move With Confidence",
    description: "Every movement is a chance to become stronger.",
    alt: "Hanna leading a warm-up stretch",
  },
  {
    src: imgInstructor3,
    title: "Find Your Rhythm",
    description: "High-energy music. Simple moves. Big smiles.",
    alt: "Hanna counting out a rhythm",
  },
  {
    src: imgI25,
    title: "Dance Your Way",
    description: "Fitness becomes fun when you stop counting the minutes.",
    alt: "Hanna breaking down a step sequence",
  },
  {
    src: imgI27,
    title: "Energy In Every Step",
    description: "A positive space where everyone can belong.",
    alt: "Hanna demonstrating arm placement",
  },
  {
    src: imgI16,
    title: "Express Yourself",
    description: "There is no perfect dancer — only your own rhythm.",
    alt: "Hanna mid-turn during a routine",
  },
  {
    src: imgI26,
    title: "Learn Together",
    description: "Progress feels better when we experience it together.",
    alt: "Hanna explaining footwork to the class",
  },
  {
    src: imgI28,
    title: "One Team",
    description: "Different people. One beat. One incredible community.",
    alt: "Hanna and class dancing in formation",
  },
  {
    src: imgI88,
    title: "Smile More",
    description: "Because fitness should make you feel alive.",
    alt: "Hanna and class laughing during a break",
  },
  {
    src: imgInstructor4,
    title: "Personal Guidance",
    description: "Supportive coaching that meets you where you are.",
    alt: "Hanna giving one-on-one feedback",
  },
  {
    src: imgInstructor1,
    title: "Better Movement",
    description: "Build confidence, coordination and body awareness.",
    alt: "Hanna adjusting posture or stance",
  },
  {
    src: imgI7,
    title: "Celebrate Progress",
    description: "Every class is another reason to be proud of yourself.",
    alt: "Hanna and the full group finishing a routine",
  },
  {
    src: imgI5,
    title: "Community First",
    description: "The best workouts are the ones you look forward to.",
    alt: "Hanna with class posing after a session",
  },
  {
    src: imgInstructor2,
    title: "Passion Into Practice",
    description: "Teaching with energy, care and purpose.",
    alt: "Hanna reviewing choreography notes",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AFFILIATIONS
// ─────────────────────────────────────────────────────────────────────────────

const affiliations = [
  {
    label: "Resh Dance Studio Kandy",
    icon: MapPin,
  },
  {
    label: "Nimal Senanayake Academy of Performing Arts",
    icon: MapPin,
  },
  {
    label: "Green Angels International School — Gelioya",
    icon: GraduationCap,
  },
  {
    label: "Green Angels International Educational Institute",
    icon: GraduationCap,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────────────────────────────────────────

const tickerItems = [
  "Zumba Fitness",
  "Latin Rhythms",
  "Certified Instructor",
  "Kandy, Sri Lanka",
  "100+ Members",
  "Cardio Dance",
  "All Levels Welcome",
  "Feel The Beat",
];

// ─────────────────────────────────────────────────────────────────────────────
// COUNTER
// ─────────────────────────────────────────────────────────────────────────────

function Counter({
  to,
  suffix = "",
  duration = 1200,
  start = false,
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrame;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(to * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [to, duration, start]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COUNT-IN — the signature element.
// Every Zumba track starts the same way: the instructor calls "five, six,
// seven, eight" and the room moves on "go". That's the one authentic
// piece of structure in this brief, so it becomes the page's structural
// device instead of a generic 01 / 02 / 03 marker.
// ─────────────────────────────────────────────────────────────────────────────

function CountIn({ reducedMotion = false }) {
  const beats = [5, 6, 7, 8];

  const [active, setActive] = useState(reducedMotion ? beats.length - 1 : 0);
  const [showGo, setShowGo] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    let index = 0;

    const interval = setInterval(() => {
      index += 1;

      if (index >= beats.length) {
        setShowGo(true);

        window.setTimeout(() => {
          setShowGo(false);
          setActive(0);
        }, 950);

        index = -1;
        return;
      }

      setActive(index);
    }, 460);

    return () => clearInterval(interval);
  }, [reducedMotion, beats.length]);

  const beatColor = (index) =>
    [COLORS.hibiscus, COLORS.mango, COLORS.lime, COLORS.hibiscus][index];

  return (
    <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/3 px-4 py-2">
      <span className="sr-only">
        Five, six, seven, eight — go. The count every class starts on.
      </span>

      <div
        aria-hidden="true"
        className="flex items-center gap-1.5"
      >
        {beats.map((beat, index) => (
          <span
            key={beat}
            className="flex items-center"
          >
            <span
              className="font-mono text-sm font-bold transition-all duration-300 sm:text-base"
              style={{
                color:
                  active >= index
                    ? beatColor(index)
                    : "rgba(255,255,255,0.35)",
                opacity: active >= index ? 1 : 0.4,
                transform:
                  active === index && !reducedMotion
                    ? "scale(1.3)"
                    : "scale(1)",
              }}
            >
              {beat}
            </span>

            {index < beats.length - 1 && (
              <span className="mx-1.5 h-1 w-1 rounded-full bg-white/15" />
            )}
          </span>
        ))}
      </div>

      <span
        aria-hidden="true"
        className="ml-0.5 font-mono text-[9px] font-bold uppercase tracking-[2px] transition-opacity duration-300"
        style={{
          color: COLORS.lime,
          opacity: showGo ? 1 : 0,
        }}
      >
        — go
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REVEAL WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  direction = "up",
  reducedMotion = false,
  className = "",
}) {
  const initialPosition = {
    up: { opacity: 0, y: 35 },
    down: { opacity: 0, y: -35 },
    left: { opacity: 0, x: -35 },
    right: { opacity: 0, x: 35 },
  };

  return (
    <motion.div
      initial={reducedMotion ? false : initialPosition[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────────────────────────────────────────

function Ticker({ reverse = false, reducedMotion = false }) {
  const items = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div
      className="relative overflow-hidden border-y border-white/[0.07] py-4"
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={
          reducedMotion
            ? {}
            : {
                x: reverse
                  ? ["-33.333%", "0%"]
                  : ["0%", "-33.333%"],
              }
        }
        transition={{
          duration: reverse ? 32 : 26,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-3"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  index % 3 === 0
                    ? COLORS.hibiscus
                    : index % 3 === 1
                    ? COLORS.mango
                    : COLORS.lime,
              }}
            />

            <span className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-white/35 sm:text-xs">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE SLIDESHOW
// ─────────────────────────────────────────────────────────────────────────────

function InstructorGallery({ reducedMotion = false }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const touchStartX = useRef(null);

  const goTo = useCallback((index, dir = 1) => {
    setDirection(dir);
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const previous = useCallback(() => {
    goTo(current - 1, -1);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo(current + 1, 1);
  }, [current, goTo]);

  // ──────────────────────────────────────────────────────────────────────────
  // AUTOPLAY
  // ──────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (paused || reducedMotion || isHovering) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((index) => (index + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [paused, reducedMotion, isHovering]);

  // ──────────────────────────────────────────────────────────────────────────
  // KEYBOARD
  // ──────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();

      if (event.key === " ") {
        event.preventDefault();
        setPaused((value) => !value);
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [next, previous]);

  // ──────────────────────────────────────────────────────────────────────────
  // TOUCH / SWIPE
  // ──────────────────────────────────────────────────────────────────────────

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const endX = event.changedTouches[0].clientX;
    const difference = touchStartX.current - endX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        next();
      } else {
        previous();
      }
    }

    touchStartX.current = null;
  };

  const variants = {
    enter: (dir) => ({
      opacity: 0,
      x: reducedMotion ? 0 : dir > 0 ? 80 : -80,
      scale: reducedMotion ? 1 : 0.96,
    }),

    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },

    exit: (dir) => ({
      opacity: 0,
      x: reducedMotion ? 0 : dir > 0 ? -80 : 80,
      scale: reducedMotion ? 1 : 0.96,
    }),
  };

  const activeSlide = slides[current];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ────────────────────────────────────────────────────────────────────
          OUTER GLOW
      ──────────────────────────────────────────────────────────────────── */}

      <div
        className="absolute -inset-3 -z-10 rounded-4xl opacity-50 blur-xl"
        style={{
          background: `linear-gradient(
            135deg,
            ${COLORS.hibiscus}55,
            ${COLORS.mango}22,
            ${COLORS.lime}33
          )`,
        }}
      />

      {/* ────────────────────────────────────────────────────────────────────
          IMAGE FRAME
      ──────────────────────────────────────────────────────────────────── */}

      <div className="relative aspect-4/5 overflow-hidden rounded-4xl border border-white/10 bg-black/20 shadow-[0_35px_100px_rgba(0,0,0,0.45)] sm:aspect-[4/4.8]">
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="popLayout"
        >
          <motion.img
            key={current}
            src={activeSlide.src}
            alt={activeSlide.alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: reducedMotion ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        {/* Image color overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to top,
                rgba(43,19,48,0.96) 0%,
                rgba(43,19,48,0.35) 38%,
                transparent 70%
              ),
              linear-gradient(
                135deg,
                rgba(43,19,48,0.28),
                transparent 55%
              )
            `,
          }}
        />

        {/* Top badge */}
        <div className="absolute left-5 top-5 z-10">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-2 backdrop-blur-xl">
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: COLORS.lime }}
            />

            <span className="font-mono text-[9px] font-bold uppercase tracking-[2px] text-white/75">
              Live Energy
            </span>
          </div>
        </div>

        {/* Counter */}
        <div className="absolute right-5 top-5 z-10">
          <div className="rounded-full border border-white/10 bg-black/20 px-3 py-2 font-mono text-[10px] text-white/55 backdrop-blur-xl">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            TEXT OVER IMAGE
        ───────────────────────────────────────────────────────────────── */}

        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                reducedMotion
                  ? undefined
                  : { opacity: 0, y: -8 }
              }
              transition={{ duration: 0.4 }}
            >
              <p
                className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[3px]"
                style={{ color: COLORS.lime }}
              >
                {activeSlide.title}
              </p>

              <p className="max-w-sm text-sm leading-relaxed text-white/70 sm:text-base">
                {activeSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-5 flex items-center gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`View photo ${index + 1}`}
                aria-current={index === current}
                onClick={() =>
                  goTo(index, index > current ? 1 : -1)
                }
                className={`group flex h-5 items-center rounded-full ${FOCUS_RING}`}
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: index === current ? 28 : 5,
                    height: 5,
                    backgroundColor:
                      index === current
                        ? COLORS.lime
                        : "rgba(255,255,255,0.25)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            NAVIGATION
        ───────────────────────────────────────────────────────────────── */}

        <button
          type="button"
          onClick={previous}
          aria-label="Previous photo"
          className={`absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/15 ${FOCUS_RING}`}
        >
          <ChevronLeft size={19} />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className={`absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/15 ${FOCUS_RING}`}
        >
          <ChevronRight size={19} />
        </button>
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          PROGRESS
      ──────────────────────────────────────────────────────────────────── */}

      <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-white/[0.07]">
        {!paused && !reducedMotion && (
          <motion.div
            key={current}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: SLIDE_INTERVAL / 1000,
              ease: "linear",
            }}
            className="h-full"
            style={{
              background: `linear-gradient(
                90deg,
                ${COLORS.hibiscus},
                ${COLORS.mango},
                ${COLORS.lime}
              )`,
            }}
          />
        )}
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          CONTROLS
      ──────────────────────────────────────────────────────────────────── */}

      <div className="mt-3 flex items-center justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[2px] text-white/25">
          Swipe to explore
        </p>

        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className={`flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[2px] text-white/45 transition-all hover:border-white/20 hover:text-white ${FOCUS_RING}`}
        >
          {paused ? (
            <>
              <Play size={10} />
              Play
            </>
          ) : (
            <>
              <Pause size={10} />
              Pause
            </>
          )}
        </button>
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          FLOATING CARDS
      ──────────────────────────────────────────────────────────────────── */}

      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                y: [-6, 6, -6],
                rotate: [-1, 1, -1],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-3 -top-5 z-30 hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-xl sm:block lg:-right-8"
        style={{
          background: "rgba(43,19,48,0.92)",
          borderColor: `${COLORS.mango}55`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background: `${COLORS.mango}18`,
              color: COLORS.mango,
            }}
          >
            <Trophy size={17} />
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[2px] text-white/35">
              Experience
            </p>

            <p
              className="font-black text-2xl leading-none"
              style={{ color: COLORS.mango }}
            >
              {new Date().getFullYear() - START_YEAR}+
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                y: [6, -6, 6],
              }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-5 -left-3 z-30 hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-xl sm:block lg:-left-8"
        style={{
          background: "rgba(226,63,115,0.95)",
          borderColor: "rgba(255,255,255,0.12)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
            <Users size={17} />
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[2px] text-white/60">
              Community
            </p>

            <p className="font-black text-2xl leading-none text-white">
              100+
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                y: [-4, 4, -4],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
        className="absolute -right-5 bottom-32 z-30 hidden items-center gap-2 rounded-full border px-4 py-2.5 backdrop-blur-xl lg:flex"
        style={{
          background: `${COLORS.lime}12`,
          borderColor: `${COLORS.lime}44`,
        }}
      >
        <Star
          size={11}
          fill={COLORS.lime}
          stroke={COLORS.lime}
        />

        <span
          className="font-mono text-[9px] font-bold uppercase tracking-[2px]"
          style={{ color: COLORS.lime }}
        >
          Certified
        </span>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({
  value,
  suffix,
  label,
  icon: Icon,
  color,
  glow,
  startCounter,
  reducedMotion,
}) {
  return (
    <motion.div
      whileHover={
        reducedMotion
          ? {}
          : {
              y: -5,
              scale: 1.02,
            }
      }
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 20,
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.035] p-4 backdrop-blur-sm"
    >
      {/* Hover glow */}
      <div
        className="absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: glow }}
      />

      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `${color}15`,
              color,
            }}
          >
            <Icon size={14} />
          </div>

          <ArrowDownRight
            size={13}
            className="text-white/15 transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5"
          />
        </div>

        <p
          className="font-black leading-none tracking-tight text-3xl sm:text-4xl"
          style={{ color }}
        >
          <Counter
            to={value}
            suffix={suffix}
            start={startCounter}
          />
        </p>

        <p className="mt-2 font-mono text-[9px] uppercase leading-tight tracking-[1.5px] text-white/35">
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
  const reducedMotion = useReducedMotion();

  const yearsOfExperience = Math.max(
    1,
    new Date().getFullYear() - START_YEAR
  );

  const [statsVisible, setStatsVisible] = useState(false);

  return (
    <section
      id="about"
      className="relative overflow-hidden text-white"
      style={{
        backgroundColor: COLORS.plum,
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          BACKGROUND SYSTEM
      ═══════════════════════════════════════════════════════════════════════ */}

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Pink glow */}
        <div
          className="absolute -left-40 top-0 h-150 w-150 rounded-full blur-[140px]"
          style={{
            backgroundColor: `${COLORS.hibiscus}18`,
          }}
        />

        {/* Orange glow */}
        <div
          className="absolute -right-40 bottom-0 h-150 w-150 rounded-full blur-[150px]"
          style={{
            backgroundColor: `${COLORS.mango}12`,
          }}
        />

        {/* Lime glow */}
        <div
          className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
          style={{
            backgroundColor: `${COLORS.lime}06`,
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(250,244,233,1) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(250,244,233,1) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "70px 70px",
        }}
        aria-hidden="true"
      />

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
            {/* Eyebrow */}
            <div
              className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2"
              style={{
                backgroundColor: `${COLORS.hibiscus}12`,
                borderColor: `${COLORS.hibiscus}35`,
              }}
            >
              <Flame
                size={12}
                style={{ color: COLORS.hibiscus }}
              />

              <span
                className="font-mono text-[10px] font-bold uppercase tracking-[3px]"
                style={{ color: COLORS.hibiscus }}
              >
                Meet Your Instructor
              </span>
            </div>

            {/* Main title */}
            <h2 className="max-w-5xl font-black uppercase leading-[0.82] tracking-[-0.06em]">
              <span
                className="block text-[clamp(4.5rem,15vw,10rem)]"
                style={{ color: COLORS.cream }}
              >
                HANNA
              </span>

              <span
                className="block text-[clamp(2rem,6vw,4.8rem)]"
                style={{
                  color: "transparent",
                  WebkitTextStroke: `1.5px ${COLORS.hibiscus}`,
                  letterSpacing: "0.08em",
                }}
              >
                WATHTHALAGE
              </span>
            </h2>

            {/* Count-in + location — the class's own opening beat, doing
                the job a plain divider used to do */}
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
              <span
                className="hidden h-px w-10 sm:block sm:w-16"
                style={{
                  background: `linear-gradient(
                    to right,
                    transparent,
                    ${COLORS.mango}
                  )`,
                }}
              />

              <div className="flex flex-wrap items-center justify-center gap-3">
                <CountIn reducedMotion={reducedMotion} />

                <p
                  className="font-mono text-[9px] uppercase tracking-[3px] sm:text-xs"
                  style={{ color: COLORS.mango }}
                >
                  Zumba Instructor · Kandy, Sri Lanka
                </p>
              </div>

              <span
                className="hidden h-px w-10 sm:block sm:w-16"
                style={{
                  background: `linear-gradient(
                    to left,
                    transparent,
                    ${COLORS.mango}
                  )`,
                }}
              />
            </div>

            {/* Intro statement */}
            <p className="mt-8 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              More than a workout. More than a dance class.
              <span className="text-white/80">
                {" "}
                It's a space to move, connect, laugh and
                become the strongest version of yourself.
              </span>
            </p>
          </div>
        </Reveal>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════════════════ */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:pb-32">
        <div className="grid items-start gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 xl:gap-28">
          {/* ════════════════════════════════════════════════════════════════
              LEFT — GALLERY
          ════════════════════════════════════════════════════════════════ */}

          <Reveal
            direction="left"
            reducedMotion={reducedMotion}
          >
            <InstructorGallery
              reducedMotion={reducedMotion}
            />
          </Reveal>

          {/* ════════════════════════════════════════════════════════════════
              RIGHT — CONTENT
          ════════════════════════════════════════════════════════════════ */}

          <div className="lg:pt-3">
            {/* Heading */}
            <Reveal reducedMotion={reducedMotion}>
              <div
                className="relative border-l-[3px] pl-5 sm:pl-6"
                style={{
                  borderColor: COLORS.hibiscus,
                }}
              >
                <p
                  className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[3px]"
                  style={{ color: COLORS.hibiscus }}
                >
                  The Woman Behind The Energy
                </p>

                <h3
                  className="max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                  style={{ color: COLORS.cream }}
                >
                  Inspiring Confidence
                  <br />

                  <span style={{ color: COLORS.hibiscus }}>
                    Through Dance.
                  </span>
                </h3>
              </div>
            </Reveal>

            {/* Body */}
            <Reveal
              delay={0.1}
              reducedMotion={reducedMotion}
            >
              <div className="mt-8 space-y-5">
                <p className="text-base leading-8 text-white/75 sm:text-lg">
                  Hanna found Zumba as a way to stay active while
                  doing what she loves most — dance. A personal
                  passion grew into a mission: help people move
                  freely, smile without holding back, and feel at
                  home in their own skin.
                </p>

                <p className="text-sm leading-7 text-white/45 sm:text-base">
                  Her classes combine energetic Latin rhythms,
                  easy-to-follow choreography and an atmosphere
                  where nobody has to feel judged. Whether you're
                  stepping into your first class or you've been
                  dancing for years, there's always room for you.
                </p>
              </div>
            </Reveal>

            {/* ══════════════════════════════════════════════════════════════
                PERSONALITY TAGS
            ══════════════════════════════════════════════════════════════ */}

            <Reveal
              delay={0.18}
              reducedMotion={reducedMotion}
            >
              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  {
                    icon: Heart,
                    text: "Positive Energy",
                  },
                  {
                    icon: Zap,
                    text: "High Energy",
                  },
                  {
                    icon: Users,
                    text: "Community",
                  },
                  {
                    icon: Sparkles,
                    text: "Good Vibes",
                  },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.035] px-3 py-2"
                  >
                    <Icon
                      size={12}
                      style={{ color: COLORS.lime }}
                    />

                    <span className="font-mono text-[9px] uppercase tracking-[1.5px] text-white/45">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* ══════════════════════════════════════════════════════════════
                STATS
            ══════════════════════════════════════════════════════════════ */}

            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: 0.22,
              }}
              onViewportEnter={() => setStatsVisible(true)}
              className="mt-10 grid grid-cols-3 gap-2.5 sm:gap-3"
            >
              <StatCard
                value={100}
                suffix="+"
                label="Happy Members"
                icon={Users}
                color={COLORS.hibiscus}
                glow={`${COLORS.hibiscus}55`}
                startCounter={statsVisible}
                reducedMotion={reducedMotion}
              />

              <StatCard
                value={yearsOfExperience}
                suffix="+"
                label="Years Teaching"
                icon={Trophy}
                color={COLORS.mango}
                glow={`${COLORS.mango}55`}
                startCounter={statsVisible}
                reducedMotion={reducedMotion}
              />

              <StatCard
                value={2}
                suffix=""
                label="Locations"
                icon={MapPin}
                color={COLORS.lime}
                glow={`${COLORS.lime}55`}
                startCounter={statsVisible}
                reducedMotion={reducedMotion}
              />
            </motion.div>

            {/* ══════════════════════════════════════════════════════════════
                AFFILIATIONS
            ══════════════════════════════════════════════════════════════ */}

            <Reveal
              delay={0.3}
              reducedMotion={reducedMotion}
            >
              <div className="mt-10">
                <div className="mb-4 flex items-center gap-3">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[3px] text-white/25">
                    Where You'll Find Her
                  </p>

                  <div className="h-px flex-1 bg-white/[0.07]" />
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {affiliations.map(
                    ({ label, icon: Icon }, index) => (
                      <motion.div
                        key={label}
                        initial={
                          reducedMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 10,
                              }
                        }
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 0.05 * index,
                        }}
                        whileHover={
                          reducedMotion
                            ? {}
                            : {
                                y: -2,
                              }
                        }
                        className="group flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/2.5 p-3 transition-all duration-300 hover:border-white/15 hover:bg-white/5"
                      >
                        <div
                          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors"
                          style={{
                            backgroundColor: `${COLORS.mango}12`,
                            color: COLORS.mango,
                          }}
                        >
                          <Icon size={12} />
                        </div>

                        <span className="font-mono text-[10px] leading-5 text-white/45 transition-colors group-hover:text-white/70">
                          {label}
                        </span>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </Reveal>

            {/* ══════════════════════════════════════════════════════════════
                CTA
            ══════════════════════════════════════════════════════════════ */}

            <Reveal
              delay={0.38}
              reducedMotion={reducedMotion}
            >
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Primary */}
                <Link
                  to="/blog"
                  className={`group relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 font-bold text-sm no-underline ${FOCUS_RING}`}
                  style={{
                    backgroundColor: COLORS.lime,
                    color: COLORS.plum,
                    boxShadow: `0 15px 45px ${COLORS.lime}25`,
                  }}
                >
                  {/* shimmer */}
                  <span
                    className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    aria-hidden="true"
                  />

                  <Sparkles size={15} />

                  <span className="relative">
                    Read Hanna's Story
                  </span>

                  <ArrowRight
                    size={15}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                {/* Secondary */}
                <a
                  href="#location"
                  className={`group inline-flex w-fit items-center gap-2 rounded-full font-mono text-xs uppercase tracking-[1.5px] text-white/40 no-underline transition-colors hover:text-white ${FOCUS_RING}`}
                >
                  <MapPin size={14} />

                  <span>Find a studio</span>

                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURE QUOTE
      ═══════════════════════════════════════════════════════════════════════ */}

      <div className="relative z-10 border-y border-white/[0.07]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
          <Reveal reducedMotion={reducedMotion}>
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/4">
              <Heart
                size={18}
                fill={COLORS.hibiscus}
                stroke={COLORS.hibiscus}
              />
            </div>

            <blockquote
              className="font-black leading-[1.05] tracking-tight"
              style={{
                color: COLORS.cream,
                fontSize: "clamp(2rem,5vw,4rem)",
              }}
            >
              “Don't dance because you have to.
              <br />

              <span style={{ color: COLORS.hibiscus }}>
                Dance because you can.
              </span>
              ”
            </blockquote>

            <p className="mt-7 font-mono text-[9px] uppercase tracking-[3px] text-white/25">
              The Hanna Waththalage Philosophy
            </p>
          </Reveal>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          BOTTOM TICKER
      ═══════════════════════════════════════════════════════════════════════ */}

      <div className="relative z-10">
        <Ticker
          reverse
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to top, rgba(43,19,48,0.8), transparent)",
        }}
      />
    </section>
  );
}