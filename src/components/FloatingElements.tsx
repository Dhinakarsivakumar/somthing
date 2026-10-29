import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface FloatingElementsProps {
  /** Show floating hearts or specify count. */
  hearts?: boolean
  heartCount?: number
  /** Show floating rose petals or specify count. */
  petals?: boolean
  petalCount?: number
  /** Show glowing particles or stars or specify count. */
  particles?: boolean
  particleCount?: number
  starCount?: number
  /** Number of elements to generate per type. Defaults to 12. */
  intensity?: number
  /** Additional CSS class for the container. */
  className?: string
}

interface ElementData {
  id: string
  left: string
  size: number
  duration: string
  delay: string
  opacity: number
}

interface ParticleData extends ElementData {
  tx: string
  ty: string
  tx2: string
  ty2: string
  maxOpacity: number
}

/** Generate a random number within a range. */
function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/** Generate element data with random positions and timings. */
function generateElements(count: number, prefix: string): ElementData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    left: `${rand(0, 100)}%`,
    size: rand(14, 28),
    duration: `${rand(6, 14)}s`,
    delay: `${rand(0, 8)}s`,
    opacity: rand(0.35, 0.85),
  }))
}

/** Generate particle data with custom transform values. */
function generateParticles(count: number): ParticleData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `particle-${i}`,
    left: `${rand(0, 100)}%`,
    size: rand(2, 6),
    duration: `${rand(4, 10)}s`,
    delay: `${rand(0, 6)}s`,
    opacity: rand(0.2, 0.6),
    tx: `${rand(-40, 40)}px`,
    ty: `${rand(-80, -20)}px`,
    tx2: `${rand(-30, 30)}px`,
    ty2: `${rand(-120, -50)}px`,
    maxOpacity: rand(0.3, 0.7),
  }))
}

/** Floating heart SVG element. */
function HeartSvg({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

/** Floating rose petal SVG element. */
function PetalSvg({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 20 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="10"
        cy="13"
        rx="8"
        ry="12"
        fill="url(#petalGrad)"
        opacity="0.75"
      />
      <defs>
        <radialGradient id="petalGrad" cx="40%" cy="30%">
          <stop offset="0%" stopColor="#F4C2C2" />
          <stop offset="60%" stopColor="#C21E56" />
          <stop offset="100%" stopColor="#722F37" />
        </radialGradient>
      </defs>
    </svg>
  )
}

/**
 * Renders floating hearts, rose petals, and glowing particles.
 */
export default function FloatingElements({
  hearts = true,
  heartCount,
  petals = true,
  petalCount,
  particles = true,
  particleCount,
  starCount,
  intensity = 12,
  className = '',
}: FloatingElementsProps) {
  const finalHeartCount = heartCount ?? (hearts ? intensity : 0)
  const finalPetalCount = petalCount ?? (petals ? Math.ceil(intensity * 0.8) : 0)
  const finalParticleCount =
    particleCount ?? (starCount ? starCount : particles ? Math.ceil(intensity * 1.5) : 0)

  const heartElements = useMemo(
    () => (finalHeartCount > 0 ? generateElements(finalHeartCount, 'heart') : []),
    [finalHeartCount],
  )

  const petalElements = useMemo(
    () => (finalPetalCount > 0 ? generateElements(finalPetalCount, 'petal') : []),
    [finalPetalCount],
  )

  const particleElements = useMemo(
    () => (finalParticleCount > 0 ? generateParticles(finalParticleCount) : []),
    [finalParticleCount],
  )

  const heartColors = ['#C21E56', '#F4C2C2', '#722F37', '#D4326A', '#E8A0A0']

  if (finalHeartCount === 0 && finalPetalCount === 0 && finalParticleCount === 0) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        {/* Floating Hearts */}
        {heartElements.map((el, i) => (
          <div
            key={el.id}
            className="animate-float-heart absolute"
            style={
              {
                left: el.left,
                bottom: '-10%',
                '--duration': el.duration,
                '--delay': el.delay,
                opacity: el.opacity,
                filter: `blur(${rand(0, 0.5)}px)`,
              } as React.CSSProperties
            }
          >
            <HeartSvg
              size={el.size}
              color={heartColors[i % heartColors.length]}
            />
          </div>
        ))}

        {/* Floating Rose Petals */}
        {petalElements.map((el) => (
          <div
            key={el.id}
            className="animate-float-petal absolute"
            style={
              {
                left: el.left,
                top: '-5%',
                '--duration': el.duration,
                '--delay': el.delay,
                opacity: el.opacity,
              } as React.CSSProperties
            }
          >
            <PetalSvg size={el.size} />
          </div>
        ))}

        {/* Glowing Particles */}
        {particleElements.map((el) => (
          <div
            key={el.id}
            className="animate-particle-float absolute rounded-full"
            style={
              {
                left: el.left,
                top: `${rand(5, 95)}%`,
                width: el.size,
                height: el.size,
                background: `radial-gradient(circle, rgba(201,168,76,0.9) 0%, rgba(201,168,76,0) 70%)`,
                boxShadow: '0 0 6px rgba(201,168,76,0.5)',
                '--duration': el.duration,
                '--delay': el.delay,
                '--tx': el.tx,
                '--ty': el.ty,
                '--tx2': el.tx2,
                '--ty2': el.ty2,
                '--max-opacity': el.maxOpacity,
              } as React.CSSProperties
            }
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
