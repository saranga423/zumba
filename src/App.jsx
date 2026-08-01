import { Routes, Route } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import HomePage from './components/sections/HomePage'
import InstructorPage from './components/sections/InstructorPage'
import Gallery from './components/sections/Gallery'

export default function App() {
  return (
    <Routes>
      <Route path="/"            element={<SplashScreen />} />
      <Route path="/home"        element={<HomePage />} />
      <Route path="/instructor"  element={<InstructorPage />} />
      <Route path="/gallery"     element={<Gallery />} />
    </Routes>
  )
}