import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "For Dealers", href: "/ForIndependentDealers" },
  { label: "The Inspection", href: "/TheInspection" },
  { label: "Integrity", href: "/IntegritySystem" },
  { label: "Pricing", href: "/Pricing" },
  { label: "Why Ringman", href: "/WhyRingman" },
];

const TRANSPORT_TYPES = [
  {
    icon: "🚗",
    name: "Open Transport",
    desc: "Standard carrier — most common, most affordable. Your vehicle rides on an open multi-car hauler.",
    best: "Standard running vehicles, everyday buys",
    time: "3–7 days typical",
    price: "Market rate",
    color: "#06b6d4",
  },
  {
    icon: "🏎️",
    name: "Enclosed Transport",
    desc: "Fully enclosed trailer — protected from weather, road debris, and curious eyes. For vehicles that deserve it.",
    best: "High-value, exotic, low-mileage, collector vehicles",
    time: "5–10 days typical",
    price: "Premium rate",
    color: "#8b5cf6",
  },
  {
    icon: "🚛",
    name: "Flatbed / Rollback",
    desc: "For non-running vehicles. Push auction or Dead Row buys that need a flatbed — auto-assigned at checkout.",
    best: "Push auction + Dead Row vehicles",
    time: "2–5 days typical",
    price: "Flat rate by region",
    color: "#f59e0b",
  },
  {
    icon: "🏗️",
    name: "Heavy / Specialty",
    desc: "Lifted trucks, oversized vehicles, fleet hauling, multi-vehicle moves. Quoted individually.",
    best: "Lifted trucks, fleets, oversized",
    time: "Quoted per job",
    price: "Custom quote",
    color: "#10b981",
  },
];

const HOW_IT_WORKS = [
  { step: "01", icon: "🔨", title: "Vehicle Sells", desc: "Flash, Push, Dead Row, or Open Auction closes. You're the winning buyer." },
  { step: "02", icon: "📦", title: "Book at Checkout", desc: "One tap at the invoice screen. Pick transport type, confirm pickup address. Done." },
  { step: "03", icon: "📡", title: "Carrier Assigned", desc: "Montway matches your shipment to the best available carrier in their nationwide network." },
  { step: "04", icon: "📍", title: "Live Tracking", desc: "Track your vehicle in real time through the Ringman platform — no need to call anyone." },
  { step: "05", icon: "✅", title: "Delivered", desc: "Vehicle arrives, you inspect and sign. Any transport damage is covered by carrier insurance." },
];

const REGIONS = [
  { from: "Oklahoma / Kansas", to: "Texas", time: "1–2 days", est: "$250–$450" },
  { from: "Texas", to: "Colorado", time: "2–3 days", est: "$350–$550" },
  { from: "Midwest", to: "Southeast", time: "3–5 days", est: "$450–$750" },
  { from: "Midwest", to: "Northeast", time: "4–6 days", est: "$600–$950" },
  { from: "Central US", to: "West Coast", time: "5–8 days", est: "$750–$1,200" },
  { from: "Any state", to: "Any state", time: "Varies", est: "Instant quote" },
];

export default function RingmanTransport() {
  useEffect(() => {
    document.title = "Ringman Transport — Vehicle Shipping Powered by Montway";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Book auto transport at auction checkout. Open, enclosed, flatbed, and specialty. Powered by Montway Auto Transport — 1M+ deliveries, 4.7 stars. One tap at checkout.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "Ringman Transport — Vehicle Shipping Powered by Montway", "property");
    setMeta("og:description", "Book auto transport at auction checkout. Open, enclosed, flatbed, and specialty. Powered by Montway Auto Transport — 1M+ deliveries, 4.7 stars. One tap at checkout.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Ringman Transport — Vehicle Shipping Powered by Montway");
    setMeta("twitter:description", "Book auto transport at auction checkout. Open, enclosed, flatbed, and specialty. Powered by Montway Auto Transport — 1M+ deliveries, 4.7 stars. One tap at checkout.");
  }, []);

  const [quoteForm, setQuoteForm] = useState({ from: "", to: "", type: "open", vehicle: "" });
  const [showQuote, setShowQuote] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <a href="/Register" style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Get Started</a>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "90px 24px 70px", background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 70%)" }}>
        <div style={{ display: "inline-flex", gap: 8, alignItems: "center", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
          <span style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#f59e0b" }}>Powered by Montway</span>
        </div>
        <h1 style={{ fontSize: "clamp(34px,6vw,70px)", fontWeight: 900, fontFamily: "'Georgia',serif", lineHeight: 1.05, margin: "0 0 24px" }}>
          Ringman Transport.<br />
          <span style={{ background: "linear-gradient(135deg,#f59e0b,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Book it without leaving.</span>
        </h1>
        <p style={{ fontSize: "clamp(15px,2.5vw,19px)", color: "#9ca3af", maxWidth: 620, margin: "0 auto 48px", lineHeight: 1.9, fontFamily: "'Georgia',serif", fontStyle: "italic" }}>
          You won a vehicle three states away. One tap at checkout books transport through the nation's most trusted carrier network. No phone calls. No third-party sites. No chasing down quotes.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/Register" style={{ padding: "16px 36px", borderRadius: 8, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "white", fontWeight: 800, fontSize: 16, textDecoration: "none" }}>Get Started →</a>
          <button onClick={() => setShowQuote(true)} style={{ padding: "16px 36px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db", fontWeight: 700, fontSize: 16, background: "transparent", cursor: "pointer" }}>Get a Quick Quote</button>
        </div>
      </div>

      {/* MONTWAY BADGE */}
      <div style={{ background: "rgba(245,158,11,0.04)", borderTop: "1px solid rgba(245,158,11,0.1)", borderBottom: "1px solid rgba(245,158,11,0.1)", padding: "36px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, alignItems: "center" }}>
          <div style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.8 }}>
            Ringman Transport is powered by <strong style={{ color: "#f59e0b" }}>Montway Auto Transport</strong> — the #1 rated auto transport broker in the United States with over 1 million vehicles delivered and a 4.7-star rating across 25,000+ reviews.
          </div>
          <div style={{ fontSize: 32, textAlign: "center" }}>🤝</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["1M+ vehicles delivered", "25,000+ verified reviews", "4.7★ average rating", "Nationwide carrier network", "Carrier insurance included"].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f59e0b" }}>✓</span>
                <span style={{ fontSize: 13, color: "#d1d5db" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRANSPORT TYPES */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>TRANSPORT OPTIONS</div>
          <h2 style={{ fontSize: "clamp(22px,3vw,38px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Every vehicle. Every situation. Covered.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
          {TRANSPORT_TYPES.map((t, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderTop: `3px solid ${t.color}`, borderRadius: "0 0 12px 12px", padding: 28 }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{t.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 900, color: t.color, marginBottom: 8 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7, marginBottom: 16 }}>{t.desc}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 12, color: "#6b7280" }}>✦ Best for: <span style={{ color: "#d1d5db" }}>{t.best}</span></div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>⏱ Transit: <span style={{ color: "#d1d5db" }}>{t.time}</span></div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>💰 Rate: <span style={{ color: t.color, fontWeight: 700 }}>{t.price}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, textAlign: "center", padding: "14px", background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 8 }}>
          <span style={{ fontSize: 13, color: "#fca5a5" }}>💀 Dead Row vehicles automatically trigger flatbed transport at checkout — no manual selection needed.</span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#f59e0b", marginBottom: 12 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,38px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>One tap at checkout. We handle the rest.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 }}>
            {HOW_IT_WORKS.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "24px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 10, position: "relative" }}>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div style={{ position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#374151", zIndex: 1 }}>→</div>
                )}
                <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 900, letterSpacing: 2, marginBottom: 10 }}>{s.step}</div>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RATE ESTIMATES */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>RATE ESTIMATES</div>
          <h2 style={{ fontSize: "clamp(20px,3vw,34px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>Ballpark rates for common routes.</h2>
          <p style={{ color: "#6b7280", fontSize: 13 }}>Open transport, standard vehicle. Final rates vary by timing, carrier availability, and route demand.</p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["From", "To", "Est. Transit", "Est. Cost"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", color: "#6b7280", fontWeight: 700, textAlign: "left", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REGIONS.map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                  <td style={{ padding: "14px 16px", color: "#d1d5db" }}>{r.from}</td>
                  <td style={{ padding: "14px 16px", color: "#d1d5db" }}>{r.to}</td>
                  <td style={{ padding: "14px 16px", color: "#06b6d4" }}>{r.time}</td>
                  <td style={{ padding: "14px 16px", color: "#10b981", fontWeight: 700 }}>{r.est}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRIORITY ADD-ON */}
      <div style={{ background: "rgba(139,92,246,0.04)", borderTop: "1px solid rgba(139,92,246,0.1)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8b5cf6", marginBottom: 16 }}>ADD-ON</div>
          <h2 style={{ fontSize: "clamp(20px,3vw,34px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>Need it faster? Priority Dispatch.</h2>
          <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>For $29.99 added to your shipment, your vehicle jumps to the front of the carrier matching queue. Carriers are notified immediately. Average pickup time drops from 3–5 days to 24–48 hours.</p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 10, padding: "16px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#a78bfa" }}>$29.99</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Priority Dispatch add-on</div>
            </div>
            <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 10, padding: "16px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#10b981" }}>Free</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>For Business + Platinum members</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.08),rgba(6,182,212,0.06))", borderTop: "1px solid rgba(245,158,11,0.12)", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>Win it here. Move it here. Simple.</h2>
        <p style={{ color: "#6b7280", fontSize: 16, marginBottom: 40 }}>Transport is built into every transaction. You never have to leave the platform.</p>
        <a href="/Register" style={{ padding: "18px 48px", borderRadius: 8, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "white", fontWeight: 800, fontSize: 18, textDecoration: "none" }}>JOIN THE RINGMAN'S AI →</a>
      </div>

      {/* QUICK QUOTE MODAL */}
      {showQuote && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#0f0f1a", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 16, padding: 40, width: "100%", maxWidth: 460 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#f59e0b", marginBottom: 12 }}>QUICK QUOTE</div>
            <h3 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 24px", fontFamily: "'Georgia',serif" }}>Where are you moving it?</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[{ key: "from", label: "Pickup Location", ph: "City, State (e.g. Tulsa, OK)" }, { key: "to", label: "Delivery Location", ph: "City, State (e.g. Dallas, TX)" }, { key: "vehicle", label: "Vehicle", ph: "2020 Ford F-150 XLT" }].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input value={quoteForm[f.key]} onChange={e => setQuoteForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.ph}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "white", padding: "11px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Transport Type</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["open", "enclosed", "flatbed"].map(t => (
                    <button key={t} onClick={() => setQuoteForm(p => ({ ...p, type: t }))}
                      style={{ flex: 1, padding: "10px 8px", borderRadius: 6, border: `1px solid ${quoteForm.type === t ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.06)"}`, background: quoteForm.type === t ? "rgba(245,158,11,0.1)" : "transparent", color: quoteForm.type === t ? "#f59e0b" : "#6b7280", cursor: "pointer", fontSize: 12, fontWeight: 700, textTransform: "capitalize" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
              <button onClick={() => setShowQuote(false)} style={{ padding: "12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", cursor: "pointer", fontSize: 14 }}>Cancel</button>
              <button onClick={() => setShowQuote(false)} style={{ padding: "12px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "white", cursor: "pointer", fontSize: 14, fontWeight: 800 }}>Get Quote →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
