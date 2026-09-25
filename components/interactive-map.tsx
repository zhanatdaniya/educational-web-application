'use client'

import { useState } from 'react'
import { REGIONS, type RegionId } from '@/lib/scenario-1465'

interface RegionShape {
  id: RegionId
  path: string
  label: { x: number; y: number }
}

const SHAPES: RegionShape[] = [
  {
    id: 'dqypshaq',
    // Dasht-i Qipchaq stretched across the steppe north and west of Zhetysu.
    path: 'M76,89 C133,57 222,64 291,80 C356,94 409,126 432,171 C446,203 426,238 389,252 C329,275 241,248 182,261 C126,271 73,239 51,194 C32,153 41,113 76,89 Z',
    label: { x: 232, y: 174 },
  },
  {
    id: 'moghol',
    // Moghulistan lay to the southeast; its western edge reached Zhetysu.
    path: 'M409,262 C457,239 515,257 563,275 C617,296 696,287 738,327 C779,367 758,430 714,456 C658,489 576,464 522,475 C465,486 408,453 387,408 C368,367 378,290 409,262 Z',
    label: { x: 600, y: 406 },
  },
  {
    id: 'zhetysu',
    path: 'M459,278 C485,251 543,256 570,278 C594,297 587,329 563,344 C534,362 485,352 466,330 C451,313 445,294 459,278 Z',
    label: { x: 521, y: 309 },
  },
]

const ROUTE =
  'M233,171 C290,198 334,220 378,247 C423,274 468,289 516,306'

interface InteractiveMapProps {
  highlight?: RegionId | RegionId[]
  showRoute?: boolean
  routeAnimated?: boolean
  explorable?: boolean
  selectable?: boolean
  selected?: RegionId | null
  onSelect?: (r: RegionId) => void
  correctFlash?: RegionId | null
  disabled?: boolean
}

export function InteractiveMap({
  highlight,
  showRoute = false,
  routeAnimated = false,
  explorable = false,
  selectable = false,
  selected = null,
  onSelect,
  correctFlash = null,
  disabled = false,
}: InteractiveMapProps) {
  const [info, setInfo] = useState<RegionId | null>(null)
  const highlights = Array.isArray(highlight)
    ? highlight
    : highlight
      ? [highlight]
      : []

  function handleClick(id: RegionId) {
    if (disabled) return
    if (selectable) {
      onSelect?.(id)
    } else if (explorable) {
      setInfo((prev) => (prev === id ? null : id))
    }
  }

  const interactive = selectable || explorable

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-amber-900/30 bg-[#e8d5a7] shadow-[0_8px_30px_rgba(46,31,13,0.2)]">
        <svg
          viewBox="0 0 800 520"
          className="block h-auto w-full"
          role="group"
          aria-label="Тарихи аймақтар картасы"
        >
          <defs>
            <linearGradient id="mapGlow" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3e6c5" />
              <stop offset="100%" stopColor="#d9c18b" />
            </linearGradient>
            <pattern id="paperGrain" width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="2" r="0.55" fill="#755a30" opacity=".12" />
              <circle cx="7" cy="6" r="0.45" fill="#fff7df" opacity=".28" />
            </pattern>
            <pattern id="steppeHatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">
              <path d="M0 0V12" stroke="#806532" strokeWidth=".7" opacity=".2" />
            </pattern>
          </defs>

          <rect width="800" height="520" fill="url(#mapGlow)" />
          <rect width="800" height="520" fill="url(#paperGrain)" />

          {/* Broad geographic frame and terrain, drawn as an old regional map. */}
          <path d="M0 30 Q102 46 176 25 T332 37 Q445 55 527 31 T800 43 V520 H0Z" fill="#e5d4aa" stroke="#ad8e54" strokeWidth="2" />
          <path d="M22 62 Q139 36 254 68 T454 92 Q417 137 451 194 Q408 243 376 275 Q301 252 228 273 Q106 292 47 222Z" fill="url(#steppeHatch)" opacity=".8" />
          <g fill="none" stroke="#718b78" strokeWidth="2" opacity=".8">
            <path d="M32 346 C126 320 182 341 244 327 S344 319 398 300" />
            <path d="M38 354 C131 329 183 350 247 336 S346 328 402 309" strokeWidth="1" />
            <path d="M220 412 C294 391 336 364 398 350 S474 351 520 374" />
            <path d="M255 457 C310 427 365 416 426 400" strokeWidth="1.4" />
          </g>
          <g fill="#8b6b3d" opacity=".75" stroke="#76592f" strokeWidth="1">
            <path d="M467 198 l15 -29 13 29 13 -38 16 38 13 -25 17 31Z" />
            <path d="M522 239 l15 -27 13 26 14 -35 17 37 15 -26 16 31Z" />
            <path d="M607 246 l13 -23 14 24 13 -34 17 35 13 -20 14 25Z" />
          </g>
          <g fill="#6d5735" fontFamily="Georgia,serif" fontStyle="italic" fontSize="13" opacity=".85">
            <text x="82" y="342">Сырдария</text>
            <text x="290" y="385">Талас</text>
            <text x="370" y="290">Шу</text>
            <text x="564" y="218">Тянь-Шань</text>
            <text x="94" y="450">Арал теңізі</text>
            <text x="623" y="495">Қашғар</text>
          </g>
          <g fill="#65502f" fontFamily="Georgia,serif" fontSize="11" letterSpacing="2" opacity=".62">
            <text x="42" y="34">БАТЫС</text>
            <text x="695" y="34">ШЫҒЫС</text>
          </g>

          {SHAPES.map((shape) => {
            const isHi = highlights.includes(shape.id)
            const isSel = selected === shape.id
            const isCorrect = correctFlash === shape.id
            const active = isHi || isSel || isCorrect
            const region = REGIONS[shape.id]
            return (
              <g key={shape.id}>
                <path
                  d={shape.path}
                  fill={
                    isCorrect
                      ? '#8aab82'
                      : active
                        ? '#d4aa51'
                        : shape.id === 'dqypshaq' ? '#b19a68' : '#739078'
                  }
                  stroke={
                    isCorrect
                      ? '#476648'
                      : active
                        ? '#9b6e27'
                        : '#665638'
                  }
                  strokeWidth={active ? 2.5 : 1.3}
                  strokeDasharray={active ? undefined : '5 3'}
                  className={`transition-all duration-500 ${
                    interactive && !disabled
                      ? 'cursor-pointer hover:brightness-125 focus:outline-none'
                      : ''
                  }`}
                  style={active ? { filter: 'drop-shadow(0 0 5px #fff0bd)' } : undefined}
                  role={interactive ? 'button' : undefined}
                  tabIndex={interactive && !disabled ? 0 : undefined}
                  aria-label={region.name}
                  aria-pressed={selectable ? isSel : undefined}
                  onClick={() => handleClick(shape.id)}
                  onKeyDown={(e) => {
                    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      handleClick(shape.id)
                    }
                  }}
                />
                <text
                  x={shape.label.x}
                  y={shape.label.y}
                  textAnchor="middle"
                  className="pointer-events-none select-none font-serif"
                  fill="#3d3020"
                  fontSize="17"
                  fontWeight={600}
                  style={{ paintOrder: 'stroke', stroke: '#efdfb7', strokeWidth: 3, strokeLinejoin: 'round' }}
                >
                  {region.name}
                </text>
              </g>
            )
          })}

          {showRoute && (
            <g>
              <path
                d={ROUTE}
                fill="none"
                stroke="#783c25"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="2 10"
                style={
                  routeAnimated
                    ? { animation: 'dash-flow 3s linear infinite' }
                    : undefined
                }
              />
              {/* Бастапқы және соңғы нүктелер */}
              <circle cx="233" cy="171" r="5" fill="#783c25" />
              <g>
                <circle cx="516" cy="306" r="6" fill="#783c25" />
                <circle
                  cx="516"
                  cy="306"
                  r="6"
                  fill="none"
                  stroke="#783c25"
                  strokeWidth="2"
                  style={{
                    transformOrigin: '516px 306px',
                    animation: 'pulse-ring 2s ease-out infinite',
                  }}
                />
              </g>
            </g>
          )}
        </svg>

        {explorable && info && (
          <div className="animate-fade-rise absolute bottom-3 left-3 right-3 rounded-xl border border-gold/30 bg-popover/95 p-4 backdrop-blur-md sm:max-w-sm">
            <h4 className="font-serif text-lg text-gold">{REGIONS[info].name}</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {REGIONS[info].blurb}
            </p>
          </div>
        )}
      </div>

      {explorable && !info && (
        <p className="mt-2 text-center text-xs text-muted-foreground/70">
          Аймақты басып, мәлімет ал
        </p>
      )}
    </div>
  )
}
