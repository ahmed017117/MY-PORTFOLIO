import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  { number: 12, suffix: '+', label: 'Ventures Founded', color: '#00f0ff', desc: 'Successful exits & active companies' },
  { number: 2.47, suffix: 'B', label: 'Net Worth (USD)', color: '#FFD700', prefix: '$', desc: 'And growing exponentially' },
  { number: 30, suffix: '+', label: 'Countries', color: '#a78bfa', desc: 'Global operational presence' },
  { number: 50000, suffix: '+', label: 'Lives Impacted', color: '#34d399', desc: 'Jobs created & communities built' },
  { number: 15, suffix: '', label: 'Industry Awards', color: '#fb923c', desc: 'Top entrepreneur recognition' },
  { number: 99, suffix: '%', label: 'Success Rate', color: '#f472b6', desc: 'Ventures reaching profitability' },
]

function CounterBlock({ item, animate }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!animate) return
    const isFloat = !Number.isInteger(item.number)
    const duration = 2000
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(isFloat ? +(eased * item.number).toFixed(2) : Math.round(eased * item.number))
      if (p < 1) requestAnimationFrame(tick)
    }
    const delay = setTimeout(() => requestAnimationFrame(tick), 200)
    return () => clearTimeout(delay)
  }, [animate, item.number])

  return (
    <div className="glass-card border border-white/5 p-8 group hover:border-white/10 transition-all duration-500 relative overflow-hidden">
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${item.color}08 0%, transparent 70%)` }}
      />

      <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase mb-3" style={{ color: `${item.color}60` }}>
        Achievement
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        {item.prefix && (
          <span className="font-mono text-2xl font-light" style={{ color: item.color }}>
            {item.prefix}
          </span>
        )}
        <span
          className="font-display font-light"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: item.color,
            textShadow: `0 0 30px ${item.color}40`,
            lineHeight: 1,
          }}
        >
          {value.toLocaleString()}
        </span>
        <span
          className="font-display font-light text-3xl"
          style={{ color: item.color }}
        >
          {item.suffix}
        </span>
      </div>

      <div className="font-sans text-white/80 text-sm font-light mb-1">{item.label}</div>
      <div className="font-mono text-[0.65rem] text-white/25 tracking-wide">{item.desc}</div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-700"
        style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
      />
    </div>
  )
}

export default function Achievements() {
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
        start: 'top 70%',
        onEnter: () => {
          setAnimate(true)
          gsap.fromTo(gridRef.current.children,
            { y: 40, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
          )
        },
        once: true,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="achievements" ref={sectionRef} className="relative py-32 px-6 max-w-7xl mx-auto">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,240,255,0.03) 0%, transparent 70%)' }}
      />

      <div ref={headingRef} className="flex items-center gap-4 mb-16">
        <span className="font-mono text-[0.65rem] text-gold tracking-[0.4em] uppercase">04</span>
        <span className="flex-1 max-w-xs h-[1px] bg-gradient-to-r from-gold/40 to-transparent" />
        <h2 className="section-heading text-4xl md:text-6xl text-white/90">Milestones</h2>
      </div>

      <div
        ref={gridRef}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {achievements.map((item) => (
          <CounterBlock key={item.label} item={item} animate={animate} />
        ))}
      </div>
    </section>
  )
}
