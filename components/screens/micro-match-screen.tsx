'use client'

import { useMemo, useState } from 'react'
import { useGame } from '@/lib/game-engine'
import { MATCH_TASK } from '@/lib/scenario-1465'
import { PhaseProgress } from '@/components/phase-progress'
import { CtaButton } from '@/components/cta-button'
import { SceneFrame } from '@/components/scene-frame'
import { ArrowRight, Check, Link2 } from 'lucide-react'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function MicroMatchScreen() {
  const { next, recordMicro } = useGame()
  const roles = useMemo(() => shuffle(MATCH_TASK.pairs), [])
  const [activePerson, setActivePerson] = useState<string | null>(null)
  const [matched, setMatched] = useState<Record<string, boolean>>({})
  const [wrongShake, setWrongShake] = useState<string | null>(null)

  const allDone = Object.keys(matched).length === MATCH_TASK.pairs.length

  function selectRole(roleId: string) {
    if (!activePerson) return
    if (activePerson === roleId) {
      const nextMatched = { ...matched, [activePerson]: true }
      setMatched(nextMatched)
      setActivePerson(null)
      if (Object.keys(nextMatched).length === MATCH_TASK.pairs.length) {
        recordMicro('m1', true)
      }
    } else {
      setWrongShake(roleId)
      setTimeout(() => setWrongShake(null), 500)
    }
  }

  return (
    <SceneFrame>
      <PhaseProgress />
      <div className="mx-auto w-full max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold-soft">
          Микро-тапсырма · сәйкестендіру
        </span>
        <h2 className="mt-3 flex items-center gap-2 font-serif text-2xl font-bold text-parchment sm:text-3xl">
          <Link2 className="size-6 text-gold" />
          {MATCH_TASK.title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{MATCH_TASK.hint}</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground/70">
              Тұлға
            </p>
            {MATCH_TASK.pairs.map((p) => {
              const done = matched[p.id]
              const active = activePerson === p.id
              return (
                <button
                  key={p.id}
                  disabled={done}
                  onClick={() => setActivePerson(active ? null : p.id)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 text-left font-medium transition-all ${
                    done
                      ? 'border-jade/40 bg-jade/10 text-jade'
                      : active
                        ? 'border-gold bg-gold/15 text-gold gold-glow'
                        : 'border-border bg-card/60 text-foreground hover:border-gold/40'
                  }`}
                >
                  {p.person}
                  {done && <Check className="size-4" />}
                </button>
              )
            })}
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground/70">
              Рөлі
            </p>
            {roles.map((r) => {
              const done = matched[r.id]
              const shake = wrongShake === r.id
              return (
                <button
                  key={r.id}
                  disabled={done || !activePerson}
                  onClick={() => selectRole(r.id)}
                  className={`flex w-full items-center gap-2 rounded-xl border p-3 text-left text-sm transition-all ${
                    done
                      ? 'border-jade/40 bg-jade/10 text-jade'
                      : 'border-border bg-card/60 text-foreground enabled:hover:border-gold/40 disabled:opacity-50'
                  } ${shake ? 'border-destructive' : ''}`}
                  style={shake ? { animation: 'fade-rise 0.1s' } : undefined}
                >
                  {done && <Check className="size-4 shrink-0" />}
                  {r.role}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {allDone ? 'Барлығы дұрыс сәйкестендірілді.' : 'Тұлғаны, содан кейін рөлді таңда.'}
          </p>
          <CtaButton onClick={next} disabled={!allDone} size="md">
            Жалғастыру
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </SceneFrame>
  )
}
