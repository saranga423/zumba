const items = [
  {text: '120+ dancers this month' },
  { text: '4.9 star average rating' },
  { text: 'First class completely free' },
  { text: 'Classes 7 days a week' },
  { text: 'ZIN™ Certified instructor' },
  { text: 'No experience needed' },
]

function TickerContent () {
  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 px-6 py-2 text-sm font-semibold text-white/80"
        >
          <span className="text-pink-400">•</span>
          {item.text}
        </div>
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