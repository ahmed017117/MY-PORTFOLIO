import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const bgRef = useRef(null);
  const nameRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // DARK START
    tl.fromTo(
      bgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    )

    // LIGHT BUILD-UP (pulse)
    .to(bgRef.current, {
      boxShadow: "0 0 200px rgba(0,240,255,0.15) inset",
      duration: 1.2,
      ease: "power1.inOut"
    })

    // FLASH EFFECT
    .to(flashRef.current, {
      opacity: 1,
      duration: 0.15
    })
    .to(flashRef.current, {
      opacity: 0,
      duration: 0.3
    })

    // NAME REVEAL (EPIC)
    .fromTo(
      nameRef.current,
      {
        opacity: 0,
        scale: 0.8,
        letterSpacing: "1em",
        filter: "blur(20px)"
      },
      {
        opacity: 1,
        scale: 1,
        letterSpacing: "0.3em",
        filter: "blur(0px)",
        duration: 1.2,
        ease: "expo.out"
      }
    )

    // FINAL GLOW PULSE
    .to(nameRef.current, {
      textShadow:
        "0 0 20px #00f0ff, 0 0 40px #00f0ff, 0 0 80px #FFD700",
      duration: 0.6,
      yoyo: true,
      repeat: 1
    })

    // EXIT
    .to(loaderRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      onComplete: () => onComplete && onComplete()
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden"
      }}
    >
      {/* Background */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,240,255,0.15), transparent 70%)"
        }}
      />

      {/* Flash */}
      <div
        ref={flashRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#fff",
          opacity: 0
        }}
      />

      {/* Name */}
      <h1
        ref={nameRef}
        style={{
          fontSize: "clamp(3rem, 10vw, 7rem)",
          fontWeight: "300",
          letterSpacing: "0.3em",
          color: "#fff",
          textTransform: "uppercase",
          zIndex: 2
        }}
      >
        AHMED NABIL
      </h1>
    </div>
  );
}
