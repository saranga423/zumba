/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  MapPin, Clock, Phone, ParkingSquare,
  Copy, Check, Navigation, MessageCircle,
  Map as MapIcon, ChevronDown,
} from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import Button from '../ui/Button'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
// cream: #FAF4E9 | hibiscus: #E23F73 | mango: #FF9736 | plum: #2B1330 | lime: #C8F03C

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

const directionsUrl = (address) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${address}, Sri Lanka`)}`

const mapEmbedUrl = (address) =>
  `https://www.google.com/maps?q=${encodeURIComponent(`${address}, Sri Lanka`)}&output=embed`

const contactRows = [
  {
    icon:  Clock,
    label: 'Studio Hours',
    value: 'Tue & Thu: 9:00 AM – 11:00 AM / 5:00 PM – 7:00 PM\nMon, Wed & Fri: 9:00 AM – 11:00 AM\nSun: 9:00 AM – 11:00 AM',
  },
  {
    icon:  Phone,
    label: 'Phone & Email',
    value: '+94 70 344 4430\nhannawaththalage39@gmail.com',
    copy:  ['+94703444430', 'hannawaththalage39@gmail.com'],
  },
  {
    icon:  ParkingSquare,
    label: 'Parking',
    value: 'Free parking on-site.\nStreet parking nearby.',
  },
]

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─── CopyableLine ─────────────────────────────────────────────────────────────
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
      className="group/copy relative inline-flex items-center gap-1.5 text-mango text-[15px] font-medium hover:text-hibiscus transition-colors focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2 rounded cursor-pointer"
    >
      {display}
      <span className="opacity-40 group-hover/copy:opacity-100 transition-opacity">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="check" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} className="text-lime">
              <Check size={13} strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
              <Copy size={13} strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute -top-7 left-0 text-[11px] font-bold text-cream bg-plum border border-plum-border px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap z-20"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
      <span aria-live="polite" className="sr-only">{copied ? `${label} copied` : ''}</span>
    </button>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Location() {
  const prefersReduced       = useReducedMotion()
  const [ref, inView]        = useInView({ triggerOnce: true, threshold: 0.15 })
  const [openMapIndex, setOpenMapIndex] = useState(null)

  const toggleMap = (i) => setOpenMapIndex((prev) => (prev === i ? null : i))

  return (
    <section
      id="location"
      ref={ref}
      className="relative overflow-hidden py-28 bg-plum text-cream selection:bg-lime selection:text-plum"
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #FAF4E9 1px, transparent 0)",
          backgroundSize:  "32px 32px",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,151,54,0.12) 0%, rgba(226,63,115,0.08) 55%, transparent 100%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block uppercase tracking-[8px] text-mango text-xs font-bold font-mono mb-3 px-3 py-1 rounded-full bg-mango/10 border border-mango/25">
            Find Us
          </span>
          <h2 className="font-bricolage text-4xl sm:text-6xl font-black tracking-tight mb-4 text-cream">
            COME DANCE<br />
            <span className="bg-linear-to-r from-mango via-hibiscus to-lime bg-clip-text text-transparent">
              WITH US
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* ── Locations ────────────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-5"
          >
            <p className="text-[11px] text-cream/40 font-bold tracking-widest uppercase font-mono">
              Our studios
            </p>

            {locations.map((loc, i) => {
              const mapOpen = openMapIndex === i

              return (
                <motion.div
                  key={loc.name}
                  variants={rowVariants}
                  className="relative rounded-3xl overflow-hidden bg-plum-light border border-plum-border hover:border-mango/30 shadow-xl shadow-black/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 px-6 py-6">

                    {/* Pulsing pin — mango */}
                    <div className="relative flex items-center justify-center h-14 w-14 shrink-0">
                      {!prefersReduced && [0, 1].map((r) => (
                        <motion.span
                          key={r}
                          className="absolute inset-0 rounded-full border-2 border-mango/35"
                          animate={{ scale: [1, 2.1], opacity: [0.6, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, delay: r * 1.1 + i * 0.4, ease: 'easeOut' }}
                        />
                      ))}
                      <div
                        className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #FF9736, #E23F73)' }}
                      >
                        <MapPin size={18} className="text-white" strokeWidth={2.25} />
                      </div>
                    </div>

                    <div className="text-left flex-1 min-w-0">
                      <p className="text-cream font-bold text-base leading-snug font-bricolage">
                        {loc.shortName}
                      </p>
                      <p className="text-cream/50 text-xs leading-relaxed mt-1 font-inter">
                        {loc.address}
                      </p>

                      <div className="flex flex-wrap items-center gap-2.5 mt-4">
                        {/* Directions — lime CTA */}
                        <a
                          href={directionsUrl(loc.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-plum bg-[#bg-limer:bg-[#d4f94e] transition-colors px-4 py-2 rounded-xl shadow-md focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2"
                        >
                          <Navigation size={13} strokeWidth={2.5} />
                          Get directions
                        </a>

                        {/* View map — ghost */}
                        <button
                          type="button"
                          onClick={() => toggleMap(i)}
                          aria-expanded={mapOpen}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-cream/60 bg-plum/50 hover:text-cream hover:bg-plum transition-colors px-4 py-2 rounded-xl border border-plum-border focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2 cursor-pointer"
                        >
                          <MapIcon size={13} strokeWidth={2.5} />
                          {mapOpen ? 'Hide map' : 'View map'}
                          <ChevronDown
                            size={13} strokeWidth={2.5}
                            className={`transition-transform duration-300 ${mapOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable map */}
                  <AnimatePresence initial={false}>
                    {mapOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-plum-border"
                      >
                        <iframe
                          src={mapEmbedUrl(loc.address)}
                          className="w-full h-56 md:h-64 border-0 block filter invert hue-rotate-180 contrast-125"
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

          {/* ── Contact info ──────────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-6 bg-plum-light border border-plum-border p-8 rounded-3xl shadow-xl shadow-black/30"
          >
            {contactRows.map((row) => {
              const Icon        = row.icon
              const lines       = row.value.split('\n')
              const copyTargets = row.copy ?? []

              return (
                <motion.div key={row.label} variants={rowVariants} className="flex gap-4 items-start group">
                  {/* Icon badge — mango→hibiscus */}
                  <div
                    className="w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #FF9736, #E23F73)' }}
                    aria-hidden="true"
                  >
                    <Icon size={18} className="text-white" strokeWidth={2.25} />
                  </div>

                  <div>
                    <p className="text-[11px] text-cream/40 font-bold tracking-widest uppercase mb-1 font-mono">
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
                      <p className="text-cream/70 text-[15px] font-medium whitespace-pre-line leading-relaxed font-inter">
                        {row.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {/* WhatsApp CTA */}
            <motion.div variants={rowVariants} className="pt-2">
              <Button
                variant="whatsapp"
                href="https://wa.me/94703444430"
                size="md"
                className="w-full justify-center inline-flex items-center gap-2 shadow-lg"
              >
                <MessageCircle size={18} strokeWidth={2.5} />
                Chat on WhatsApp
              </Button>
            </motion.div>

            {/* Booking note */}
            <motion.p
              variants={rowVariants}
              className="text-cream/40 text-xs sm:text-sm leading-relaxed border-t border-plum-border pt-4 font-inter"
            >
              Walk-ins always welcome. For busy morning sessions book ahead via  — classes fill up fast.
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}