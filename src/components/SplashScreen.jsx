import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import zumba90 from '../../public/ZUMBA90.png';

const DISPLAY_TIME = 3400;
const EXIT_TIME = 800;

export default function SplashScreen() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  const handleSkip = useCallback(() => {
    setExiting(true);
    setTimeout(() => navigate('/home', { replace: true }), EXIT_TIME);
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(handleSkip, DISPLAY_TIME);
    return () => clearTimeout(timer);
  }, [handleSkip]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash-v4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.96, 
            filter: 'blur(20px) brightness(0.8)' 
          }}
          transition={{ duration: EXIT_TIME / 1000, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-[#07030A] select-none"
        >
          {/* ── 1. AMBIENT FLUID MESH BACKGROUND ── */}
          <div className="absolute inset-0 pointer-events-none opacity-80">
            {/* Blob 1 - Vibrant Pink */}
            <motion.div
              className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(226,63,115,0.45) 0%, transparent 65%)',
                filter: 'blur(80px)',
              }}
              animate={{
                x: [0, 80, -40, 0],
                y: [0, -60, 40, 0],
                scale: [1, 1.15, 0.9, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Blob 2 - Lime Accent */}
            <motion.div
              className="absolute -bottom-1/4 -right-1/4 w-[65vw] h-[65vw] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(200,240,60,0.3) 0%, transparent 65%)',
                filter: 'blur(90px)',
              }}
              animate={{
                x: [0, -70, 50, 0],
                y: [0, 50, -30, 0],
                scale: [0.9, 1.1, 1, 0.9],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Blob 3 - Warm Orange Center */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,151,54,0.25) 0%, transparent 70%)',
                filter: 'blur(70px)',
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />

          {/* ── 2. FROSTED GLASS HERO CARD ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center p-10 sm:p-14 rounded-[2.5rem] bg-white/3 border border-white/10 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] max-w-md w-[90%]"
          >
            {/* Shimmer Border Light */}
            <motion.div
              className="absolute -inset-px rounded-[2.5rem] opacity-60 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(226,63,115,0.6), transparent 40%, rgba(200,240,60,0.6))',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />

            {/* Logo Display */}
            <motion.div
              className="relative z-10"
              initial={{ filter: 'blur(10px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.img
                src={zumba90}
                alt="Zumba with Hanna"
                className="w-64 sm:w-80 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                draggable={false}
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Minimalist Divider */}
            <motion.div
              className="w-12 h-0.5 bg-linear-to-r from-hibiscus to-lime rounded-full my-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />

            {/* Typography */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.4em] uppercase text-white/70 text-center"
            >
              Dance <span className="text-hibiscus">•</span> Energy <span className="text-lime">•</span> Community
            </motion.p>
          </motion.div>

          {/* ── 3. BOTTOM CONTROLS & TIMELINE ── */}
          <motion.div
            className="absolute bottom-10 flex flex-col items-center gap-5 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {/* Glowing Pill Indicator */}
            <div className="w-24 h-0.75 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-hibiscus via-mango to-lime"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DISPLAY_TIME / 1000, ease: 'easeInOut' }}
              />
            </div>

            {/* Skip Action Button */}
            <button
              onClick={handleSkip}
              className="px-6 py-2 rounded-full bg-white/4 hover:bg-white/10 border border-white/10 text-[10px] font-mono tracking-[0.25em] text-white/60 hover:text-white transition-all duration-300 backdrop-blur-md cursor-pointer"
            >
              ENTER NOW
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}