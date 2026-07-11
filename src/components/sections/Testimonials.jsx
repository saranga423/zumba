import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, TrendingDown } from "lucide-react";
import testimonials from "../../data/testimonials.json";
import SectionLabel from "../ui/SectionLabel";



const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function StarRow({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          strokeWidth={0}
          className={i < rating ? "fill-yellow text-yellow" : "fill-white/15 text-white/15"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="testimonials" className="relative overflow-hidden bg-dark py-24" ref={ref}>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <SectionLabel>Real Talk</SectionLabel>
          <h2 className="font-bebas text-white text-5xl md:text-7xl mt-3">
            LOVED BY<span className="text-pink"> OUR CREW</span>
          </h2>
          <div className="w-28 h-1 bg-linear-to-r from-pink to-yellow mx-auto mt-5 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map(t => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              className="
                relative flex flex-col
                bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-pink/30
                rounded-2xl p-7 backdrop-blur-lg
                transition-colors duration-300
              "
            >
              <Quote
                size={34}
                className="text-pink/25 mb-2"
                strokeWidth={0}
                fill="currentColor"
              />

              <p className="text-white/80 text-[15px] leading-relaxed flex-1">
                {t.quote}
              </p>

              {t.transformation && (
                <div className="inline-flex items-center gap-1.5 self-start mt-5 bg-pink/10 border border-pink/25 rounded-full px-3 py-1">
                  <TrendingDown size={13} className="text-pink" strokeWidth={2.5} />
                  <span className="text-pink text-xs font-bold tracking-wide">
                    {t.transformation}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                  style={{ backgroundColor: t.avatarColor }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.since}</p>
                </div>
                <div className="ml-auto">
                  <StarRow rating={t.rating} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}