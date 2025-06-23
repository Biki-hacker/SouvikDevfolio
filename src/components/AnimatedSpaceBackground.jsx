import { useEffect, useRef, forwardRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Helper to load SVG as React component, now with forwardRef
const InlineSVG = forwardRef(function InlineSVG({ src, className, style, ...props }, ref) {
  return <img ref={ref} src={src} className={className} style={style} draggable={false} alt="space asset" {...props} />
})

const assets = {
  planet1: '/background/planet-svgrepo-com%20(1).svg',
  planet2: '/background/planet-earth-global-svgrepo-com.svg',
  planet3: '/background/planet-svgrepo-com.svg',
  planet4: '/background/saturn-svgrepo-com.svg',
  rocket1: '/background/rocket-svgrepo-com%20(2).svg',
  rocket2: '/background/rocket-svgrepo-com%20(1).svg',
  rocket3: '/background/rocket-svgrepo-com.svg',
}

export default function AnimatedSpaceBackground() {
  // Refs for each SVG
  const planet1 = useRef()
  const planet2 = useRef()
  const planet3 = useRef()
  const planet4 = useRef()
  const rocket1 = useRef()
  const rocket2 = useRef()
  const rocket3 = useRef()

  useEffect(() => {
    // Clean up any previous triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Animation ranges for each SVG
    const ranges = {
      planet1: { y: [-40, 66], scale: [0.63, 0.99], opacity: [0.7, 1] },
      planet2: { y: [-44, 66], rotate: [0, 80], opacity: [0.8, 1] },
      planet3: { x: [-22, 22], y: [110, 44], opacity: [0.6, 1] },
      planet4: { y: [40, -40], scale: [0.63, 1.08], rotate: [-24, 32], opacity: [0.7, 1] },
      rocket1: { y: [162, 36], opacity: [0.7, 1] },
      rocket2: { y: [-66, 90], opacity: [0.7, 1] },
      rocket3: { x: [-88, 88], rotate: [-36, 36], opacity: [0.7, 1] },
    };

    // Helper to interpolate between two values
    const lerp = (a, b, t) => a + (b - a) * t;

    // Create quickTo tweens for smoothness
    const smooth = { duration: 0.4, ease: 'power2.out' };
    const q = {
      planet1: {
        y: gsap.quickTo(planet1.current, 'y', smooth),
        scale: gsap.quickTo(planet1.current, 'scale', smooth),
        opacity: gsap.quickTo(planet1.current, 'opacity', smooth),
      },
      planet2: {
        y: gsap.quickTo(planet2.current, 'y', smooth),
        rotate: gsap.quickTo(planet2.current, 'rotate', smooth),
        opacity: gsap.quickTo(planet2.current, 'opacity', smooth),
      },
      planet3: {
        x: gsap.quickTo(planet3.current, 'x', smooth),
        y: gsap.quickTo(planet3.current, 'y', smooth),
        opacity: gsap.quickTo(planet3.current, 'opacity', smooth),
      },
      planet4: {
        y: gsap.quickTo(planet4.current, 'y', smooth),
        scale: gsap.quickTo(planet4.current, 'scale', smooth),
        rotate: gsap.quickTo(planet4.current, 'rotate', smooth),
        opacity: gsap.quickTo(planet4.current, 'opacity', smooth),
      },
      rocket1: {
        y: gsap.quickTo(rocket1.current, 'y', smooth),
        opacity: gsap.quickTo(rocket1.current, 'opacity', smooth),
      },
      rocket2: {
        y: gsap.quickTo(rocket2.current, 'y', smooth),
        opacity: gsap.quickTo(rocket2.current, 'opacity', smooth),
      },
      rocket3: {
        x: gsap.quickTo(rocket3.current, 'x', smooth),
        rotate: gsap.quickTo(rocket3.current, 'rotate', smooth),
        opacity: gsap.quickTo(rocket3.current, 'opacity', smooth),
      },
    };

    // Main ScrollTrigger for the whole page
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      scroller: window,
      start: 'top top',
      end: () => `bottom bottom`,
      scrub: 0,
      invalidateOnRefresh: true,
      onUpdate: self => {
        const t = self.progress;
        // Animate each SVG based on scroll progress, but smoothly
        q.planet1.y(lerp(ranges.planet1.y[0], ranges.planet1.y[1], t));
        q.planet1.scale(lerp(ranges.planet1.scale[0], ranges.planet1.scale[1], t));
        q.planet1.opacity(lerp(ranges.planet1.opacity[0], ranges.planet1.opacity[1], t));

        q.planet2.y(lerp(ranges.planet2.y[0], ranges.planet2.y[1], t));
        q.planet2.rotate(lerp(ranges.planet2.rotate[0], ranges.planet2.rotate[1], t));
        q.planet2.opacity(lerp(ranges.planet2.opacity[0], ranges.planet2.opacity[1], t));

        q.planet3.x(lerp(ranges.planet3.x[0], ranges.planet3.x[1], t));
        q.planet3.y(lerp(ranges.planet3.y[0], ranges.planet3.y[1], t));
        q.planet3.opacity(lerp(ranges.planet3.opacity[0], ranges.planet3.opacity[1], t));

        q.planet4.y(lerp(ranges.planet4.y[0], ranges.planet4.y[1], t));
        q.planet4.scale(lerp(ranges.planet4.scale[0], ranges.planet4.scale[1], t));
        q.planet4.rotate(lerp(ranges.planet4.rotate[0], ranges.planet4.rotate[1], t));
        q.planet4.opacity(lerp(ranges.planet4.opacity[0], ranges.planet4.opacity[1], t));

        q.rocket1.y(lerp(ranges.rocket1.y[0], ranges.rocket1.y[1], t));
        q.rocket1.opacity(lerp(ranges.rocket1.opacity[0], ranges.rocket1.opacity[1], t));

        q.rocket2.y(lerp(ranges.rocket2.y[0], ranges.rocket2.y[1], t));
        q.rocket2.opacity(lerp(ranges.rocket2.opacity[0], ranges.rocket2.opacity[1], t));

        q.rocket3.x(lerp(ranges.rocket3.x[0], ranges.rocket3.x[1], t));
        q.rocket3.rotate(lerp(ranges.rocket3.rotate[0], ranges.rocket3.rotate[1], t));
        q.rocket3.opacity(lerp(ranges.rocket3.opacity[0], ranges.rocket3.opacity[1], t));
      },
    });
    // Clean up on unmount
    return () => {
      st.kill();
    };
  }, []);

  // Small, distributed SVGs
  const svgStyle = { position: 'absolute', pointerEvents: 'none', zIndex: 0, opacity: 0.3 }

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Planets in corners */}
      <InlineSVG ref={planet1} src={assets.planet1} style={{ ...svgStyle, top: 0, left: 0, width: '39.6px', height: '39.6px' }} />
      <InlineSVG ref={planet2} src={assets.planet2} style={{ ...svgStyle, top: 0, right: 0, width: '43.2px', height: '43.2px' }} />
      <InlineSVG ref={planet3} src={assets.planet3} style={{ ...svgStyle, bottom: '20px', left: '10px', width: '39.6px', height: '39.6px' }} />
      <InlineSVG ref={planet4} src={assets.planet4} style={{ ...svgStyle, bottom: 0, right: 0, width: '46.8px', height: '46.8px' }} />
      {/* Rockets: left, right, and bottom center */}
      <InlineSVG ref={rocket1} src={assets.rocket1} style={{ ...svgStyle, top: '40%', left: 0, width: '28.8px', height: '28.8px' }} />
      <InlineSVG ref={rocket2} src={assets.rocket2} style={{ ...svgStyle, top: '40%', right: 0, width: '28.8px', height: '28.8px' }} />
      <InlineSVG ref={rocket3} src={assets.rocket3} style={{ ...svgStyle, left: '50%', bottom: 0, transform: 'translateX(-50%)', width: '32.4px', height: '32.4px' }} />
    </div>
  )
}