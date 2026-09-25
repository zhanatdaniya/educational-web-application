'use client'

import { useEffect, useMemo, useState } from 'react'

interface ParticlesProps {
  count?: number
  className?: string
}

// Баяу көтерілетін шаң/жарық бөлшектері — кинематографиялық атмосфера үшін.
// Кездейсоқ мәндер тек клиентте есептеледі (hydration сәйкессіздігін болдырмау).
export function Particles({ count = 22, className = '' }: ParticlesProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 1 + Math.random() * 3
        return {
          key: i,
          left: Math.random() * 100,
          size,
          delay: Math.random() * 18,
          duration: 16 + Math.random() * 20,
          opacity: 0.2 + Math.random() * 0.5,
        }
      }),
    [count],
  )

  if (!mounted) return null

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dots.map((d) => (
        <span
          key={d.key}
          className="absolute bottom-0 rounded-full bg-gold"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            // @ts-expect-error custom property for keyframes
            '--p-op': d.opacity,
            filter: 'blur(0.5px)',
            boxShadow: '0 0 6px var(--gold)',
            animation: `float-up ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
