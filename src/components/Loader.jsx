import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const nameRef = useRef(null);
  const lineRef = useRef(null);
  const planetRef = useRef(null);
  const blastRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1️⃣ Typing effect (letter by letter)
    const text = "AHMED NABIL";
    nameRef.current.textContent = "";

    text.split("").forEach((char, i) => {
      tl.to(nameRef.current, {
        duration: 0.05,
        onUpdate: () => {
          nameRef.current.textContent += char;
        }
      });
    });

    // 2️⃣ Line fill (fast)
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power2.out" }
    );

    // 3️⃣ Planet appear
    tl.fromTo(
      planetRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
    );

    // 4️⃣ Blast effect
    tl.to(planetRef.current, {
      scale: 2.5,
      opacity: 0,
      duration: 0.4,
      ease: "power3.out"
    });

    tl.fromTo(
      blastRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 3, duration: 0.4, ease: "power2.out" },
      "-=0.3"
    );

    // 5️⃣ Exit
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
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
        flexDirection: "column",
        zIndex: 9999,
        overflow: "hidden"
      }}
    >
      {/* Name */}
      <h1
        ref={nameRef}
        style={{
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          fontWeight: 300,
          letterSpacing: "0.3em",
          color: "#fff",
          fontFamily: "serif"
        }}
      ></h1>

      {/* Line */}
      <div
        style={{
          width: "150px",
          height: "2px",
          background: "rgba(255,255,255,0.2)",
          marginTop: "20px",
          overflow: "hidden"
        }}
      >
        <div
          ref={lineRef}
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg,#00f0ff,#FFD700)",
            transformOrigin: "left",
            transform: "scaleX(0)"
          }}
        />
      </div>

      {/* Planet */}
      <div
        ref={planetRef}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          marginTop: "40px",
          background:
            "radial-gradient(circle at 30% 30%, #00f0ff, #001f2f)",
          boxShadow: "0 0 40px #00f0ff",
          opacity: 0
        }}
      />

      {/* Blast */}
      <div
        ref={blastRef}
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.8), transparent)",
          opacity: 0
        }}
      />
    </div>
  );
}
