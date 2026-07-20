/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Clock, Phone, ParkingSquare, Copy, Check, Navigation, MessageCircle, Map as MapIcon, ChevronDown } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import Button from '../ui/Button'


const locations = [
  {
    name: 'Nimal Senanayake Academy of Performing Arts',
    shortName: 'Se Kala Academy',
    address: 'No. 659, William Gopallawa Mawatha, Kandy',
  },
  {
    name: 'Resh Dance Studio Kandy',
    shortName: 'Resh Dance Studio',
    address: 'No. 35 A, Bodhiyangana Mawatha, Herassagala, Kandy',
  },
]

const directionsUrl = address =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${address}, Sri Lanka`)}`


const mapEmbedUrl = address =>
  `https://www.google.com/maps?q=${encodeURIComponent(`${address}, Sri Lanka`)}&output=embed`

const contactRows = [
  {
    icon: Clock,
    label: 'Studio Hours',
    value: 'Mon–Fri: 6:00 AM – 9:00 PM\nSat–Sun: 8:00 AM – 6:00 PM',
  },
  {
    icon: Phone,
    label: 'Phone & Email',
    value: '+94 70 344 4430\nhannawaththalage39@gmail.com',
    copy: ['+94 70 344 4430', 'hannawaththalage39@gmail.com'],
  },
  {
    icon: ParkingSquare,
    label: 'Parking',
    value: 'Free parking on-site.\nStreet parking nearby.',
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function CopyableLine({ display, copyValue, label }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard unavailable — fail silently, text is still visible/selectable
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}: ${copyValue}`}
      className="
        group/copy relative inline-flex items-center gap-1.5
        text-pink-400 text-[15px] font-medium
        hover:text-pink-300 transition-colors
        focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2 rounded
        cursor-pointer
      "
    >
      {display}
      <span className="opacity-40 group-hover/copy:opacity-100 group-focus-visible/copy:opacity-100 transition-opacity">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="text-emerald-400"
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
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-7 left-0 text-[11px] font-bold text-white bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap z-20"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
      <span aria-live="polite" className="sr-only">
        {copied ? `${label} copied to clipboard` : ''}
      </span>
    </button>
  )
}

export default function Location() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [openMapIndex, setOpenMapIndex] = useState(null)

  const toggleMap = i => setOpenMapIndex(prev => (prev === i ? null : i))

  return (
    <section id="location" className="relative overflow-hidden py-28 bg-slate-950 text-white" ref={ref}>
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

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block uppercase tracking-[8px] text-pink-400 text-xs font-bold mb-3 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
            Find Us
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 font-sans">
            COME DANCE<br />
            <span className="bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">WITH US</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          {/* Locations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-5"
          >
            <p className="text-[11px] text-slate-400 font-bold tracking-widest uppercase">
              Our studios
            </p>

            {locations.map((loc, i) => {
              const mapOpen = openMapIndex === i

              return (
                <motion.div
                  key={loc.name}
                  variants={rowVariants}
                  className="
                    relative rounded-3xl overflow-hidden
                    bg-slate-900/80 backdrop-blur-xl
                    border border-white/10 hover:border-white/20
                    shadow-xl shadow-black/40
                    transition-all duration-300
                  "
                >
                  <div className="flex items-center gap-4 px-6 py-6">
                    {/* Pulsing pin */}
                    <div className="relative flex items-center justify-center h-14 w-14 shrink-0">
                      {[0, 1].map(r => (
                        <motion.span
                          key={r}
                          className="absolute inset-0 rounded-full border-2 border-pink-500/40"
                          animate={{ scale: [1, 2.1], opacity: [0.6, 0] }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            delay: r * 1.1 + i * 0.4,
                            ease: 'easeOut',
                          }}
                        />
                      ))}
                      <div
                        className="
                          relative z-10 w-11 h-11 rounded-full
                          bg-linear-to-br from-pink-500 via-purple-500 to-amber-500
                          flex items-center justify-center shadow-lg
                        "
                      >
                        <MapPin size={18} className="text-white" strokeWidth={2.25} />
                      </div>
                    </div>

                    <div className="text-left flex-1 min-w-0">
                      <p className="text-white font-bold text-base leading-snug">
                        {loc.shortName}
                      </p>
                      <p className="text-slate-400 text-xs leading-relaxed mt-1">
                        {loc.address}
                      </p>
                      <div className="flex flex-wrap items-center gap-2.5 mt-4">
                        <a
                          href={directionsUrl(loc.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            inline-flex items-center gap-1.5
                            text-xs font-bold uppercase tracking-wide text-white
                            bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500
                            transition-all duration-200
                            px-4 py-2 rounded-xl shadow-md shadow-pink-950/30
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500
                          "
                        >
                          <Navigation size={13} strokeWidth={2.5} />
                          Get directions
                        </a>
                        <button
                          type="button"
                          onClick={() => toggleMap(i)}
                          aria-expanded={mapOpen}
                          className="
                            inline-flex items-center gap-1.5
                            text-xs font-bold uppercase tracking-wide text-slate-300
                            bg-slate-800/80 hover:bg-slate-800 hover:text-white transition-colors
                            px-4 py-2 rounded-xl border border-white/10
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500
                            cursor-pointer
                          "
                        >
                          <MapIcon size={13} strokeWidth={2.5} />
                          {mapOpen ? 'Hide map' : 'View map'}
                          <ChevronDown
                            size={13}
                            strokeWidth={2.5}
                            className={`transition-transform duration-300 ${mapOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {mapOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-white/10"
                      >
                        <iframe
                          src={mapEmbedUrl(loc.address)}
                          className="w-full h-56 md:h-64 border-0 block filter invert hue-rotate-180 contrast-125 opacity-9oid"
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

          {/* Contact info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl shadow-black/30"
          >
            {contactRows.map(row => {
              const Icon = row.icon
              const lines = row.value.split('\n')
              const copyTargets = row.copy ?? []

              return (
                <motion.div
                  key={row.label}
                  variants={rowVariants}
                  className="flex gap-4 items-start group"
                >
                  <div
                    className="
                      w-11 h-11 rounded-2xl shrink-0
                      flex items-center justify-center
                      bg-linear-to-br from-pink-500 via-purple-500 to-amber-500
                      shadow-md
                      transition-transform duration-300 group-hover:scale-105
                    "
                    aria-hidden="true"
                  >
                    <Icon size={18} className="text-white" strokeWidth={2.25} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-1">
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
                      <p className="text-slate-300 text-[15px] font-medium whitespace-pre-line leading-relaxed">
                        {row.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {/* WhatsApp */}
            <motion.div variants={rowVariants} className="pt-2">
              <Button
                variant="whatsapp"
                href="https://wa.me/94703444430"
                size="md"
                className="w-full justify-center inline-flex items-center gap-2 shadow-lg shadow-emerald-950/20"
              >
                <MessageCircle size={18} strokeWidth={2.5} />
                Chat on WhatsApp
              </Button>
            </motion.div>

            {/* Booking note */}
            <motion.p
              variants={rowVariants}
              className="text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-4"
            >
              Walk-ins always welcome. For popular classes like Saturday
              Weekend Warrior, book at least 24h ahead — they fill fast.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}