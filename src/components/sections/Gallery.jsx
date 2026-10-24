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
  Palette,
} from 'lucide-react';

import g1  from '../../assets/g1.jpg';
import g2  from '../../assets/g2.jpg';
import g3  from '../../assets/g3.jpeg';
import g4  from '../../assets/g4.jpeg';
import g5  from '../../assets/g5.jpeg';
import g7  from '../../assets/g7.jpg';
import g8  from '../../assets/g8.jpeg';
import v1  from '../../assets/videos/v13.mp4';
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
  { id: 1,  type: 'photo', src: g1,  alt: 'Zumba class energy',       tag: 'High Energy'  },
  { id: 2,  type: 'reel',  src: v1,  alt: 'Class highlight reel',     tag: 'Choreography' },
  { id: 3,  type: 'photo', src: g2,  alt: 'Music and movement',       tag: 'Vibes'        },
  { id: 4,  type: 'reel',  src: v2,  alt: 'Workout reel',             tag: 'High Energy'  },
  { id: 5,  type: 'photo', src: g3,  alt: 'Dancing together',         tag: 'Community'    },
  { id: 6,  type: 'reel',  src: v3,  alt: 'Dance combo reel',         tag: 'Choreography' },
  { id: 7,  type: 'photo', src: g4,  alt: 'High energy moves',        tag: 'High Energy'  },
  { id: 8,  type: 'reel',  src: v4,  alt: 'Studio session reel',      tag: 'Vibes'        },
  { id: 9,  type: 'photo', src: g5,  alt: 'Workout intensity',        tag: 'High Energy'  },
  { id: 10, type: 'reel',  src: v5,  alt: 'Choreography reel',        tag: 'Choreography' },
  { id: 12, type: 'reel',  src: v6,  alt: 'Full class energy reel',   tag: 'Community'    },
  { id: 13, type: 'photo', src: g7,  alt: 'More class moments',       tag: 'Vibes'        },
  { id: 14, type: 'reel',  src: v7,  alt: 'Weekend warrior reel',     tag: 'High Energy'  },
  { id: 15, type: 'reel',  src: v8,  alt: 'Zumba Gold reel',          tag: 'Community'    },
  { id: 16, type: 'reel',  src: v9,  alt: 'Studio vibe reel',         tag: 'Vibes'        },
  { id: 17, type: 'reel',  src: v10, alt: 'Member moments reel',      tag: 'Community'    },
  { id: 18, type: 'photo', src: g8,  alt: 'Additional class moment',  tag: 'Vibes'        },
];

const categories = ['All', 'Reels', 'Photos', 'High Energy', 'Choreography', 'Community', 'Vibes'];
const LIKES_KEY  = 'pulse-zumba-gallery-likes';

// ── Theme definitions ─────────────────────────────────────────────────────────
const THEMES = {
  light: {
    id: 'light',
    label: 'Light',
    page:        '#FFFFFF',
    surface:     '#F6F4F0',
    surfaceHov:  '#EDEAE6',
    border:      '#E8E4DE',
    ink:         '#1A1118',
    inkMid:      '#6B6070',
    inkFaint:    '#B8B0BC',
    pillActive:  '#1A1118',
    pillText:    '#FFFFFF',
    accentBar:   'linear-gradient(90deg,#E23F73,#FF9736,#9AC900)',
    headerGrad:  'linear-gradient(135deg,#E23F73 0%,#FF9736 50%,#9AC900 100%)',
    reelOverlay: 'linear-gradient(to top,rgba(0,0,0,0.72),rgba(0,0,0,0.08),transparent)',
    lbBg:        'rgba(26,17,24,0.65)',
    lbModal:     '#FFFFFF',
    lbMedia:     '#0e0516',
    lbBorder:    '#E8E4DE',
    lbInfoBg:    '#FFFFFF',
    lbText:      '#1A1118',
    lbMeta:      '#B8B0BC',
    blob1:       'rgba(226,63,115,0.05)',
    blob2:       'rgba(154,201,0,0.06)',
    sectionIconReels: '#E23F73',
    sectionIconReelsText: '#FFFFFF',
    sectionIconPhotos: '#9AC900',
    sectionIconPhotosText: '#1A1118',
    eyebrowBg:   '#fde8ef',
    eyebrowText: '#b01d4e',
    eyebrowBorder:'#f9bad0',
    likedPillBg: '#fde8ef',
    likedPillText:'#b01d4e',
    likedPillBorder:'#f9bad0',
    scrollNavBg: '#FFFFFF',
    scrollNavHov:'#F6F4F0',
    scrollNavBorder:'#E8E4DE',
    scrollNavHovBorder:'#1A1118',
    scrollNavText:'#1A1118',
    divider:     '#E8E4DE',
    playBg:      '#FFFFFF',
    playColor:   '#E23F73',
    playGlow:    'rgba(226,63,115,0.30)',
    muteRing:    '#E8E4DE',
    reelPillBg:  'rgba(255,255,255,0.90)',
    reelPillText:'rgba(26,17,24,0.70)',
    reelPillBorder:'#E8E4DE',
    cardBg:      '#F6F4F0',
    cardShadow:  '0 1px 3px rgba(26,17,24,0.08),0 8px 32px rgba(26,17,24,0.10)',
    cardBorder:  '1px solid #E8E4DE',
    photoBadgeVariant: 'dark',
    lbBadgeVariant: 'light',
    closeBtn:    '#1A1118',
    closeBtnBg:  '#FFFFFF',
    closeBtnHov: '#F6F4F0',
  },
  blush: {
    id: 'blush',
    label: 'Blush',
    page:        '#FFF5F8',
    surface:     '#FFE8F0',
    surfaceHov:  '#FFCFE0',
    border:      '#FFBED5',
    ink:         '#3D0A1E',
    inkMid:      '#8C3A55',
    inkFaint:    '#C9849A',
    pillActive:  '#E23F73',
    pillText:    '#FFFFFF',
    accentBar:   'linear-gradient(90deg,#E23F73,#FF6B9D,#FFB3CC)',
    headerGrad:  'linear-gradient(135deg,#E23F73 0%,#FF6B9D 60%,#FFB347 100%)',
    reelOverlay: 'linear-gradient(to top,rgba(61,10,30,0.80),rgba(61,10,30,0.10),transparent)',
    lbBg:        'rgba(61,10,30,0.70)',
    lbModal:     '#FFF5F8',
    lbMedia:     '#1a0010',
    lbBorder:    '#FFBED5',
    lbInfoBg:    '#FFF5F8',
    lbText:      '#3D0A1E',
    lbMeta:      '#C9849A',
    blob1:       'rgba(226,63,115,0.08)',
    blob2:       'rgba(255,107,157,0.06)',
    sectionIconReels: '#E23F73',
    sectionIconReelsText: '#FFFFFF',
    sectionIconPhotos: '#FF6B9D',
    sectionIconPhotosText: '#FFFFFF',
    eyebrowBg:   '#fde8ef',
    eyebrowText: '#b01d4e',
    eyebrowBorder:'#f9bad0',
    likedPillBg: '#fde8ef',
    likedPillText:'#b01d4e',
    likedPillBorder:'#f9bad0',
    scrollNavBg: '#FFE8F0',
    scrollNavHov:'#FFCFE0',
    scrollNavBorder:'#FFBED5',
    scrollNavHovBorder:'#E23F73',
    scrollNavText:'#3D0A1E',
    divider:     '#FFBED5',
    playBg:      '#FFFFFF',
    playColor:   '#E23F73',
    playGlow:    'rgba(226,63,115,0.35)',
    muteRing:    '#FFBED5',
    reelPillBg:  'rgba(255,245,248,0.90)',
    reelPillText:'rgba(61,10,30,0.70)',
    reelPillBorder:'#FFBED5',
    cardBg:      '#FFE8F0',
    cardShadow:  '0 1px 3px rgba(61,10,30,0.08),0 8px 32px rgba(226,63,115,0.12)',
    cardBorder:  '1px solid #FFBED5',
    photoBadgeVariant: 'dark',
    lbBadgeVariant: 'light',
    closeBtn:    '#3D0A1E',
    closeBtnBg:  '#FFF5F8',
    closeBtnHov: '#FFE8F0',
  },
  sage: {
    id: 'sage',
    label: 'Sage',
    page:        '#F4F7F2',
    surface:     '#E8EFE5',
    surfaceHov:  '#D8E6D2',
    border:      '#C5D9BC',
    ink:         '#1A2D17',
    inkMid:      '#4A6B42',
    inkFaint:    '#8FAD87',
    pillActive:  '#2D6B24',
    pillText:    '#FFFFFF',
    accentBar:   'linear-gradient(90deg,#4CAF50,#9AC900,#C8F03C)',
    headerGrad:  'linear-gradient(135deg,#2D6B24 0%,#4CAF50 50%,#9AC900 100%)',
    reelOverlay: 'linear-gradient(to top,rgba(26,45,23,0.80),rgba(26,45,23,0.10),transparent)',
    lbBg:        'rgba(26,45,23,0.70)',
    lbModal:     '#F4F7F2',
    lbMedia:     '#0a160a',
    lbBorder:    '#C5D9BC',
    lbInfoBg:    '#F4F7F2',
    lbText:      '#1A2D17',
    lbMeta:      '#8FAD87',
    blob1:       'rgba(76,175,80,0.07)',
    blob2:       'rgba(154,201,0,0.06)',
    sectionIconReels: '#4CAF50',
    sectionIconReelsText: '#FFFFFF',
    sectionIconPhotos: '#9AC900',
    sectionIconPhotosText: '#1A2D17',
    eyebrowBg:   '#e6f4e4',
    eyebrowText: '#1e6b18',
    eyebrowBorder:'#b8ddb4',
    likedPillBg: '#e6f4e4',
    likedPillText:'#1e6b18',
    likedPillBorder:'#b8ddb4',
    scrollNavBg: '#E8EFE5',
    scrollNavHov:'#D8E6D2',
    scrollNavBorder:'#C5D9BC',
    scrollNavHovBorder:'#2D6B24',
    scrollNavText:'#1A2D17',
    divider:     '#C5D9BC',
    playBg:      '#FFFFFF',
    playColor:   '#2D6B24',
    playGlow:    'rgba(45,107,36,0.30)',
    muteRing:    '#C5D9BC',
    reelPillBg:  'rgba(244,247,242,0.90)',
    reelPillText:'rgba(26,45,23,0.70)',
    reelPillBorder:'#C5D9BC',
    cardBg:      '#E8EFE5',
    cardShadow:  '0 1px 3px rgba(26,45,23,0.08),0 8px 32px rgba(76,175,80,0.10)',
    cardBorder:  '1px solid #C5D9BC',
    photoBadgeVariant: 'dark',
    lbBadgeVariant: 'light',
    closeBtn:    '#1A2D17',
    closeBtnBg:  '#F4F7F2',
    closeBtnHov: '#E8EFE5',
  },
  slate: {
    id: 'slate',
    label: 'Slate',
    page:        '#F0F2F5',
    surface:     '#E2E6EC',
    surfaceHov:  '#D0D6DF',
    border:      '#BDC5D0',
    ink:         '#111827',
    inkMid:      '#4B5563',
    inkFaint:    '#9CA3AF',
    pillActive:  '#1E3A5F',
    pillText:    '#FFFFFF',
    accentBar:   'linear-gradient(90deg,#1E3A5F,#3B82F6,#60A5FA)',
    headerGrad:  'linear-gradient(135deg,#1E3A5F 0%,#3B82F6 60%,#60A5FA 100%)',
    reelOverlay: 'linear-gradient(to top,rgba(17,24,39,0.82),rgba(17,24,39,0.10),transparent)',
    lbBg:        'rgba(17,24,39,0.75)',
    lbModal:     '#F0F2F5',
    lbMedia:     '#060B14',
    lbBorder:    '#BDC5D0',
    lbInfoBg:    '#F0F2F5',
    lbText:      '#111827',
    lbMeta:      '#9CA3AF',
    blob1:       'rgba(59,130,246,0.06)',
    blob2:       'rgba(96,165,250,0.05)',
    sectionIconReels: '#3B82F6',
    sectionIconReelsText: '#FFFFFF',
    sectionIconPhotos: '#60A5FA',
    sectionIconPhotosText: '#FFFFFF',
    eyebrowBg:   '#DBEAFE',
    eyebrowText: '#1D4ED8',
    eyebrowBorder:'#BFDBFE',
    likedPillBg: '#DBEAFE',
    likedPillText:'#1D4ED8',
    likedPillBorder:'#BFDBFE',
    scrollNavBg: '#E2E6EC',
    scrollNavHov:'#D0D6DF',
    scrollNavBorder:'#BDC5D0',
    scrollNavHovBorder:'#1E3A5F',
    scrollNavText:'#111827',
    divider:     '#BDC5D0',
    playBg:      '#FFFFFF',
    playColor:   '#1E3A5F',
    playGlow:    'rgba(30,58,95,0.25)',
    muteRing:    '#BDC5D0',
    reelPillBg:  'rgba(240,242,245,0.92)',
    reelPillText:'rgba(17,24,39,0.70)',
    reelPillBorder:'#BDC5D0',
    cardBg:      '#E2E6EC',
    cardShadow:  '0 1px 3px rgba(17,24,39,0.08),0 8px 32px rgba(30,58,95,0.10)',
    cardBorder:  '1px solid #BDC5D0',
    photoBadgeVariant: 'dark',
    lbBadgeVariant: 'light',
    closeBtn:    '#111827',
    closeBtnBg:  '#F0F2F5',
    closeBtnHov: '#E2E6EC',
  },
};

const THEME_ORDER = ['light', 'blush', 'sage', 'slate'];

const tagMeta = {
  'High Energy':  { pill: 'bg-[#E23F73] text-white',          dot: '#E23F73', lightBg: '#fde8ef', lightText: '#b01d4e' },
  'Choreography': { pill: 'bg-[#1A1118] text-white',          dot: '#1A1118', lightBg: '#ece9f0', lightText: '#1A1118' },
  'Community':    { pill: 'bg-[#7C3AED] text-white',          dot: '#7C3AED', lightBg: '#ede9fb', lightText: '#5b21b6' },
  'Vibes':        { pill: 'bg-[#F59E0B] text-[#1A1118]',      dot: '#F59E0B', lightBg: '#fef3c7', lightText: '#92400e' },
};

function TagBadge({ tag, variant = 'dark', size = 'sm' }) {
  const meta = tagMeta[tag] ?? { pill: 'bg-[#1A1118] text-white', lightBg: '#eee', lightText: '#333' };
  const textCls = size === 'xs' ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-2.5 py-1';
  if (variant === 'light') {
    return (
      <span
        className={`inline-block font-bold tracking-wide rounded-full ${textCls}`}
        style={{ background: meta.lightBg, color: meta.lightText }}
      >
        {tag}
      </span>
    );
  }
  return (
    <span className={`inline-block font-bold tracking-wide rounded-full ${textCls} ${meta.pill}`}>
      {tag}
    </span>
  );
}

// ── Theme Switcher ─────────────────────────────────────────────────────────────
function ThemeSwitcher({ current, onChange }) {
  const swatchColors = {
    light: '#E23F73',
    blush: '#FFB3CC',
    sage:  '#9AC900',
    slate: '#3B82F6',
  };
  return (
    <div className="flex items-center gap-2">
      <Palette size={13} style={{ color: 'currentColor', opacity: 0.5 }} />
      <div className="flex gap-1.5">
        {THEME_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            title={THEMES[id].label}
            onClick={() => onChange(id)}
            className="w-5 h-5 rounded-full transition-all border-2"
            style={{
              background: swatchColors[id],
              borderColor: current === id ? THEMES[id].ink : 'transparent',
              transform: current === id ? 'scale(1.25)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Reel Card ─────────────────────────────────────────────────────────────────
function ReelCard({ item, onOpen, isLiked, onToggleLike, theme: t }) {
  const videoRef = useRef(null);
  const [muted,   setMuted]   = useState(true);
  const [playing, setPlaying] = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  const handleEnter = () => { videoRef.current?.play().catch(() => {}); setPlaying(true); };
  const handleLeave = () => { videoRef.current?.pause(); setPlaying(false); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="relative shrink-0 w-52 h-80 rounded-2xl overflow-hidden cursor-pointer group"
      style={{ background: t.cardBg, boxShadow: t.cardShadow, border: t.cardBorder }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse" style={{ background: t.surface }} />
      )}

      <video
        ref={videoRef}
        src={item.src}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        muted={muted} loop playsInline preload="metadata"
        onLoadedData={() => setLoaded(true)}
      />

      <div className="absolute inset-0" style={{ background: t.reelOverlay }} />

      {/* Live pill */}
      <div
        className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
        style={{ background: t.reelPillBg, border: `1px solid ${t.muteRing}` }}
      >
        <span className="w-1.5 h-1.5 rounded-full transition-all"
          style={{ background: playing ? '#E23F73' : t.inkFaint,
                   boxShadow: playing ? '0 0 0 2px rgba(226,63,115,0.3)' : 'none' }} />
        <span className="text-[9px] font-bold tracking-widest" style={{ color: t.reelPillText }}>REEL</span>
      </div>

      {/* Mute */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="absolute top-3 right-3 w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors"
        style={{ background: t.reelPillBg, border: `1px solid ${t.muteRing}`, color: t.reelPillText }}
      >
        {muted ? <VolumeX size={11} /> : <Volume2 size={11} />}
      </button>

      {/* Play */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: t.playBg, boxShadow: `0 4px 24px ${t.playGlow}` }}>
              <Play size={20} fill={t.playColor} style={{ color: t.playColor, marginLeft: 3 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <TagBadge tag={item.tag} variant="dark" size="xs" />
        <p className="text-white text-xs font-semibold leading-tight mt-1.5 truncate">{item.alt}</p>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleLike(item.id); }}
          aria-label={isLiked ? 'Unlike' : 'Like'}
          className="absolute bottom-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: isLiked ? '#E23F73' : 'rgba(255,255,255,0.85)',
            border: isLiked ? 'none' : '1px solid rgba(255,255,255,0.6)',
          }}
        >
          <Heart size={13}
            className="transition-all"
            style={{ color: isLiked ? '#fff' : '#E23F73',
                     fill: isLiked ? '#fff' : 'none',
                     transform: isLiked ? 'scale(1.1)' : 'scale(1)' }}
            strokeWidth={2.5}
          />
        </button>
      </div>

      <button
        type="button"
        onClick={() => onOpen(item.id)}
        aria-label={`View ${item.alt}`}
        className="absolute inset-0 rounded-2xl focus-visible:outline-2"
        style={{ outlineColor: t.pillActive }}
      />
    </motion.div>
  );
}

// ── Photo Card ────────────────────────────────────────────────────────────────
function PhotoCard({ item, onOpen, isLiked, onToggleLike, delay = 0, theme: t }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const dot = tagMeta[item.tag]?.dot ?? '#E23F73';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative group rounded-2xl overflow-hidden cursor-pointer mb-4 break-inside-avoid"
      style={{ background: t.cardBg, boxShadow: t.cardShadow, border: t.cardBorder }}
    >
      {!imgLoaded && (
        <div className="absolute inset-0 animate-pulse min-h-40" style={{ background: t.surface }} />
      )}

      <img
        src={item.src} alt={item.alt}
        onLoad={() => setImgLoaded(true)}
        className={`w-full object-cover transition-transform duration-700 ${imgLoaded ? 'group-hover:scale-[1.04]' : ''}`}
        loading="lazy"
      />

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to top,${dot}cc 0%,${dot}44 40%,transparent 70%)` }} />

      <div className="absolute bottom-3 left-3">
        <TagBadge tag={item.tag} variant="dark" size="xs" />
        <p className="text-xs font-semibold mt-1.5 leading-tight transition-all duration-300 drop-shadow-sm"
          style={{ color: 'rgba(255,255,255,0)', transition: 'color 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.95)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0)'}
        >
          {item.alt}
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onToggleLike(item.id); }}
        aria-label={isLiked ? 'Unlike' : 'Like'}
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 opacity-0 group-hover:opacity-100"
        style={{
          background: isLiked ? '#E23F73' : 'rgba(255,255,255,0.92)',
          border: isLiked ? 'none' : '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
        }}
      >
        <Heart size={13}
          style={{ color: isLiked ? '#fff' : '#E23F73', fill: isLiked ? '#fff' : 'none' }}
          strokeWidth={2.5}
        />
      </button>

      <button
        type="button"
        onClick={() => onOpen(item.id)}
        aria-label={`View ${item.alt}`}
        className="absolute inset-0 rounded-2xl focus-visible:outline-2"
        style={{ outlineColor: t.pillActive }}
      />
    </motion.div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ items, activeId, onClose, onNavigate, likedIds, onToggleLike, theme: t }) {
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
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [item, onClose, onNavigate]);

  const isLiked = item ? likedIds.includes(item.id) : false;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-16"
          style={{ background: t.lbBg, backdropFilter: 'blur(16px)' }}
          onClick={onClose}
          role="dialog" aria-modal="true" aria-label={item.alt}
        >
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close"
            className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg"
            style={{ color: t.closeBtn, background: t.closeBtnBg }}
            onMouseEnter={(e) => e.currentTarget.style.background = t.closeBtnHov}
            onMouseLeave={(e) => e.currentTarget.style.background = t.closeBtnBg}
          >
            <X size={18} />
          </button>

          {items.length > 1 && (
            <>
              {['left', 'right'].map((side) => (
                <button
                  key={side}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onNavigate(side === 'left' ? -1 : 1); }}
                  aria-label={side === 'left' ? 'Previous' : 'Next'}
                  className={`hidden md:flex absolute ${side}-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full items-center justify-center transition-all shadow-lg`}
                  style={{ color: t.closeBtn, background: t.closeBtnBg }}
                  onMouseEnter={(e) => e.currentTarget.style.background = t.closeBtnHov}
                  onMouseLeave={(e) => e.currentTarget.style.background = t.closeBtnBg}
                >
                  {side === 'left' ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
                </button>
              ))}
            </>
          )}

          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: t.lbModal, border: `1px solid ${t.lbBorder}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-center overflow-hidden" style={{ background: t.lbMedia, maxHeight: '62vh' }}>
              {item.type === 'reel'
                ? <video src={item.src} className="w-full object-contain z-10" style={{ maxHeight: '62vh' }} autoPlay controls loop playsInline />
                : <img src={item.src} alt={item.alt} className="w-full object-contain z-10" style={{ maxHeight: '62vh' }} />
              }
            </div>

            <div className="flex items-center justify-between gap-4 px-6 py-4 border-t" style={{ borderColor: t.lbBorder, background: t.lbInfoBg }}>
              <div className="min-w-0">
                <TagBadge tag={item.tag} variant="light" />
                <h4 className="font-bold text-base leading-snug mt-2 truncate" style={{ color: t.lbText }}>{item.alt}</h4>
                <p className="text-[10px] font-semibold tracking-widest mt-1" style={{ color: t.lbMeta }}>
                  {activeIndex + 1} / {items.length}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggleLike(item.id); }}
                aria-pressed={isLiked}
                aria-label={isLiked ? 'Unlike' : 'Like'}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all shrink-0 border"
                style={isLiked
                  ? { background: '#E23F73', borderColor: '#E23F73', color: '#fff' }
                  : { background: t.lbInfoBg, borderColor: t.lbBorder, color: t.lbText }
                }
              >
                <Heart size={14}
                  style={{ color: isLiked ? '#fff' : '#E23F73', fill: isLiked ? '#fff' : 'none' }}
                  strokeWidth={2.5}
                />
                {isLiked ? 'Liked' : 'Like'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const filmstripRef = useRef(null);

  const [themeId,        setThemeId]        = useState('light');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeId,       setActiveId]       = useState(null);
  const [photoLayout,    setPhotoLayout]    = useState('masonry');

  const t = THEMES[themeId];

  const [likedIds, setLikedIds] = useState(() => {
    if (typeof window === 'undefined') return [];
    try { const s = localStorage.getItem(LIKES_KEY); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem(LIKES_KEY, JSON.stringify(likedIds)); } catch {} }, [likedIds]);

  const toggleLike = (id) => setLikedIds((p) => p.includes(id) ? p.filter((l) => l !== id) : [...p, id]);

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

  const scrollFilmstrip = (dir) => filmstripRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });

  const col1 = useMemo(() => photos.filter((_, i) => i % 3 === 0), [photos]);
  const col2 = useMemo(() => photos.filter((_, i) => i % 3 === 1), [photos]);
  const col3 = useMemo(() => photos.filter((_, i) => i % 3 === 2), [photos]);

  return (
    <section
      id="gallery"
      className="relative min-h-screen py-24 overflow-hidden transition-colors duration-500"
      style={{ background: t.page }}
    >
      {/* Accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none transition-all duration-500"
        style={{ background: t.accentBar }} />

      {/* Blobs */}
      <div className="absolute top-32 -left-40 w-96 h-96 pointer-events-none rounded-full transition-all duration-500"
        style={{ background: `radial-gradient(circle,${t.blob1} 0%,transparent 70%)` }} />
      <div className="absolute bottom-48 -right-32 w-80 h-80 pointer-events-none rounded-full transition-all duration-500"
        style={{ background: `radial-gradient(circle,${t.blob2} 0%,transparent 70%)` }} />

      {/* ── Header ── */}
      <div ref={headerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 mb-14">
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all border"
            style={{ background: t.surface, color: t.inkMid, borderColor: t.border }}
            onMouseEnter={(e) => { e.currentTarget.style.color = t.ink; e.currentTarget.style.borderColor = t.pillActive; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = t.inkMid; e.currentTarget.style.borderColor = t.border; }}
          >
            <ChevronLeft size={13} /> Home
          </Link>

          <ThemeSwitcher current={themeId} onChange={setThemeId} />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-5 border"
              style={{ background: t.eyebrowBg, color: t.eyebrowText, borderColor: t.eyebrowBorder }}
            >
              <Sparkles size={10} /> Studio Gallery
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-none transition-colors duration-500"
              style={{ color: t.ink }}
            >
              Real classes,<br />
              <span style={{ background: t.headerGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                real energy.
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-xs text-sm leading-relaxed lg:text-right transition-colors duration-500"
            style={{ color: t.inkMid }}
          >
            Video highlights and photo archives straight from the studio floor.
          </motion.p>
        </div>

        <div className="mt-10 h-px transition-colors duration-500" style={{ background: t.divider }} />
      </div>

      {/* ── Filters ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveId(null); }}
                className="px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap border"
                style={active
                  ? { background: t.pillActive, color: t.pillText, borderColor: t.pillActive }
                  : { background: t.surface, color: t.inkMid, borderColor: t.border }
                }
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = t.pillActive; e.currentTarget.style.color = t.ink; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.inkMid; } }}
              >
                {cat}
              </button>
            );
          })}

          {likedIds.length > 0 && (
            <span className="ml-auto shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border"
              style={{ background: t.likedPillBg, color: t.likedPillText, borderColor: t.likedPillBorder }}>
              <Heart size={10} style={{ fill: '#E23F73', color: '#E23F73' }} /> {likedIds.length} liked
            </span>
          )}
        </div>
      </div>

      {/* ── Reels ── */}
      {reels.length > 0 && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 mb-16">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: t.sectionIconReels }}>
                <Film size={15} style={{ color: t.sectionIconReelsText }} />
              </div>
              <span className="font-extrabold text-sm" style={{ color: t.ink }}>Reels</span>
              <span className="text-xs font-medium" style={{ color: t.inkFaint }}>({reels.length})</span>
            </div>

            <div className="flex gap-2">
              {[-1, 1].map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => scrollFilmstrip(dir)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all border"
                  style={{ background: t.scrollNavBg, borderColor: t.scrollNavBorder, color: t.scrollNavText }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = t.scrollNavHov; e.currentTarget.style.borderColor = t.scrollNavHovBorder; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = t.scrollNavBg; e.currentTarget.style.borderColor = t.scrollNavBorder; }}
                >
                  {dir === -1 ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
                </button>
              ))}
            </div>
          </div>

          <div ref={filmstripRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}>
            {reels.map((item) => (
              <div key={item.id} className="snap-start shrink-0">
                <ReelCard item={item} onOpen={setActiveId}
                  isLiked={likedIds.includes(item.id)} onToggleLike={toggleLike} theme={t} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Photos ── */}
      {photos.length > 0 && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: t.sectionIconPhotos }}>
                <Camera size={15} style={{ color: t.sectionIconPhotosText }} />
              </div>
              <span className="font-extrabold text-sm" style={{ color: t.ink }}>Photos</span>
              <span className="text-xs font-medium" style={{ color: t.inkFaint }}>({photos.length})</span>
            </div>

            <div className="flex items-center p-1 rounded-xl border" style={{ background: t.surface, borderColor: t.border }}>
              {[['masonry', LayoutList], ['grid', Grid3X3]].map(([id, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPhotoLayout(id)}
                  className="p-1.5 rounded-lg transition-colors"
                  style={photoLayout === id
                    ? { background: t.pillActive, color: t.pillText }
                    : { color: t.inkMid }
                  }
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {photoLayout === 'masonry' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {[col1, col2, col3].map((column, colIdx) => (
                <div key={colIdx} className="flex flex-col">
                  {column.map((item, idx) => (
                    <PhotoCard key={item.id} item={item} onOpen={setActiveId}
                      isLiked={likedIds.includes(item.id)} onToggleLike={toggleLike}
                      delay={idx * 0.05} theme={t} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((item, idx) => (
                <PhotoCard key={item.id} item={item} onOpen={setActiveId}
                  isLiked={likedIds.includes(item.id)} onToggleLike={toggleLike}
                  delay={idx * 0.04} theme={t} />
              ))}
            </div>
          )}
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 text-center">
          <p className="text-sm" style={{ color: t.inkFaint }}>No items in this category yet.</p>
        </div>
      )}

      <Lightbox
        items={filteredItems} activeId={activeId}
        onClose={() => setActiveId(null)} onNavigate={handleNavigate}
        likedIds={likedIds} onToggleLike={toggleLike} theme={t}
      />
    </section>
  );
}