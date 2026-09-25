'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { REGIONS, type RegionId } from '@/lib/scenario-1465'

interface RegionShape {
  id: RegionId
  path: string
  label: { x: number; y: number }
}

const SHAPES: RegionShape[] = [
  {
    id: 'dqypshaq',
    // The northern and western steppe shown on the historical base map.
    path: 'M65,246 C205,180 434,120 671,81 C872,47 1027,81 1191,154 C1324,213 1459,206 1510,304 L1470,351 C1390,351 1331,330 1263,358 C1150,353 1045,366 965,414 C894,457 857,530 823,588 C733,626 613,584 507,576 C386,578 256,544 153,482 C90,422 64,341 65,246 Z',
    label: { x: 745, y: 304 },
  },
  {
    id: 'moghol',
    // Moghulistan: the south-eastern yellow territory below Zhetysu.
    path: 'M868,575 C946,598 1040,596 1135,585 C1231,575 1344,604 1427,575 C1491,557 1544,545 1587,583 L1565,704 C1514,749 1420,792 1320,819 C1217,847 1134,868 1041,844 C948,820 882,770 862,695 C848,650 844,608 868,575 Z',
    label: { x: 1225, y: 704 },
  },
  {
    id: 'zhetysu',
    // Zhetysu is inside Moghulistan, between the Chu, Talas, Ili and Balkhash.
    path: 'M907,407 C982,361 1081,359 1162,333 C1252,314 1355,319 1433,354 C1481,392 1512,448 1482,500 C1444,556 1365,575 1271,573 C1190,572 1121,593 1049,588 C975,590 906,610 860,571 C832,537 849,457 907,407 Z',
    label: { x: 1305, y: 454 },
  },
]

const ROUTE =
  'M690,364 C790,398 852,432 922,461 C977,484 1024,496 1082,500'

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
  const highlightKey = highlights.join(',')

  // Theory cards change the highlighted region. Do not leave information from
  // the previous card open over the new map state.
  useEffect(() => {
    setInfo(null)
  }, [highlightKey])

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
          viewBox="0 0 1680 945"
          className="block h-auto w-full"
          role="group"
          aria-label="Тарихи аймақтар картасы"
        >
          <defs>
            <filter id="mapHighlight" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#fff4a8" />
            </filter>
          </defs>

          <image href="/images/historical-map-1465.png" width="1680" height="945" />

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
                      ? '#4ecb83'
                      : active
                        ? '#ffbd32'
                        : 'transparent'
                  }
                  fillOpacity={active ? 0.26 : 0}
                  stroke={
                    isCorrect
                      ? '#e8ffe8'
                      : active
                        ? '#fff3ba'
                        : 'transparent'
                  }
                  strokeWidth={active ? 5 : 0}
                  className={`transition-all duration-500 ${
                    interactive && !disabled
                      ? 'cursor-pointer hover:brightness-125 focus:outline-none'
                      : ''
                  }`}
                  style={active ? { filter: 'url(#mapHighlight)' } : undefined}
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
                {active && (
                  <text
                    x={shape.label.x}
                    y={shape.label.y}
                    textAnchor="middle"
                    className="pointer-events-none select-none font-serif"
                    fill="#191307"
                    fontSize="52"
                    fontWeight="700"
                    style={{
                      paintOrder: 'stroke',
                      stroke: '#fff3b0',
                      strokeWidth: 7,
                      strokeLinejoin: 'round',
                    }}
                  >
                    {region.name.toUpperCase()}
                  </text>
                )}
              </g>
            )
          })}

          {showRoute && (
            <g>
              <path
                d={ROUTE}
                fill="none"
                stroke="#783c25"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="2 10"
                style={
                  routeAnimated
                    ? { animation: 'dash-flow 3s linear infinite' }
                    : undefined
                }
              />
              {/* Бастапқы және соңғы нүктелер */}
              <circle cx="690" cy="364" r="11" fill="#783c25" />
              <g>
                <circle cx="1082" cy="500" r="12" fill="#783c25" />
                <circle
                  cx="1082"
                  cy="500"
                  r="12"
                  fill="none"
                  stroke="#783c25"
                  strokeWidth="4"
                  style={{
                    transformOrigin: '1082px 500px',
                    animation: 'pulse-ring 2s ease-out infinite',
                  }}
                />
              </g>
            </g>
          )}
        </svg>

      </div>

      {explorable && info ? (
        <div className="animate-fade-rise relative mt-3 rounded-xl border border-gold/30 bg-card/95 p-4 pr-12 shadow-lg">
          <button
            type="button"
            onClick={() => setInfo(null)}
            className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Мәліметті жабу"
          >
            <X className="size-4" />
          </button>
          <h4 className="font-serif text-lg text-gold">{REGIONS[info].name}</h4>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {REGIONS[info].blurb}
          </p>
        </div>
      ) : explorable ? (
        <p className="mt-2 text-center text-xs text-muted-foreground/70">
          Аймақты басып, мәлімет ал
        </p>
      ) : null}
    </div>
  )
}
