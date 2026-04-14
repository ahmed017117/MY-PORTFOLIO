# AHMED NABIL — Empire Portfolio

A billionaire-level personal portfolio website built with React, Vite, GSAP, Three.js & Tailwind CSS.

---

## ⚡ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI components & hooks |
| **Vite 5** | Ultra-fast build tool |
| **Tailwind CSS 3** | Utility-first styling |
| **GSAP 3 + ScrollTrigger** | High-performance animations |
| **Three.js / R3F** | 3D particle background |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Install & Run

```bash
# Clone or unzip the project
cd ahmed-nabil-portfolio

# Install all dependencies
npm install

# Start development server
npm run dev
```

Open your browser at: **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗂️ Project Structure

```
ahmed-nabil-portfolio/
├── index.html                    # HTML entry point
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind theme + custom tokens
├── postcss.config.js             # PostCSS setup
├── package.json                  # Dependencies
├── public/
│   └── favicon.svg               # Site favicon
└── src/
    ├── main.jsx                  # React root mount
    ├── App.jsx                   # Main app shell + Easter egg + Footer
    ├── index.css                 # Global styles, CSS variables, custom utilities
    └── components/
        ├── CustomCursor.jsx      # Animated neon cursor (desktop only)
        ├── Loader.jsx            # Cinematic intro loader
        ├── ParticleBackground.jsx# Three.js R3F 3D particle field
        ├── Nav.jsx               # Sticky navigation bar
        ├── Hero.jsx              # Hero: name, badge, net worth, parallax
        ├── Identity.jsx          # Bio + profile traits
        ├── EmpireVision.jsx      # Interactive business venture cards
        ├── Skills.jsx            # Animated SVG circular skill bars
        ├── Achievements.jsx      # Animated counter milestones
        ├── Gallery.jsx           # Luxury preview gallery
        └── Contact.jsx           # Premium floating-label form
```

---

## ✨ Features

### 🎬 Animations
- **Cinematic loader** with progress bar + percentage counter
- **GSAP ScrollTrigger** — every section animates on scroll
- **Mouse parallax** on hero profile image
- **3D particle field** (Three.js) — neon blue + gold particles orbiting
- **Floating UI elements** and staggered reveals
- **Counter animations** (net worth ticker, achievement numbers)

### 👑 Hero Section
- Name with **Facebook-style verified blue tick** ✓
- **Circular profile** with animated rotating gradient border
- **Net Worth "Loading…"** animated ticker ($2.47B)
- Gradient shimmer tagline text
- Scroll indicator animation

### 🧩 All Sections
1. **Identity** — Bio card + trait list with hover effects
2. **Empire Vision** — 6 venture cards, click to expand blueprint
3. **Mastery** — SVG circular progress bars, animated on scroll
4. **Milestones** — Animated counters for 6 key achievements
5. **Luxury Preview** — Gallery with hover zoom + overlay
6. **Connect** — Floating-label form with animated focus lines

### 🔧 Performance
- GPU-accelerated transforms (`will-change`, `translateZ(0)`)
- Lazy-loaded Three.js via `React.lazy + Suspense`
- Manual chunk splitting in Vite build
- Passive scroll listeners
- `dpr` capped at 1.5 for Three.js canvas
- Reduced motion support via CSS media query
- Custom cursor disabled on mobile

### 🥚 Easter Egg
- Click the `◈` icon in the bottom-right corner **5 times**
- A hidden quote reveals itself

---

## 🎨 Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--dark-base` | `#0a0a0a` | Background |
| `--neon` | `#00f0ff` | Primary accent |
| `--gold` | `#FFD700` | Secondary accent |
| Font Display | Cormorant Garamond | Headings |
| Font Sans | DM Sans | Body |
| Font Mono | JetBrains Mono | Labels, UI |

---

## 🖼️ Customization

### Replace Profile Image
In `Hero.jsx`, find the profile div and replace the SVG placeholder with:
```jsx
<img
  src="/assets/ahmed-nabil.jpg"
  alt="Ahmed Nabil"
  className="w-full h-full object-cover object-center"
  loading="eager"
/>
```
Place your image in `/public/assets/ahmed-nabil.jpg`.

### Replace Gallery Images
In `Gallery.jsx`, update each item's `gradient` with an `src` property and render an `<img>` tag.

### Update Content
All text content is inline in each component. Search for the relevant section and update strings directly.

---

## 📱 Responsive Breakpoints

| Breakpoint | Screen | Behavior |
|---|---|---|
| `sm` | 640px+ | 2-column grids |
| `md` | 768px+ | Nav links visible, 2-col layout |
| `lg` | 1024px+ | 3-column grids, full layout |

Heavy animations (3D particles, custom cursor) are automatically reduced/hidden on mobile.

---

## 🛠️ Common Issues

**Three.js import error:**
```bash
npm install three @react-three/fiber @react-three/drei
```

**Tailwind classes not working:**
Make sure `tailwind.config.js` content array includes `./src/**/*.{js,jsx}`.

**GSAP ScrollTrigger not firing:**
Ensure `gsap.registerPlugin(ScrollTrigger)` is called at the top of each component file.

---

*Designed for legacy. Built for greatness.*
