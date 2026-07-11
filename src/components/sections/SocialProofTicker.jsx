const items = [
  { icon: '🔥', text: '120+ dancers this month' },
  { icon: '⭐', text: '4.9 star average rating' },
  { icon: '🎉', text: 'First class completely free' },
  { icon: '🎵', text: 'Classes 7 days a week' },
  { icon: '🏆', text: 'ZIN™ Certified instructor' },
  { icon: '✅', text: 'No experience needed' },
]

function TickerContent() {
  return (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-2 mx-6 text-white/80 text-sm font-medium tracking-wide whitespace-nowrap"
        >
          <span className="text-base">{item.icon}</span>
          {item.text}
          <span className="text-pink mx-4">•</span>
        </span>
      ))}
    </>
  )
}

export default function SocialProofTicker() {
  return (
    <div className="relative w-full overflow-hidden bg-dark border-y border-white/10 py-3">
      <div className="flex w-max animate-marquee">
        <div className="flex items-center">
          <TickerContent />
        </div>
        <div className="flex items-center" aria-hidden="true">
          <TickerContent />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-dark to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-dark to-transparent z-10" />
    </div>
  )
}