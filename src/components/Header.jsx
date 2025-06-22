import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import ThemeWaveOverlay from './ThemeWaveOverlay';
import ShinyText from './ShinyText';

const Header = ({ onThemeToggle, isDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [wave, setWave] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setWave({
      x: centerX,
      y: centerY,
      theme: isDarkMode ? 'light' : 'dark',
    });
  };

  const handleWaveComplete = () => {
    onThemeToggle();
    setWave(null);
  };

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const renderNavButton = (item) => (
    <motion.button
      key={item.id}
      onClick={() => handleNavClick(item.id)}
      className={`nav-button relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary ${
        activeSection === item.id ? 'text-primary' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {item.name}(
      {activeSection === item.id && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block w-1 h-1 rounded-full bg-primary"
        />
      )}
      );
    </motion.button>
  );

  return (
    <>
      {wave && (
        <ThemeWaveOverlay
          x={wave.x}
          y={wave.y}
          theme={wave.theme}
          onComplete={handleWaveComplete}
        />
      )}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-3 ${isScrolled ? 'hidden' : 'block'}`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center">
              <motion.div
                className="relative w-full h-full"
                style={{ perspective: 600 }}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.15, ease: 'linear' }}
              >
                <img
                  src="/Souvik.webp"
                  alt="Souvik Dhara"
                  className="w-full h-full object-cover rounded-full absolute top-0 left-0"
                  style={{ backfaceVisibility: 'hidden' }}
                />
                <img
                  src="/Souvik.webp"
                  alt="Souvik Dhara Mirrored"
                  className="w-full h-full object-cover rounded-full absolute top-0 left-0"
                  style={{ transform: 'scaleX(-1) rotateY(180deg)', backfaceVisibility: 'hidden' }}
                />
              </motion.div>
            </div>
            <motion.h1 
              className="text-xl font-bold relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ShinyText text="Souvik Dhara" className="text-primary" />
            </motion.h1>
          </motion.div>

          <nav className={`flex items-center gap-4 ${isScrolled ? 'hidden' : 'block'}`}>
            {navItems.map(renderNavButton)}
            <motion.button
              onClick={handleThemeToggle}
              className="p-2 rounded-full hover:bg-light/10 dark:hover:bg-dark/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </motion.button>
          </nav>
        </div>

        {/* Floating name and image window - left side */}
        {isScrolled && (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed top-4 left-4 bg-white/10 dark:bg-dark/10 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg z-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center">
                <motion.div
                  className="relative w-full h-full"
                  style={{ perspective: 600 }}
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                >
                  <img
                    src="/Souvik.webp"
                    alt="Souvik Dhara"
                    className="w-full h-full object-cover rounded-full absolute top-0 left-0"
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                  <img
                    src="/Souvik.webp"
                    alt="Souvik Dhara Mirrored"
                    className="w-full h-full object-cover rounded-full absolute top-0 left-0"
                    style={{ transform: 'scaleX(-1) rotateY(180deg)', backfaceVisibility: 'hidden' }}
                  />
                </motion.div>
              </div>
              <motion.h1 
                className="text-lg font-bold relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ShinyText text="Souvik Dhara" className="text-primary" />
              </motion.h1>
            </div>
          </motion.div>
        )}

        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="floating-nav"
          >
            <nav className="flex items-center gap-4">
              {navItems.map(renderNavButton)}
              <motion.button
                onClick={handleThemeToggle}
                className="p-2 rounded-full hover:bg-light/10 dark:hover:bg-dark/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </header>
    </>
  );
};

export default Header; 