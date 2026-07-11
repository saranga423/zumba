import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import faqs from "../../data/faq.json";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-pad bg-dark">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <span className="inline-block text-[12px] font-bold tracking-[0.14em] uppercase text-pink mb-3">
          Frequently Asked Questions
        </span>

        <h2 className="font-bebas text-[clamp(36px,5vw,56px)] leading-[0.95] text-white mb-3">
          Before You <span className="text-pink">Book</span>
        </h2>

        <p className="text-white/60 text-base leading-relaxed">
          Everything you need to know before joining your first Zumba class.
        </p>
      </div>

      <ul className="max-w-2xl mx-auto flex flex-col gap-3.5">
        {faqs.map((item, index) => {
          const isOpen = index === openIndex;

          return (
            <motion.li
              key={item.id}
              layout
              className={`
                rounded-2xl overflow-hidden border transition-colors duration-300
                ${
                  isOpen
                    ? "bg-white/6 border-pink/40"
                    : "bg-white/3 border-white/10"
                }
              `}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded-2xl"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span
                  className={`text-[15px] sm:text-base font-semibold transition-colors ${
                    isOpen ? "text-pink" : "text-white"
                  }`}
                >
                  {item.question}
                </span>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center [background:linear-gradient(135deg,#FF2D78,#FF6B35)]"
                >
                  <ChevronDown size={18} className="text-white" strokeWidth={2.5} />
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
                      height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.25 },
                    }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-[15px] leading-relaxed text-white/60">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

export default FAQ;