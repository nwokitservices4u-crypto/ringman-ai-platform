import { useState } from "react";
import RingmanAI from "../components/RingmanAI.jsx";
import { DealerProfile } from "@/api/entities";
import Nav from "../components/Nav.jsx";
import { Link } from "react-router-dom";

const LOGO = "https://media.base44.com/images/public/69cecf03f993d438c489b18c/9e6040534_generated_image.png";

const BENEFITS = [
  { icon: "⚡", title: "20-Minute Flash Auctions", body: "Buy or sell in 20 minutes flat. Vehicles go live, close fast, and your deal is done before lunch. Fast format creates real bidding urgency that drives stronger sale prices." },
  { icon: "🤖", title: "AI Pricing on Every Vehicle", body: "Instant wholesale value estimates per VIN based on year, make, mileage, condition, and market trends. Know exactly what a car is worth before you bid — or before you list it." },
  { icon: "📡", title: "Bid Live From Anywhere", body: "True simulcast — compete against in-lane dealers from your office, your lot, or your phone. Real-time bid feed, countdown timers, proxy bidding, full lot history." },
  { icon: "🤝", title: "IF-SALE: More Deals Close", body: "When a vehicle falls short of floor, our IF-SALE engine opens an automatic negotiation channel. No staff needed. Instead of unsold lots, deals get made — more buying opportunities for buyers, more revenue for sellers." },
  { icon: "📋", title: "Full Condition Reports", body: "Every vehicle includes a 1–5 grade, written condition description, damage disclosure, multi-angle photos, and optional Carfax link. You know exactly what you're bidding on before the auction opens." },
  { icon: "🚛", title: "Transport Coordination", body: "Arrange transport for purchased vehicles directly through the platform. Track pickup, transit, and delivery status in real time — no calling carriers separately." },
  { icon: "📊", title: "Dealer Performance Dashboard", body: "Track your buy/sell history, ratings, payment status, and active transactions. See your average purchase price, total vehicles moved, and where you stand in the marketplace." },
  { icon: "🔒", title: "Licensed Dealers Only", body: "Professional dealer-to-dealer marketplace. No retail buyers. Every participant holds a valid state dealer license — honest condition reports, real arbitration stakes, and true wholesale pricing." },
];

export default function Dealers() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ business_name: "", contact_name: "", email: "", phone: "", dealer_license: "", state: "", city: "", address: "", role: "Both", payment_method: "ACH", floor_plan_provider: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    await DealerProfile.create({ ...form, status: "Pending", total_bought: 0, total_sold: 0 });
    setSubmitted(true);
  };

  const inp = (label, key, opts = {}) => (
    <div>
      <label style={{ display: "block", fontSize: "12px", color: "#6b7280", fontWeight: "600", marginBottom: "6px" }}>{label}</label>
      {opts.options ? (
        <select value={form[key]} onChange={e => set(key, e.target.value)} style={{ width: "100%", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "10px 12px", color: "white", fontSize: "14px" }}>
          {opts.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={opts.type || "text"} value={form[key]} onChange={e => set(key, e.target.value)} placeholder={opts.placeholder || ""} style={{ width: "100%", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "10px 12px", color: "white", fontSize: "14px", boxSizing: "border-box" }} />
      )}
    </div>
  );

  const btnPrimary = { background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "4px", padding: "14px", fontWeight: "800", fontSize: "16px", cursor: "pointer", width: "100%" };
  const btnSecondary = { background: "rgba(16,185,129,0.06)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "14px", fontWeight: "700", cursor: "pointer", width: "100%" };

  if (submitted) return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "500px", padding: "40px" }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>✅</div>
        <h2 style={{ fontWeight: "900", fontSize: "28px", marginBottom: "12px" }}>Application Submitted!</h2>
        <p style={{ color: "#6b7280", marginBottom: "12px", lineHeight: "1.7" }}>Your dealer application is under review. We verify your license and contact info — approval typically takes 1–2 business days.</p>
        <p style={{ color: "#4b5563", marginBottom: "28px", lineHeight: "1.65", fontSize: "14px" }}>Once approved, you'll receive an email with login credentials and access to the run list, live bidding, vehicle listing, IF-SALE, and analytics — immediately.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link to="/RunList" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", fontWeight: "700" }}>Browse Run List</Link>
          <Link to="/" style={{ background: "rgba(255,255,255,0.04)", color: "#888", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", fontWeight: "700", border: "1px solid rgba(255,255,255,0.08)" }}>Home</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />

      {/* HEADER */}
      <div style={{ background: "rgba(16,185,129,0.03)", borderBottom: "1px solid rgba(16,185,129,0.1)", padding: "56px 32px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <img src={LOGO} alt="" style={{ width: 52, height: 52, borderRadius: "4px", objectFit: "cover", marginBottom: "20px", border: "1px solid rgba(16,185,129,0.3)" }} />
          <h1 style={{ fontSize: "34px", fontWeight: "900", margin: "0 0 12px" }}>Dealer Registration</h1>
          <p style={{ color: "#6b7280", fontSize: "16px", margin: "0 0 8px", lineHeight: "1.65" }}>Join the fastest-growing dealer-to-dealer wholesale auto auction platform. No upfront fees. No subscription. Just a professional marketplace built for licensed dealers who want to buy and sell smarter.</p>
          <p style={{ color: "#4b5563", fontSize: "13px", margin: 0 }}>Licensed dealers only &nbsp;·&nbsp; Approval in 1–2 business days &nbsp;·&nbsp; Buy, sell, or both</p>
        </div>
      </div>

      {/* BENEFITS */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "56px 32px 44px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 8px", textAlign: "center" }}>What You Get as a Registered Dealer</h2>
        <p style={{ color: "#4b5563", textAlign: "center", fontSize: "14px", marginBottom: "36px" }}>Full platform access — no tiered features, no locked tools.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
          {BENEFITS.map(({ icon, title, body }) => (
            <div key={title} style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "4px", padding: "22px" }}>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>{icon}</div>
              <div style={{ fontWeight: "800", fontSize: "15px", marginBottom: "8px" }}>{title}</div>
              <div style={{ color: "#6b7280", fontSize: "13px", lineHeight: "1.7" }}>{body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: "660px", margin: "0 auto", padding: "0 32px 70px" }}>
        <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "20px 24px", marginBottom: "28px" }}>
          <div style={{ fontWeight: "800", fontSize: "15px", color: "#10b981", marginBottom: "8px" }}>Before You Register</div>
          <ul style={{ color: "#6b7280", fontSize: "13px", lineHeight: "1.8", margin: 0, paddingLeft: "18px" }}>
            <li>Valid state dealer license required — verified during review.</li>
            <li>Platform charges a buyer premium (% added to hammer price) and flat seller fee per vehicle sold. No hidden fees.</li>
            <li>Approved accounts get full platform access immediately: run list, live bidding, vehicle listing, IF-SALE, post-sale workflow, and analytics.</li>
          </ul>
        </div>

        {/* STEP TABS */}
        <div style={{ display: "flex", marginBottom: "28px", background: "rgba(16,185,129,0.04)", borderRadius: "4px", padding: "4px", border: "1px solid rgba(16,185,129,0.1)" }}>
          {["1. Business Info", "2. License & Payment", "3. Review & Submit"].map((s, i) => (
            <button key={s} onClick={() => setStep(i + 1)} style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "none", cursor: "pointer", fontWeight: "700", fontSize: "13px", background: step === i + 1 ? "rgba(16,185,129,0.15)" : "transparent", color: step === i + 1 ? "#10b981" : "#6b7280" }}>
              {s}
            </button>
          ))}
        </div>

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.6" }}>Enter your dealership's legal business information. This appears on your dealer profile and all invoices.</div>
            {inp("Dealership / Business Name", "business_name")}
            {inp("Primary Contact Name", "contact_name")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {inp("Email Address", "email", { type: "email" })}
              {inp("Phone Number", "phone", { type: "tel" })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
              {inp("City", "city")}
              {inp("State", "state")}
              {inp("I want to...", "role", { options: ["Buyer", "Seller", "Both"] })}
            </div>
            {inp("Full Business Address", "address")}
            <button onClick={() => setStep(2)} style={btnPrimary}>Next: License & Payment →</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.6" }}>Your dealer license number is required for verification. Payment method determines how you pay for purchased vehicles post-auction.</div>
            {inp("State Dealer License Number", "dealer_license")}
            {inp("Preferred Payment Method", "payment_method", { options: ["ACH (Bank Transfer)", "Debit Card", "Floor Plan Financing", "Check"] })}
            {inp("Floor Plan Provider (if applicable)", "floor_plan_provider", { placeholder: "e.g. NextGear Capital, AFC, Dealer Line" })}
            {inp("Additional Notes (optional)", "notes", { placeholder: "Specialty makes, buying preferences, anything else..." })}
            <div style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "4px", padding: "14px 16px", fontSize: "13px", color: "#6b7280", lineHeight: "1.7" }}>
              ⚠️ By submitting, you confirm you hold a valid state dealer license and agree to the platform's terms — buyer premiums, seller fees, and arbitration policies. Misrepresentation results in permanent termination.
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setStep(1)} style={{ ...btnSecondary, flex: 1 }}>← Back</button>
              <button onClick={() => setStep(3)} style={{ ...btnPrimary, flex: 2 }}>Review Application →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.6" }}>Review everything before submitting. Once submitted, your application enters review — we'll email you within 1–2 business days.</div>
            <div style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "4px", padding: "22px" }}>
              <h3 style={{ margin: "0 0 16px", fontWeight: "800", fontSize: "15px", color: "#10b981" }}>Registration Summary</h3>
              {[["Business", form.business_name], ["Contact", form.contact_name], ["Email", form.email], ["Phone", form.phone], ["City / State", `${form.city}, ${form.state}`], ["Address", form.address], ["Role", form.role], ["Dealer License", form.dealer_license], ["Payment", form.payment_method], ["Floor Plan", form.floor_plan_provider || "N/A"], ["Notes", form.notes || "None"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(16,185,129,0.06)", fontSize: "14px" }}>
                  <span style={{ color: "#6b7280" }}>{k}</span>
                  <span style={{ fontWeight: "600", color: "#cffafe", maxWidth: "60%", textAlign: "right" }}>{v || "—"}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setStep(2)} style={{ ...btnSecondary, flex: 1 }}>← Edit</button>
              <button onClick={handleSubmit} style={{ flex: 2, background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "4px", padding: "14px", fontWeight: "900", fontSize: "16px", cursor: "pointer" }}>✅ Submit Application</button>
            </div>
          </div>
        )}
      </div>

      <RingmanAI page="Dealers" />
    </div>
  );
}
