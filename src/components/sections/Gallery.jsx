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
  Grid3X3,
  LayoutList,
} from 'lucide-react';

// ─── Vite Asset Imports ────────────────────────────────────────────────────────
import g1  from '../../assets/g1.jpg';
import g2  from '../../assets/g2.jpg';
import g3  from '../../assets/g3.jpg';
import g4  from '../../assets/g4.jpg';
import g5  from '../../assets/g5.jpg';
import g7  from '../../assets/g7.jpg';
import g8  from '../../assets/g8.jpeg';
import i1  from '../../assets/yy.jpg';
import i2  from '../../assets/tt.jpg';
import v1  from '../../assets/videos/v1.mp4';
import v2  from '../../assets/videos/v2.mp4';
import v3  from '../../assets/videos/v3.mp4';
import v4  from '../../assets/videos/v4.mp4';
import v5  from '../../assets/videos/v5.mp4';
import v6  from '../../assets/videos/v6.mp4';
import v7  from '../../assets/videos/v7.mp4';
import v8  from '../../assets/videos/v8.mp4';
import v9  from '../../assets/videos/v9.mp4';
import v10 from '../../assets/videos/v10.mp4';

const galleryItems = [
  { id: 1,  type: 'photo', src: g1,  alt: 'Zumba class energy',            tag: 'High Energy'   },
  { id: 2,  type: 'reel',  src: v1,  alt: 'Class highlight reel',          tag: 'Choreography'  },
  { id: 3,  type: 'photo', src: g2,  alt: 'Music and movement',            tag: 'Vibes'         },
  { id: 4,  type: 'reel',  src: v2,  alt: 'Workout reel',                  tag: 'High Energy'   },
  { id: 5,  type: 'photo', src: g3,  alt: 'Dancing together',              tag: 'Community'     },
  { id: 6,  type: 'reel',  src: v3,  alt: 'Dance combo reel',              tag: 'Choreography'  },
  { id: 7,  type: 'photo', src: g4,  alt: 'High energy moves',             tag: 'High Energy'   },
  { id: 8,  type: 'reel',  src: v4,  alt: 'Studio session reel',           tag: 'Vibes'         },
  { id: 9,  type: 'photo', src: g5,  alt: 'Workout intensity',             tag: 'High Energy'   },
  { id: 10, type: 'reel',  src: v5,  alt: 'Choreography reel',             tag: 'Choreography'  },
  { id: 12, type: 'reel',  src: v6,  alt: 'Full class energy reel',        tag: 'Community'     },
  { id: 13, type: 'photo', src: g7,  alt: 'More class moments',             tag: 'Vibes'         },
  { id: 14, type: 'reel',  src: v7,  alt: 'Weekend warrior reel',          tag: 'High Energy'   },
  { id: 15, type: 'reel',  src: v8,  alt: 'Zumba Gold reel',               tag: 'Community'     },
  { id: 16, type: 'reel',  src: v9,  alt: 'Studio vibe reel',              tag: 'Vibes'         },
  { id: 17, type: 'reel',  src: v10, alt: 'Member moments reel',           tag: 'Community'     },
  { id: 18, type: 'photo', src: g8,  alt: 'Additional class moment',        tag: 'Vibes'         },
  { id: 19, type: 'photo', src: i1,  alt: 'Instructor leading class',       tag: 'Choreography'  },
  { id: 20, type: 'photo', src: i2,  alt: 'Instructor demonstrating moves', tag: 'Choreography'  },
];

const categories = ['All', 'Reels', 'Photos', 'High Energy', 'Choreography', 'Community', 'Vibes'];
const LIKES_KEY  = 'pulse-zumba-gallery-likes';

const tagMeta = {
  'High Energy':  { pill: 'bg-[#E23F73] text-white',         dot: '#E23F73'  },
  'Choreography': { pill: 'bg-[#C8F03C] text-[#2B1330]',      dot: '#C8F03C'  },
  'Community':    { pill: 'bg-violet-500 text-white',          dot: '#8B5CF6'  },
  'Vibes':        { pill: 'bg-amber-400 text-[#2B1330]',        dot: '#FBBF24'  },
};

// ─── Tag Badge Component ──────────────────────────────────────────────────────
function TagBadge({ tag, size = 'sm' }) {
  const cls = tagMeta[tag]?.pill ?? 'bg-white/20 text-white';
  const textCls = size === 'xs' ? 'text-[8px] px-1.5 py-0.5' : 'text-[9px] px-2.5 py-1';
  return (
    <span className={`inline-block font-bold uppercase tracking-widest rounded-full ${textCls} ${cls}`}>
      {tag}
    </span>
  );
}

// ─── Reel Card ────────────────────────────────────────────────────────────────
function ReelCard({ item, onOpen, isLiked, onToggleLike }) {
  const videoRef = useRef(null);
  const [muted,   setMuted]   = useState(true);
  const [playing, setPlaying] = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  const handleEnter = () => { videoRef.current?.play().catch(() => {}); setPlaying(true); };
  const handleLeave = () => { videoRef.current?.pause(); setPlaying(false); };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative shrink-0 w-48 h-80 rounded-3xl overflow-hidden bg-[#1a0920] cursor-pointer group"
      style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 20px 60px rgba(0,0,0,0.5)' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-linear-to-br from-white/5 via-white/10 to-white/5 animate-pulse" />
      )}

      <video
        ref={videoRef}
        src={item.src}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setLoaded(true)}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/10" />
      <div className="absolute inset-0 bg-linear-to-br from-[#E23F73]/10 via-transparent to-[#C8F03C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
        <span className={`w-1.5 h-1.5 rounded-full ${playing ? 'bg-[#E23F73] animate-pulse' : 'bg-white/30'}`} />
        <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-white/70">Reel</span>
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10"
      >
        {muted ? <VolumeX size={11} /> : <Volume2 size={11} />}
      </button>

      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #E23F73, #FF9736)',
                boxShadow: '0 0 0 8px rgba(226,63,115,0.20), 0 8px 30px rgba(226,63,115,0.50)',
              }}>
              <Play size={20} fill="white" className="text-white ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <TagBadge tag={item.tag} size="xs" />
        <p className="text-white text-xs font-semibold leading-tight mt-1.5 truncate opacity-90">{item.alt}</p>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleLike(item.id); }}
          aria-label={isLiked ? 'Unlike' : 'Like'}
          className="absolute bottom-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-white/15"
          style={{ background: isLiked ? '#E23F73' : 'rgba(255,255,255,0.12)' }}
        >
          <Heart size={13} className={`transition-all ${isLiked ? 'text-white fill-white scale-110' : 'text-white/80'}`} strokeWidth={2.5} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => onOpen(item.id)}
        aria-label={`View ${item.alt}`}
        className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-[#C8F03C]"
      />
    </motion.div>
  );
}

// ─── Photo Card ───────────────────────────────────────────────────────────────
function PhotoCard({ item, onOpen, isLiked, onToggleLike, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const dot = tagMeta[item.tag]?.dot ?? '#E23F73';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative group rounded-3xl overflow-hidden bg-[#1a0920] cursor-pointer mb-4 break-inside-avoid border border-white/5"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
    >
      {!imgLoaded && (
        <div className="absolute inset-0 bg-linear-to-br from-white/5 via-white/10 to-white/5 animate-pulse min-h-40" />
      )}

      <img
        src={item.src}
        alt={item.alt}
        onLoad={() => setImgLoaded(true)}
        className={`w-full object-cover transition-transform duration-700 ${imgLoaded ? 'group-hover:scale-105' : ''}`}
        loading="lazy"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/10 opacity-70 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(to top, ${dot}55 0%, ${dot}10 40%, transparent 70%)` }} />

      <div className="absolute bottom-3.5 left-3.5">
        <TagBadge tag={item.tag} size="xs" />
        <p className="text-white/0 group-hover:text-white/90 text-xs font-semibold mt-1.5 leading-tight transition-all duration-300">
          {item.alt}
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onToggleLike(item.id); }}
        aria-label={isLiked ? 'Unlike' : 'Like'}
        className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10 opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/15"
        style={{ background: isLiked ? '#E23F73' : 'rgba(0,0,0,0.55)' }}
      >
        <Heart size={14} className={isLiked ? 'text-white fill-white' : 'text-white/80'} strokeWidth={2.5} />
      </button>

      <button
        type="button"
        onClick={() => onOpen(item.id)}
        aria-label={`View ${item.alt}`}
        className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-[#C8F03C]"
      />
    </motion.div>
  );
}

// ─── Lightbox Modal ───────────────────────────────────────────────────────────
function Lightbox({ items, activeId, onClose, onNavigate, likedIds, onToggleLike }) {
  const closeRef    = useRef(null);
  const activeIndex = items.findIndex((i) => i.id === activeId);
  const item        = activeIndex !== -1 ? items[activeIndex] : null;

  useEffect(() => {
    if (!item) return;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft')  onNavigate(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose, onNavigate]);

  const isLiked = item ? likedIds.includes(item.id) : false;
  const dot = item ? (tagMeta[item.tag]?.dot ?? '#E23F73') : '#E23F73';

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-16 bg-black/90 backdrop-blur-xl"
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
            className="absolute top-5 right-5 z-30 w-11 h-11 rounded-full flex items-center justify-center text-white bg-white/10 border border-white/15 hover:bg-[#E23F73] transition-colors"
          >
            <X size={20} />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
                aria-label="Previous"
                className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full items-center justify-center text-white bg-white/10 border border-white/15 hover:bg-white/20 transition-all"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
                aria-label="Next"
                className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full items-center justify-center text-white bg-white/10 border border-white/15 hover:bg-white/20 transition-all"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-[#170B1E] border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-black flex items-center justify-center overflow-hidden" style={{ maxHeight: '65vh' }}>
              <div className="absolute inset-0 opacity-20"
                style={{ background: `radial-gradient(ellipse at center, ${dot} 0%, transparent 70%)` }} />
              {item.type === 'reel' ? (
                <video
                  src={item.src}
                  className="w-full object-contain z-10"
                  style={{ maxHeight: '65vh' }}
                  autoPlay controls loop playsInline
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-contain z-10"
                  style={{ maxHeight: '65vh' }}
                />
              )}
            </div>

            <div className="flex items-center justify-between gap-4 px-6 py-5 border-t border-white/10">
              <div className="min-w-0">
                <TagBadge tag={item.tag} />
                <h4 className="text-white font-bold text-base leading-snug mt-2 truncate">{item.alt}</h4>
                <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mt-1">
                  {activeIndex + 1} / {items.length}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggleLike(item.id); }}
                aria-pressed={isLiked}
                aria-label={isLiked ? 'Unlike' : 'Like'}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shrink-0"
                style={{
                  background: isLiked ? 'linear-gradient(135deg, #E23F73, #FF9736)' : 'rgba(255,255,255,0.08)',
                  border: isLiked ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                }}
              >
                <Heart size={15} className={isLiked ? 'fill-white text-white' : ''} strokeWidth={2.5} />
                {isLiked ? 'Liked' : 'Like'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Gallery Component ───────────────────────────────────────────────────
export default function Gallery() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const filmstripRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeId,       setActiveId]       = useState(null);
  const [photoLayout,    setPhotoLayout]    = useState('masonry');

  const [likedIds, setLikedIds] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(LIKES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(LIKES_KEY, JSON.stringify(likedIds)); } catch {}
  }, [likedIds]);

  const toggleLike = (id) => {
    setLikedIds((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]);
  };

  const filteredItems = useMemo(() => galleryItems.filter((item) => {
    if (activeCategory === 'All')    return true;
    if (activeCategory === 'Reels')  return item.type === 'reel';
    if (activeCategory === 'Photos') return item.type === 'photo';
    return item.tag === activeCategory;
  }), [activeCategory]);

  const reels  = useMemo(() => filteredItems.filter((i) => i.type === 'reel'),  [filteredItems]);
  const photos = useMemo(() => filteredItems.filter((i) => i.type === 'photo'), [filteredItems]);

  const handleNavigate = (dir) => {
    setActiveId((prev) => {
      const idx = filteredItems.findIndex((i) => i.id === prev);
      if (idx === -1) return prev;
      return filteredItems[(idx + dir + filteredItems.length) % filteredItems.length].id;
    });
  };

  const scrollFilmstrip = (dir) => {
    filmstripRef.current?.scrollBy({ left: dir * 240, behavior: 'smooth' });
  };

  const col1 = useMemo(() => photos.filter((_, i) => i % 3 === 0), [photos]);
  const col2 = useMemo(() => photos.filter((_, i) => i % 3 === 1), [photos]);
  const col3 = useMemo(() => photos.filter((_, i) => i % 3 === 2), [photos]);

  return (
    <section id="gallery" className="relative min-h-screen py-24 bg-[#0e0516] text-[#FAF4E9] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none rounded-full blur-[160px] bg-[#E23F73]/10" />

      {/* Header */}
      <div ref={headerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all mb-8"
        >
          <ChevronLeft size={14} /> Back to Home
        </Link>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#C8F03C] bg-[#C8F03C]/10 border border-[#C8F03C]/20 mb-4"
          >
            <Sparkles size={11} /> Studio Gallery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4"
          >
            REAL CLASSES, <span className="bg-linear-to-r from-[#E23F73] via-[#FF9736] to-[#C8F03C] bg-clip-text text-transparent">REAL ENERGY</span>
          </motion.h1>

          <p className="max-w-md mx-auto text-white/50 text-sm sm:text-base">
            Explore our latest video highlights and photo archives directly from the studio floor.
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mb-12">
        <div className="flex justify-start sm:justify-center items-center gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveId(null); }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  active
                    ? 'bg-linear-to-r from-[#E23F73] to-[#FF9736] text-white shadow-lg'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reels Section */}
      {reels.length > 0 && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Film size={18} className="text-[#E23F73]" />
              <span className="font-extrabold text-sm uppercase tracking-widest">Reels</span>
              <span className="text-white/30 text-xs">({reels.length})</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollFilmstrip(-1)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollFilmstrip(1)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={filmstripRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
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
          </div>
        </div>
      )}

      {/* Photos Section */}
      {photos.length > 0 && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Camera size={18} className="text-[#C8F03C]" />
              <span className="font-extrabold text-sm uppercase tracking-widest">Photos</span>
              <span className="text-white/30 text-xs">({photos.length})</span>
            </div>

            <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                type="button"
                onClick={() => setPhotoLayout('masonry')}
                className={`p-1.5 rounded-lg transition-colors ${photoLayout === 'masonry' ? 'bg-white/20 text-white' : 'text-white/40'}`}
              >
                <LayoutList size={16} />
              </button>
              <button
                type="button"
                onClick={() => setPhotoLayout('grid')}
                className={`p-1.5 rounded-lg transition-colors ${photoLayout === 'grid' ? 'bg-white/20 text-white' : 'text-white/40'}`}
              >
                <Grid3X3 size={16} />
              </button>
            </div>
          </div>

          {photoLayout === 'masonry' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {[col1, col2, col3].map((column, colIdx) => (
                <div key={colIdx} className="flex flex-col">
                  {column.map((item, idx) => (
                    <PhotoCard
                      key={item.id}
                      item={item}
                      onOpen={setActiveId}
                      isLiked={likedIds.includes(item.id)}
                      onToggleLike={toggleLike}
                      delay={idx * 0.05}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((item, idx) => (
                <PhotoCard
                  key={item.id}
                  item={item}
                  onOpen={setActiveId}
                  isLiked={likedIds.includes(item.id)}
                  onToggleLike={toggleLike}
                  delay={idx * 0.04}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lightbox Component */}
      <Lightbox
        items={filteredItems}
        activeId={activeId}
        onClose={() => setActiveId(null)}
        onNavigate={handleNavigate}
        likedIds={likedIds}
        onToggleLike={toggleLike}
      />
    </section>
  );
}