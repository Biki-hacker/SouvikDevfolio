import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from './AnimateText';
import React, { useState, useEffect } from 'react';

const greetings = ['Hello', 'Namaste', 'Hola', 'Bonjour'];

const Hero = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex flex-wrap justify-center items-center gap-2 text-2xl md:text-5xl lg:text-6xl font-bold mb-6 font-rajdhani chrome-hero-text">
          <AnimatePresence mode="wait">
            <motion.span
              key={greetings[greetingIndex]}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-red-500"
            >
              {greetings[greetingIndex]}
            </motion.span>
          </AnimatePresence>
          <span>, I am a</span>
          <span className="flex items-center text-red-500">
            &lt;<AnimatedText text="Full Stack Developer" size="5xl" className="text-red-500" />/&gt;
          </span>
          <span> I am experienced in building</span>
          <AnimatedText text="Web" size="5xl" className="text-red-500" />
          <span>and</span>
          <AnimatedText text="Mobile" size="5xl" className="text-red-500" />
          <span>Applications.</span>
        </div>
      </div>
      {/* Bouncing Arrow Scroll Indicator */}
      <motion.div 
        className="w-full flex justify-center absolute bottom-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="animate-bounce">
          <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 