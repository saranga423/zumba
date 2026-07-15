import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, User, Clock3 } from "lucide-react";

import scheduleData from "../../data/schedule.json";

const days = ["All", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const accentColors = [
  { text: "text-mango", bg: "bg-mango", border: "border-mango", hover: "hover:border-mango/50 hover:text-mango" },
  { text: "text-lime", bg: "bg-lime", border: "border-lime", hover: "hover:border-lime/50 hover:text-lime" },
  { text: "text-cream", bg: "bg-cream", border: "border-cream", hover: "hover:border-cream/50 hover:text-cream" },
];

function AnalogClock() {
  const [time, setTime] = useState(new Date());
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="relative shrink-0 w-20 h-20 md:w-24 md:h-24">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="currentColor"
          className="text-mango/30"
          strokeWidth="2"
        />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30 * (Math.PI / 180);
          const x1 = 50 + 40 * Math.sin(angle);
          const y1 = 50 - 40 * Math.cos(angle);
          const x2 = 50 + 45 * Math.sin(angle);
          const y2 = 50 - 45 * Math.cos(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              className="text-lime/60"
              strokeWidth={i % 3 === 0 ? 2 : 1}
            />
          );
        })}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="28"
          stroke="currentColor"
          className="text-white"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${hourDeg} 50 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="18"
          stroke="currentColor"
          className="text-lime"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${minuteDeg} 50 50)`}
        />
        {!reducedMotion && (
          <line
            x1="50"
            y1="55"
            x2="50"
            y2="14"
            stroke="currentColor"
            className="text-mango"
            strokeWidth="1"
            strokeLinecap="round"
            style={{ transition: "transform 0.2s cubic-bezier(0.4, 2.3, 0.7, 1)" }}
            transform={`rotate(${secondDeg} 50 50)`}
          />
        )}
        <circle cx="50" cy="50" r="2.5" fill="currentColor" className="text-mango" />
      </svg>
    </div>
  );
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("All");
  const [hovered, setHovered] = useState(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const filtered =
    activeDay === "All"
      ? scheduleData
      : scheduleData.filter((c) => c.day === activeDay);

  const active = filtered.find((c) => c.id === hovered) ?? filtered[0];
  const activeIndex = filtered.findIndex((c) => c.id === active?.id);
  const activeAccent = accentColors[Math.max(activeIndex, 0) % accentColors.length];

  return (
    <section
      id="schedule"
      ref={ref}
      className="relative py-24 px-6 bg-plum overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-mango/25 blur-[130px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-lime/20 blur-[130px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-md h-112 rounded-full bg-hibiscus/10 blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="flex items-center gap-5">
            <AnalogClock />
            <div>
              <span className="font-times text-xs uppercase tracking-[0.3em] bg-clip-text text-transparent bg-linear-to-r from-mango via-lime to-cream">
                Weekly Timetable
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 bg-clip-text text-transparent bg-linear-to-r from-mango to-lime">
                Schedule
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {days.map((day, i) => {
              const accent = accentColors[i % accentColors.length];
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    activeDay === day
                      ? `${accent.bg} text-plum shadow-lg shadow-black/30`
                      : `bg-white/5 border border-white/10 text-cream/60 ${accent.hover}`
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length ? (
            <motion.div
              key={activeDay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10"
            >
              <div className="flex flex-col border-t border-white/10">
                {filtered.map((cls, i) => {
                  const accent = accentColors[i % accentColors.length];
                  const isActive = active?.id === cls.id;
                  return (
                    <button
                      key={cls.id}
                      onMouseEnter={() => setHovered(cls.id)}
                      onFocus={() => setHovered(cls.id)}
                      className={`group relative flex items-center gap-6 border-b border-white/10 py-5 text-left transition-colors hover:bg-purple/20 ${
                        isActive ? "bg-white/5" : ""
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-0 bottom-0 w-1 rounded-full transition-opacity ${accent.bg} ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                        }`}
                      />

                      <span className={`font-times text-xs w-8 pl-3 transition-colors ${
                        isActive ? accent.text : "text-cream/30"
                      }`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <h3 className={`flex-1 text-lg md:text-xl font-bold transition-colors ${
                        isActive ? "text-white" : "text-purple group-hover:text-white"
                      }`}>
                        {cls.name}
                      </h3>

                      <span
                        className={`font-times text-xs whitespace-nowrap hidden md:block transition-colors ${
                          isActive ? accent.text : "text-cream/40"
                        }`}
                      >
                        {cls.day} · {cls.time}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className={`hidden lg:block sticky top-24 self-start rounded-3xl border-2 bg-white/5 p-8 h-fit transition-colors ${activeAccent.border}`}>
                <AnimatePresence mode="wait">
                  {active && (
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className={`font-times text-xs uppercase tracking-widest ${activeAccent.text}`}>
                        {active.dayFull}
                      </span>
                      <h4 className="text-xl font-bold text-white mt-2 mb-4">
                        {active.name}
                      </h4>
                      <p className="text-cream/60 text-sm leading-relaxed mb-6">
                        {active.description}
                      </p>

                      <div className="space-y-3 text-sm text-cream/70 mb-6">
                        <div className="flex items-center gap-3">
                          <Clock3 size={16} className={activeAccent.text} />
                          {active.time}
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin size={16} className={activeAccent.text} />
                          {active.location}
                        </div>
                        <div className="flex items-center gap-3">
                          <User size={16} className={activeAccent.text} />
                          {active.level}
                        </div>
                      </div>

                      <button className="w-full rounded-full bg-hibiscus text-white text-sm font-semibold py-3 hover:bg-hibiscus/90 transition-colors">
                        Reserve spot
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-dashed border-white/10 bg-white/5 py-20 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                No Classes Available
              </h3>
              <p className="text-cream/60">
                There are currently no classes scheduled for{" "}
                <span className="text-mango font-semibold">{activeDay}</span>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}