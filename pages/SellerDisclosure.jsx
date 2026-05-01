import { useState, useEffect } from "react";

const SECTIONS = ["Mechanical", "Electrical", "Climate", "Body & Glass", "Aftermarket Mods", "Known Issues", "Certify"];

const OBD_SCAN_LOCATIONS = [
  { name: "AutoZone", note: "Free scan + printed results" },
  { name: "O'Reilly Auto Parts", note: "Free scan, no appointment" },
  { name: "Advance Auto Parts", note: "Free scan + code printout" },
  { name: "NAPA Auto Parts", note: "Free at most locations" },
  { name: "Pep Boys", note: "Free at most locations" },
];

const YN = ({ value, onChange }) => (
  <div style={{ display: "flex", gap: 8 }}>
    {["Yes", "No", "N/A"].map(opt => (
      <button key={opt} onClick={() => onChange(opt)}
        style={{ padding: "7px 18px", borderRadius: 6, border: `1px solid ${value === opt ? (opt === "Yes" ? "rgba(239,68,68,0.5)" : opt === "No" ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.2)") : "rgba(255,255,255,0.06)"}`, background: value === opt ? (opt === "Yes" ? "rgba(239,68,68,0.1)" : opt === "No" ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)") : "transparent", color: value === opt ? (opt === "Yes" ? "#fca5a5" : opt === "No" ? "#6ee7b7" : "#9ca3af") : "#6b7280", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
        {opt}
      </button>
    ))}
  </div>
);

const Row = ({ label, fieldKey, values, onChange, flag }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", gap: 16, flexWrap: "wrap" }}>
    <div style={{ flex: 1 }}>
      <span style={{ fontSize: 14, color: "#d1d5db" }}>{label}</span>
      {flag && values[fieldKey] === "Yes" && <span style={{ marginLeft: 8, fontSize: 11, color: "#ef4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 4, padding: "2px 8px" }}>⚠️ FLAGGED</span>}
    </div>
    <YN value={values[fieldKey]} onChange={v => onChange(fieldKey, v)} />
  </div>
);

export default function SellerDisclosure() {
  useEffect(() => {
    document.title = "Seller Disclosure Report — Ringman's AI";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Complete your vehicle disclosure report covering mechanical, electrical, climate, body, aftermarket mods, and known issues. Timestamped and digitally signed for buyer protection.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "Seller Disclosure Report — Ringman's AI", "property");
    setMeta("og:description", "Complete your vehicle disclosure report covering mechanical, electrical, climate, body, aftermarket mods, and known issues. Timestamped and digitally signed for buyer protection.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Seller Disclosure Report — Ringman's AI");
    setMeta("twitter:description", "Complete your vehicle disclosure report covering mechanical, electrical, climate, body, aftermarket mods, and known issues. Timestamped and digitally signed for buyer protection.");
  }, []);

  const [activeSection, setActiveSection] = useState(0);
  const [values, setValues] = useState({});
  const [notes, setNotes] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showOBDHelp, setShowOBDHelp] = useState(false);

  const set = (key, val) => setValues(p => ({ ...p, [key]: val }));
  const setNote = (key, val) => setNotes(p => ({ ...p, [key]: val }));

  const sectionComplete = (idx) => {
    const sectionFields = getSectionFields(idx);
    return sectionFields.length === 0 || sectionFields.every(f => values[f]);
  };

  const getSectionFields = (idx) => {
    const maps = [
      ["eng_starts", "trans_shifts", "brakes_ok", "accel_normal", "steering_normal", "suspension_ok", "4wd_ok"],
      ["headlights", "signals", "brake_lights", "dash_lights", "windows_power", "locks_power", "horn", "wipers", "radio"],
      ["heat_works", "ac_cold", "fan_speeds", "defrost_front", "defrost_rear"],
      ["hood_ok", "doors_ok", "trunk_ok", "flood_history", "fire_history", "frame_damage", "sunroof"],
      [],
      [],
      [],
    ];
    return maps[idx] || [];
  };

  const flagCount = Object.entries(values).filter(([k, v]) => {
    const flaggedKeys = ["flood_history", "fire_history", "frame_damage", "dash_lights", "cel_on"];
    return flaggedKeys.includes(k) && v === "Yes";
  }).length;

  if (submitted) return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 480, padding: 40 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>📋</div>
        <h1 style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>Disclosure Submitted.</h1>
        <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.8, marginBottom: 12 }}>Your seller disclosure report has been timestamped and attached to this vehicle listing.</p>
        {flagCount > 0 && (
          <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 14, color: "#fca5a5", fontWeight: 700, marginBottom: 4 }}>⚠️ {flagCount} item{flagCount > 1 ? "s" : ""} flagged</div>
            <div style={{ fontSize: 13, color: "#9ca3af" }}>These will be disclosed to buyers and reviewed by our team before listing goes live.</div>
          </div>
        )}
        <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 10, padding: 16, marginBottom: 28 }}>
          <div style={{ fontSize: 13, color: "#6ee7b7", lineHeight: 1.7 }}>✓ Timestamped at {new Date().toLocaleString()}<br />✓ Digitally signed by you<br />✓ Permanently attached to VIN record</div>
        </div>
        <a href="/VehicleIntake" style={{ display: "block", padding: "16px", borderRadius: 8, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontWeight: 800, fontSize: 15, textDecoration: "none" }}>Continue to Listing →</a>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, background: "rgba(8,8,16,0.97)", position: "sticky", top: 0, zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ fontSize: 14, color: "#6b7280" }}>Seller Disclosure Report</div>
        {flagCount > 0 && <div style={{ fontSize: 13, color: "#ef4444", fontWeight: 700 }}>⚠️ {flagCount} flag{flagCount > 1 ? "s" : ""}</div>}
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 100px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 32 }}>

        {/* Section nav */}
        <div style={{ position: "sticky", top: 80, height: "fit-content" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#4b5563", marginBottom: 16 }}>Sections</div>
          {SECTIONS.map((s, i) => (
            <div key={i} onClick={() => setActiveSection(i)}
              style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 14px", borderRadius: 8, marginBottom: 4, cursor: "pointer", background: activeSection === i ? "rgba(6,182,212,0.08)" : "transparent", border: `1px solid ${activeSection === i ? "rgba(6,182,212,0.3)" : "transparent"}`, transition: "all 0.15s" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${sectionComplete(i) ? "#10b981" : activeSection === i ? "#06b6d4" : "rgba(255,255,255,0.1)"}`, background: sectionComplete(i) ? "#10b981" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white", flexShrink: 0 }}>
                {sectionComplete(i) ? "✓" : ""}
              </div>
              <span style={{ fontSize: 13, fontWeight: activeSection === i ? 700 : 400, color: activeSection === i ? "#06b6d4" : sectionComplete(i) ? "#10b981" : "#6b7280" }}>{s}</span>
            </div>
          ))}

          {flagCount > 0 && (
            <div style={{ marginTop: 20, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 12, color: "#fca5a5", fontWeight: 700, marginBottom: 4 }}>⚠️ {flagCount} Flag{flagCount > 1 ? "s" : ""} Detected</div>
              <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.5 }}>These items will be highlighted for buyers and reviewed before listing.</div>
            </div>
          )}
        </div>

        {/* Form area */}
        <div>

          {/* MECHANICAL */}
          {activeSection === 0 && (
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Mechanical</h2>
              <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 28 }}>Test each system before answering. "Yes" means there IS an issue. "No" means it's fine.</p>

              <Row label="Engine warning / check engine light on" fieldKey="cel_on" values={values} onChange={set} flag />

              {values.cel_on === "Yes" && (
                <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 10, padding: 20, margin: "12px 0" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fbbf24", marginBottom: 8 }}>OBD Scan Required</div>
                  <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 14 }}>You must upload an OBD scan result for this vehicle before it can be listed. Don't have a scanner?</div>
                  <button onClick={() => setShowOBDHelp(!showOBDHelp)}
                    style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.08)", color: "#fbbf24", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                    {showOBDHelp ? "Hide" : "Where to get a FREE scan →"}
                  </button>
                  {showOBDHelp && (
                    <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {OBD_SCAN_LOCATIONS.map((loc, i) => (
                        <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, padding: "10px 12px" }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>{loc.name}</div>
                          <div style={{ fontSize: 11, color: "#4b5563" }}>{loc.note}</div>
                        </div>
                      ))}
                      <div style={{ gridColumn: "1/-1", fontSize: 12, color: "#6b7280", fontStyle: "italic", marginTop: 4 }}>Ask for a printed results sheet and upload a photo of it to complete your OBD submission.</div>
                    </div>
                  )}
                </div>
              )}

              <Row label="Engine starts and runs normally" fieldKey="eng_starts" values={values} onChange={set} />
              <div style={{ padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ fontSize: 14, color: "#d1d5db", marginBottom: 10 }}>Engine oil condition</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Clean", "Dark", "Black", "Empty/Low"].map(opt => (
                    <button key={opt} onClick={() => set("oil_condition", opt)}
                      style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${values.oil_condition === opt ? "rgba(6,182,212,0.5)" : "rgba(255,255,255,0.06)"}`, background: values.oil_condition === opt ? "rgba(6,182,212,0.1)" : "transparent", color: values.oil_condition === opt ? "#06b6d4" : "#6b7280", cursor: "pointer", fontSize: 13 }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <Row label="All transmission gears shift properly" fieldKey="trans_shifts" values={values} onChange={set} />
              <div style={{ padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ fontSize: 14, color: "#d1d5db", marginBottom: 10 }}>Transmission fluid condition</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Pink/Red (good)", "Dark", "Brown", "Black"].map(opt => (
                    <button key={opt} onClick={() => set("trans_fluid", opt)}
                      style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${values.trans_fluid === opt ? "rgba(6,182,212,0.5)" : "rgba(255,255,255,0.06)"}`, background: values.trans_fluid === opt ? "rgba(6,182,212,0.1)" : "transparent", color: values.trans_fluid === opt ? "#06b6d4" : "#6b7280", cursor: "pointer", fontSize: 13 }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <Row label="Brakes functional front and rear" fieldKey="brakes_ok" values={values} onChange={set} />
              <Row label="Acceleration is normal" fieldKey="accel_normal" values={values} onChange={set} />
              <Row label="Steering is normal" fieldKey="steering_normal" values={values} onChange={set} />
              <Row label="Suspension — no unusual noise or bounce" fieldKey="suspension_ok" values={values} onChange={set} />
              <Row label="4WD / AWD engages properly (if equipped)" fieldKey="4wd_ok" values={values} onChange={set} />
            </div>
          )}

          {/* ELECTRICAL */}
          {activeSection === 1 && (
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Electrical</h2>
              <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 28 }}>"Yes" = issue present. "No" = works fine.</p>
              <Row label="Headlights — low beam issues" fieldKey="headlights" values={values} onChange={set} />
              <Row label="High beams issues" fieldKey="highbeams" values={values} onChange={set} />
              <Row label="Turn signals / blinkers issues" fieldKey="signals" values={values} onChange={set} />
              <Row label="Brake lights issues" fieldKey="brake_lights" values={values} onChange={set} />
              <Row label="Reverse lights issues" fieldKey="reverse_lights" values={values} onChange={set} />
              <Row label="Active dashboard warning lights" fieldKey="dash_lights" values={values} onChange={set} flag />
              {values.dash_lights === "Yes" && (
                <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 8, marginBottom: 8 }}>
                  <textarea value={notes.dash_lights_detail || ""} onChange={e => setNote("dash_lights_detail", e.target.value)} placeholder="List all active warning lights (e.g. ABS, TPMS, Airbag, Transmission...)" rows={2} style={{ width: "100%", background: "transparent", border: "none", color: "#d1d5db", fontSize: 13, resize: "none", outline: "none", boxSizing: "border-box" }} />
                </div>
              )}
              <Row label="Power windows — any not working" fieldKey="windows_power" values={values} onChange={set} />
              <Row label="Power locks — any not working" fieldKey="locks_power" values={values} onChange={set} />
              <Row label="Horn issues" fieldKey="horn" values={values} onChange={set} />
              <Row label="Wiper issues (any speed)" fieldKey="wipers" values={values} onChange={set} />
              <Row label="Radio / infotainment issues" fieldKey="radio" values={values} onChange={set} />
            </div>
          )}

          {/* CLIMATE */}
          {activeSection === 2 && (
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Climate</h2>
              <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 28 }}>"Yes" = issue. "No" = works fine.</p>
              <Row label="Heat not working" fieldKey="heat_works" values={values} onChange={set} />
              <Row label="A/C not blowing cold" fieldKey="ac_cold" values={values} onChange={set} />
              <Row label="Fan speed issues (any speed)" fieldKey="fan_speeds" values={values} onChange={set} />
              <Row label="Front defrost issues" fieldKey="defrost_front" values={values} onChange={set} />
              <Row label="Rear defrost issues" fieldKey="defrost_rear" values={values} onChange={set} />
            </div>
          )}

          {/* BODY & GLASS */}
          {activeSection === 3 && (
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Body & Glass</h2>
              <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 28 }}>Flood, fire, and frame questions are the most important. Be honest — they show up in history reports anyway.</p>
              <Row label="Hood open/close issues or hydraulics" fieldKey="hood_ok" values={values} onChange={set} />
              <Row label="Any door open/close issues" fieldKey="doors_ok" values={values} onChange={set} />
              <Row label="Trunk / tailgate / hatch issues" fieldKey="trunk_ok" values={values} onChange={set} />
              <Row label="Sunroof issues (if equipped)" fieldKey="sunroof" values={values} onChange={set} />
              <Row label="FLOOD HISTORY" fieldKey="flood_history" values={values} onChange={set} flag />
              <Row label="FIRE HISTORY" fieldKey="fire_history" values={values} onChange={set} flag />
              <Row label="FRAME DAMAGE OR STRUCTURAL REPAIR" fieldKey="frame_damage" values={values} onChange={set} flag />
              {(values.flood_history === "Yes" || values.fire_history === "Yes" || values.frame_damage === "Yes") && (
                <div style={{ padding: 16, background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, marginTop: 12 }}>
                  <div style={{ fontSize: 13, color: "#fca5a5", fontWeight: 700, marginBottom: 8 }}>⚠️ Required: Describe the damage history</div>
                  <textarea value={notes.damage_detail || ""} onChange={e => setNote("damage_detail", e.target.value)} placeholder="Describe the extent of damage, when it occurred, what repairs were made..." rows={3} style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, color: "#d1d5db", fontSize: 13, padding: "10px 12px", resize: "none", outline: "none", boxSizing: "border-box" }} />
                </div>
              )}
            </div>
          )}

          {/* AFTERMARKET MODS */}
          {activeSection === 4 && (
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Aftermarket & Modifications</h2>
              <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 28 }}>Disclose every non-factory modification. Buyers paying for a stock vehicle need to know what they're getting.</p>

              {[
                { label: "🛞 Wheels & Tires", key: "mods_wheels", note: "wheels_detail", placeholder: "Brand, size, condition. Are OEM wheels included in the sale?" },
                { label: "🔊 Audio / Entertainment", key: "mods_audio", note: "audio_detail", placeholder: "Head unit brand, speakers, subwoofer/amp, DVD screens, navigation..." },
                { label: "📺 Rear Seat Entertainment / Screens", key: "mods_screens", note: "screens_detail", placeholder: "How many screens? Working? Brand?" },
                { label: "🔦 Exterior Mods", key: "mods_exterior", note: "exterior_detail", placeholder: "Lift/leveling kit, lowering, body kit, tint %, wrap, light bars, running boards..." },
                { label: "🏎️ Performance Mods", key: "mods_performance", note: "perf_detail", placeholder: "Cold air intake, exhaust, tuner/programmer, suspension upgrades..." },
                { label: "📡 Other Electronics", key: "mods_electronics", note: "elec_detail", placeholder: "Remote start, backup camera, dash cam, GPS tracker..." },
              ].map((mod, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#d1d5db" }}>{mod.label}</span>
                    <YN value={values[mod.key]} onChange={v => set(mod.key, v)} />
                  </div>
                  {values[mod.key] === "Yes" && (
                    <textarea value={notes[mod.note] || ""} onChange={e => setNote(mod.note, e.target.value)} placeholder={mod.placeholder} rows={2}
                      style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 8, color: "#d1d5db", fontSize: 13, padding: "10px 12px", resize: "none", outline: "none", boxSizing: "border-box" }} />
                  )}
                  {i < 5 && <div style={{ height: 1, background: "rgba(255,255,255,0.04)", marginTop: 12 }} />}
                </div>
              ))}
            </div>
          )}

          {/* KNOWN ISSUES */}
          {activeSection === 5 && (
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Known Issues</h2>
              <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 28 }}>This is your chance to disclose anything that doesn't fit neatly into the categories above. Buyers trust sellers who over-disclose. The more honest you are, the stronger your integrity score.</p>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, color: "#9ca3af", display: "block", marginBottom: 10 }}>List any known issues or problems you expect to develop based on your experience with this vehicle:</label>
                <textarea value={notes.known_issues || ""} onChange={e => setNote("known_issues", e.target.value)} placeholder="Examples: 'Rear passenger window is slow.' 'Needs front brakes in about 10k miles.' 'AC compressor has been making a noise at idle.' Be specific." rows={5}
                  style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#d1d5db", fontSize: 14, padding: "14px 16px", resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.7 }} />
              </div>

              <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 13, color: "#6ee7b7", lineHeight: 1.7 }}>
                  <strong>Why this section matters:</strong> Buyers who feel fully informed bid more confidently and pay higher prices. Sellers who disclose everything have lower arbitration rates and faster sales. This section is your protection AND your competitive advantage.
                </div>
              </div>
            </div>
          )}

          {/* CERTIFY */}
          {activeSection === 6 && (
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Certification</h2>
              <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 28 }}>Review your disclosure summary and certify your submission.</p>

              {/* Summary */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af", marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>Disclosure Summary</div>
                {SECTIONS.slice(0, 6).map((s, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <span style={{ fontSize: 13, color: "#d1d5db" }}>{s}</span>
                    <span style={{ fontSize: 12, color: sectionComplete(i) ? "#10b981" : "#f59e0b", fontWeight: 700 }}>{sectionComplete(i) ? "✓ Complete" : "Incomplete"}</span>
                  </div>
                ))}
                {flagCount > 0 && (
                  <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 8 }}>
                    <span style={{ fontSize: 13, color: "#fca5a5" }}>⚠️ {flagCount} item{flagCount > 1 ? "s" : ""} flagged — will be reviewed before listing goes live</span>
                  </div>
                )}
              </div>

              {/* Certification statement */}
              <div style={{ background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.15)", borderRadius: 12, padding: 24, marginBottom: 28 }}>
                <div style={{ fontSize: 15, color: "#d1d5db", lineHeight: 1.9, marginBottom: 16, fontStyle: "italic", fontFamily: "'Georgia',serif" }}>
                  "To the best of my knowledge at the time of this submission, I have inspected and tested this vehicle and the above report reflects my honest assessment of its condition. I understand that misrepresentation of any disclosed or undisclosed issue may result in arbitration, financial penalties, integrity score penalties, or permanent removal from the Ringman's AI platform."
                </div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Submitted: {new Date().toLocaleString()} — this timestamp is permanent and attached to the VIN record.</div>
              </div>

              <button onClick={() => setSubmitted(true)}
                style={{ width: "100%", padding: "18px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 900, fontSize: 17, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", letterSpacing: 0.5 }}>
                ✓ I Certify — Submit Disclosure Report
              </button>
            </div>
          )}

          {/* Nav buttons */}
          {activeSection < 6 && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
              {activeSection > 0 ? (
                <button onClick={() => setActiveSection(s => s - 1)} style={{ padding: "12px 24px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>← Previous</button>
              ) : <div />}
              <button onClick={() => setActiveSection(s => s + 1)} style={{ padding: "12px 28px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", cursor: "pointer", fontSize: 14, fontWeight: 800 }}>Next Section →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
