import { useState, useEffect, lazy, Suspense } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import StarryBackground from './components/StarryBackground'
import AnimatedSpaceBackground from './components/AnimatedSpaceBackground'
// import StarryBackground from './components/StarryBackground'

const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <>
      <StarryBackground />
      <AnimatedSpaceBackground />
      <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-300">
        <Header onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
        <main>
          <Hero />
          <Suspense fallback={<div className="text-center py-10">Loading About...</div>}>
            <About />
          </Suspense>
          <Suspense fallback={<div className="text-center py-10">Loading Projects...</div>}>
            <Projects />
          </Suspense>
          <Suspense fallback={<div className="text-center py-10">Loading Contact...</div>}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<div className="text-center py-4">Loading Footer...</div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}

export default App
