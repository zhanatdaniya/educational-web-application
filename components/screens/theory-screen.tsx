'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useGame } from '@/lib/game-engine'
import { THEORY_CARDS } from '@/lib/scenario-1465'
import { InteractiveMap } from '@/components/interactive-map'
import { PhaseProgress } from '@/components/phase-progress'
import { CtaButton } from '@/components/cta-button'
import { SceneFrame } from '@/components/scene-frame'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function TheoryScreen() {
  const { next } = useGame()
  const [step, setStep] = useState(0)
  const card = THEORY_CARDS[step]
  const total = THEORY_CARDS.length

  function goPrev() {
    setStep((s) => Math.max(0, s - 1))
  }
  function goNext() {
    if (step >= total - 1) {
      next()
    } else {
      setStep((s) => s + 1)
    }
  }

  return (
    <SceneFrame particles>
      <PhaseProgress />

      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold-soft">
          Тарихты зерттеу — {card.step}/{total}
        </span>
        <div className="flex gap-1.5">
          {THEORY_CARDS.map((c, i) => (
            <span
              key={c.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-6 bg-gold' : i < step ? 'w-1.5 bg-gold-soft' : 'w-1.5 bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid flex-1 items-start gap-6 lg:grid-cols-2">
        {/* Мазмұн карточкасы */}
        <div key={card.id} className="animate-fade-rise order-2 lg:order-1">
          <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm sm:p-8">
            {card.image && (
              <div className="mb-5 flex items-center gap-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-gold/30 sm:size-24">
                  <Image
                    src={card.image}
                    alt={card.imageAlt ?? card.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold-soft">
                    {card.eyebrow}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-parchment sm:text-3xl">
                    {card.title}
                  </h3>
                </div>
              </div>
            )}
            {!card.image && (
              <>
                <p className="text-xs uppercase tracking-widest text-gold-soft">
                  {card.eyebrow}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-bold text-parchment sm:text-3xl">
                  {card.title}
                </h3>
              </>
            )}
            <p className="mt-4 text-pretty leading-relaxed text-foreground/85">
              {card.body}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={goPrev}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-gold disabled:opacity-30"
            >
              <ArrowLeft className="size-4" />
              Артқа
            </button>
            <CtaButton onClick={goNext} size="md">
              {step >= total - 1 ? 'Тапсырмаға өту' : 'Келесі'}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
          </div>
        </div>

        {/* Карта */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-8">
          <InteractiveMap
            highlight={card.region}
            showRoute={step >= 5}
            routeAnimated={step >= 5}
            explorable
          />
        </div>
      </div>
    </SceneFrame>
  )
}
