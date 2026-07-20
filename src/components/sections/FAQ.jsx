import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import faqs from "../../data/faq.json";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden py-28 bg-slate-950 text-white">
      {/* Modern Mesh/Dot background texture matching studio theme */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #c084fc 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Dynamic multi-stop radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-tr from-purple-600/15 via-pink-600/15 to-amber-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        
        {/* — Header with staggered spring entrance — */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block uppercase tracking-[8px] text-pink-400 text-xs font-bold mb-3 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
            Frequently Asked Questions
          </span>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 font-sans">
            Before You <span className="bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Book</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Everything you need to know before joining your first Zumba class.
          </p>
        </motion.div>

        {/* — FAQ List with Spring Layout Animations — */}
        <ul className="flex flex-col gap-4">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`
                  rounded-2xl overflow-hidden backdrop-blur-md border transition-all duration-300 shadow-lg
                  ${
                    isOpen
                      ? "bg-slate-900/90 border-pink-500/50 shadow-pink-950/20 shadow-xl"
                      : "bg-slate-900/50 border-white/10 hover:border-white/20"
                  }
                `}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2 rounded-2xl group cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm sm:text-base font-bold transition-colors ${
                      isOpen ? "text-pink-400" : "text-white/90 group-hover:text-white"
                    }`}
                  >
                    {item.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-linear-to-br from-pink-500 via-purple-500 to-amber-500 shadow-md"
                  >
                    <ChevronDown size={16} className="text-white" strokeWidth={2.5} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.25 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm sm:text-base leading-relaxed text-slate-400 border-t border-white/5 pt-4">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}

export default FAQ;