import { motion } from 'framer-motion';
import { FaRocket, FaGithub } from 'react-icons/fa';
import { useCallback, useRef, useEffect } from 'react';

const ProjectCard = ({ project, isActive }) => {
  const cardRef = useRef(null);
  const liveButtonRef = useRef(null);
  const repoButtonRef = useRef(null);

  // Aggressive button click handler with multiple fallbacks
  const handleButtonClick = useCallback((url, type) => {
    console.log(`Button clicked: ${type} - ${url}`);
    
    if (!url || url === '#') {
      console.log('Invalid URL, showing placeholder action');
      alert(`${type} button clicked - placeholder action`);
      return;
    }

    //         Multiple methods to ensure navigation works
    try {
      // Method 1: location.href to open in same tab
      window.location.href = url;
    } catch (error) {
      console.error('Navigation failed:', error);
      // Method 2: Create and click a temporary link as fallback
      const tempLink = document.createElement('a');
      tempLink.href = url;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }
  }, []);

  // Force proper event binding after component mounts
  useEffect(() => {
    const liveBtn = liveButtonRef.current;
    if (liveBtn) {
      const handleLiveClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleButtonClick(project.liveUrl, 'Live');
      };

      liveBtn.addEventListener('click', handleLiveClick, { capture: true });
      liveBtn.addEventListener('touchstart', handleLiveClick, { capture: true });

      return () => {
        liveBtn.removeEventListener('click', handleLiveClick, { capture: true });
        liveBtn.removeEventListener('touchstart', handleLiveClick, { capture: true });
      };
    }
  }, [project.liveUrl, handleButtonClick]);

  useEffect(() => {
    const repoBtn = repoButtonRef.current;
    if (repoBtn) {
      const handleRepoClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleButtonClick(project.repoUrl, 'Repo');
      };

      repoBtn.addEventListener('click', handleRepoClick, { capture: true });
      repoBtn.addEventListener('touchstart', handleRepoClick, { capture: true });

      return () => {
        repoBtn.removeEventListener('click', handleRepoClick, { capture: true });
        repoBtn.removeEventListener('touchstart', handleRepoClick, { capture: true });
      };
    }
  }, [project.repoUrl, handleButtonClick]);

  return (
    <motion.div
      ref={cardRef}
      className="project-card-container w-[576px] min-h-[648px] mx-auto relative isolate"
      style={{
        transform: 'translateZ(0)',
        pointerEvents: 'auto',
      }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="project-card-inner relative w-full h-full p-11 rounded-3xl
                   bg-white/95 dark:bg-gray-900/90 backdrop-blur-md 
                   border border-white/20 dark:border-gray-700/50 
                   shadow-lg dark:shadow-2xl dark:shadow-black/20"
        style={{
          transform: 'translateZ(0)',
          pointerEvents: 'auto'
        }}
      >
        {/* Project Image */}
        <div 
          className="project-image w-full h-72 bg-gray-800 dark:bg-gray-700 rounded-2xl mb-7 
                     flex items-center justify-center overflow-hidden"
        >
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 dark:text-gray-500 text-2xl font-semibold text-center">
              Upcoming Project
            </div>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
          {project.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-5">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 
                         py-2 px-5 rounded-full text-xl font-medium 
                         border border-red-500/20 dark:border-red-500/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-2xl leading-relaxed mb-10 min-h-[76px]">
          {project.description}
        </p>

        {/* Buttons Container */}
        <div 
          className="buttons-container flex gap-5 relative z-10"
        >
          {/* Live Button */}
          <button
            ref={liveButtonRef}
            className="live-button-aggressive flex items-center justify-center gap-3 px-10 py-5 
                       bg-red-500 hover:bg-red-600 active:scale-95 text-white 
                       rounded-xl text-2xl font-semibold transition-all duration-200 
                       min-w-[144px] h-[79px] transform-gpu"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <FaRocket className="text-2xl" />
            <span>Live</span>
          </button>

          {/* Repo Button */}
          <button
            ref={repoButtonRef}
            className="repo-button-aggressive flex items-center justify-center gap-3 px-10 py-5 
                       bg-gray-700 hover:bg-gray-800 active:scale-95 text-white 
                       rounded-xl text-2xl font-semibold transition-all duration-200 
                       min-w-[144px] h-[79px] transform-gpu"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <FaGithub className="text-2xl" />
            <span>Repo</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;

// Aggressive global styles to ensure button functionality
const aggressiveStyles = `
  /* Reset and aggressive overrides */
  .project-card-container,
  .project-card-container * {
    box-sizing: border-box !important;
  }

  .live-button-aggressive,
  .repo-button-aggressive {
    pointer-events: auto !important;
    cursor: pointer !important;
    touch-action: manipulation !important;
    user-select: none !important;
    -webkit-user-select: none !important;
  }
`;

// Forcefully inject styles
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('aggressive-project-card-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  const styleSheet = document.createElement('style');
  styleSheet.id = 'aggressive-project-card-styles';
  styleSheet.textContent = aggressiveStyles;
  document.head.appendChild(styleSheet);
}