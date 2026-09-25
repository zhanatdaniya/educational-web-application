'use client'

import { useGame } from '@/lib/game-engine'
import { CtaButton } from '@/components/cta-button'
import { Particles } from '@/components/particles'
import { ArrowRight, GraduationCap } from 'lucide-react'

export function IntroScreen({ onTeacher }: { onTeacher: () => void }) {
  const { next } = useGame()

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden">
      {/* Анимациялық тарихи фон */}
      <div
        className="animate-slow-pan absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/steppe-intro.png)' }}
      />
      <div className="absolute inset-0 bg-[oklch(0.12_0.03_265)]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
      <div className="absolute inset-0 radial-vignette" />
      <Particles count={30} />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span className="animate-fade-rise mb-4 text-xs font-medium uppercase tracking-[0.4em] text-gold-soft">
          Тарихи интерактивті саяхат
        </span>
        <h1
          className="animate-fade-rise text-shadow-cinematic font-serif text-7xl font-black leading-none text-parchment sm:text-8xl md:text-9xl"
          style={{ animationDelay: '0.1s' }}
        >
          1465
        </h1>
        <p
          className="animate-fade-rise mt-6 font-serif text-xl text-gold sm:text-2xl md:text-3xl"
          style={{ animationDelay: '0.25s' }}
        >
          Бір шешім. Бір дәуір. Бір хандық.
        </p>
        <p
          className="animate-fade-rise mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base"
          style={{ animationDelay: '0.4s' }}
        >
          Қазақ хандығының құрылу кезеңіне саяхат жаса. Алдымен тарихты үйрен.
          Кейін шешім қабылда.
        </p>

        <div
          className="animate-fade-rise mt-10 flex flex-col items-center gap-4"
          style={{ animationDelay: '0.55s' }}
        >
          <CtaButton onClick={next} className="min-w-[240px]">
            САЯХАТТЫ БАСТАУ
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </CtaButton>
          <button
            onClick={onTeacher}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-gold"
          >
            <GraduationCap className="size-4" />
            МҰҒАЛІМГЕ
          </button>
        </div>
      </div>

      <p className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-center text-[11px] uppercase tracking-widest text-muted-foreground/50">
        Тарихты жаттама. Түсін. Таңда. Нәтижесін көр.
      </p>
    </div>
  )
}
