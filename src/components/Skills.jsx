import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: 'Strategic Vision', value: 98, color: '#00f0ff' },
  { name: 'Capital Allocation', value: 95, color: '#FFD700' },
  { name: 'Tech Innovation', value: 92, color: '#a78bfa' },
  { name: 'Brand Building', value: 97, color: '#fb923c' },
  { name: 'Negotiation', value: 94, color: '#34d399' },
  { name: 'Global Networking', value: 99, color: '#f472b6' },
]

const SIZE = 120
const STROKE = 6
const RADIUS = (SIZE - STROKE * 2) / 2
const CIRCUMFERENCE = RADIUS * Math.PI * 2

function SkillCircle({ skill, animate }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!animate) return
    const duration = 1600
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(eased * skill.value)
      if (p < 1) requestAnimationFrame(tick)
    }
    const delay = setTimeout(() => requestAnimationFrame(tick), 200)
    return () => clearTimeout(delay)
  }, [animate, skill.value])

  const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE

  return (
    <div className="flex flex-col items-center gap-4 group">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} className="gpu-accelerated">
          {/* Track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={STROKE}
          />
          {/* Fill */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={skill.color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
              filter: `drop-shadow(0 0 6px ${skill.color}80)`,
              transition: 'stroke-dashoffset 0.05s linear',
            }}
          />
        </svg>
        {/* Value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-lg font-light" style={{ color: skill.color }}>
            {Math.round(progress)}
            <span className="text-xs opacity-60">%</span>
          </span>
        </div>
      </div>
      <span className="font-sans text-xs text-white/50 text-center tracking-wide group-hover:text-white/80 transition-colors">
        {skill.name}
      </span>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      )
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 75%',
        onEnter: () => {
          setAnimate(true)
          gsap.fromTo(gridRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
          )
        },
        once: true,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 px-6 max-w-7xl mx-auto">
      <div ref={headingRef} className="flex items-center gap-4 mb-20">
        <span className="font-mono text-[0.65rem] text-neon tracking-[0.4em] uppercase">03</span>
        <span className="flex-1 max-w-xs h-[1px] bg-gradient-to-r from-neon/40 to-transparent" />
        <h2 className="section-heading text-4xl md:text-6xl text-white/90">Mastery</h2>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12"
      >
        {skills.map((skill) => (
          <SkillCircle key={skill.name} skill={skill} animate={animate} />
        ))}
      </div>

      {/* Horizontal rule with text */}
      <div className="mt-20 flex items-center gap-6">
        <div className="flex-1 h-[1px] bg-white/5" />
        <span className="font-mono text-[0.6rem] text-white/20 tracking-[0.4em] uppercase">
          Excellence is the standard
        </span>
        <div className="flex-1 h-[1px] bg-white/5" />
      </div>
    </section>
  )
}
