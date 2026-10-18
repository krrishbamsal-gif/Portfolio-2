'use client'

/**
 * ParticleField.tsx
 * ─────────────────────────────────────────────────────────────
 * A standalone particle-field effect component designed to be
 * placed **inside** an existing <Canvas> from @react-three/fiber.
 *
 * Features:
 *  • 1 000 particles randomly distributed in a sphere
 *  • Slow drift rotation on two axes
 *  • Cyan / teal palette with per-particle opacity variation
 *    achieved through vertex colours (alpha baked into RGB mix)
 *  • Single draw call — all particles in one <Points> object
 *
 * Usage:
 *   import ParticleField from '@/components/three/ParticleField'
 *   // inside a <Canvas>:
 *   <ParticleField radius={10} count={1000} speed={0.015} />
 */

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ───────────────────────── types ───────────────────────── */

interface ParticleFieldProps {
  /** Outer radius of the spherical distribution (default 10) */
  radius?: number
  /** Total number of particles (default 1000) */
  count?: number
  /** Rotation speed multiplier (default 0.015) */
  speed?: number
  /** Base particle size (default 0.03) */
  size?: number
  /** Primary colour (default cyan #00f0ff) */
  color?: string
}

/* ═══════════════════════════════════════════════════════════════
 *  PARTICLE FIELD COMPONENT
 *  ─────────────────────────
 *  Generates positions & per-vertex colours once (useMemo) and
 *  rotates the entire <Points> group every frame via useFrame.
 * ═══════════════════════════════════════════════════════════════ */

const ParticleField: React.FC<ParticleFieldProps> = ({
  radius = 10,
  count = 1000,
  speed = 0.015,
  size = 0.03,
  color = '#00f0ff',
}) => {
  const pointsRef = useRef<THREE.Points>(null!)

  /**
   * Pre-compute particle positions and per-vertex colours.
   * Colours vary between bright cyan and a dimmer teal to
   * simulate varying opacity without a second render pass.
   */
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    // Parse the base colour once
    const baseColor = new THREE.Color(color)
    // A dimmer teal for "faded" particles
    const dimColor = new THREE.Color('#004d52')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // ── position: uniform distribution inside a sphere ──
      // Using cube-root for uniform volume distribution
      const r = radius * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = r * Math.cos(phi)

      // ── colour: random blend between bright and dim ──
      const mix = Math.random() // 0 = dim, 1 = bright
      const particleColor = dimColor.clone().lerp(baseColor, mix)
      col[i3] = particleColor.r
      col[i3 + 1] = particleColor.g
      col[i3 + 2] = particleColor.b
    }

    return { positions: pos, colors: col }
  }, [count, radius, color])

  /** Slow compound rotation for gentle organic drift */
  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.getElapsedTime()
    pointsRef.current.rotation.y = t * speed
    pointsRef.current.rotation.x = t * speed * 0.6
    pointsRef.current.rotation.z = t * speed * 0.3
  })

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      colors={colors}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default ParticleField
