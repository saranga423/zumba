import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Play, X, ZoomIn } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'

import g1 from '../../assets/g1.jpg'
import g2 from '../../assets/g2.jpg'
import g3 from '../../assets/g3.jpg'
import g4 from '../../assets/g4.jpg'
import g5 from '../../assets/g5.jpg'
import g7 from '../../assets/g7.jpg'
import g8 from '../../assets/g8.jpeg'

import reel1  from '../../assets/videos/v1.mp4'
import reel2  from '../../assets/videos/v2.mp4'
import reel3  from '../../assets/videos/v3.mp4'
import reel4  from '../../assets/videos/v4.mp4'
import reel5  from '../../assets/videos/v5.mp4'
import reel6  from '../../assets/videos/v6.mp4'
import reel7  from '../../assets/videos/v7.mp4'
import reel8  from '../../assets/videos/v8.mp4'
import reel9  from '../../assets/videos/v9.mp4'
import reel10 from '../../assets/videos/v10.mp4'

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const galleryItems = [
  { id: 1,  type: 'photo', src: g1,     alt: 'Zumba class energy'       },
  { id: 2,  type: 'reel',  src: reel1,  alt: 'Class highlight reel'     },
  { id: 3,  type: 'photo', src: g2,     alt: 'Music and movement'       },
  { id: 4,  type: 'reel',  src: reel2,  alt: 'Workout reel'             },
  { id: 5,  type: 'photo', src: g3,     alt: 'Dancing together'         },
  { id: 6,  type: 'reel',  src: reel3,  alt: 'Dance combo reel'         },
  { id: 7,  type: 'photo', src: g4,     alt: 'High energy moves'        },
  { id: 8,  type: 'reel',  src: reel4,  alt: 'Studio session reel'      },
  { id: 9,  type: 'photo', src: g5,     alt: 'Workout intensity'        },
  { id: 10, type: 'reel',  src: reel5,  alt: 'Choreography reel'        },
  { id: 12, type: 'reel',  src: reel6,  alt: 'Full class energy reel'   },
  { id: 13, type: 'photo', src: g7,     alt: 'More class moments'       },
  { id: 14, type: 'reel',  src: reel7,  alt: 'Weekend warrior reel'     },
  { id: 15, type: 'reel',  src: reel8,  alt: 'Zumba Gold reel'          },
  { id: 16, type: 'reel',  src: reel9,  alt: 'Studio vibe reel'         },
  { id: 17, type: 'reel',  src: reel10, alt: 'Member moments reel'      },
  { id: 18, type: 'photo', src: g8,     alt: 'Additional class moment'  },
]

const categories = ['All', 'Reels', 'Photos']

/* ------------------------------------------------------------------ */
/*  Expanded card (in-row)                                             */
/* ------------------------------------------------------------------ */

function ExpandedCard({ item, onClose }) {
  const videoRef = useRef(null)

  return (
    <AnimatePresence>
      <motion.div
        key="expanded"
        layout
        initial={{ opacity: 0, scaleY: 0.7, originY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0.7 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="
          relative w-full rounded-2xl overflow-hidden
          bg-purple-dark shadow-[0_16px_64px_rgba(107,33,168,0.45)]
          border border-purple-light/30
        "
        style={{ height: 'clamp(340px, 55vw, 600px)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="
            absolute top-3 right-3 z-20
            w-9 h-9 rounded-full
            bg-black/40 hover:bg-purple text-white
            flex items-center justify-center
            backdrop-blur-sm transition-colors duration-200
          "
        >
          <X size={18} />
        </button>

        {item.type === 'reel' ? (
          <video
            ref={videoRef}
            src={item.src}
            className="w-full h-full object-contain bg-black"
            autoPlay
            controls
            loop
            playsInline
          />
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-contain bg-black"
          />
        )}

        {/* Bottom caption */}
        <div className="
          absolute bottom-0 inset-x-0
          bg-linear-to-t from-black/70 to-transparent
          px-5 py-4 pointer-events-none
        ">
          <p className="text-white/80 text-sm font-medium">{item.alt}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */
/*  Thumbnail card                                                      */
/* ------------------------------------------------------------------ */

function ThumbCard({ item, index, isExpanded, onClick, inView }) {
  const handleVideoEnter = useCallback((e) => {
    e.currentTarget.play().catch(() => {})
  }, [])
  const handleVideoLeave = useCallback((e) => {
    e.currentTarget.pause()
  }, [])

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={isExpanded ? {} : { scale: 1.04, y: -4 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} — ${item.alt}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      className={`
        relative shrink-0 snap-center
        w-44 h-60 md:w-56 md:h-72
        rounded-xl overflow-hidden cursor-pointer
        shadow-md transition-shadow duration-300
        ${isExpanded
          ? 'ring-2 ring-pink-hot shadow-[0_0_24px_rgba(255,20,147,0.5)]'
          : 'hover:shadow-xl hover:shadow-purple-deep/30'}
      `}
    >
      {item.type === 'reel' ? (
        <>
          <video
            src={item.src}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            onMouseEnter={handleVideoEnter}
            onMouseLeave={handleVideoLeave}
          />
          {/* Play overlay — hidden when expanded */}
          {!isExpanded && (
            <div className="
              absolute inset-0 flex items-center justify-center
              bg-black/20 hover:bg-black/10
              transition-colors pointer-events-none
            ">
              <div className="w-10 h-10 rounded-full bg-white/85 flex items-center justify-center">
                <Play size={17} className="text-purple-deep ml-0.5" fill="currentColor" />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          {/* Zoom hint on hover */}
          {!isExpanded && (
            <div className="
              absolute inset-0 flex items-end justify-end p-2
              opacity-0 hover:opacity-100 transition-opacity
              bg-linear-to-t from-black/30 to-transparent
              pointer-events-none
            ">
              <ZoomIn size={18} className="text-white drop-shadow" />
            </div>
          )}
        </>
      )}

      {/* Active indicator badge */}
      {isExpanded && (
        <div className="
          absolute top-2 left-2
          px-2 py-0.5 rounded-full
          bg-pink-hot text-white text-[10px] font-bold uppercase tracking-wide
        ">
          {item.type === 'reel' ? 'Playing' : 'Viewing'}
        </div>
      )}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Gallery section                                                     */
/* ------------------------------------------------------------------ */

export default function Gallery() {
  const [ref, inView]         = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedId, setExpandedId]         = useState(null)
  const scrollRef = useRef(null)

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'All')    return true
    if (activeCategory === 'Reels') return item.type === 'reel'
    return item.type === 'photo'
  })

  const expandedItem = filteredItems.find((i) => i.id === expandedId) ?? null

  const handleThumbClick = (id) =>
    setExpandedId((prev) => (prev === id ? null : id))

  const scrollByAmount = (dir) => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.firstElementChild?.offsetWidth ?? 224
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 12), behavior: 'smooth' })
  }

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setExpandedId(null)
  }

  return (
    <section id="gallery" className="section-pad bg-purple-light" ref={ref}>

      {/* Heading */}
      <div className="text-center mb-8">
        <SectionLabel>Gallery &amp; Vibes</SectionLabel>
        <h2 className="font-bebas text-[clamp(42px,6vw,72px)] leading-[0.95] text-navy">
          REAL CLASSES,<br />
          <span className="text-purple">REAL ENERGY</span>
        </h2>
      </div>

      {/* Filter pills */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`
              px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide
              transition-all duration-200
              ${activeCategory === cat
                ? 'bg-purple text-yellow shadow-md scale-105'
                : 'bg-pink text-purple/70 hover:bg-purple/10'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Slider + expanded area */}
      <div className="max-w-6xl mx-auto space-y-4">

        {/* Row of thumbnails */}
        <div className="relative">
          {/* Arrow — left */}
          <button
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll left"
            className="
              hidden md:flex items-center justify-center
              absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
              w-10 h-10 rounded-full bg-white shadow-lg text-purple
              hover:bg-purple hover:text-white transition-colors
            "
          >
            <ChevronLeft size={20} />
          </button>

          {/* Arrow — right */}
          <button
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll right"
            className="
              hidden md:flex items-center justify-center
              absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
              w-10 h-10 rounded-full bg-white shadow-lg text-purple
              hover:bg-purple hover:text-white transition-colors
            "
          >
            <ChevronRight size={20} />
          </button>

          <motion.div
            ref={scrollRef}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="
              flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory
              pb-4 px-1
              [&::-webkit-scrollbar]:h-1.5
              [&::-webkit-scrollbar-track]:bg-purple/10
              [&::-webkit-scrollbar-thumb]:bg-purple/40
              [&::-webkit-scrollbar-thumb]:rounded-full
            "
          >
            {filteredItems.map((item, i) => (
              <ThumbCard
                key={item.id}
                item={item}
                index={i}
                isExpanded={expandedId === item.id}
                onClick={() => handleThumbClick(item.id)}
                inView={inView}
              />
            ))}
          </motion.div>
        </div>

        {/* Expanded view — slides in below the strip */}
        <AnimatePresence mode="wait">
          {expandedItem && (
            <ExpandedCard
              key={expandedItem.id}
              item={expandedItem}
              onClose={() => setExpandedId(null)}
            />
          )}
        </AnimatePresence>

      </div>

      {/* Tap hint — mobile only */}
      <p className="mt-4 text-center text-xs text-purple/50 md:hidden">
        Tap a card to view full size
      </p>

    </section>
  )
}