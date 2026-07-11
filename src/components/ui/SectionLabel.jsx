export default function SectionLabel({ children, light = false }) {
  return (
    <p
      className={`text-xs font-bold tracking-[3px] uppercase mb-3 ${
        light ? 'text-purple' : 'text-pink'
      }`}
    >
      {children}
    </p>
  )
}