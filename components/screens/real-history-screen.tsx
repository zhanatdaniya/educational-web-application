'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Landmark, Pause, Play } from 'lucide-react'
import { useGame } from '@/lib/game-engine'
import { REAL_HISTORY } from '@/lib/scenario-1465'
import { InteractiveMap } from '@/components/interactive-map'
import { PhaseProgress } from '@/components/phase-progress'
import { CtaButton } from '@/components/cta-button'
import { SceneFrame } from '@/components/scene-frame'

const AUTO_ADVANCE_MS = 6500

export function RealHistoryScreen() {
  const { next } = useGame()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const active = REAL_HISTORY[activeIndex]
  const isLast = activeIndex === REAL_HISTORY.length - 1

  useEffect(() => {
    if (!isPlaying || isLast) return
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => Math.min(index + 1, REAL_HISTORY.length - 1))
    }, AUTO_ADVANCE_MS)
    return () => window.clearTimeout(timer)
  }, [activeIndex, isLast, isPlaying])

  function selectStage(index: number) {
    setActiveIndex(index)
    setIsPlaying(false)
  }

  return (
    <SceneFrame particles>
      <PhaseProgress />

      <div className="mx-auto w-full max-w-6xl">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-jade">
          Деректерге негізделген
        </span>
        <h2 className="mt-3 flex items-center gap-2 font-serif text-3xl font-bold text-parchment sm:text-4xl">
          <Landmark className="size-7 text-gold" />
          Қазақ хандығының қалыптасу хронологиясы
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Оқиғалар желісін қадамдап қараңыз: картадағы аймақ пен көш жолы әр кезеңге сай өзгереді.
        </p>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <section className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-xl backdrop-blur-sm sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-soft">
                    {active.era}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-parchment sm:text-3xl">
                    {active.title}
                  </h3>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-serif text-sm font-bold text-gold">
                  {activeIndex + 1}/{REAL_HISTORY.length}
                </span>
              </div>

              <p key={active.title} className="animate-fade-rise mt-5 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
                {active.text}
              </p>

              <div className="mt-7 flex items-center justify-between gap-3">
                <button type="button" onClick={() => selectStage(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30">
                  <ChevronLeft className="size-4" /> Алдыңғы
                </button>
                <button type="button" onClick={() => setIsPlaying((playing) => !playing)} className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/10 px-3 py-2 text-sm text-gold transition-colors hover:bg-gold/20" aria-label={isPlaying ? 'Анимацияны тоқтату' : 'Анимацияны жалғастыру'}>
                  {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                  {isPlaying ? 'Тоқтату' : 'Жалғастыру'}
                </button>
                <button type="button" onClick={() => selectStage(Math.min(REAL_HISTORY.length - 1, activeIndex + 1))} disabled={isLast} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30">
                  Келесі <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <ol className="mt-5 grid gap-2 sm:grid-cols-2">
              {REAL_HISTORY.map((item, index) => {
                const isActive = index === activeIndex
                const isPast = index < activeIndex
                return (
                  <li key={item.title}>
                    <button type="button" onClick={() => selectStage(index)} className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${isActive ? 'border-gold/60 bg-gold/10 shadow-[0_0_24px_-10px_var(--gold)]' : 'border-border bg-card/40 hover:border-gold/30 hover:bg-card/70'}`} aria-current={isActive ? 'step' : undefined}>
                      <span className={`flex size-7 shrink-0 items-center justify-center rounded-full border font-serif text-xs font-bold ${isActive ? 'border-gold bg-gold text-background' : isPast ? 'border-jade/50 bg-jade/10 text-jade' : 'border-border text-muted-foreground'}`}>
                        {index + 1}
                      </span>
                      <span>
                        <span className="block text-xs text-gold-soft">{item.era}</span>
                        <span className="mt-0.5 block text-sm font-medium text-foreground/90">{item.title}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </section>

          <aside className="order-1 lg:order-2 lg:sticky lg:top-8 lg:self-start">
            <InteractiveMap highlight={active.region} showRoute={Boolean(active.route)} routeAnimated={Boolean(active.route) && isPlaying} />
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Картадағы алтын жиек осы кезеңге қатысты аумақты көрсетеді.
            </p>
          </aside>
        </div>

        <div className="mt-7 flex justify-end">
          <CtaButton onClick={next} size="md">
            Қорытынды тестке өту
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </SceneFrame>
  )
}
