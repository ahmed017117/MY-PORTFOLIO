import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Gallery items with gradient placeholders (replace src with real images)
const galleryItems = [
  {
    label: 'The Boardroom',
    sublabel: 'Dubai HQ',
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    accent: '#00f0ff',
    size: 'lg:col-span-2',
  },
  {
    label: 'Summit 2024',
    sublabel: 'Global Forum',
    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    accent: '#FFD700',
    size: '',
  },
  {
    label: 'Meridian Tower',
    sublabel: 'Architecture',
    gradient: 'linear-gradient(135deg, #0d0d0d, #1a0533)',
    accent: '#a78bfa',
    size: '',
  },
  {
    label: 'Fleet',
    sublabel: 'The Collection',
    gradient: 'linear-gradient(135deg, #0a0a0a, #1a1206)',
    accent: '#FFD700',
    size: '',
  },
  {
    label: 'Private Jet',
    sublabel: 'Air Empire',
    gradient: 'linear-gradient(135deg, #001122, #002244)',
    accent: '#00f0ff',
    size: 'lg:col-span-2',
  },
]

function GalleryCard({ item }) {
  return (
    <div
      data-hover
      className={`gallery-item relative aspect-[4/3] ${item.size} cursor-pointer overflow-hidden`}
      style={{ background: item.gradient }}
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${item.accent}20 1px, transparent 1px), linear-gradient(90deg, ${item.accent}20 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Corner decoration */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l" style={{ borderColor: `${item.accent}60` }} />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r" style={{ borderColor: `${item.accent}60` }} />

      {/* Icon decoration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display text-7xl md:text-9xl font-light opacity-10"
          style={{ color: item.accent }}
        >
          {item.label[0]}
        </span>
      </div>

      {/* Overlay info */}
      <div className="gallery-overlay" />
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 hover:opacity-100 hover:translate-y-0">
        <div className="font-mono text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: item.accent }}>
          {item.sublabel}
        </div>
        <div className="font-display text-2xl text-white font-light">{item.label}</div>
      </div>

      {/* Always-visible label at bottom */}
      <div className="absolute bottom-4 left-4">
        <div className="font-mono text-[0.55rem] tracking-widest uppercase text-white/40">
          {item.sublabel}
        </div>
        <div className="font-sans text-sm text-white/70 font-light">{item.label}</div>
      </div>

      {/* Accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-40"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
      />
    </div>
  )
}

export default function Gallery() {
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
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="relative py-32 px-6 max-w-7xl mx-auto">
      <div ref={headingRef} className="flex items-center gap-4 mb-16">
        <span className="font-mono text-[0.65rem] text-neon tracking-[0.4em] uppercase">05</span>
        <span className="flex-1 max-w-xs h-[1px] bg-gradient-to-r from-neon/40 to-transparent" />
        <h2 className="section-heading text-4xl md:text-6xl text-white/90">The Luxury Preview</h2>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
      >
        {galleryItems.map((item) => (
          <GalleryCard key={item.label} item={item} />
        ))}
      </div>
    </section>
  )
}
