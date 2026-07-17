import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { ChevronLeft, ChevronRight, Play, X, ZoomIn, Heart } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'

import g1 from '../../assets/g1.jpg'
import g2 from '../../assets/g2.jpg'
import g3 from '../../assets/g3.jpg'
import g4 from '../../assets/g4.jpg'
import g5 from '../../assets/g5.jpg'
import g7 from '../../assets/g7.jpg'
import g8 from '../../assets/g8.jpeg'

import i1 from '../../assets/i1.jpg'
import i2 from '../../assets/i2.jpg'


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

// TODO(design-tokens): raw hex values stand in for the real @theme tokens
// (cream / hibiscus / mango / plum / lime) — swap once confirmed against
// globals.css.

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
  { id: 18, type: 'photo', src: g8, alt: 'Additional class moment' },
  { id: 19, type: 'photo', src: i1, alt: 'Instructor leading class' },
  { id: 20, type: 'photo', src: i2, alt: 'Instructor demonstrating moves' },
]

const categories = ['All', 'Reels', 'Photos']

// Persisted client-side only — no backend, so "likes" are per-browser,
// not a real counter other visitors would see.
const LIKES_STORAGE_KEY = 'pulse-zumba-gallery-likes'

/* ------------------------------------------------------------------ */
/*  Slide card                                                          */
/* ------------------------------------------------------------------ */

function GalleryCard({ item, index, onOpen, inView, isLiked, onToggleLike }) {
  const handleVideoEnter = useCallback((e) => {
    e.currentTarget.play().catch(() => {})
  }, [])
  const handleVideoLeave = useCallback((e) => {
    e.currentTarget.pause()
  }, [])

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: (index % 8) * 0.05 }}
      whileHover={{ scale: 1.03, y: -4 }}
      onClick={() => onOpen(item.id)}
      aria-label={`View ${item.alt}`}
      className="
        group relative block shrink-0 overflow-hidden rounded-xl cursor-pointer text-left
        w-44 h-60 sm:w-52 sm:h-64 md:w-56 md:h-72
        shadow-md transition-shadow duration-300
        hover:shadow-[0_8px_32px_rgba(226,63,115,0.35)]
        focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2
      "
    >
      {item.type === 'reel' ? (
        <>
          <video
            src={item.src}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            onMouseEnter={handleVideoEnter}
            onMouseLeave={handleVideoLeave}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors group-hover:bg-black/5 pointer-events-none">
            <div className="w-11 h-11 rounded-full bg-[#FAF4E9]/90 flex items-center justify-center">
              <Play size={18} className="text-[#2B1330] ml-0.5" fill="currentColor" />
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            src={item.src}
            alt={item.alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-end justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-t from-black/40 to-transparent pointer-events-none">
            <ZoomIn size={18} className="text-[#FAF4E9] drop-shadow" />
          </div>
        </>
      )}

      {/* Like — stopPropagation so it toggles instead of opening the lightbox */}
      <span
        role="button"
        tabIndex={0}
        aria-pressed={isLiked}
        aria-label={isLiked ? `Unlike ${item.alt}` : `Like ${item.alt}`}
        onClick={(e) => { e.stopPropagation(); onToggleLike(item.id) }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            onToggleLike(item.id)
          }
        }}
        className="
          absolute top-2 right-2 z-10
          w-8 h-8 rounded-full flex items-center justify-center
          bg-black/35 backdrop-blur-sm transition-colors hover:bg-black/50
          focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2
        "
      >
        <Heart
          size={15}
          className={isLiked ? 'text-[#E23F73]' : 'text-[#FAF4E9]'}
          fill={isLiked ? 'currentColor' : 'none'}
          strokeWidth={2}
        />
      </span>
    </motion.button>
  )
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                            */
/* ------------------------------------------------------------------ */

function Lightbox({ items, activeId, onClose, onNavigate, likedIds, onToggleLike }) {
  const closeButtonRef = useRef(null)
  const videoRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const activeIndex = items.findIndex((i) => i.id === activeId)
  const item = items[activeIndex]

  useEffect(() => {
    if (!item) return
    closeButtonRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [item, onClose, onNavigate])

  const handleClose = useCallback(() => {
    videoRef.current?.pause()
    onClose()
  }, [onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 md:px-16"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-[#FAF4E9]/10 hover:bg-[#FAF4E9]/20 flex items-center justify-center text-[#FAF4E9] backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2"
          >
            <X size={20} />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate(-1) }}
                aria-label="Previous"
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#FAF4E9]/10 hover:bg-[#FAF4E9]/20 items-center justify-center text-[#FAF4E9] backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate(1) }}
                aria-label="Next"
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#FAF4E9]/10 hover:bg-[#FAF4E9]/20 items-center justify-center text-[#FAF4E9] backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <motion.div
            key={item.id}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === 'reel' ? (
              <video
                ref={videoRef}
                src={item.src}
                className="w-full max-h-[78vh] rounded-2xl shadow-2xl bg-black"
                autoPlay
                controls
                loop
                playsInline
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full max-h-[78vh] rounded-2xl shadow-2xl object-contain bg-black"
              />
            )}
            <p className="mt-3 flex items-center justify-center gap-3 text-center text-sm text-[#FAF4E9]/70">
              <span>{item.alt} · {activeIndex + 1} / {items.length}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggleLike(item.id) }}
                aria-pressed={likedIds.includes(item.id)}
                aria-label={likedIds.includes(item.id) ? `Unlike ${item.alt}` : `Like ${item.alt}`}
                className="
                  inline-flex items-center gap-1 rounded-full px-2.5 py-1
                  bg-[#FAF4E9]/10 hover:bg-[#FAF4E9]/20 transition-colors
                  focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2
                "
              >
                <Heart
                  size={14}
                  className={likedIds.includes(item.id) ? 'text-[#E23F73]' : 'text-[#FAF4E9]'}
                  fill={likedIds.includes(item.id) ? 'currentColor' : 'none'}
                  strokeWidth={2}
                />
                {likedIds.includes(item.id) ? 'Liked' : 'Like'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */
/*  Gallery section                                                     */
/* ------------------------------------------------------------------ */

export default function Gallery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeId, setActiveId] = useState(null)
  const [swiperInstance, setSwiperInstance] = useState(null)

  const [likedIds, setLikedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(LIKES_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      // Corrupt/blocked storage — fall back to no likes rather than crash
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likedIds))
    } catch {
      // Storage unavailable (private browsing, quota, etc.) — likes just
      // won't persist this session, not worth surfacing to the user
    }
  }, [likedIds])

  const toggleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((likedId) => likedId !== id) : [...prev, id]
    )
  }

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'All')   return true
    if (activeCategory === 'Reels') return item.type === 'reel'
    return item.type === 'photo'
  })

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setActiveId(null)
    swiperInstance?.slideTo(0)
  }

  const handleNavigate = (dir) => {
    setActiveId((prev) => {
      const i = filteredItems.findIndex((item) => item.id === prev)
      if (i === -1) return prev
      const next = (i + dir + filteredItems.length) % filteredItems.length
      return filteredItems[next].id
    })
  }

  return (
    <section id="gallery" className="section-pad bg-[#2B1330]" ref={ref}>

      {/* Heading */}
      <div className="text-center mb-8">
        <SectionLabel>Gallery &amp; Vibes</SectionLabel>
        <h2 className="font-[Bricolage_Grotesque] font-extrabold text-[clamp(42px,6vw,72px)] leading-[0.95] text-[#FAF4E9]">
          REAL CLASSES,<br />
          <span className="text-[#E23F73]">REAL ENERGY</span>
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
              focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2
              ${activeCategory === cat
                ? 'bg-[#C8F03C] text-[#2B1330] shadow-md scale-105'
                : 'bg-[#FAF4E9]/10 text-[#FAF4E9]/70 hover:bg-[#FAF4E9]/20'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="relative max-w-6xl mx-auto">
        {/* Edge fades so the cut-off card at each end reads as "more content" not a bug */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-linear-to-r from-[#2B1330] to-transparent hidden sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10 bg-linear-to-l from-[#2B1330] to-transparent hidden sm:block" />

        <button
          type="button"
          onClick={() => swiperInstance?.slidePrev()}
          aria-label="Scroll left"
          className="
            hidden md:flex items-center justify-center
            absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20
            w-10 h-10 rounded-full bg-[#FAF4E9] shadow-lg text-[#2B1330]
            hover:bg-[#C8F03C] transition-colors
            focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2
          "
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Scroll right"
          className="
            hidden md:flex items-center justify-center
            absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20
            w-10 h-10 rounded-full bg-[#FAF4E9] shadow-lg text-[#2B1330]
            hover:bg-[#C8F03C] transition-colors
            focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2
          "
        >
          <ChevronRight size={20} />
        </button>

        <Swiper
          key={activeCategory}
          modules={[Navigation, FreeMode, Keyboard]}
          onSwiper={setSwiperInstance}
          freeMode={{ enabled: true, momentumRatio: 0.6 }}
          keyboard={{ enabled: true }}
          slidesPerView="auto"
          spaceBetween={12}
          className="px-1! pb-4!"
        >
          {filteredItems.map((item, i) => (
            <SwiperSlide key={item.id} style={{ width: 'auto' }}>
              <GalleryCard
                item={item}
                index={i}
                onOpen={setActiveId}
                inView={inView}
                isLiked={likedIds.includes(item.id)}
                onToggleLike={toggleLike}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Lightbox
        items={filteredItems}
        activeId={activeId}
        onClose={() => setActiveId(null)}
        onNavigate={handleNavigate}
        likedIds={likedIds}
        onToggleLike={toggleLike}
      />

      {/* Tap hint — mobile only */}
      <p className="mt-4 text-center text-xs text-[#FAF4E9]/40 md:hidden">
        Swipe to browse · tap a card to view full size
      </p>

    </section>
  )
}