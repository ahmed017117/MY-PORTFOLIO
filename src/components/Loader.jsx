import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const canvasRef = useRef(null)
  const nameRef = useRef(null)
  const tagRef = useRef(null)
  const barFillRef = useRef(null)
  const percentRef = useRef(null)
  const statusRef = useRef(null)
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)
  const glitchRef = useRef(null)

  // Canvas particle burst
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const colors = ['#00f0ff', '#FFD700', '#ffffff', '#0080ff']

    for (let i = 0; i < 120; i++) {
      const angle = (Math.PI * 2 * i) / 120 + Math.random() * 0.3
      const speed = 1.5 + Math.random() * 4
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 0.5 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0.6 + Math.random() * 0.4,
      })
    }

    let frame
    let started = false
    let elapsed = 0

    const animate = () => {
      elapsed += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (elapsed > 0.8 && !started) {
        started = true
      }

      if (started) {
        particles.forEach(p => {
          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.97
          p.vy *= 0.97
          p.alpha -= 0.012

          if (p.alpha > 0) {
            ctx.save()
            ctx.globalAlpha = Math.max(0, p.alpha)
            ctx.fillStyle = p.color
            ctx.shadowBlur = 6
            ctx.shadowColor = p.color
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }
        })
      }

      // Background pulse rings
      const time = elapsed
      for (let r = 0; r < 3; r++) {
        const radius = (time * 120 + r * 100) % 400
        const alpha = Math.max(0, 0.15 - radius / 3000)
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.strokeStyle = r % 2 === 0 ? '#00f0ff' : '#FFD700'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  // GSAP timeline
  useEffect(() => {
    const tl = gsap.timeline()

    const statuses = ['INITIALIZING...', 'LOADING ASSETS...', 'BUILDING EMPIRE...', 'ACCESS GRANTED']

    // Phase 1: Flash white
    tl.fromTo(loaderRef.current,
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#0a0a0a', duration: 0.15, ease: 'none' }
    )
    // Phase 2: Rings expand
    .fromTo([ring1Ref.current, ring2Ref.current],
      { scale: 0, opacity: 0.8 },
      { scale: 3, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power2.out' },
      '-=0.05'
    )
    // Phase 3: Name blasts in
    .fromTo(nameRef.current,
      { scale: 4, opacity: 0, filter: 'blur(30px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'expo.out' },
      '-=0.8'
    )
    // Phase 4: Tag slides up
    .fromTo(tagRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
      '-=0.3'
    )
    // Phase 5: Status text cycles
    .call(() => {
      let i = 0
      const interval = setInterval(() => {
        if (statusRef.current) statusRef.current.textContent = statuses[i]
        i++
        if (i >= statuses.length) clearInterval(interval)
      }, 480)
    })
    // Phase 6: Progress bar
    .to(barFillRef.current, {
      scaleX: 1,
      duration: 2.2,
      ease: 'power1.inOut',
      onUpdate: function () {
        if (percentRef.current)
          percentRef.current.textContent = Math.round(this.progress() * 100) + '%'
      }
    }, '-=0.1')
    // Phase 7: Triple glitch
    .to(nameRef.current, { skewX: 20, scaleX: 1.05, opacity: 0.6, duration: 0.04 })
    .to(nameRef.current, { skewX: -15, scaleX: 0.98, opacity: 1, duration: 0.04 })
    .to(nameRef.current, { skewX: 8, duration: 0.03 })
    .to(nameRef.current, { skewX: 0, scaleX: 1, duration: 0.04 })
    // Phase 8: Name explodes outward
    .to(nameRef.current, {
      scale: 1.06,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.3,
      ease: 'power2.in'
    }, '+=0.15')
    // Phase 9: Curtain wipe — left and right panels slide out
    .to('#curtain-left', {
      xPercent: -100, duration: 0.7, ease: 'power4.inOut'
    })
    .to('#curtain-right', {
      xPercent: 100, duration: 0.7, ease: 'power4.inOut',
      onComplete: () => onComplete && onComplete()
    }, '<')

    return () => tl.kill()
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#0a0a0a', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '2rem',
      }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Pulse rings */}
      <div ref={ring1Ref} style={{
        position: 'absolute', width: 200, height: 200,
        borderRadius: '50%', border: '1px solid #00f0ff',
        opacity: 0, pointerEvents: 'none',
      }} />
      <div ref={ring2Ref} style={{
        position: 'absolute', width: 200, height: 200,
        borderRadius: '50%', border: '1px solid #FFD700',
        opacity: 0, pointerEvents: 'none',
      }} />

      {/* Corner brackets */}
      {[
        { top: 24, left: 24 },
        { top: 24, right: 24 },
        { bottom: 24, left: 24 },
        { bottom: 24, right: 24 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', width: 32, height: 32, ...pos,
          borderTop: i < 2 ? '1px solid rgba(0,240,255,0.4)' : 'none',
          borderBottom: i >= 2 ? '1px solid rgba(255,215,0,0.4)' : 'none',
          borderLeft: i % 2 === 0 ? '1px solid rgba(0,240,255,0.4)' : 'none',
          borderRight: i % 2 !== 0 ? '1px solid rgba(255,215,0,0.4)' : 'none',
        }} />
      ))}

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        {/* Name */}
        <div ref={nameRef} style={{ opacity: 0 }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3rem, 12vw, 8rem)',
            fontWeight: 300,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 40%, #FFD700 70%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            filter: 'drop-shadow(0 0 30px rgba(0,240,255,0.4))',
          }}>
            AHMED NABIL
          </div>
        </div>

        {/* Tag */}
        <div ref={tagRef} style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 40, height: '1px', background: 'linear-gradient(90deg, transparent, #00f0ff)' }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.5em',
            color: 'rgba(255,215,0,0.6)',
            textTransform: 'uppercase',
          }}>
            Global Empire
          </span>
          <div style={{ width: 40, height: '1px', background: 'linear-gradient(90deg, #FFD700, transparent)' }} />
        </div>

        {/* Progress */}
        <div style={{ width: 'min(360px, 80vw)', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
          {/* Bar track */}
          <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
            <div ref={barFillRef} style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, #00f0ff, #0080ff, #FFD700)',
              transformOrigin: 'left',
              transform: 'scaleX(0)',
              boxShadow: '0 0 12px #00f0ff, 0 0 24px rgba(0,240,255,0.3)',
            }} />
          </div>
          {/* Labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span ref={statusRef} style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.55rem',
              color: 'rgba(0,240,255,0.5)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}>
              INITIALIZING...
            </span>
            <span ref={percentRef} style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: '#FFD700',
              letterSpacing: '0.1em',
              fontWeight: 500,
            }}>
              0%
            </span>
          </div>
        </div>
      </div>

      {/* Curtain left */}
      <div id="curtain-left" style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '50%',
        background: '#0a0a0a', zIndex: 10,
        borderRight: '1px solid rgba(0,240,255,0.2)',
      }} />
      {/* Curtain right */}
      <div id="curtain-right" style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%',
        background: '#0a0a0a', zIndex: 10,
        borderLeft: '1px solid rgba(255,215,0,0.2)',
      }} />
    </div>
  )
}

