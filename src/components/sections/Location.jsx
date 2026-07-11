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

// No API key / place ID required — this query-based embed works with
// just an address. Swap in a `.../maps/embed?pb=...` URL later if you
// generate proper place-ID embeds from Google Maps' "Share > Embed a map".
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
    value: '+94 70 344 4430\nhello@zumbafit.studio',
   copy: ['+94 70 344 4430', 'hello@zumbafit.studio'],
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
        text-navy text-[15px] font-medium
        hover:text-orange-300 transition-colors
        focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded
      "
    >
      {display}
      <span className="opacity-0 group-hover/copy:opacity-100 transition-opacity">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="text-green-600"
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
            className="absolute -top-6 left-0 text-[11px] font-bold text-purple bg-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

export default function Location() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [openMapIndex, setOpenMapIndex] = useState(null)

  const toggleMap = i => setOpenMapIndex(prev => (prev === i ? null : i))

  return (
    <section id="location" className="section-pad bg-cream" ref={ref}>
      <div className="text-center mb-14">
        <SectionLabel>Find Us</SectionLabel>
        <h2 className="font-bebas text-[clamp(42px,6vw,72px)] leading-[0.95] text-navy">
          COME DANCE<br />
          <span className="text-pink">WITH US</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        {/* Locations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-5"
        >
          <p className="text-[11px] text-gray-400 font-bold tracking-widest uppercase">
            Our studios
          </p>

          {locations.map((loc, i) => {
            const mapOpen = openMapIndex === i

            return (
              <motion.div
                key={loc.name}
                variants={rowVariants}
                className="
                  relative rounded-2xl overflow-hidden
                  bg-linear-to-br from-navy to-dark-mid
                  border-2 border-dashed border-purple-light/25
                  shadow-card
                "
              >
                <div className="flex items-center gap-4 px-6 py-6">
                  {/* Pulsing pin — rhythm-themed signature */}
                  <div className="relative flex items-center justify-center h-14 w-14 shrink-0">
                    {[0, 1].map(r => (
                      <motion.span
                        key={r}
                        className="absolute inset-0 rounded-full border-2 border-pink/50"
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
                        relative z-10 w-10 h-10 rounded-full
                        [background:linear-gradient(135deg,#FF2D78,#FF6B35)]
                        flex items-center justify-center shadow-md
                      "
                    >
                      <MapPin size={19} className="text-white" strokeWidth={2.25} />
                    </div>
                  </div>

                  <div className="text-left flex-1 min-w-0">
                    <p className="text-white font-bold text-[15px] leading-snug">
                      {loc.shortName}
                    </p>
                    <p className="text-purple-light/70 text-xs leading-relaxed mt-0.5">
                      {loc.address}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <a
                        href={directionsUrl(loc.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex items-center gap-1.5
                          text-xs font-bold uppercase tracking-wide text-white
                          bg-gradient-brand hover:opacity-90 transition-opacity
                          px-4 py-2 rounded-full shadow-neon-pink
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink
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
                          text-xs font-bold uppercase tracking-wide text-white
                          bg-white/10 hover:bg-white/20 transition-colors
                          px-4 py-2 rounded-full border border-white/15
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink
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

        {/* Contact info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-6"
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
                    w-10 h-10 rounded-xl shrink-0
                    flex items-center justify-center
                    [background:linear-gradient(135deg,#FF2D78,#FF6B35)]
                    transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                  "
                  aria-hidden="true"
                >
                  <Icon size={18} className="text-white" strokeWidth={2.25} />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold tracking-widest uppercase mb-1">
                    {row.label}
                  </p>
                  {copyTargets.length ? (
                    <div className="flex flex-col gap-1">
                      {lines.map((line, i) => (
                        <CopyableLine
                          key={line}
                          display={line}
                          copyValue={copyTargets[i] ?? line}
                          label={row.label}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-navy text-[15px] font-medium whitespace-pre-line leading-snug">
                      {row.value}
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}

          {/* WhatsApp */}
          <motion.div variants={rowVariants}>
            <Button
              variant="whatsapp"
              href="https://wa.me/94703444430"
              size="md"
              className="mt-2 self-start inline-flex items-center gap-2"
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              Chat on WhatsApp
            </Button>
          </motion.div>

          {/* Booking note */}
          <motion.p
            variants={rowVariants}
            className="text-gray-400 text-sm leading-relaxed"
          >
            Walk-ins always welcome. For popular classes like Saturday
            Weekend Warrior, book at least 24h ahead — they fill fast.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}