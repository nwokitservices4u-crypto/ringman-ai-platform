import { useState, useEffect } from "react";
import RingmanAI from "../components/RingmanAI.jsx";
import { Vehicle } from "@/api/entities";
import Nav from "../components/Nav.jsx";
import { Link } from "react-router-dom";

const MAKES = ["Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge","Ford","GMC","Honda","Hyundai","Infiniti","Jeep","Kia","Land Rover","Lexus","Lincoln","Mazda","Mercedes-Benz","Nissan","Ram","Subaru","Tesla","Toyota","Volkswagen","Volvo","Other"];

const STEP_INFO = [
  { title: "Step 1 — Vehicle Info", desc: "Enter your 17-digit VIN and click Decode to auto-fill year, make, model, trim, engine, transmission, drivetrain, and body style from the official NHTSA database. Review and correct as needed, then add mileage, color, and seller name." },
  { title: "Step 2 — Condition Report", desc: "Select the overall condition grade (1–5) and write an honest, specific description covering mechanical condition, interior, paint/body, tires, and known issues. The more detail you provide, the higher bids you attract. Use Damage Notes to disclose anything that could come up in arbitration." },
  { title: "Step 3 — AI Pricing", desc: "Click Run AI Pricing for an instant wholesale estimate based on your vehicle's year, make, mileage, and condition grade. AI generates a suggested floor price (typically 88% of estimated value) and writes a professional lot description. You can override the floor price manually." },
  { title: "Step 4 — Review & Submit", desc: "Confirm all vehicle details, condition grade, estimated value, and floor price before submitting. Once submitted, your vehicle enters the admin approval queue — approved vehicles are assigned a lot number and go live on the run list immediately." },
];

export default function VehicleIntake() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ vin: "", year: "", make: "", model: "", trim: "", mileage: "", color: "", body_style: "", engine: "", transmission: "", drivetrain: "", fuel_type: "Gasoline", condition_grade: "3", condition_report: "", damage_notes: "", floor_price: "", title_status: "Clean", seller_name: "" });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [vinLoading, setVinLoading] = useState(false);

  // Auto-populate from VIN Scanner URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vinParam = params.get('vin');
    if (vinParam) {
      setForm(f => ({
        ...f,
        vin: params.get('vin') || f.vin,
        year: params.get('year') || f.year,
        make: params.get('make') || f.make,
        model: params.get('model') || f.model,
        trim: params.get('trim') || f.trim,
        body_style: params.get('body') || f.body_style,
        engine: params.get('engine') ? decodeURIComponent(params.get('engine')) : f.engine,
        fuel_type: params.get('fuel') || f.fuel_type,
        drivetrain: params.get('drive') || f.drivetrain,
        transmission: params.get('trans') || f.transmission,
      }));
    }
  }, []);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const decodeVIN = async () => {
    if (form.vin.length < 17) return;
    setVinLoading(true);
    try {
      const r = (await (await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${form.vin}?format=json`)).json()).Results[0];
      setForm(f => ({ ...f, year: r.ModelYear || f.year, make: r.Make || f.make, model: r.Model || f.model, trim: r.Trim || f.trim, engine: r.DisplacementL ? `${parseFloat(r.DisplacementL).toFixed(1)}L ${r.EngineCylinders}cyl` : f.engine, transmission: r.TransmissionStyle?.includes("Manual") ? "Manual" : "Automatic", fuel_type: r.FuelTypePrimary?.includes("Electric") ? "Electric" : r.FuelTypePrimary?.includes("Diesel") ? "Diesel" : "Gasoline", body_style: r.BodyClass || f.body_style, drivetrain: r.DriveType?.includes("4") ? "4WD" : r.DriveType?.includes("AWD") ? "AWD" : r.DriveType?.includes("Front") ? "FWD" : r.DriveType?.includes("Rear") ? "RWD" : f.drivetrain }));
    } catch(e) {}
    setVinLoading(false);
  };

  const runAI = async () => {
    setAiLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    const grades = { "5": 1.05, "4": 0.95, "3": 0.82, "2": 0.65, "1": 0.45 };
    const gradeLabel = { "5": "Excellent", "4": "Good", "3": "Fair", "2": "Below Average", "1": "Poor" };
    const base = { Toyota: 32000, Ford: 35000, Chevrolet: 34000, Honda: 30000, BMW: 52000, "Mercedes-Benz": 58000, Ram: 42000, GMC: 44000 }[form.make] || 30000;
    const age = 2026 - (parseInt(form.year) || 2020);
    const mi = parseInt(form.mileage) || 50000;
    const dep = base * Math.pow(0.85, age) * (1 - (mi / 200000) * 0.3);
    const est = Math.round(dep * (grades[form.condition_grade] || 0.82) / 100) * 100;
    const floor = Math.round(est * 0.88 / 100) * 100;
    const desc = `${form.year} ${form.make} ${form.model}${form.trim ? " " + form.trim : ""} in ${gradeLabel[form.condition_grade] || "Fair"} condition with ${mi.toLocaleString()} miles. ${form.transmission || "Automatic"} transmission, ${form.drivetrain || "RWD"}, ${form.fuel_type || "Gasoline"}. ${form.damage_notes ? "Noted: " + form.damage_notes + "." : "No major damage reported."} Ready for wholesale.`;
    setAiResult({ estimated_value: est, floor_price: floor, ai_description: desc });
    setAiLoading(false);
  };

  const handleSubmit = async () => {
    await Vehicle.create({ ...form, year: parseInt(form.year), mileage: parseInt(form.mileage), floor_price: parseFloat(form.floor_price || aiResult?.floor_price || 0), estimated_value: aiResult?.estimated_value || 0, ai_description: aiResult?.ai_description || "", status: "Pending" });
    setSubmitted(true);
  };

  const inputStyle = { width: "100%", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "10px 12px", color: "white", fontSize: "14px", boxSizing: "border-box" };

  const inp = (label, key, type = "text", opts = {}) => (
    <div>
      <label style={{ display: "block", fontSize: "12px", color: "#6b7280", fontWeight: "600", marginBottom: "6px" }}>{label}</label>
      {opts.options ? (
        <select value={form[key]} onChange={e => set(key, e.target.value)} style={inputStyle}>
          {opts.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : opts.textarea ? (
        <textarea value={form[key]} onChange={e => set(key, e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
      ) : (
        <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} style={inputStyle} />
      )}
    </div>
  );

  if (submitted) return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "480px", padding: "40px" }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>✅</div>
        <h2 style={{ fontWeight: "900", fontSize: "28px", marginBottom: "12px" }}>Vehicle Submitted!</h2>
        <p style={{ color: "#6b7280", marginBottom: "28px", lineHeight: "1.7" }}>Your vehicle is pending admin review. Once approved, it'll be assigned a lot number and appear on the run list immediately.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link to="/RunList" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", fontWeight: "700" }}>View Run List</Link>
          <button onClick={() => { setSubmitted(false); setStep(1); setForm({ vin: "", year: "", make: "", model: "", trim: "", mileage: "", color: "", body_style: "", engine: "", transmission: "", drivetrain: "", fuel_type: "Gasoline", condition_grade: "3", condition_report: "", damage_notes: "", floor_price: "", title_status: "Clean", seller_name: "" }); setAiResult(null); }} style={{ background: "rgba(255,255,255,0.04)", color: "#888", padding: "12px 24px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", fontWeight: "700" }}>
            List Another
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />

      <div style={{ background: "rgba(16,185,129,0.03)", borderBottom: "1px solid rgba(16,185,129,0.1)", padding: "40px 32px 32px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "30px", fontWeight: "900", margin: "0 0 10px" }}>List a Vehicle for Auction</h1>
          <p style={{ color: "#6b7280", margin: "0 0 10px", fontSize: "15px", lineHeight: "1.65" }}>
            Get your vehicle on the run list in under 5 minutes. VIN decode auto-fills specs from NHTSA, AI generates your floor price and lot description, and your listing goes straight to the admin approval queue.
          </p>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", fontSize: "12px", color: "#4b5563" }}>
            <span>🔍 VIN auto-decodes from NHTSA</span>
            <span>🤖 AI generates floor price & lot description</span>
            <span>📋 Condition report builds buyer confidence</span>
            <span>⏱ Approved listings go live immediately</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "36px 32px 60px" }}>
        {/* STEP TABS */}
        <div style={{ display: "flex", marginBottom: "28px", background: "rgba(16,185,129,0.04)", borderRadius: "4px", padding: "4px", border: "1px solid rgba(16,185,129,0.1)" }}>
          {["1. Vehicle Info", "2. Condition", "3. AI Pricing", "4. Review"].map((s, i) => (
            <button key={s} onClick={() => setStep(i + 1)} style={{ flex: 1, padding: "10px 6px", borderRadius: "4px", border: "none", cursor: "pointer", fontWeight: "700", fontSize: "13px", background: step === i + 1 ? "rgba(16,185,129,0.15)" : "transparent", color: step === i + 1 ? "#10b981" : "#6b7280" }}>
              {s}
            </button>
          ))}
        </div>

        {/* STEP GUIDANCE */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "4px", padding: "14px 18px", marginBottom: "24px", fontSize: "13px", color: "#6b7280", lineHeight: "1.65" }}>
          <strong style={{ color: "#10b981" }}>{STEP_INFO[step - 1].title}:</strong> {STEP_INFO[step - 1].desc}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "20px" }}>
              <div style={{ fontWeight: "700", marginBottom: "12px", color: "#10b981", fontSize: "14px" }}>🔍 VIN Decoder — Auto-Fill Vehicle Specs</div>
              <div style={{ display: "flex", gap: "10px" }}>
                <input placeholder="Enter 17-digit VIN" value={form.vin} onChange={e => set("vin", e.target.value.toUpperCase())}
                  style={{ flex: 1, background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "11px 14px", color: "white", fontSize: "15px", fontFamily: "monospace", letterSpacing: "1px" }} />
                <button onClick={decodeVIN} disabled={vinLoading || form.vin.length < 17}
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "4px", padding: "0 20px", fontWeight: "800", fontSize: "14px", cursor: "pointer", opacity: form.vin.length < 17 ? 0.5 : 1 }}>
                  {vinLoading ? "Decoding..." : "Decode VIN"}
                </button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
              {inp("Year", "year", "number")}
              {inp("Make", "make", "text", { options: MAKES })}
              {inp("Model", "model")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {inp("Trim", "trim")}
              {inp("Mileage", "mileage", "number")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
              {inp("Color", "color")}
              {inp("Body Style", "body_style")}
              {inp("Engine", "engine")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
              {inp("Transmission", "transmission", "text", { options: ["Automatic", "Manual", "CVT"] })}
              {inp("Drivetrain", "drivetrain", "text", { options: ["FWD", "RWD", "AWD", "4WD"] })}
              {inp("Fuel Type", "fuel_type", "text", { options: ["Gasoline", "Diesel", "Hybrid", "Electric"] })}
            </div>
            {inp("Your Name / Dealership", "seller_name")}
            <button onClick={() => setStep(2)} style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "4px", padding: "14px", fontWeight: "800", fontSize: "16px", cursor: "pointer" }}>
              Next: Condition Report →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#6b7280", fontWeight: "600", marginBottom: "10px" }}>Overall Condition Grade</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {["5","4","3","2","1"].map(g => {
                  const colors = { "5": "#10b981", "4": "#67eeff", "3": "#f59e0b", "2": "#f97316", "1": "#ef4444" };
                  const labels = { "5": "Excellent", "4": "Good", "3": "Fair", "2": "Below Avg", "1": "Poor" };
                  return (
                    <button key={g} onClick={() => set("condition_grade", g)} style={{ flex: 1, padding: "12px 6px", borderRadius: "4px", border: `2px solid ${form.condition_grade === g ? colors[g] : "rgba(255,255,255,0.07)"}`, background: form.condition_grade === g ? `${colors[g]}22` : "transparent", color: form.condition_grade === g ? colors[g] : "#6b7280", fontWeight: "800", fontSize: "13px", cursor: "pointer" }}>
                      {g}<br /><span style={{ fontSize: "10px", fontWeight: "600" }}>{labels[g]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {inp("Condition Report", "condition_report", "text", { textarea: true })}
            {inp("Damage Notes (disclose anything a buyer might find)", "damage_notes", "text", { textarea: true })}
            {inp("Title Status", "title_status", "text", { options: ["Clean", "Salvage", "Rebuilt", "Lien", "Missing"] })}
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, background: "rgba(16,185,129,0.06)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "14px", fontWeight: "700", cursor: "pointer" }}>← Back</button>
              <button onClick={() => setStep(3)} style={{ flex: 2, background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "4px", padding: "14px", fontWeight: "800", cursor: "pointer", fontSize: "15px" }}>Next: AI Pricing →</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <button onClick={runAI} disabled={aiLoading} style={{ background: aiResult ? "rgba(16,185,129,0.08)" : "linear-gradient(135deg, #10b981, #059669)", color: aiResult ? "#10b981" : "white", border: aiResult ? "1px solid rgba(16,185,129,0.25)" : "none", borderRadius: "4px", padding: "16px", fontWeight: "800", fontSize: "16px", cursor: "pointer", opacity: aiLoading ? 0.7 : 1 }}>
              {aiLoading ? "⏳ Running AI Analysis..." : aiResult ? "🔄 Re-Run AI Pricing" : "🤖 Run AI Pricing Engine"}
            </button>
            {aiResult && (
              <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "24px" }}>
                <div style={{ fontWeight: "800", color: "#10b981", marginBottom: "18px", fontSize: "15px" }}>🤖 AI Pricing Results</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
                  <div style={{ background: "rgba(16,185,129,0.08)", borderRadius: "4px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px" }}>AI Estimated Value</div>
                    <div style={{ fontSize: "28px", fontWeight: "900", color: "#10b981" }}>${aiResult.estimated_value.toLocaleString()}</div>
                  </div>
                  <div style={{ background: "rgba(16,185,129,0.05)", borderRadius: "4px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px" }}>Suggested Floor Price</div>
                    <div style={{ fontSize: "28px", fontWeight: "900", color: "#67eeff" }}>${aiResult.floor_price.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: "4px", padding: "14px", fontSize: "13px", color: "#6b7280", lineHeight: "1.6", marginBottom: "16px" }}>
                  🤖 <em>{aiResult.ai_description}</em>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#6b7280", fontWeight: "600", marginBottom: "6px" }}>Override Floor Price (optional)</label>
                  <input type="number" value={form.floor_price} onChange={e => set("floor_price", e.target.value)} placeholder={`AI suggested: $${aiResult.floor_price.toLocaleString()}`}
                    style={{ width: "100%", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "10px 12px", color: "white", fontSize: "14px", boxSizing: "border-box" }} />
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, background: "rgba(16,185,129,0.06)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "14px", fontWeight: "700", cursor: "pointer" }}>← Back</button>
              <button onClick={() => setStep(4)} disabled={!aiResult} style={{ flex: 2, background: aiResult ? "linear-gradient(135deg, #10b981, #059669)" : "rgba(255,255,255,0.05)", color: aiResult ? "white" : "#4b5563", border: "none", borderRadius: "4px", padding: "14px", fontWeight: "800", cursor: aiResult ? "pointer" : "not-allowed", fontSize: "15px" }}>
                {aiResult ? "Next: Review & Submit →" : "Run AI Pricing First"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "4px", padding: "24px" }}>
              <h3 style={{ margin: "0 0 16px", fontWeight: "800", fontSize: "15px", color: "#10b981" }}>Vehicle Listing Summary</h3>
              {[
                ["Vehicle", `${form.year} ${form.make} ${form.model} ${form.trim}`],
                ["VIN", form.vin],
                ["Mileage", form.mileage ? parseInt(form.mileage).toLocaleString() + " mi" : "—"],
                ["Engine", form.engine],
                ["Transmission", form.transmission],
                ["Drivetrain", form.drivetrain],
                ["Fuel Type", form.fuel_type],
                ["Color", form.color],
                ["Title Status", form.title_status],
                ["Condition Grade", form.condition_grade + " — " + { "5": "Excellent", "4": "Good", "3": "Fair", "2": "Below Average", "1": "Poor" }[form.condition_grade]],
                ["AI Est. Value", aiResult ? "$" + aiResult.estimated_value.toLocaleString() : "—"],
                ["Floor Price", "$" + (form.floor_price || aiResult?.floor_price || 0).toLocaleString()],
                ["Seller", form.seller_name],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(16,185,129,0.06)", fontSize: "14px" }}>
                  <span style={{ color: "#6b7280" }}>{k}</span>
                  <span style={{ fontWeight: "600", color: "#cffafe" }}>{v || "—"}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setStep(3)} style={{ flex: 1, background: "rgba(16,185,129,0.06)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "14px", fontWeight: "700", cursor: "pointer" }}>← Back</button>
              <button onClick={handleSubmit} style={{ flex: 2, background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "4px", padding: "14px", fontWeight: "900", fontSize: "16px", cursor: "pointer" }}>
                ✅ Submit for Approval
              </button>
            </div>
          </div>
        )}
      </div>

      <RingmanAI page="VehicleIntake" />
    </div>
  );
}
