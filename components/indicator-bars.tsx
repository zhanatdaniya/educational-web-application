'use client'

import { INDICATOR_LABELS, type IndicatorKey } from '@/lib/scenario-1465'
import { useGame } from '@/lib/game-engine'
import { Users, Landmark, Handshake, Shield } from 'lucide-react'

const ICONS: Record<IndicatorKey, typeof Users> = {
  support: Users,
  stability: Landmark,
  diplomacy: Handshake,
  security: Shield,
}

interface IndicatorBarsProps {
  compact?: boolean
}

// Симуляция көрсеткіштері. Бұл — ойын индикаторлары, нақты тарихи өлшем емес.
export function IndicatorBars({ compact = false }: IndicatorBarsProps) {
  const { indicators } = useGame()
  const keys = Object.keys(INDICATOR_LABELS) as IndicatorKey[]

  return (
    <div>
      <div
        className={`grid gap-3 ${compact ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}
      >
        {keys.map((key) => {
          const Icon = ICONS[key]
          const value = indicators[key]
          const tone =
            value >= 65
              ? 'var(--jade)'
              : value >= 40
                ? 'var(--gold)'
                : 'var(--ember)'
          return (
            <div
              key={key}
              className="rounded-xl border border-border bg-card/60 p-3 backdrop-blur-sm"
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Icon className="size-3.5 text-gold-soft" aria-hidden />
                  {INDICATOR_LABELS[key]}
                </span>
                <span className="text-xs font-semibold tabular-nums text-foreground">
                  {value}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${value}%`, backgroundColor: tone }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground/60">
        Симуляция индикаторлары — нақты тарихи өлшем емес
      </p>
    </div>
  )
}
