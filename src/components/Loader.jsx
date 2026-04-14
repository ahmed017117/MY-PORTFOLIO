import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const barRef = useRef(null)
  const textRef = useRef(null)
  const subRef = useRef(null)
  const percentRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .to(subRef.current, {
      opacity: 1,
      duration: 0.5,
    }, '-=0.3')
    .to(barRef.current, {
      scaleX: 1,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: function() {
        if (percentRef.current) {
          percentRef.current.textContent = Math.round(this.progress() * 100) + '%'
        }
      }
    }, '-=0.2')
    .to([textRef.current, subRef.current, barRef.current.parentElement, percentRef.current], {
      opacity: 0,
      y: -30,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power2.in',
    }, '+=0.3')
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => onComplete && onComplete(),
    }, '-=0.1')

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={loaderRef} className="loader-screen">
      <div
        ref={textRef}
        className="loader-text opacity-0 translate-y-8"
        style={{ transform: 'translateY(2rem)' }}
      >
        AHMED NABIL
      </div>
      <div
        ref={subRef}
        className="opacity-0 font-mono text-xs tracking-[0.4em] text-white/30 uppercase"
      >
        Empire Loading…
      </div>
      <div className="loader-bar-track">
        <div ref={barRef} className="loader-bar-fill" />
      </div>
      <div
        ref={percentRef}
        className="font-mono text-xs text-neon/60 tracking-widest"
      >
        0%
      </div>
    </div>
  )
}
