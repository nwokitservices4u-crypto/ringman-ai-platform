import { useState, useRef, useEffect } from "react";

// ─── SILHOUETTE CONFIGS ─────────────────────────────────────────────────────
const BODY_TYPES = [
  { id: "car", label: "Car", emoji: "🚗" },
  { id: "truck", label: "Truck", emoji: "🛻" },
  { id: "suv", label: "SUV / Crossover", emoji: "🚙" },
  { id: "van", label: "Van / Minivan", emoji: "🚐" },
];

const BODY_CONFIGS = {
  car: [
    { id: "2door_coupe", label: "2-Door Coupe", desc: "Standard 2-door" },
    { id: "4door_sedan", label: "4-Door Sedan", desc: "Standard 4-door" },
    { id: "2door_convertible", label: "Convertible", desc: "2-door, soft/hard top" },
    { id: "5door_hatch", label: "Hatchback", desc: "5-door hatch" },
    { id: "wagon", label: "Wagon / Estate", desc: "4-door wagon" },
  ],
  truck: [
    { id: "reg_cab", label: "Regular Cab", desc: "2-door, short bed" },
    { id: "ext_cab", label: "Extended Cab", desc: "2-door + small rear doors" },
    { id: "crew_short", label: "Crew Cab Short Bed", desc: "4-door, short bed" },
    { id: "crew_long", label: "Crew Cab Long Bed", desc: "4-door, long bed" },
  ],
  suv: [
    { id: "compact_suv", label: "Compact SUV", desc: "2-row, smaller footprint" },
    { id: "fullsize_suv", label: "Full Size SUV", desc: "3-row, larger footprint" },
    { id: "crossover", label: "Crossover / CUV", desc: "Car-based platform" },
  ],
  van: [
    { id: "minivan", label: "Minivan", desc: "Sliding rear doors" },
    { id: "passenger_van", label: "Passenger Van", desc: "Full size, multiple rows" },
    { id: "cargo_van", label: "Cargo Van", desc: "No rear windows" },
  ],
};

// ─── SHOT REQUIREMENTS PER BODY TYPE ────────────────────────────────────────
const SHOTS = [
  { id: "front_center",    label: "Front Center",         icon: "⬆️",  desc: "Straight-on front, full grille and bumper visible",       guide: "Stand 8–10 ft away, center the hood badge" },
  { id: "front_left",      label: "Front Left Corner",    icon: "↖️",  desc: "Entire front bumper + left fender in frame",              guide: "45° angle, front-left corner, full bumper visible" },
  { id: "driver_profile",  label: "Driver Side Profile",  icon: "◀️",  desc: "Full side — bumper to bumper, rocker panel visible",      guide: "Stand back, get the full length in frame" },
  { id: "rear_left",       label: "Rear Left Corner",     icon: "↙️",  desc: "Quarter panel, tail light, bumper corner",                guide: "45° angle, rear-left corner" },
  { id: "rear_center",     label: "Rear Center",          icon: "⬇️",  desc: "Full rear bumper, tail lights, trunk/hatch",              guide: "Straight-on rear, stand 8–10 ft back" },
  { id: "rear_right",      label: "Rear Right Corner",    icon: "↘️",  desc: "Quarter panel, tail light, bumper corner",                guide: "45° angle, rear-right corner" },
  { id: "pass_profile",    label: "Passenger Side Profile", icon: "▶️", desc: "Full side — bumper to bumper, rocker panel visible",     guide: "Mirror of driver side" },
  { id: "engine_bay",      label: "Engine Bay",           icon: "🔧",  desc: "Hood fully open, full engine bay visible",                guide: "Open hood all the way, shoot straight down" },
  { id: "odometer",        label: "Odometer",             icon: "🔢",  desc: "Instrument cluster showing mileage clearly",              guide: "Key in ON position, dash lit up, no glare" },
  { id: "interior_front",  label: "Interior Front",       icon: "🪑",  desc: "Dashboard, steering wheel, front seats",                  guide: "Shoot from open driver door looking inward" },
  { id: "interior_rear",   label: "Interior Rear",        icon: "🛋️",  desc: "Rear seat condition, floor, cargo area",                  guide: "Shoot from open rear door" },
  { id: "obd_scan",        label: "OBD Scan",             icon: "💻",  desc: "Photo of scan tool screen showing results",               guide: "Clear, readable, no glare — AI will read the codes" },
];

const UNDERCARRIAGE_STEP = {
  id: "undercarriage",
  label: "Undercarriage Video",
  icon: "📱",
  desc: "Drive slowly over your phone laying flat on the ground",
  guide: "Lay phone face-up flat on ground, hit record, drive over at walking speed",
};

// ─── SILHOUETTE SVG OUTLINES ─────────────────────────────────────────────────
const SilhouetteSVG = ({ bodyType, shotId }) => {
  const highlights = {
    front_center:   { car: "M10,60 L90,60 L85,30 L15,30 Z", truck: "M5,65 L95,65 L90,25 L10,25 Z", suv: "M8,62 L92,62 L88,28 L12,28 Z", van: "M5,65 L95,65 L95,20 L5,20 Z" },
    front_left:     { car: "M10,60 L50,60 L50,30 L15,30 Z", truck: "M5,65 L50,65 L50,25 L10,25 Z", suv: "M8,62 L50,62 L50,28 L12,28 Z", van: "M5,65 L50,65 L50,20 L5,20 Z" },
    driver_profile: { car: "M5,65 L95,65 L95,30 L5,30 Z",   truck: "M5,65 L95,65 L95,20 L5,20 Z",  suv: "M5,65 L95,65 L95,25 L5,25 Z",  van: "M5,65 L95,65 L95,15 L5,15 Z" },
    rear_left:      { car: "M50,60 L90,60 L85,30 L50,30 Z", truck: "M50,65 L95,65 L90,25 L50,25 Z", suv: "M50,62 L92,62 L88,28 L50,28 Z", van: "M50,65 L95,65 L95,20 L50,20 Z" },
    rear_center:    { car: "M10,60 L90,60 L85,30 L15,30 Z", truck: "M5,65 L95,65 L90,25 L10,25 Z", suv: "M8,62 L92,62 L88,28 L12,28 Z", van: "M5,65 L95,65 L95,20 L5,20 Z" },
    rear_right:     { car: "M50,60 L90,60 L85,30 L50,30 Z", truck: "M50,65 L95,65 L90,25 L50,25 Z", suv: "M50,62 L92,62 L88,28 L50,28 Z", van: "M50,65 L95,65 L95,20 L50,20 Z" },
    pass_profile:   { car: "M5,65 L95,65 L95,30 L5,30 Z",   truck: "M5,65 L95,65 L95,20 L5,20 Z",  suv: "M5,65 L95,65 L95,25 L5,25 Z",  van: "M5,65 L95,65 L95,15 L5,15 Z" },
  };

  const bt = bodyType || "car";
  const svgConfigs = {
    car: (
      <svg viewBox="0 0 100 80" style={{ width: "100%", height: "100%" }}>
        {/* Body */}
        <path d="M8,55 L92,55 L92,65 Q92,70 87,70 L13,70 Q8,70 8,65 Z" fill="none" stroke="rgba(0,200,255,0.4)" strokeWidth="1"/>
        {/* Roof */}
        <path d="M25,55 L30,38 L70,38 L75,55" fill="none" stroke="rgba(0,200,255,0.4)" strokeWidth="1"/>
        {/* Windshield */}
        <path d="M30,54 L34,40 L66,40 L70,54" fill="rgba(0,200,255,0.06)" stroke="rgba(0,200,255,0.3)" strokeWidth="0.8"/>
        {/* Wheels */}
        <circle cx="25" cy="70" r="7" fill="none" stroke="rgba(0,200,255,0.5)" strokeWidth="1.2"/>
        <circle cx="75" cy="70" r="7" fill="none" stroke="rgba(0,200,255,0.5)" strokeWidth="1.2"/>
        {/* Highlight zone */}
        {highlights[shotId]?.[bt] && (
          <path d={highlights[shotId][bt]} fill="rgba(0,255,150,0.08)" stroke="rgba(0,255,150,0.6)" strokeWidth="1.5" strokeDasharray="3,2"/>
        )}
        {/* Camera crosshair */}
        <circle cx="50" cy="45" r="3" fill="none" stroke="rgba(0,255,150,0.8)" strokeWidth="1"/>
        <line x1="50" y1="40" x2="50" y2="50" stroke="rgba(0,255,150,0.6)" strokeWidth="0.8"/>
        <line x1="45" y1="45" x2="55" y2="45" stroke="rgba(0,255,150,0.6)" strokeWidth="0.8"/>
      </svg>
    ),
    truck: (
      <svg viewBox="0 0 100 80" style={{ width: "100%", height: "100%" }}>
        <path d="M5,55 L95,55 L95,67 Q95,72 90,72 L10,72 Q5,72 5,67 Z" fill="none" stroke="rgba(0,200,255,0.4)" strokeWidth="1"/>
        <path d="M8,55 L12,35 L55,35 L55,55" fill="none" stroke="rgba(0,200,255,0.4)" strokeWidth="1"/>
        <path d="M55,42 L95,42 L95,55" fill="none" stroke="rgba(0,200,255,0.3)" strokeWidth="1" strokeDasharray="2,2"/>
        <path d="M12,54 L16,37 L53,37 L53,54" fill="rgba(0,200,255,0.05)" stroke="rgba(0,200,255,0.25)" strokeWidth="0.8"/>
        <circle cx="22" cy="72" r="7" fill="none" stroke="rgba(0,200,255,0.5)" strokeWidth="1.2"/>
        <circle cx="78" cy="72" r="7" fill="none" stroke="rgba(0,200,255,0.5)" strokeWidth="1.2"/>
        {highlights[shotId]?.[bt] && (
          <path d={highlights[shotId][bt]} fill="rgba(0,255,150,0.08)" stroke="rgba(0,255,150,0.6)" strokeWidth="1.5" strokeDasharray="3,2"/>
        )}
        <circle cx="50" cy="48" r="3" fill="none" stroke="rgba(0,255,150,0.8)" strokeWidth="1"/>
        <line x1="50" y1="43" x2="50" y2="53" stroke="rgba(0,255,150,0.6)" strokeWidth="0.8"/>
        <line x1="45" y1="48" x2="55" y2="48" stroke="rgba(0,255,150,0.6)" strokeWidth="0.8"/>
      </svg>
    ),
    suv: (
      <svg viewBox="0 0 100 80" style={{ width: "100%", height: "100%" }}>
        <path d="M7,55 L93,55 L93,66 Q93,71 88,71 L12,71 Q7,71 7,66 Z" fill="none" stroke="rgba(0,200,255,0.4)" strokeWidth="1"/>
        <path d="M18,55 L20,36 L80,36 L82,55" fill="none" stroke="rgba(0,200,255,0.4)" strokeWidth="1"/>
        <path d="M20,54 L22,38 L78,38 L80,54" fill="rgba(0,200,255,0.05)" stroke="rgba(0,200,255,0.25)" strokeWidth="0.8"/>
        <circle cx="23" cy="71" r="7" fill="none" stroke="rgba(0,200,255,0.5)" strokeWidth="1.2"/>
        <circle cx="77" cy="71" r="7" fill="none" stroke="rgba(0,200,255,0.5)" strokeWidth="1.2"/>
        {highlights[shotId]?.[bt] && (
          <path d={highlights[shotId][bt]} fill="rgba(0,255,150,0.08)" stroke="rgba(0,255,150,0.6)" strokeWidth="1.5" strokeDasharray="3,2"/>
        )}
        <circle cx="50" cy="46" r="3" fill="none" stroke="rgba(0,255,150,0.8)" strokeWidth="1"/>
        <line x1="50" y1="41" x2="50" y2="51" stroke="rgba(0,255,150,0.6)" strokeWidth="0.8"/>
        <line x1="45" y1="46" x2="55" y2="46" stroke="rgba(0,255,150,0.6)" strokeWidth="0.8"/>
      </svg>
    ),
    van: (
      <svg viewBox="0 0 100 80" style={{ width: "100%", height: "100%" }}>
        <rect x="5" y="30" width="90" height="40" rx="3" fill="none" stroke="rgba(0,200,255,0.4)" strokeWidth="1"/>
        <path d="M5,48 L30,30" fill="none" stroke="rgba(0,200,255,0.35)" strokeWidth="0.8"/>
        <rect x="8" y="33" width="22" height="14" rx="1" fill="rgba(0,200,255,0.05)" stroke="rgba(0,200,255,0.2)" strokeWidth="0.8"/>
        <circle cx="22" cy="70" r="7" fill="none" stroke="rgba(0,200,255,0.5)" strokeWidth="1.2"/>
        <circle cx="78" cy="70" r="7" fill="none" stroke="rgba(0,200,255,0.5)" strokeWidth="1.2"/>
        {highlights[shotId]?.[bt] && (
          <path d={highlights[shotId][bt]} fill="rgba(0,255,150,0.08)" stroke="rgba(0,255,150,0.6)" strokeWidth="1.5" strokeDasharray="3,2"/>
        )}
        <circle cx="50" cy="46" r="3" fill="none" stroke="rgba(0,255,150,0.8)" strokeWidth="1"/>
        <line x1="50" y1="41" x2="50" y2="51" stroke="rgba(0,255,150,0.6)" strokeWidth="0.8"/>
        <line x1="45" y1="46" x2="55" y2="46" stroke="rgba(0,255,150,0.6)" strokeWidth="0.8"/>
      </svg>
    ),
  };
  return svgConfigs[bt] || svgConfigs.car;
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function VehicleInspection() {
  const [phase, setPhase] = useState("select_body"); // select_body | capture | undercarriage | obd | summary
  const [bodyType, setBodyType] = useState(null);
  const [bodyConfig, setBodyConfig] = useState(null);
  const [currentShotIndex, setCurrentShotIndex] = useState(0);
  const [capturedShots, setCapturedShots] = useState({});
  const [retakeCounts, setRetakeCounts] = useState({});
  const [undercarriageVideo, setUndercarriageVideo] = useState(null);
  const [obdPhoto, setObdPhoto] = useState(null);
  const [obdPhotoUrl, setObdPhotoUrl] = useState(null);
  const [sessionStart] = useState(new Date().toISOString());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fileRef = useRef();
  const videoRef = useRef();
  const obdRef = useRef();

  const currentShot = SHOTS[currentShotIndex];
  const totalShots = SHOTS.length;
  const completedCount = Object.keys(capturedShots).length;
  const progress = Math.round((completedCount / totalShots) * 100);

  const handleShotCapture = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const retakes = retakeCounts[currentShot.id] || 0;
    setCapturedShots(prev => ({ ...prev, [currentShot.id]: { file, url, timestamp: new Date().toISOString(), retakeCount: retakes } }));
    setRetakeCounts(prev => ({ ...prev, [currentShot.id]: 0 }));
  };

  const handleRetake = () => {
    setRetakeCounts(prev => ({ ...prev, [currentShot.id]: (prev[currentShot.id] || 0) + 1 }));
    setCapturedShots(prev => { const n = { ...prev }; delete n[currentShot.id]; return n; });
    fileRef.current.value = "";
    fileRef.current.click();
  };

  const handleVideoCapture = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUndercarriageVideo(file);
  };

  const handleObdCapture = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setObdPhoto(file);
    setObdPhotoUrl(URL.createObjectURL(file));
  };

  const nextShot = () => {
    if (currentShotIndex < totalShots - 1) {
      setCurrentShotIndex(i => i + 1);
      fileRef.current && (fileRef.current.value = "");
    } else {
      setPhase("undercarriage");
    }
  };

  const prevShot = () => {
    if (currentShotIndex > 0) setCurrentShotIndex(i => i - 1);
  };

  const goToShot = (index) => {
    setCurrentShotIndex(index);
    setPhase("capture");
  };

  const finishInspection = async () => {
    setSaving(true);
    // Log the session data — in production this would save to InspectionSession entity
    const sessionData = {
      session_start: sessionStart,
      session_end: new Date().toISOString(),
      duration_seconds: Math.round((new Date() - new Date(sessionStart)) / 1000),
      device_type: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
      device_os: navigator.platform,
      body_type: bodyType,
      body_config: bodyConfig,
      silhouette_selected: `${bodyType}_${bodyConfig}`,
      shots_required: totalShots,
      shots_completed: completedCount,
      total_retakes: Object.values(retakeCounts).reduce((a, b) => a + b, 0),
      undercarriage_video_recorded: !!undercarriageVideo,
      obd_scan_captured: !!obdPhoto,
      session_status: "Completed",
    };
    console.log("Inspection session data:", sessionData);
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    setPhase("summary");
  };

  const S = { fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" };
  const card = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "24px" };
  const btn = (active, color = "#06b6d4") => ({
    padding: "12px 24px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "700", fontSize: "14px", letterSpacing: "0.5px",
    background: active ? `linear-gradient(135deg, ${color}, ${color}cc)` : "rgba(255,255,255,0.06)",
    color: active ? "white" : "#9ca3af", transition: "all 0.2s",
  });

  // ── PHASE: SELECT BODY TYPE ────────────────────────────────────────────────
  if (phase === "select_body") return (
    <div style={S}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>🔍 GUIDED INSPECTION</div>
          <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px", background: "linear-gradient(135deg,#fff,#d1d5db)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Vehicle Inspection
          </h1>
          <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7 }}>Select your vehicle type to load the correct silhouette guides for each required shot.</p>
        </div>

        <div style={{ ...card, marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#6b7280", marginBottom: 20 }}>Step 1 — Vehicle Type</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            {BODY_TYPES.map(bt => (
              <button key={bt.id} onClick={() => { setBodyType(bt.id); setBodyConfig(null); }}
                style={{ ...btn(bodyType === bt.id), padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontSize: 15 }}>
                <span style={{ fontSize: 32 }}>{bt.emoji}</span>
                {bt.label}
              </button>
            ))}
          </div>
        </div>

        {bodyType && (
          <div style={{ ...card, marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#6b7280", marginBottom: 20 }}>Step 2 — Body Configuration</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {BODY_CONFIGS[bodyType].map(cfg => (
                <button key={cfg.id} onClick={() => setBodyConfig(cfg.id)}
                  style={{ ...btn(bodyConfig === cfg.id), padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", width: "100%" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{cfg.label}</div>
                    <div style={{ fontSize: 12, color: bodyConfig === cfg.id ? "rgba(255,255,255,0.7)" : "#6b7280", marginTop: 2 }}>{cfg.desc}</div>
                  </div>
                  {bodyConfig === cfg.id && <span style={{ color: "#06b6d4", fontSize: 18 }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {bodyType && bodyConfig && (
          <button onClick={() => setPhase("capture")}
            style={{ width: "100%", padding: 18, borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 16, letterSpacing: 1, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white" }}>
            START INSPECTION — {SHOTS.length} SHOTS REQUIRED →
          </button>
        )}
      </div>
    </div>
  );

  // ── PHASE: CAPTURE ─────────────────────────────────────────────────────────
  if (phase === "capture") {
    const shotCaptured = capturedShots[currentShot.id];
    return (
      <div style={S}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 24px 100px" }}>

          {/* Progress bar */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: "#6b7280", letterSpacing: 2, textTransform: "uppercase" }}>Progress</div>
              <div style={{ fontSize: 13, color: "#06b6d4", fontWeight: 700 }}>{completedCount} / {totalShots} shots</div>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#06b6d4,#8b5cf6)", borderRadius: 4, transition: "width 0.4s" }} />
            </div>
          </div>

          {/* Shot thumbnail strip */}
          <div style={{ display: "flex", gap: 6, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
            {SHOTS.map((s, i) => {
              const done = capturedShots[s.id];
              const active = i === currentShotIndex;
              return (
                <button key={s.id} onClick={() => goToShot(i)}
                  style={{ minWidth: 52, height: 52, borderRadius: 8, border: `2px solid ${active ? "#06b6d4" : done ? "#10b981" : "rgba(255,255,255,0.08)"}`, background: done ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.02)", cursor: "pointer", padding: 0, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  {done
                    ? <img src={done.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: active ? "#06b6d4" : "#4b5563" }}>{s.icon}</span>
                  }
                  {active && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#06b6d4" }} />}
                </button>
              );
            })}
          </div>

          {/* Current shot */}
          <div style={{ ...card, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ fontSize: 28 }}>{currentShot.icon}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>{currentShot.label}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>Shot {currentShotIndex + 1} of {totalShots}</div>
              </div>
              {shotCaptured && <div style={{ marginLeft: "auto", background: "rgba(16,185,129,0.15)", border: "1px solid #10b981", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#10b981" }}>✓ CAPTURED</div>}
            </div>

            {/* Silhouette + preview side by side */}
            <div style={{ display: "grid", gridTemplateColumns: shotCaptured ? "1fr 1fr" : "1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,200,255,0.15)", borderRadius: 10, overflow: "hidden", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
                <SilhouetteSVG bodyType={bodyType} shotId={currentShot.id} />
              </div>
              {shotCaptured && (
                <div style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "16/9" }}>
                  <img src={shotCaptured.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>

            {/* Guide text */}
            <div style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)", borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#06b6d4", textTransform: "uppercase", marginBottom: 6 }}>📐 Positioning Guide</div>
              <div style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.6 }}>{currentShot.guide}</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>{currentShot.desc}</div>
            </div>

            {/* Capture controls */}
            <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={handleShotCapture} />
            {!shotCaptured ? (
              <button onClick={() => fileRef.current.click()}
                style={{ width: "100%", padding: 16, borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 15, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", letterSpacing: 1 }}>
                📸 TAKE PHOTO
              </button>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <button onClick={handleRetake}
                  style={{ padding: 14, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#9ca3af", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                  🔄 RETAKE
                </button>
                <button onClick={nextShot}
                  style={{ padding: 14, borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14, background: "linear-gradient(135deg,#10b981,#059669)", color: "white", letterSpacing: 0.5 }}>
                  {currentShotIndex < totalShots - 1 ? "NEXT SHOT →" : "UNDERCARRIAGE →"}
                </button>
              </div>
            )}
          </div>

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={prevShot} disabled={currentShotIndex === 0}
              style={{ ...btn(currentShotIndex > 0), padding: "10px 20px" }}>← PREV</button>
            <button onClick={() => setPhase("undercarriage")}
              style={{ ...btn(true, "#8b5cf6"), padding: "10px 20px" }}>SKIP TO VIDEO →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── PHASE: UNDERCARRIAGE ───────────────────────────────────────────────────
  if (phase === "undercarriage") return (
    <div style={S}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📱</div>
          <h2 style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>Undercarriage Video</h2>
          <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.8 }}>Lay your phone flat on the ground face-up. Hit record. Drive the vehicle slowly over it at walking speed.</p>
        </div>

        <div style={{ ...card, marginBottom: 24 }}>
          <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 8, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: "#fbbf24", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>⚠️ Setup Instructions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Place phone face-up flat on flat, clean ground", "Make sure camera lens isn't blocked by case edges", "Start recording BEFORE the vehicle starts rolling over", "Drive at walking speed — 2–3 mph max", "Continue recording until vehicle has fully passed over"].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "#e2e8f0" }}>
                  <span style={{ color: "#fbbf24", fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>

          <input ref={videoRef} type="file" accept="video/*" capture="environment" style={{ display: "none" }} onChange={handleVideoCapture} />
          {!undercarriageVideo ? (
            <button onClick={() => videoRef.current.click()}
              style={{ width: "100%", padding: 18, borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 16, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "white", letterSpacing: 1 }}>
              🎬 RECORD UNDERCARRIAGE VIDEO
            </button>
          ) : (
            <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid #10b981", borderRadius: 10, padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
              <div style={{ fontWeight: 700, color: "#10b981", marginBottom: 4 }}>Video Captured</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{undercarriageVideo.name} — {(undercarriageVideo.size / 1048576).toFixed(1)} MB</div>
              <button onClick={() => { setUndercarriageVideo(null); videoRef.current.value = ""; }}
                style={{ marginTop: 12, padding: "8px 20px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", cursor: "pointer", fontSize: 13 }}>
                Re-record
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <button onClick={() => setPhase("capture")}
            style={{ ...btn(true), padding: 14 }}>← BACK TO PHOTOS</button>
          <button onClick={() => setPhase("obd")}
            style={{ ...btn(true, "#8b5cf6"), padding: 14, fontWeight: 800 }}>
            {undercarriageVideo ? "NEXT: OBD SCAN →" : "SKIP →"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── PHASE: OBD SCAN ────────────────────────────────────────────────────────
  if (phase === "obd") return (
    <div style={S}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>💻</div>
          <h2 style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>OBD Scan</h2>
          <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.8 }}>Connect your scan tool, pull codes, then take a clear photo of the results screen. The Ringman AI will read and interpret every code automatically.</p>
        </div>

        <div style={{ ...card, marginBottom: 24 }}>
          <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 8, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: "#8b5cf6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>📋 Tips for Best Results</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Key in ON position or engine running", "Wait for scan tool to fully load results", "Ensure screen is fully visible — no cutoffs", "Avoid glare — angle slightly if needed", "Capture ALL codes including pending and stored"].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "#e2e8f0" }}>
                  <span style={{ color: "#8b5cf6", fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>

          <input ref={obdRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={handleObdCapture} />
          {!obdPhoto ? (
            <button onClick={() => obdRef.current.click()}
              style={{ width: "100%", padding: 18, borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 16, background: "linear-gradient(135deg,#8b5cf6,#7c3aed)", color: "white", letterSpacing: 1 }}>
              📸 PHOTOGRAPH SCAN RESULTS
            </button>
          ) : (
            <div>
              <img src={obdPhotoUrl} style={{ width: "100%", borderRadius: 10, marginBottom: 12, border: "1px solid rgba(139,92,246,0.3)" }} />
              <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid #10b981", borderRadius: 8, padding: 14, textAlign: "center" }}>
                <div style={{ color: "#10b981", fontWeight: 700 }}>✅ Scan Captured — AI will extract codes automatically</div>
              </div>
              <button onClick={() => { setObdPhoto(null); setObdPhotoUrl(null); obdRef.current.value = ""; }}
                style={{ width: "100%", marginTop: 10, padding: "10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", cursor: "pointer", fontSize: 13 }}>
                Retake
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <button onClick={() => setPhase("undercarriage")}
            style={{ ...btn(true), padding: 14 }}>← BACK</button>
          <button onClick={finishInspection}
            style={{ padding: 14, borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14, background: "linear-gradient(135deg,#10b981,#059669)", color: "white", letterSpacing: 1 }}>
            {saving ? "SAVING..." : "COMPLETE INSPECTION ✓"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── PHASE: SUMMARY ─────────────────────────────────────────────────────────
  if (phase === "summary") {
    const totalRetakes = Object.values(retakeCounts).reduce((a, b) => a + b, 0);
    return (
      <div style={S}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎩</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px", background: "linear-gradient(135deg,#fff,#d1d5db)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Inspection Complete</h2>
            <p style={{ color: "#6b7280", fontSize: 15 }}>All data captured. The Ringman AI is analyzing your submission.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Photos Captured", value: `${completedCount}/${totalShots}`, color: completedCount === totalShots ? "#10b981" : "#f59e0b" },
              { label: "Retakes", value: totalRetakes, color: totalRetakes > 5 ? "#f97316" : "#06b6d4" },
              { label: "Video", value: undercarriageVideo ? "✓" : "—", color: undercarriageVideo ? "#10b981" : "#6b7280" },
            ].map(stat => (
              <div key={stat.label} style={{ ...card, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: stat.color, marginBottom: 6 }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Shot review grid */}
          <div style={{ ...card, marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#6b7280", marginBottom: 16 }}>Photo Review</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
              {SHOTS.map(shot => {
                const cap = capturedShots[shot.id];
                return (
                  <div key={shot.id} style={{ aspectRatio: "4/3", borderRadius: 8, overflow: "hidden", border: `1px solid ${cap ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.06)"}`, background: "rgba(255,255,255,0.02)", position: "relative" }}>
                    {cap
                      ? <img src={cap.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 4 }}>
                          <span style={{ fontSize: 18 }}>{shot.icon}</span>
                          <span style={{ fontSize: 9, color: "#4b5563", textAlign: "center", padding: "0 4px" }}>{shot.label}</span>
                        </div>
                    }
                    {cap && retakeCounts[shot.id] > 0 && (
                      <div style={{ position: "absolute", top: 4, right: 4, background: "rgba(249,115,22,0.8)", borderRadius: 10, padding: "2px 6px", fontSize: 9, color: "white" }}>
                        {retakeCounts[shot.id]}x retake
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <button onClick={() => { setPhase("select_body"); setCapturedShots({}); setCurrentShotIndex(0); setUndercarriageVideo(null); setObdPhoto(null); setObdPhotoUrl(null); setSaved(false); }}
              style={{ ...btn(true), padding: 16 }}>NEW INSPECTION</button>
            <button style={{ padding: 16, borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", letterSpacing: 1 }}>
              RUN AI FORENSICS →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
