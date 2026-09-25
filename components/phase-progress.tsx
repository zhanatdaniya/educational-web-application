'use client'

import { PHASES, useGame } from '@/lib/game-engine'

// Жоғарғы прогресс индикаторы — оқушы қай кезеңде екенін көрсетеді.
export function PhaseProgress() {
  const { phase } = useGame()
  if (phase < 1) return null

  return (
    <div className="mb-8 flex w-full items-center gap-2 sm:gap-3">
      {PHASES.map((p) => {
        const done = p.id < phase
        const active = p.id === phase
        return (
          <div key={p.id} className="flex flex-1 flex-col gap-1.5">
            <div
              className={`h-1 w-full rounded-full transition-colors duration-500 ${
                done
                  ? 'bg-gold-soft'
                  : active
                    ? 'bg-gold'
                    : 'bg-border'
              }`}
            />
            <span
              className={`text-[10px] font-medium uppercase tracking-wider transition-colors sm:text-xs ${
                active
                  ? 'text-gold'
                  : done
                    ? 'text-muted-foreground'
                    : 'text-muted-foreground/50'
              }`}
            >
              {p.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
