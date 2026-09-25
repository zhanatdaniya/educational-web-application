'use client'

import Image from 'next/image'
import { useGame } from '@/lib/game-engine'
import { DECISIONS } from '@/lib/scenario-1465'
import { PhaseProgress } from '@/components/phase-progress'
import { IndicatorBars } from '@/components/indicator-bars'
import { InteractiveMap } from '@/components/interactive-map'
import { SceneFrame } from '@/components/scene-frame'
import { ChevronRight, ScrollText } from 'lucide-react'

export function DecisionScreen({ index }: { index: number }) {
  const { decide, next } = useGame()
  const decision = DECISIONS[index]
  const showIndicators = decision.step >= 3
  const showMap = decision.id === 'migration'

  function choose(optionId: string, effects: (typeof decision.options)[number]['effects']) {
    decide(decision.id, optionId, effects)
    next()
  }

  return (
    <SceneFrame>
      <PhaseProgress />
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-soft">
          <span>Симуляция · шешім {decision.step}/5</span>
        </div>

        <h2 className="mt-3 font-serif text-3xl font-bold text-parchment sm:text-4xl">
          {decision.title}
        </h2>
        <p className="mt-1 text-sm text-gold-soft">{decision.context}</p>

        {/* Тарихи контекст */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-gold/20 bg-card/70 p-5 parchment-texture backdrop-blur-sm">
          <ScrollText className="mt-0.5 size-5 shrink-0 text-gold-soft" />
          <p className="text-pretty leading-relaxed text-foreground/90">
            {decision.situation}
          </p>
        </div>

        {decision.id === 'migration' && (
          <div className="mt-5">
            <div className="mb-3 flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-gold/30">
                <Image src="/images/esenbuga.png" alt="Есенбұға хан" fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold-soft">Моғолстан билеушісі</p>
                <p className="font-serif text-lg font-semibold text-parchment">Есенбұға хан</p>
              </div>
            </div>
            <InteractiveMap highlight={['dqypshaq', 'zhetysu']} showRoute routeAnimated />
          </div>
        )}

        {showIndicators && !showMap && (
          <div className="mt-6">
            <IndicatorBars compact />
          </div>
        )}

        <h3 className="mt-8 font-serif text-xl font-semibold text-gold">
          {decision.question}
        </h3>

        <div className="mt-4 grid gap-3">
          {decision.options.map((opt, i) => (
            <button
              key={opt.id}
              onClick={() => choose(opt.id, opt.effects)}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/60 p-5 text-left transition-all hover:border-gold/50 hover:bg-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-gold/30 font-serif text-sm font-bold text-gold">
                  {String.fromCharCode(65 + i)}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{opt.label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{opt.detail}</p>
                </div>
              </div>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-gold" />
            </button>
          ))}
        </div>
      </div>
    </SceneFrame>
  )
}
