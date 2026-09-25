'use client'

import { useState } from 'react'
import { useGame } from '@/lib/game-engine'
import { MAP_TASK, type RegionId } from '@/lib/scenario-1465'
import { InteractiveMap } from '@/components/interactive-map'
import { PhaseProgress } from '@/components/phase-progress'
import { CtaButton } from '@/components/cta-button'
import { SceneFrame } from '@/components/scene-frame'
import { ArrowRight, MapPin, Check, RotateCcw } from 'lucide-react'

export function MicroMapScreen() {
  const { next, recordMicro } = useGame()
  const [selected, setSelected] = useState<RegionId | null>(null)
  const [firstTry, setFirstTry] = useState(true)
  const correct = selected === MAP_TASK.correctRegion

  function handleSelect(r: RegionId) {
    setSelected(r)
    if (r === MAP_TASK.correctRegion) {
      recordMicro('m2', firstTry)
    } else {
      setFirstTry(false)
    }
  }

  return (
    <SceneFrame>
      <PhaseProgress />
      <div className="mx-auto w-full max-w-3xl">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold-soft">
          Микро-тапсырма · карта
        </span>
        <h2 className="mt-3 flex items-center gap-2 font-serif text-2xl font-bold text-parchment sm:text-3xl">
          <MapPin className="size-6 text-gold" />
          {MAP_TASK.title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{MAP_TASK.hint}</p>

        <div className="mt-6">
          <InteractiveMap
            selectable
            selected={selected}
            correctFlash={correct ? MAP_TASK.correctRegion : null}
            onSelect={handleSelect}
            showRoute={correct}
            routeAnimated={correct}
          />
        </div>

        {selected && (
          <div
            className={`animate-fade-rise mt-5 flex items-start gap-3 rounded-xl border p-4 ${
              correct
                ? 'border-jade/40 bg-jade/10'
                : 'border-gold/30 bg-gold/5'
            }`}
          >
            {correct ? (
              <Check className="mt-0.5 size-5 shrink-0 text-jade" />
            ) : (
              <RotateCcw className="mt-0.5 size-5 shrink-0 text-gold-soft" />
            )}
            <p className="text-sm leading-relaxed text-foreground/90">
              {correct ? MAP_TASK.correctFeedback : MAP_TASK.wrongFeedback}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <CtaButton onClick={next} disabled={!correct} size="md">
            Жалғастыру
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </SceneFrame>
  )
}
