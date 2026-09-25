'use client'

import { useGame } from '@/lib/game-engine'
import { DECISIONS } from '@/lib/scenario-1465'
import { PhaseProgress } from '@/components/phase-progress'
import { IndicatorBars } from '@/components/indicator-bars'
import { SceneFrame } from '@/components/scene-frame'
import { CtaButton } from '@/components/cta-button'
import { ArrowRight, Gamepad2, Landmark, Check, Minus } from 'lucide-react'

const UNITY_GROUPS = ['Керей ауылы', 'Жәнібек ауылы', 'Арғын', 'Найман', 'Үйсін', 'Қаңлы']

// Таңдауға қарай ру-тайпалардың қолдауын имитациялау (ойын элементі).
const UNITY_SUPPORT: Record<string, number> = {
  council: 6,
  marriage: 5,
  strong: 4,
}

export function ConsequenceScreen({ index }: { index: number }) {
  const { decisions, next } = useGame()
  const decision = DECISIONS[index]
  const chosenId = decisions[decision.id]
  const option =
    decision.options.find((o) => o.id === chosenId) ?? decision.options[0]
  const showIndicators = decision.step >= 3
  const isUnity = decision.id === 'unity'
  const supportCount = isUnity ? (UNITY_SUPPORT[chosenId] ?? 4) : 0

  return (
    <SceneFrame>
      <PhaseProgress />
      <div className="mx-auto w-full max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold-soft">
          Нәтиже · {decision.title}
        </span>
        <p className="mt-2 text-sm text-muted-foreground">
          Сенің таңдауың:{' '}
          <span className="font-medium text-foreground">{option.label}</span>
        </p>

        {/* Нәтиже */}
        <div className="animate-fade-rise mt-4 rounded-2xl border border-gold/20 bg-card/70 p-6 backdrop-blur-sm">
          <p className="text-pretty text-lg leading-relaxed text-foreground/90">
            {option.consequence}
          </p>
        </div>

        {isUnity && (
          <div className="animate-fade-rise mt-5 rounded-2xl border border-border bg-card/60 p-5" style={{ animationDelay: '0.15s' }}>
            <p className="mb-3 text-sm font-medium text-gold-soft">
              Сенің стратегияңды қолдайтын топтар:
            </p>
            <div className="flex flex-wrap gap-2">
              {UNITY_GROUPS.map((g, i) => {
                const supports = i < supportCount
                return (
                  <span
                    key={g}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm ${
                      supports
                        ? 'border-jade/40 bg-jade/10 text-jade'
                        : 'border-border bg-muted/40 text-muted-foreground'
                    }`}
                  >
                    {supports ? <Check className="size-3.5" /> : <Minus className="size-3.5" />}
                    {g}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {showIndicators && (
          <div className="animate-fade-rise mt-6" style={{ animationDelay: '0.25s' }}>
            <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
              <Gamepad2 className="size-3.5" /> Индикаторлар жаңарды
            </p>
            <IndicatorBars compact />
          </div>
        )}

        {/* Ойын сценарийі мен нақты тарихты бөлу */}
        <div className="animate-fade-rise mt-7 grid gap-3 sm:grid-cols-2" style={{ animationDelay: '0.35s' }}>
          <div className="rounded-xl border border-gold/20 bg-gold/5 p-4">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold">
              <Gamepad2 className="size-3.5" /> Ойындағы сценарий
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Бұл — сенің таңдауыңа негізделген симуляция. Ол білім бекітуге
              арналған, нақты оқиға емес.
            </p>
          </div>
          <div className="rounded-xl border border-jade/30 bg-jade/5 p-4">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-jade">
              <Landmark className="size-3.5" /> Нақты тарих
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              {option.realHistoryNote}
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-sm italic text-muted-foreground">
          «Бұл — симуляциядағы сценарий. Енді нақты тарихи оқиғаға оралайық.»
        </p>

        <div className="mt-6 flex justify-end">
          <CtaButton onClick={next} size="md">
            Жалғастыру
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </SceneFrame>
  )
}
