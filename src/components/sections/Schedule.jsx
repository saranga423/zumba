import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import scheduleData from "../../data/schedule.json";

const days = ["All", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const typeStyles = {
  zumba: { bg: "bg-pink-100", text: "text-pink-700", label: "Zumba" },
  cardio: { bg: "bg-blue-100", text: "text-blue-700", label: "Cardio" },
  yoga: { bg: "bg-green-100", text: "text-green-700", label: "Yoga" },
};

function ClassCard({ cls, index }) {
  const style = typeStyles[cls.type] || typeStyles.zumba;

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5"
    >
      <p className="text-sm text-gray-400 mb-2">
        {cls.dayFull} • {cls.time}
      </p>

      <h3 className="text-xl font-bold mb-3">{cls.name}</h3>

      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${style.bg} ${style.text}`}
      >
        {style.label}
      </span>

      <p className="text-gray-300 mb-4">{cls.description}</p>

     
      <p>👤 {cls.level}</p>

      

      <button className="mt-5 px-5 py-2 bg-pink-500 rounded-full text-white">
        Book Class →
      </button>
    </motion.article>
  );
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("All");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filtered =
    activeDay === "All"
      ? scheduleData
      : scheduleData.filter((c) => c.day === activeDay);

  return (
    <section id="schedule" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-2">Weekly Schedule</h2>
        <p className="text-gray-400 mb-8">Find your perfect class.</p>

        <div className="flex flex-wrap gap-3 mb-8">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-full ${
                activeDay === day
                  ? "bg-pink-500 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <motion.div
          key={activeDay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.length === 0 ? (
            <p>No classes found.</p>
          ) : (
            filtered.map((cls, index) => (
              <ClassCard key={cls.id} cls={cls} index={index} />
            ))
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}