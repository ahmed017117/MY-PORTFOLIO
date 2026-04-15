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
          duration: 1,
          ease: "power4.inOut",
          onComplete: onComplete,
        });
      },
    });

    // 👑 Crown animation
    tl.from(crownRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    // ✨ Name animation (letter effect)
    const letters = nameRef.current.children;

    tl.from(
      letters,
      {
        opacity: 0,
        y: 50,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // 🔥 Glow pulse
    tl.to(nameRef.current, {
      scale: 1.05,
      repeat: 1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
    });

    // 📊 Progress
    tl.to(progress, {
      value: 100,
      duration: 2.5,
      ease: "power2.out",
      onUpdate: () => {
        const val = Math.floor(progress.value);
        percentRef.current.innerText = val + "%";
        barRef.current.style.width = val + "%";
      },
    });

    return () => tl.kill();
  }, [onComplete]);

  // 🔤 Split name into letters
  const name = "AHMED NABIL";

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center text-white z-50"
    >
      {/* 👑 Crown */}
      <div
        ref={crownRef}
        className="text-5xl mb-4"
      >
        👑
      </div>

      {/* ✨ Name */}
      <h1
        ref={nameRef}
        className="text-4xl md:text-6xl font-serif tracking-widest flex"
      >
        {name.split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </h1>

      {/* 📊 Loading Bar */}
      <div className="mt-10 w-64 h-[3px] bg-gray-700 overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-white w-0"
        ></div>
      </div>

      {/* % */}
      <p ref={percentRef} className="mt-3 text-sm tracking-widest">
        0%
      </p>
    </div>
  );
}
