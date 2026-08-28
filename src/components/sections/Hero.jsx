/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { Play, X, Users, CalendarCheck, Flame, Trophy } from "lucide-react";
import previewReel from "../../assets/videos/v1.mp4";

const heroSlides = [
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80",
  "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=1600&q=80",
];
const SLIDE_INTERVAL_MS = 7000;

const stats = [
  { num: "4+",   label: "Years",    icon: CalendarCheck },
  { num: "100+", label: "Members",  icon: Users         },
  { num: "8",    label: "Classes",  icon: Flame         },
  { num: "4.9★", label: "Rating",  icon: Trophy        },
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

function useHoverCapable() {
  const [can, setCan] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const fn = (e) => setCan(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return can;
}

/* ── Ticker tape ────────────────────────────────────────────────────────────── */
const tickerItems = [
  "Zumba Fitness", "Mon 9–11 AM", "Tue 9–11 AM", "Tue 5–7 PM",
  "Wed 9–11 AM", "Thu 9–11 AM", "Thu 5–7 PM", "Fri 9–11 AM", "Sun 9–11 AM",
  "Studio Se Kala", "Studio Resh", "Kandy, Sri Lanka",
];

function TickerTape({ prefersReduced }) {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div
      className="overflow-hidden whitespace-nowrap"
      style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "10px 0" }}
    >
      <motion.div
        className="inline-flex gap-0"
        animate={prefersReduced ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center text-sm font-semibold uppercase tracking-[3px]" style={{ color: "rgba(250,244,233,0.45)", paddingRight: "3rem" }}>
            {item}
            <span className="ml-3 inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#FF9736", opacity: 0.7 }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Ghost ZUMBA watermark ──────────────────────────────────────────────────── */
function GhostText({ mouseX, mouseY, prefersReduced }) {
  const x = useTransform(mouseX, (v) => v * 30);
  const y = useTransform(mouseY, (v) => v * 20);
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <motion.span
        style={{
          x: prefersReduced ? 0 : x,
          y: prefersReduced ? 0 : y,
          fontSize: "clamp(8rem,30vw,24rem)",
          fontWeight: 900,
          letterSpacing: "-0.08em",
          color: "transparent",
          WebkitTextStroke: "2px rgba(255,255,255,0.04)",
          transform: "rotate(-8deg)",
          userSelect: "none",
          lineHeight: 1,
        }}
        animate={prefersReduced ? {} : { rotate: [-8, -6, -8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        ZUMBA
      </motion.span>
    </motion.div>
  );
}

/* ── Spotlight SVG cone ─────────────────────────────────────────────────────── */
function Spotlight({ prefersReduced }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <radialGradient id="spotlight" cx="50%" cy="0%" r="75%">
            <stop offset="0%"   stopColor="#FF9736" stopOpacity="0.12" />
            <stop offset="40%"  stopColor="#E23F73" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#2B1330" stopOpacity="0"    />
          </radialGradient>
        </defs>
        <motion.rect
          x="0" y="0" width="100%" height="100%"
          fill="url(#spotlight)"
          animate={prefersReduced ? {} : { opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Narrow cone beam */}
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="coneBeam" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%"   stopColor="#FF9736" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#E23F73" stopOpacity="0"   />
          </linearGradient>
        </defs>
        <motion.polygon
          points="50%,0 10%,100% 90%,100%"
          fill="url(#coneBeam)"
          animate={prefersReduced ? {} : { opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ── Outline-stroke headline ─────────────────────────────────────────────────── */
function StageHeadline({ prefersReduced }) {
  const styles = [
    // "FEEL IT." — outline only (stroke, transparent fill)
    {
      color:               "transparent",
      WebkitTextStroke:    "2px #FAF4E9",
    },
    // "MOVE IT." — gradient fill
    {
      backgroundImage:      "linear-gradient(135deg,#FF9736,#E23F73 50%,#C8F03C)",
      backgroundClip:       "text",
      WebkitBackgroundClip: "text",
      color:                "transparent",
      WebkitTextStroke:     "0px",
    },
    // "LOVE IT." — cream, but with a hibiscus stroke accent
    {
      color:            "#FAF4E9",
      WebkitTextStroke: "0px",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReduced ? 0 : 0.22, delayChildren: 0.2 } },
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 80, filter: "blur(14px)" },
    show: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: prefersReduced ? 0.01 : 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="font-extrabold text-[clamp(3.8rem,11vw,9rem)] leading-[0.88] tracking-tight"
    >
      {["FEEL IT.", "MOVE IT.", "LOVE IT."].map((word, i) => (
        <motion.span
          key={word}
          variants={wordVariants}
          className="block"
          style={styles[i]}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ── Scoreboard stats strip ──────────────────────────────────────────────────── */
function ScoreboardStrip() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-stretch divide-x"
      style={{
        background:   "rgba(255,255,255,0.05)",
        border:       "1px solid rgba(255,255,255,0.09)",
        borderRadius: "16px",
        backdropFilter: "blur(20px)",
        overflow:     "hidden",
        divide:       "rgba(255,255,255,0.09)",
      }}
    >
      {stats.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.34, 1.4, 0.64, 1] }}
            whileHover={{ background: "rgba(255,255,255,0.1)" }}
            className="flex-1 flex flex-col items-center justify-center py-5 px-4 gap-1.5 transition-colors cursor-default"
            style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
          >
            <Icon size={18} style={{ color: "#FF9736", opacity: 0.85 }} strokeWidth={1.8} />
            <div
              className="font-extrabold text-2xl md:text-3xl tabular-nums"
              style={{
                backgroundImage:      "linear-gradient(135deg,#FF9736,#E23F73)",
                backgroundClip:       "text",
                WebkitBackgroundClip: "text",
                color:                "transparent",
              }}
            >
              {item.num}
            </div>
            <div className="text-[10px] tracking-[2.5px] uppercase" style={{ color: "rgba(250,244,233,0.45)" }}>
              {item.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ── Live pill ──────────────────────────────────────────────────────────────── */
function LivePill({ nextClass, prefersReduced }) {
  if (!nextClass) return null;
  const isLive = nextClass.status === "live";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 300 }}
      className="inline-flex items-center gap-2 rounded-full text-xs font-bold uppercase tracking-[2px] px-4 py-2 mb-6"
      style={{
        background:  isLive ? "rgba(226,63,115,0.2)" : "rgba(200,240,60,0.15)",
        border:      `1px solid ${isLive ? "rgba(226,63,115,0.5)" : "rgba(200,240,60,0.4)"}`,
        color:       isLive ? "#E23F73" : "#C8F03C",
      }}
    >
      <motion.span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: isLive ? "#E23F73" : "#C8F03C" }}
        animate={isLive && !prefersReduced ? { scale: [1, 1.8, 1], opacity: [1, 0.5, 1] } : {}}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      {isLive ? "Live Now" : "Up Next"} · {nextClass.label} · {nextClass.time}
    </motion.div>
  );
}

/* ── VideoModal ─────────────────────────────────────────────────────────────── */
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
  const handleClose = useCallback(() => { videoRef.current?.pause(); onClose(); }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backdropFilter: "blur(14px)", background: "rgba(0,0,0,0.92)" }}
          onClick={handleClose}
          role="dialog" aria-modal="true" aria-label="Studio preview video"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.84, rotateX: "8deg" }}
            animate={{ opacity: 1, scale: 1,    rotateX: "0deg" }}
            exit={{   opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative w-full max-w-md"
            style={{ perspective: "800px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef} type="button" onClick={handleClose} aria-label="Close video"
              className="absolute -top-12 right-0 md:-right-12 w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <X size={20} />
            </button>
            <video
              ref={videoRef} src={previewReel}
              className="w-full max-h-[80vh] rounded-2xl"
              style={{ boxShadow: "0 0 100px rgba(226,63,115,0.35), 0 0 40px rgba(255,151,54,0.2)" }}
              autoPlay controls loop playsInline
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const watchButtonRef                = useRef(null);
  const prefersReducedMotion          = useReducedMotion();
  const canHover                      = useHoverCapable();
  const enableParallax                = canHover && !prefersReducedMotion;
  const nextClass                     = useMemo(() => getNextClass(), []);

  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion || heroSlides.length < 2) return;
    const id = setTimeout(() => setSlideIndex((i) => (i + 1) % heroSlides.length), SLIDE_INTERVAL_MS);
    return () => clearTimeout(id);
  }, [prefersReducedMotion, slideIndex]);

  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 16 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 16 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!enableParallax) return;
      mouseX.set(e.clientX / window.innerWidth  - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    },
    [enableParallax, mouseX, mouseY]
  );

  const handleBookClick = useCallback(() => {
    document.getElementById("schedule")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative isolate min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0E060F" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={slideIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{   opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroSlides[slideIndex]})`, opacity: 0.18 }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Deep vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%,transparent 30%,rgba(14,6,15,0.7) 65%,rgba(14,6,15,1) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(14,6,15,0.55)" }}
        />
      </div>

      {/* Ghost ZUMBA watermark */}
      <GhostText mouseX={springX} mouseY={springY} prefersReduced={prefersReducedMotion} />

      {/* Spotlight */}
      <Spotlight prefersReduced={prefersReducedMotion} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={prefersReducedMotion ? {} : { opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -top-64 left-1/2 -translate-x-1/2 w-225 h-150 rounded-[50%]"
          style={{ background: "radial-gradient(ellipse,rgba(255,151,54,0.12) 0%,rgba(226,63,115,0.08) 40%,transparent 70%)", filter: "blur(40px)" }}
        />
        <motion.div
          animate={prefersReducedMotion ? {} : { x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute bottom-40 left-10 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(200,240,60,0.1),transparent 65%)", filter: "blur(35px)" }}
        />
        <motion.div
          animate={prefersReducedMotion ? {} : { x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute bottom-40 right-10 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(226,63,115,0.1),transparent 65%)", filter: "blur(35px)" }}
        />
      </div>

      {/* Fine dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle,rgba(250,244,233,0.3) 1px,transparent 1px)",
          backgroundSize:  "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* ── Main content — 3D tilt card ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-20 px-6 pt-28 pb-16">
        <motion.div
          className="text-center w-full max-w-3xl mx-auto"
          style={
            enableParallax
              ? { rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: "1000px" }
              : {}
          }
        >
          <LivePill nextClass={nextClass} prefersReduced={prefersReducedMotion} />
          <StageHeadline prefersReduced={prefersReducedMotion} />

          {/* Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 -mx-6 md:-mx-16"
          >
            <TickerTape prefersReduced={prefersReducedMotion} />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(250,244,233,0.55)" }}
          >
            Kandy's most energetic Zumba classes — Latin rhythms, great music,
            and a community that lifts you every session.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            {/* Primary neon lime */}
            <motion.button
              type="button"
              onClick={handleBookClick}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(200,240,60,0.6), 0 0 80px rgba(200,240,60,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm font-black uppercase tracking-widest"
              style={{
                background:  "#C8F03C",
                color:       "#0E060F",
                boxShadow:   "0 0 24px rgba(200,240,60,0.45), 0 4px 16px rgba(0,0,0,0.4)",
                border:      "1px solid rgba(200,240,60,0.6)",
              }}
            >
              Book a Class
            </motion.button>

            {/* Secondary glass */}
            <motion.button
              ref={watchButtonRef}
              type="button"
              onClick={() => setIsVideoOpen(true)}
              whileHover={{
                scale: 1.05,
                background: "rgba(255,255,255,0.15)",
                borderColor: "rgba(255,255,255,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-widest text-white"
              style={{
                background:     "rgba(255,255,255,0.07)",
                border:         "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(20px)",
              }}
            >
              <Play size={17} />
              Watch In Action
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scoreboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl mx-auto mt-14"
        >
          <ScoreboardStrip />
        </motion.div>
      </div>

      {/* Bottom slide nav */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2" role="tablist" aria-label="Slides">
          {heroSlides.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === slideIndex}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlideIndex(i)}
              animate={{
                width:   i === slideIndex ? 28 : 6,
                opacity: i === slideIndex ? 1 : 0.3,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-1.5 rounded-full"
              style={{ background: i === slideIndex ? "#C8F03C" : "rgba(255,255,255,0.5)" }}
            />
          ))}
        </div>
      )}

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} triggerRef={watchButtonRef} />
    </section>
  );
}