import { useState, Suspense, lazy } from 'react'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Identity from './components/Identity'
import EmpireVision from './components/EmpireVision'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

const ParticleBackground = lazy(() => import('./components/ParticleBackground'))

function EasterEgg() {
  const [revealed, setRevealed] = useState(false)
  const [clicks, setClicks] = useState(0)

  const handleClick = () => {
    const next = clicks + 1
    setClicks(next)
    if (next >= 5) {
      setRevealed(true)
      setClicks(0)
      setTimeout(() => setRevealed(false), 5000)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div
        onClick={handleClick}
        data-hover
        className="w-10 h-10 border border-white/5 flex items-center justify-center cursor-pointer hover:border-neon/30 transition-all duration-300"
        title="..."
      >
        <span className="font-mono text-xs text-white/10 hover:text-neon/40 transition-colors select-none">◈</span>
      </div>
      {revealed && (
        <div className="easter-egg-reveal absolute bottom-14 right-0 glass-card border border-gold/30 p-5 w-52 text-center">
          <div className="text-2xl mb-2">🏆</div>
          <div className="font-mono text-[0.6rem] text-gold tracking-widest uppercase mb-2">You found it.</div>
          <div className="font-display italic text-white/60 text-xs leading-relaxed">
            "The details are not details.<br/>They make the design."
          </div>
          <div className="mt-3 font-mono text-[0.55rem] text-white/20 tracking-widest">— Charles Eames</div>
        </div>
      )}
    </div>
  )
}

function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/5 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(0,240,255,0.03) 0%, transparent 70%)' }}
      />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display text-3xl font-light tracking-[0.3em] text-white/30">
            AHMED NABIL
          </span>
          <span className="font-mono text-[0.55rem] text-white/15 tracking-[0.5em] uppercase">
            Digital Empire · Est. 2010
          </span>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            <span className="font-mono text-[0.6rem] text-neon/40 tracking-widest uppercase">
              All Systems Online
            </span>
          </div>
          <span className="font-mono text-[0.55rem] text-white/10 tracking-widest">
            © {new Date().getFullYear()} Ahmed Nabil. All rights reserved.
          </span>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center md:items-end gap-1">
          <span className="font-display italic text-white/20 text-sm">
            Built for Greatness
          </span>
          <span className="font-mono text-[0.55rem] text-white/10 tracking-widest uppercase">
            Designed for Legacy
          </span>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-neon/10 to-transparent" />
      </div>
    </footer>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <CustomCursor />

      <div
        className="transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>

        <div className="relative z-10">
          <Nav />
          <main>
            <Hero />
            <Identity />
            <EmpireVision />
            <Skills />
            <Achievements />
            <Gallery />
            <Contact />
          </main>
          <Footer />
        </div>

        <EasterEgg />
      </div>
    </>
  )
}
