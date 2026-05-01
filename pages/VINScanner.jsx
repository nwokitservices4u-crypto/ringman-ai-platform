import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const LOGO = "https://media.base44.com/images/public/69cecf03f993d438c489b18c/9e6040534_generated_image.png";
const VIN_DECODE_URL = "https://chap-c489b18c.base44.app/functions/vinDecode";
const OPENAI_KEY = ""; // set via env or backend

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/RunList", label: "Run List" },
  { to: "/LiveAuction", label: "🔴 Live" },
  { to: "/Dashboard", label: "Dashboard" },
  { to: "/VehicleIntake", label: "Sell" },
  { to: "/Ringman", label: "🎩 Ringman" },
  { to: "/Forensics", label: "🔍 Forensics" },
  { to: "/VINScanner", label: "📷 VIN" },
  { to: "/WhyUs", label: "Why Us" },
  { to: "/FAQ", label: "FAQ" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(16,185,129,0.15)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <img src={LOGO} alt="Logo" style={{ width: 32, height: 32, borderRadius: "8px", objectFit: "cover" }} />
        <span style={{ fontWeight: "900", fontSize: "15px", color: "white", letterSpacing: "-0.5px" }}>The Ringman's <span style={{ color: "#10b981" }}>AI</span></span>
      </Link>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }} className="desktop-nav">
        {LINKS.map(l => (
          <Link key={l.to} to={l.to} style={{ color: loc.pathname === l.to ? "#10b981" : "#9ca3af", textDecoration: "none", fontSize: "13px", fontWeight: "600", padding: "6px 10px", borderRadius: "4px", background: loc.pathname === l.to ? "rgba(16,185,129,0.08)" : "transparent" }}>{l.label}</Link>
        ))}
      </div>
      <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: "white", fontSize: "22px", cursor: "pointer" }} className="hamburger">☰</button>
      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(8,8,16,0.98)", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px" }}>
          <button onClick={() => setOpen(false)} style={{ position: "absolute", top: "20px", right: "24px", background: "none", border: "none", color: "white", fontSize: "28px", cursor: "pointer" }}>✕</button>
          {LINKS.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ color: "white", textDecoration: "none", fontSize: "22px", fontWeight: "700" }}>{l.label}</Link>)}
        </div>
      )}
      <style>{`@media(max-width:768px){.desktop-nav{display:none!important}.hamburger{display:block!important}}`}</style>
    </nav>
  );
}

function Field({ label, value }) {
  if (!value || value === "Not Applicable" || value === "") return null;
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#4b5563", marginBottom: "3px" }}>{label}</div>
      <div style={{ fontSize: "14px", color: "#e2e8f0", lineHeight: "1.5" }}>{value}</div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", marginBottom: "16px", overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "16px" }}>{icon}</span>
        <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#6b7280", fontWeight: "700" }}>{title}</span>
      </div>
      <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "4px 20px" }}>{children}</div>
    </div>
  );
}

export default function VINScanner() {
  const [vin, setVin] = useState("");
  const [mode, setMode] = useState("manual"); // manual | camera | photo
  const [scanning, setScanning] = useState(false);
  const [decoding, setDecoding] = useState(false);
  const [photoProcessing, setPhotoProcessing] = useState(false);
  const [decoded, setDecoded] = useState(null);
  const [raw, setRaw] = useState(null);
  const [error, setError] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [scanSuccess, setScanSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [activeTab, setActiveTab] = useState("identity");
  const [copied, setCopied] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const codeReaderRef = useRef(null);

  const loadZXing = () => new Promise((resolve, reject) => {
    if (window.ZXing) { resolve(window.ZXing); return; }
    const s = document.createElement("script");
    s.src = "https://unpkg.com/@zxing/library@0.19.1/umd/index.min.js";
    s.onload = () => resolve(window.ZXing);
    s.onerror = reject;
    document.head.appendChild(s);
  });

  const stopScanner = () => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (codeReaderRef.current) { try { codeReaderRef.current.reset(); } catch {} }
    setScanning(false);
  };

  useEffect(() => () => stopScanner(), []);

  const startCamera = async () => {
    setError(""); setCameraError(""); setScanSuccess(false);
    setMode("camera"); setScanning(true);
    try {
      const ZXing = await loadZXing();
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } } });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
      const codeReader = new ZXing.BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;
      codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          const text = result.getText().trim().toUpperCase();
          if (/^[A-HJ-NPR-Z0-9]{11,17}$/.test(text)) {
            setVin(text);
            setScanSuccess(true);
            stopScanner();
            setMode("manual");
            setTimeout(() => decodeVin(text), 400);
          }
        }
      });
    } catch (err) {
      setCameraError("Camera unavailable: " + err.message);
      setScanning(false);
      setMode("manual");
    }
  };

  // Upload a photo of the VIN plate — use OCR via OpenAI Vision
  const handlePhotoUpload = async (file) => {
    if (!file) return;
    setError(""); setPhotoProcessing(true);
    setPhotoPreview(URL.createObjectURL(file));
    setMode("photo");
    try {
      // Convert to base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Send to our backend which uses OpenAI Vision to extract VIN
      const res = await fetch("https://chap-c489b18c.base44.app/functions/vinDecode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photo_base64: base64, extract_vin_from_photo: true }),
      });
      const data = await res.json();

      if (data.extracted_vin) {
        const extracted = data.extracted_vin.trim().toUpperCase();
        setVin(extracted);
        setScanSuccess(true);
        setPhotoProcessing(false);
        await decodeVin(extracted);
      } else if (data.error) {
        setError("Could not extract VIN: " + data.error);
        setPhotoProcessing(false);
      } else {
        setError("No VIN found in image. Try a clearer photo or type it manually.");
        setPhotoProcessing(false);
      }
    } catch (err) {
      setError("Photo processing failed: " + err.message);
      setPhotoProcessing(false);
    }
  };

  const decodeVin = async (v) => {
    const cleanVin = (v || vin).trim().toUpperCase();
    if (cleanVin.length < 11) { setError("VIN must be at least 11 characters."); return; }
    setError(""); setDecoding(true); setDecoded(null); setRaw(null);
    try {
      const res = await fetch(VIN_DECODE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vin: cleanVin }) });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setDecoded(data.decoded); setRaw(data.decoded); setActiveTab("identity"); }
    } catch (err) { setError("Decode failed: " + err.message); }
    setDecoding(false);
  };

  const copyVin = () => {
    navigator.clipboard?.writeText(vin);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const TABS = [
    { id: "identity", label: "🚗 Identity" },
    { id: "engine", label: "🔧 Engine" },
    { id: "safety", label: "🛡️ Safety" },
    { id: "dimensions", label: "📐 Body & Dims" },
    { id: "plant", label: "🏭 Plant & Origin" },
    { id: "recalls", label: `⚠️ Recalls${decoded ? ` (${decoded.recall_count || 0})` : ""}` },
    { id: "complaints", label: `📋 Complaints${decoded ? ` (${decoded.complaint_count || 0})` : ""}` },
    { id: "raw", label: "📊 All Fields" },
  ];

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "60px 24px 36px", background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#10b981", marginBottom: "12px" }}>VIN DECODER</div>
        <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: "900", margin: "0 0 12px", background: "linear-gradient(135deg,#fff,#9ca3af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Scan. Photograph. Decode.
        </h1>
        <p style={{ color: "#6b7280", fontSize: "15px", maxWidth: "500px", margin: "0 auto" }}>
          Scan the barcode with your camera, snap a photo of the VIN plate, or type it in. Every NHTSA field returned — no exceptions.
        </p>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px 100px" }}>

        {/* MODE SELECTOR */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          {[
            { id: "manual", icon: "⌨️", label: "Type VIN" },
            { id: "camera", icon: "📷", label: "Scan Barcode" },
            { id: "photo", icon: "🖼️", label: "Photo of VIN" },
          ].map(m => (
            <button key={m.id} onClick={() => { if (m.id === "camera") startCamera(); else { stopScanner(); setMode(m.id); } }} style={{ flex: "1 1 120px", padding: "14px 16px", borderRadius: "8px", border: `1px solid ${mode === m.id ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.08)"}`, background: mode === m.id ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.02)", color: mode === m.id ? "#10b981" : "#9ca3af", cursor: "pointer", fontWeight: "700", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <span>{m.icon}</span> {m.label}
            </button>
          ))}
        </div>

        {/* CAMERA VIEW */}
        {mode === "camera" && (
          <div style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "12px", overflow: "hidden", marginBottom: "20px", position: "relative" }}>
            <video ref={videoRef} style={{ width: "100%", maxHeight: "360px", objectFit: "cover", display: "block" }} playsInline muted />
            <div style={{ position: "absolute", inset: 0, border: "3px solid rgba(16,185,129,0.4)", borderRadius: "12px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "50%", left: "10%", right: "10%", height: "2px", background: "rgba(16,185,129,0.6)", transform: "translateY(-50%)", boxShadow: "0 0 12px rgba(16,185,129,0.8)", animation: "scanLine 2s ease-in-out infinite" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(8,8,16,0.8)", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#10b981", fontSize: "13px", fontWeight: "700" }}>📷 Point at VIN barcode...</span>
              <button onClick={() => { stopScanner(); setMode("manual"); }} style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", fontSize: "13px" }}>Stop</button>
            </div>
            {cameraError && <div style={{ position: "absolute", top: "12px", left: "12px", right: "12px", background: "rgba(239,68,68,0.9)", color: "white", borderRadius: "6px", padding: "10px 14px", fontSize: "13px" }}>{cameraError}</div>}
          </div>
        )}

        {/* PHOTO UPLOAD */}
        {mode === "photo" && (
          <div style={{ marginBottom: "20px" }}>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{ border: "2px dashed rgba(16,185,129,0.3)", borderRadius: "12px", padding: "40px 24px", textAlign: "center", cursor: "pointer", background: "rgba(16,185,129,0.03)", transition: "all 0.2s" }}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handlePhotoUpload(f); }}
            >
              {photoPreview ? (
                <img src={photoPreview} alt="VIN" style={{ maxWidth: "100%", maxHeight: "240px", borderRadius: "8px", objectFit: "contain" }} />
              ) : (
                <>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>🖼️</div>
                  <div style={{ color: "#10b981", fontWeight: "700", fontSize: "16px", marginBottom: "8px" }}>Upload or drag a photo of the VIN plate</div>
                  <div style={{ color: "#4b5563", fontSize: "13px" }}>Dashboard sticker, door jamb, windshield — any clear VIN photo works</div>
                </>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f); }} />
            {photoProcessing && (
              <div style={{ marginTop: "12px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", padding: "14px 16px", color: "#6ee7b7", fontSize: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "16px", height: "16px", border: "2px solid #10b981", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                AI reading VIN from photo...
              </div>
            )}
          </div>
        )}

        {/* MANUAL INPUT */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "20px", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <input
                value={vin}
                onChange={e => setVin(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, ""))}
                onKeyDown={e => e.key === "Enter" && decodeVin()}
                placeholder="1HGCM82633A123456"
                maxLength={17}
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${vin.length === 17 ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius: "8px", color: "white", padding: "14px 16px", fontSize: "18px", fontFamily: "monospace", letterSpacing: "3px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            {vin && (
              <button onClick={copyVin} title="Copy VIN" style={{ padding: "14px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: copied ? "#10b981" : "#6b7280", cursor: "pointer", fontSize: "18px" }}>{copied ? "✅" : "📋"}</button>
            )}
            <button onClick={() => decodeVin()} disabled={decoding || vin.length < 11}
              style={{ padding: "14px 28px", borderRadius: "8px", border: "none", cursor: vin.length >= 11 ? "pointer" : "not-allowed", background: vin.length >= 11 ? "linear-gradient(135deg,#10b981,#059669)" : "rgba(255,255,255,0.04)", color: vin.length >= 11 ? "white" : "#4b5563", fontWeight: "800", fontSize: "14px", whiteSpace: "nowrap" }}>
              {decoding ? "Decoding…" : "Decode →"}
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ flex: 1, height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
              <div style={{ width: `${(vin.length / 17) * 100}%`, height: "100%", background: vin.length === 17 ? "#10b981" : vin.length >= 11 ? "#f59e0b" : "#4b5563", borderRadius: "2px", transition: "all 0.2s" }} />
            </div>
            <span style={{ fontSize: "11px", color: vin.length === 17 ? "#10b981" : "#4b5563", fontFamily: "monospace" }}>{vin.length}/17</span>
          </div>
          {scanSuccess && <div style={{ marginTop: "12px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "6px", padding: "10px 14px", color: "#6ee7b7", fontSize: "13px" }}>✅ VIN captured — decoding now…</div>}
          {error && <div style={{ marginTop: "12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", padding: "10px 14px", color: "#fca5a5", fontSize: "13px" }}>{error}</div>}
        </div>

        {/* RESULTS */}
        {decoding && (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ width: "48px", height: "48px", border: "3px solid rgba(16,185,129,0.2)", borderTop: "3px solid #10b981", borderRadius: "50%", margin: "0 auto 20px", animation: "spin 0.8s linear infinite" }} />
            <div style={{ color: "#6b7280", fontSize: "15px" }}>Querying NHTSA database…</div>
          </div>
        )}

        {decoded && !decoding && (
          <>
            {/* VIN BANNER */}
            <div style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.1),rgba(16,185,129,0.04))", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "10px", padding: "20px 24px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#10b981", fontWeight: "700", letterSpacing: "2px", marginBottom: "6px" }}>DECODED</div>
                <div style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: "900" }}>{decoded.year} {decoded.make} {decoded.model} {decoded.trim}</div>
                <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>{decoded.body_class} · {decoded.vehicle_type}</div>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: "14px", color: "#10b981", letterSpacing: "2px", background: "rgba(16,185,129,0.08)", padding: "8px 14px", borderRadius: "6px" }}>{decoded.vin}</div>
            </div>

            {/* TABS */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "8px 14px", borderRadius: "6px", border: `1px solid ${activeTab === t.id ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.07)"}`, background: activeTab === t.id ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.02)", color: activeTab === t.id ? "#10b981" : "#6b7280", cursor: "pointer", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}>{t.label}</button>
              ))}
            </div>

            {/* TAB CONTENT */}
            {activeTab === "identity" && (
              <Section title="Vehicle Identity" icon="🚗">
                <Field label="VIN" value={decoded.vin} />
                <Field label="Year" value={decoded.year} />
                <Field label="Make" value={decoded.make} />
                <Field label="Model" value={decoded.model} />
                <Field label="Trim / Series" value={decoded.trim || decoded.series} />
                <Field label="Series 2" value={decoded.series2} />
                <Field label="Trim 2" value={decoded.trim2} />
                <Field label="Body Class" value={decoded.body_class} />
                <Field label="Vehicle Type" value={decoded.vehicle_type} />
                <Field label="Doors" value={decoded.doors} />
                <Field label="Windows" value={decoded.windows} />
                <Field label="Seats" value={decoded.seats} />
                <Field label="Seat Rows" value={decoded.seat_rows} />
                <Field label="Cab Type" value={decoded.cab_type} />
                <Field label="Base Price" value={decoded.base_price ? `$${Number(decoded.base_price).toLocaleString()}` : ""} />
                <Field label="Destination Market" value={decoded.destination_market} />
              </Section>
            )}

            {activeTab === "engine" && (
              <Section title="Engine & Drivetrain" icon="🔧">
                <Field label="Engine Summary" value={decoded.engine} />
                <Field label="Cylinders" value={decoded.engine_cylinders} />
                <Field label="Displacement (L)" value={decoded.engine_displacement_l} />
                <Field label="Displacement (cc)" value={decoded.engine_displacement_cc} />
                <Field label="Horsepower (from)" value={decoded.engine_hp} />
                <Field label="Horsepower (to)" value={decoded.engine_hp_to} />
                <Field label="Engine kW" value={decoded.engine_kw} />
                <Field label="Configuration" value={decoded.engine_configuration} />
                <Field label="Valve Train" value={decoded.valve_train} />
                <Field label="Fuel Injection" value={decoded.fuel_injection} />
                <Field label="Turbo" value={decoded.turbo} />
                <Field label="Engine Manufacturer" value={decoded.engine_manufacturer} />
                <Field label="Engine Model" value={decoded.engine_model} />
                <Field label="Fuel Type (Primary)" value={decoded.fuel_type} />
                <Field label="Fuel Type (Secondary)" value={decoded.fuel_type_secondary} />
                <Field label="Battery Type" value={decoded.battery_type} />
                <Field label="Battery kWh" value={decoded.battery_kwh} />
                <Field label="EV Range" value={decoded.ev_range} />
                <Field label="Transmission" value={decoded.transmission} />
                <Field label="Transmission Speeds" value={decoded.transmission_speeds} />
                <Field label="Drivetrain" value={decoded.drivetrain} />
              </Section>
            )}

            {activeTab === "safety" && (
              <Section title="Safety Systems" icon="🛡️">
                <Field label="Airbag — Front" value={decoded.airbag_front} />
                <Field label="Airbag — Side" value={decoded.airbag_side} />
                <Field label="Airbag — Knee" value={decoded.airbag_knee} />
                <Field label="Airbag — Curtain" value={decoded.airbag_curtain} />
                <Field label="Airbag — Seat Cushion" value={decoded.airbag_seatcushion} />
                <Field label="Seatbelt Type" value={decoded.seatbelt_type} />
                <Field label="Brakes" value={decoded.brakes} />
                <Field label="ABS" value={decoded.abs} />
                <Field label="ESC" value={decoded.esc} />
                <Field label="Traction Control" value={decoded.traction_control} />
                <Field label="TPMS" value={decoded.tpms} />
                <Field label="Forward Collision Warning" value={decoded.forward_collision_warning} />
                <Field label="Lane Departure Warning" value={decoded.lane_departure_warning} />
                <Field label="Blind Spot Monitor" value={decoded.blind_spot} />
                <Field label="Backup Camera" value={decoded.backup_camera} />
                <Field label="Auto Reverse" value={decoded.auto_reverse} />
                <Field label="Pedestrian Alert" value={decoded.pedestrian_alert} />
                <Field label="Daytime Running Lights" value={decoded.daytime_running_lights} />
                <Field label="Headlamp Light Source" value={decoded.headlamp_light_source} />
                <Field label="Adaptive Headlights" value={decoded.adaptive_headlights} />
                <Field label="Adaptive Cruise Control" value={decoded.adaptive_cruise} />
                <Field label="Crash Imminent Braking" value={decoded.crash_imminent_braking} />
                <Field label="Dynamic Brake Support" value={decoded.dynamic_brake_support} />
              </Section>
            )}

            {activeTab === "dimensions" && (
              <Section title="Body, Dimensions & Weight" icon="📐">
                <Field label="GVWR" value={decoded.gvwr} />
                <Field label="Curb Weight (lb)" value={decoded.curb_weight} />
                <Field label="Wheelbase (short)" value={decoded.wheelbase_short ? decoded.wheelbase_short + " in" : ""} />
                <Field label="Wheelbase (long)" value={decoded.wheelbase_long ? decoded.wheelbase_long + " in" : ""} />
                <Field label="Track — Front" value={decoded.track_front} />
                <Field label="Track — Rear" value={decoded.track_rear} />
                <Field label="Overall Height" value={decoded.overall_height} />
                <Field label="Overall Length" value={decoded.overall_length} />
                <Field label="Overall Width" value={decoded.overall_width} />
                <Field label="Tire — Front" value={decoded.tire_front} />
                <Field label="Tire — Rear" value={decoded.tire_rear} />
                <Field label="Wheel Size — Front" value={decoded.wheel_size_front} />
                <Field label="Wheel Size — Rear" value={decoded.wheel_size_rear} />
                <Field label="Wheels" value={decoded.wheels} />
                <Field label="Rim Type" value={decoded.rim_type} />
                <Field label="Rim Material" value={decoded.rim_material} />
              </Section>
            )}

            {activeTab === "plant" && (
              <Section title="Plant & Origin" icon="🏭">
                <Field label="Manufacturer" value={decoded.manufacturer} />
                <Field label="Plant City" value={decoded.plant_city} />
                <Field label="Plant State" value={decoded.plant_state} />
                <Field label="Plant Country" value={decoded.plant_country} />
                <Field label="Made In / Destination" value={decoded.made_in} />
                <Field label="Error Code" value={decoded.error_code !== "0" ? decoded.error_code : ""} />
                <Field label="Notes" value={decoded.note} />
              </Section>
            )}

            {activeTab === "recalls" && (
              <div>
                {decoded.recalls?.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px", color: "#10b981", fontSize: "15px" }}>✅ No open recalls found for this vehicle.</div>
                ) : (
                  decoded.recalls?.map((r, i) => (
                    <div key={i} style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "8px", padding: "16px 20px", marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                        <span style={{ fontWeight: "800", fontSize: "14px", color: "#fca5a5" }}>⚠️ {r.component}</span>
                        <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>{r.id}</span>
                      </div>
                      {r.summary && <div style={{ fontSize: "13px", color: "#9ca3af", lineHeight: "1.6", marginBottom: "6px" }}><strong style={{ color: "#e5e7eb" }}>Summary:</strong> {r.summary}</div>}
                      {r.consequence && <div style={{ fontSize: "13px", color: "#9ca3af", lineHeight: "1.6", marginBottom: "6px" }}><strong style={{ color: "#e5e7eb" }}>Consequence:</strong> {r.consequence}</div>}
                      {r.remedy && <div style={{ fontSize: "13px", color: "#9ca3af", lineHeight: "1.6" }}><strong style={{ color: "#e5e7eb" }}>Remedy:</strong> {r.remedy}</div>}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "complaints" && (
              <div>
                {decoded.complaints?.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px", color: "#10b981", fontSize: "15px" }}>✅ No complaints on record for this vehicle.</div>
                ) : (
                  decoded.complaints?.map((c, i) => (
                    <div key={i} style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "8px", padding: "16px 20px", marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                        <span style={{ fontWeight: "800", fontSize: "14px", color: "#fcd34d" }}>📋 {c.component}</span>
                        <div style={{ display: "flex", gap: "8px", fontSize: "11px" }}>
                          {c.crash && <span style={{ background: "rgba(239,68,68,0.2)", color: "#fca5a5", padding: "2px 8px", borderRadius: "3px" }}>CRASH</span>}
                          {c.fire && <span style={{ background: "rgba(239,68,68,0.2)", color: "#fca5a5", padding: "2px 8px", borderRadius: "3px" }}>FIRE</span>}
                          {c.injuries > 0 && <span style={{ background: "rgba(245,158,11,0.2)", color: "#fcd34d", padding: "2px 8px", borderRadius: "3px" }}>{c.injuries} INJURED</span>}
                          {c.deaths > 0 && <span style={{ background: "rgba(239,68,68,0.3)", color: "#fca5a5", padding: "2px 8px", borderRadius: "3px" }}>{c.deaths} DEATHS</span>}
                        </div>
                      </div>
                      {c.summary && <div style={{ fontSize: "13px", color: "#9ca3af", lineHeight: "1.6" }}>{c.summary}</div>}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "raw" && (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#6b7280", fontWeight: "700" }}>📊 All Decoded Fields</div>
                <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "4px 20px" }}>
                  {raw && Object.entries(raw).filter(([k, v]) => v && !["recalls","complaints"].includes(k) && String(v) !== "Not Applicable").map(([k, v]) => (
                    <Field key={k} label={k.replace(/_/g, " ")} value={String(v)} />
                  ))}
                </div>
              </div>
            )}

            {/* SEND TO INTAKE */}
            <div style={{ marginTop: "24px", padding: "20px 24px", background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ fontWeight: "800", fontSize: "15px", marginBottom: "4px" }}>Ready to list this vehicle?</div>
                <div style={{ fontSize: "13px", color: "#4b5563" }}>Send this VIN decode straight to the intake form — all fields pre-filled.</div>
              </div>
              <Link to={`/VehicleIntake?vin=${decoded.vin}`} style={{ background: "linear-gradient(135deg,#10b981,#059669)", color: "white", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "800", fontSize: "14px", whiteSpace: "nowrap" }}>
                Start Listing →
              </Link>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes scanLine { 0%,100% { top: 30%; opacity: 0.4; } 50% { top: 70%; opacity: 1; } }
        @media(max-width:768px){.desktop-nav{display:none!important}.hamburger{display:block!important}}
      `}</style>
    </div>
  );
}
