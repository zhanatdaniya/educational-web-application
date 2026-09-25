'use client'

import type { ReactNode } from 'react'
import { Particles } from './particles'

interface SceneFrameProps {
  children: ReactNode
  className?: string
  particles?: boolean
  center?: boolean
}

// Барлық сахнаға ортақ қаптама: вигнетка, бөлшектер, орталықтау.
export function SceneFrame({
  children,
  className = '',
  particles = true,
  center = false,
}: SceneFrameProps) {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      {particles && <Particles />}
      <div className="pointer-events-none absolute inset-0 radial-vignette" />
      <div
        className={`relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col px-5 py-8 sm:px-8 sm:py-12 ${
          center ? 'items-center justify-center text-center' : ''
        } ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
