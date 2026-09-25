'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import {
  INITIAL_INDICATORS,
  type IndicatorKey,
} from './scenario-1465'

// Жалпы ойын қозғалтқышы. Сахналар (scenes) тізбегі арқылы жүреді.
// scenario_1465 деректері бөлек тұрады — жаңа сценарийлерді қосуға болады.

export type SceneId =
  | 'intro'
  | 'period-intro'
  | 'theory'
  | 'micro-1'
  | 'micro-2'
  | 'micro-3'
  | 'theory-complete'
  | 'sim-intro'
  | 'decision-1'
  | 'consequence-1'
  | 'decision-2'
  | 'consequence-2'
  | 'decision-3'
  | 'consequence-3'
  | 'decision-4'
  | 'consequence-4'
  | 'decision-5'
  | 'khanate'
  | 'real-history'
  | 'final-quiz'
  | 'result'

export const SCENES: SceneId[] = [
  'intro',
  'period-intro',
  'theory',
  'micro-1',
  'micro-2',
  'micro-3',
  'theory-complete',
  'sim-intro',
  'decision-1',
  'consequence-1',
  'decision-2',
  'consequence-2',
  'decision-3',
  'consequence-3',
  'decision-4',
  'consequence-4',
  'decision-5',
  'khanate',
  'real-history',
  'final-quiz',
  'result',
]

// Прогресс жолағы үшін негізгі фазалар
const PHASE_OF: Record<SceneId, number> = {
  intro: 0,
  'period-intro': 1,
  theory: 1,
  'micro-1': 1,
  'micro-2': 1,
  'micro-3': 1,
  'theory-complete': 1,
  'sim-intro': 2,
  'decision-1': 2,
  'consequence-1': 2,
  'decision-2': 2,
  'consequence-2': 2,
  'decision-3': 2,
  'consequence-3': 2,
  'decision-4': 2,
  'consequence-4': 2,
  'decision-5': 2,
  khanate: 2,
  'real-history': 3,
  'final-quiz': 4,
  result: 5,
}

export const PHASES = [
  { id: 1, label: 'Тарих' },
  { id: 2, label: 'Симуляция' },
  { id: 3, label: 'Нақты тарих' },
  { id: 4, label: 'Тест' },
  { id: 5, label: 'Нәтиже' },
]

interface State {
  scene: SceneId
  indicators: Record<IndicatorKey, number>
  decisions: Record<string, string> // decisionId -> optionId
  microCorrect: Record<string, boolean>
  finalCorrect: Record<string, boolean>
  simDecisionCount: number
  session: { role: 'student' | 'teacher' | null; code: string | null }
}

const initialState: State = {
  scene: 'intro',
  indicators: { ...INITIAL_INDICATORS },
  decisions: {},
  microCorrect: {},
  finalCorrect: {},
  simDecisionCount: 0,
  session: { role: null, code: null },
}

type Action =
  | { type: 'GOTO'; scene: SceneId }
  | { type: 'NEXT' }
  | {
      type: 'DECIDE'
      decisionId: string
      optionId: string
      effects: Partial<Record<IndicatorKey, number>>
    }
  | { type: 'MICRO'; id: string; correct: boolean }
  | { type: 'FINAL'; id: string; correct: boolean }
  | { type: 'SET_SESSION'; role: 'student' | 'teacher'; code: string }
  | { type: 'RESTART' }
  | { type: 'REPLAY_THEORY' }

function clamp(n: number) {
  return Math.max(0, Math.min(100, n))
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'GOTO':
      return { ...state, scene: action.scene }
    case 'NEXT': {
      const idx = SCENES.indexOf(state.scene)
      const next = SCENES[Math.min(idx + 1, SCENES.length - 1)]
      return { ...state, scene: next }
    }
    case 'DECIDE': {
      const indicators = { ...state.indicators }
      for (const key of Object.keys(action.effects) as IndicatorKey[]) {
        indicators[key] = clamp(indicators[key] + (action.effects[key] ?? 0))
      }
      const isNew = state.decisions[action.decisionId] === undefined
      return {
        ...state,
        indicators,
        decisions: { ...state.decisions, [action.decisionId]: action.optionId },
        simDecisionCount: isNew
          ? state.simDecisionCount + 1
          : state.simDecisionCount,
      }
    }
    case 'MICRO':
      return {
        ...state,
        microCorrect: { ...state.microCorrect, [action.id]: action.correct },
      }
    case 'FINAL':
      return {
        ...state,
        finalCorrect: { ...state.finalCorrect, [action.id]: action.correct },
      }
    case 'SET_SESSION':
      return {
        ...state,
        session: { role: action.role, code: action.code },
      }
    case 'RESTART':
      return {
        ...initialState,
        indicators: { ...INITIAL_INDICATORS },
        session: state.session,
        scene: 'intro',
      }
    case 'REPLAY_THEORY':
      return {
        ...initialState,
        indicators: { ...INITIAL_INDICATORS },
        session: state.session,
        scene: 'period-intro',
      }
    default:
      return state
  }
}

interface GameContextValue extends State {
  next: () => void
  goTo: (scene: SceneId) => void
  decide: (
    decisionId: string,
    optionId: string,
    effects: Partial<Record<IndicatorKey, number>>,
  ) => void
  recordMicro: (id: string, correct: boolean) => void
  recordFinal: (id: string, correct: boolean) => void
  setSession: (role: 'student' | 'teacher', code: string) => void
  restart: () => void
  replayTheory: () => void
  phase: number
  finalScore: number
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const next = useCallback(() => dispatch({ type: 'NEXT' }), [])
  const goTo = useCallback(
    (scene: SceneId) => dispatch({ type: 'GOTO', scene }),
    [],
  )
  const decide = useCallback(
    (
      decisionId: string,
      optionId: string,
      effects: Partial<Record<IndicatorKey, number>>,
    ) => dispatch({ type: 'DECIDE', decisionId, optionId, effects }),
    [],
  )
  const recordMicro = useCallback(
    (id: string, correct: boolean) => dispatch({ type: 'MICRO', id, correct }),
    [],
  )
  const recordFinal = useCallback(
    (id: string, correct: boolean) => dispatch({ type: 'FINAL', id, correct }),
    [],
  )
  const setSession = useCallback(
    (role: 'student' | 'teacher', code: string) =>
      dispatch({ type: 'SET_SESSION', role, code }),
    [],
  )
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), [])
  const replayTheory = useCallback(() => dispatch({ type: 'REPLAY_THEORY' }), [])

  const finalScore = useMemo(
    () => Object.values(state.finalCorrect).filter(Boolean).length,
    [state.finalCorrect],
  )

  const value: GameContextValue = {
    ...state,
    next,
    goTo,
    decide,
    recordMicro,
    recordFinal,
    setSession,
    restart,
    replayTheory,
    phase: PHASE_OF[state.scene],
    finalScore,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
