import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import pricingData from '../../data/pricing.json'
import SectionLabel from '../ui/SectionLabel'

function PriceCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`
        relative rounded-[20px] p-9 flex flex-col
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-2xl
        ${plan.featured
          ? 'border-2 border-pink bg-linear-to-br from-white to-pink/5 shadow-[0_10px_50px_rgba(255,45,120,0.15)]'
          : 'border border-gray-200 bg-white'}
      `}
    >
      {/* Badge */}
      {plan.badge && (
        <span
          className="
            absolute -top-4 left-1/2 -translate-x-1/2
            bg-pink text-white text-xs font-bold tracking-wide
            px-5 py-1.5 rounded-full whitespace-nowrap
          "
        >
          {plan.badge}
        </span>
      )}

      <h3 className="font-bebas text-3xl text-navy mb-1">{plan.name}</h3>
      <div className="flex items-baseline gap-1 mb-0.5">
        <span className="font-bebas text-6xl text-pink leading-none">${plan.price}</span>
      </div>
      <p className="text-sm text-gray-400 mb-1">{plan.period}</p>
      <p className="text-xs text-pink font-semibold mb-6">{plan.subtext}</p>

      <ul className="list-none flex-1 mb-8 space-y-3">
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
            <span className="text-pink font-bold text-base leading-tight mt-0.5">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#location"
        className={`
          block w-full text-center py-4 rounded-xl font-bold text-[15px]
          transition-all duration-200 hover:-translate-y-0.5 no-underline
          ${plan.ctaVariant === 'primary'
            ? 'text-white [background:linear-gradient(135deg,#FF2D78,#FF6B35)] hover:shadow-[0_6px_24px_rgba(255,45,120,0.4)]'
            : 'text-navy border-2 border-gray-200 bg-transparent hover:border-pink hover:text-pink'}
        `}
      >
        {plan.cta}
      </a>
    </motion.div>
  )
}

export default function Pricing() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="pricing" className="section-pad bg-cream" ref={ref}>
      <div className="text-center mb-14">
        <SectionLabel>Pricing & Packages</SectionLabel>
        <h2 className="font-bebas text-[clamp(42px,6vw,72px)] leading-[0.95] text-navy">
          SIMPLE,{' '}
          <span className="text-pink">FLEXIBLE</span> PRICING
        </h2>
        <p className="text-gray-500 text-lg max-w-lg mx-auto mt-4 leading-relaxed">
          No lock-ins. No pressure. Just great classes at prices that make sense.
        </p>
      </div>

      <motion.div
        ref={ref}
        className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        {inView &&
          pricingData.map((plan, i) => (
            <PriceCard key={plan.id} plan={plan} index={i} />
          ))}
      </motion.div>

      <p className="text-center text-gray-400 text-sm mt-10">
        🎉 First class is always free — no card required.{' '}
        <a href="#faq" className="text-pink underline">Read our FAQ</a>
      </p>
    </section>
  )
}