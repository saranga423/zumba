import { Routes, Route } from 'react-router-dom'
import SplashScreen    from './components/SplashScreen'
import HomePage        from './components/sections/HomePage'
import InstructorPage  from './components/sections/InstructorPage'
import Gallery         from './components/sections/Gallery'
import BlogPage        from './components/sections/BlogPage'
import BlogPostPage    from './components/sections/BlogPostPage'

export default function App() {
  return (
    <Routes>
      <Route path="/"              element={<SplashScreen />} />
      <Route path="/home"          element={<HomePage />} />
      <Route path="/instructor"    element={<InstructorPage />} />
      <Route path="/gallery"       element={<Gallery />} />
      <Route path="/blog"          element={<BlogPage />} />
      <Route path="/blog/:slug"    element={<BlogPostPage />} />  
    </Routes>
  )
}