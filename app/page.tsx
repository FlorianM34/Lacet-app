'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

const KM_TOTAL = 14

function AppStoreBadge({ store }: { store: 'apple' | 'google' }) {
  return (
    <a
      href="#"
      aria-label={store === 'apple' ? 'Télécharger sur App Store' : 'Télécharger sur Google Play'}
      className="inline-flex items-center gap-3 bg-ink text-paper pl-4 pr-5 py-3 rounded-[14px] shadow-[0_1px_2px_rgba(61,52,43,0.1),0_8px_22px_-10px_rgba(61,52,43,0.3)] hover:bg-forest-deep hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(42,90,66,0.15),0_16px_30px_-14px_rgba(42,90,66,0.45)] transition-all duration-200"
    >
      {store === 'apple' ? (
        <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.3-2.18 3.87.03 3.02 2.65 4.03 2.68 4.04l-.05.17zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ) : (
        <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.18 23.76c.35.2.74.24 1.12.14L15.34 12 12 8.66 3.18 23.76zM20.5 10.61L17.7 9 15 12l2.7 3 2.8-1.61c.8-.46.8-2.32 0-2.78zM1.86.29C1.54.7 1.36 1.28 1.36 2v20c0 .72.18 1.3.5 1.71L12 12 1.86.29zM15.34 12L4.3.1A1.78 1.78 0 0 0 3.18.24L15.34 12z" />
        </svg>
      )}
      <span className="flex flex-col leading-tight">
        <small className="text-[10px] opacity-75 font-normal tracking-wider">Disponible sur</small>
        <strong className="text-sm font-semibold tracking-tight">
          {store === 'apple' ? 'App Store' : 'Google Play'}
        </strong>
      </span>
    </a>
  )
}

function MountainBackdrop() {
  return (
    <div className="mountain-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-x-0 bottom-0 w-full h-[40vh] min-h-[240px] md:h-[60vh] md:min-h-[360px]"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Range arrière — la plus lointaine */}
        <path
          d="M0 420 L90 330 L170 380 L260 280 L360 360 L460 300 L560 370 L660 290 L780 350 L880 300 L980 360 L1090 290 L1200 350 L1310 310 L1440 360 L1440 600 L0 600 Z"
          fill="var(--forest)"
          opacity="0.18"
          strokeLinejoin="round"
        />
        {/* Range médiane */}
        <path
          d="M0 480 L110 390 L210 440 L320 360 L430 420 L540 370 L660 430 L780 360 L900 420 L1010 370 L1130 430 L1240 380 L1340 430 L1440 400 L1440 600 L0 600 Z"
          fill="var(--forest)"
          opacity="0.32"
          strokeLinejoin="round"
        />
        {/* Range avant — la plus proche */}
        <path
          d="M0 540 L90 470 L180 510 L290 440 L400 500 L510 460 L620 510 L740 450 L860 500 L970 460 L1090 510 L1200 460 L1310 500 L1440 470 L1440 600 L0 600 Z"
          fill="var(--forest-deep)"
          opacity="0.55"
          strokeLinejoin="round"
        />
        {/* Mini logos sur les pentes — range arrière */}
        {/* Pente montante (170,380)→(260,280) à 35% : angle -48° */}
        <image href="/logo.png" x="178" y="308" width="48" height="48" opacity="0.3" transform="rotate(-60, 202, 345)" />
        {/* Pente descendante (460,300)→(560,370) à 40% : angle +35° */}
        <image href="/logo.png" x="477" y="297" width="46" height="46" opacity="0.4" transform="rotate(15, 500, 328)" />
        {/* Pente montante (780,350)→(880,300) à mi-pente : angle -27° */}
        <image href="/logo.png" x="808" y="370" width="44" height="44" opacity="0.5" transform="rotate(-27, 830, 325)" />
        {/* Pente descendante (1090,290)→(1200,350) à 40% : angle +29° */}
        <image href="/logo.png" x="1111" y="280" width="46" height="46" opacity="0.6" transform="rotate(15, 1134, 314)" />
        {/* Pente montante range médiane (210,440)→(320,360) à 40% : angle -36° */}
        <image href="/logo.png" x="233" y="377" width="42" height="42" opacity="0.6" transform="rotate(-36, 254, 408)" />
      </svg>
    </div>
  )
}

function PhoneMockup() {
  return (
    <div
      className="w-[220px] sm:w-[240px] md:w-[270px] rotate-[-3deg] rounded-[36px] md:rounded-[44px] border-[4px] md:border-[5px] border-gray-800 overflow-hidden shadow-[0_3px_6px_rgba(61,52,43,0.1),0_30px_60px_-20px_rgba(61,52,43,0.35),0_10px_20px_-10px_rgba(61,52,43,0.2)]"
    >
      <Image
        src="/app-screenshot.png"
        alt="Capture d'écran de l'application Lacet — écran Explorer"
        width={260}
        height={562}
        className="block w-full h-auto"
        priority
      />
    </div>
  )
}

function TopoCard({
  className,
  style,
  label,
  children,
}: {
  className?: string
  style?: React.CSSProperties
  label: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`absolute bg-[var(--surface-strong)] border border-line rounded-2xl px-4 py-3.5 shadow-topo font-mono text-[11px] text-ink-soft leading-normal max-w-[240px] backdrop-blur-sm ${
        className ?? ''
      }`}
      style={style}
    >
      <span className="block text-stone text-[10px] tracking-widest uppercase mb-1">{label}</span>
      {children}
    </div>
  )
}

type FeatureRow = {
  id: number
  side: 'left' | 'right'
  tag: string
  title: string
  desc: string
  label: string
  stats: { k: string; v: string }[]
  icon: React.ReactNode
}

const FEATURES: FeatureRow[] = [
  {
    id: 1,
    side: 'left',
    tag: '— feed par swipe',
    title: 'Glisse à droite pour rejoindre.',
    desc: "Un feed géolocalisé de randonnées près de chez toi. Filtre par rayon, niveau et période — swipe à droite pour rejoindre, à gauche pour passer. Simple comme Tinder.",
    label: 'explorer',
    stats: [
      { k: 'Niveaux', v: 'Facile → Expert' },
      { k: 'Limite', v: '3 randos actives' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    ),
  },
  {
    id: 2,
    side: 'right',
    tag: '— organiser',
    title: 'Publie, accepte, gère ton groupe.',
    desc: "Importe un fichier GPX et publie ta rando en quelques secondes. Choisis entre acceptation automatique ou validation manuelle — tu restes maître de ton groupe.",
    label: 'organiser',
    stats: [
      { k: 'Import', v: 'GPX' },
      { k: 'Validation', v: 'auto ou manuelle' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" />
        <path d="M9 3v15M15 6v15" />
      </svg>
    ),
  },
  {
    id: 3,
    side: 'left',
    tag: '— chat de groupe',
    title: 'Coordonne sans quitter l\'appli.',
    desc: "Un chat dédié s'ouvre dès que le groupe est formé. Épingle le message de rendez-vous (lieu + heure), reçois les notifications en temps réel. Fini les groupes WhatsApp.",
    label: 'chat',
    stats: [
      { k: 'RDV', v: 'message épinglable' },
      { k: 'Notifs', v: 'push temps réel' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a8 8 0 1 1-3.9-6.86L21 4l-.86 3.9A7.97 7.97 0 0 1 21 12z" />
        <path d="M8 11h.01M12 11h.01M16 11h.01" />
      </svg>
    ),
  },
  {
    id: 4,
    side: 'right',
    tag: '— notes & badges',
    title: 'La confiance se mérite, et se voit.',
    desc: "Après chaque sortie, note tes compagnons (1 à 5 étoiles). Les avis restent secrets jusqu'à la révélation collective — ou au bout de 48h. Ton score moyen est public.",
    label: 'confiance',
    stats: [
      { k: 'Notes', v: 'révélation collective' },
      { k: 'Badges', v: '9 débloquables' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.8 6.8 19.2l1-5.9L3.5 9.2l5.9-.8L12 3z" />
      </svg>
    ),
  },
]


function Waypoint({ id, label }: { id: number; label: string }) {
  return (
    <div
      className="wp hidden md:flex justify-center items-center relative z-[3] col-start-2"
      data-waypoint-id={id}
    >
      <div className="wp-inner grid place-items-center w-14 h-14 rounded-full bg-paper border-2 border-line shadow-topo font-mono text-[11px] text-ink-soft tracking-wider relative transition-[border-color,transform,background,color] duration-[400ms]">
        {String(id).padStart(2, '0')}
      </div>
      <span className="absolute top-full mt-2.5 font-mono text-[10px] text-stone tracking-[0.1em] uppercase whitespace-nowrap">
        <span data-waypoint-km>km —</span> · {label}
      </span>
    </div>
  )
}

export default function HomePage() {
  const mainRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const baseRef = useRef<SVGPathElement>(null)
  const progRef = useRef<SVGPathElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const pillLabelRef = useRef<HTMLSpanElement>(null)
  const pillFillRef = useRef<HTMLSpanElement>(null)
  const summitRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = mainRef.current
    const svg = svgRef.current
    const base = baseRef.current
    const prog = progRef.current
    const pill = pillRef.current
    const pillLabel = pillLabelRef.current
    const pillFill = pillFillRef.current
    const summit = summitRef.current
    if (!main || !svg || !base || !prog || !pill || !pillLabel || !pillFill) return

    let totalLength = 0
    let trailStartY = 0
    let trailEndY = 0

    function buildPath() {
      if (!main || !svg || !base || !prog) return
      const pagePx = main.offsetHeight
      const pageWidth = main.offsetWidth

      svg.setAttribute('viewBox', `0 0 ${pageWidth} ${pagePx}`)
      svg.style.height = pagePx + 'px'

      const cx = pageWidth / 2
      const amp = Math.min(90, pageWidth * 0.07)

      const waypointEls = Array.from(document.querySelectorAll<HTMLElement>('[data-waypoint-id]'))
      const waypointPositions = waypointEls.map((el) => {
        const r = el.getBoundingClientRect()
        return { y: r.top + window.scrollY + r.height / 2 }
      })

      const startY = Math.max(window.innerHeight * 0.78, 500)
      let endY = pagePx - 420
      if (summit) {
        const r = summit.getBoundingClientRect()
        endY = r.top + window.scrollY + 30
      }

      waypointEls.forEach((el, i) => {
        const wpY = waypointPositions[i].y
        const ratio = endY > startY ? (wpY - startY) / (endY - startY) : 0
        const clamped = Math.max(0, Math.min(1, ratio))
        const kmEl = el.querySelector<HTMLElement>('[data-waypoint-km]')
        if (kmEl) kmEl.textContent = `km ${(clamped * KM_TOTAL).toFixed(1)}`
      })

      const steps = 40
      const pts: { x: number; y: number }[] = [{ x: cx, y: startY }]
      for (let i = 1; i <= steps; i++) {
        const t = i / steps
        const y = startY + (endY - startY) * t
        let xOff = Math.sin(t * Math.PI * 5) * amp
        for (const wp of waypointPositions) {
          const dist = Math.abs(y - wp.y)
          if (dist < 90) xOff *= dist / 90
        }
        pts.push({ x: cx + xOff, y })
      }

      let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)]
        const p1 = pts[i]
        const p2 = pts[i + 1]
        const p3 = pts[Math.min(pts.length - 1, i + 2)]
        const cp1x = p1.x + (p2.x - p0.x) / 6
        const cp1y = p1.y + (p2.y - p0.y) / 6
        const cp2x = p2.x - (p3.x - p1.x) / 6
        const cp2y = p2.y - (p3.y - p1.y) / 6
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
      }

      base.setAttribute('d', d)
      prog.setAttribute('d', d)

      totalLength = prog.getTotalLength()
      prog.style.strokeDasharray = String(totalLength)
      prog.style.strokeDashoffset = String(totalLength)

      trailStartY = startY
      trailEndY = endY
    }

    let rafPending = false
    function onScroll() {
      if (rafPending) return
      rafPending = true
      requestAnimationFrame(() => {
        rafPending = false
        if (!main || !prog || !pill || !pillLabel || !pillFill) return
        const sy = window.scrollY
        const vh = window.innerHeight

        if (sy > vh * 0.6) pill.classList.add('visible')
        else pill.classList.remove('visible')

        const focus = sy + vh * 0.5
        const raw = trailEndY > trailStartY
          ? (focus - trailStartY) / (trailEndY - trailStartY)
          : 0
        const p = Math.max(0, Math.min(1, raw))

        prog.style.strokeDashoffset = String(totalLength * (1 - p))

        pillLabel.textContent = `km ${(p * KM_TOTAL).toFixed(1)}`
        pillFill.style.width = p * 100 + '%'

        document.querySelectorAll<HTMLElement>('[data-waypoint-id]').forEach((el) => {
          const rect = el.getBoundingClientRect()
          const elY = rect.top + sy + rect.height / 2
          const featureCard = el.closest('.feature-row')?.querySelector<HTMLElement>('.feature-card')
          if (focus >= elY) {
            el.classList.add('visited')
            featureCard?.classList.add('trail-reached')
          } else {
            el.classList.remove('visited')
            featureCard?.classList.remove('trail-reached')
          }
        })

        document.querySelectorAll<HTMLElement>('.fade-in').forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.top < vh * 0.88) el.classList.add('visible')
        })

        if (summit) {
          const r = summit.getBoundingClientRect()
          if (r.top < vh * 0.7) summit.classList.add('arrived')
        }
      })
    }

    function onResize() {
      buildPath()
      onScroll()
    }

    buildPath()
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        buildPath()
        onScroll()
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <Nav />

      <MountainBackdrop />

      <main ref={mainRef} className="relative z-[1]">
        {/* Trail SVG layer */}
        <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block">
          <svg
            ref={svgRef}
            className="w-full h-full block overflow-visible"
            preserveAspectRatio="none"
          >
            <path
              ref={baseRef}
              fill="none"
              stroke="var(--line)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="6 8"
            />
            <path
              ref={progRef}
              fill="none"
              stroke="var(--forest)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="6 8"
              style={{ filter: 'drop-shadow(0 1px 2px rgba(58,124,90,0.25))' }}
            />
          </svg>
        </div>

        {/* HERO */}
        <section className="relative pt-24 pb-16 md:min-h-screen md:pt-32 md:pb-24 flex items-center overflow-hidden">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-7 w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-14 items-center relative z-[2]">
            <div>
              <span className="inline-flex items-center gap-2.5 pl-2.5 pr-3.5 py-[7px] bg-[var(--surface-strong)] border border-line rounded-full font-mono text-xs text-ink-soft tracking-wider shadow-topo mb-7">
                <span className="pulse w-2 h-2 rounded-full bg-forest" />
                iOS & Android · gratuit
              </span>
              <h1
                className="font-sans font-bold text-ink m-0 mb-6"
                style={{
                  fontSize: 'clamp(34px, 8vw, 68px)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.028em',
                  textWrap: 'balance',
                }}
              >
                Randonne avec des inconnus.
                <br />
                <em className="font-serif italic font-normal text-forest-deep" style={{ letterSpacing: '-0.01em' }}>
                  Reviens avec des amis.
                </em>
              </h1>
              <p
                className="text-base md:text-lg text-ink-soft max-w-[520px] mb-8 md:mb-9"
                style={{ textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
              >
                Lacet met en relation des randonneurs via un feed géolocalisé par swipe. Glisse à droite
                pour rejoindre une sortie, à gauche pour passer. Plus besoin de partir seul.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <AppStoreBadge store="apple" />
                <AppStoreBadge store="google" />
                <span className="w-full md:w-auto md:ml-1.5 mt-1 md:mt-0 font-mono text-xs text-stone">· connexion par numéro · sans mdp</span>
              </div>
            </div>

            <div className="relative flex justify-center items-center min-h-0 md:min-h-[560px]">
              <TopoCard label="Sortie à proximité" className="top-10 -left-2.5 hidden md:block">
                <span className="font-sans text-[15px] font-medium text-ink" style={{ letterSpacing: '-0.01em' }}>
                  Tour du pic Saint-Loup
                </span>
                <div className="mt-2 flex gap-3 font-mono text-[11px]">
                  <span>10 km</span>
                  <span>↗ 1 233 m</span>
                  <span>dim. 08:30</span>
                </div>
              </TopoCard>

              <TopoCard label="Groupe formé" className="bottom-16 -right-5 hidden md:block">
                <div className="flex items-center gap-2.5 mt-1">
                  <div className="flex">
                    <span
                      className="w-[26px] h-[26px] rounded-full border-2 border-paper"
                      style={{ background: 'linear-gradient(135deg, #b8834a, #8f6237)' }}
                    />
                    <span
                      className="w-[26px] h-[26px] rounded-full border-2 border-paper -ml-2"
                      style={{ background: 'linear-gradient(135deg, #6b8a6e, #3a7c5a)' }}
                    />
                    <span
                      className="w-[26px] h-[26px] rounded-full border-2 border-paper -ml-2"
                      style={{ background: 'linear-gradient(135deg, #a89681, #705e4e)' }}
                    />
                  </div>
                  <span className="font-sans text-sm font-medium text-ink">3 / 4 places</span>
                </div>
              </TopoCard>

              <TopoCard label="Swipe pour rejoindre" className="top-[220px] -right-10 hidden md:block">
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-sans text-[15px] font-medium text-ink" style={{ letterSpacing: '-0.01em' }}>
                    → droite
                  </span>
                  <span className="font-mono text-[11px] text-forest">· 8 km</span>
                </div>
              </TopoCard>

              <PhoneMockup />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="relative pt-20 pb-16 md:pt-[160px] md:pb-[120px]">
          <SectionHead
            kicker="étape 1 · repérage"
            titleStart="Tout ce qu'il faut "
            titleEm="pour trouver ta cordée."
            lede="Un feed par swipe, un chat dédié, des notes anonymes. Rien de superflu — juste ce qu'il faut pour partir avec les bonnes personnes."
          />
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-7">
            {FEATURES.map((f) => (
              <div
                key={f.id}
                className="feature-row relative py-10 md:py-[70px] min-h-0 md:min-h-[260px] grid md:grid-cols-[1fr_220px_1fr] items-center gap-0"
              >
                {f.side === 'left' ? (
                  <>
                    <FeatureCard row={f} />
                    <Waypoint id={f.id} label={f.label} />
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <Waypoint id={f.id} label={f.label} />
                    <FeatureCard row={f} />
                  </>
                )}
              </div>
            ))}
          </div>
        </section>


        {/* SOMMET */}
        <section
          ref={summitRef}
          className="summit-section relative pt-10 pb-16 md:pt-16 md:pb-24 flex flex-col items-center justify-center text-center z-[2]"
        >
          <svg
            viewBox="0 0 240 150"
            className="summit-svg w-[180px] sm:w-[220px] md:w-[280px] mb-5 overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            {/* peak back (tallest, centered) */}
            <path
              className="peak peak-back"
              d="M50 138 L120 22 L190 138 Z"
              stroke="var(--forest-deep)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="var(--forest-tint)"
              pathLength={1}
            />
            {/* peak front-left */}
            <path
              className="peak peak-left"
              d="M0 138 L60 60 L120 138 Z"
              stroke="var(--forest)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="var(--paper)"
              pathLength={1}
            />
            {/* peak front-right */}
            <path
              className="peak peak-right"
              d="M120 138 L180 75 L240 138 Z"
              stroke="var(--forest)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="var(--paper)"
              pathLength={1}
            />
            {/* snow cap on tallest peak */}
            <path
              className="snow"
              d="M108 44 L120 22 L132 44 Q120 38 108 44 Z"
              fill="var(--paper)"
            />
            {/* flag pole + flag at summit */}
            <line
              className="flag-pole"
              x1="120" y1="22" x2="120" y2="2"
              stroke="var(--forest-deep)" strokeWidth="1.5" strokeLinecap="round"
            />
            <path className="flag" d="M120 2 L134 7 L120 12 Z" fill="var(--forest)" />
            {/* ground line */}
            <line
              className="ground"
              x1="0" y1="138" x2="240" y2="138"
              stroke="var(--line)" strokeWidth="1" strokeDasharray="3 4"
            />
          </svg>
          <span className="summit-kicker font-mono text-[10px] text-stone tracking-[0.2em] uppercase mb-3">
            · sommet atteint ·
          </span>
          <p
            className="summit-text font-serif italic text-[22px] sm:text-[28px] md:text-[34px] text-forest-deep m-0"
            style={{ letterSpacing: '-0.01em' }}
          >
            tu es arrivé.
          </p>
        </section>

        {/* FINAL CTA */}
        <section id="download" className="relative pt-20 pb-24 md:pt-36 md:pb-40 text-center">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-7 relative z-[2]">
            <span className="section-kicker font-mono text-xs text-forest tracking-widest uppercase mb-3.5 inline-flex items-center gap-2">
              sommet · destination
            </span>
            <h2
              className="font-sans font-bold text-ink m-0 mb-5"
              style={{
                fontSize: 'clamp(30px, 7vw, 64px)',
                lineHeight: 1,
                letterSpacing: '-0.028em',
                textWrap: 'balance',
              }}
            >
              La montagne,{' '}
              <em className="font-serif italic font-normal text-forest-deep">ça se partage.</em>
            </h2>
            <p
              className="text-base md:text-lg text-ink-soft max-w-[460px] mx-auto mb-10"
              style={{ textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
            >
              Trouve ta cordée en quelques swipes. Disponible sur iOS et Android, connexion par numéro de téléphone — sans mot de passe.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <AppStoreBadge store="apple" />
              <AppStoreBadge store="google" />
            </div>

          </div>
        </section>
      </main>

      {/* Progress pill */}
      <div
        ref={pillRef}
        className="progress-pill fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 bg-[var(--surface-strong)] backdrop-blur-md border border-line px-2.5 py-1.5 md:px-3 md:py-2 rounded-full font-mono text-[11px] text-ink-soft shadow-topo flex items-center gap-2.5"
      >
        <span className="w-2 h-2 rounded-full bg-forest" style={{ boxShadow: '0 0 0 3px rgba(58,124,90,0.2)' }} />
        <span ref={pillLabelRef}>km 0</span>
        <span className="w-[60px] h-[3px] bg-line rounded overflow-hidden">
          <span
            ref={pillFillRef}
            className="block h-full bg-forest w-0"
            style={{ transition: 'width 140ms ease-out' }}
          />
        </span>
      </div>

      <Footer />

      <style jsx global>{`
        .pulse {
          box-shadow: 0 0 0 3px rgba(58, 124, 90, 0.18);
          animation: pulse 2.4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 0 3px rgba(58, 124, 90, 0.18);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(58, 124, 90, 0.08);
          }
        }

        .section-kicker::before,
        .section-kicker::after {
          content: '';
          width: 22px;
          height: 1px;
          background: var(--forest);
          opacity: 0.4;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 700ms ease, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card,
        .step-panel {
          position: relative;
        }
        .feature-card.left,
        .step-panel.left {
          justify-self: end;
          margin-right: -20px;
        }
        .feature-card.right,
        .step-panel.right {
          grid-column: 3;
          justify-self: start;
          margin-left: -20px;
        }
        .feature-card::after,
        .step-panel::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40px;
          height: 1px;
          background: repeating-linear-gradient(90deg, var(--line) 0 4px, transparent 4px 8px);
        }
        .feature-card.left::after,
        .step-panel.left::after {
          right: -40px;
        }
        .feature-card.right::after,
        .step-panel.right::after {
          left: -40px;
        }

        .wp-inner::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px dashed var(--line);
          opacity: 0;
          transition: opacity 400ms ease;
        }
        @keyframes wp-float {
          0%, 100% { transform: scale(1.05) translateY(0); }
          50%      { transform: scale(1.05) translateY(-4px); }
        }
        .wp.visited .wp-inner {
          background: rgba(58, 124, 90, 0.10);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: var(--forest-deep);
          border-color: var(--forest);
          box-shadow: 0 0 0 3px rgba(58, 124, 90, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.55);
          transform: scale(1.05);
          animation: wp-float 3s ease-in-out 400ms infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .wp.visited .wp-inner { animation: none; }
        }
        .wp.visited .wp-inner::before {
          opacity: 0.35;
          border-color: var(--forest);
        }

        .progress-pill {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 300ms ease, transform 300ms ease;
        }
        .progress-pill.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* SOMMET — état initial */
        .summit-svg .peak {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          fill-opacity: 0;
          transition: stroke-dashoffset 900ms cubic-bezier(0.65, 0, 0.35, 1),
                      fill-opacity 600ms ease-out;
        }
        .summit-svg .snow,
        .summit-svg .flag-pole,
        .summit-svg .flag {
          opacity: 0;
          transform: translateY(6px);
          transform-origin: bottom center;
          transition: opacity 500ms ease-out, transform 500ms ease-out;
        }
        .summit-svg .ground {
          stroke-dasharray: 3 4;
          stroke-dashoffset: 240;
          transition: stroke-dashoffset 700ms ease-out;
        }
        .summit-kicker,
        .summit-text {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 600ms ease-out, transform 600ms ease-out;
        }

        /* SOMMET — état d'arrivée */
        .summit-section.arrived .ground {
          stroke-dashoffset: 0;
        }
        .summit-section.arrived .peak-back {
          stroke-dashoffset: 0;
          fill-opacity: 1;
          transition-delay: 200ms, 700ms;
        }
        .summit-section.arrived .peak-left {
          stroke-dashoffset: 0;
          fill-opacity: 1;
          transition-delay: 450ms, 950ms;
        }
        .summit-section.arrived .peak-right {
          stroke-dashoffset: 0;
          fill-opacity: 1;
          transition-delay: 700ms, 1200ms;
        }
        .summit-section.arrived .snow {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 1300ms;
        }
        .summit-section.arrived .flag-pole {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 1450ms;
        }
        .summit-section.arrived .flag {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 1600ms;
          animation: flag-wave 2.6s ease-in-out 1700ms infinite;
          transform-box: fill-box;
          transform-origin: left center;
        }
        .summit-section.arrived .summit-kicker {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 1500ms;
        }
        .summit-section.arrived .summit-text {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 1700ms;
        }

        @keyframes flag-wave {
          0%, 100% { transform: skewX(0deg) scaleX(1); }
          50%      { transform: skewX(-6deg) scaleX(0.92); }
        }

        .feature-card {
          transition: translate 0.6s ease-in-out, scale 0.6s ease-in-out, filter 0.6s ease-in-out;
          transform-origin: center bottom;
        }
        .feature-card.trail-reached {
          translate: 0 -10px;
          scale: 1.035;
          filter: drop-shadow(0 22px 34px rgba(42, 90, 66, 0.30));
        }
        @media (prefers-reduced-motion: reduce) {
          .feature-card { transition: none; }
          .feature-card.trail-reached { translate: 0; scale: 1; filter: none; }
        }

        @media (max-width: 960px) {
          .feature-row,
          .step-row {
            grid-template-columns: 1fr !important;
            padding: 40px 0 !important;
          }
          .feature-card,
          .step-panel,
          .feature-card.left,
          .feature-card.right,
          .step-panel.left,
          .step-panel.right {
            grid-column: 1 !important;
            justify-self: stretch !important;
            max-width: none !important;
            margin: 0 !important;
          }
          .feature-card::after,
          .step-panel::after {
            display: none;
          }
          .wp {
            grid-column: 1 !important;
            margin: 20px 0 !important;
          }
        }
      `}</style>
    </>
  )
}

function SectionHead({
  kicker,
  titleStart,
  titleEm,
  lede,
}: {
  kicker: string
  titleStart: string
  titleEm: string
  lede: string
}) {
  return (
    <div className="max-w-[720px] mx-auto mb-[88px] text-center relative z-[2] px-7">
      <span className="section-kicker font-mono text-xs text-forest tracking-widest uppercase mb-3.5 inline-flex items-center gap-2">
        {kicker}
      </span>
      <h2
        className="font-sans font-bold text-ink m-0 mb-4.5"
        style={{
          fontSize: 'clamp(32px, 4.5vw, 52px)',
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          textWrap: 'balance',
        }}
      >
        {titleStart}
        <em className="font-serif italic font-normal text-forest-deep">{titleEm}</em>
      </h2>
      <p
        className="text-lg text-ink-soft max-w-[540px] mx-auto"
        style={{ textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
      >
        {lede}
      </p>
    </div>
  )
}

function FeatureCard({ row }: { row: FeatureRow }) {
  return (
    <div
      className={`feature-card fade-in ${row.side} bg-[var(--surface-strong)] backdrop-blur-md border border-line rounded-topo px-8 py-[30px] shadow-topo max-w-[440px]`}
    >
      <div className="flex items-center gap-3.5 mb-3.5">
        <div className="w-11 h-11 rounded-xl bg-forest-tint text-forest-deep grid place-items-center shrink-0">
          <span className="block w-[22px] h-[22px]">{row.icon}</span>
        </div>
        <span className="font-mono text-[11px] text-stone tracking-wider">{row.tag}</span>
      </div>
      <h3 className="text-[22px] font-semibold text-ink m-0 mb-2.5" style={{ letterSpacing: '-0.018em' }}>
        {row.title}
      </h3>
      <p
        className="text-[15px] text-ink-soft m-0"
        style={{ lineHeight: 1.6, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
      >
        {row.desc}
      </p>
      <div className="mt-[18px] pt-4 border-t border-dashed border-line flex gap-5">
        {row.stats.map((s) => (
          <div key={s.k} className="flex flex-col">
            <span className="font-mono text-[10px] text-stone tracking-wider uppercase">{s.k}</span>
            <span
              className="text-[16px] font-semibold text-forest-deep mt-0.5"
              style={{ letterSpacing: '-0.01em' }}
            >
              {s.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

