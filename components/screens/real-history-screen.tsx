'use client'

import { useGame } from '@/lib/game-engine'
import { REAL_HISTORY } from '@/lib/scenario-1465'
import { PhaseProgress } from '@/components/phase-progress'
import { CtaButton } from '@/components/cta-button'
import { SceneFrame } from '@/components/scene-frame'
import { ArrowRight, Landmark } from 'lucide-react'

export function RealHistoryScreen() {
  const { next } = useGame()

  return (
    <SceneFrame>
      <PhaseProgress />
      <div className="mx-auto w-full max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-jade">
          Деректерге негізделген
        </span>
        <h2 className="mt-3 flex items-center gap-2 font-serif text-3xl font-bold text-parchment sm:text-4xl">
          <Landmark className="size-7 text-gold" />
          Нақты тарих
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Симуляциядан кейін — тарихи деректер бойынша болған нақты оқиғалар желісі.
        </p>

        <ol className="mt-8 space-y-1">
          {REAL_HISTORY.map((item, i) => {
            const last = i === REAL_HISTORY.length - 1
            return (
              <li
                key={item.era}
                className="animate-fade-rise relative pl-10 pb-6"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {!last && (
                  <span className="absolute left-[15px] top-7 h-full w-px bg-gradient-to-b from-gold/50 to-gold/10" />
                )}
                <span
                  className={`absolute left-0 top-1 flex size-8 items-center justify-center rounded-full border font-serif text-sm font-bold ${
                    last
                      ? 'border-gold bg-gold text-[oklch(0.2_0.04_265)] gold-glow'
                      : 'border-gold/40 bg-card text-gold'
                  }`}
                >
                  {i + 1}
                </span>
                <div className={`rounded-xl border p-4 ${last ? 'border-gold/40 bg-gold/5' : 'border-border bg-card/50'}`}>
                  <h3 className="font-serif text-lg font-semibold text-parchment">
                    {item.era}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-4 flex justify-end">
          <CtaButton onClick={next} size="md">
            Қорытынды тестке өту
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </SceneFrame>
  )
}
