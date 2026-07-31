import { useReducedMotion, motion } from "framer-motion";
import instructorImg from "../../assets/instructor2.jpg";
import { MapPin, GraduationCap } from "lucide-react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
// cream: #FAF4E9 | hibiscus: #E23F73 | mango: #FF9736 | plum: #2B1330 | lime: #C8F03C

const START_YEAR = 2022;

const affiliations = [
  { label: "Resh Dance Studio Kandy",                      icon: MapPin        },
  { label: "Nimal Senanayake Academy of Performing Arts",  icon: MapPin        },
  { label: "Green Angels International School — Gelioya",  icon: GraduationCap },
  { label: "Green Angels International Educational Institute", icon: GraduationCap },
];

export default function About() {
  const prefersReduced    = useReducedMotion();
  const yearsOfExperience = Math.max(1, new Date().getFullYear() - START_YEAR);

  const fadeLeft  = { initial: { opacity: 0, x: prefersReduced ? 0 : -60 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.7 }, viewport: { once: true } };
  const fadeRight = { initial: { opacity: 0, x: prefersReduced ? 0 :  60 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.7 }, viewport: { once: true } };

  return (
    <section
      id="about"
      className="relative overflow-hidden py-28 bg-[#2B1330] text-[#FAF4E9] selection:bg-[#C8F03C] selection:text-[#2B1330]"
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
      <div className="absolute -top-40 -right-40 w-125 h-125 bg-[#FF9736]/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 w-100 h-100 bg-[#E23F73]/8  rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Heading ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[6px] text-[#FF9736] text-sm font-semibold font-mono">
            Meet Your Instructor
          </p>

          <h2 className="font-bricolage text-[#FAF4E9] text-5xl md:text-7xl mt-3 font-extrabold">
            Hanna
            <span className="text-[#E23F73]"> Waththalage</span>
          </h2>

          <div className="w-28 h-1 bg-linear-to-r from-[#E23F73] to-[#FF9736] mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* ── Main grid ─────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Image column ──────────────────────────────────────────── */}
          <motion.div {...fadeLeft} className="relative flex justify-center">
            <div className="relative">
              <img
                src={instructorImg}
                alt="Hanna Waththalage — Zumba Instructor"
                className="rounded-3xl w-full max-w-md h-150 object-cover shadow-[0_30px_80px_rgba(226,63,115,0.30)]"
              />

              {/* Corner accents */}
              <div className="absolute -top-5 -left-5 w-32 h-32 border-l-4 border-t-4 border-[#E23F73] rounded-tl-3xl" />
              <div className="absolute -bottom-5 -right-5 w-32 h-32 border-r-4 border-b-4 border-[#FF9736] rounded-br-3xl" />

              {/* Floating experience badge */}
              <motion.div
                animate={prefersReduced ? {} : { y: [-8, 8, -8] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-8 -right-6 bg-linear-to-r from-[#FF9736] to-[#E23F73] px-6 py-5 rounded-2xl shadow-2xl"
              >
                <h3 className="text-4xl font-bold text-[#FAF4E9]">{yearsOfExperience}+</h3>
                <p className="text-[#FAF4E9]/80 text-sm">Years of Experience</p>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Content column ────────────────────────────────────────── */}
          <motion.div {...fadeRight}>
            <h3 className="font-bricolage text-3xl font-bold text-[#FAF4E9] mb-6">
              Inspiring Confidence Through Dance
            </h3>

            <p className="text-[#FAF4E9]/80 leading-8 text-lg">
              Hanna discovered Zumba as a way to stay active and do what she loves most — dance. What began as personal passion quickly grew into a mission: helping people across Kandy move freely, smile genuinely, and feel great in their own skin.
            </p>

            <p className="text-[#FAF4E9]/60 leading-8 mt-6">
              Every class she leads blends high-energy Latin rhythms with easy-to-follow choreography in a warm, judgement-free space. Whether you've never stepped on a dance floor or you've been moving for years, you'll always leave feeling stronger and happier.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5 my-10">
              <div className="text-center bg-[#FAF4E9]/5 rounded-2xl p-5 border border-[#FAF4E9]/10">
                <h3 className="text-[#E23F73] text-3xl font-bold font-bricolage">100+</h3>
                <p className="text-[#FAF4E9]/50 text-sm mt-1">Happy Members</p>
              </div>
              <div className="text-center bg-[#FAF4E9]/5 rounded-2xl p-5 border border-[#FAF4E9]/10">
                <h3 className="text-[#FF9736] text-3xl font-bold font-bricolage">{yearsOfExperience}+</h3>
                <p className="text-[#FAF4E9]/50 text-sm mt-1">Years Teaching</p>
              </div>
            </div>

            {/* ── Affiliation pills ────────────────────────────────────── */}
            <div>
              <p className="text-[#FAF4E9]/40 text-xs font-bold tracking-widest uppercase mb-4 font-mono">
                Where you'll find her
              </p>
              <div className="flex flex-wrap gap-2">
                {affiliations.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF4E9]/5 border border-[#FAF4E9]/15 text-[#FAF4E9]/70 text-xs font-mono font-medium hover:border-[#FF9736]/40 hover:text-[#FF9736] transition-colors"
                  >
                    <Icon size={11} className="shrink-0" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* ── CTA ─────────────────────────────────────────────────── */}
            <div className="mt-10">
              <a
                href="#schedule"
                className="group inline-flex items-center gap-3 bg-[#C8F03C] text-[#2B1330] font-bold text-sm md:text-base px-7 py-3.5 rounded-full shadow-[0_10px_30px_rgba(200,240,60,0.25)] hover:bg-[#d4f94e] hover:shadow-[0_15px_40px_rgba(200,240,60,0.35)] hover:scale-[1.03] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2 no-underline"
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