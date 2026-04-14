import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function VerifiedBadge({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Verified">
      <circle cx="12" cy="12" r="12" fill="#00f0ff" opacity="0.15" />
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NetWorthTicker() {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const target = 2.47
    const duration = 2500
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(+(eased * target).toFixed(2))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase">Net Worth</span>
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-sm text-gold-dim">$</span>
        <span className="networth-ticker">{value}B</span>
        <span className="font-mono text-xs text-neon animate-pulse">▲</span>
      </div>
      <span className="font-mono text-[0.6rem] tracking-widest text-white/20 uppercase">Loading…</span>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const taglineRef = useRef(null)
  const profileRef = useRef(null)
  const statsRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(profileRef.current,
      { scale: 0.7, opacity: 0, rotateY: 15 },
      { scale: 1, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power4.out' }
    )
    .fromTo(nameRef.current,
      { y: 60, opacity: 0, skewX: 3 },
      { y: 0, opacity: 1, skewX: 0, duration: 1, ease: 'power4.out' },
      '-=0.7'
    )
    .fromTo(taglineRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(statsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    )

    gsap.to(heroRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    const onMouseMove = (e) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2
      gsap.to(profileRef.current, {
        x: xRatio * 15,
        y: yRatio * 10,
        duration: 1.5,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,240,255,0.06) 0%, transparent 70%)' }}
      />

      {/* Profile Image */}
      <div ref={profileRef} className="relative mb-10 gpu-accelerated">
        <div className="absolute -inset-3 rounded-full profile-ring opacity-70" />
        <div className="absolute -inset-2 rounded-full bg-dark-base" />
        <div
          className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 animate-pulse-glow"
          style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' }}
        >
          {/* ✅ তোমার ছবি এখানে আছে */}
          <img
            src="/assets/ahmed-nabil.jpeg"
            alt="Ahmed Nabil"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          {/* Fallback যদি ছবি না থাকে */}
          <div className="w-full h-full items-center justify-center" style={{ display: 'none' }}>
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <rect width="200" height="200" fill="url(#avatarGrad)" />
              <circle cx="100" cy="80" r="35" fill="rgba(255,255,255,0.15)" />
              <ellipse cx="100" cy="160" rx="55" ry="40" fill="rgba(255,255,255,0.1)" />
              <text x="100" y="95" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
                    fontSize="36" fontWeight="300" fill="rgba(255,255,255,0.7)">AN</text>
            </svg>
          </div>
        </div>
      </div>

      {/* AHMED NABIL তারপর Blue Tick */}
      <div ref={nameRef} className="flex items-center gap-4 mb-2">
        <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-white">
          AHMED NABIL
        </h1>
        <VerifiedBadge size={36} />
      </div>

      {/* Tagline */}
      <div ref={taglineRef} className="mb-10 text-center">
        <p
          className="font-display italic text-xl md:text-3xl font-light"
          style={{
            background: 'linear-gradient(135deg, #00f0ff, #ffffff, #FFD700, #00f0ff)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite',
          }}
        >
          Visionary · Empire Builder · Digital Titan
        </p>
        <p className="mt-3 font-sans text-sm text-white/40 tracking-widest uppercase font-light">
          Building the future, one empire at a time
        </p>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-12">
        <NetWorthTicker />
        <div className="w-[1px] h-12 bg-white/10 hidden md:block" />
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase">Founded</span>
          <span className="font-display text-3xl font-light text-white">12+</span>
          <span className="font-mono text-[0.6rem] tracking-widest text-white/20 uppercase">Ventures</span>
        </div>
        <div className="w-[1px] h-12 bg-white/10 hidden md:block" />
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase">Countries</span>
          <span className="font-display text-3xl font-light text-neon">30+</span>
          <span className="font-mono text-[0.6rem] tracking-widest text-white/20 uppercase">Presence</span>
        </div>
        <div className="w-[1px] h-12 bg-white/10 hidden md:block" />
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase">Impact</span>
          <span className="font-display text-3xl font-light text-gold">∞</span>
          <span className="font-mono text-[0.6rem] tracking-widest text-white/20 uppercase">Limitless</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <a href="#vision" data-hover
          className="px-8 py-3 bg-neon/10 border border-neon/40 text-neon font-mono text-xs tracking-widest uppercase hover:bg-neon/20 hover:border-neon/80 transition-all duration-300"
          style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
          Explore Empire
        </a>
        <a href="#contact" data-hover
          className="px-8 py-3 bg-gold/10 border border-gold/30 text-gold font-mono text-xs tracking-widest uppercase hover:bg-gold/20 transition-all duration-300"
          style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
          Make Contact
        </a>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[0.55rem] tracking-[0.4em] text-white/20 uppercase">Scroll</span>
        <div className="w-[1px] h-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neon to-transparent"
            style={{ animation: 'scrollLine 1.5s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  )
}