import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StarryBackground from './components/StarryBackground'
import AnimatedSpaceBackground from './components/AnimatedSpaceBackground'
// import StarryBackground from './components/StarryBackground'

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
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
