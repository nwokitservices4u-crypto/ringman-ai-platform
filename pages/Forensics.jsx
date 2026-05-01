import { useState, useRef } from "react";
import Nav from "../components/Nav.jsx";
import RingmanAI from "../components/RingmanAI.jsx";

const FORENSICS_URL = "https://chap-c489b18c.base44.app/functions/forensicsInspect";

const SCORE_COLOR = (s) => s >= 80 ? "#10b981" : s >= 60 ? "#f59e0b" : s >= 40 ? "#f97316" : "#ef4444";
const SCORE_LABEL = (s) => s >= 90 ? "CLEAN" : s >= 75 ? "GOOD" : s >= 55 ? "FAIR" : s >= 35 ? "ROUGH" : "SALVAGE";

const SEV_COLOR = { Minor: "#10b981", Moderate: "#f59e0b", Severe: "#ef4444", Critical: "#7f1d1d" };

export default function Forensics() {
  const [step, setStep] = useState("input"); // input | analyzing | results
  const [photos, setPhotos] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState({ year: "", make: "", model: "", mileage: "", vin: "" });
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const fileRef = useRef();

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files).slice(0, 20);
    setPhotos(files);
    const urls = files.map(f => URL.createObjectURL(f));
    setPhotoUrls(urls);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/")).slice(0, 20);
    setPhotos(files);
    setPhotoUrls(files.map(f => URL.createObjectURL(f)));
  };

  const uploadToBase44 = async (file) => {
    // Convert to base64 data URL for GPT-4o vision
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  const runInspection = async () => {
    if (photos.length === 0) { setError("Upload at least one photo to run forensics."); return; }
    setError("");
    setStep("analyzing");
    setProgress(10);

    try {
      // Convert photos to base64 for vision API
      setProgress(25);
      const base64Urls = await Promise.all(photos.map(uploadToBase64));
      setProgress(50);

      const res = await fetch(FORENSICS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photo_urls: base64Urls,
          year: vehicleInfo.year,
          make: vehicleInfo.make,
          model: vehicleInfo.model,
          mileage: vehicleInfo.mileage ? parseInt(vehicleInfo.mileage) : null,
          vin: vehicleInfo.vin,
        }),
      });

      setProgress(85);
      const data = await res.json();
      setProgress(100);

      if (data.error) { setError(data.error); setStep("input"); return; }
      setResults(data);
      setStep("results");
      setActiveTab("overview");
    } catch (err) {
      setError("Inspection failed: " + err.message);
      setStep("input");
    }
  };

  const uploadToBase64 = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });

  const reset = () => { setStep("input"); setPhotos([]); setPhotoUrls([]); setResults(null); setError(""); setProgress(0); };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "80px 24px 48px", background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(239,68,68,0.06) 0%, transparent 70%)" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#ef4444", opacity: 0.7, marginBottom: "14px" }}>
          🔍 AI FORENSICS ENGINE
        </div>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 60px)", fontWeight: "900", margin: "0 0 16px", fontFamily: "'Georgia', serif", background: "linear-gradient(135deg, #fff 0%, #d1d5db 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          The Ringman's<br /><span style={{ background: "linear-gradient(135deg, #ef4444, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Forensic Inspection</span>
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "560px", margin: "0 auto", lineHeight: "1.8", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
          Upload photos. The Ringman interrogates every pixel — paint, panels, bolts, rust, glass, body seams. The truth comes out.
        </p>

        {/* Capability pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "28px" }}>
          {["🎨 Repaint Detection", "🔩 Bolt Forensics", "🦀 Rust Analysis", "📐 Panel Gap Analysis", "💥 Collision History", "✨ Paint Glitter Flag", "🪟 Glass Inspection", "🏗️ Structural Assessment"].map(c => (
            <div key={c} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "20px", padding: "6px 14px", fontSize: "12px", color: "#fca5a5", letterSpacing: "0.3px" }}>{c}</div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 100px" }}>

        {/* ── INPUT STEP ── */}
        {step === "input" && (
          <div>
            {/* Vehicle Info */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "28px", marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#6b7280", marginBottom: "20px" }}>Vehicle Information</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
                {[
                  { key: "year", label: "Year", placeholder: "2019" },
                  { key: "make", label: "Make", placeholder: "Ford" },
                  { key: "model", label: "Model", placeholder: "F-150" },
                  { key: "mileage", label: "Mileage", placeholder: "85000" },
                  { key: "vin", label: "VIN", placeholder: "1FTFW1ET..." },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: "11px", color: "#6b7280", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>{f.label}</label>
                    <input
                      value={vehicleInfo[f.key]}
                      onChange={e => setVehicleInfo(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "white", padding: "10px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Upload */}
            <div
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onClick={() => fileRef.current.click()}
              style={{
                border: "2px dashed rgba(239,68,68,0.3)",
                borderRadius: "8px",
                padding: "48px 24px",
                textAlign: "center",
                cursor: "pointer",
                background: photos.length > 0 ? "rgba(239,68,68,0.03)" : "rgba(255,255,255,0.01)",
                transition: "all 0.2s",
                marginBottom: "24px",
              }}
            >
              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handlePhotos} />
              {photos.length === 0 ? (
                <>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>📸</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#e2e8f0", marginBottom: "8px" }}>Drop photos here or click to upload</div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>Up to 20 photos — exterior, interior, engine bay, underbody, damage areas</div>
                  <div style={{ fontSize: "12px", color: "#4b5563", marginTop: "8px" }}>JPG, PNG, HEIC, WEBP supported</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>✅</div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "#10b981", marginBottom: "16px" }}>{photos.length} photo{photos.length !== 1 ? "s" : ""} loaded — ready for forensics</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
                    {photoUrls.slice(0, 8).map((url, i) => (
                      <img key={i} src={url} style={{ width: 72, height: 54, objectFit: "cover", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)" }} />
                    ))}
                    {photos.length > 8 && <div style={{ width: 72, height: 54, borderRadius: "4px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: "#6b7280" }}>+{photos.length - 8}</div>}
                  </div>
                </>
              )}
            </div>

            {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "6px", padding: "12px 16px", color: "#fca5a5", marginBottom: "16px", fontSize: "14px" }}>{error}</div>}

            <button
              onClick={runInspection}
              disabled={photos.length === 0}
              style={{
                width: "100%",
                padding: "18px",
                background: photos.length > 0 ? "linear-gradient(135deg, #dc2626, #b91c1c)" : "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: "8px",
                color: photos.length > 0 ? "white" : "#4b5563",
                fontSize: "16px",
                fontWeight: "800",
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: photos.length > 0 ? "pointer" : "not-allowed",
                boxShadow: photos.length > 0 ? "0 0 30px rgba(220,38,38,0.3)" : "none",
                transition: "all 0.2s",
              }}
            >
              🔍 Run Ringman Forensics
            </button>
          </div>
        )}

        {/* ── ANALYZING STEP ── */}
        {step === "analyzing" && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: "64px", marginBottom: "24px", animation: "spin 2s linear infinite", display: "inline-block" }}>🔍</div>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "28px", fontWeight: "700", color: "#f5e27a", marginBottom: "16px" }}>
              The Ringman is inspecting...
            </h2>
            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "40px", lineHeight: "1.8" }}>
              Analyzing {photos.length} photo{photos.length !== 1 ? "s" : ""} at high detail.<br />
              Checking paint, panels, bolts, rust, glass, seams, and more.
            </p>
            <div style={{ maxWidth: "400px", margin: "0 auto" }}>
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "100px", height: "6px", overflow: "hidden", marginBottom: "12px" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #dc2626, #f97316)", borderRadius: "100px", transition: "width 0.5s ease" }} />
              </div>
              <div style={{ fontSize: "12px", color: "#4b5563", letterSpacing: "2px" }}>
                {progress < 30 ? "UPLOADING PHOTOS..." : progress < 60 ? "RUNNING AI VISION ANALYSIS..." : progress < 90 ? "COMPUTING INTEGRITY SCORE..." : "GENERATING VERDICT..."}
              </div>
            </div>
            <div style={{ marginTop: "48px", display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
              {["Scanning paint layers...", "Checking panel gaps...", "Analyzing bolt heads...", "Detecting rust...", "Mapping damage..."].map((t, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "6px 14px", fontSize: "12px", color: "#4b5563" }}>{t}</div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS STEP ── */}
        {step === "results" && results && (
          <div>
            {/* Score Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
              {/* Integrity Score */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SCORE_COLOR(results.integrity_score)}40`, borderRadius: "8px", padding: "28px", textAlign: "center", borderTop: `3px solid ${SCORE_COLOR(results.integrity_score)}` }}>
                <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#6b7280", marginBottom: "12px" }}>Integrity Score</div>
                <div style={{ fontSize: "64px", fontWeight: "900", color: SCORE_COLOR(results.integrity_score), fontFamily: "monospace", lineHeight: 1, textShadow: `0 0 30px ${SCORE_COLOR(results.integrity_score)}60` }}>{results.integrity_score}</div>
                <div style={{ fontSize: "11px", color: SCORE_COLOR(results.integrity_score), letterSpacing: "3px", textTransform: "uppercase", marginTop: "8px", fontWeight: "700" }}>{SCORE_LABEL(results.integrity_score)}</div>
              </div>

              {/* Visual Score */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "28px", textAlign: "center" }}>
                <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#6b7280", marginBottom: "12px" }}>Visual Score</div>
                <div style={{ fontSize: "64px", fontWeight: "900", color: SCORE_COLOR(results.visual_findings?.overall_visual_score || 50), fontFamily: "monospace", lineHeight: 1 }}>{results.visual_findings?.overall_visual_score || "–"}</div>
                <div style={{ fontSize: "11px", color: "#6b7280", letterSpacing: "2px", marginTop: "8px" }}>Grade {results.grade_recommendation} Recommended</div>
              </div>
            </div>

            {/* Quick Flags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
              {[
                { label: "Repaint", value: results.visual_findings?.repaint_detected, danger: true },
                { label: "Collision Repair", value: results.visual_findings?.collision_repair_suspected, danger: true },
                { label: "Rust", value: results.visual_findings?.rust_detected, danger: true },
                { label: "Bolt Tampering", value: results.visual_findings?.bolt_tampering_detected, danger: true },
                { label: "Glass Issues", value: results.visual_findings?.glass_issues?.length > 0, danger: true },
                { label: "Structural Concerns", value: results.visual_findings?.structural_concerns?.length > 0, danger: true },
              ].map(f => (
                <div key={f.label} style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: `1px solid ${f.value ? "rgba(239,68,68,0.4)" : "rgba(16,185,129,0.3)"}`,
                  background: f.value ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.05)",
                  fontSize: "12px",
                  color: f.value ? "#fca5a5" : "#6ee7b7",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}>
                  {f.value ? "🚨" : "✅"} {f.label}
                </div>
              ))}
            </div>

            {/* Ringman Verdict */}
            <div style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.2)", borderLeft: "3px solid #d4af37", borderRadius: "8px", padding: "24px 28px", marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#d4af37", marginBottom: "12px" }}>🎩 The Ringman's Verdict</div>
              <p style={{ fontFamily: "'Georgia', serif", fontSize: "16px", lineHeight: "1.8", color: "#e8d5a3", margin: 0, fontStyle: "italic" }}>
                "{results.ringman_verdict}"
              </p>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "24px", gap: "0" }}>
              {[
                { id: "overview", label: "Overview" },
                { id: "damage", label: `Damage (${results.visual_findings?.damage_items?.length || 0})` },
                { id: "paint", label: "Paint & Body" },
                { id: "deductions", label: "Score Breakdown" },
                { id: "photos", label: `Photos (${photos.length})` },
              ].map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                  background: "none", border: "none",
                  borderBottom: activeTab === t.id ? "2px solid #ef4444" : "2px solid transparent",
                  color: activeTab === t.id ? "#ef4444" : "#4b5563",
                  padding: "12px 16px", fontSize: "12px", fontWeight: "700",
                  letterSpacing: "0.5px", textTransform: "uppercase", cursor: "pointer",
                }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {activeTab === "overview" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {results.red_flags?.length > 0 && (
                  <div style={{ gridColumn: "1 / -1", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "20px" }}>
                    <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#ef4444", marginBottom: "12px" }}>🚨 RED FLAGS</div>
                    {results.red_flags.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px", fontSize: "14px", color: "#fca5a5" }}>
                        <span style={{ color: "#ef4444", flexShrink: 0 }}>▸</span> {f}
                      </div>
                    ))}
                  </div>
                )}
                {results.visual_findings?.positive_findings?.length > 0 && (
                  <div style={{ gridColumn: "1 / -1", background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "8px", padding: "20px" }}>
                    <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#10b981", marginBottom: "12px" }}>✅ POSITIVES</div>
                    {results.visual_findings.positive_findings.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px", fontSize: "14px", color: "#6ee7b7" }}>
                        <span style={{ color: "#10b981", flexShrink: 0 }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Damage */}
            {activeTab === "damage" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {(!results.visual_findings?.damage_items || results.visual_findings.damage_items.length === 0) ? (
                  <div style={{ textAlign: "center", padding: "40px", color: "#10b981", fontFamily: "'Georgia', serif", fontSize: "18px" }}>✅ No significant damage items detected</div>
                ) : results.visual_findings.damage_items.map((d, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${SEV_COLOR[d.severity] || "#6b7280"}30`, borderLeft: `3px solid ${SEV_COLOR[d.severity] || "#6b7280"}`, borderRadius: "6px", padding: "16px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ fontWeight: "700", color: "#e2e8f0", fontSize: "14px" }}>{d.location}</div>
                      <div style={{ fontSize: "11px", color: SEV_COLOR[d.severity], letterSpacing: "1px", textTransform: "uppercase", fontWeight: "700", border: `1px solid ${SEV_COLOR[d.severity]}40`, padding: "3px 10px", borderRadius: "20px" }}>{d.severity}</div>
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>{d.type}</div>
                    <div style={{ fontSize: "14px", color: "#9ca3af", lineHeight: "1.6" }}>{d.description}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Paint & Body */}
            {activeTab === "paint" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {results.visual_findings?.repaint_detected && (
                  <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "20px" }}>
                    <div style={{ fontWeight: "700", color: "#fca5a5", marginBottom: "8px" }}>🎨 REPAINT DETECTED</div>
                    <div style={{ fontSize: "13px", color: "#9ca3af" }}>Affected panels: {results.visual_findings.repaint_panels?.join(", ") || "See photos"}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px" }}>Paint glitter, metallic flake inconsistency, or color variance detected — this vehicle has been repainted outside the factory.</div>
                  </div>
                )}
                {results.visual_findings?.collision_repair_suspected && (
                  <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "20px" }}>
                    <div style={{ fontWeight: "700", color: "#fca5a5", marginBottom: "8px" }}>💥 COLLISION REPAIR SUSPECTED</div>
                    {results.visual_findings.collision_indicators?.map((c, i) => (
                      <div key={i} style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}>▸ {c}</div>
                    ))}
                  </div>
                )}
                {results.visual_findings?.paint_issues?.length > 0 && (
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "20px" }}>
                    <div style={{ fontWeight: "700", color: "#e2e8f0", marginBottom: "8px" }}>Paint Issues</div>
                    {results.visual_findings.paint_issues.map((p, i) => (
                      <div key={i} style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}>▸ {p}</div>
                    ))}
                  </div>
                )}
                {results.visual_findings?.rust_detected && (
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "20px" }}>
                    <div style={{ fontWeight: "700", color: "#e2e8f0", marginBottom: "8px" }}>🦀 Rust — {results.visual_findings.rust_severity}</div>
                    <div style={{ fontSize: "13px", color: "#9ca3af" }}>Locations: {results.visual_findings.rust_locations?.join(", ") || "See photos"}</div>
                  </div>
                )}
                {results.visual_findings?.bolt_tampering_detected && (
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "20px" }}>
                    <div style={{ fontWeight: "700", color: "#e2e8f0", marginBottom: "8px" }}>🔩 Bolt Tampering</div>
                    {results.visual_findings.bolt_findings?.map((b, i) => (
                      <div key={i} style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}>▸ {b}</div>
                    ))}
                  </div>
                )}
                {!results.visual_findings?.repaint_detected && !results.visual_findings?.collision_repair_suspected && !results.visual_findings?.rust_detected && !results.visual_findings?.bolt_tampering_detected && (
                  <div style={{ textAlign: "center", padding: "40px", color: "#10b981", fontFamily: "'Georgia', serif", fontSize: "18px" }}>✅ Paint & body appear clean</div>
                )}
              </div>
            )}

            {/* Tab: Score Breakdown */}
            {activeTab === "deductions" && (
              <div>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "24px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#6b7280", marginBottom: "20px" }}>SCORE DEDUCTIONS</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "#10b981", fontWeight: "700" }}>Starting Score</span>
                    <span style={{ color: "#10b981", fontWeight: "900", fontSize: "20px", fontFamily: "monospace" }}>100</span>
                  </div>
                  {results.deductions?.map((d, i) => {
                    const match = d.match(/-(\d+)\)/);
                    const pts = match ? parseInt(match[1]) : 0;
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <span style={{ fontSize: "14px", color: "#9ca3af" }}>{d.split(" (")[0]}</span>
                        <span style={{ color: "#ef4444", fontWeight: "700", fontFamily: "monospace" }}>-{pts}</span>
                      </div>
                    );
                  })}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontWeight: "700", color: SCORE_COLOR(results.integrity_score) }}>Final Integrity Score</span>
                    <span style={{ color: SCORE_COLOR(results.integrity_score), fontWeight: "900", fontSize: "28px", fontFamily: "monospace", textShadow: `0 0 20px ${SCORE_COLOR(results.integrity_score)}60` }}>{results.integrity_score}</span>
                  </div>
                </div>
                <div style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: "8px", padding: "20px" }}>
                  <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.7" }}>
                    <strong style={{ color: "#d4af37" }}>How the score works:</strong> Starts at 100. Deductions applied for repaint (−15), collision repair (−20), structural rust (−25), bolt tampering (−10), structural concerns (−15), glass issues (−5), plus severity-weighted damage items.
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Photos */}
            {activeTab === "photos" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
                {photoUrls.map((url, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={url} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.06)", display: "block" }} />
                    <div style={{ position: "absolute", bottom: 6, left: 6, background: "rgba(0,0,0,0.7)", borderRadius: "4px", padding: "2px 8px", fontSize: "11px", color: "#9ca3af" }}>Photo {i + 1}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
              <button onClick={reset} style={{ flex: 1, padding: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#9ca3af", fontSize: "14px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px" }}>
                ← NEW INSPECTION
              </button>
              <button onClick={() => window.print()} style={{ flex: 1, padding: "14px", background: "linear-gradient(135deg, #d4af37, #b8941e)", border: "none", borderRadius: "8px", color: "#0d0d12", fontSize: "14px", fontWeight: "800", cursor: "pointer", letterSpacing: "1px" }}>
                🖨️ PRINT REPORT
              </button>
            </div>
          </div>
        )}
      </div>

      <RingmanAI page="Forensics" contextData={vehicleInfo} />

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media print { nav, button { display: none !important; } }
      `}</style>
    </div>
  );
}
