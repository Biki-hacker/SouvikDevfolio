import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
import { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'

function Stars({ count = 2000, mouse, direction = 1, color = '#fff', size = 0.15 }) {
  const points = useRef()
  const targetRotation = useRef({ x: 0, y: 0 })
  // Generate random star positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 100
    }
    return arr
  }, [count])

  // Animate rotation based on mouse, but slower and smoother
  useFrame(() => {
    if (points.current && mouse) {
      // Set target rotation with lower sensitivity, direction controls parallax
      targetRotation.current.y = mouse.x * Math.PI * 0.1 * direction
      targetRotation.current.x = mouse.y * Math.PI * 0.05 * direction
      // Lerp current rotation towards target
      points.current.rotation.y += (targetRotation.current.y - points.current.rotation.y) * 0.05
      points.current.rotation.x += (targetRotation.current.x - points.current.rotation.x) * 0.05
    }
  })

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export default function StarryBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas style={{ pointerEvents: 'none' }} camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        {/* Back layer: more, smaller, blueish stars, moves opposite */}
        <Stars mouse={mouse} direction={-1} count={2400} color={'#a3c9f7'} size={0.09} />
        {/* Front layer: fewer, larger, white stars, moves normal */}
        <Stars mouse={mouse} direction={1} count={1200} color={'#fff'} size={0.18} />
        <Preload all />
      </Canvas>
    </div>
  )
} 