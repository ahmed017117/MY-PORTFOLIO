import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const traits = [
  { label: 'Strategist', icon: '◈' },
  { label: 'Innovator', icon: '◇' },
  { label: 'Investor', icon: '◆' },
  { label: 'Visionary', icon: '◉' },
]

export default function Identity() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      )
      gsap.fromTo(contentRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="identity" ref={sectionRef} className="relative py-32 px-6 max-w-7xl mx-auto">
      {/* Section label */}
      <div ref={headingRef} className="flex items-center gap-4 mb-16">
        <span className="font-mono text-[0.65rem] text-neon tracking-[0.4em] uppercase">01</span>
        <span className="flex-1 max-w-xs h-[1px] bg-gradient-to-r from-neon/40 to-transparent" />
        <h2 className="section-heading text-4xl md:text-6xl text-white/90">Identity</h2>
      </div>

      <div ref={contentRef} className="grid md:grid-cols-2 gap-12 items-start">
        {/* Bio card */}
        <div className="glass-card gradient-border p-8 md:p-12">
          <div className="font-mono text-[0.6rem] text-neon tracking-widest uppercase mb-6 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-neon" />
            Profile
          </div>
          <blockquote className="font-display text-2xl md:text-3xl font-light text-white/90 leading-relaxed italic mb-8">
            "I don't follow markets — I create them."
          </blockquote>
          <p className="text-white/50 text-sm leading-relaxed font-light mb-6">
            Ahmed Nabil is a serial entrepreneur, global investor, and digital empire architect. 
            With a relentless drive for innovation, he has built ventures spanning technology, 
            real estate, media, and finance — all unified by one vision: <span className="text-neon">redefining what's possible</span>.
          </p>
          <p className="text-white/50 text-sm leading-relaxed font-light">
            Born with an obsession for excellence, Ahmed has turned bold ideas into 
            billion-dollar realities across <span className="text-gold">30+ countries</span>. 
            His philosophy is simple: move fast, think deeply, and never settle.
          </p>
        </div>

        {/* Traits */}
        <div className="flex flex-col gap-4">
          {traits.map((trait, i) => (
            <div
              key={trait.label}
              data-hover
              className="empire-card glass-card border border-white/5 px-6 py-5 flex items-center justify-between group cursor-default"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="text-neon text-xl font-mono">{trait.icon}</span>
                <span className="font-display text-xl text-white/80 group-hover:text-white transition-colors">
                  {trait.label}
                </span>
              </div>
              <span className="font-mono text-[0.6rem] text-white/20 group-hover:text-neon/60 transition-colors tracking-widest">
                0{i + 1}
              </span>
            </div>
          ))}

          {/* Location */}
          <div className="mt-4 flex items-center gap-3">
            <span className="font-mono text-[0.6rem] text-white/20 tracking-widest uppercase">Based in</span>
            <span className="w-12 h-[1px] bg-white/10" />
            <span className="font-display text-lg text-white/60 italic">The World</span>
          </div>
        </div>
      </div>
    </section>
  )
}
