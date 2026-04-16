import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const barRef = useRef(null)
  const textRef = useRef(null)
  const subRef = useRef(null)
  const percentRef = useRef(null)
  const crownRef = useRef(null)
  const auraRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl
      // Aura pulse in
      .fromTo(auraRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      // Crown drops in
      .fromTo(crownRef.current,
        { y: -40, opacity: 0, scale: 0.7 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'bounce.out' },
        '-=0.4'
      )
      // Name appears
      .fromTo(textRef.current,
        { opacity: 0, letterSpacing: '2em', scale: 1.3, filter: 'blur(20px)' },
        { opacity: 1, letterSpacing: '0.3em', scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power4.out' },
        '-=0.2'
      )
      // Subtitle
      .fromTo(subRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.3'
      )
      // Progress bar
      .to(barRef.current, {
        scaleX: 1,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: function () {
          if (percentRef.current)
            percentRef.current.textContent = Math.round(this.progress() * 100) + '%'
        }
      }, '-=0.2')
      // Glitch
      .to(textRef.current, { skewX: 15, opacity: 0.7, duration: 0.05 })
      .to(textRef.current, { skewX: -10, opacity: 1, duration: 0.05 })
      .to(textRef.current, { skewX: 0, duration: 0.05 })
      // Split exit
      .to('#loader-top', { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '+=0.2')
      .to('#loader-bottom', {
        yPercent: 100, duration: 0.7, ease: 'power4.inOut',
        onComplete: () => onComplete && onComplete()
      }, '<')

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[99999] overflow-hidden">

      {/* TOP HALF */}
      <div id="loader-top" className="absolute inset-x-0 top-0 h-1/2 bg-[#0a0a0a] z-10 flex flex-col items-center justify-end pb-6">

        {/* Scan lines */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute left-0 right-0 h-[1px]" style={{
            top: `${15 + i * 14}%`,
            background: i % 2 === 0
              ? 'linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,215,0,0.2), transparent)',
            animation: `scanMove ${1.5 + i * 0.2}s linear infinite`,
          }} />
        ))}

        {/* AURA SVG */}
        <div ref={auraRef} className="absolute" style={{ bottom: 60, opacity: 0 }}>
          <svg width="340" height="120" viewBox="0 0 340 120" fill="none">
            <defs>
              <radialGradient id="auraGlow" cx="50%" cy="100%" r="50%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.35" />
                <stop offset="40%" stopColor="#00f0ff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="auraGlow2" cx="50%" cy="100%" r="50%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Outer aura ellipse */}
            <ellipse cx="170" cy="110" rx="165" ry="55" fill="url(#auraGlow)" />
            {/* Inner bright core */}
            <ellipse cx="170" cy="112" rx="80" ry="25" fill="url(#auraGlow2)" />
            {/* Horizontal light rays */}
            {[...Array(7)].map((_, i) => {
              const x = 50 + i * 40
              const h = 20 + Math.sin(i * 1.2) * 15
              return (
                <line key={i}
                  x1={x} y1={110} x2={x} y2={110 - h}
                  stroke={i % 2 === 0 ? '#FFD700' : '#00f0ff'}
                  strokeWidth="0.5"
                  strokeOpacity={0.4 - i * 0.02}
                />
              )
            })}
            {/* Arc lines */}
            <path d="M 30 110 Q 170 60 310 110" stroke="#FFD700" strokeWidth="0.5" strokeOpacity="0.25" fill="none" />
            <path d="M 60 110 Q 170 75 280 110" stroke="#00f0ff" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
          </svg>
        </div>

        {/* CROWN SVG */}
        <div ref={crownRef} className="relative z-10 mb-3" style={{ opacity: 0 }}>
          <svg width="80" height="56" viewBox="0 0 80 56" fill="none">
            <defs>
              <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="40%" stopColor="#FFF4A0" />
                <stop offset="70%" stopColor="#FFA500" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
              <filter id="crownGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Crown body */}
            <path
              d="M8 48 L8 28 L20 40 L40 8 L60 40 L72 28 L72 48 Z"
              fill="url(#crownGrad)"
              filter="url(#crownGlow)"
            />
            {/* Crown base band */}
            <rect x="8" y="44" width="64" height="8" rx="2" fill="url(#crownGrad)" filter="url(#crownGlow)" />
            {/* Gem top center */}
            <circle cx="40" cy="10" r="4" fill="#00f0ff" opacity="0.9" filter="url(#crownGlow)" />
            {/* Gem left peak */}
            <circle cx="20" cy="38" r="3" fill="#ffffff" opacity="0.8" />
            {/* Gem right peak */}
            <circle cx="60" cy="38" r="3" fill="#ffffff" opacity="0.8" />
            {/* Gem base left */}
            <circle cx="14" cy="46" r="2.5" fill="#00f0ff" opacity="0.7" />
            {/* Gem base center */}
            <circle cx="40" cy="46" r="2.5" fill="#FFD700" opacity="1" />
            {/* Gem base right */}
            <circle cx="66" cy="46" r="2.5" fill="#00f0ff" opacity="0.7" />
            {/* Shine lines on crown */}
            <line x1="30" y1="20" x2="28" y2="36" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
            <line x1="40" y1="16" x2="40" y2="36" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
            <line x1="50" y1="20" x2="52" y2="36" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* NAME */}
        <div
          ref={textRef}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 10vw, 7rem)',
            fontWeight: 300,
            letterSpacing: '0.3em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,240,255,0.6)',
            opacity: 0,
            textTransform: 'uppercase',
            lineHeight: 1,
            position: 'relative',
            zIndex: 2,
          }}
        >
          AHMED NABIL
        </div>
      </div>

      {/* BOTTOM HALF */}
      <div id="loader-bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a] z-10 flex flex-col items-center justify-start pt-4 gap-5">

        {/* Subtitle */}
        <div
          ref={subRef}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.5em',
            color: 'rgba(255,215,0,0.5)',
            textTransform: 'uppercase',
            opacity: 0,
          }}
        >
          Initializing Empire
        </div>

        {/* Progress bar */}
        <div style={{ width: 'min(320px, 80vw)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div
              ref={barRef}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #00f0ff, #FFD700)',
                transformOrigin: 'left',
                transform: 'scaleX(0)',
                boxShadow: '0 0 10px #00f0ff',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>
              LOADING SYSTEMS
            </span>
            <span ref={percentRef} style={{ fontFamily: 'JetBrains Mono', fontSize: '0.55rem', color: '#00f0ff', letterSpacing: '0.1em' }}>
              0%
            </span>
          </div>
        </div>

        {/* Bottom gold line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #FFD700, transparent)', opacity: 0.3 }} />
      </div>

      {/* Center divider */}
      <div className="absolute inset-x-0 z-20 pointer-events-none" style={{ top: '50%', height: '1px', background: 'linear-gradient(90deg, transparent, #00f0ff, #FFD700, #00f0ff, transparent)', opacity: 0.6 }} />

      <style>{`
        @keyframes scanMove {
          0% { opacity: 0.3; transform: scaleX(0.3); }
          50% { opacity: 0.8; transform: scaleX(1); }
          100% { opacity: 0.3; transform: scaleX(0.3); }
        }
      `}</style>
    </div>
  )
}
