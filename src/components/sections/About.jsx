import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import instructorImg from "../../assets/instructor2.jpg";

// Change this to the year Hanna started teaching Zumba
const START_YEAR = 2022;

const affiliations = [
  {
    type: "work",
    label: "Green Angels International School",
  },
  {
    type: "work",
    label: "Green Angels International Educational Institute",
  },
  {
    type: "work",
    label: "Nimal Senanayake Academy of Performing Arts",
  },
  {
    type: "work",
    label: "Resh Dance Studio Kandy",
  },
  {
    type: "location",
    label: "Kandy",
    href: "https://web.facebook.com/Kandy-108014839219027/",
  },
];

export default function About() {
  // Automatically updates every year
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = Math.max(1, currentYear - START_YEAR);

  return (
    <section
      id="about"
      className="relative overflow-hidden py-28 bg-dark"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[6px] text-pink text-sm font-semibold">
            Meet Your Instructor
          </p>

          <h2 className="font-bebas text-white text-5xl md:text-7xl mt-3">
            Hanna
            <span className="text-pink"> Waththalage</span>
          </h2>

          <div className="w-28 h-1 bg-linear-to-r from-pink to-yellow mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <img
                src={instructorImg}
                alt="Instructor"
                className="rounded-3xl w-full max-w-md h-150 object-cover shadow-[0_30px_80px_rgba(236,72,153,.35)]"
              />

              {/* Decorative Borders */}
              <div className="absolute -top-5 -left-5 w-32 h-32 border-l-4 border-t-4 border-pink rounded-tl-3xl" />
              <div className="absolute -bottom-5 -right-5 w-32 h-32 border-r-4 border-b-4 border-yellow rounded-br-3xl" />

              {/* Floating Experience Card */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -bottom-8 -right-6 bg-linear-to-r from-pink to-orange px-6 py-5 rounded-2xl shadow-2xl"
              >
                <h3 className="text-4xl font-bold text-white">
                  {yearsOfExperience}+
                </h3>

                <p className="text-white text-sm">
                  Years of Experience
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Inspiring Confidence Through Dance
            </h3>

            <p className="text-white/80 leading-8 text-lg">
              I began my Zumba journey over eight years ago with a simple goal to
              stay active and enjoy dancing. What started as a fitness routine
              quickly became a lifelong passion for inspiring others to move,
              smile, and feel confident.
            </p>

            <p className="text-white/70 leading-8 mt-6">
              My classes combine high-energy music, easy-to-follow choreography,
              and a welcoming atmosphere where everyone feels at home. Whether
              you're joining your very first class or you've been dancing for
              years, you'll always leave feeling stronger, happier, and more
              energized.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5 my-10">
              <div className="text-center bg-white/5 rounded-xl p-5 backdrop-blur-lg border border-white/10">
                <h3 className="text-pink text-3xl font-bold">
                  100+
                </h3>
                <p className="text-white/60 text-sm">
                  Happy Students
                </p>
              </div>

              <div className="text-center bg-white/5 rounded-xl p-5 backdrop-blur-lg border border-white/10">
                <h3 className="text-yellow text-3xl font-bold">
                  {yearsOfExperience}+
                </h3>
                <p className="text-white/60 text-sm">
                  Years
                </p>
              </div>
            </div>

            {/* Affiliations */}
            <div>
              <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">
                Where you'll find her
              </p>

              <ul className="flex flex-wrap gap-2.5">
                {affiliations.map((item) => {
                  const Icon =
                    item.type === "location" ? MapPin : Briefcase;

                  return (
                    <li key={item.label}>
                      <a
                        href={item.href || "#"}
                        target={item.href ? "_blank" : undefined}
                        rel={item.href ? "noopener noreferrer" : undefined}
                        className="
                          group inline-flex items-center gap-2
                          bg-white/5 hover:bg-white/10
                          border border-white/10 hover:border-pink/40
                          rounded-full pl-3 pr-4 py-2
                          transition-colors
                          focus-visible:outline-2
                          focus-visible:outline-pink
                          focus-visible:outline-offset-2
                        "
                      >
                        <span
                          className="
                            w-6 h-6 rounded-full shrink-0
                            flex items-center justify-center
                            bg-linear-to-r from-pink to-yellow
                          "
                        >
                          <Icon
                            size={12}
                            className="text-dark"
                            strokeWidth={2.75}
                          />
                        </span>

                        <span className="text-white/75 group-hover:text-white text-sm font-medium transition-colors">
                          {item.type === "location"
                            ? `Lives in ${item.label}`
                            : item.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}