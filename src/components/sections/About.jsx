import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, GraduationCap, ChevronLeft, ChevronRight, Flame, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Image imports ────────────────────────────────────────────────────────────
import imgTt          from "../../assets/tt.jpg";
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

// ─── Brand tokens ─────────────────────────────────────────────────────────────
// cream: #FAF4E9 | hibiscus: #E23F73 | mango: #FF9736 | plum: #2B1330 | lime: #C8F03C

const START_YEAR     = 2022;
const SLIDE_INTERVAL = 3800;

const slides = [
  { src: imgTt,          alt: "Hanna leading a warm-up stretch" },
  { src: imgInstructor3, alt: "Hanna counting out a rhythm" },
  { src: imgI25,         alt: "Hanna breaking down a step sequence" },
  { src: imgI27,         alt: "Hanna demonstrating arm placement" },
  { src: imgI16,         alt: "Hanna mid-turn during a routine" },
  { src: imgI26,         alt: "Hanna explaining footwork to the class" },
  { src: imgI28,         alt: "Hanna and class dancing in formation" },
  { src: imgI88,         alt: "Hanna and class laughing during a break" },
  { src: imgInstructor4, alt: "Hanna giving one-on-one feedback" },
  { src: imgInstructor1, alt: "Hanna adjusting posture or stance" },
  { src: imgI7,          alt: "Hanna and the full group finishing a routine" },
  { src: imgI5,          alt: "Hanna with class posing after a session" },
  { src: imgInstructor2, alt: "Hanna reviewing choreography notes" },
];

const affiliations = [
  { label: "Resh Dance Studio Kandy",                          icon: MapPin        },
  { label: "Nimal Senanayake Academy of Performing Arts",      icon: MapPin        },
  { label: "Green Angels International School — Gelioya",      icon: GraduationCap },
  { label: "Green Angels International Educational Institute", icon: GraduationCap },
];

const tickerItems = [
  "✦ Zumba Fitness",
  "✦ Latin Rhythms",
  "✦ Certified Instructor",
  "✦ Kandy, Sri Lanka",
  "✦ 100+ Members",
  "✦ Cardio Dance",
  "✦ All Levels Welcome",
  "✦ Feel The Beat",
];

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame;
    const step = () => {
      setVal((v) => {
        if (v >= to) return to;
        frame = requestAnimationFrame(step);
        return Math.min(v + Math.ceil(to / 40), to);
      });
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to]);
  return <>{val}{suffix}</>;
}

// ─── Infinite ticker ──────────────────────────────────────────────────────────
function Ticker({ prefersReduced }) {
  const repeated = [...tickerItems, ...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden py-3 border-y border-hibiscus/20 my-0">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={prefersReduced ? {} : { x: ["0%", "-33.333%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="text-xs font-mono font-bold tracking-[3px] uppercase shrink-0"
            style={{
              color: i % 3 === 0 ? "#E23F73" : i % 3 === 1 ? "#FF9736" : "#C8F03C",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Slideshow ────────────────────────────────────────────────────────────────
function InstructorSlideshow({ prefersReduced }) {
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused]       = useState(false);

  const goTo = (idx, dir) => {
    setDirection(dir);
    setCurrent((idx + slides.length) % slides.length);
  };
  const prev = () => goTo(current - 1, -1);
  const next = () => goTo(current + 1,  1);

  useEffect(() => {
    if (paused || prefersReduced) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, prefersReduced]);

  const variants = {
    enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.97 }),
    center: ()    => ({ opacity: 1, x: 0,                   scale: 1    }),
    exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80,  scale: 0.97 }),
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative ring */}
      <div
        className="absolute -inset-3 rounded-[2.5rem] pointer-events-none z-0"
        style={{
          background: "conic-gradient(from 180deg, #E23F73 0%, #FF9736 30%, #C8F03C 60%, #E23F73 100%)",
          opacity: 0.18,
          filter: "blur(2px)",
        }}
        aria-hidden="true"
      />

      {/* Main frame */}
      <div className="relative z-10 h-130 sm:h-160 rounded-4xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.img
            key={current}
            src={slides[current].src}
            alt={slides[current].alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(43,19,48,0.92) 0%, rgba(43,19,48,0.30) 40%, transparent 70%), linear-gradient(to right, rgba(43,19,48,0.45) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
          style={{ background: "radial-gradient(circle at top right, rgba(226,63,115,0.35) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-cream/40 text-[10px] uppercase tracking-widest">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </p>
            <p className="font-mono text-cream/30 text-[10px] uppercase tracking-widest">
              {slides[current].alt.split(" ").slice(0, 4).join(" ")}…
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Go to photo ${i + 1}`}
                style={{ backgroundColor: i === current ? "#C8F03C" : undefined }}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-7 h-1.5" : "w-1.5 h-1.5 bg-cream/20 hover:bg-cream/50"
                }`}
              />
            ))}
          </div>
        </div>

        {[
          { fn: prev, label: "Previous photo", Icon: ChevronLeft,  side: "left-4"  },
          { fn: next, label: "Next photo",     Icon: ChevronRight, side: "right-4" },
        ].map(({ fn, label, Icon, side }) => (
          <button
            key={label}
            type="button"
            onClick={fn}
            aria-label={label}
            className={`absolute ${side} top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-cream/10 backdrop-blur-md flex items-center justify-center text-cream border border-cream/15 hover:bg-hibiscus hover:border-hibiscus hover:scale-110 transition-all duration-200`}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      {!prefersReduced && !paused && (
        <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(250,244,233,0.08)" }}>
          <motion.div
            key={current}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(to right, #E23F73, #C8F03C)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
          />
        </div>
      )}

      {/* Floating stat cards */}
      <motion.div
        animate={prefersReduced ? {} : { y: [-7, 7, -7] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -right-4 z-20 rounded-2xl px-5 py-4 shadow-[0_24px_60px_rgba(255,151,54,0.35)]"
        style={{ background: "linear-gradient(135deg, #2B1330 0%, #3d1f4a 100%)", border: "1px solid rgba(255,151,54,0.4)" }}
      >
        <p className="font-bricolage font-extrabold text-3xl leading-none" style={{ color: "#FF9736" }}>
          {Math.max(1, new Date().getFullYear() - START_YEAR)}+
        </p>
        <p className="font-mono mt-1 tracking-wider uppercase text-[10px]" style={{ color: "rgba(250,244,233,0.5)" }}>
          Yrs Teaching
        </p>
      </motion.div>

      <motion.div
        animate={prefersReduced ? {} : { y: [7, -7, 7] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        className="absolute -bottom-6 -left-4 z-20 rounded-2xl px-5 py-4"
        style={{ background: "linear-gradient(135deg, #E23F73 0%, #c42d5f 100%)", boxShadow: "0 24px 60px rgba(226,63,115,0.45)" }}
      >
        <p className="font-bricolage font-extrabold text-3xl leading-none text-white">100+</p>
        <p className="font-mono mt-1 tracking-wider uppercase text-[10px] text-white/80">Members</p>
      </motion.div>

      <motion.div
        animate={prefersReduced ? {} : { y: [-4, 4, -4], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute -right-8 bottom-36 z-20 flex items-center gap-2 rounded-full px-4 py-2"
        style={{ background: "rgba(200,240,60,0.12)", border: "1px solid rgba(200,240,60,0.35)", backdropFilter: "blur(12px)" }}
      >
        <Star size={11} fill="#C8F03C" stroke="#C8F03C" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: "#C8F03C" }}>
          Certified
        </span>
      </motion.div>
    </div>
  );
}

// ─── Main About Section ───────────────────────────────────────────────────────
export default function About() {
  const prefersReduced    = useReducedMotion();
  const yearsOfExperience = Math.max(1, new Date().getFullYear() - START_YEAR);
  const [inView, setInView] = useState(false);

  return (
    <section
      id="about"
      className="relative overflow-hidden text-cream selection:bg-lime selection:text-plum"
      style={{ backgroundColor: "#2B1330" }}
    >
      {/* Mesh gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 10%, rgba(226,63,115,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 90%, rgba(255,151,54,0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(43,19,48,0) 0%, rgba(43,19,48,0.6) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #FAF4E9 1px, transparent 0)",
          backgroundSize:  "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Top ticker */}
      <div className="relative z-10 pt-6">
        <Ticker prefersReduced={prefersReduced} />
      </div>

      {/* Eyebrow + headline */}
      <div className="relative z-10 pt-16 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
            style={{ background: "rgba(226,63,115,0.12)", border: "1px solid rgba(226,63,115,0.30)" }}
          >
            <Flame size={12} style={{ color: "#E23F73" }} />
            <span className="font-mono font-semibold tracking-[4px] uppercase text-[11px]" style={{ color: "#E23F73" }}>
              Meet Your Instructor
            </span>
          </div>

          <div className="relative inline-block">
            <h2 className="font-bricolage font-extrabold leading-[0.85] tracking-tight">
              <span className="block" style={{ fontSize: "clamp(4rem,13vw,9rem)", color: "#FAF4E9" }}>
                HANNA
              </span>
              <span
                className="block"
                style={{ fontSize: "clamp(1.7rem,5.5vw,4rem)", WebkitTextStroke: "1.5px #E23F73", color: "transparent", letterSpacing: "0.12em" }}
              >
                WATHTHALAGE
              </span>
            </h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="absolute pointer-events-none"
              style={{
                bottom: "54%", left: "47%",
                width: "clamp(48px, 6vw, 80px)", height: "9px",
                background: "linear-gradient(90deg, #E23F73, #FF9736)",
                transform: "rotate(-8deg)", borderRadius: "4px",
                transformOrigin: "left center", opacity: 0.9, mixBlendMode: "screen",
              }}
              aria-hidden="true"
            />
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, #FF9736)" }} />
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "#FF9736" }}>
              Zumba Instructor · Kandy, Sri Lanka
            </p>
            <div className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, #FF9736)" }} />
          </div>
        </motion.div>
      </div>

      {/* Main grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid lg:grid-cols-[5fr_6fr] gap-14 xl:gap-24 items-start">

          {/* Left: Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            onViewportEnter={() => setInView(true)}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative pt-8 pb-10 px-5 lg:px-0"
          >
            <InstructorSlideshow prefersReduced={prefersReduced} />
          </motion.div>

          {/* Right: Content */}
          <div className="lg:pt-4 flex flex-col gap-8">

            {/* Pull quote */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative pl-5"
              style={{ borderLeft: "3px solid #E23F73" }}
            >
              <h3 className="font-bricolage text-2xl sm:text-3xl font-bold leading-snug" style={{ color: "#FAF4E9" }}>
                Inspiring Confidence{" "}
                <span style={{ color: "#E23F73" }}>Through Dance</span>
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[4px] mt-2" style={{ color: "rgba(250,244,233,0.35)" }}>
                Zumba Certified Instructor
              </p>
            </motion.div>

            {/* Body copy */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="leading-8 text-base sm:text-lg" style={{ color: "rgba(250,244,233,0.78)" }}>
                Hanna discovered Zumba as a way to stay active and do what she loves most — dance. What began as personal passion quickly grew into a mission: helping people across Kandy move freely, smile genuinely, and feel great in their own skin.
              </p>
              <p className="leading-8" style={{ color: "rgba(250,244,233,0.52)" }}>
                Every class she leads blends high-energy Latin rhythms with easy-to-follow choreography in a warm, judgement-free space. Whether you've never stepped on a dance floor or you've been moving for years, you'll always leave feeling stronger and happier.
              </p>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { value: 100, suffix: "+", label: "Happy Members", color: "#E23F73", glow: "rgba(226,63,115,0.25)" },
                { value: yearsOfExperience, suffix: "+", label: "Years Teaching", color: "#FF9736", glow: "rgba(255,151,54,0.25)" },
                { value: 2,   suffix: "",  label: "Locations",     color: "#C8F03C", glow: "rgba(200,240,60,0.20)" },
              ].map(({ value, suffix, label, color, glow }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.04, y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center text-center rounded-2xl p-4 cursor-default"
                  style={{
                    background: "rgba(250,244,233,0.04)",
                    border: "1px solid rgba(250,244,233,0.08)",
                    boxShadow: "inset 0 1px 0 rgba(250,244,233,0.06)",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = color + "44";
                    e.currentTarget.style.boxShadow = `0 0 24px ${glow}, inset 0 1px 0 rgba(250,244,233,0.06)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(250,244,233,0.08)";
                    e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(250,244,233,0.06)";
                  }}
                >
                  <p className="font-bricolage font-extrabold text-3xl sm:text-4xl leading-none" style={{ color }}>
                    {inView ? <Counter to={value} suffix={suffix} /> : `0${suffix}`}
                  </p>
                  <p className="font-mono text-[10px] mt-2 uppercase tracking-wider leading-tight" style={{ color: "rgba(250,244,233,0.40)" }}>
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Affiliation pills */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              viewport={{ once: true }}
            >
              <p className="font-mono font-bold tracking-[4px] uppercase mb-3 text-[10px]" style={{ color: "rgba(250,244,233,0.30)" }}>
                Where you'll find her
              </p>
              <div className="flex flex-wrap gap-2">
                {affiliations.map(({ label, icon: Icon }) => (
                  <motion.span
                    key={label}
                    whileHover={{ scale: 1.03 }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-xs transition-all duration-200 cursor-default"
                    style={{ background: "rgba(250,244,233,0.04)", border: "1px solid rgba(250,244,233,0.10)", color: "rgba(250,244,233,0.60)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,151,54,0.10)";
                      e.currentTarget.style.borderColor = "rgba(255,151,54,0.40)";
                      e.currentTarget.style.color = "#FF9736";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(250,244,233,0.04)";
                      e.currentTarget.style.borderColor = "rgba(250,244,233,0.10)";
                      e.currentTarget.style.color = "rgba(250,244,233,0.60)";
                    }}
                  >
                    <Icon size={11} className="shrink-0" />
                    {label}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* ── PRIMARY CTA → Blog page ── */}
              <Link to="/blog">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-3 font-bold text-sm px-7 py-3.5 rounded-full relative overflow-hidden cursor-pointer"
                  style={{
                    background: "#C8F03C",
                    color: "#2B1330",
                    boxShadow: "0 10px 40px rgba(200,240,60,0.30)",
                  }}
                >
                  {/* Shimmer sweep */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                      transform: "translateX(-100%)",
                      animation: "shimmer 0.6s ease forwards",
                    }}
                  />
                  <Sparkles size={15} />
                  Read the Blog
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </motion.span>
              </Link>

              {/* Ghost CTA */}
              <a
                href="#location"
                className="inline-flex items-center gap-2 font-mono text-sm transition-colors no-underline"
                style={{ color: "rgba(250,244,233,0.45)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#FF9736"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(250,244,233,0.45)"; }}
              >
                <MapPin size={14} />
                Find a studio
              </a>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom ticker (reversed) */}
      <div className="relative z-10">
        <div className="overflow-hidden py-3 border-t border-hibiscus/15">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={prefersReduced ? {} : { x: ["-33.333%", "0%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="font-mono font-bold tracking-[3px] uppercase shrink-0 text-xs"
                style={{ color: "rgba(250,244,233,0.15)" }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}