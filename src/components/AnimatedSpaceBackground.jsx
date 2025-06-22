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
    // PLANET 1: Top left, vertical drift + scale
    gsap.fromTo(planet1.current, {
      y: -40, scale: 0.7, opacity: 0.7
    }, {
      y: 60, scale: 1.1, opacity: 1,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top', end: 'bottom bottom', scrub: 1
      }
    })
    // PLANET 2: Top right (earth), move down + rotate
    gsap.fromTo(planet2.current, {
      y: -40, rotate: 0, opacity: 0.8
    }, {
      y: 60, rotate: 60, opacity: 1,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top', end: 'bottom bottom', scrub: 1.2
      }
    })
    // PLANET 3: Bottom left, diagonal drift + fade (move upwards)
    gsap.fromTo(planet3.current, {
      x: -20, y: 100, opacity: 0.6
    }, {
      x: 20, y: 40, opacity: 1,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top', end: 'bottom bottom', scrub: 1.1
      }
    })
    // PLANET 4: Bottom right, scale + rotate
    gsap.fromTo(planet4.current, {
      scale: 0.7, rotate: -20, opacity: 0.7
    }, {
      scale: 1.2, rotate: 20, opacity: 1,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top', end: 'bottom bottom', scrub: 1.3
      }
    })
    // ROCKET 1: Left center, vertical fly up
    gsap.fromTo(rocket1.current, {
      y: 180, opacity: 0.7
    }, {
      y: 40, opacity: 1,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top', end: 'bottom bottom', scrub: 1.2
      }
    })
    // ROCKET 2: Right center, vertical fly down
    gsap.fromTo(rocket2.current, {
      y: -60, opacity: 0.7
    }, {
      y: 100, opacity: 1,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top', end: 'bottom bottom', scrub: 1.2
      }
    })
    // ROCKET 3: Bottom center, horizontal fly in + rotate
    gsap.fromTo(rocket3.current, {
      x: -80, rotate: -30, opacity: 0.7
    }, {
      x: 80, rotate: 30, opacity: 1,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top', end: 'bottom bottom', scrub: 1.3
      }
    })
  }, [])

  // Small, distributed SVGs
  const svgStyle = { position: 'absolute', pointerEvents: 'none', zIndex: 0, opacity: 0.3 }

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Planets in corners */}
      <InlineSVG ref={planet1} src={assets.planet1} style={{ ...svgStyle, top: 0, left: 0, width: '44px', height: '44px' }} />
      <InlineSVG ref={planet2} src={assets.planet2} style={{ ...svgStyle, top: 0, right: 0, width: '48px', height: '48px' }} />
      <InlineSVG ref={planet3} src={assets.planet3} style={{ ...svgStyle, bottom: '20px', left: '10px', width: '44px', height: '44px' }} />
      <InlineSVG ref={planet4} src={assets.planet4} style={{ ...svgStyle, bottom: 0, right: 0, width: '52px', height: '52px' }} />
      {/* Rockets: left, right, and bottom center */}
      <InlineSVG ref={rocket1} src={assets.rocket1} style={{ ...svgStyle, top: '40%', left: 0, width: '32px', height: '32px' }} />
      <InlineSVG ref={rocket2} src={assets.rocket2} style={{ ...svgStyle, top: '40%', right: 0, width: '32px', height: '32px' }} />
      <InlineSVG ref={rocket3} src={assets.rocket3} style={{ ...svgStyle, left: '50%', bottom: 0, transform: 'translateX(-50%)', width: '36px', height: '36px' }} />
    </div>
  )
}