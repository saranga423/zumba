import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'

// TODO(legal-review): this is a plain-language starting point, not legal
// advice — have someone who knows Sri Lankan data-protection requirements
// (Personal Data Protection Act No. 9 of 2022) review this before it goes
// live, especially the sections on data retention and third-party sharing.
//
// TODO(routing): drop this file wherever your project keeps route-level
// pages (e.g. src/pages/Privacy.jsx) and wire it up in your router, e.g.:
//   <Route path="/privacy" element={<Privacy />} />

const LAST_UPDATED = 'July 13, 2026'

const sections = [
  {
    title: 'Overview',
    body: `Pulse Zumba ("we", "our", "the studio") is run by Hanna Waththalage
in Kandy, Sri Lanka. This page explains what information we collect when
you visit our website or contact us about classes, and how we use it.`,
  },
  {
    title: 'Information We Collect',
    body: `We collect information you give us directly — for example, if you
message us on WhatsApp, email us, or fill out a booking or trial-class
request. This may include your name, phone number, and email address.

We don't run visitor analytics or ad tracking on this site beyond what's
listed under "Cookies & Local Storage" below.`,
  },
  {
    title: 'Cookies & Local Storage',
    body: `This site stores a small amount of data directly in your browser
(not on our servers) to remember things like which gallery photos or
reels you've liked. This stays on your device and isn't shared with us
or anyone else — clearing your browser data removes it.

TODO: update this section if you add analytics (e.g. Google Analytics),
an ad pixel, or any other tracking script — those typically use cookies
and need their own disclosure here.`,
  },
  {
    title: 'Third-Party Services',
    body: `Some parts of the site load content from other services:

— Google Maps, to show our studio locations and directions.
— WhatsApp, if you choose to message us that way.

These services may collect information according to their own privacy
policies when you interact with them — we don't control that.`,
  },
  {
    title: 'How We Use Your Information',
    body: `We use the contact details you share with us to respond to
booking requests, answer questions about classes, and communicate about
schedule changes. We don't sell your information to third parties.`,
  },
  {
    title: 'Data Retention',
    body: `We keep contact information for as long as needed to respond to
your inquiry or manage your class bookings, and delete it when it's no
longer needed for that purpose.

TODO: fill in an actual retention period once you've decided one — "as
long as needed" is a placeholder, not a real policy.`,
  },
  {
    title: "Children's Privacy",
    body: `Some of our classes (like Family Zumba) welcome children
alongside a parent or guardian. We don't knowingly collect personal
information directly from children — booking and contact details are
provided by a parent or guardian.`,
  },
  {
    title: 'Your Rights',
    body: `You can ask us what contact information we hold about you, and
ask us to correct or delete it, at any time using the contact details
below.`,
  },
  {
    title: 'Changes to This Policy',
    body: `If we update this policy, we'll change the "last updated" date
at the top of this page.`,
  },
]

export default function Privacy() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAF4E9] min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#E23F73] mb-3">
            Legal
          </p>
          <h1 className="font-[Bricolage_Grotesque] font-extrabold text-4xl md:text-5xl text-[#2B1330] mb-2">
            Privacy Policy
          </h1>
          <p className="font-mono text-sm text-[#2B1330]/45 mb-12">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-[Bricolage_Grotesque] font-bold text-xl text-[#2B1330] mb-3">
                  {section.title}
                </h2>
                <p className="text-[#2B1330]/75 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </section>
            ))}

            <section>
              <h2 className="font-[Bricolage_Grotesque] font-bold text-xl text-[#2B1330] mb-3">
                Contact Us
              </h2>
              <p className="text-[#2B1330]/75 leading-relaxed">
                Questions about this policy or your information? Reach us at{' '}
                <a
                  href="mailto:hello@zumbafit.studio"
                  className="text-[#E23F73] font-medium underline decoration-[#E23F73]/40 hover:decoration-[#E23F73] transition-colors"
                >
                  hello@zumbafit.studio
                </a>{' '}
                or{' '}
                <a
                  href="tel:+94703444430"
                  className="text-[#E23F73] font-medium underline decoration-[#E23F73]/40 hover:decoration-[#E23F73] transition-colors"
                >
                  +94 70 344 4430
                </a>
                .
              </p>
            </section>
          </div>

          <a
            href="/"
            className="
              inline-flex items-center gap-1.5 mt-16
              text-sm font-bold uppercase tracking-wide text-[#2B1330]/60
              hover:text-[#E23F73] transition-colors
              focus-visible:outline-2 focus-visible:outline-[#C8F03C] focus-visible:outline-offset-2 rounded
            "
          >
            ← Back to home
          </a>
        </div>
      </main>

      <Footer />
    </>
  )
}