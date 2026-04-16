import { useEffect, useState } from 'react';

const letters = ['A', 'H', 'M', 'E', 'D', ' ', 'N', 'A', 'B', 'I', 'L'];

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('enter');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.2;
      });
    }, 20);

    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 2200);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 2900);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-700 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center gap-10">

        <div className="flex items-center gap-[2px]">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="loader-letter"
              style={{
                display: 'inline-block',
                fontSize: letter === ' ' ? '2.5rem' : '3rem',
                fontWeight: 800,
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                letterSpacing: '0.12em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.15)',
                animation: 'revealLetter 0.5s forwards',
                animationDelay: `${i * 0.08}s`,
                opacity: 0,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>

        <div className="w-[300px] flex flex-col gap-2">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/30 text-xs tracking-widest uppercase font-light">
              Loading
            </span>
            <span className="text-white/50 text-xs font-mono">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </div>

        <div className="absolute -inset-20 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/5"
              style={{
                width: `${180 + i * 80}px`,
                height: `${180 + i * 80}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes revealLetter {
          0% {
            opacity: 0;
            transform: translateY(20px);
            -webkit-text-stroke: 1px rgba(255,255,255,0.15);
            color: transparent;
          }
          60% {
            opacity: 1;
            transform: translateY(0);
            -webkit-text-stroke: 1px rgba(255,255,255,0.4);
            color: transparent;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            -webkit-text-stroke: 0px transparent;
            color: #ffffff;
          }
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}
