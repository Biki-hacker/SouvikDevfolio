import { motion } from 'framer-motion';
import { FaReact, FaAngular, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaDatabase, FaNodeJs, FaCode, FaDownload } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiFlutter, SiGo, SiNextdotjs, SiTypescript } from 'react-icons/si';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import TiltedCard from './CardJsonAnimation';

const About = () => {
  const techStack = [
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Angular', icon: FaAngular, color: '#DD0031' },
    { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
    { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { name: 'Docker', icon: FaDocker, color: '#2496ED' },
    { name: 'PostgreSQL', icon: FaDatabase, color: '#336791' },
    { name: 'Node', icon: FaNodeJs, color: '#339933' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Golang', icon: SiGo, color: '#00ADD8' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  ];

  const personalInfo = {
    name: 'Souvik Dhara',
    location: 'Kolkata',
    email: 'souvikdhara032@gmail.com',
    experience: '1+ years',
    specialization: 'Full Stack Development',
    age: '17'
  };

  const techStackRefs = useRef([]);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const animations = techStackRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const floatingIcon = ref.querySelector('.floating-icon');
      let animation = null;
      
      const handleMouseMove = (e) => {
        if (animation) animation.kill();
        
        const rect = ref.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
        
        // Calculate rotation based on movement
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
        
        animation = gsap.to(floatingIcon, {
          x: x - centerX,
          y: y - centerY,
          rotation: angle + 360,
          scale: 1.5,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      
      const handleEnter = () => {
        // Reset and show the icon
        gsap.set(floatingIcon, {
          scale: 1.5,
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          zIndex: 50
        });
        
        ref.addEventListener('mousemove', handleMouseMove);
      };
      
      const handleLeave = (e) => {
        // Remove event listener
        ref.removeEventListener('mousemove', handleMouseMove);
        
        // Kill any ongoing animation
        if (animation) {
          animation.kill();
          animation = null;
        }
        
        // Smooth hide animation with small delay
        gsap.to(floatingIcon, {
          scale: 0,
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 0,
          duration: 0.15,
          ease: 'power2.in'
        });
      };
      
      // Add event listeners
      ref.addEventListener('mouseenter', handleEnter);
      ref.addEventListener('mouseleave', handleLeave);
      
      // Cleanup function
      return () => {
        ref.removeEventListener('mouseenter', handleEnter);
        ref.removeEventListener('mouseleave', handleLeave);
        ref.removeEventListener('mousemove', handleMouseMove);
        if (animation) {
          animation.kill();
          animation = null;
        }
        gsap.set(floatingIcon, {
          scale: 0,
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 0
        });
      };
    });
    
    // Component cleanup
    return () => {
      animations.forEach(cleanup => cleanup && cleanup());
    };
  }, []);

  const formatJsonValue = (value) => {
    if (typeof value === 'string') {
      return <span className="text-green-500 dark:text-green-400">"{value}"</span>;
    }
    return <span className="text-blue-500 dark:text-blue-400">{value}</span>;
  };

  const JsonOverlayContent = () => {
    return (
      <div className="w-full h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-8 rounded-[15px] flex items-center justify-center border border-white/20 shadow-2xl">
        <div className="font-mono text-sm md:text-base">
          <span className="text-gray-700 dark:text-gray-300">{'{'}</span>
          <div className="pl-4">
            {Object.entries(personalInfo).map(([key, value], index) => (
              <div key={key} className="mb-1">
                <span className="text-purple-600 dark:text-purple-400 font-semibold">"{key}"</span>
                <span className="text-gray-700 dark:text-gray-300">: </span>
                {formatJsonValue(value)}
                {index < Object.keys(personalInfo).length - 1 && (
                  <span className="text-gray-700 dark:text-gray-300">,</span>
                )}
              </div>
            ))}
          </div>
          <span className="text-gray-700 dark:text-gray-300">{'}'}</span>
        </div>
      </div>
    );
  };

  return (
    <section id="about" className="min-h-screen py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left side - About text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-lg leading-relaxed mb-8">
              I am a passionate Full Stack Developer with expertise in building modern web and mobile applications.
              My journey in software development has equipped me with a strong foundation in both frontend and
              backend technologies, allowing me to create seamless and efficient solutions.
            </p>
            <button
              className="resume-btn"
              onClick={() => setShowModal(true)}
              type="button"
            >
              <FaDownload className="text-lg" />
              Download Resume
            </button>
          </motion.div>

          {/* Right side - Personal Info with Tilted Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center max-w-md w-full mx-auto"
          >
            <TiltedCard
              altText="Personal Information Card"
              captionText="Personal Information"
              containerHeight="320px"
              containerWidth="100%"
              imageHeight="320px"
              imageWidth="320px"
              scaleOnHover={1.07}
              rotateAmplitude={15}
              showMobileWarning={false}
              showTooltip={false}
              overlayContent={<JsonOverlayContent />}
              displayOverlayContent={true}
              backgroundColor="linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)"
            />
          </motion.div>
        </div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Tech Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                ref={el => techStackRefs.current[index] = el}
                className="relative flex items-center justify-center p-6 
                  bg-white dark:bg-gray-800/50 
                  backdrop-blur-sm
                  rounded-xl 
                  border border-gray-200/50 dark:border-gray-700/50
                  shadow-lg hover:shadow-xl
                  transition-all duration-300
                  cursor-pointer group
                  overflow-visible
                  hover:scale-[1.02]
                  hover:bg-gray-50 dark:hover:bg-gray-800/80
                  hover:border-gray-300/50 dark:hover:border-gray-600/50"
              >
                <tech.icon
                  className="tech-icon text-3xl transition-transform duration-300"
                  style={{ color: tech.color }}
                />
                <span className="ml-3 text-gray-700 dark:text-gray-300 font-medium">{tech.name}</span>
                <tech.icon
                  className="floating-icon absolute text-4xl opacity-0 pointer-events-none"
                  style={{ color: tech.color }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal for resume info */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-sm w-full text-center relative">
            <h4 className="text-xl font-bold mb-4">Resume Unavailable</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              As I am <span className="font-bold">under 18</span> now, I have not prepared any professional resume yet.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setShowModal(false)}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default About; 