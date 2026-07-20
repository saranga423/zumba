/* eslint-disable no-empty */
import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Heart,
  Sparkles,
  Film,
  Camera,
  Volume2,
  VolumeX,
} from 'lucide-react';

const galleryItems = [
  { id: 1,  type: 'photo', src: '/src/assets/g1.jpg',    alt: 'Zumba class energy',          tag: 'High Energy'   },
  { id: 2,  type: 'reel',  src: '/src/assets/videos/v1.mp4', alt: 'Class highlight reel',     tag: 'Choreography'  },
  { id: 3,  type: 'photo', src: '/src/assets/g2.jpg',    alt: 'Music and movement',             tag: 'Vibes'         },
  { id: 4,  type: 'reel',  src: '/src/assets/videos/v2.mp4', alt: 'Workout reel',             tag: 'High Energy'   },
  { id: 5,  type: 'photo', src: '/src/assets/g3.jpg',    alt: 'Dancing together',               tag: 'Community'     },
  { id: 6,  type: 'reel',  src: '/src/assets/videos/v3.mp4', alt: 'Dance combo reel',         tag: 'Choreography'  },
  { id: 7,  type: 'photo', src: '/src/assets/g4.jpg',    alt: 'High energy moves',              tag: 'High Energy'   },
  { id: 8,  type: 'reel',  src: '/src/assets/videos/v4.mp4', alt: 'Studio session reel',      tag: 'Vibes'         },
  { id: 9,  type: 'photo', src: '/src/assets/g5.jpg',    alt: 'Workout intensity',              tag: 'High Energy'   },
  { id: 10, type: 'reel',  src: '/src/assets/videos/v5.mp4', alt: 'Choreography reel',        tag: 'Choreography'  },
  { id: 12, type: 'reel',  src: '/src/assets/videos/v6.mp4', alt: 'Full class energy reel',   tag: 'Community'     },
  { id: 13, type: 'photo', src: '/src/assets/g7.jpg',    alt: 'More class moments',             tag: 'Vibes'         },
  { id: 14, type: 'reel',  src: '/src/assets/videos/v7.mp4', alt: 'Weekend warrior reel',     tag: 'High Energy'   },
  { id: 15, type: 'reel',  src: '/src/assets/videos/v8.mp4', alt: 'Zumba Gold reel',          tag: 'Community'     },
  { id: 16, type: 'reel',  src: '/src/assets/videos/v9.mp4', alt: 'Studio vibe reel',         tag: 'Vibes'         },
  { id: 17, type: 'reel',  src: '/src/assets/videos/v10.mp4',alt: 'Member moments reel',      tag: 'Community'     },
  { id: 18, type: 'photo', src: '/src/assets/g8.jpeg',   alt: 'Additional class moment',        tag: 'Vibes'         },
  { id: 19, type: 'photo', src: '/src/assets/i1.jpg',    alt: 'Instructor leading class',       tag: 'Choreography'  },
  { id: 20, type: 'photo', src: '/src/assets/i2.jpg',    alt: 'Instructor demonstrating moves', tag: 'Choreography'  },
]

const categories = ['All', 'Reels', 'Photos', 'High Energy', 'Choreography', 'Community', 'Vibes']
const LIKES_KEY = 'pulse-zumba-gallery-likes'

const tagColour = {
  'High Energy':  'bg-[#E23F73] text-white',
  'Choreography': 'bg-[#C8F03C] text-[#2B1330]',
  'Community':    'bg-violet-500 text-white',
  'Vibes':        'bg-amber-400 text-[#2B1330]',
}

// ─── Reel Card ────────────────────────────────────────────────────────────────
function ReelCard({ item, onOpen, isLiked, onToggleLike }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)

  const handleHoverEnter = () => { videoRef.current?.play().catch(() => {}); setPlaying(true) }
  const handleHoverLeave = () => { videoRef.current?.pause(); setPlaying(false) }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative shrink-0 w-50 h-85 rounded-2xl overflow-hidden border border-white/10 bg-[#1f0d23] shadow-xl group cursor-pointer"
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
    >
      <video
        ref={videoRef}
        src={item.src}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        muted={muted}
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
        <span className={`w-1.5 h-1.5 rounded-full ${playing ? 'bg-[#E23F73] animate-pulse' : 'bg-white/40'}`} />
        <span className="text-[9px] font-mono uppercase tracking-widest text-white/80">Reel</span>
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setMuted((m) => !m) }}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10"
      >
        {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
      </button>

      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-[#E23F73]/90 flex items-center justify-center shadow-lg">
            <Play size={18} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between">
        <div className="flex-1 min-w-0 mr-2">
          <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-1 ${tagColour[item.tag] ?? 'bg-white/20 text-white'}`}>
            {item.tag}
          </span>
          <p className="text-white text-xs font-semibold leading-tight truncate">{item.alt}</p>
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleLike(item.id) }}
          aria-label={isLiked ? 'Unlike' : 'Like'}
          className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-[#E23F73] transition-all shrink-0 border border-white/10"
        >
          <Heart size={14} className={isLiked ? 'text-[#E23F73] fill-current' : 'text-white'} strokeWidth={2.5} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => onOpen(item.id)}
        aria-label={`View ${item.alt}`}
        className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-[#C8F03C]"
      />
    </motion.div>
  )
}

// ─── Photo Card ───────────────────────────────────────────────────────────────
function PhotoCard({ item, onOpen, isLiked, onToggleLike, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#1f0d23] shadow-lg cursor-pointer mb-4 break-inside-avoid aspect-auto"
    >
      {!imgLoaded && (
        <div className="absolute inset-0 bg-linear-to-r from-white/5 via-white/10 to-white/5 animate-pulse" />
      )}
      <img
        src={item.src}
        alt={item.alt}
        onLoad={() => setImgLoaded(true)}
        className={`w-full object-cover transition-all duration-700 ${imgLoaded ? 'group-hover:scale-105' : 'scale-100'}`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-1.5 ${tagColour[item.tag] ?? 'bg-white/20 text-white'}`}>
          {item.tag}
        </span>
        <p className="text-white text-sm font-semibold leading-tight">{item.alt}</p>
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onToggleLike(item.id) }}
        aria-label={isLiked ? 'Unlike' : 'Like'}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-[#E23F73] transition-all border border-white/10 z-10"
      >
        <Heart size={14} className={isLiked ? 'text-[#E23F73] fill-current' : 'text-white'} strokeWidth={2.5} />
      </button>

      <button
        type="button"
        onClick={() => onOpen(item.id)}
        aria-label={`View ${item.alt}`}
        className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-[#C8F03C]"
      />
    </motion.div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ items, activeId, onClose, onNavigate, likedIds, onToggleLike }) {
  const closeRef = useRef(null)
  const activeIndex = items.findIndex((i) => i.id === activeId)
  const item = activeIndex !== -1 ? items[activeIndex] : null

  useEffect(() => {
    if (!item) return
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowRight')  onNavigate(1)
      if (e.key === 'ArrowLeft')   onNavigate(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose, onNavigate])

  const isLiked = item ? likedIds.includes(item.id) : false

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl px-4 md:px-20"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-[#E23F73] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl focus-visible:outline-2 focus-visible:outline-[#C8F03C]"
          >
            <X size={22} />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate(-1) }}
                aria-label="Previous"
                className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white backdrop-blur-md transition-all shadow-xl"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate(1) }}
                aria-label="Next"
                className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white backdrop-blur-md transition-all shadow-xl"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-3xl bg-[#1f0d23] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-black flex items-center justify-center max-h-[65vh] overflow-hidden">
              {item.type === 'reel' ? (
                <video
                  src={item.src}
                  className="w-full max-h-[65vh] object-contain"
                  autoPlay
                  controls
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full max-h-[65vh] object-contain"
                />
              )}
            </div>

            <div className="p-5 flex items-center justify-between bg-[#2B1330] border-t border-white/10 gap-4">
              <div className="min-w-0">
                <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded mb-1.5 ${tagColour[item.tag] ?? 'bg-white/20 text-white'}`}>
                  {item.tag}
                </span>
                <h4 className="text-white font-bold text-base leading-snug truncate">{item.alt}</h4>
                <p className="text-white/40 text-[10px] font-mono uppercase tracking-wider mt-0.5">
                  {activeIndex + 1} / {items.length}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggleLike(item.id) }}
                aria-pressed={isLiked}
                aria-label={isLiked ? 'Unlike' : 'Like'}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-lg ${
                  isLiked ? 'bg-[#E23F73] text-white' : 'bg-white/10 hover:bg-[#E23F73] text-white'
                }`}
              >
                <Heart size={15} className={isLiked ? 'fill-current' : ''} strokeWidth={2.5} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
            </div>
          </motion.div>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-[10px] font-mono uppercase tracking-widest md:hidden">
            ← swipe to navigate →
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────
export default function Gallery() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const filmstripRef = useRef(null)

  const [activeCategory, setActiveCategory] = useState('All')
  const [activeId, setActiveId] = useState(null)

  const [likedIds, setLikedIds] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(LIKES_KEY)
      return stored ? JSON.parse(stored) : []
    } catch { return [] }
  })

  useEffect(() => {
    try { localStorage.setItem(LIKES_KEY, JSON.stringify(likedIds)) } catch {}
  }, [likedIds])

  const toggleLike = (id) => {
    setLikedIds((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id])
  }

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      if (activeCategory === 'All')    return true
      if (activeCategory === 'Reels')  return item.type === 'reel'
      if (activeCategory === 'Photos') return item.type === 'photo'
      return item.tag === activeCategory
    })
  }, [activeCategory])

  const reels  = useMemo(() => filteredItems.filter((i) => i.type === 'reel'),  [filteredItems])
  const photos = useMemo(() => filteredItems.filter((i) => i.type === 'photo'), [filteredItems])

  const handleNavigate = (dir) => {
    setActiveId((prev) => {
      const idx = filteredItems.findIndex((i) => i.id === prev)
      if (idx === -1) return prev
      return filteredItems[(idx + dir + filteredItems.length) % filteredItems.length].id
    })
  }

  const scrollFilmstrip = (dir) => {
    filmstripRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' })
  }

  const col1 = useMemo(() => photos.filter((_, i) => i % 3 === 0), [photos])
  const col2 = useMemo(() => photos.filter((_, i) => i % 3 === 1), [photos])
  const col3 = useMemo(() => photos.filter((_, i) => i % 3 === 2), [photos])

  return (
    <section id="gallery" className="relative py-20 bg-[#2B1330] overflow-hidden">
      {/* ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-75 bg-[#E23F73]/8 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-100 h-75 bg-[#C8F03C]/8 blur-[130px] pointer-events-none rounded-full" />

      {/* ── Header ── */}
      <div ref={headerRef} className="relative z-10 text-center mb-12 px-4">

        {/* ── Back to Home button ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex justify-start max-w-7xl mx-auto px-4 sm:px-6 mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 text-[#FAF4E9]/70 hover:text-[#FAF4E9] hover:bg-white/15 text-xs font-bold uppercase tracking-wider transition-all no-underline"
          >
            <ChevronLeft size={14} />
            Back to Home
          </Link>
        </motion.div>

        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8F03C]/30 bg-[#C8F03C]/10 text-[#C8F03C] text-xs font-bold uppercase tracking-widest mb-4"
        >
          <Sparkles size={12} />
          Gallery &amp; Vibes
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-extrabold text-[clamp(38px,6vw,76px)] leading-[0.95] text-[#FAF4E9]"
        >
          REAL CLASSES,
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#E23F73] via-[#ff709b] to-[#C8F03C]">
            REAL ENERGY
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#FAF4E9]/60 max-w-lg mx-auto mt-4 text-sm sm:text-base"
        >
          Scroll through our reels, explore the photo wall — every frame is pure studio energy.
        </motion.p>
      </div>

      {/* ── Category Filters ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mb-10">
        <div className="flex justify-start sm:justify-center items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveId(null) }}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2 ${
                  active
                    ? 'bg-[#C8F03C] text-[#2B1330] shadow-[0_0_18px_rgba(200,240,60,0.35)] scale-105'
                    : 'bg-white/8 text-white/70 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Reels Filmstrip ── */}
      {reels.length > 0 && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-14">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E23F73]/20 flex items-center justify-center">
                <Film size={16} className="text-[#E23F73]" />
              </div>
              <span className="text-white font-bold text-sm uppercase tracking-widest">Reels</span>
              <span className="text-white/30 text-xs font-mono">({reels.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollFilmstrip(-1)}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollFilmstrip(1)}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={filmstripRef}
            className="flex gap-3 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {reels.map((item) => (
                <div key={item.id} className="snap-start shrink-0">
                  <ReelCard
                    item={item}
                    onOpen={setActiveId}
                    isLiked={likedIds.includes(item.id)}
                    onToggleLike={toggleLike}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>

          <div className="pointer-events-none absolute left-4 sm:left-6 top-13 bottom-3 w-12 bg-linear-to-r from-[#2B1330] to-transparent z-10" />
          <div className="pointer-events-none absolute right-4 sm:right-6 top-13 bottom-3 w-12 bg-linear-to-l from-[#2B1330] to-transparent z-10" />
        </div>
      )}

      {/* ── Photo Masonry ── */}
      {photos.length > 0 && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#C8F03C]/20 flex items-center justify-center">
              <Camera size={16} className="text-[#C8F03C]" />
            </div>
            <span className="text-white font-bold text-sm uppercase tracking-widest">Photos</span>
            <span className="text-white/30 text-xs font-mono">({photos.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[col1, col2, col3].map((col, ci) => (
              <div key={ci} className="flex flex-col gap-4">
                {col.map((item, pi) => (
                  <PhotoCard
                    key={item.id}
                    item={item}
                    onOpen={setActiveId}
                    isLiked={likedIds.includes(item.id)}
                    onToggleLike={toggleLike}
                    delay={pi * 0.08}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* empty state */}
      {filteredItems.length === 0 && (
        <div className="relative z-10 text-center py-20 text-white/40">
          <Sparkles size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm font-mono uppercase tracking-widest">No items in this category</p>
        </div>
      )}

      {/* ── Lightbox ── */}
      <Lightbox
        items={filteredItems}
        activeId={activeId}
        onClose={() => setActiveId(null)}
        onNavigate={handleNavigate}
        likedIds={likedIds}
        onToggleLike={toggleLike}
      />
    </section>
  )
}