import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Billboard, useGLTF, Environment } from '@react-three/drei';
import ProjectCard from './ProjectCards';

// --- GLB Model Loader for Circuit.glb ---
function CircuitGLBModel(props) {
  const { scene } = useGLTF('/assets/Circuit.glb');
  return <primitive object={scene} scale={5} position={[0, 0, 0]} {...props} />;
}

// --- GLB Model Loader for Laptop.glb ---
function LaptopGLBModel(props) {
  const { scene } = useGLTF('/assets/Laptop.glb');
  return <primitive object={scene} scale={4.5} position={[0, 1.7, -0.7]} {...props} />;
}

const LAPTOP_POS = [0, 1.7, -0.7];

function useCardsBehindLaptop(cardPositions, setHiddenCards) {
  const { camera } = useThree();
  useFrame(() => {
    const camPos = camera.position;
    const toLaptop = [
      LAPTOP_POS[0] - camPos.x,
      LAPTOP_POS[1] - camPos.y,
      LAPTOP_POS[2] - camPos.z,
    ];
    const norm = (v) => {
      const len = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
      return [v[0]/len, v[1]/len, v[2]/len];
    };
    const dot = (a, b) => a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
    const toLaptopNorm = norm(toLaptop);
    const laptopProj = dot(toLaptop, toLaptopNorm);
    
    const candidates = cardPositions.map((pos, idx) => {
      const toCard = [pos[0] - camPos.x, pos[1] - camPos.y, pos[2] - camPos.z];
      const cardProj = dot(toCard, toLaptopNorm);
      const toCardNorm = norm(toCard);
      const d = dot(toLaptopNorm, toCardNorm);
      return { idx, cardProj, d };
    }).filter(c => c.cardProj > laptopProj + 0.2);
    
    candidates.sort((a, b) => b.d - a.d);
    const hideIndices = candidates.slice(0, 2).map(c => c.idx);
    const hidden = cardPositions.map((_, idx) => hideIndices.includes(idx));
    setHiddenCards(hidden);
  });
}

// Custom HTML wrapper component for better control with proper depth-based z-index
function ProjectCardWrapper({ children, position, isHidden, index }) {
  const htmlRef = useRef();
  const { camera } = useThree();
  const [zIndex, setZIndex] = useState(1000);
  
  // Calculate z-index based on distance from camera
  const updateZIndex = useCallback(() => {
    const camPos = camera.position;
    const distance = Math.sqrt(
      Math.pow(position[0] - camPos.x, 2) + 
      Math.pow(position[1] - camPos.y, 2) + 
      Math.pow(position[2] - camPos.z, 2)
    );
    
    // Invert distance so closer objects have higher z-index
    // Scale to a reasonable range (1000-2000)
    const maxDistance = 15; // Approximate max distance in the scene
    const newZIndex = Math.round(2000 - (distance / maxDistance) * 1000);
    setZIndex(Math.max(1000, Math.min(2000, newZIndex)));
  }, [camera.position, position]);
  
  // Update z-index when camera moves
  useFrame(() => {
    updateZIndex();
  });
  
  useEffect(() => {
    if (htmlRef.current) {
      const htmlElement = htmlRef.current;
      
      // Force proper event handling
      htmlElement.style.pointerEvents = isHidden ? 'none' : 'auto';
      htmlElement.style.opacity = isHidden ? '0.25' : '1';
      
      // Ensure all child elements have proper event handling
      const allElements = htmlElement.querySelectorAll('*');
      allElements.forEach(el => {
        if (!isHidden) {
          el.style.pointerEvents = 'auto';
        }
      });
    }
  }, [isHidden]);

  return (
    <Billboard position={position} follow={true} lockX={false} lockY={false} lockZ={false}>
      <Html
        ref={htmlRef}
        center
        distanceFactor={2.0}
        occlude={false}
        zIndexRange={[zIndex, zIndex]}
        calculatePosition={(obj, camera, size) => {
          // Custom position calculation for better alignment
          const vector = obj.clone();
          vector.project(camera);
          
          const x = (vector.x * 0.5 + 0.5) * size.width;
          const y = (vector.y * -0.5 + 0.5) * size.height;
          
          return [x, y];
        }}
        style={{
          pointerEvents: isHidden ? 'none' : 'auto',
          opacity: isHidden ? 0.25 : 1,
          transition: 'opacity 0.3s ease-in-out',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          position: 'relative',
          isolation: 'isolate',
          contain: 'layout style paint',
          willChange: 'opacity, transform',
          zIndex: zIndex
        }}
        transform
        sprite
      >
        <div
          data-project-index={index}
          style={{
            pointerEvents: 'auto',
            position: 'relative',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            isolation: 'isolate',
            contain: 'layout style paint'
          }}
        >
          {children}
        </div>
      </Html>
    </Billboard>
  );
}

function CardsOcclusionHelper({ cardPositions, setHiddenCards }) {
  useCardsBehindLaptop(cardPositions, setHiddenCards);
  return null;
}

const Projects = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [hiddenCards, setHiddenCards] = useState(Array(6).fill(false));
  const canvasRef = useRef();
  
  const projects = [
    {
      title: 'Project 1',
      description: 'A full-stack web application built with React and Node.js',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: null,
      liveUrl: 'https://example.com/project1',
      repoUrl: 'https://github.com/user/project1',
    },
    {
      title: 'Project 2',
      description: 'Mobile app developed using Flutter',
      tags: ['Flutter', 'Firebase'],
      image: null,
      liveUrl: 'https://example.com/project2',
      repoUrl: 'https://github.com/user/project2',
    },
    {
      title: 'Project 3',
      description: 'E-commerce platform with Angular',
      tags: ['Angular', 'TypeScript', 'Node.js'],
      image: null,
      liveUrl: 'https://example.com/project3',
      repoUrl: 'https://github.com/user/project3',
    },
    {
      title: 'Project 4',
      description: 'Real-time chat application',
      tags: ['React', 'Socket.io', 'Express'],
      image: null,
      liveUrl: 'https://example.com/project4',
      repoUrl: 'https://github.com/user/project4',
    },
    {
      title: 'Project 5',
      description: 'Task management system',
      tags: ['Vue.js', 'Django', 'PostgreSQL'],
      image: null,
      liveUrl: 'https://example.com/project5',
      repoUrl: 'https://github.com/user/project5',
    },
    {
      title: 'Project 6',
      description: 'Weather App with real-time updates',
      tags: ['Flutter', 'Dart', 'API'],
      image: null,
      liveUrl: 'https://example.com/project6',
      repoUrl: 'https://github.com/user/project6',
    },
  ];

  // Precompute card positions with better spacing
  const cardPositions = projects.map((_, index) => {
    const nodeCount = projects.length;
    const angle = (index / nodeCount) * Math.PI * 2;
    const radius = 6.5; // Slightly increased radius
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = 2.2; // Slightly higher position
    return [x, y, z];
  });

  // Force re-render and event handling on mount
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Force canvas to recalculate event positions
        canvasRef.current.style.transform = 'translateZ(0)';
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="projects" className="pt-16 pb-8 px-4">
      <div className="w-full max-w-[1600px] mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">
          Projects
        </h2>
        
        <div 
          className="w-full h-[600px] relative"
          style={{
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {/* Drag handle image */}
          <img 
            src="/Drag.png" 
            alt="Drag to rotate view" 
            style={{ 
              position: 'absolute', 
              top: '-80px', 
              left: 12, 
              width: '240px', 
              height: '240px', 
              zIndex: 20, 
              opacity: 0.85, 
              pointerEvents: 'none',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }}
            draggable={false}
          />
          
          <Canvas 
            ref={canvasRef}
            camera={{ position: [0, 7, 12], fov: 45 }} 
            shadows
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true,
              clearColor: [0, 0, 0, 0]
            }}
            style={{
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background: 'transparent'
            }}
            onCreated={(state) => {
              // Ensure proper event handling and transparent background
              state.gl.domElement.style.pointerEvents = 'auto';
              state.gl.domElement.style.touchAction = 'none';
              state.gl.setClearColor(0x000000, 0); // Transparent background
            }}
          >
            <CardsOcclusionHelper 
              cardPositions={cardPositions} 
              setHiddenCards={setHiddenCards} 
            />
            
            {/* Enhanced lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1.2} 
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, -10, -5]} intensity={0.3} />
            
            <Environment preset="city" background={false} />
            
            {/* 3D Models */}
            {/* <CircuitGLBModel /> */}
            <LaptopGLBModel />
            
            {/* Project cards with aggressive positioning */}
            {projects.map((project, index) => (
              <ProjectCardWrapper
                key={`project-${index}`}
                position={cardPositions[index]}
                isHidden={hiddenCards[index]}
                index={index}
              >
                <ProjectCard 
                  project={project} 
                  isActive={activeNode === index}
                />
              </ProjectCardWrapper>
            ))}
            
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2.5}
              rotateSpeed={0.4}
              dampingFactor={0.05}
              enableDamping={true}
            />
          </Canvas>
        </div>
      </div>
      
      <style>{`
        /* Aggressive global overrides for this section */
        #projects {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: relative;
          isolation: isolate;
        }

        #projects * {
          box-sizing: border-box;
        }

        #projects canvas {
          transform: translateZ(0) !important;
          -webkit-transform: translateZ(0) !important;
          backface-visibility: hidden !important;
          -webkit-backface-visibility: hidden !important;
          position: relative !important;
        }

        /* Ensure no interference from other styles */
        #projects .floating-card-animated {
          transition: transform 0.35s cubic-bezier(.4,2,.6,1), box-shadow 0.35s cubic-bezier(.4,2,.6,1);
        }
        
        #projects .floating-card-animated:hover {
          transform: translateY(-18px) scale(1.15);
          box-shadow: 0 16px 64px 0 rgba(255, 23, 73, 0.18), 0 8px 40px 0 rgba(31, 38, 135, 0.18);
          border-color: #ef4444;
        }

        /* Force hardware acceleration */
        #projects,
        #projects *,
        #projects canvas,
        #projects canvas * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default Projects;