'use client'

import { useState } from 'react'
import { useGame } from '@/lib/game-engine'
import { CtaButton } from '@/components/cta-button'
import { SceneFrame } from '@/components/scene-frame'
import { ArrowLeft, Users, Copy, Check, Play } from 'lucide-react'

const SESSION_CODE = '1465-KZ'

export function TeacherScreen({ onBack }: { onBack: () => void }) {
  const { setSession, goTo } = useGame()
  const [started, setStarted] = useState(false)
  const [joined, setJoined] = useState(0)
  const [copied, setCopied] = useState(false)

  function startSession() {
    setStarted(true)
    // Оқушылардың қосылуын имитациялау
    let n = 0
    const timer = setInterval(() => {
      n += Math.ceil(Math.random() * 4)
      if (n >= 24) {
        n = 24
        clearInterval(timer)
      }
      setJoined(n)
    }, 350)
  }

  function copyCode() {
    navigator.clipboard?.writeText(SESSION_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  function beginLesson() {
    setSession('teacher', SESSION_CODE)
    goTo('period-intro')
  }

  return (
    <SceneFrame center>
      <div className="w-full max-w-lg">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-4" />
          Артқа
        </button>

        <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-soft">
          Мұғалім режимі
        </span>
        <h2 className="mt-3 font-serif text-3xl font-bold text-parchment sm:text-4xl">
          Сабақ сессиясы
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Сынып сессиясын бастаңыз. Оқушылар кодты енгізіп қосылады, содан кейін
          симуляцияны бірге өтесіздер.
        </p>

        {!started ? (
          <div className="mt-10">
            <CtaButton onClick={startSession} className="min-w-[220px]">
              <Play className="size-5" />
              Сабақ бастау
            </CtaButton>
          </div>
        ) : (
          <div className="animate-fade-rise mt-10 space-y-6">
            <div className="rounded-2xl border border-gold/30 bg-card/70 p-6 backdrop-blur-sm gold-glow">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Session code
              </p>
              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="font-serif text-4xl font-bold tracking-wider text-gold">
                  {SESSION_CODE}
                </span>
                <button
                  onClick={copyCode}
                  aria-label="Кодты көшіру"
                  className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-gold"
                >
                  {copied ? (
                    <Check className="size-4 text-jade" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Оқушылар осы кодты енгізеді
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-lg font-medium text-foreground">
              <Users className="size-5 text-gold-soft" />
              <span className="tabular-nums">{joined}</span> оқушы қосылды
            </div>

            <CtaButton onClick={beginLesson} className="min-w-[220px]" disabled={joined < 1}>
              Сабақты бастау
              <Play className="size-4" />
            </CtaButton>
          </div>
        )}
      </div>
    </SceneFrame>
  )
}
