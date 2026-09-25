'use client'

import { useEffect, useState } from 'react'
import { useGame } from '@/lib/game-engine'
import { CtaButton } from '@/components/cta-button'
import { Particles } from '@/components/particles'
import { ArrowRight } from 'lucide-react'

export function KhanateScreen() {
  const { next } = useGame()
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1400)
    const t2 = setTimeout(() => setPhase(2), 3000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black">
      <div
        className="animate-slow-pan absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: 'url(/images/khanate.png)',
          opacity: phase >= 1 ? 0.7 : 0.25,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/40" />
      <div className="absolute inset-0 radial-vignette" />
      <Particles count={36} />

      <div className="relative z-10 px-6 text-center">
        <p className="animate-fade-rise text-shadow-cinematic font-serif text-4xl font-black text-gold sm:text-5xl">
          1465 жыл.
        </p>

        {phase >= 1 && (
          <p className="animate-fade-rise mt-6 font-serif text-2xl text-parchment sm:text-3xl">
            Жаңа саяси бірлестік қалыптасты.
          </p>
        )}

        {phase >= 2 && (
          <div className="animate-fade-rise mt-10">
            <p className="text-xs uppercase tracking-[0.5em] text-gold-soft">
              Дүниеге келді
            </p>
            <h1 className="text-shadow-cinematic mt-3 font-serif text-5xl font-black leading-none text-parchment sm:text-7xl md:text-8xl">
              Қазақ
              <br />
              <span className="text-gold">хандығы</span>
            </h1>
            <div className="mt-12">
              <CtaButton onClick={next}>
                Нақты тарихқа оралу
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </CtaButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
