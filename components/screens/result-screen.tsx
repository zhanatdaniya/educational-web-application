'use client'

import { useGame } from '@/lib/game-engine'
import { FINAL_QUIZ } from '@/lib/scenario-1465'
import { CtaButton } from '@/components/cta-button'
import { SceneFrame } from '@/components/scene-frame'
import { IndicatorBars } from '@/components/indicator-bars'
import { RotateCcw, BookOpen, Trophy, ScrollText, Sparkles } from 'lucide-react'

export function ResultScreen() {
  const { finalScore, simDecisionCount, microCorrect, restart, replayTheory } =
    useGame()
  const total = FINAL_QUIZ.length
  const microDone = Object.values(microCorrect).filter(Boolean).length

  return (
    <SceneFrame center>
      <div className="w-full max-w-xl">
        <div className="animate-fade-rise mx-auto mb-5 flex size-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 gold-glow">
          <Trophy className="size-8 text-gold" />
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold-soft">
          Саяхат аяқталды
        </p>
        <h2 className="mt-2 font-serif text-4xl font-black text-parchment sm:text-5xl">
          Сенің нәтижең
        </h2>

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-gold/30 bg-card/70 p-5">
            <BookOpen className="size-5 text-gold-soft" />
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
              Тарихи білім
            </p>
            <p className="mt-1 font-serif text-3xl font-bold text-gold">
              {finalScore}
              <span className="text-lg text-muted-foreground">/{total}</span>
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/70 p-5">
            <ScrollText className="size-5 text-gold-soft" />
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
              Симуляция шешімдері
            </p>
            <p className="mt-1 font-serif text-3xl font-bold text-parchment">
              {simDecisionCount}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/70 p-5">
            <Sparkles className="size-5 text-gold-soft" />
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
              Негізгі ұғымдар
            </p>
            <p className="mt-1 font-serif text-xl font-bold text-jade">
              меңгерілді
            </p>
            <p className="text-xs text-muted-foreground">
              микро-тапсырма: {microDone}/3
            </p>
          </div>
        </div>

        <div className="mt-4">
          <IndicatorBars compact />
        </div>

        <p className="mt-7 text-pretty leading-relaxed text-foreground/85">
          Сен 1465 жылғы тарихи жағдайды зерттеп, өз шешімдерің арқылы
          симуляциядан өттің.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaButton onClick={restart}>
            <RotateCcw className="size-5" />
            ҚАЙТА ОЙНАУ
          </CtaButton>
          <CtaButton onClick={replayTheory} variant="outline" size="md">
            <BookOpen className="size-4" />
            ТАРИХТЫ ҚАЙТА ЗЕРТТЕУ
          </CtaButton>
        </div>

        <p className="mt-10 font-serif text-lg italic text-gold">
          «Тарихты жаттама. Түсін. Таңда. Нәтижесін көр.»
        </p>
      </div>
    </SceneFrame>
  )
}
