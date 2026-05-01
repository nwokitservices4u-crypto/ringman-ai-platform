import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "For Dealers", href: "/ForIndependentDealers" },
  { label: "The Inspection", href: "/TheInspection" },
  { label: "Integrity", href: "/IntegritySystem" },
  { label: "Pricing", href: "/Pricing" },
  { label: "Why Ringman", href: "/WhyRingman" },
];

const SHOTS = [
  { num: "01", icon: "⬆️", label: "Front Center", desc: "Full grille, hood, headlights, bumper. 10 feet back, centered." },
  { num: "02", icon: "↖️", label: "Front Left Corner", desc: "Full front bumper + left fender. 45° angle, 8 feet." },
  { num: "03", icon: "⬅️", label: "Driver Side Profile", desc: "Bumper to bumper, full rocker panel visible." },
  { num: "04", icon: "↙️", label: "Rear Left Corner", desc: "Quarter panel, tail light, bumper corner." },
  { num: "05", icon: "⬇️", label: "Rear Center", desc: "Full rear bumper, tail lights, trunk/hatch, license plate." },
  { num: "06", icon: "↘️", label: "Rear Right Corner", desc: "Mirror of front left. Quarter panel + bumper." },
  { num: "07", icon: "➡️", label: "Passenger Side Profile", desc: "Full profile, bumper to bumper." },
  { num: "08", icon: "🔧", label: "Engine Bay", desc: "Hood fully open. Full bay visible, nothing cropped." },
  { num: "09", icon: "🔢", label: "Odometer", desc: "Instrument cluster, key in ON position." },
  { num: "10", icon: "🚗", label: "Interior Front", desc: "Dash, steering wheel, both front seats." },
  { num: "11", icon: "🪑", label: "Interior Rear", desc: "Rear seat, floor, cargo area." },
  { num: "12", icon: "📱", label: "OBD Scan", desc: "Photo of scan tool screen. AI reads and interprets every code." },
];

const AI_FLAGS = [
  { flag: "Paint overspray detected", severity: "Medium", desc: "Possible undisclosed repaint or body repair" },
  { flag: "Panel gap inconsistency", severity: "Medium", desc: "Suggests prior bodywork or replacement panel" },
  { flag: "Rust detected — undercarriage", severity: "High", desc: "Surface or structural rust flagged in video frames" },
  { flag: "Fluid leak visible", severity: "High", desc: "Undercarriage frame shows active staining" },
  { flag: "Warning light visible in dash photo", severity: "High", desc: "Conflicts with seller disclosure — requires explanation" },
  { flag: "Windshield crack detected", severity: "Low", desc: "Glass damage visible in front center shot" },
];

const BODY_TYPES = [
  { type: "Sedan / Coupe", icon: "🚗", configs: ["2-Door Coupe", "4-Door Sedan", "Convertible"] },
  { type: "Truck", icon: "🛻", configs: ["Regular Cab", "Extended Cab", "Crew Cab Short Bed", "Crew Cab Long Bed"] },
  { type: "SUV", icon: "🚙", configs: ["Compact SUV", "Full Size SUV", "Crossover"] },
  { type: "Van", icon: "🚐", configs: ["Minivan", "Passenger Van", "Cargo Van"] },
];

export default function TheInspection() {
  useEffect(() => {
    document.title = "The AI Inspection System — 12 Angles, OBD, Undercarriage | Ringman's AI";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "12-angle AI-verified photo inspection, undercarriage video frame analysis, and OBD scan interpretation. The most thorough digital condition report in wholesale auto.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "The AI Inspection System — 12 Angles, OBD, Undercarriage | Ringman's AI", "property");
    setMeta("og:description", "12-angle AI-verified photo inspection, undercarriage video frame analysis, and OBD scan interpretation. The most thorough digital condition report in wholesale auto.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "The AI Inspection System — 12 Angles, OBD, Undercarriage | Ringman's AI");
    setMeta("twitter:description", "12-angle AI-verified photo inspection, undercarriage video frame analysis, and OBD scan interpretation. The most thorough digital condition report in wholesale auto.");
  }, []);

  const [activeShot, setActiveShot] = useState(0);
  const [activeBody, setActiveBody] = useState(0);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: l.href === "/TheInspection" ? "#06b6d4" : "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <a href="/Register" style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Get Started</a>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "90px 24px 70px", background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,182,212,0.07) 0%, transparent 70%)" }}>
        <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#06b6d4", marginBottom: 16 }}>THE INSPECTION SYSTEM</div>
        <h1 style={{ fontSize: "clamp(34px,6vw,68px)", fontWeight: 900, fontFamily: "'Georgia',serif", lineHeight: 1.05, margin: "0 0 24px" }}>
          The most thorough<br />
          <span style={{ background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>digital inspection in wholesale.</span>
        </h1>
        <p style={{ fontSize: "clamp(15px,2.5vw,19px)", color: "#9ca3af", maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.9, fontFamily: "'Georgia',serif", fontStyle: "italic" }}>
          Built by an automotive arbitration inspector. Every angle covered. Every photo AI-verified. Every code interpreted. No inspector needed — ever.
        </p>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {[{ v: "15 min", l: "Average completion time" }, { v: "12", l: "Required photo angles" }, { v: "0", l: "Outside inspectors needed" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#06b6d4" }}>{s.v}</div>
              <div style={{ fontSize: 12, color: "#4b5563", textTransform: "uppercase", letterSpacing: 1 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS STEPS */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>THE PROCESS</div>
          <h2 style={{ fontSize: "clamp(22px,3vw,38px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Four steps. One complete vehicle record.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
          {[
            { step: "01", icon: "🚗", title: "Select Your Body Type", desc: "Pick your vehicle type and configuration. The system loads the correct silhouette and shot list for your exact vehicle." },
            { step: "02", icon: "📸", title: "Guided Photo Capture", desc: "12 required angles. A silhouette overlay shows exactly where to stand and what to frame. AI verifies each shot in real time." },
            { step: "03", icon: "🎬", title: "Undercarriage Video", desc: "Lay your phone flat, face up. Drive the vehicle slowly over it. We extract a frame every half second and AI analyzes each one." },
            { step: "04", icon: "📱", title: "OBD Scan", desc: "Photograph your scan tool screen. AI reads every code, interprets severity, and flags anything that needs attention." },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderTop: "2px solid #06b6d4", borderRadius: "0 0 12px 12px", padding: 24 }}>
              <div style={{ fontSize: 11, color: "#06b6d4", fontWeight: 900, letterSpacing: 2, marginBottom: 10 }}>{s.step}</div>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BODY TYPE SELECTOR */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8b5cf6", marginBottom: 12 }}>BODY TYPE SYSTEM</div>
            <h2 style={{ fontSize: "clamp(20px,3vw,36px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Every body type. Every configuration. Covered.</h2>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
            {BODY_TYPES.map((b, i) => (
              <button key={i} onClick={() => setActiveBody(i)}
                style={{ padding: "10px 20px", borderRadius: 8, border: `1px solid ${activeBody === i ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.06)"}`, background: activeBody === i ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.02)", color: activeBody === i ? "#a78bfa" : "#6b7280", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                {b.icon} {b.type}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {BODY_TYPES[activeBody].configs.map((c, i) => (
              <div key={i} style={{ padding: "10px 20px", background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 8, fontSize: 13, color: "#c4b5fd" }}>{c}</div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#4b5563" }}>Each configuration loads a custom silhouette and optimized shot list for that exact body style.</div>
        </div>
      </div>

      {/* 12 SHOTS */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>THE 12 REQUIRED SHOTS</div>
          <h2 style={{ fontSize: "clamp(20px,3vw,36px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>Every angle. AI-verified. No skipping.</h2>
          <p style={{ color: "#6b7280", fontSize: 14 }}>Click any shot to see what's required.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
          {SHOTS.map((s, i) => (
            <div key={i} onClick={() => setActiveShot(i)}
              style={{ background: activeShot === i ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.02)", border: `1px solid ${activeShot === i ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.05)"}`, borderRadius: 8, padding: "14px 12px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: activeShot === i ? "#06b6d4" : "#6b7280", letterSpacing: 0.5 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: activeShot === i ? "#d1d5db" : "#4b5563", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#06b6d4", marginBottom: 6 }}>Shot {SHOTS[activeShot].num} — {SHOTS[activeShot].label}</div>
          <div style={{ fontSize: 15, color: "#d1d5db", lineHeight: 1.7 }}>{SHOTS[activeShot].desc}</div>
          <div style={{ marginTop: 10, fontSize: 12, color: "#4b5563" }}>Silhouette overlay guides exact positioning. AI checks framing before accepting the photo.</div>
        </div>
      </div>

      {/* AI FLAGS */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#ef4444", marginBottom: 12 }}>AI FORENSICS</div>
            <h2 style={{ fontSize: "clamp(20px,3vw,36px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>AI catches what eyes miss.</h2>
            <p style={{ color: "#6b7280", fontSize: 14, maxWidth: 500, margin: "0 auto" }}>Every photo is analyzed for damage, inconsistencies, and disclosure conflicts. Here's what the AI looks for.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {AI_FLAGS.map((f, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderLeft: `3px solid ${f.severity === "High" ? "#ef4444" : f.severity === "Medium" ? "#f59e0b" : "#10b981"}`, borderRadius: "0 10px 10px 0", padding: "16px 20px" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{f.flag}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>{f.desc}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: f.severity === "High" ? "#ef4444" : f.severity === "Medium" ? "#f59e0b" : "#10b981", background: `rgba(${f.severity === "High" ? "239,68,68" : f.severity === "Medium" ? "245,158,11" : "16,185,129"},0.1)`, border: `1px solid rgba(${f.severity === "High" ? "239,68,68" : f.severity === "Medium" ? "245,158,11" : "16,185,129"},0.2)`, borderRadius: 4, padding: "4px 10px", whiteSpace: "nowrap" }}>{f.severity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.08),rgba(139,92,246,0.06))", borderTop: "1px solid rgba(6,182,212,0.12)", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>Ready to inspect your first vehicle?</h2>
        <p style={{ color: "#6b7280", fontSize: 16, marginBottom: 40 }}>Takes about 15 minutes. AI does the rest.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/Register" style={{ padding: "16px 36px", borderRadius: 8, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontWeight: 800, fontSize: 16, textDecoration: "none" }}>Get Started Free →</a>
          <a href="/WhyRingman" style={{ padding: "16px 36px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>Read the Manifesto</a>
        </div>
      </div>

    </div>
  );
}
