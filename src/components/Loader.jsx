import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const nameRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Fade in + blur out effect (luxury entry)
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    )

      // Thin luxury line animation
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )

      // Slight upscale (confidence feel)
      .to(nameRef.current, {
        scale: 1.03,
        duration: 0.4,
        ease: "power1.inOut",
      })

      // Exit fade
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => onComplete && onComplete(),
      });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 9999,
      }}
    >
      {/* Name */}
      <h1
        ref={nameRef}
        style={{
          fontSize: "clamp(2.5rem, 7vw, 5rem)",
          fontWeight: 300,
          letterSpacing: "0.4em",
          color: "#ffffff",
          textTransform: "uppercase",
        }}
      >
        AHMED NABIL
      </h1>

      {/* Elegant line */}
      <div
        ref={lineRef}
        style={{
          marginTop: "20px",
          width: "120px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #fff, transparent)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
