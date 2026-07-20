import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import Hero from './Hero'
import SocialProofTicker from './SocialProofTicker'
import About from './About'
import Schedule from './Schedule'
// import Pricing from './Pricing'
// import Gallery from './Gallery'
import Testimonials from './Testimonials'
import Location from './Location'
import FAQ from './FAQ'
import FollowUs from './FollowUs'
import FloatingCTA from '../ui/FloatingCTA'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProofTicker />
        <About />
        <Schedule />
        {/* <Pricing /> */}
        {/* <Gallery /> */}
        <Testimonials />
        <Location />
        <FAQ />
        <FollowUs />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}