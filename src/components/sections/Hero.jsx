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
  Star,
  CalendarCheck,
  Flame,
} from "lucide-react";
//import Button from "../ui/Button";
import heroImg from "../../assets/hero.jpg";
import previewReel from "../../assets/videos/v1.mp4";

/* -------------------------------------------------------------------- */
/*  Data                                                                  */
/* -------------------------------------------------------------------- */

const stats = [
  { num: "4+", label: "Years Experience", icon: CalendarCheck },
  { num: "100+", label: "Happy Members", icon: Users },
  { num: "4.9★", label: "Google Rating", icon: Star },
  { num: "12", label: "Weekly Classes", icon: Flame },
];

// Synced to the studio's actual tagline (used in Footer's ticker and the
// other Hero component) — was "MOVE. SWEAT. SHINE." here, which didn't
// match the rest of the site.
const headlineWords = ["DANCE.", "SWEAT.", "REPEAT."];

// TODO: replace with your real daily schedule (e.g. from data/classes.js).
// Times are 24h "HH:MM", durationMins is how long the class runs.
const todaySchedule = [
  { time: "06:00", label: "Morning Burn", durationMins: 50 },
  { time: "10:00", label: "Zumba Gold", durationMins: 50 },
  { time: "18:00", label: "Zumba Fusion", durationMins: 60 },
  { time: "19:30", label: "Weekend Warrior", durationMins: 60 },
];

/* -------------------------------------------------------------------- */
/*  Small helpers                                                         */
/* -------------------------------------------------------------------- */

function getNextClass(schedule, now = new Date()) {
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  for (const item of schedule) {
    const [h, m] = item.time.split(":").map(Number);
    const startMinutes = h * 60 + m;
    const endMinutes = startMinutes + item.durationMins;

    if (minutesNow >= startMinutes && minutesNow < endMinutes) {
      return { ...item, status: "live" };
    }
    if (minutesNow < startMinutes) {
      return { ...item, status: "upcoming" };
    }
  }
  return null; // nothing left today
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

/* -------------------------------------------------------------------- */
/*  Floating particles (purely decorative, skipped under reduced motion) */
/* -------------------------------------------------------------------- */

function FloatingParticles({ count = 14 }) {
  const shouldReduceMotion = useReducedMotion();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setParticles([]);
    } else {
      setParticles(
        Array.from({ length: count }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          size: 2 + Math.random() * 3,
          duration: 10 + Math.random() * 10,
          delay: Math.random() * 8,
          drift: (Math.random() - 0.5) * 60,
        }))
      );
    }
  }, [count, shouldReduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-yellow/50 blur-[1px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            bottom: -20,
          }}
          animate={{
            y: [0, -window.innerHeight * 0.9],
            x: [0, p.drift],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Live class card                                                       */
/* -------------------------------------------------------------------- */

function LiveClassCard({ nextClass }) {
  if (!nextClass) return null;
  const isLive = nextClass.status === "live";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="
        inline-flex items-center gap-3
        rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-2xl
        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
        px-5 py-3 mb-6
      "
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {isLive && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-pink opacity-75 animate-ping" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            isLive ? "bg-pink" : "bg-yellow"
          }`}
        />
      </span>

      <span className="text-left text-sm text-white/85">
        <span className="font-bold text-white">
          {isLive ? "Live Now" : "Next Class Today"}
        </span>
        <span className="text-white/60"> · {nextClass.label} · {nextClass.time}</span>
      </span>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/*  Stat card                                                             */
/* -------------------------------------------------------------------- */

function StatCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.04 }}
      className="
        group relative overflow-hidden rounded-2xl
        border border-white/10 bg-white/5 backdrop-blur-xl
        py-8 px-5 shadow-[0_4px_24px_rgba(0,0,0,0.25)]
        transition-shadow duration-300
        hover:shadow-[0_8px_40px_rgba(255,45,120,0.25)]
      "
    >
      {/* top accent line, brightens on hover */}
      <span className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-pink via-orange to-yellow opacity-40 group-hover:opacity-100 transition-opacity" />

      <Icon size={20} className="mx-auto mb-3 text-yellow/80" strokeWidth={2} />

      <div className="font-bebas text-5xl md:text-6xl bg-linear-to-r from-yellow to-orange bg-clip-text text-transparent">
        {item.num}
      </div>

      <div className="mt-2 text-sm tracking-[2px] uppercase text-white/60">
        {item.label}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/*  Video modal                                                           */
/* -------------------------------------------------------------------- */

function VideoModal({ isOpen, onClose, triggerRef }) {
  const closeButtonRef = useRef(null);
  const videoRef = useRef(null);

  // Escape to close + focus the close button on open, restore focus on close
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  const handleClose = useCallback(() => {
    // Pause immediately rather than waiting for unmount/exit animation to finish
    videoRef.current?.pause();
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Studio preview video"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
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
                w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                flex items-center justify-center text-white
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

/* -------------------------------------------------------------------- */
/*  Hero                                                                   */
/* -------------------------------------------------------------------- */

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const watchButtonRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const canHover = useHoverCapable();
  const enableParallax = canHover && !prefersReducedMotion;

  const nextClass = useMemo(() => getNextClass(todaySchedule), []);

  /* Mouse parallax — subtle depth shift on the background & glow layers */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.5 });
  const bgX = useTransform(springX, (v) => v * 14);
  const bgY = useTransform(springY, (v) => v * 14);
  const contentX = useTransform(springX, (v) => v * -6);
  const contentY = useTransform(springY, (v) => v * -6);

  const handleMouseMove = useCallback(
    (e) => {
      if (!enableParallax) return;
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    },
    [enableParallax, mouseX, mouseY]
  );

  const headlineContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.18, delayChildren: 0.15 },
    },
  };

  const headlineWord = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: prefersReducedMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative isolate min-h-screen flex items-center justify-center overflow-hidden text-center"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center scale-110 transform-gpu"
        style={{
          backgroundImage: `url(${heroImg})`,
          x: enableParallax ? bgX : 0,
          y: enableParallax ? bgY : 0,
        }}
        animate={
          prefersReducedMotion
            ? {}
            : { scale: [1.08, 1.12, 1.08] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      {/* Dark gradient, animated shift */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-[#09091A]/95 via-[#2D1B6E]/80 to-[#09091A]/95 bg-size-[200%_200%] transform-gpu"
        animate={
          prefersReducedMotion
            ? {}
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      {/* Accent glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={prefersReducedMotion ? {} : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute -top-48 -right-48 w-162.5 h-162.5 rounded-full blur-[120px] bg-pink/20 transform-gpu"
        />
        <motion.div
          animate={prefersReducedMotion ? {} : { x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
          className="absolute -bottom-40 -left-40 w-112.5 h-112.5 rounded-full blur-[100px] bg-yellow/20 transform-gpu"
        />
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full blur-[80px] bg-orange/15 transform-gpu"
        />
      </div>

      {/* Floating particles */}
      {!prefersReducedMotion && <FloatingParticles />}

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="container relative z-20 px-6 transform-gpu"
        style={{
          x: enableParallax ? contentX : 0,
          y: enableParallax ? contentY : 0,
        }}
      >
        {/* Premium badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative inline-flex items-center gap-2 overflow-hidden
            rounded-full border border-white/20 bg-white/10 backdrop-blur-xl
            px-5 py-2 mb-6 shadow-[0_4px_20px_rgba(255,45,120,0.15)]
          "
        >
          {!prefersReducedMotion && (
            <motion.span
              className="absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
              animate={{ x: ["0%", "300%"] }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
              aria-hidden="true"
            />
          )}
          <span className="text-xs md:text-sm tracking-[2px] md:tracking-[3px] uppercase text-yellow font-semibold">
           ................................
          </span>
        </motion.div>

        {/* Next class / live indicator */}
        <div>
          <LiveClassCard nextClass={nextClass} />
          
        </div>

        {/* Heading — word-by-word reveal */}
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-bebas text-[clamp(5rem,13vw,10rem)] leading-[0.88] tracking-wide"
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              variants={headlineWord}
              className={`block ${
                i === 1
                  ? "bg-linear-to-r from-lime-500 via-orange to-yellow bg-clip-text text-transparent"
                  : "text-white"
              }`}
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
          Transform your fitness journey through energetic dance workouts,
          incredible music, and a community that motivates you every step
          of the way.
          <span className="block mt-3 text-white font-semibold">
            First Trial Class Completely FREE
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          {/* Primary CTA with glow-on-hover wrapper */}
          <div className="group relative">
            <div
              className="
                absolute -inset-1 rounded-full bg-linear-to-r from-pink to-orange
                opacity-0 group-hover:opacity-60 blur-lg transition-opacity duration-300
              "
              aria-hidden="true"
            />
            
          </div>

          {/* Secondary CTA with glow-on-hover */}
          <div className="group relative">
            <div
              className="
                absolute -inset-1 rounded-full bg-white/30
                opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300
              "
              aria-hidden="true"
            />
            <button
              ref={watchButtonRef}
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="
                relative inline-flex items-center gap-2
                rounded-full border border-white/25 bg-white/10 backdrop-blur-xl
                px-8 py-4 text-sm md:text-base font-semibold uppercase tracking-wide text-white
                shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                hover:bg-white/20 hover:border-white/40 transition-colors
                focus-visible:outline-2 focus-visible:outline-yellow focus-visible:outline-offset-2
              "
            >
              <Play size={18} />
              Watch Us In Action
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, i) => (
            <StatCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </motion.div>

      

      {/* Scroll indicator */}
      

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        triggerRef={watchButtonRef}
      />
    </section>
  );
}