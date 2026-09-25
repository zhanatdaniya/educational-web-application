'use client'

import { useGame } from '@/lib/game-engine'
import { CtaButton } from '@/components/cta-button'
import { Particles } from '@/components/particles'
import { ArrowRight } from 'lucide-react'

export function SimIntroScreen() {
  const { next } = useGame()

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[oklch(0.1_0.02_265)]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
      <div className="absolute inset-0 radial-vignette" />
      <Particles count={18} />

      <div className="relative z-10 max-w-lg px-6 text-center">
        <h2
          className="animate-fade-rise text-shadow-cinematic font-serif text-5xl font-black text-gold sm:text-7xl"
        >
          1465 жыл.
        </h2>
        <p
          className="animate-fade-rise mt-8 text-pretty font-serif text-xl leading-snug text-parchment sm:text-2xl"
          style={{ animationDelay: '0.4s' }}
        >
          Сен — Керей мен Жәнібек сұлтандардың жанындағы кеңесшісің.
        </p>
        <p
          className="animate-fade-rise mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
          style={{ animationDelay: '0.8s' }}
        >
          Сен тарихи жағдайды білесің. Енді сол білімді пайдаланып, маңызды
          шешімдер қабылдауың керек.
        </p>
        <div
          className="animate-fade-rise mt-10"
          style={{ animationDelay: '1.1s' }}
        >
          <CtaButton onClick={next}>
            ШЕШІМ ҚАБЫЛДАУДЫ БАСТАУ
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </div>
  )
}
