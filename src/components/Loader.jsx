import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const textRef = useRef(null)
  const subtitleRef = useRef(null)
  const barRef = useRef(null)
  const percentRef = useRef(null)
  const linesRef = useRef([])
  const overlaysRef = useRef([])

  useEffect(() => {
    const tl = gsap.timeline()

    // Phase 1: Scan lines flash in (Avengers style)
    tl.fromTo(linesRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.05, stagger: 0.03, ease: 'power4.in' }
    )
    // Phase 2: Overlays flash
    .fromTo(overlaysRef.current,
      { opacity: 1 },
      { opacity: 0, duration: 0.1, stagger: 0.04, ease: 'power2.out' },
      '-=0.1'
    )
    // Phase 3: Name slams in
    .fromTo(textRef.current,
      { opacity: 0, letterSpacing: '2em', scale: 1.3, filter: 'blur(20px)' },
      { opacity: 1, letterSpacing: '0.3em', scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power4.out' },
      '-=0.1'
    )
    // Phase 4: Subtitle
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4 },
      '-=0.3'
    )
    // Phase 5: Progress bar
    .to(barRef.current, {
      scaleX: 1,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: function () {
        if (percentRef.current) {
          percentRef.current.textContent = Math.round(this.progress() * 100) + '%'
        }
      }
    }, '-=0.2')
    // Phase 6: Glitch flash before exit
    .to(textRef.current, {
      skewX: 15, opacity: 0.7, duration: 0.05, ease: 'none'
    })
    .to(textRef.current, {
      skewX: -10, opacity: 1, duration: 0.05, ease: 'none'
    })
    .to(textRef.current, {
      skewX: 0, duration: 0.05, ease: 'none'
    })
    // Phase 7: Split exit — top half goes up, bottom half goes down
    .to('#loader-top', {
      yPercent: -100, duration: 0.7, ease: 'power4.inOut'
    }, '+=0.2')
    .to('#loader-bottom', {
      yPercent: 100, duration: 0.7, ease: 'power4.inOut',
      onComplete: () => onComplete && onComplete()
    }, '<')

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[99999] overflow-hidden">
      {/* Top half */}
      <div id="loader-top" className="absolute inset-x-0 top-0 h-1/2 bg-[#0a0a0a] z-10 flex flex-col items-center justify-end pb-4">
        {/* Scan lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={el => linesRef.current[i] = el}
            className="absolute left-0 right-0 h-[1px]"
            style={{
              top: `${10 + i * 10}%`,
              background: i % 2 === 0
                ? 'linear-gradient(90deg, transparent, #00f0ff, transparent)'
                : 'linear-gradient(90deg, transparent, #FFD700, transparent)',
              opacity: 0,
              transformOrigin: 'left',
            }}
          />
        ))}

        {/* Flash overlays */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            ref={el => overlaysRef.current[i] = el}
            className="absolute inset-0"
            style={{
              background: i === 0 ? 'rgba(0,240,255,0.08)' : i === 1 ? 'rgba(255,215,0,0.05)' : 'rgba(0,0,0,0.9)',
            }}
          />
        ))}

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
          }}
        >
          AHMED NABIL
        </div>
      </div>

      {/* Bottom half */}
      <div id="loader-bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a] z-10 flex flex-col items-center justify-start pt-4 gap-6">
        <div
          ref={subtitleRef}
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
            <span
              ref={percentRef}
              style={{ fontFamily: 'JetBrains Mono', fontSize: '0.55rem', color: '#00f0ff', letterSpacing: '0.1em' }}
            >
              0%
            </span>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #FFD700, transparent)', opacity: 0.3 }} />
      </div>

      {/* Center divider line */}
      <div className="absolute inset-x-0 z-20 pointer-events-none" style={{ top: '50%', height: '1px', background: 'linear-gradient(90deg, transparent, #00f0ff, #FFD700, #00f0ff, transparent)', opacity: 0.6 }} />
    </div>
  )
}
