import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

// ─── Brand tokens ─────────────────────────────────────────────
const COLORS = {
  cream: "#FFFDFC",
  hibiscus: "#F05A78",
  mango: "#FF9B54",
  plum: "#25232A",
  lime: "#C9E86A",
};

// Starting count — replace with your real baseline or server value
const BASE_COUNT = 428;

export default function HighFiveButton() {
  const [count, setCount] = useState(BASE_COUNT);
  const [boosted, setBoosted] = useState(false);
  const [pulse, setPulse] = useState(false);

  const timerRef = useRef(null);

  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleHighFive = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x =
      (rect.left + rect.width / 2) /
      window.innerWidth;

    const y =
      (rect.top + rect.height / 2) /
      window.innerHeight;

    // ─── Confetti ─────────────────────────────────────────────
    confetti({
      particleCount: 60,
      spread: 70,
      startVelocity: 28,
      origin: { x, y },
      colors: [
        COLORS.lime,
        COLORS.hibiscus,
        COLORS.mango,
        COLORS.cream,
      ],
      ticks: 200,
    });

    // ─── Update state ─────────────────────────────────────────
    setCount((prev) => prev + 1);
    setBoosted(true);
    setPulse(true);

    // Reset previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setBoosted(false);
      setPulse(false);
    }, 2000);
  };

  return (
    <div className="inline-flex flex-col items-center gap-1">
      <div className="relative">

        {/* ─────────────────────────────────────────────
            Floating +1 notification
        ───────────────────────────────────────────── */}
        {boosted && (
          <span
            className="
              pointer-events-none
              absolute
              -top-8
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
              rounded-full
              px-2.5
              py-1
              text-[9px]
              font-mono
              font-black
              uppercase
              tracking-widest
              text-white
              shadow-lg
            "
            style={{
              background: COLORS.hibiscus,
              animation:
                "hf-float 0.9s ease-out forwards",
            }}
          >
            Energy boosted! +1
          </span>
        )}

        {/* ─────────────────────────────────────────────
            High Five Button
        ───────────────────────────────────────────── */}
        <button
          type="button"
          onClick={handleHighFive}
          aria-label={`High-five Hanna. ${count} high-fives so far.`}
          aria-live="polite"
          className="
            group
            relative
            inline-flex
            items-center
            gap-2.5
            rounded-full
            border
            px-4
            py-2
            font-mono
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:bg-white/10
            active:scale-95
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-offset-2
          "
          style={{
            background: "rgba(255,255,255,0.06)",

            borderColor: boosted
              ? COLORS.lime
              : "rgba(255,255,255,0.15)",

            boxShadow: boosted
              ? `0 0 0 3px ${COLORS.lime}22,
                 0 8px 24px ${COLORS.lime}18`
              : "none",

            "--tw-ring-color": COLORS.lime,
            "--tw-ring-offset-color": COLORS.plum,
          }}
        >
          {/* ─────────────────────────────────────────
              Hand Icon
          ───────────────────────────────────────── */}
          <span
            className="select-none text-base"
            style={{
              display: "inline-block",
              transition:
                "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",

              transform: pulse
                ? "scale(1.4) rotate(-10deg)"
                : "scale(1) rotate(0deg)",
            }}
            aria-hidden="true"
          >
            ✋
          </span>

          {/* Text */}
          <span>
            High-five Hanna
          </span>

          {/* ─────────────────────────────────────────
              Counter
          ───────────────────────────────────────── */}
          <span
            className="
              rounded-full
              px-2
              py-0.5
              text-[10px]
              font-mono
              font-black
            "
            style={{
              background: boosted
                ? `${COLORS.lime}28`
                : `${COLORS.hibiscus}35`,

              color: boosted
                ? COLORS.lime
                : COLORS.cream,

              transform: pulse
                ? "scale(1.15)"
                : "scale(1)",

              display: "inline-block",

              transition:
                "background 0.3s, color 0.3s, transform 0.2s",
            }}
          >
            {count.toLocaleString()}
          </span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────
          Animation
      ───────────────────────────────────────────── */}
      <style>{`
        @keyframes hf-float {
          0% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }

          50% {
            transform: translate(-50%, -8px) scale(1.05);
          }

          80% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -20px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}