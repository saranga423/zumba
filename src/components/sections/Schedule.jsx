import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  MapPin,
  Clock3,
  User,
  CalendarDays,
} from "lucide-react";

import scheduleData from "../../data/schedule.json";

const days = ["All", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const typeStyles = {
  zumba: {
    bg: "bg-pink-500/15",
    text: "text-pink-300",
    border: "border-pink-500/30",
    label: "Zumba",
  },
  cardio: {
    bg: "bg-blue-500/15",
    text: "text-blue-300",
    border: "border-blue-500/30",
    label: "Cardio",
  },
  yoga: {
    bg: "bg-green-500/15",
    text: "text-green-300",
    border: "border-green-500/30",
    label: "Yoga",
  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

function ClassCard({ cls }) {
  const style = typeStyles[cls.type] || typeStyles.zumba;

  return (
    <motion.article
      variants={item}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all"
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-pink-500/10 via-transparent to-purple-500/10" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}
          >
            {style.label}
          </span>

          <div className="flex items-center gap-1 text-sm text-gray-400">
            <CalendarDays size={15} />
            {cls.dayFull}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">
          {cls.name}
        </h3>

        <p className="text-gray-300 leading-relaxed mb-6">
          {cls.description}
        </p>

        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-center gap-3">
            <Clock3 size={16} className="text-pink-400" />
            {cls.time}
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-pink-400" />
            {cls.location}
          </div>

          <div className="flex items-center gap-3">
            <User size={16} className="text-pink-400" />
            {cls.level}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("All");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const filtered =
    activeDay === "All"
      ? scheduleData
      : scheduleData.filter((c) => c.day === activeDay);

  return (
    <section
      id="schedule"
      ref={ref}
      className="relative py-24 px-6 bg-[#0b1020] overflow-hidden"
    >
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-pink-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-500/10 blur-[120px]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={
          inView
            ? {
                opacity: 1,
                y: 0,
              }
            : {}
        }
        transition={{
          duration: 0.7,
        }}
        className="relative max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center rounded-full bg-pink-500/10 px-4 py-1 text-sm font-semibold text-pink-300 border border-pink-500/20 mb-4">
            Weekly Timetable
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Weekly Schedule
          </h2>

          <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto">
            Choose the class that fits your lifestyle. Whether you're a
            beginner or experienced, there's a session waiting for you.
          </p>
        </div>

        {/* Day Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                activeDay === day
                  ? "bg-linear-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{
              opacity: 0,
            }}
            className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.length ? (
              filtered.map((cls) => (
                <ClassCard
                  key={cls.id}
                  cls={cls}
                />
              ))
            ) : (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="col-span-full rounded-3xl border border-dashed border-white/10 bg-white/5 py-20 text-center"
              >
                <div className="text-6xl mb-4">💃</div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  No Classes Available
                </h3>

                <p className="text-gray-400">
                  There are currently no classes scheduled for{" "}
                  <span className="text-pink-400 font-semibold">
                    {activeDay}
                  </span>
                  .
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}