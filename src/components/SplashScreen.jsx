import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Timings (ms) ─────────────────────────────────────────────────────────────
const LOGO_FADE_IN_DURATION  = 1000;  // logo fades + scales in
const HOLD_DURATION          = 1400;  // logo stays visible
const EXIT_DURATION          = 700;   // everything fades out
const REDIRECT_DELAY         = LOGO_FADE_IN_DURATION + HOLD_DURATION + EXIT_DURATION - 100;

export default function SplashScreen() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // start exit animation slightly before redirect
    const exitTimer = setTimeout(() => setExiting(true), LOGO_FADE_IN_DURATION + HOLD_DURATION);
    const navTimer  = setTimeout(() => navigate('/home', { replace: true }), REDIRECT_DELAY);
    return () => { clearTimeout(exitTimer); clearTimeout(navTimer); };
  }, [navigate]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION / 1000, ease: 'easeInOut' }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-plum overflow-hidden"
        >
          {/* ── ambient glow rings ── */}
          <div className="absolute inset-0 pointer-events-none">
            {/* warm gold centre bloom */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 520,
                height: 520,
                background: 'radial-gradient(circle, rgba(180,130,30,0.18) 0%, transparent 70%)',
              }}
            />
            {/* pink accent glow top-left */}
            <div
              className="absolute -top-20 -left-20 rounded-full"
              style={{
                width: 360,
                height: 360,
                background: 'radial-gradient(circle, rgba(226,63,115,0.12) 0%, transparent 70%)',
              }}
            />
            {/* lime accent glow bottom-right */}
            <div
              className="absolute -bottom-20 -right-20 rounded-full"
              style={{
                width: 360,
                height: 360,
                background: 'radial-gradient(circle, rgba(200,240,60,0.10) 0%, transparent 70%)',
              }}
            />
          </div>

          {/* ── ripple rings — animate outward behind logo ── */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-amber-400/20 pointer-events-none"
              initial={{ width: 160, height: 160, opacity: 0.6 }}
              animate={{ width: 480 + i * 80, height: 480 + i * 80, opacity: 0 }}
              transition={{
                duration: 2.2,
                delay: 0.3 + i * 0.45,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          ))}

          {/* ── logo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: LOGO_FADE_IN_DURATION / 1000,
              ease: [0.22, 1, 0.36, 1],   // snappy spring-like cubic
            }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* glow halo behind logo image */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
              style={{
                width: 300,
                height: 300,
                background: 'radial-gradient(circle, rgba(200,160,30,0.22) 0%, transparent 68%)',
                filter: 'blur(24px)',
              }}
            />

            <motion.img
              src="/src/assets/ZUMBA90.png"
              alt="Zumba with Hanna"
              className="relative z-10 w-56 sm:w-72 md:w-80 drop-shadow-2xl select-none"
              draggable={false}
              // subtle continuous shimmer pulse
              animate={{ filter: ['brightness(1)', 'brightness(1.12)', 'brightness(1)'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />
          </motion.div>

          {/* ── progress bar ── */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-amber-400/30 overflow-hidden"
            style={{ width: 120 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #b8860b, #E23F73, #C8F03C)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: (LOGO_FADE_IN_DURATION + HOLD_DURATION) / 1000,
                ease: 'linear',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}