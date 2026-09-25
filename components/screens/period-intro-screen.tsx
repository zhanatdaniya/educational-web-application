'use client'

import { useGame } from '@/lib/game-engine'
import { CtaButton } from '@/components/cta-button'
import { SceneFrame } from '@/components/scene-frame'
import { ArrowRight } from 'lucide-react'

export function PeriodIntroScreen() {
  const { next } = useGame()

  return (
    <SceneFrame center>
      <div className="max-w-xl">
        <span className="animate-fade-rise text-xs font-medium uppercase tracking-[0.4em] text-gold-soft">
          1-тарау
        </span>
        <h2
          className="animate-fade-rise text-shadow-cinematic mt-4 font-serif text-4xl font-bold leading-tight text-parchment sm:text-6xl"
          style={{ animationDelay: '0.1s' }}
        >
          XV ғасыр.
          <br />
          <span className="text-gold">Дешті Қыпшақ</span>
        </h2>
        <p
          className="animate-fade-rise mx-auto mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground"
          style={{ animationDelay: '0.3s' }}
        >
          Ұлан-байтақ дала. Тайталасқа толы заман. Осы кезеңде бүкіл тарихты
          өзгертетін оқиғалар басталады. Алдымен сол дәуірді танып алайық.
        </p>
        <div
          className="animate-fade-rise mt-10"
          style={{ animationDelay: '0.5s' }}
        >
          <CtaButton onClick={next}>
            Зерттеуді бастау
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </SceneFrame>
  )
}
