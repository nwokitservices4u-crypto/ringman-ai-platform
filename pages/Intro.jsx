import { useState, useEffect, useRef } from "react";

const RINGMAN_LINES = [
  { text: "Ladies and gentlemen...", delay: 500, duration: 2200 },
  { text: "Welcome to the auction floor.", delay: 2800, duration: 2000 },
  { text: "Where every deal starts with a ring.", delay: 5000, duration: 2400 },
  { text: "I'm The Ringman.", delay: 7600, duration: 2000 },
  { text: "And I never miss a sale.", delay: 9800, duration: 2200 },
];

export default function Intro({ onComplete }) {
  const [phase, setPhase] = useState("smoke"); // smoke → ring → hat → speak → exit
  const [smokeOpacity, setSmokeOpacity] = useState(1);
  const [ringScale, setRingScale] = useState(0);
  const [ringOpacity, setRingOpacity] = useState(0);
  const [ringGlow, setRingGlow] = useState(0);
  const [hatY, setHatY] = useState(-120);
  const [hatOpacity, setHatOpacity] = useState(0);
  const [currentLine, setCurrentLine] = useState(-1);
  const [exitOpacity, setExitOpacity] = useState(1);
  const [pulseSize, setPulseSize] = useState(1);
  const [particles, setParticles] = useState([]);
  const [smokeParticles, setSmokeParticles] = useState([]);
  const animRef = useRef(null);
  const speakIntervals = useRef([]);

  // Generate smoke particles on mount
  useEffect(() => {
    const smokes = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 30 + Math.random() * 50,
      size: 80 + Math.random() * 180,
      opacity: 0.4 + Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 60,
      speed: 3 + Math.random() * 4,
      delay: Math.random() * 1.5,
    }));
    setSmokeParticles(smokes);

    // Sparkle particles around ring
    const sparks = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      angle: (i / 18) * 360,
      dist: 90 + Math.random() * 30,
      size: 2 + Math.random() * 3,
    }));
    setParticles(sparks);
  }, []);

  // Master timeline
  useEffect(() => {
    // Phase 1: Smoke clears (0–1.8s)
    const t1 = setTimeout(() => setSmokeOpacity(0.85), 300);
    const t2 = setTimeout(() => setSmokeOpacity(0.6), 700);
    const t3 = setTimeout(() => setSmokeOpacity(0.3), 1200);
    const t4 = setTimeout(() => { setSmokeOpacity(0); setPhase("ring"); }, 1800);

    // Phase 2: Ring materializes (1.8–3.2s)
    const t5 = setTimeout(() => { setRingOpacity(0.4); setRingScale(0.6); }, 1900);
    const t6 = setTimeout(() => { setRingOpacity(0.8); setRingScale(0.95); setRingGlow(0.5); }, 2400);
    const t7 = setTimeout(() => { setRingOpacity(1); setRingScale(1); setRingGlow(1); setPhase("hat"); }, 3000);

    // Phase 3: Hat drops (3.0–4.2s)
    const t8 = setTimeout(() => { setHatOpacity(0.7); setHatY(-40); }, 3200);
    const t9 = setTimeout(() => { setHatOpacity(1); setHatY(0); setPhase("speak"); }, 3800);

    // Phase 4: Lines appear
    RINGMAN_LINES.forEach(({ delay, duration }, i) => {
      const ta = setTimeout(() => {
        setCurrentLine(i);
        // Pulse ring on each line
        setPulseSize(1.06);
        setTimeout(() => setPulseSize(1), 300);
      }, delay + 4200);
      speakIntervals.current.push(ta);
    });

    // Phase 5: Exit (15s)
    const t10 = setTimeout(() => {
      setPhase("exit");
      setExitOpacity(0);
    }, 14800);
    const t11 = setTimeout(() => onComplete && onComplete(), 16000);

    return () => {
      [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11].forEach(clearTimeout);
      speakIntervals.current.forEach(clearTimeout);
    };
  }, []);

  const skip = () => {
    speakIntervals.current.forEach(clearTimeout);
    setExitOpacity(0);
    setTimeout(() => onComplete && onComplete(), 600);
  };

  return (
    <div
      onClick={skip}
      style={{
        position: "fixed", inset: 0,
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        opacity: exitOpacity,
        transition: "opacity 1.2s ease",
        zIndex: 9999,
      }}
    >
      {/* BACKGROUND RADIAL GLOW */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,${ringOpacity * 0.06}) 0%, transparent 70%)`,
        transition: "background 1s ease",
        pointerEvents: "none",
      }} />

      {/* SMOKE PARTICLES */}
      {smokeParticles.map(s => (
        <div key={s.id} style={{
          position: "absolute",
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: s.size,
          height: s.size,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(200,200,200,${s.opacity * smokeOpacity}) 0%, transparent 70%)`,
          transform: `translate(-50%, -50%) translateX(${smokeOpacity < 0.5 ? s.drift * (1 - smokeOpacity * 2) : 0}px)`,
          filter: "blur(28px)",
          transition: `all ${s.speed * 0.25}s ease ${s.delay}s`,
          pointerEvents: "none",
        }} />
      ))}

      {/* DENSE SMOKE OVERLAY */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 100% 100% at 50% 50%, rgba(80,80,80,${smokeOpacity * 0.7}) 0%, rgba(20,20,20,${smokeOpacity * 0.9}) 60%, rgba(0,0,0,${smokeOpacity}) 100%)`,
        transition: "background 1.5s ease",
        pointerEvents: "none",
      }} />

      {/* MAIN STAGE */}
      <div style={{
        position: "relative",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        transform: `scale(${pulseSize})`,
        transition: "transform 0.15s ease",
      }}>

        {/* RING OUTER GLOW */}
        {ringOpacity > 0 && (
          <div style={{
            position: "absolute",
            width: 220, height: 220,
            borderRadius: "50%",
            background: "transparent",
            boxShadow: `0 0 ${80 * ringGlow}px ${40 * ringGlow}px rgba(212,175,55,${0.15 * ringGlow}), 0 0 ${160 * ringGlow}px rgba(212,175,55,${0.08 * ringGlow})`,
            pointerEvents: "none",
          }} />
        )}

        {/* SPARKLE PARTICLES */}
        {phase !== "smoke" && particles.map(p => (
          <div key={p.id} style={{
            position: "absolute",
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: "#d4af37",
            opacity: ringOpacity * 0.6,
            boxShadow: `0 0 6px rgba(212,175,55,0.8)`,
            transform: `rotate(${p.angle}deg) translateX(${p.dist * ringOpacity}px)`,
            transition: "all 1.2s ease",
            pointerEvents: "none",
          }} />
        ))}

        {/* GOLD RING SVG */}
        <div style={{
          width: 200, height: 200,
          position: "relative",
          transform: `scale(${ringScale})`,
          opacity: ringOpacity,
          transition: "transform 1s cubic-bezier(0.34,1.56,0.64,1), opacity 0.8s ease",
          filter: `drop-shadow(0 0 ${20 * ringGlow}px rgba(212,175,55,0.8)) drop-shadow(0 0 ${50 * ringGlow}px rgba(212,175,55,0.4))`,
        }}>
          <svg viewBox="0 0 200 200" width="200" height="200">
            {/* Outer ring */}
            <defs>
              <radialGradient id="ringGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#f5e27a" />
                <stop offset="30%" stopColor="#d4af37" />
                <stop offset="60%" stopColor="#b8941e" />
                <stop offset="100%" stopColor="#8a6914" />
              </radialGradient>
              <radialGradient id="ringGrad2" cx="50%" cy="60%" r="60%">
                <stop offset="0%" stopColor="#f9f0a0" />
                <stop offset="40%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#6b5010" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Shadow/depth ring */}
            <ellipse cx="100" cy="106" rx="72" ry="18" fill="rgba(0,0,0,0.4)" filter="url(#glow)" />

            {/* Main ring body - 3D torus effect */}
            <circle cx="100" cy="100" r="72" fill="none" stroke="url(#ringGrad)" strokeWidth="22" filter="url(#glow)" />

            {/* Inner highlight arc */}
            <path d="M 42 85 A 60 60 0 0 1 158 85" fill="none" stroke="rgba(255,245,160,0.5)" strokeWidth="4" strokeLinecap="round" />

            {/* Outer highlight arc */}
            <path d="M 22 95 A 80 80 0 0 1 178 95" fill="none" stroke="rgba(255,245,160,0.2)" strokeWidth="3" strokeLinecap="round" />

            {/* Bottom shadow arc */}
            <path d="M 38 112 A 65 65 0 0 0 162 112" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="6" strokeLinecap="round" />

            {/* Diamond accent top */}
            <polygon points="100,22 106,30 100,38 94,30" fill="#f9f0a0" stroke="#d4af37" strokeWidth="1" filter="url(#glow)" />

            {/* Engraving lines */}
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(180,140,30,0.3)" strokeWidth="1" />
            <circle cx="100" cy="100" r="83" fill="none" stroke="rgba(255,245,160,0.15)" strokeWidth="1" />
          </svg>
        </div>

        {/* TOP HAT */}
        <div style={{
          position: "absolute",
          top: `calc(50% - 98px)`,
          left: "50%",
          transform: `translateX(-50%) translateY(${hatY}px)`,
          opacity: hatOpacity,
          transition: "transform 0.6s cubic-bezier(0.34,1.4,0.64,1), opacity 0.5s ease",
          filter: `drop-shadow(0 0 15px rgba(212,175,55,0.4))`,
          zIndex: 10,
        }}>
          <svg viewBox="0 0 100 90" width="90" height="81">
            <defs>
              <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="50%" stopColor="#2d2d2d" />
                <stop offset="100%" stopColor="#111" />
              </linearGradient>
              <linearGradient id="hatBrim" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#333" />
                <stop offset="100%" stopColor="#111" />
              </linearGradient>
            </defs>

            {/* Hat crown shadow */}
            <ellipse cx="50" cy="72" rx="46" ry="6" fill="rgba(0,0,0,0.5)" />

            {/* Brim */}
            <ellipse cx="50" cy="68" rx="44" ry="7" fill="url(#hatBrim)" />
            <ellipse cx="50" cy="65" rx="40" ry="5" fill="#222" />

            {/* Crown */}
            <rect x="22" y="10" width="56" height="58" rx="3" fill="url(#hatGrad)" />

            {/* Crown top ellipse */}
            <ellipse cx="50" cy="10" rx="28" ry="5" fill="#2a2a2a" />

            {/* Hat band — gold */}
            <rect x="22" y="56" width="56" height="9" rx="1" fill="#d4af37" opacity="0.9" />
            <rect x="22" y="57" width="56" height="2" fill="rgba(255,245,160,0.4)" />

            {/* Highlight on crown */}
            <rect x="25" y="14" width="6" height="40" rx="3" fill="rgba(255,255,255,0.04)" />

            {/* Top highlight */}
            <ellipse cx="50" cy="10" rx="16" ry="2.5" fill="rgba(255,255,255,0.08)" />
          </svg>
        </div>
      </div>

      {/* RINGMAN SPEECH */}
      <div style={{
        position: "absolute",
        bottom: "18%",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        width: "90%",
        maxWidth: 560,
        minHeight: 60,
      }}>
        {RINGMAN_LINES.map((line, i) => (
          <div key={i} style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(18px, 3.5vw, 26px)",
            fontWeight: "700",
            color: "#d4af37",
            letterSpacing: "1.5px",
            textShadow: "0 0 30px rgba(212,175,55,0.8), 0 0 60px rgba(212,175,55,0.4), 0 2px 4px rgba(0,0,0,0.8)",
            opacity: currentLine === i ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }}>
            "{line.text}"
          </div>
        ))}
      </div>

      {/* TAGLINE — shows after last line */}
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        opacity: currentLine >= 4 ? 0.5 : 0,
        transition: "opacity 1s ease 0.5s",
        pointerEvents: "none",
      }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#888", letterSpacing: "4px", textTransform: "uppercase" }}>
          The Ringman's AI &nbsp;·&nbsp; Tap to Enter
        </div>
      </div>

      {/* SKIP BUTTON */}
      <div style={{
        position: "absolute",
        top: 24, right: 24,
        fontSize: "11px",
        color: "#333",
        letterSpacing: "2px",
        textTransform: "uppercase",
        fontFamily: "'Inter', sans-serif",
        cursor: "pointer",
        transition: "color 0.2s",
        padding: "8px 14px",
        border: "1px solid #222",
        borderRadius: "3px",
      }}
        onMouseEnter={e => e.target.style.color = "#666"}
        onMouseLeave={e => e.target.style.color = "#333"}
      >
        Skip
      </div>
    </div>
  );
}
