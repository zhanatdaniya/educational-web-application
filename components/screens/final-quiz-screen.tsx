'use client'

import { useMemo, useState } from 'react'
import { useGame } from '@/lib/game-engine'
import { FINAL_QUIZ, type FinalQuestion, type RegionId } from '@/lib/scenario-1465'
import { InteractiveMap } from '@/components/interactive-map'
import { PhaseProgress } from '@/components/phase-progress'
import { CtaButton } from '@/components/cta-button'
import { SceneFrame } from '@/components/scene-frame'
import { ArrowRight, Check, X, Lightbulb } from 'lucide-react'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function FinalQuizScreen() {
  const { next, recordFinal } = useGame()
  const [qIndex, setQIndex] = useState(0)
  const [done, setDone] = useState(false)
  const q = FINAL_QUIZ[qIndex]
  const total = FINAL_QUIZ.length
  const last = qIndex === total - 1

  function handleDone(correct: boolean) {
    recordFinal(q.id, correct)
    setDone(true)
  }

  function advance() {
    if (last) {
      next()
    } else {
      setQIndex((i) => i + 1)
      setDone(false)
    }
  }

  return (
    <SceneFrame>
      <PhaseProgress />
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold-soft">
            Қорытынды тест
          </span>
          <span className="text-sm font-semibold tabular-nums text-muted-foreground">
            {qIndex + 1} / {total}
          </span>
        </div>

        <h2 className="font-serif text-2xl font-bold text-parchment sm:text-3xl">
          {q.prompt}
        </h2>

        <div className="mt-6" key={q.id}>
          <QuestionBody question={q} done={done} onDone={handleDone} />
        </div>

        {done && (
          <div className="animate-fade-rise mt-5 flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/5 p-4">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-gold" />
            <p className="text-sm leading-relaxed text-foreground/90">
              {q.explanation}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <CtaButton onClick={advance} disabled={!done} size="md">
            {last ? 'Нәтижені көру' : 'Келесі сұрақ'}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>
    </SceneFrame>
  )
}

function QuestionBody({
  question,
  done,
  onDone,
}: {
  question: FinalQuestion
  done: boolean
  onDone: (correct: boolean) => void
}) {
  if (question.kind === 'choice') return <ChoiceQ q={question} done={done} onDone={onDone} />
  if (question.kind === 'map') return <MapQ q={question} done={done} onDone={onDone} />
  if (question.kind === 'match') return <MatchQ q={question} done={done} onDone={onDone} />
  return <OrderQ q={question} done={done} onDone={onDone} />
}

function ChoiceQ({
  q,
  done,
  onDone,
}: {
  q: Extract<FinalQuestion, { kind: 'choice' }>
  done: boolean
  onDone: (c: boolean) => void
}) {
  const [chosen, setChosen] = useState<string | null>(null)
  return (
    <div className="space-y-3">
      {q.options.map((opt) => {
        const isChosen = chosen === opt.id
        const showCorrect = done && opt.correct
        const showWrong = done && isChosen && !opt.correct
        return (
          <button
            key={opt.id}
            disabled={done}
            onClick={() => {
              setChosen(opt.id)
              onDone(opt.correct)
            }}
            className={`flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left font-medium transition-all disabled:cursor-default ${
              showCorrect
                ? 'border-jade/50 bg-jade/10 text-jade'
                : showWrong
                  ? 'border-destructive/50 bg-destructive/10'
                  : 'border-border bg-card/60 enabled:hover:border-gold/50 enabled:hover:bg-gold/5'
            }`}
          >
            {opt.label}
            {showCorrect && <Check className="size-5 shrink-0" />}
            {showWrong && <X className="size-5 shrink-0 text-destructive" />}
          </button>
        )
      })}
    </div>
  )
}

function MapQ({
  q,
  done,
  onDone,
}: {
  q: Extract<FinalQuestion, { kind: 'map' }>
  done: boolean
  onDone: (c: boolean) => void
}) {
  const [selected, setSelected] = useState<RegionId | null>(null)
  return (
    <InteractiveMap
      selectable={!done}
      selected={selected}
      correctFlash={done && selected === q.correctRegion ? q.correctRegion : null}
      onSelect={(r) => {
        setSelected(r)
        onDone(r === q.correctRegion)
      }}
    />
  )
}

function MatchQ({
  q,
  done,
  onDone,
}: {
  q: Extract<FinalQuestion, { kind: 'match' }>
  done: boolean
  onDone: (c: boolean) => void
}) {
  const roles = useMemo(() => shuffle(q.pairs.map((p, i) => ({ ...p, idx: i }))), [q])
  const [activePerson, setActivePerson] = useState<number | null>(null)
  const [matched, setMatched] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<number | null>(null)
  const [hadWrong, setHadWrong] = useState(false)

  function pickRole(idx: number) {
    if (activePerson === null) return
    if (activePerson === idx) {
      const nm = { ...matched, [idx]: true }
      setMatched(nm)
      setActivePerson(null)
      if (Object.keys(nm).length === q.pairs.length) {
        onDone(!hadWrong)
      }
    } else {
      setHadWrong(true)
      setWrong(idx)
      setTimeout(() => setWrong(null), 400)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2.5">
        {q.pairs.map((p, i) => {
          const m = matched[i]
          const active = activePerson === i
          return (
            <button
              key={p.person}
              disabled={m || done}
              onClick={() => setActivePerson(active ? null : i)}
              className={`flex w-full items-center justify-between rounded-lg border p-3 text-left text-sm font-medium transition-all ${
                m
                  ? 'border-jade/40 bg-jade/10 text-jade'
                  : active
                    ? 'border-gold bg-gold/15 text-gold'
                    : 'border-border bg-card/60 hover:border-gold/40'
              }`}
            >
              {p.person}
              {m && <Check className="size-4" />}
            </button>
          )
        })}
      </div>
      <div className="space-y-2.5">
        {roles.map((r) => {
          const m = matched[r.idx]
          const shake = wrong === r.idx
          return (
            <button
              key={r.role}
              disabled={m || done || activePerson === null}
              onClick={() => pickRole(r.idx)}
              className={`w-full rounded-lg border p-3 text-left text-sm transition-all ${
                m
                  ? 'border-jade/40 bg-jade/10 text-jade'
                  : 'border-border bg-card/60 enabled:hover:border-gold/40 disabled:opacity-50'
              } ${shake ? 'border-destructive' : ''}`}
            >
              {r.role}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function OrderQ({
  q,
  done,
  onDone,
}: {
  q: Extract<FinalQuestion, { kind: 'order' }>
  done: boolean
  onDone: (c: boolean) => void
}) {
  const shuffled = useMemo(() => shuffle(q.items.map((t, i) => ({ t, i }))), [q])
  const [order, setOrder] = useState<number[]>([])

  function pick(originalIndex: number) {
    if (done) return
    const nextOrder = [...order, originalIndex]
    setOrder(nextOrder)
    if (nextOrder.length === q.items.length) {
      const correct = nextOrder.every((v, i) => v === i)
      onDone(correct)
    }
  }

  function reset() {
    if (done) return
    setOrder([])
  }

  return (
    <div>
      <div className="mb-4 min-h-14 rounded-xl border border-dashed border-gold/30 bg-card/40 p-3">
        {order.length === 0 ? (
          <p className="py-1 text-sm text-muted-foreground">
            Оқиғаларды дұрыс реттілікпен басып таңда:
          </p>
        ) : (
          <ol className="flex flex-wrap gap-2">
            {order.map((oi, pos) => (
              <li
                key={pos}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gold/40 bg-gold/10 px-3 py-1.5 text-sm text-gold"
              >
                <span className="font-serif font-bold">{pos + 1}.</span>
                {q.items[oi]}
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {shuffled.map(({ t, i }) => {
          const used = order.includes(i)
          return (
            <button
              key={i}
              disabled={used || done}
              onClick={() => pick(i)}
              className="rounded-lg border border-border bg-card/60 px-3 py-2 text-sm transition-all enabled:hover:border-gold/50 enabled:hover:bg-gold/5 disabled:opacity-30"
            >
              {t}
            </button>
          )
        })}
      </div>

      {!done && order.length > 0 && (
        <button
          onClick={reset}
          className="mt-3 text-xs text-muted-foreground underline-offset-4 hover:text-gold hover:underline"
        >
          Қайта бастау
        </button>
      )}
    </div>
  )
}
