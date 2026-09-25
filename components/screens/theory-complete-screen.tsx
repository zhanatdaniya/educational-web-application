'use client'

import { useGame } from '@/lib/game-engine'
import { CtaButton } from '@/components/cta-button'
import { SceneFrame } from '@/components/scene-frame'
import { PhaseProgress } from '@/components/phase-progress'
import { Swords, CheckCircle2 } from 'lucide-react'

export function TheoryCompleteScreen() {
  const { next } = useGame()

  return (
    <SceneFrame center>
      <PhaseProgress />
      <div className="max-w-lg">
        <div className="animate-fade-rise mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-jade/40 bg-jade/10">
          <CheckCircle2 className="size-8 text-jade" />
        </div>
        <h2 className="animate-fade-rise font-serif text-3xl font-bold text-parchment sm:text-4xl" style={{ animationDelay: '0.1s' }}>
          Тарихтың негізгі оқиғаларын білесің.
        </h2>
        <p className="animate-fade-rise mt-5 font-serif text-xl text-gold sm:text-2xl" style={{ animationDelay: '0.3s' }}>
          Бірақ енді сенің кезегің.
        </p>
        <div className="animate-fade-rise mt-10" style={{ animationDelay: '0.5s' }}>
          <CtaButton onClick={next}>
            <Swords className="size-5" />
            ТАРИХИ СИМУЛЯЦИЯҒА ӨТУ
          </CtaButton>
        </div>
      </div>
    </SceneFrame>
  )
}
