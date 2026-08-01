import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Timings (ms) ─────────────────────────────────────────────────────────────
const LOGO_RISE_MS  = 1100;
const HOLD_MS       = 1600;
const EXIT_MS       = 800;
const REDIRECT_MS   = LOGO_RISE_MS + HOLD_MS + EXIT_MS - 150;

// ─── Static particle data ─────────────────────────────────────────────────────
const PARTICLES = [
  { id:1,  x:10,  y:72, size:4,  color:'#E23F73', delay:0.2,  dur:3.0 },
  { id:2,  x:22,  y:80, size:3,  color:'#C8F03C', delay:0.7,  dur:2.6 },
  { id:3,  x:36,  y:76, size:5,  color:'#FF9736', delay:1.1,  dur:3.2 },
  { id:4,  x:50,  y:84, size:3,  color:'#E23F73', delay:0.4,  dur:2.8 },
  { id:5,  x:63,  y:74, size:4,  color:'#C8F03C', delay:0.9,  dur:3.5 },
  { id:6,  x:76,  y:79, size:6,  color:'#FF9736', delay:0.1,  dur:2.5 },
  { id:7,  x:88,  y:69, size:3,  color:'#E23F73', delay:1.4,  dur:3.1 },
  { id:8,  x:6,   y:58, size:4,  color:'#C8F03C', delay:0.6,  dur:2.9 },
  { id:9,  x:93,  y:62, size:3,  color:'#FF9736', delay:0.5,  dur:3.3 },
  { id:10, x:44,  y:89, size:4,  color:'#E23F73', delay:1.2,  dur:2.7 },
  { id:11, x:70,  y:86, size:3,  color:'#C8F03C', delay:0.3,  dur:3.4 },
  { id:12, x:18,  y:90, size:5,  color:'#FF9736', delay:1.6,  dur:2.6 },
  { id:13, x:55,  y:68, size:3,  color:'#E23F73', delay:0.8,  dur:3.0 },
  { id:14, x:82,  y:92, size:4,  color:'#C8F03C', delay:1.0,  dur:2.8 },
];

function Particle({ x, y, size, color, delay, dur }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        background: color,
        left: `${x}%`, top: `${y}%`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      initial={{ opacity: 0, scale: 0, y: 0 }}
      animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0.5], y: -70 }}
      transition={{ duration: dur, delay, repeat: Infinity, repeatDelay: 0.8, ease: 'easeOut' }}
    />
  );
}

export default function SplashScreen() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), LOGO_RISE_MS + HOLD_MS);
    const t2 = setTimeout(() => navigate('/home', { replace: true }), REDIRECT_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [navigate]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.4, 0, 1, 1] }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: 'radial-gradient(ellipse at 50% 65%, #3e1448 0%, #2B1330 50%, #180a1c 100%)' }}
        >
          {/* ── floor warm glow ── */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(226,63,115,0.13) 0%, transparent 100%)' }} />

          {/* ── spotlight cone ── */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none origin-top"
            style={{
              width: 420,
              height: '68%',
              background: 'conic-gradient(from 180deg at 50% 0%, transparent 68deg, rgba(255,210,90,0.09) 90deg, transparent 112deg)',
            }}
            initial={{ opacity: 0, scaleY: 0.6 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ── scanlines ── */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.022,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)',
            }} />

          {/* ── horizontal light streaks ── */}
          {[
            { top: '28%', delay: 0.4, colors: 'rgba(200,240,60,0.18), rgba(226,63,115,0.28), rgba(200,240,60,0.18)' },
            { top: '50%', delay: 0.65, colors: 'rgba(226,63,115,0.12), rgba(255,151,54,0.22), rgba(226,63,115,0.12)' },
            { top: '70%', delay: 0.85, colors: 'rgba(200,240,60,0.10), rgba(226,63,115,0.18), rgba(200,240,60,0.10)' },
          ].map(({ top, delay, colors }, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{ top, background: `linear-gradient(90deg, transparent 0%, ${colors} 100%)` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 0] }}
              transition={{ duration: 2.0, delay, ease: 'easeInOut' }}
            />
          ))}

          {/* ── particles ── */}
          {PARTICLES.map((p) => <Particle key={p.id} {...p} />)}

          {/* ── pink pulse rings ── */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              initial={{ width: 160, height: 160, opacity: 0.7 }}
              animate={{ width: 640 + i * 100, height: 640 + i * 100, opacity: 0 }}
              transition={{ duration: 2.8, delay: 0.5 + i * 0.6, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.2 }}
              style={{
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                border: `1px solid rgba(226,63,115,${0.28 - i * 0.07})`,
              }}
            />
          ))}

          {/* ── lime accent ring ── */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            initial={{ width: 200, height: 200, opacity: 0.5 }}
            animate={{ width: 520, height: 520, opacity: 0 }}
            transition={{ duration: 2.2, delay: 1.2, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.0 }}
            style={{
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid rgba(200,240,60,0.22)',
            }}
          />

          {/* ── logo + tagline ── */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 48, scale: 0.80 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: LOGO_RISE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* triple-layer glow halo */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 420, height: 420, background: 'radial-gradient(circle, rgba(210,170,30,0.20) 0%, transparent 68%)', filter: 'blur(32px)' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 240, height: 240, background: 'radial-gradient(circle, rgba(226,63,115,0.22) 0%, transparent 72%)', filter: 'blur(22px)' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 160, height: 160, background: 'radial-gradient(circle, rgba(200,240,60,0.14) 0%, transparent 75%)', filter: 'blur(18px)' }} />
            </div>

            {/* logo */}
            <motion.img
              src="/ZUMBA90.png"
              alt="Zumba with Hanna"
              className="relative w-52 sm:w-64 md:w-80 drop-shadow-2xl"
              draggable={false}
              animate={{
                filter: [
                  'brightness(1.0) drop-shadow(0 0 0px rgba(226,63,115,0))',
                  'brightness(1.14) drop-shadow(0 0 28px rgba(226,63,115,0.60))',
                  'brightness(1.0) drop-shadow(0 0 0px rgba(226,63,115,0))',
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />

            {/* tagline with side lines */}
            <motion.div
              className="flex items-center gap-3 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: (LOGO_RISE_MS / 1000) * 0.72, ease: 'easeOut' }}
            >
              <span className="w-8 h-px block"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(226,63,115,0.6))' }} />
              <p className="text-[10px] uppercase tracking-[7px] font-black font-mono"
                style={{ color: 'rgba(250,244,233,0.50)' }}>
                Dance · Energy · Community
              </p>
              <span className="w-8 h-px block"
                style={{ background: 'linear-gradient(90deg, rgba(200,240,60,0.6), transparent)' }} />
            </motion.div>
          </motion.div>

          {/* ── progress bar ── */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
            style={{ width: 150, height: 2, background: 'rgba(250,244,233,0.07)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #b8860b, #E23F73 50%, #C8F03C)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: (LOGO_RISE_MS + HOLD_MS) / 1000, ease: 'linear' }}
            />
            <motion.div
              className="absolute top-0 bottom-0 w-6 rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)' }}
              initial={{ left: '-20%' }}
              animate={{ left: '110%' }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
            />
          </motion.div>

          {/* ── micro brand label ── */}
          <motion.p
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono uppercase tracking-[5px] whitespace-nowrap"
            style={{ color: 'rgba(250,244,233,0.18)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Zumba with Hanna
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}