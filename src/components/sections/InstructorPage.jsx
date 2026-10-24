import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowUpRight, MapPin, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import instructorImg from "../../assets/instructor.jpg";
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

const photos = [
  { src: slide1, alt: "Hanna leading a Zumba class" },
  { src: slide2, alt: "Hanna sharing her love of dance" },
  { src: slide3, alt: "A moment from Hanna's Zumba community" },
  { src: slide4, alt: "Hanna in action at a class" },
  { src: slide5, alt: "Hanna celebrating movement and music" },
  { src: slide6, alt: "A candid moment from the studio" },
  { src: slide7, alt: "Hanna with her Zumba community" },
  { src: slide8, alt: "A snapshot from class" },
  { src: slide9, alt: "Hanna enjoying a dance session" },
  { src: slide10, alt: "A day of dance and fitness" },
];

const milestones = [
  {
    year: "2022",
    title: "Started teaching Zumba",
    description: "Began leading group fitness sessions in Kandy.",
  },
  {
    year: "2023",
    title: "Zumba® instructor certification",
    description: "Completed official Zumba® instructor licensing.",
  },
  {
    year: "2024",
    title: "A growing community",
    description: "Welcomed more members across multiple studios.",
  },
  {
    year: "2025",
    title: "Performing arts collaborations",
    description: "Joined guest sessions with Nimal Senanayake Academy.",
  },
];

const studios = [
  "Green Angels International School",
  "Green Angels International Educational Institute",
  "Nimal Senanayake Academy of Performing Arts",
  "Resh Dance Studio Kandy",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function InstructorPage() {
  const prefersReducedMotion = useReducedMotion();
  const reveal = prefersReducedMotion
    ? { initial: false, whileInView: undefined }
    : { initial: "hidden", whileInView: "visible" };

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAFAF8] text-[#150A16]">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-black/35"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to home
          </Link>
          <a
            href="https://www.instagram.com/hannawaththalage/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-black/35"
          >
            Follow along <ArrowUpRight className="ml-1 inline" size={15} aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="relative isolate min-h-[720px] overflow-hidden bg-[#2B1330] text-white sm:min-h-[780px]">
        <img
          src={instructorImg}
          alt="Zumba instructor Hanna Waththalage"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_28%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1c0b20]/95 via-[#1c0b20]/65 to-[#1c0b20]/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1c0b20]/80 via-transparent to-[#1c0b20]/15" />

        <div className="mx-auto flex min-h-[720px] max-w-7xl items-end px-6 pb-20 pt-32 sm:min-h-[780px] sm:px-10 sm:pb-24">
          <motion.div
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#C8F03C] sm:text-sm">
              <span className="h-px w-9 bg-[#C8F03C]" />
              Meet your instructor
            </p>
            <h1 className="font-bricolage text-6xl font-extrabold leading-[0.9] tracking-[-0.06em] sm:text-8xl md:text-[7.5rem]">
              Hanna
              <br />
              <span className="text-[#FF9736]">Waththalage</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Good music, feel-good movement, and a room where everyone belongs.
              Come as you are and find your own rhythm.
            </p>
            <a
              href="#hanna-story"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#C8F03C] px-6 py-3.5 text-sm font-bold text-[#2B1330] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Get to know Hanna <ArrowDown size={17} aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-0 right-0 hidden w-[37%] max-w-[520px] translate-y-1/3 rotate-[-8deg] rounded-tl-[48px] bg-[#FF9736] p-8 text-[#2B1330] lg:block">
          <p className="font-bricolage text-2xl font-extrabold leading-tight">
            “Movement should feel like joy, not a chore.”
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em]">Hanna’s class philosophy</p>
        </div>
      </section>

      <section id="hanna-story" className="px-6 py-20 sm:px-10 sm:py-28">
        <motion.div
          {...reveal}
          variants={fadeUp}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"
        >
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#E23F73]">
              More than a workout
            </p>
            <h2 className="font-bricolage text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Find your
              <br />
              <span className="text-[#E23F73]">happy pace.</span>
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[#2B1330]/75 sm:text-lg">
            <p>
              What began as a way to stay active turned into a calling. Today,
              Hanna brings that same joy to every class, with movement that feels
              welcoming—not intimidating.
            </p>
            <p>
              Expect upbeat music, easy-to-follow routines, and a room full of
              people cheering one another on. Whether it’s your first class or
              your fiftieth, there’s space for you on the dance floor.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Beginner-friendly", "Music-led", "Come as you are"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#2B1330]/10 bg-white px-4 py-2 text-sm font-semibold text-[#2B1330]"
                >
                  <Sparkles size={14} className="text-[#E23F73]" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-[#2B1330] px-6 py-20 text-white sm:px-10 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...reveal}
            variants={fadeUp}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-2xl"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#FF9736]">
              One step at a time
            </p>
            <h2 className="font-bricolage text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              The journey so far
            </h2>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((item, index) => (
              <motion.article
                key={item.year}
                {...reveal}
                variants={fadeUp}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-[#351c3a] p-6 sm:p-7"
              >
                <span className="mb-8 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E23F73]/15 text-[#FF9736]">
                  <Trophy size={17} aria-hidden="true" />
                </span>
                <p className="text-sm font-bold tracking-[0.15em] text-[#C8F03C]">{item.year}</p>
                <h3 className="mt-3 font-bricolage text-xl font-bold leading-snug">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <motion.div
            {...reveal}
            variants={fadeUp}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#E23F73]">
              Where to find Hanna
            </p>
            <h2 className="font-bricolage text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Good people.
              <br />
              Great places.
            </h2>
            <a
              href="https://web.facebook.com/Kandy-108014839219027/"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#E23F73] transition hover:text-[#2B1330]"
            >
              <MapPin size={17} aria-hidden="true" />
              Kandy, Sri Lanka
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {studios.map((studio, index) => (
              <motion.div
                key={studio}
                {...reveal}
                variants={fadeUp}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="flex min-h-24 items-center rounded-2xl border border-[#2B1330]/10 bg-white p-5 shadow-[0_12px_36px_rgba(43,19,48,0.05)]"
              >
                <span className="mr-4 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E23F73]" />
                <p className="text-sm font-semibold leading-6 text-[#2B1330]">{studio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F2EDE5] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#E23F73]">
                From the dance floor
              </p>
              <h2 className="font-bricolage text-4xl font-extrabold tracking-tight sm:text-6xl">
                A little class energy.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#2B1330]/65">
              A few moments with Hanna and the community she moves with.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
            {photos.map((photo, index) => (
              <motion.figure
                key={photo.src}
                {...reveal}
                variants={fadeUp}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (index % 5) * 0.05 }}
                className={`group overflow-hidden rounded-2xl bg-[#2B1330]/10 ${
                  index % 5 === 1 ? "sm:translate-y-8" : ""
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E23F73] px-6 py-16 text-white sm:px-10 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-white/75">
              Your first class starts here
            </p>
            <h2 className="font-bricolage text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Ready to move with Hanna?
            </h2>
          </div>
          <Link
            to="/home#schedule"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#C8F03C] px-6 py-3.5 text-sm font-bold text-[#2B1330] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Explore class times <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
