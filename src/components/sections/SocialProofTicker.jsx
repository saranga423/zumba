const items = [
  { icon: "🎉", text: "120+ dancers this month" },
  { icon: "⭐", text: "4.9 star average rating" },
  { icon: "🆓", text: "First class completely free" },
  { icon: "📅", text: "Classes 7 days a week" },
  { icon: "🏅", text: "ZIN™ Certified instructor" },
  { icon: "🙌", text: "No experience needed" },
];

function TickerContent() {
  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2.5 px-6 py-2 text-sm font-semibold text-white/80 whitespace-nowrap"
        >
          <span className="text-base leading-none">{item.icon}</span>
          <span>{item.text}</span>
          {/* Divider */}
          <span className="ml-4 text-pink-400/40 text-lg font-light select-none">|</span>
        </div>
      ))}
    </>
  );
}

export default function SocialProofTicker() {
  return (
    <div className="relative w-full overflow-hidden bg-dark border-y border-white/10 py-3">
      {/* animate-marquee-reverse = left to right; pauses on hover via group */}
      <div className="group flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
        <div className="flex items-center">
          <TickerContent />
        </div>
        <div className="flex items-center" aria-hidden="true">
          <TickerContent />
        </div>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-dark to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-dark to-transparent z-10" />
    </div>
  );
}