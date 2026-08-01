import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
// cream: #FAF4E9 | hibiscus: #E23F73 | mango: #FF9736 | plum: #2B1330 | lime: #C8F03C

const START_YEAR = 2022;
const SLIDE_INTERVAL = 3500; // ms between auto-advances

// ── Add / remove images here ──────────────────────────────────────────────────
const slides = [
  { src: "/src/assets/i13.jpg", alt: "Hanna demonstrating choreography" },
  { src: "/src/assets/instructor3.jpg", alt: "Hanna demonstrating choreography" },
  { src: "/src/assets/i25.jpg",           alt: "Hanna demonstrating choreography"  },
  { src: "/src/assets/i27.jpg",           alt: "Hanna demonstrating choreography"  },
  { src: "/src/assets/i16.jpg",           alt: "Hanna demonstrating choreography"  },
  { src: "/src/assets/i26.jpg",           alt: "Hanna demonstrating choreography"   },
  { src: "/src/assets/i28.jpg", alt: "Hanna with class members" },
  { src: "/src/assets/i88.jpg", alt: "Hanna with class members" },
  { src: "/src/assets/instructor4.jpg", alt: "Hanna with class members" },
  { src: "/src/assets/instructor1.jpg", alt: "Hanna with class members" },
  { src: "/src/assets/i7.jpg", alt: "Hanna with class members" },
  { src: "/src/assets/i5.jpg", alt: "Hanna with class members" },
  { src: "/src/assets/instructor2.jpg", alt: "Hanna with class members" },

  // add more: { src: "/src/assets/i3.jpg", alt: "..." },
];

const affiliations = [
  { label: "Resh Dance Studio Kandy",                          icon: MapPin        },
  { label: "Nimal Senanayake Academy of Performing Arts",      icon: MapPin        },
  { label: "Green Angels International School — Gelioya",      icon: GraduationCap },
  { label: "Green Angels International Educational Institute", icon: GraduationCap },
];

// ─── Slideshow ────────────────────────────────────────────────────────────────
function InstructorSlideshow({ prefersReduced }) {
  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [paused, setPaused]     = useState(false);

  const goTo = (idx, dir) => {
    setDirection(dir);
    setCurrent((idx + slides.length) % slides.length);
  };

  const prev = () => goTo(current - 1, -1);
  const next = () => goTo(current + 1,  1);

  // auto-advance
  useEffect(() => {
    if (paused || prefersReduced) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, prefersReduced]);

  const variants = {
    enter:  (dir) => ({ opacity: 0, x: dir > 0 ?  60 : -60, scale: 0.97 }),
    center: ()    => ({ opacity: 1, x: 0,              scale: 1           }),
    exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -60 :  60, scale: 0.97  }),
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── image frame ── */}
      <div className="relative h-105 sm:h-125 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(226,63,115,0.30)]">
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

        {/* gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-plum/70 to-transparent pointer-events-none" />

        {/* arrow buttons */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/15 hover:bg-hibiscus transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/15 hover:bg-hibiscus transition-all"
        >
          <ChevronRight size={18} />
        </button>

        {/* dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Go to photo ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-hibiscus shadow-[0_0_8px_rgba(226,63,115,0.7)]"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── progress bar (resets each slide) ── */}
      {!prefersReduced && !paused && (
        <motion.div
          key={current}
          className="absolute -bottom-3 left-0 right-0 h-0.5 rounded-full bg-hibiscus/30 overflow-hidden mx-4"
        >
          <motion.div
            className="h-full bg-linear-to-r from-hibiscus to-mango rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* ── corner accents (outside the overflow-hidden frame) ── */}
      <div className="absolute -top-5 -left-5 w-32 h-32 border-l-4 border-t-4 border-hibiscus rounded-tl-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -right-5 w-32 h-32 border-r-4 border-b-4 border-mango rounded-br-3xl pointer-events-none" />

      {/* ── floating experience badge ── */}
      <motion.div
        animate={prefersReduced ? {} : { y: [-8, 8, -8] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -bottom-10 -right-6 bg-linear-to-r from-mango to-hibiscus px-6 py-5 rounded-2xl shadow-2xl z-10"
      >
        <h3 className="text-4xl font-bold text-cream">
          {Math.max(1, new Date().getFullYear() - START_YEAR)}+
        </h3>
        <p className="text-cream/80 text-sm">Years of Experience</p>
      </motion.div>
    </div>
  );
}

// ─── Main About Section ───────────────────────────────────────────────────────
export default function About() {
  const prefersReduced    = useReducedMotion();
  const yearsOfExperience = Math.max(1, new Date().getFullYear() - START_YEAR);

  const fadeLeft  = { initial: { opacity: 0, x: prefersReduced ? 0 : -60 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.7 }, viewport: { once: true } };
  const fadeRight = { initial: { opacity: 0, x: prefersReduced ? 0 :  60 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.7 }, viewport: { once: true } };

  return (
    <section
      id="about"
      className="relative overflow-hidden py-28 bg-plum text-cream selection:bg-lime selection:text-plum"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #FAF4E9 1px, transparent 0)",
          backgroundSize:  "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div className="absolute -top-40 -right-40 w-125 h-125 bg-mango/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 w-100 h-100 bg-hibiscus/8  rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[6px] text-mango text-sm font-semibold font-mono">
            Meet Your Instructor
          </p>
          <h2 className="font-bricolage text-cream text-5xl md:text-7xl mt-3 font-extrabold">
            Hanna
            <span className="text-hibiscus"> Waththalage</span>
          </h2>
          <div className="w-28 h-1 bg-linear-to-r from-hibiscus to-mango mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Slideshow column ── */}
          <motion.div {...fadeLeft} className="relative flex justify-center pb-10">
            <InstructorSlideshow prefersReduced={prefersReduced} />
          </motion.div>

          {/* ── Content column ── */}
          <motion.div {...fadeRight}>
            <h3 className="font-bricolage text-3xl font-bold text-cream mb-6">
              Inspiring Confidence Through Dance
            </h3>

            <p className="text-cream/80 leading-8 text-lg">
              Hanna discovered Zumba as a way to stay active and do what she loves most — dance. What began as personal passion quickly grew into a mission: helping people across Kandy move freely, smile genuinely, and feel great in their own skin.
            </p>

            <p className="text-cream/60 leading-8 mt-6">
              Every class she leads blends high-energy Latin rhythms with easy-to-follow choreography in a warm, judgement-free space. Whether you've never stepped on a dance floor or you've been moving for years, you'll always leave feeling stronger and happier.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5 my-10">
              <div className="text-center bg-cream/5 rounded-2xl p-5 border border-cream/10">
                <h3 className="text-hibiscus text-3xl font-bold font-bricolage">100+</h3>
                <p className="text-cream/50 text-sm mt-1">Happy Members</p>
              </div>
              <div className="text-center bg-cream/5 rounded-2xl p-5 border border-cream/10">
                <h3 className="text-mango text-3xl font-bold font-bricolage">{yearsOfExperience}+</h3>
                <p className="text-cream/50 text-sm mt-1">Years Teaching</p>
              </div>
            </div>

            {/* Affiliation pills */}
            <div>
              <p className="text-cream/40 text-xs font-bold tracking-widest uppercase mb-4 font-mono">
                Where you'll find her
              </p>
              <div className="flex flex-wrap gap-2">
                {affiliations.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream/5 border border-cream/15 text-cream/70 text-xs font-mono font-medium hover:border-mango/40 hover:text-mango transition-colors"
                  >
                    <Icon size={11} className="shrink-0" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="#schedule"
                className="group inline-flex items-center gap-3 bg-lime text-plum font-bold text-sm md:text-base px-7 py-3.5 rounded-full shadow-[0_10px_30px_rgba(200,240,60,0.25)] hover:bg-[#d4f94e] hover:shadow-[0_15px_40px_rgba(200,240,60,0.35)] hover:scale-[1.03] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2 no-underline"
              >
                Join a Class
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}