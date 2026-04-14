import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const links = [
  { label: 'Identity', href: '#identity' },
  { label: 'Vision', href: '#vision' },
  { label: 'Skills', href: '#skills' },
  { label: 'Milestones', href: '#achievements' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )

    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-base/80 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <span className="font-display text-lg font-light tracking-[0.3em] text-white/90 group-hover:text-neon transition-colors duration-300">
            AN
          </span>
          <span className="w-[1px] h-4 bg-white/20" />
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/30 uppercase">Empire</span>
        </a>

        {/* Links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link" data-hover>
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          data-hover
          className="hidden md:flex items-center gap-2 px-5 py-2 border border-neon/30 text-neon font-mono text-[0.65rem] tracking-widest uppercase hover:bg-neon/10 transition-all duration-300"
        >
          Connect
        </a>
      </div>
    </nav>
  )
}
