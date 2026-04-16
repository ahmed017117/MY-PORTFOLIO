
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

        <svg
          width="140"
          height="120"
          viewBox="0 0 140 120"
          style={{
            animation: 'crownDrop 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            filter: 'drop-shadow(0 10px 30px rgba(251, 191, 36, 0.3))',
          }}
        >
          <defs>
            <linearGradient id="crownGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FCD34D', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#D97706', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="crownShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" />
            </filter>
          </defs>

          <g filter="url(#crownShadow)">
            <path
              d="M 70 10 L 95 60 L 105 45 L 120 75 L 90 75 L 85 55 L 70 35 L 55 55 L 50 75 L 20 75 L 35 45 L 45 60 Z"
              fill="url(#crownGradient)"
              stroke="#B45309"
              strokeWidth="1.5"
            />

            <path
              d="M 55 65 L 70 45 L 85 65"
              fill="none"
              stroke="#1F2937"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="35" cy="75" r="3.5" fill="#1F2937" />
            <circle cx="52" cy="78" r="3.5" fill="#1F2937" />
            <circle cx="88" cy="78" r="3.5" fill="#1F2937" />
            <circle cx="105" cy="75" r="3.5" fill="#1F2937" />

            <ellipse cx="70" cy="20" rx="8" ry="12" fill="url(#crownGradient)" stroke="#B45309" strokeWidth="1" />
          </g>
        </svg>

        <div className="flex items-center gap-[2px]">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="loader-letter"
              style={{
                display: 'inline-block',
                fontSize: letter === ' ' ? '1.5rem' : '2.5rem',
                fontWeight: 300,
                fontFamily: "'Segoe UI', 'Trebuchet MS', system-ui, sans-serif",
                letterSpacing: '0.18em',
                color: 'transparent',
                WebkitTextStroke: '0.8px rgba(255,255,255,0.2)',
                animation: 'revealLetter 0.6s forwards',
                animationDelay: `${i * 0.12 + 0.3}s`,
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
        @keyframes crownDrop {
          0% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
          }
          70% {
            transform: translateY(5px) scale(1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes revealLetter {
          0% {
            opacity: 0;
            transform: translateY(15px);
            -webkit-text-stroke: 0.8px rgba(255,255,255,0.1);
            color: transparent;
          }
          50% {
            opacity: 0.7;
            transform: translateY(0);
            -webkit-text-stroke: 0.8px rgba(255,255,255,0.3);
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

