import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }) {
  const root = useRef(null);
  const crown = useRef(null);
  const name = useRef(null);
  const progressBar = useRef(null);
  const percent = useRef(null);
  const glow = useRef(null);

  useEffect(() => {
    let prog = { val: 0 };

    // 🎬 MASTER TIMELINE (layered cinematic)
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.to(root.current, {
          opacity: 0,
          scale: 1.08,
          filter: "blur(10px)",
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: onComplete,
        });
      },
    });

    // 👑 Crown cinematic entrance
    tl.fromTo(
      crown.current,
      { scale: 0.5, opacity: 0, y: -120, rotate: -10 },
      { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 1.2 }
    );

    // ✨ Crown subtle float loop
    gsap.to(crown.current, {
      y: "+=10",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });

    // 🔤 Name split animation
    const letters = name.current.children;

    tl.from(
      letters,
      {
        opacity: 0,
        y: 120,
        rotateY: 90,
        stagger: 0.04,
        duration: 1.2,
        ease: "power4.out",
      },
      "-=0.8"
    );

    // ✨ Dynamic glow breathing
    gsap.to(glow.current, {
      scale: 1.4,
      opacity: 0.6,
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: "sine.inOut",
    });

    // 📊 Progress system (smooth easing)
    tl.to(prog, {
      val: 100,
      duration: 3.2,
      ease: "expo.out",
      onUpdate: () => {
        const v = Math.floor(prog.val);
        percent.current.innerText = v + "%";
        progressBar.current.style.transform = `scaleX(${v / 100})`;
      },
    });

    return () => tl.kill();
  }, [onComplete]);

  const text = "AHMED NABIL";

  return (
    <div
      ref={root}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50 overflow-hidden"
    >
      {/* 🌌 Ambient Glow */}
      <div
        ref={glow}
        className="absolute w-[600px] h-[600px] bg-yellow-400 opacity-20 blur-[180px] rounded-full"
      ></div>

      {/* 👑 Crown SVG (clean luxury) */}
      <svg
        ref={crown}
        width="200"
        height="110"
        viewBox="0 0 300 150"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        className="z-10 mb-6"
      >
        <path d="M10 120 L60 40 L110 120 L160 30 L210 120 L260 50 L290 120" />
        <path d="M40 120 Q150 140 260 120" />
      </svg>

      {/* ✨ Name (Luxury Typography) */}
      <h1
        ref={name}
        className="flex z-10 text-5xl md:text-7xl tracking-[0.35em] font-light"
        style={{
          background:
            "linear-gradient(90deg,#ffffff,#FFD700,#ffffff,#FFD700)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {text.split("").map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </h1>

      {/* 📊 Ultra Smooth Bar */}
      <div className="mt-12 w-80 h-[2px] bg-gray-800 overflow-hidden z-10">
        <div
          ref={progressBar}
          className="h-full bg-gradient-to-r from-yellow-400 via-white to-yellow-400 origin-left scale-x-0"
        ></div>
      </div>

      {/* % */}
      <p
        ref={percent}
        className="mt-4 text-xs tracking-[0.5em] text-gray-400 z-10"
      >
        0%
      </p>
    </div>
  );
}
