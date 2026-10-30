import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import zumba90 from '../../public/logo.png';

/* ─────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────── */
const DISPLAY_TIME = 4200;
const EXIT_TIME    = 900;
const PINK         = '#E23F73';
const PINK_SOFT    = '#FF8FAB';

/* ─────────────────────────────────────────────────────────────
   Marquee strip
───────────────────────────────────────────────────────────── */
function Marquee() {
  const chunk = (
    <span className="inline-flex items-center shrink-0">
      {['Feel The Rhythm', 'Move Your Body', 'Dance With Hanna', 'Sweat', 'Smile', 'Repeat'].map(
        (t, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-[7px] font-semibold uppercase tracking-[0.48em] text-white/22">{t}</span>
            <span className="mx-4 text-[7px]" style={{ color: PINK }}>·</span>
          </span>
        )
      )}
    </span>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.0 }}
      className="absolute top-17 left-0 right-0 z-30 overflow-hidden
                 border-t border-b border-white/[0.07] py-1.75"
    >
      <div className="flex" style={{ animation: 'zwh-marquee 22s linear infinite' }}>
        {chunk}{chunk}{chunk}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Equalizer bars
───────────────────────────────────────────────────────────── */
function EqBars({ reducedMotion }) {
  const bars = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const variation = (seed) => (Math.sin((i + 1) * seed) + 1) / 2;
        return {
          minH: 4 + variation(12.9898) * 4,
          maxH: 14 + variation(78.233) * 26,
          dur : (0.55 + variation(37.719) * 0.75).toFixed(2),
          del : (variation(19.913) * 2).toFixed(2),
        };
      }),
    []
  );

  if (reducedMotion) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.3 }}
      className="absolute bottom-14.5 left-1/2 -translate-x-1/2 z-30 flex items-end gap-0.75"
    >
      {bars.map((b, i) => (
        <div
          key={i}
          className="w-0.75 rounded-sm"
          style={{
            height: b.minH,
            background: PINK,
            opacity: 0.65,
            '--zwh-min': `${b.minH}px`,
            '--zwh-max': `${b.maxH}px`,
            animation: `zwh-eq ${b.dur}s ease-in-out infinite ${b.del}s`,
          }}
        />
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Floating particles
───────────────────────────────────────────────────────────── */
function Particles({ reducedMotion }) {
  const pts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const sample = (seed) => ((seed * 9301 + 49297) % 233280) / 233280;
        return {
          left: 20 + sample(i * 5 + 1) * 60,
          top : 20 + sample(i * 5 + 2) * 60,
          dur : (2.5 + sample(i * 5 + 3) * 3).toFixed(2),
          del : (sample(i * 5 + 4) * 5).toFixed(2),
          size: sample(i * 5 + 5) > 0.5 ? 2 : 3,
        };
      }),
    []
  );

  if (reducedMotion) return null;

  return (
    <>
      {pts.map((p, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            left  : `${p.left}%`,
            top   : `${p.top}%`,
            width : p.size,
            height: p.size,
            background: PINK,
            animation: `zwh-particle ${p.dur}s ease-in-out infinite ${p.del}s`,
          }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   CSS keyframes injected once
───────────────────────────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes zwh-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-33.333%); }
  }
  @keyframes zwh-eq {
    0%,100% { height: var(--zwh-min); opacity: .45; }
    50%     { height: var(--zwh-max); opacity: 1;   }
  }
  @keyframes zwh-particle {
    0%   { opacity: 0;   transform: translateY(0)     scale(0);   }
    15%  { opacity: .9;  transform: translateY(-18px) scale(1);   }
    80%  { opacity: .25; transform: translateY(-90px) scale(.5);  }
    100% { opacity: 0;   transform: translateY(-130px) scale(0);  }
  }
  @keyframes zwh-orb-a {
    0%,100% { transform: scale(1)    translate(0,0);        }
    50%     { transform: scale(1.12) translate(24px,-18px); }
  }
  @keyframes zwh-orb-b {
    0%,100% { transform: scale(1)    translate(0,0);        }
    50%     { transform: scale(1.08) translate(-18px,16px); }
  }
  @keyframes zwh-glow-pulse {
    0%,100% { opacity: .85; transform: translate(-50%,-50%) scale(1);    }
    50%     { opacity: .5;  transform: translate(-50%,-50%) scale(1.18); }
  }
`;

/* ─────────────────────────────────────────────────────────────
   SplashScreen
───────────────────────────────────────────────────────────── */
export default function SplashScreen() {
  const navigate       = useNavigate();
  const reducedMotion  = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);

  const exitTO = useRef(null);
  const autoTO = useRef(null);
  const didNav = useRef(false);

  const enterWebsite = useCallback(() => {
    if (didNav.current) return;
    didNav.current = true;
    setIsExiting(true);
    exitTO.current = setTimeout(() => navigate('/home', { replace: true }), EXIT_TIME);
  }, [navigate]);

  useEffect(() => {
    autoTO.current = setTimeout(enterWebsite, DISPLAY_TIME);
    return () => {
      clearTimeout(autoTO.current);
      clearTimeout(exitTO.current);
    };
  }, [enterWebsite]);

  /* Kinetic word shared style */
  const kineticStyle = {
    color            : 'rgba(226,63,115,0.07)',
    WebkitTextStroke : '1.5px rgba(255,255,255,0.11)',
  };

  return (
    <>
      <style>{KEYFRAMES}</style>

      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.main
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.03, filter: 'blur(12px)' }
            }
            transition={{
              duration: reducedMotion ? 0.2 : EXIT_TIME / 1000,
              ease    : [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-9999 overflow-hidden select-none"
            style={{ backgroundColor: '#07040C' }}
          >

            {/* ── Stage-lighting orbs ──────────────────────────── */}
            <div
              className="pointer-events-none absolute -top-48 -left-36 rounded-full"
              style={{
                width : 640, height: 640,
                background: 'radial-gradient(circle, rgba(226,63,115,0.30) 0%, transparent 65%)',
                filter    : 'blur(90px)',
                animation : reducedMotion ? undefined : 'zwh-orb-a 10s ease-in-out infinite',
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-48 -right-36 rounded-full"
              style={{
                width : 720, height: 720,
                background: 'radial-gradient(circle, rgba(90,25,150,0.22) 0%, transparent 65%)',
                filter    : 'blur(100px)',
                animation : reducedMotion ? undefined : 'zwh-orb-b 13s ease-in-out infinite',
              }}
            />

            {/* ── Dot grid ─────────────────────────────────────── */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
                backgroundSize : '32px 32px',
                opacity        : 0.55,
              }}
            />

            {/* ── Floating particles ───────────────────────────── */}
            <Particles reducedMotion={reducedMotion} />

            {/* ── Top rule — pink gradient ─────────────────────── */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reducedMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 h-0.5 origin-left z-40"
              style={{
                background:
                  `linear-gradient(90deg, transparent, ${PINK} 25%, ${PINK_SOFT} 75%, ${PINK}, transparent)`,
              }}
            />

            {/* ── Header ───────────────────────────────────────── */}
            <motion.header
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.3 }}
              className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between
                         px-8 pt-7 sm:px-12 sm:pt-9"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-1.75 w-1.75 rounded-full"
                  style={{
                    background  : PINK,
                    boxShadow   : `0 0 10px ${PINK}, 0 0 22px rgba(226,63,115,0.4)`,
                  }}
                />
                <span className="text-[9px] font-semibold uppercase tracking-[0.38em] text-white/90">
                  Zumba With Hanna
                </span>
              </div>
              <span className="text-[8px] font-mono uppercase tracking-[0.28em] text-white/22">
                Est. Energy
              </span>
            </motion.header>

            {/* ── Marquee ───────────────────────────────────────── */}
            <Marquee />

            {/* ── Side text ────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reducedMotion ? 0 : 1.0, duration: 0.7 }}
              className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 md:block"
            >
              <span className="text-[7px] font-mono uppercase tracking-[0.65em] text-white/18">
                Feel The Rhythm
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reducedMotion ? 0 : 1.1, duration: 0.7 }}
              className="absolute right-5 top-1/2 z-20 hidden translate-y-1/2 rotate-90 md:block"
            >
              <span className="text-[7px] font-mono uppercase tracking-[0.65em] text-white/18">
                Move Your Body
              </span>
            </motion.div>

            {/* ── Main content ─────────────────────────────────── */}
            <div className="absolute inset-0 z-10 flex items-center justify-center px-5">
              <div className="relative flex w-full max-w-215 flex-col items-center justify-center">

                {/* Kinetic: MOVE */}
                <motion.div
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -100, skewX: -10 }}
                  animate={{ opacity: 1, x: 0, skewX: 0 }}
                  transition={{
                    duration: reducedMotion ? 0.3 : 0.95,
                    delay   : reducedMotion ? 0 : 0.4,
                    ease    : [0.16, 1, 0.3, 1],
                  }}
                  className="absolute -top-30 left-1/2 -translate-x-1/2 whitespace-nowrap
                             sm:-top-37 md:-top-43"
                >
                  <span
                    className="text-[clamp(4rem,15vw,9.5rem)] font-black uppercase
                               leading-none tracking-[-0.06em]"
                    style={kineticStyle}
                  >
                    MOVE
                  </span>
                </motion.div>

                {/* Logo glow halo */}
                {!reducedMotion && (
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2 rounded-full z-10"
                    style={{
                      width     : 380, height: 380,
                      background: 'radial-gradient(circle, rgba(226,63,115,0.18) 0%, transparent 68%)',
                      animation : 'zwh-glow-pulse 5s ease-in-out infinite',
                    }}
                  />
                )}

                {/* Pulse rings */}
                {!reducedMotion && (
                  <>
                    <motion.div
                      className="pointer-events-none absolute left-1/2 top-1/2
                                 h-65 w-65 -translate-x-1/2 -translate-y-1/2 rounded-full z-10"
                      style={{
                        border    : `1px solid ${PINK}`,
                        boxShadow : `0 0 24px rgba(226,63,115,0.3), inset 0 0 10px rgba(226,63,115,0.08)`,
                      }}
                      animate={{ scale: [0.78, 1.65], opacity: [0.75, 0] }}
                      transition={{ duration: 2.7, repeat: Infinity, ease: 'easeOut', delay: 1.6 }}
                    />
                    <motion.div
                      className="pointer-events-none absolute left-1/2 top-1/2
                                 h-65 w-65 -translate-x-1/2 -translate-y-1/2 rounded-full z-10"
                      style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                      animate={{ scale: [0.78, 1.65], opacity: [0.45, 0] }}
                      transition={{ duration: 2.7, delay: 3.0, repeat: Infinity, ease: 'easeOut' }}
                    />
                  </>
                )}

                {/* Logo */}
                <motion.div
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.72, filter: 'blur(16px)' }
                  }
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{
                    duration: reducedMotion ? 0.3 : 1.1,
                    delay   : reducedMotion ? 0 : 0.55,
                    ease    : [0.16, 1, 0.3, 1],
                  }}
                  className="relative z-20"
                >
                  <motion.img
                    src={zumba90}
                    alt="Zumba With Hanna"
                    draggable={false}
                    className="relative w-60 object-contain sm:w-77.5 md:w-92.5"
                    style={{
                      mixBlendMode: 'screen',
                      filter      : 'brightness(1.1)',
                    }}
                    animate={reducedMotion ? undefined : { y: [-6, 6, -6] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>

                {/* Kinetic: DANCE */}
                <motion.div
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 100, skewX: 10 }}
                  animate={{ opacity: 1, x: 0, skewX: 0 }}
                  transition={{
                    duration: reducedMotion ? 0.3 : 0.95,
                    delay   : reducedMotion ? 0 : 0.65,
                    ease    : [0.16, 1, 0.3, 1],
                  }}
                  className="absolute -bottom-23.75 left-1/2 -translate-x-1/2 whitespace-nowrap
                             sm:-bottom-29.5 md:-bottom-35"
                >
                  <span
                    className="text-[clamp(4rem,15vw,9.5rem)] font-black uppercase
                               leading-none tracking-[-0.06em]"
                    style={kineticStyle}
                  >
                    DANCE
                  </span>
                </motion.div>
              </div>
            </div>

            {/* ── Tagline ───────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reducedMotion ? 0 : 1.2 }}
              className="absolute bottom-32 left-1/2 z-30 -translate-x-1/2 text-center"
            >
              <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.5em]
                            text-white/55 sm:text-[10px]">
                Sweat
                <span className="mx-2" style={{ color: PINK }}>·</span>
                Smile
                <span className="mx-2" style={{ color: PINK }}>·</span>
                Repeat
              </p>
              <p className="mt-2 text-[7px] uppercase tracking-[0.3em] text-white/22">
                Your energy starts here
              </p>
            </motion.div>

            {/* ── EQ bars ───────────────────────────────────────── */}
            <EqBars reducedMotion={reducedMotion} />

            {/* ── Progress bar ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: reducedMotion ? 0 : 1.3 }}
              className="absolute bottom-6 left-1/2 z-30 flex
                         w-[calc(100%-48px)] max-w-100
                         -translate-x-1/2 items-center gap-4"
            >
              <span className="text-[8px] font-mono tracking-[0.18em] text-white/22">01</span>
              <div className="relative h-[1.5px] flex-1 overflow-hidden bg-white/10">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: DISPLAY_TIME / 1000, ease: 'linear' }}
                  className="h-full"
                  style={{
                    background : `linear-gradient(90deg, ${PINK}, ${PINK_SOFT})`,
                    boxShadow  : `0 0 8px rgba(226,63,115,0.8)`,
                  }}
                />
              </div>
              <span className="text-[8px] font-mono tracking-[0.18em] text-white/22">100</span>
            </motion.div>

            {/* ── Enter button ──────────────────────────────────── */}
            <motion.button
              type="button"
              onClick={enterWebsite}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: reducedMotion ? 0 : 1.45 }}
              whileHover={reducedMotion ? undefined : { scale: 1.04 }}
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              className="group absolute bottom-11 right-7 z-40 cursor-pointer sm:right-12"
              aria-label="Enter Zumba With Hanna"
            >
              <span
                className="flex items-center gap-2 text-[8px] font-semibold uppercase
                           tracking-[0.32em] text-white/28
                           transition-colors duration-200 group-hover:text-hibiscus"
              >
                Enter
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </motion.button>

            {/* ── Corner rules — pink gradient ──────────────────── */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.6 }}
              className="absolute bottom-0 left-8 z-20 h-22.5 w-px origin-bottom sm:left-12"
              style={{
                background: `linear-gradient(to top, transparent, rgba(226,63,115,0.45), transparent)`,
              }}
            />
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.7 }}
              className="absolute bottom-0 right-8 z-20 h-22.5 w-px origin-bottom sm:right-12"
              style={{
                background: `linear-gradient(to top, transparent, rgba(226,63,115,0.45), transparent)`,
              }}
            />

            <span className="sr-only">Zumba With Hanna — Dance, sweat, smile and repeat.</span>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}