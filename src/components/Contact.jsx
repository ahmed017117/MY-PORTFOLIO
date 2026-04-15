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
          <a href="https://wa.me/+8801793351010" target="_blank" rel="noreferrer"
  data-hover className="w-10 h-10 border border-white/5 flex items-center justify-center hover:border-green-500/30 transition-all duration-300">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
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
