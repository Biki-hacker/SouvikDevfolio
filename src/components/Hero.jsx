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
        <div className="flex flex-wrap justify-center items-center gap-2 text-2xl md:text-5xl lg:text-6xl font-bold mb-6">
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
    </section>
  );
};

export default Hero; 