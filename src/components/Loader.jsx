import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const canvasRef = useRef(null)
  const nameRef = useRef(null)
  const lineRef = useRef(null)
  const planetRef = useRef(null)
  const blastRef = useRef(null)

  // 🎯 OPTIMIZED PARTICLE (LESS LAG)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []

    for (let i = 0; i < 60; i++) { // reduced particles
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 2,
        alpha: 1
      })
    }

    let frame
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.alpha -= 0.01

        if (p.alpha > 0) {
          ctx.globalAlpha = p.alpha
          ctx.fillStyle = '#00f0ff'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      frame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  // 🎬 CINEMATIC TIMELINE
  useEffect(() => {
    const tl = gsap.timeline()

    // ✍️ REAL TYPING EFFECT
    const text = "AHMED NABIL"
    let current = ""

    text.split("").forEach((char) => {
      tl.to({}, {
        duration: 0.05,
        onUpdate: () => {
          current += char
          nameRef.current.textContent = current
        }
      })
    })

    // ⚡ LINE FAST FILL
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: "power2.out"
    })

    // 🌍 PLANET ENTRY
    tl.fromTo(planetRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)" }
    )

    // 💥 BLAST
    tl.to(planetRef.current, {
      scale: 3,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in"
    })

    tl.fromTo(blastRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 4, opacity: 1, duration: 0.4 },
      "-=0.3"
    )

    // 🚪 EXIT
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      onComplete: () => onComplete && onComplete()
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: 9999
      }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

      {/* NAME */}
      <h1
        ref={nameRef}
        style={{
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          letterSpacing: '0.3em',
          color: '#fff',
          fontWeight: 300
        }}
      ></h1>

      {/* LINE */}
      <div style={{
        width: '150px',
        height: '2px',
        background: 'rgba(255,255,255,0.1)',
        marginTop: '20px'
      }}>
        <div
          ref={lineRef}
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg,#00f0ff,#FFD700)',
            transform: 'scaleX(0)',
            transformOrigin: 'left'
          }}
        />
      </div>

      {/* PLANET */}
      <div
        ref={planetRef}
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          marginTop: '40px',
          background: 'radial-gradient(circle,#00f0ff,#001f2f)',
          boxShadow: '0 0 50px #00f0ff',
          opacity: 0
        }}
      />

      {/* BLAST */}
      <div
        ref={blastRef}
        style={{
          position: 'absolute',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle,white,transparent)',
          opacity: 0
        }}
      />
    </div>
  )
}
