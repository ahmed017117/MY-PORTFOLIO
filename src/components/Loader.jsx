import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const bgRef = useRef(null);
  const glowRef = useRef(null);
  const nameRef = useRef(null);
  const lineRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Dark fade in
    tl.fromTo(loaderRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    )

    // Background subtle movement
    .to(bgRef.current, {
      backgroundPosition: "200% center",
      duration: 6,
      ease: "none"
    })

    // Glow build-up
    .fromTo(glowRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
      "-=5"
    )

    // Flash hit
    .to(flashRef.current, { opacity: 1, duration: 0.1 })
    .to(flashRef.current, { opacity: 0, duration: 0.3 })

    // Name reveal
    .fromTo(nameRef.current,
      {
        opacity: 0,
        scale: 0.7,
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

    // Underline expand
    .fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )

    // Glow pulse
    .to(nameRef.current, {
      textShadow: "0 0 20px #00f0ff, 0 0 60px #FFD700",
      duration: 0.6,
      yoyo: true,
      repeat: 2
    })

    // Exit
    .to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
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
        overflow: "hidden",
        zIndex: 9999
      }}
    >
      {/* Moving gradient background */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, #000, #001a1f, #000, #1a1200, #000)",
          backgroundSize: "300% 300%"
        }}
      />

      {/* Glow layer */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle, rgba(0,240,255,0.15), transparent 60%)",
          opacity: 0
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

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <h1
          ref={nameRef}
          style={{
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: 300,
            letterSpacing: "0.3em",
            color: "#fff",
            textTransform: "uppercase"
          }}
        >
          AHMED NABIL
        </h1>

        <div
          ref={lineRef}
          style={{
            marginTop: "20px",
            height: "2px",
            width: "120px",
            background: "linear-gradient(90deg,#00f0ff,#FFD700)",
            transformOrigin: "left"
          }}
        />
      </div>
    </div>
  );
}
