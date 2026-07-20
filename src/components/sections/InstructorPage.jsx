import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Sparkles,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import instructorImg from "../../assets/i7.jpg";
import slide1 from "../../assets/i26.jpg";
import slide2 from "../../assets/instructor1.jpg";
import slide3 from "../../assets/instructor2.jpg";
import slide4 from "../../assets/instructor3.jpg";
import slide5 from "../../assets/instructor4.jpg";
import slide6 from "../../assets/i29.jpg";
import slide7 from "../../assets/i28.jpg";
import slide8 from "../../assets/i27.jpg";
import slide9 from "../../assets/i4.jpg";
import slide10 from "../../assets/i5.jpg";


const START_YEAR = 2022;

const affiliations = [
  { type: "work", label: "Green Angels International School" },
  { type: "work", label: "Green Angels International Educational Institute" },
  { type: "work", label: "Nimal Senanayake Academy of Performing Arts" },
  { type: "work", label: "Resh Dance Studio Kandy" },
  {
    type: "location",
    label: "Kandy",
    href: "https://web.facebook.com/Kandy-108014839219027/",
  },
];

const highlights = [
  "High-energy, beginner-friendly choreography",
  "Warm, judgment-free studio atmosphere",
  "Music-led classes that keep every session fresh",
];

const achievements = [
  {
    year: "2022",
    title: "Started Teaching Zumba",
    detail: "Began leading group fitness sessions in Kandy",
  },
  {
    year: "2023",
    title: "Certified Zumba® Instructor",
    detail: "Completed official Zumba® International licensing",
  },
  {
    year: "2024",
    title: "100+ Students Milestone",
    detail: "Grew a loyal community across multiple studios",
  },
  {
    year: "2025",
    title: "Performing Arts Collaborations",
    detail: "Guest sessions with Nimal Senanayake Academy",
  },
];

const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10];

const TABS = [
  { id: "bio", label: "About Hanna" },
  { id: "journey", label: "Her Journey" },
  { id: "find", label: "Find Her" },
];

function InstructorSlideshow() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (newIndex) => {
      setDirection(newIndex > index ? 1 : -1);
      setIndex((newIndex + slides.length) % slides.length);
    },
    [index]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div>
      <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-8 text-center">
        In Action
      </p>

      <div className="flex items-center justify-center gap-5 md:gap-8">
        {/* Prev button — outside the circle */}
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="shrink-0 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-pink hover:border-pink transition-colors focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Circular frame */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
          {/* Animated glowing ring */}
          <motion.div
            className="absolute -inset-2 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, var(--color-pink), var(--color-orange), var(--color-yellow), var(--color-pink))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          {/* Soft glow blur behind the ring */}
          <div className="absolute -inset-2 rounded-full bg-linear-to-r from-pink via-orange to-yellow opacity-40 blur-xl" />

          {/* Photo circle */}
          <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-dark bg-black">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={index}
                src={slides[index]}
                alt={`Hanna Waththalage — photo ${index + 1}`}
                custom={direction}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 rounded-full bg-linear-to-t from-dark/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Next button — outside the circle */}
        <button
          onClick={next}
          aria-label="Next photo"
          className="shrink-0 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-pink hover:border-pink transition-colors focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-pink" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function InstructorPage() {
  const [activeTab, setActiveTab] = useState("bio");
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = Math.max(1, currentYear - START_YEAR);

  return (
    <section className="relative min-h-screen bg-dark overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      {/* Banner hero */}
      <div className="relative h-[42vh] min-h-150 max-h-100 w-full overflow-hidden">
        <img
          src={instructorImg}
          alt="Hanna Waththalage"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/70 to-dark/20" />
        <div className="absolute inset-0 bg-linear-to-r from-dark/80 via-transparent to-transparent" />

        <div className="absolute top-6 left-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-pink transition-colors text-sm font-medium bg-dark/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-6xl mx-auto"
        >
          <p className="uppercase tracking-[6px] text-pink text-sm font-semibold mb-2">
            Meet Your Instructor
          </p>
          <h1 className="font-bebas text-white text-6xl md:text-8xl leading-none">
            Hanna <span className="text-pink">Waththalage</span>
          </h1>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-3 divide-x divide-white/10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="text-center py-6">
            <h3 className="text-pink text-3xl font-bold">100+</h3>
            <p className="text-white/50 text-xs mt-1 uppercase tracking-wide">Happy Students</p>
          </div>
          <div className="text-center py-6">
            <h3 className="text-yellow text-3xl font-bold">{yearsOfExperience}+</h3>
            <p className="text-white/50 text-xs mt-1 uppercase tracking-wide">Years Teaching</p>
          </div>
          <div className="text-center py-6">
            <h3 className="text-orange text-3xl font-bold">{affiliations.length - 1}</h3>
            <p className="text-white/50 text-xs mt-1 uppercase tracking-wide">Partner Studios</p>
          </div>
        </motion.div>
      </div>

      {/* Tabbed content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Tab switcher */}
        <div className="flex justify-center gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-5 py-2.5 rounded-full text-sm font-semibold
                transition-colors duration-300
                focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2
                ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }
              `}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-linear-to-r from-pink to-orange rounded-full -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "bio" && (
            <motion.div
              key="bio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-white/80 leading-8 text-lg mb-5 text-center">
                What began eight years ago as a way to stay active turned into
                a calling. Today, every class is built around one idea:
                movement should feel like joy, not a chore.
              </p>
              <p className="text-white/70 leading-8 mb-10 text-center">
                Expect high-energy playlists, routines anyone can pick up, and
                a room full of people cheering each other on, first-timers
                and regulars alike.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white/80 text-sm"
                  >
                    <Sparkles size={13} className="text-yellow shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "journey" && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink/30 rounded-2xl p-5 transition-colors"
                >
                  <span className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center bg-linear-to-r from-pink to-orange">
                    <Trophy size={15} className="text-white" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-pink text-xs font-bold tracking-wide mb-1">
                      {item.year}
                    </p>
                    <p className="text-white text-sm font-semibold leading-snug">
                      {item.title}
                    </p>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "find" && (
            <motion.div
              key="find"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {affiliations.map((item) => {
                const Icon = item.type === "location" ? MapPin : Briefcase;
                return (
                  <a
                    key={item.label}
                    href={item.href || "#"}
                    target={item.href ? "_blank" : undefined}
                    rel={item.href ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink/40 rounded-full pl-3 pr-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2"
                  >
                    <span className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center bg-linear-to-r from-pink to-yellow">
                      <Icon size={12} className="text-dark" strokeWidth={2.75} />
                    </span>
                    <span className="text-white/75 group-hover:text-white text-sm font-medium transition-colors">
                      {item.type === "location" ? `Lives in ${item.label}` : item.label}
                    </span>
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Photo slideshow */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        <InstructorSlideshow />
      </div>
    </section>
  );
}