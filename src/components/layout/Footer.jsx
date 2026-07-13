const footerLinks = [
  { label: 'Schedule', href: '#schedule' },
  { label: 'About',    href: '#about' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Contact',  href: '#location' },
  { label: 'FAQ',      href: '#faq' },
  { label: 'Privacy Policy', href: '/privacy' },
]

const socials = [
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@hanna.waththalage?is_from_webapp=1&sender_device=pc',
    // TikTok's mark is black/white with cyan + red-pink accents — a flat
    // black hover reads as "on brand" without needing a multi-color icon.
    hoverClasses: 'hover:bg-black hover:border-black',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/hanna.waththalage/',
    // Facebook's official blue
    hoverClasses: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hannawaththalage/',
    // Instagram's actual icon gradient (yellow → red-orange → magenta → blue)
    hoverClasses:
      'hover:[background:radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] hover:border-transparent',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.069 1.645.069 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.645.069-4.849.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608C4.518 2.497 5.785 2.225 7.151 2.163 8.417 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.132 4.602.443 3.678 1.367c-.924.924-1.235 2.097-1.295 3.375C3.013 8.332 3 8.741 3 12s.013 3.668.072 4.948c.06 1.278.371 2.451 1.295 3.375s2.097 1.235 3.375 1.295C8.332 20.987 8.741 21 12 21s3.668-.013 4.948-.072c1.278-.06 2.451-.371 3.375-1.295s1.235-2.097 1.295-3.375C20.987 15.668 21 15.259 21 12s-.013-3.668-.072-4.948c-.06-1.278-.371-2.451-1.295-3.375s-2.097-1.235-3.375-1.295C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a3.999 3.999 0 1 1 0-7.998A3.999 3.999 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0-2.881-.001A1.44 1.44 0 0 0 18.406 4z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-10 px-[8%]">
      <div className="max-w-5xl mx-auto text-center">
        {/* Logo */}
        <p className="font-bebas text-5xl tracking-widest text-yellow mb-1">
          ZUMBA <span className="text-pink">with HANNA</span>
        </p>
        <p className="font-dancing text-2xl text-white/50 mb-10">
          Dance. Sweat. Repeat.
        </p>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 list-none mb-10">
            {footerLinks.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-white/50 hover:text-yellow text-sm no-underline transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div className="flex justify-center gap-3 mb-10">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className={`
                w-11 h-11 rounded-full
                border border-white/20
                flex items-center justify-center
                text-lg no-underline
                transition-all duration-200
                ${s.hoverClasses}
              `}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-white/30 text-xs leading-relaxed">
            © {new Date().getFullYear()} ZumbaFit Studio. All rights reserved.
            <br />
            ZUMBA® is a registered trademark of Zumba Fitness, LLC. ZumbaFit Studio is an
            independently owned and operated studio.
          </p>
        </div>
      </div>
    </footer>
  )
}