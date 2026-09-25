'use client'

import { useState } from 'react'
import { GameProvider, useGame } from '@/lib/game-engine'
import { IntroScreen } from '@/components/screens/intro-screen'
import { TeacherScreen } from '@/components/screens/teacher-screen'
import { PeriodIntroScreen } from '@/components/screens/period-intro-screen'
import { TheoryScreen } from '@/components/screens/theory-screen'
import { MicroMatchScreen } from '@/components/screens/micro-match-screen'
import { MicroMapScreen } from '@/components/screens/micro-map-screen'
import { MicroQuickScreen } from '@/components/screens/micro-quick-screen'
import { TheoryCompleteScreen } from '@/components/screens/theory-complete-screen'
import { SimIntroScreen } from '@/components/screens/sim-intro-screen'
import { DecisionScreen } from '@/components/screens/decision-screen'
import { ConsequenceScreen } from '@/components/screens/consequence-screen'
import { KhanateScreen } from '@/components/screens/khanate-screen'
import { RealHistoryScreen } from '@/components/screens/real-history-screen'
import { FinalQuizScreen } from '@/components/screens/final-quiz-screen'
import { ResultScreen } from '@/components/screens/result-screen'

function Experience() {
  const { scene } = useGame()
  const [showTeacher, setShowTeacher] = useState(false)

  if (scene === 'intro') {
    return showTeacher ? (
      <TeacherScreen onBack={() => setShowTeacher(false)} />
    ) : (
      <IntroScreen onTeacher={() => setShowTeacher(true)} />
    )
  }

  switch (scene) {
    case 'period-intro':
      return <PeriodIntroScreen />
    case 'theory':
      return <TheoryScreen />
    case 'micro-1':
      return <MicroMatchScreen />
    case 'micro-2':
      return <MicroMapScreen />
    case 'micro-3':
      return <MicroQuickScreen />
    case 'theory-complete':
      return <TheoryCompleteScreen />
    case 'sim-intro':
      return <SimIntroScreen />
    case 'decision-1':
      return <DecisionScreen index={0} />
    case 'consequence-1':
      return <ConsequenceScreen index={0} />
    case 'decision-2':
      return <DecisionScreen index={1} />
    case 'consequence-2':
      return <ConsequenceScreen index={1} />
    case 'decision-3':
      return <DecisionScreen index={2} />
    case 'consequence-3':
      return <ConsequenceScreen index={2} />
    case 'decision-4':
      return <DecisionScreen index={3} />
    case 'consequence-4':
      return <ConsequenceScreen index={3} />
    case 'decision-5':
      return <DecisionScreen index={4} />
    case 'khanate':
      return <KhanateScreen />
    case 'real-history':
      return <RealHistoryScreen />
    case 'final-quiz':
      return <FinalQuizScreen />
    case 'result':
      return <ResultScreen />
    default:
      return null
  }
}

export default function Page() {
  return (
    <GameProvider>
      <main className="min-h-[100dvh] bg-background">
        <Experience />
      </main>
    </GameProvider>
  )
}
