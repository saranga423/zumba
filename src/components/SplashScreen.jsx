import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import zumba90 from '../../public/ZUMBA90.png';

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
    autoTimeout.current = setTimeout(() => {
      enterWebsite();
    }, DISPLAY_TIME);

    return () => {
      if (autoTimeout.current) {
        clearTimeout(autoTimeout.current);
      }

      if (exitTimeout.current) {
        clearTimeout(exitTimeout.current);
      }
    };
  }, [enterWebsite]);

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.main
          key="cinematic-splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={
            reducedMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 1.04,
                  filter: 'blur(14px)',
                }
          }
          transition={{
            duration: reducedMotion ? 0.2 : EXIT_TIME / 1000,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="
            fixed
            inset-0
            z-[9999]
            overflow-hidden
            bg-[#050505]
            text-white
            select-none
          "
        >
          {/* =====================================================
              BACKGROUND
          ====================================================== */}

          <div className="absolute inset-0 bg-[#050505]" />

          {/* Large pink glow */}
          <motion.div
            className="
              pointer-events-none
              absolute
              -left-[25vw]
              top-[5vh]
              h-[70vw]
              w-[70vw]
              max-h-[900px]
              max-w-[900px]
              rounded-full
            "
            style={{
              background:
                'radial-gradient(circle, rgba(226,63,115,0.35) 0%, rgba(226,63,115,0.08) 35%, transparent 70%)',
              filter: 'blur(70px)',
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    x: [0, 100, -30, 0],
                    y: [0, -60, 30, 0],
                    scale: [1, 1.15, 0.95, 1],
                  }
            }
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Lime glow */}
          <motion.div
            className="
              pointer-events-none
              absolute
              -right-[25vw]
              bottom-[0]
              h-[65vw]
              w-[65vw]
              max-h-[850px]
              max-w-[850px]
              rounded-full
            "
            style={{
              background:
                'radial-gradient(circle, rgba(200,240,60,0.28) 0%, rgba(200,240,60,0.06) 35%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    x: [0, -80, 40, 0],
                    y: [0, 40, -30, 0],
                    scale: [0.9, 1.1, 0.95, 0.9],
                  }
            }
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Orange center flash */}
          <motion.div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[35vw]
              w-[35vw]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
            "
            style={{
              background:
                'radial-gradient(circle, rgba(255,151,54,0.15), transparent 70%)',
              filter: 'blur(70px)',
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    scale: [0.7, 1.3, 0.7],
                    opacity: [0.2, 0.6, 0.2],
                  }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* =====================================================
              GRID
          ====================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.045]
              bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
              bg-[size:55px_55px]
            "
          />

          {/* Noise */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.035]
              bg-[radial-gradient(#fff_1px,transparent_1px)]
              bg-[size:13px_13px]
            "
          />

          {/* =====================================================
              TOP NAV
          ====================================================== */}

          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 0.2,
            }}
            className="
              absolute
              left-0
              right-0
              top-0
              z-30
              flex
              items-center
              justify-between
              px-6
              py-6
              sm:px-10
              sm:py-8
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#E23F73]
                  shadow-[0_0_15px_rgba(226,63,115,0.8)]
                "
              />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.35em]
                  text-white/60
                "
              >
                Zumba With Hanna
              </span>
            </div>

            <span
              className="
                text-[8px]
                font-mono
                uppercase
                tracking-[0.3em]
                text-white/25
              "
            >
              Est. Energy
            </span>
          </motion.header>

          {/* =====================================================
              DECORATIVE SIDE TEXT
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: reducedMotion ? 0 : 0.8,
              duration: 0.8,
            }}
            className="
              absolute
              left-5
              top-1/2
              z-20
              hidden
              -translate-y-1/2
              -rotate-90
              md:block
            "
          >
            <span
              className="
                text-[8px]
                font-mono
                uppercase
                tracking-[0.6em]
                text-white/20
              "
            >
              Feel The Rhythm
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: reducedMotion ? 0 : 0.9,
              duration: 0.8,
            }}
            className="
              absolute
              right-5
              top-1/2
              z-20
              hidden
              translate-y-1/2
              rotate-90
              md:block
            "
          >
            <span
              className="
                text-[8px]
                font-mono
                uppercase
                tracking-[0.6em]
                text-white/20
              "
            >
              Move Your Body
            </span>
          </motion.div>

          {/* =====================================================
              MAIN CONTENT
          ====================================================== */}

          <div
            className="
              absolute
              inset-0
              z-10
              flex
              items-center
              justify-center
              px-5
            "
          >
            <div
              className="
                relative
                flex
                w-full
                max-w-[900px]
                flex-col
                items-center
                justify-center
              "
            >
              {/* =================================================
                  KINETIC WORD 01
              ================================================== */}

              <motion.div
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: -120,
                        skewX: -12,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  skewX: 0,
                }}
                transition={{
                  duration: reducedMotion ? 0.3 : 1,
                  delay: reducedMotion ? 0 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  absolute
                  -top-[125px]
                  left-1/2
                  -translate-x-1/2
                  whitespace-nowrap
                  sm:-top-[150px]
                  md:-top-[175px]
                "
              >
                <span
                  className="
                    text-[clamp(4rem,16vw,10rem)]
                    font-black
                    uppercase
                    leading-none
                    tracking-[-0.08em]
                    text-white/[0.035]
                  "
                >
                  MOVE
                </span>
              </motion.div>

              {/* =================================================
                  LOGO
              ================================================== */}

              <motion.div
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        scale: 0.65,
                        rotate: -4,
                        filter: 'blur(16px)',
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: reducedMotion ? 0.3 : 1.25,
                  delay: reducedMotion ? 0 : 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative z-20"
              >
                {/* Glow behind logo */}
                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    -z-10
                    h-[70%]
                    w-[70%]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                  "
                  style={{
                    background:
                      'radial-gradient(circle, rgba(226,63,115,0.28), transparent 68%)',
                    filter: 'blur(35px)',
                  }}
                />

                <motion.img
                  src={zumba90}
                  alt="Zumba With Hanna"
                  draggable={false}
                  className="
                    relative
                    w-[250px]
                    object-contain
                    drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]
                    sm:w-[330px]
                    md:w-[390px]
                  "
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          y: [-7, 7, -7],
                        }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              {/* =================================================
                  KINETIC WORD 02
              ================================================== */}

              <motion.div
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: 120,
                        skewX: 12,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  skewX: 0,
                }}
                transition={{
                  duration: reducedMotion ? 0.3 : 1,
                  delay: reducedMotion ? 0 : 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  absolute
                  -bottom-[100px]
                  left-1/2
                  -translate-x-1/2
                  whitespace-nowrap
                  sm:-bottom-[125px]
                  md:-bottom-[145px]
                "
              >
                <span
                  className="
                    text-[clamp(4rem,16vw,10rem)]
                    font-black
                    uppercase
                    leading-none
                    tracking-[-0.08em]
                    text-white/[0.035]
                  "
                >
                  DANCE
                </span>
              </motion.div>

              {/* =================================================
                  PULSE RINGS
              ================================================== */}

              {!reducedMotion && (
                <>
                  <motion.div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      h-[260px]
                      w-[260px]
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      border
                      border-[#E23F73]/20
                    "
                    animate={{
                      scale: [0.8, 1.45],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />

                  <motion.div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      h-[260px]
                      w-[260px]
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      border
                      border-[#C8F03C]/15
                    "
                    animate={{
                      scale: [0.8, 1.45],
                      opacity: [0.45, 0],
                    }}
                    transition={{
                      duration: 2.4,
                      delay: 1.2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* =====================================================
              LOWER MESSAGE
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 1.2,
            }}
            className="
              absolute
              bottom-[105px]
              left-1/2
              z-30
              -translate-x-1/2
              text-center
            "
          >
            <p
              className="
                whitespace-nowrap
                text-[9px]
                font-bold
                uppercase
                tracking-[0.45em]
                text-white/55
                sm:text-[10px]
              "
            >
              Sweat
              <span className="mx-2 text-[#E23F73]">•</span>
              Smile
              <span className="mx-2 text-[#FF9736]">•</span>
              Repeat
            </p>

            <p
              className="
                mt-2
                text-[7px]
                uppercase
                tracking-[0.3em]
                text-white/20
              "
            >
              Your energy starts here
            </p>
          </motion.div>

          {/* =====================================================
              BOTTOM PROGRESS
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 1.3,
            }}
            className="
              absolute
              bottom-7
              left-1/2
              z-30
              flex
              w-[calc(100%-40px)]
              max-w-[420px]
              -translate-x-1/2
              items-center
              gap-4
            "
          >
            <span
              className="
                text-[8px]
                font-mono
                tracking-[0.2em]
                text-white/25
              "
            >
              01
            </span>

            <div
              className="
                relative
                h-[2px]
                flex-1
                overflow-hidden
                bg-white/[0.10]
              "
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: DISPLAY_TIME / 1000,
                  ease: 'linear',
                }}
                className="
                  h-full
                  bg-gradient-to-r
                  from-[#E23F73]
                  via-[#FF9736]
                  to-[#C8F03C]
                "
              />
            </div>

            <span
              className="
                text-[8px]
                font-mono
                tracking-[0.2em]
                text-white/25
              "
            >
              100
            </span>
          </motion.div>

          {/* =====================================================
              ENTER BUTTON
          ====================================================== */}

          <motion.button
            type="button"
            onClick={enterWebsite}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 1.45,
            }}
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.05,
                  }
            }
            whileTap={
              reducedMotion
                ? undefined
                : {
                    scale: 0.95,
                  }
            }
            className="
              group
              absolute
              bottom-[52px]
              right-6
              z-40
              cursor-pointer
              sm:right-10
            "
            aria-label="Enter Zumba With Hanna"
          >
            <span
              className="
                flex
                items-center
                gap-2
                text-[8px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-white/45
                transition-colors
                duration-300
                group-hover:text-white
              "
            >
              Enter
              <span
                className="
                  text-[#C8F03C]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </span>
          </motion.button>

          {/* =====================================================
              CENTER DECORATIVE CROSS
          ====================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              z-0
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <span
              className="
                absolute
                left-1/2
                top-1/2
                h-px
                w-[300px]
                -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                via-white/[0.04]
                to-transparent
                sm:w-[500px]
              "
            />

            <span
              className="
                absolute
                left-1/2
                top-1/2
                h-[300px]
                w-px
                -translate-y-1/2
                bg-gradient-to-b
                from-transparent
                via-white/[0.04]
                to-transparent
                sm:h-[500px]
              "
            />
          </div>

          {/* Accessibility */}
          <span className="sr-only">
            Zumba With Hanna — Dance, sweat, smile and repeat.
          </span>
        </motion.main>
      )}
    </AnimatePresence>
  );
}