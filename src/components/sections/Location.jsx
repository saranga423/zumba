/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  MapPin, Clock, ParkingSquare,
  Copy, Check, Navigation,
  Map as MapIcon, ChevronDown,
} from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import Button       from '../ui/Button'

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE  — light theme, consistent with Hero / Navbar / About / Schedule
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  base:    "#FFFFFF",           // section background
  ink:     "#150A16",           // primary text
  pink:    "#E8295E",           // primary accent
  lime:    "#B5DB1A",           // secondary accent
  coral:   "#FF6B35",           // tertiary accent
  border:  "rgba(21,10,22,0.07)",
  surface: "rgba(21,10,22,0.04)",
  muted:   "rgba(21,10,22,0.38)",
  subtle:  "rgba(21,10,22,0.55)",
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA  (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

const locations = [
  {
    name:      'Nimal Senanayake Academy of Performing Arts',
    shortName: 'Se Kala Academy',
    address:   'No. 659, William Gopallawa Mawatha, Kandy',
  },
  {
    name:      'Resh Dance Studio Kandy',
    shortName: 'Resh Dance Studio',
    address:   'No. 35 A, Bodhiyangana Mawatha, Herassagala, Kandy',
  },
]

const contactRows = [
  {
    icon:  Clock,
    label: 'Studio Hours',
    value: 'Tue & Thu: 9:00 AM – 11:00 AM / 5:00 PM – 7:00 PM\nMon, Wed & Fri: 9:00 AM – 11:00 AM\nSun: 9:00 AM – 11:00 AM',
  },
  {
    icon:  ParkingSquare,
    label: 'Parking',
    value: 'Free parking on-site.\nStreet parking nearby.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS  (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

const directionsUrl = (address) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${address}, Sri Lanka`)}`

const mapEmbedUrl = (address) =>
  `https://www.google.com/maps?q=${encodeURIComponent(`${address}, Sri Lanka`)}&output=embed`

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS  (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─────────────────────────────────────────────────────────────────────────────
// COPYABLE LINE  — adapted for light background
// ─────────────────────────────────────────────────────────────────────────────

function CopyableLine({ display, copyValue, label }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard write failed silently
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}: ${copyValue}`}
      className="group/copy relative inline-flex items-center gap-1.5 text-[15px] font-medium transition-colors rounded cursor-pointer"
      style={{ color: copied ? "#4A7000" : C.coral }}
    >
      {display}

      {/* Copy / check icon */}
      <span
        className="opacity-40 group-hover/copy:opacity-100 transition-opacity"
        style={{ color: copied ? "#4A7000" : C.coral }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              <Check size={13} strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              <Copy size={13} strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {/* "Copied!" tooltip — white card on light bg */}
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-8 left-0 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap z-20"
            style={{
              background: C.base,
              border:     `1px solid ${C.border}`,
              color:      "#4A7000",
              boxShadow:  "0 4px 12px rgba(21,10,22,0.1)",
            }}
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>

      <span aria-live="polite" className="sr-only">
        {copied ? `${label} copied` : ''}
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Location() {
  const prefersReduced                  = useReducedMotion()
  const [ref, inView]                   = useInView({ triggerOnce: true, threshold: 0.15 })
  const [openMapIndex, setOpenMapIndex] = useState(null)
  const [hoveredCard, setHoveredCard]   = useState(null)

  const toggleMap = (i) => setOpenMapIndex((prev) => (prev === i ? null : i))

  return (
    <section
      id="location"
      ref={ref}
      className="relative overflow-hidden py-28"
      style={{ background: C.base }}
    >
      {/* ── Background system — light ────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Dot grid — faint ink dots on white */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(21,10,22,0.1) 1px, transparent 1px)",
            backgroundSize:  "32px 32px",
            opacity:         0.45,
          }}
        />
        {/* Pink ambient halo */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(232,41,94,0.06) 0%, rgba(255,107,53,0.04) 55%, transparent 100%)",
          }}
        />
        {/* Lime bottom-right */}
        <div
          className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-[100px]"
          style={{ background: "rgba(181,219,26,0.07)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Eyebrow */}
          <span
            className="inline-block uppercase tracking-[8px] text-xs font-bold font-mono mb-3 px-3 py-1 rounded-full"
            style={{
              color:      C.coral,
              background: "rgba(255,107,53,0.08)",
              border:     "1px solid rgba(255,107,53,0.25)",
            }}
          >
            Find Us
          </span>

          {/* Headline */}
          <h2
            className="text-4xl sm:text-6xl font-black tracking-tight mb-4"
            style={{ color: C.ink, fontFamily: "'Syne', sans-serif", lineHeight: 1.0 }}
          >
            COME DANCE
            <br />
            <span
              style={{
                backgroundImage: `linear-gradient(100deg, ${C.pink}, ${C.coral} 50%, ${C.lime})`,
                backgroundClip:        "text",
                WebkitBackgroundClip:  "text",
                color:                 "transparent",
              }}
            >
              WITH US
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* ── Location cards ───────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-5"
          >
            <p
              className="text-[11px] font-bold tracking-widest uppercase font-mono"
              style={{ color: C.muted }}
            >
              Our Studios
            </p>

            {locations.map((loc, i) => {
              const mapOpen  = openMapIndex === i
              const isHover  = hoveredCard === i

              return (
                <motion.div
                  key={loc.name}
                  variants={rowVariants}
                  className="relative rounded-3xl overflow-hidden transition-all duration-300"
                  style={{
                    background:  C.base,
                    border:      `1px solid ${isHover ? "rgba(232,41,94,0.28)" : C.border}`,
                    boxShadow:   isHover
                      ? "0 8px 32px rgba(232,41,94,0.1), 0 2px 8px rgba(21,10,22,0.06)"
                      : "0 2px 8px rgba(21,10,22,0.05)",
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center gap-4 px-6 py-6">

                    {/* Pulsing pin — pink */}
                    <div className="relative flex items-center justify-center h-14 w-14 shrink-0">
                      {!prefersReduced && [0, 1].map((r) => (
                        <motion.span
                          key={r}
                          className="absolute inset-0 rounded-full"
                          style={{ border: `2px solid rgba(232,41,94,0.25)` }}
                          animate={{ scale: [1, 2.1], opacity: [0.55, 0] }}
                          transition={{
                            duration: 2.2,
                            repeat:   Infinity,
                            delay:    r * 1.1 + i * 0.4,
                            ease:     'easeOut',
                          }}
                        />
                      ))}
                      <div
                        className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-md"
                        style={{ background: `linear-gradient(135deg, ${C.pink}, ${C.coral})` }}
                      >
                        <MapPin size={18} color="white" strokeWidth={2.25} />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="text-left flex-1 min-w-0">
                      <p
                        className="font-bold text-base leading-snug"
                        style={{ color: C.ink, fontFamily: "'Syne', sans-serif" }}
                      >
                        {loc.shortName}
                      </p>
                      <p
                        className="text-xs leading-relaxed mt-1"
                        style={{ color: C.subtle }}
                      >
                        {loc.address}
                      </p>

                      {/* CTA buttons */}
                      <div className="flex flex-wrap items-center gap-2.5 mt-4">

                        {/* Get directions — pink primary */}
                        <a
                          href={directionsUrl(loc.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white px-4 py-2 rounded-xl shadow-md transition-all"
                          style={{
                            background: C.pink,
                            boxShadow:  `0 4px 16px rgba(232,41,94,0.3)`,
                          }}
                        >
                          <Navigation size={13} strokeWidth={2.5} />
                          Get Directions
                        </a>

                        {/* View map — surface outline */}
                        <button
                          type="button"
                          onClick={() => toggleMap(i)}
                          aria-expanded={mapOpen}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-xl transition-all cursor-pointer"
                          style={{
                            border:     `1px solid ${C.border}`,
                            background: C.surface,
                            color:      C.subtle,
                          }}
                        >
                          <MapIcon size={13} strokeWidth={2.5} />
                          {mapOpen ? 'Hide Map' : 'View Map'}
                          <ChevronDown
                            size={13}
                            strokeWidth={2.5}
                            style={{
                              transition: "transform 0.3s",
                              transform:  mapOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable map — NO filter (light page = standard map colours) */}
                  <AnimatePresence initial={false}>
                    {mapOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                        style={{ borderTop: `1px solid ${C.border}` }}
                      >
                        <iframe
                          src={mapEmbedUrl(loc.address)}
                          className="w-full h-56 md:h-64 border-0 block"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Map to ${loc.shortName}`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ── Contact info card ─────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-6 p-8 rounded-3xl"
            style={{
              background: C.base,
              border:     `1px solid ${C.border}`,
              boxShadow:  "0 4px 24px rgba(21,10,22,0.06)",
            }}
          >
            {contactRows.map((row) => {
              const Icon        = row.icon
              const lines       = row.value.split('\n')
              const copyTargets = row.copy ?? []

              return (
                <motion.div
                  key={row.label}
                  variants={rowVariants}
                  className="flex gap-4 items-start group"
                >
                  {/* Icon badge — pink→coral gradient */}
                  <div
                    className="w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${C.pink}, ${C.coral})` }}
                    aria-hidden="true"
                  >
                    <Icon size={18} color="white" strokeWidth={2.25} />
                  </div>

                  <div>
                    <p
                      className="text-[11px] font-bold tracking-widest uppercase mb-1 font-mono"
                      style={{ color: C.muted }}
                    >
                      {row.label}
                    </p>

                    {copyTargets.length ? (
                      <div className="flex flex-col gap-1">
                        {lines.map((line, i) => (
                          <CopyableLine
                            key={`${row.label}-${i}`}
                            display={line}
                            copyValue={copyTargets[i] ?? line}
                            label={row.label}
                          />
                        ))}
                      </div>
                    ) : (
                      <p
                        className="text-[15px] font-medium whitespace-pre-line leading-relaxed"
                        style={{ color: C.subtle }}
                      >
                        {row.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {/* Booking note */}
            <motion.p
              variants={rowVariants}
              className="text-xs sm:text-sm leading-relaxed pt-4"
              style={{
                borderTop: `1px solid ${C.border}`,
                color:     C.muted,
              }}
            >
              Walk-ins always welcome. For busy morning sessions book ahead via WhatsApp — classes fill up fast.
            </motion.p>

            {/* Decorative lime accent dot */}
            <motion.div
              variants={rowVariants}
              className="flex items-center gap-2 pt-1"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: C.lime }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[2px] font-bold"
                style={{ color: C.muted }}
              >
                Kandy, Sri Lanka
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}