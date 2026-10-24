import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import zumba90 from '../../public/logo.png';

const DISPLAY_TIME = 4200;
const EXIT_TIME = 900;

export default function SplashScreen() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);

  const exitTimeout = useRef(null);
  const autoTimeout = useRef(null);
  const hasNavigated = useRef(false);

  const enterWebsite = useCallback(() => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;
    setIsExiting(true);
    exitTimeout.current = setTimeout(() => {
      navigate('/home', { replace: true });
    }, EXIT_TIME);
  }, [navigate]);

  useEffect(() => {
    autoTimeout.current = setTimeout(() => enterWebsite(), DISPLAY_TIME);
    return () => {
      if (autoTimeout.current) clearTimeout(autoTimeout.current);
      if (exitTimeout.current) clearTimeout(exitTimeout.current);
    };
  }, [enterWebsite]);

  return (
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
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-white select-none"
        >
          {/* =====================================================
              BACKGROUND — clean white with a single sharp tint
          ====================================================== */}

          {/* Subtle vignette: top-left pink, bottom-right stay white */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 0% 0%, rgba(226,63,115,0.07) 0%, transparent 70%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 50% at 100% 100%, rgba(30,30,30,0.035) 0%, transparent 70%)',
            }}
          />

          {/* Fine dot grid — very restrained */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              opacity: 0.35,
            }}
          />

          {/* =====================================================
              TOP RULE + NAV
          ====================================================== */}

          {/* Pink top rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reducedMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 h-0.75 origin-left bg-[#E23F73] z-40"
          />

          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.3 }}
            className="
              absolute left-0 right-0 top-0 z-30
              flex items-center justify-between
              px-8 pt-7 pb-0 sm:px-12 sm:pt-9
            "
          >
            <div className="flex items-center gap-3">
              <span className="h-[6px] w-[6px] rounded-full bg-[#E23F73]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.38em] text-neutral-800">
                Zumba With Hanna
              </span>
            </div>
            <span className="text-[8px] font-mono uppercase tracking-[0.28em] text-neutral-300">
              Est. Energy
            </span>
          </motion.header>

          {/* =====================================================
              SIDE TEXT
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reducedMotion ? 0 : 0.9, duration: 0.7 }}
            className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 md:block"
          >
            <span className="text-[7px] font-mono uppercase tracking-[0.65em] text-neutral-300">
              Feel The Rhythm
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reducedMotion ? 0 : 1.0, duration: 0.7 }}
            className="absolute right-5 top-1/2 z-20 hidden translate-y-1/2 rotate-90 md:block"
          >
            <span className="text-[7px] font-mono uppercase tracking-[0.65em] text-neutral-300">
              Move Your Body
            </span>
          </motion.div>

          {/* =====================================================
              MAIN CONTENT
          ====================================================== */}

          <div className="absolute inset-0 z-10 flex items-center justify-center px-5">
            <div className="relative flex w-full max-w-[860px] flex-col items-center justify-center">

              {/* KINETIC WORD — MOVE */}
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -100, skewX: -10 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                transition={{
                  duration: reducedMotion ? 0.3 : 0.95,
                  delay: reducedMotion ? 0 : 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  absolute -top-[120px] left-1/2 -translate-x-1/2 whitespace-nowrap
                  sm:-top-[148px] md:-top-[172px]
                "
              >
                <span
                  className="
                    text-[clamp(4rem,15vw,9.5rem)]
                    font-black uppercase leading-none tracking-[-0.06em]
                  "
                  style={{ color: 'rgba(15,15,15,0.06)' }}
                >
                  MOVE
                </span>
              </motion.div>

              {/* LOGO — mix-blend-mode: multiply removes the white box */}
              <motion.div
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.72, filter: 'blur(12px)' }
                }
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: reducedMotion ? 0.3 : 1.1,
                  delay: reducedMotion ? 0 : 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative z-20"
              >
                <motion.img
                  src={zumba90}
                  alt="Zumba With Hanna"
                  draggable={false}
                  className="relative w-[240px] object-contain sm:w-[310px] md:w-[370px]"
                  style={{ mixBlendMode: 'multiply' }}
                  animate={reducedMotion ? undefined : { y: [-6, 6, -6] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>

              {/* KINETIC WORD — DANCE */}
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 100, skewX: 10 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                transition={{
                  duration: reducedMotion ? 0.3 : 0.95,
                  delay: reducedMotion ? 0 : 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  absolute -bottom-[95px] left-1/2 -translate-x-1/2 whitespace-nowrap
                  sm:-bottom-[118px] md:-bottom-[140px]
                "
              >
                <span
                  className="
                    text-[clamp(4rem,15vw,9.5rem)]
                    font-black uppercase leading-none tracking-[-0.06em]
                  "
                  style={{ color: 'rgba(15,15,15,0.06)' }}
                >
                  DANCE
                </span>
              </motion.div>

              {/* PULSE RINGS */}
              {!reducedMotion && (
                <>
                  <motion.div
                    className="
                      pointer-events-none absolute left-1/2 top-1/2
                      h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2
                      rounded-full border border-[#E23F73]/20
                    "
                    animate={{ scale: [0.85, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="
                      pointer-events-none absolute left-1/2 top-1/2
                      h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2
                      rounded-full border border-neutral-300/60
                    "
                    animate={{ scale: [0.85, 1.5], opacity: [0.4, 0] }}
                    transition={{ duration: 2.6, delay: 1.3, repeat: Infinity, ease: 'easeOut' }}
                  />
                </>
              )}
            </div>
          </div>

          {/* =====================================================
              LOWER MESSAGE
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reducedMotion ? 0 : 1.15 }}
            className="absolute bottom-[100px] left-1/2 z-30 -translate-x-1/2 text-center"
          >
            <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.5em] text-neutral-400 sm:text-[10px]">
              Sweat
              <span className="mx-2 text-[#E23F73]">·</span>
              Smile
              <span className="mx-2 text-[#E23F73]">·</span>
              Repeat
            </p>
            <p className="mt-2 text-[7px] uppercase tracking-[0.3em] text-neutral-300">
              Your energy starts here
            </p>
          </motion.div>

          {/* =====================================================
              BOTTOM PROGRESS
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: reducedMotion ? 0 : 1.25 }}
            className="
              absolute bottom-6 left-1/2 z-30
              flex w-[calc(100%-48px)] max-w-[400px]
              -translate-x-1/2 items-center gap-4
            "
          >
            <span className="text-[8px] font-mono tracking-[0.18em] text-neutral-300">01</span>

            <div className="relative h-[1.5px] flex-1 overflow-hidden bg-neutral-200">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DISPLAY_TIME / 1000, ease: 'linear' }}
                className="h-full bg-[#E23F73]"
              />
            </div>

            <span className="text-[8px] font-mono tracking-[0.18em] text-neutral-300">100</span>
          </motion.div>

          {/* =====================================================
              ENTER BUTTON
          ====================================================== */}

          <motion.button
            type="button"
            onClick={enterWebsite}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: reducedMotion ? 0 : 1.4 }}
            whileHover={reducedMotion ? undefined : { scale: 1.04 }}
            whileTap={reducedMotion ? undefined : { scale: 0.96 }}
            className="group absolute bottom-[48px] right-7 z-40 cursor-pointer sm:right-12"
            aria-label="Enter Zumba With Hanna"
          >
            <span
              className="
                flex items-center gap-2
                text-[8px] font-semibold uppercase tracking-[0.32em]
                text-neutral-400
                transition-colors duration-200
                group-hover:text-[#E23F73]
              "
            >
              Enter
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </motion.button>

          {/* =====================================================
              BOTTOM-LEFT THIN RULE DETAIL
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.6 }}
            className="absolute bottom-0 left-8 z-20 h-[90px] w-px origin-bottom bg-gradient-to-t from-transparent via-neutral-300 to-transparent sm:left-12"
          />
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.7 }}
            className="absolute bottom-0 right-8 z-20 h-[90px] w-px origin-bottom bg-gradient-to-t from-transparent via-neutral-300 to-transparent sm:right-12"
          />

          {/* Accessibility */}
          <span className="sr-only">
            Zumba With Hanna — Dance, sweat, smile and repeat.
          </span>
        </motion.main>
      )}
    </AnimatePresence>
  );
}