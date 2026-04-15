import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const nameRef = useRef(null);
  const cursorRef = useRef(null);
  const lineRef = useRef(null);
  const planetRef = useRef(null);
  const blastRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    const text = "AHMED NABIL";
    let current = "";

    // ✍️ Typing with cursor
    text.split("").forEach((char, i) => {
      tl.to({}, {
        duration: 0.06,
        onUpdate: () => {
          current += char;
          nameRef.current.textContent = current;
        }
      });
    });

    // Cursor blink stop
    tl.to(cursorRef.current, { opacity: 0, duration: 0.2 });

    // ⚡ Line fill (FAST)
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    // 🌌 Glow build
    tl.to(glowRef.current, {
      opacity: 1,
      duration: 0.6
    });

    // 🌍 Planet appear + rotate feel
    tl.fromTo(
      planetRef.current,
      { scale: 0, opacity: 0, rotate: 0 },
      { scale: 1, opacity: 1, rotate: 180, duration: 0.8, ease: "back.out(2)" }
    );

    // 💥 Blast shockwave
    tl.to(planetRef.current, {
      scale: 3,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in"
    });

    tl.fromTo(
      blastRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 4, opacity: 1, duration: 0.4, ease: "power2.out" },
      "-=0.3"
    );

    // 🔥 Screen glow flash
    tl.to(glowRef.current, {
      opacity: 0.8,
      duration: 0.2
    });

    // 🚪 Exit
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
      {/* Glow background */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle, rgba(0,240,255,0.15), transparent 70%)",
          opacity: 0
        }}
      />

      {/* Name + cursor */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          ref={nameRef}
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 300,
            letterSpacing: "0.3em",
            color: "#fff"
          }}
        ></h1>

        <span
          ref={cursorRef}
          style={{
            width: "2px",
            height: "40px",
            background: "#00f0ff",
            marginLeft: "5px",
            animation: "blink 1s infinite"
          }}
        />
      </div>

      {/* Line */}
      <div style={{
        width: "160px",
        height: "2px",
        background: "rgba(255,255,255,0.1)",
        marginTop: "20px"
      }}>
        <div
          ref={lineRef}
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg,#00f0ff,#FFD700)",
            transform: "scaleX(0)",
            transformOrigin: "left"
          }}
        />
      </div>

      {/* Planet */}
      <div
        ref={planetRef}
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          marginTop: "40px",
          background:
            "radial-gradient(circle at 30% 30%, #00f0ff, #001f2f)",
          boxShadow: "0 0 50px #00f0ff",
          opacity: 0
        }}
      />

      {/* Blast */}
      <div
        ref={blastRef}
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9), transparent)",
          opacity: 0
        }}
      />

      {/* Cursor animation */}
      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1 }
            25%, 75% { opacity: 0 }
          }
        `}
      </style>
    </div>
  );
}
