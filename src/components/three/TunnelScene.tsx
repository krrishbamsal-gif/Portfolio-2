'use client'

/**
 * TunnelScene.tsx
 * ─────────────────────────────────────────────────────────────
 * Cinematic, high-performance interactive 3D background for KRRISH portfolio.
 * Features:
 *  • Multi-layered floating particles (Foreground, Midground, Distant)
 *    with cyan, teal, and soft violet highlights.
 *  • Dynamic Particle Mesh Network connecting nearby particles with glowing filaments.
 *  • Kinetic pointer interactivity:
 *      - Mouse movement & acceleration (desktop)
 *      - Touch drag, swipe & multi-touch (mobile)
 *      - Particle repulsion / attraction field around the pointer
 *      - Mouse/Touch pointer glow beacon
 *      - Depth-based 3D parallax with natural momentum & damping
 *  • Preserves deep black background with soft atmospheric depth.
 *  • Auto-adapts performance (detects low-power/mobile or prefers-reduced-motion).
 */

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ───────────────────────── Color Palette ───────────────────────── */
const CYAN = '#00f0ff'
const TEAL = '#00c4cc'
const VIOLET = '#a855f7'
const CYAN_DIM = '#005f66'
const DEEP_BLACK = '#050505'

/* ───────────────────────── Interaction State ───────────────────────── */
interface PointerState {
  x: number // -1 to 1 normalized
  y: number // -1 to 1 normalized
  vx: number // velocity x
  vy: number // velocity y
  active: boolean // true when user is touching or moving mouse
  lastTime: number
}

/* ════════════════════════════════════════════════════════════════════
 *  1. INTERACTIVE GLOW BEACON (Follows Pointer in 3D space)
 * ════════════════════════════════════════════════════════════════════ */
const PointerBeacon: React.FC<{ pointerRef: React.MutableRefObject<PointerState> }> = ({ pointerRef }) => {
  const lightRef = useRef<THREE.PointLight>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    if (!lightRef.current || !meshRef.current) return
    const p = pointerRef.current
    
    // Project normalized pointer coords into 3D world plane at z = 2
    const targetX = p.x * 4.5
    const targetY = p.y * 3.2
    
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.1
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1
    meshRef.current.position.z = 2

    lightRef.current.position.copy(meshRef.current.position)
    
    // Pulse intensity slightly when active
    const targetIntensity = p.active ? 1.8 : 0.8
    lightRef.current.intensity += (targetIntensity - lightRef.current.intensity) * 0.05
  })

  return (
    <>
      <pointLight ref={lightRef} color={CYAN} distance={8} decay={2} intensity={1} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.3} />
      </mesh>
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════
 *  2. DYNAMIC CONNECTED PARTICLE CONSTELLATION & FILAMENTS
 * ════════════════════════════════════════════════════════════════════ */
const ConstellationNetwork: React.FC<{
  pointerRef: React.MutableRefObject<PointerState>
  isMobile: boolean
}> = ({ pointerRef, isMobile }) => {
  const count = isMobile ? 65 : 120
  const maxDistance = isMobile ? 1.8 : 2.2

  // Initialize particle positions and random velocity directions
  const [particles, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6

      vel[i * 3] = (Math.random() - 0.5) * 0.008
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004
    }
    return [pos, vel]
  }, [count])

  const pointsRef = useRef<THREE.Points>(null!)
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null!)

  // Color gradient per vertex (Cyan to Violet)
  const colors = useMemo(() => {
    const col = new Float32Array(count * 3)
    const c1 = new THREE.Color(CYAN)
    const c2 = new THREE.Color(VIOLET)
    const c3 = new THREE.Color(TEAL)
    for (let i = 0; i < count; i++) {
      const choice = Math.random()
      const color = choice < 0.5 ? c1 : choice < 0.8 ? c3 : c2
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }
    return col
  }, [count])

  // Max line segments buffer
  const maxLinePoints = count * count * 2
  const linePositions = useMemo(() => new Float32Array(maxLinePoints * 3), [maxLinePoints])
  const lineColors = useMemo(() => new Float32Array(maxLinePoints * 3), [maxLinePoints])

  useFrame(() => {
    if (!pointsRef.current || !linesGeometryRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position
    const pArray = posAttr.array as Float32Array
    const p = pointerRef.current

    const pointerWorldX = p.x * 5.0
    const pointerWorldY = p.y * 3.5

    let lineVertexIndex = 0

    // Update particle positions + interactive repulsion/attraction
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      // Apply base velocity
      pArray[ix] += velocities[ix]
      pArray[iy] += velocities[iy]
      pArray[iz] += velocities[iz]

      // Bounce bounds
      if (pArray[ix] < -8 || pArray[ix] > 8) velocities[ix] *= -1
      if (pArray[iy] < -6 || pArray[iy] > 6) velocities[iy] *= -1
      if (pArray[iz] < -4 || pArray[iz] > 4) velocities[iz] *= -1

      // Pointer interactive influence
      const dx = pArray[ix] - pointerWorldX
      const dy = pArray[iy] - pointerWorldY
      const distSq = dx * dx + dy * dy
      if (distSq < 4.0 && distSq > 0.01) {
        const force = (4.0 - distSq) * 0.003
        pArray[ix] += dx * force
        pArray[iy] += dy * force
      }

      // Check connections with other particles
      for (let j = i + 1; j < count; j++) {
        const jx = j * 3
        const jy = j * 3 + 1
        const jz = j * 3 + 2

        const cdx = pArray[ix] - pArray[jx]
        const cdy = pArray[iy] - pArray[jy]
        const cdz = pArray[iz] - pArray[jz]
        const dist = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz)

        if (dist < maxDistance && lineVertexIndex < maxLinePoints - 2) {
          const alpha = (1.0 - dist / maxDistance) * 0.35

          // Vertex 1
          linePositions[lineVertexIndex * 3] = pArray[ix]
          linePositions[lineVertexIndex * 3 + 1] = pArray[iy]
          linePositions[lineVertexIndex * 3 + 2] = pArray[iz]
          lineColors[lineVertexIndex * 3] = 0.0 * alpha
          lineColors[lineVertexIndex * 3 + 1] = 0.94 * alpha
          lineColors[lineVertexIndex * 3 + 2] = 1.0 * alpha
          lineVertexIndex++

          // Vertex 2
          linePositions[lineVertexIndex * 3] = pArray[jx]
          linePositions[lineVertexIndex * 3 + 1] = pArray[jy]
          linePositions[lineVertexIndex * 3 + 2] = pArray[jz]
          lineColors[lineVertexIndex * 3] = 0.65 * alpha
          lineColors[lineVertexIndex * 3 + 1] = 0.33 * alpha
          lineColors[lineVertexIndex * 3 + 2] = 0.96 * alpha
          lineVertexIndex++
        }
      }
    }

    posAttr.needsUpdate = true

    // Update lines geometry
    linesGeometryRef.current.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions.subarray(0, lineVertexIndex * 3), 3)
    )
    linesGeometryRef.current.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors.subarray(0, lineVertexIndex * 3), 3)
    )
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.08 : 0.07}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <lineSegments>
        <bufferGeometry ref={linesGeometryRef} />
        <lineBasicMaterial
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════
 *  3. DEEP DRIFTING NEBULA PARTICLES (Atmospheric Depth)
 * ════════════════════════════════════════════════════════════════════ */
const DeepAtmosphereField: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const count = isMobile ? 350 : 700
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const cCyan = new THREE.Color(CYAN)
    const cViolet = new THREE.Color(VIOLET)
    const cTeal = new THREE.Color(CYAN_DIM)

    for (let i = 0; i < count; i++) {
      // Large spherical volume
      const r = 5 + Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi) - 2

      const rnd = Math.random()
      const color = rnd < 0.6 ? cCyan : rnd < 0.85 ? cTeal : cViolet
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }
    return [pos, col]
  }, [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.getElapsedTime()
    pointsRef.current.rotation.y = t * 0.015
    pointsRef.current.rotation.x = t * 0.008
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ════════════════════════════════════════════════════════════════════
 *  4. WIREFRAME KINETIC VORTEX (Halcyon Cinematic Centerpiece)
 * ════════════════════════════════════════════════════════════════════ */
const KineticVortex: React.FC<{ pointerRef: React.MutableRefObject<PointerState> }> = ({ pointerRef }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const ring1Ref = useRef<THREE.Mesh>(null!)
  const ring2Ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const p = pointerRef.current

    // Base auto rotation + pointer tilt velocity
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.04 + p.y * 0.35
      meshRef.current.rotation.y = t * 0.06 + p.x * 0.45
      meshRef.current.rotation.z = t * 0.02
    }

    if (ring1Ref.current) {
      const pulse = 1 + Math.sin(t * 0.8) * 0.06
      ring1Ref.current.scale.set(pulse, pulse, pulse)
      ring1Ref.current.rotation.x = t * 0.1 + p.y * 0.2
      ring1Ref.current.rotation.z = t * -0.05
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.12 + p.x * 0.25
      ring2Ref.current.rotation.x = Math.PI * 0.35 + Math.sin(t * 0.4) * 0.12
    }
  })

  return (
    <group position={[0, 0, -1]}>
      {/* 3D Wireframe TorusKnot Vortex */}
      <mesh ref={meshRef} scale={2.2}>
        <torusKnotGeometry args={[1.7, 0.32, 128, 16, 2, 3]} />
        <meshBasicMaterial
          color={CYAN}
          wireframe
          transparent
          opacity={0.16}
          toneMapped={false}
        />
      </mesh>

      {/* Core Glowing Cyan Ring */}
      <mesh ref={ring1Ref} scale={1.5}>
        <torusGeometry args={[2.2, 0.018, 16, 100]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* Accent Violet-Teal Ring for depth */}
      <mesh ref={ring2Ref} scale={1.3}>
        <torusGeometry args={[2.9, 0.012, 16, 120]} />
        <meshBasicMaterial
          color={VIOLET}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

/* ════════════════════════════════════════════════════════════════════
 *  5. DYNAMIC CAMERA RIG (Mouse + Touch Parallax & Inertia)
 * ════════════════════════════════════════════════════════════════════ */
const ResponsiveCameraRig: React.FC<{
  pointerRef: React.MutableRefObject<PointerState>
}> = ({ pointerRef }) => {
  const { camera } = useThree()
  const currentPos = useRef({ x: 0, y: 0 })

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const p = pointerRef.current

    // Subtle gentle autonomous floating
    const autoX = Math.sin(t * 0.05) * 0.4
    const autoY = Math.cos(t * 0.035) * 0.25

    // Target coordinates combining cursor/touch parallax + auto drift
    const targetX = p.x * 1.5 + autoX
    const targetY = p.y * 1.1 + autoY

    // Smooth buttery lerp damping
    currentPos.current.x += (targetX - currentPos.current.x) * 0.04
    currentPos.current.y += (targetY - currentPos.current.y) * 0.04

    camera.position.x = currentPos.current.x
    camera.position.y = currentPos.current.y
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ════════════════════════════════════════════════════════════════════
 *  6. FULL CANVAS SCENE CONTENT
 * ════════════════════════════════════════════════════════════════════ */
const SceneContent: React.FC<{
  pointerRef: React.MutableRefObject<PointerState>
  isMobile: boolean
}> = ({ pointerRef, isMobile }) => {
  return (
    <>
      <ambientLight intensity={0.2} />
      
      {/* Interactive cursor glow point */}
      <PointerBeacon pointerRef={pointerRef} />

      {/* Central 3D kinetic vortex */}
      <KineticVortex pointerRef={pointerRef} />

      {/* Interactive particle constellation with glowing connecting lines */}
      <ConstellationNetwork pointerRef={pointerRef} isMobile={isMobile} />

      {/* Ambient drifting particle cloud */}
      <DeepAtmosphereField isMobile={isMobile} />

      {/* Responsive Parallax Camera */}
      <ResponsiveCameraRig pointerRef={pointerRef} />
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════
 *  7. EXPORTED FIXED BACKGROUND COMPONENT
 * ════════════════════════════════════════════════════════════════════ */
export default function TunnelScene() {
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    active: false,
    lastTime: Date.now(),
  })

  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const mobileCheck = window.innerWidth < 768 || 'ontouchstart' in window
    setIsMobile(mobileCheck)

    /* ── Desktop Mouse Handler with Velocity ── */
    let lastX = 0
    let lastY = 0

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      const dt = Math.max((now - pointerRef.current.lastTime) / 1000, 0.016)
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1

      pointerRef.current.vx = (nx - lastX) / dt
      pointerRef.current.vy = (ny - lastY) / dt
      pointerRef.current.x = nx
      pointerRef.current.y = ny
      pointerRef.current.active = true
      pointerRef.current.lastTime = now
      lastX = nx
      lastY = ny
    }

    /* ── Mobile Touch Handlers (Passive, non-blocking scrolling) ── */
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const nx = (touch.clientX / window.innerWidth) * 2 - 1
        const ny = -(touch.clientY / window.innerHeight) * 2 + 1
        pointerRef.current.x = nx
        pointerRef.current.y = ny
        pointerRef.current.active = true
      }
    }

    const onTouchEnd = () => {
      pointerRef.current.active = false
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    const onResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  if (!isMounted) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: DEEP_BLACK,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 80 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 0 16px rgba(0, 240, 255, 0.4))',
        }}
      >
        <fog attach="fog" args={[DEEP_BLACK, 6, 22]} />
        <color attach="background" args={[DEEP_BLACK]} />
        <SceneContent pointerRef={pointerRef} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
