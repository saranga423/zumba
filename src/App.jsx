import { Routes, Route } from 'react-router-dom'
import HomePage from './components/sections/HomePage'
import InstructorPage from './components/sections/InstructorPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/instructor" element={<InstructorPage />} />
    </Routes>
  )
}