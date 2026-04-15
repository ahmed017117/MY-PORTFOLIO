import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const crownRef = useRef(null);
  const nameRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    let progress = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 1,
          ease: "power4.inOut",
          onComplete: onComplete,
        });
      },
    });

    // 👑 Crown draw animation
    const paths = crownRef.current.querySelectorAll("path");

    tl.fromTo(
      paths,
      { strokeDasharray: 500, strokeDashoffset: 500 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    // ✨ Name reveal (ultra smooth)
    const letters = nameRef.current.children;

    tl.from(
      letters,
      {
        opacity: 0,
        y: 80,
        rotateX: 90,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
      },
      "-=1"
    );

    // 🔥 Glow pulse
    tl.to(nameRef.current, {
      textShadow: "0 0 20px #FFD700, 0 0 40px #FFD700",
      duration: 0.8,
      yoyo: true,
      repeat: 1,
    });

    // 📊 Progress animation
    tl.to(progress, {
      value: 100,
      duration: 3,
      ease: "power2.out",
      onUpdate: () => {
        const val = Math.floor(progress.value);
        percentRef.current.innerText = val + "%";
        barRef.current.style.width = val + "%";
      },
    });

    return () => tl.kill();
  }, [onComplete]);

  const name = "AHMED NABIL";

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50 overflow-hidden"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-500 opacity-10 blur-[150px] rounded-full"></div>

      {/* 👑 Custom Crown SVG */}
      <svg
        ref={crownRef}
        width="180"
        height="100"
        viewBox="0 0 300 150"
        fill="none"
        stroke="white"
        strokeWidth="3"
        className="mb-6"
      >
        <path d="M10 120 L60 40 L110 120 L160 30 L210 120 L260 50 L290 120" />
        <path d="M40 120 Q150 140 260 120" />
        <circle cx="60" cy="40" r="6" />
        <circle cx="160" cy="30" r="6" />
        <circle cx="260" cy="50" r="6" />
      </svg>

      {/* ✨ Premium Name */}
      <h1
        ref={nameRef}
        className="flex text-4xl md:text-6xl font-serif tracking-[0.3em]"
        style={{
          background: "linear-gradient(90deg, #fff, #FFD700, #fff)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {name.split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </h1>

      {/* 📊 Luxury Loading Bar */}
      <div className="mt-10 w-72 h-[2px] bg-gray-800 overflow-hidden relative">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 w-0"
        ></div>
      </div>

      {/* % */}
      <p
        ref={percentRef}
        className="mt-3 text-xs tracking-[0.4em] text-gray-400"
      >
        0%
      </p>
    </div>
  );
          }
