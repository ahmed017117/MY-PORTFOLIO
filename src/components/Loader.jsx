import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const nameRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Name animation
    tl.fromTo(nameRef.current,
      { opacity: 0, y: 40, scale: 1.1 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    )

    // Progress bar fast fill
    .to(barRef.current, {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.5")

    // Glow pulse
    .to(nameRef.current, {
      textShadow: "0 0 20px #00f0ff, 0 0 40px #FFD700",
      duration: 0.4,
      yoyo: true,
      repeat: 1
    })

    // Exit animation
    .to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => onComplete && onComplete()
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 9999
      }}
    >
      {/* Name */}
      <h1
        ref={nameRef}
        style={{
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          fontWeight: "300",
          letterSpacing: "0.3em",
          color: "white",
          textTransform: "uppercase",
          background: "linear-gradient(90deg,#00f0ff,#FFD700,#fff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        AHMED NABIL
      </h1>

      {/* Progress bar */}
      <div style={{
        width: "200px",
        height: "2px",
        background: "rgba(255,255,255,0.1)",
        marginTop: "20px",
        overflow: "hidden"
      }}>
        <div
          ref={barRef}
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg,#00f0ff,#FFD700)",
            transform: "scaleX(0)",
            transformOrigin: "left"
          }}
        />
      </div>
    </div>
  )
}
