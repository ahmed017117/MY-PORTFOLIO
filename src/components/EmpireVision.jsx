import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const visions = [
  {
    id: '01',
    title: 'TechNexus AI',
    category: 'Artificial Intelligence',
    desc: 'Building the operating system for the next billion AI-powered enterprises. Infrastructure that thinks.',
    detail: 'A global AI platform serving 500M+ users by 2030. Leveraging proprietary neural architectures to automate industries at planetary scale.',
    icon: '⬡',
    color: '#00f0ff',
  },
  {
    id: '02',
    title: 'Vault Capital',
    category: 'Investment Empire',
    desc: 'A sovereign-grade investment vehicle deploying capital into the future.',
    detail: 'Multi-asset fund targeting deep tech, biotech, and space ventures. $10B+ AUM within 5 years, seeding the companies that will define civilization.',
    icon: '◈',
    color: '#FFD700',
  },
  {
    id: '03',
    title: 'NabilSphere',
    category: 'Digital Media',
    desc: 'The premium content universe for elite minds. Where intelligence meets entertainment.',
    detail: 'A subscription platform combining long-form journalism, documentary filmmaking, and live events — reaching 100M premium subscribers globally.',
    icon: '◉',
    color: '#a78bfa',
  },
  {
    id: '04',
    title: 'Meridian Real Estate',
    category: 'Property Empire',
    desc: 'Luxury vertical cities and sustainable mega-developments reshaping skylines.',
    detail: 'Developing next-gen smart cities across 5 continents. Blending biophilic design, renewable energy, and AI-controlled infrastructure.',
    icon: '◬',
    color: '#fb923c',
  },
  {
    id: '05',
    title: 'Apex Health',
    category: 'Longevity Tech',
    desc: 'Engineering human longevity. Because greatness deserves more time.',
    detail: 'Breakthrough biotech targeting cellular aging reversal, precision medicine, and neural augmentation. The goal: add 30 quality years to human life.',
    icon: '◎',
    color: '#34d399',
  },
  {
    id: '06',
    title: 'StarRoute Space',
    category: 'Space Commerce',
    desc: 'The first private space logistics and habitation empire.',
    detail: 'Orbital stations, lunar mining, and interplanetary supply chains. Making humanity multi-planetary, profitably.',
    icon: '✦',
    color: '#f472b6',
  },
]

function VisionCard({ vision, index }) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty('--mx', x + '%')
    cardRef.current.style.setProperty('--my', y + '%')
  }

  return (
    <div
      ref={cardRef}
      data-hover
      className="empire-card glass-card border border-white/5 p-6 md:p-8 cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-3xl"
          style={{ color: vision.color, filter: `drop-shadow(0 0 8px ${vision.color}60)` }}
        >
          {vision.icon}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[0.6rem] tracking-widest text-white/20">{vision.id}</span>
          <span
            className="w-4 h-4 border text-center text-[0.6rem] leading-4 transition-transform duration-300 font-mono"
            style={{ borderColor: `${vision.color}40`, color: vision.color, transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >+</span>
        </div>
      </div>

      <div
        className="font-mono text-[0.6rem] tracking-[0.3em] uppercase mb-2"
        style={{ color: `${vision.color}80` }}
      >
        {vision.category}
      </div>
      <h3 className="font-display text-2xl font-light text-white mb-3">{vision.title}</h3>
      <p className="text-white/40 text-sm leading-relaxed font-light">{vision.desc}</p>

      {/* Expanded detail */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: expanded ? '200px' : '0px', opacity: expanded ? 1 : 0 }}
      >
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-white/60 text-sm leading-relaxed">{vision.detail}</p>
          <div
            className="mt-3 inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest uppercase"
            style={{ color: vision.color }}
          >
            <span className="w-4 h-[1px]" style={{ background: vision.color }} />
            Learn more
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{
          background: `linear-gradient(90deg, ${vision.color}, transparent)`,
          width: expanded ? '100%' : '0%',
        }}
      />
    </div>
  )
}

export default function EmpireVision() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      )
      gsap.fromTo(gridRef.current.children,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="vision" ref={sectionRef} className="relative py-32 px-6 max-w-7xl mx-auto">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(255,215,0,0.03) 0%, transparent 70%)' }}
      />

      <div ref={headingRef} className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[0.65rem] text-gold tracking-[0.4em] uppercase">02</span>
        <span className="flex-1 max-w-xs h-[1px] bg-gradient-to-r from-gold/40 to-transparent" />
        <h2 className="section-heading text-4xl md:text-6xl text-white/90">Empire Vision</h2>
      </div>
      <p className="text-white/30 text-sm font-light mb-16 max-w-md ml-auto font-mono tracking-wide">
        Click any card to reveal the full blueprint →
      </p>

      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative">
        {visions.map((vision, i) => (
          <VisionCard key={vision.id} vision={vision} index={i} />
        ))}
      </div>
    </section>
  )
}
