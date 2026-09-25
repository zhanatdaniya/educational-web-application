'use client'

import { useState } from 'react'
import { useGame } from '@/lib/game-engine'
import { QUICK_TASK } from '@/lib/scenario-1465'
import { PhaseProgress } from '@/components/phase-progress'
import { CtaButton } from '@/components/cta-button'
import { SceneFrame } from '@/components/scene-frame'
import { ArrowRight, HelpCircle, Check, X } from 'lucide-react'

export function MicroQuickScreen() {
  const { next, recordMicro } = useGame()
  const [answered, setAnswered] = useState<string | null>(null)

  function choose(id: string, correct: boolean) {
    if (answered) return
    setAnswered(id)
    recordMicro('m3', correct)
  }

  const answeredCorrect = QUICK_TASK.options.find((o) => o.id === answered)?.correct

  return (
    <SceneFrame center>
      <PhaseProgress />
      <div className="mx-auto w-full max-w-xl text-left">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold-soft">
          Микро-тапсырма · жылдам сұрақ
        </span>
        <h2 className="mt-3 flex items-start gap-2 font-serif text-2xl font-bold text-parchment sm:text-3xl">
          <HelpCircle className="mt-1 size-6 shrink-0 text-gold" />
          {QUICK_TASK.title}
        </h2>

        <div className="mt-7 space-y-3">
          {QUICK_TASK.options.map((opt) => {
            const isChosen = answered === opt.id
            const reveal = answered !== null
            const showCorrect = reveal && opt.correct
            const showWrong = reveal && isChosen && !opt.correct
            return (
              <button
                key={opt.id}
                disabled={reveal}
                onClick={() => choose(opt.id, opt.correct)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left font-medium transition-all disabled:cursor-default ${
                  showCorrect
                    ? 'border-jade/50 bg-jade/10 text-jade'
                    : showWrong
                      ? 'border-destructive/50 bg-destructive/10 text-foreground'
                      : 'border-border bg-card/60 text-foreground enabled:hover:border-gold/50 enabled:hover:bg-gold/5'
                }`}
              >
                <span>{opt.label}</span>
                {showCorrect && <Check className="size-5 shrink-0" />}
                {showWrong && <X className="size-5 shrink-0 text-destructive" />}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="animate-fade-rise mt-5 rounded-xl border border-gold/30 bg-gold/5 p-4">
            <p className="mb-1 text-sm font-semibold text-gold">
              {answeredCorrect ? 'Дұрыс!' : 'Оқып шығайық:'}
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">
              {QUICK_TASK.explanation}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <CtaButton onClick={next} disabled={!answered} size="md">
            Жалғастыру
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </SceneFrame>
  )
}
