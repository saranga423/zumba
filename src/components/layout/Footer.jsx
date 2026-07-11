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
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/hanna.waththalage/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
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
              className="
                w-11 h-11 rounded-full
                border border-white/20
                flex items-center justify-center
                text-lg no-underline
                hover:bg-pink hover:border-pink
                transition-all duration-200
              "
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