import Navbar          from './components/layout/Navbar'
import Footer          from './components/layout/Footer'
import Hero            from './components/sections/Hero'
import SocialProofTicker from './components/sections/SocialProofTicker'
import About           from './components/sections/About'
import Schedule        from './components/sections/Schedule'
// import Pricing         from './components/sections/Pricing'
import Gallery         from './components/sections/Gallery'
import Testimonials    from './components/sections/Testimonials'
import Location        from './components/sections/Location'
import FAQ             from './components/sections/FAQ'
import FloatingCTA     from './components/ui/FloatingCTA'

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <SocialProofTicker />

        {/* About */}
       
        <About />

        {/* Schedule */}
        <Schedule />

        {/* Pricing */}
        {/* <Pricing /> */}

        {/* Gallery */}
        <Gallery />

        {/* Testimonials */}
        <Testimonials />

        {/* Location */}
        <Location />

        {/* FAQ */}
        <FAQ />
      </main>

      <Footer />
      <FloatingCTA />
    </>
  )
}