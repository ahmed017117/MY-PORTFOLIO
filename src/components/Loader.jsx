import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const nameRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const letters = nameRef.current.children;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: onComplete,
        });
      },
    });

    // ✨ Elegant text reveal
    tl.from(letters, {
      opacity: 0,
      y: 40,
      stagger: 0.06,
      duration: 0.8,
      ease: "power3.out",
    });

    // subtle luxury scale
    tl.to(nameRef.current, {
      scale: 1.05,
      duration: 0.6,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });

    // 📊 Clean line loader
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 2,
        ease: "power2.inOut",
        transformOrigin: "left",
      }
    );

    return () => tl.kill();
  }, [onComplete]);

  const name = "AHMED-NABIL";

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50"
    >
      {/* ✨ Name */}
      <h1
        ref={nameRef}
        className="flex text-4xl md:text-6xl tracking-[0.25em] font-light"
      >
        {name.split("").map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </h1>

      {/* 📊 Minimal Loader Line */}
      <div className="mt-8 w-48 h-[1px] bg-gray-700 overflow-hidden">
        <div
          ref={lineRef}
          className="h-full bg-white origin-left scale-x-0"
        ></div>
      </div>
    </div>
  );
}
