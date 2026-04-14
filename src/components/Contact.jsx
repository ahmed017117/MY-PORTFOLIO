import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const formRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      )
      gsap.fromTo(formRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const btn = e.target.querySelector('[type="submit"]')
    gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6 max-w-7xl mx-auto">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,240,255,0.04) 0%, transparent 70%)' }}
      />

      <div ref={headingRef} className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[0.65rem] text-gold tracking-[0.4em] uppercase">06</span>
        <span className="flex-1 max-w-xs h-[1px] bg-gradient-to-r from-gold/40 to-transparent" />
        <h2 className="section-heading text-4xl md:text-6xl text-white/90">Connect</h2>
      </div>
      <p className="text-white/30 text-sm font-light mb-16 max-w-lg font-sans">
        Reserved for those with vision. If you're building something extraordinary, the door is open.
      </p>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: info */}
        <div className="flex flex-col gap-10">
          {[
            { label: 'Business Inquiries', value: 'ahmednabil713125@gmail.com', color: '#00f0ff' },
            { label: 'Investment Office', value: 'ahmednabil713125@gmail.com', color: '#FFD700' },
            { label: 'Press & Media', value: 'ahmednabil713125@gmail.com', color: '#a78bfa' },
          ].map((contact) => (
            <div key={contact.label}>
              <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase mb-2" style={{ color: `${contact.color}60` }}>
                {contact.label}
              </div>
              <a
                href={`mailto:${contact.value}`}
                data-hover
                className="font-display text-xl font-light transition-all duration-300 hover:opacity-80"
                style={{ color: contact.color, textShadow: `0 0 20px ${contact.color}30` }}
              >
                {contact.value}
              </a>
            </div>
          ))}

          {/* Social links */}
          <div className="flex gap-4 pt-4">
          <a href="https://www.instagram.com/unknown_n8n" target="_blank" rel="noreferrer"
  data-hover className="w-10 h-10 border border-white/5 flex items-center justify-center hover:border-neon/30 transition-all duration-300">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="#E1306C" stroke="none"/>
  </svg>
</a>

<a href="https://www.facebook.com/redlineesp" target="_blank" rel="noreferrer"
  data-hover className="w-10 h-10 border border-white/5 flex items-center justify-center hover:border-neon/30 transition-all duration-300">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
</a>

<a href="https://www.tiktok.com/@unknown_n10n" target="_blank" rel="noreferrer"
  data-hover className="w-10 h-10 border border-white/5 flex items-center justify-center hover:border-neon/30 transition-all duration-300">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
</a>
        
          </div>
        </div>

        {/* Right: form */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Name */}
          <div className="form-field">
            <input
              type="text"
              placeholder=" "
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
            <label>Name</label>
            <div className="form-line" />
          </div>

          {/* Email */}
          <div className="form-field">
            <input
              type="Gmail"
              placeholder=" "
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
            <label>Your Gmail</label>
            <div className="form-line" />
          </div>

          {/* Subject */}
          <div className="form-field">
            <input
              type="text"
              placeholder=" "
              value={form.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
            />
            <label>Subject</label>
            <div className="form-line" />
          </div>

          {/* Message */}
          <div className="form-field">
            <textarea
              rows={4}
              placeholder=" "
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              required
              style={{ resize: 'none' }}
            />
            <label>Your Message</label>
            <div className="form-line" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            data-hover
            className="relative overflow-hidden px-8 py-4 border border-neon/40 text-neon font-mono text-xs tracking-[0.3em] uppercase hover:bg-neon/10 transition-all duration-300 group"
            style={{ clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}
          >
            <span className="relative z-10">
              {submitted ? '✓ Message Sent' : 'Transmit Message →'}
            </span>
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.05), transparent)' }}
            />
          </button>
        </form>
      </div>
    </section>
  )
}
