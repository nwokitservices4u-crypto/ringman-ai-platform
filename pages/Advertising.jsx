import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Auctions", href: "/RunList" },
  { label: "Classifieds", href: "/Classifieds" },
  { label: "Open Auctions", href: "/OpenAuctions" },
  { label: "News", href: "/NewsRoom" },
  { label: "Pricing", href: "/Pricing" },
  { label: "Advertise", href: "/Advertising" },
];

const AD_SIZES = [
  {
    name: "Billboard",
    size: "970×250",
    icon: "━━━━━━━━━━━━━━",
    placement: "Top of every page — maximum visibility",
    impressions: "~15,000/mo est.",
    weekly: "$149",
    monthly: "$449",
    quarterly: "$1,099",
    biannual: "$1,899",
    annual: "$3,199",
    annualSave: "Save $2,189",
    color: "#06b6d4",
    popular: false,
  },
  {
    name: "Leaderboard",
    size: "728×90",
    icon: "━━━━━━━━━",
    placement: "Header & footer — high frequency exposure",
    impressions: "~12,000/mo est.",
    weekly: "$79",
    monthly: "$249",
    quarterly: "$599",
    biannual: "$1,049",
    annual: "$1,799",
    annualSave: "Save $1,189",
    color: "#8b5cf6",
    popular: false,
  },
  {
    name: "Half Page",
    size: "300×600",
    icon: "▐▌",
    placement: "Sidebar — tall, dominant, hard to miss",
    impressions: "~10,000/mo est.",
    weekly: "$99",
    monthly: "$299",
    quarterly: "$749",
    biannual: "$1,299",
    annual: "$2,199",
    annualSave: "Save $1,389",
    color: "#f59e0b",
    popular: true,
  },
  {
    name: "Medium Rectangle",
    size: "300×250",
    icon: "▐▌",
    placement: "Sidebar & in-feed — most common, best CTR",
    impressions: "~8,000/mo est.",
    weekly: "$59",
    monthly: "$179",
    quarterly: "$429",
    biannual: "$749",
    annual: "$1,299",
    annualSave: "Save $849",
    color: "#10b981",
    popular: false,
  },
  {
    name: "Wide Skyscraper",
    size: "160×600",
    icon: "▐",
    placement: "Right sidebar — persistent scroll companion",
    impressions: "~7,000/mo est.",
    weekly: "$49",
    monthly: "$149",
    quarterly: "$359",
    biannual: "$629",
    annual: "$1,099",
    annualSave: "Save $689",
    color: "#ec4899",
    popular: false,
  },
  {
    name: "Mobile Banner",
    size: "320×50",
    icon: "━━━━━",
    placement: "Mobile only — top of screen, always visible",
    impressions: "~9,000/mo est.",
    weekly: "$39",
    monthly: "$99",
    quarterly: "$239",
    biannual: "$419",
    annual: "$699",
    annualSave: "Save $489",
    color: "#f97316",
    popular: false,
  },
];

const PLACEMENTS = [
  { page: "Home / Intro", traffic: "Highest", desc: "Every visitor lands here first" },
  { page: "Run List", traffic: "Very High", desc: "Active buyers browse daily" },
  { page: "Vehicle Detail Pages", traffic: "High", desc: "Deep intent — ready to bid" },
  { page: "Live Auction Room", traffic: "High", desc: "100% engaged audience" },
  { page: "News Room", traffic: "Medium-High", desc: "Returning daily readers" },
  { page: "Classifieds", traffic: "Medium", desc: "Broad automotive audience" },
  { page: "Dealer Profiles", traffic: "Medium", desc: "B2B audience" },
  { page: "All Pages (Run of Site)", traffic: "Maximum", desc: "Everywhere, every time" },
];

const PACKAGES = [
  {
    name: "Starter Visibility",
    color: "#06b6d4",
    price: "$299/mo",
    annual: "$2,699/yr",
    save: "Save $889",
    includes: [
      "1× Medium Rectangle (300×250)",
      "Run of Site placement",
      "Monthly impression report",
      "Link to your website or listing",
    ],
  },
  {
    name: "Dealer Spotlight",
    color: "#8b5cf6",
    price: "$599/mo",
    annual: "$5,499/yr",
    save: "Save $1,689",
    popular: true,
    includes: [
      "1× Half Page (300×600)",
      "1× Leaderboard (728×90)",
      "Run List + Vehicle Detail placement",
      "Dealer Profile badge included",
      "Monthly analytics report",
      "Featured dealer listing on homepage",
    ],
  },
  {
    name: "Ringman Partner",
    color: "#f59e0b",
    price: "$1,099/mo",
    annual: "$9,999/yr",
    save: "Save $3,189",
    includes: [
      "1× Billboard (970×250)",
      "1× Half Page (300×600)",
      "1× Mobile Banner (320×50)",
      "Run of Site — all pages",
      "Homepage featured spotlight",
      "Branded news article (1/mo)",
      "Priority ad placement",
      "Dedicated account manager",
    ],
  },
];

const DURATION_DISCOUNTS = [
  { period: "7 Days", discount: "No discount", note: "Test the waters" },
  { period: "30 Days", discount: "Standard rate", note: "Most popular" },
  { period: "90 Days", discount: "Save 17%", note: "Quarter rate" },
  { period: "6 Months", discount: "Save 25%", note: "Half-year rate" },
  { period: "12 Months", discount: "Save 33%", note: "Best rate — 2 months free" },
];

export default function Advertising() {
  useEffect(() => {
    document.title = "Advertise With Us — Automotive Media Kit | Ringman's AI";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Reach active auto buyers and dealers with targeted banner advertising. 6 ad sizes from billboard to mobile. Monthly or annual rates with up to 33% annual savings.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "Advertise With Us — Automotive Media Kit | Ringman's AI", "property");
    setMeta("og:description", "Reach active auto buyers and dealers with targeted banner advertising. 6 ad sizes from billboard to mobile. Monthly or annual rates with up to 33% annual savings.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Advertise With Us — Automotive Media Kit | Ringman's AI");
    setMeta("twitter:description", "Reach active auto buyers and dealers with targeted banner advertising. 6 ad sizes from billboard to mobile. Monthly or annual rates with up to 33% annual savings.");
  }, []);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("30 Days");
  const [formStep, setFormStep] = useState(null); // null | 'form' | 'sent'
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", message: "" });

  const handleFormSubmit = () => {
    if (!formData.name || !formData.email) return;
    setFormStep("sent");
  };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 20 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: l.href === "/Advertising" ? "#f59e0b" : "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <button onClick={() => setFormStep("form")} style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "white", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>Book Ad Space</button>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "80px 24px 60px", background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 70%)" }}>
        <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#f59e0b", marginBottom: 16 }}>ADVERTISE WITH US</div>
        <h1 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>
          Put your brand in front of<br />
          <span style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>active auto buyers.</span>
        </h1>
        <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 580, margin: "0 auto 40px", lineHeight: 1.8 }}>
          Every visitor on this platform is in the automotive industry — actively buying, selling, and researching vehicles. This isn't general display advertising. This is a captive dealer audience.
        </p>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "Avg Session Duration", value: "8+ min" },
            { label: "Audience", value: "100% Auto" },
            { label: "Returning Visitors", value: "Daily" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#f59e0b" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AD SIZE CARDS */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#f59e0b", marginBottom: 12 }}>AD SIZES & RATES</div>
          <h2 style={{ fontSize: "clamp(22px,3vw,38px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>Six formats. Every screen size covered.</h2>
          <p style={{ color: "#6b7280", fontSize: 14 }}>All rates shown are monthly. Duration discounts apply — annual saves 33%.</p>
        </div>

        {/* Duration selector */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 36, flexWrap: "wrap" }}>
          {DURATION_DISCOUNTS.map(d => (
            <button key={d.period} onClick={() => setSelectedDuration(d.period)}
              style={{ padding: "8px 16px", borderRadius: 6, border: `1px solid ${selectedDuration === d.period ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.06)"}`, background: selectedDuration === d.period ? "rgba(245,158,11,0.1)" : "transparent", color: selectedDuration === d.period ? "#f59e0b" : "#6b7280", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
              {d.period}
              {d.discount !== "No discount" && d.discount !== "Standard rate" && (
                <span style={{ marginLeft: 6, color: "#10b981", fontSize: 11 }}>{d.discount}</span>
              )}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16 }}>
          {AD_SIZES.map((ad, i) => (
            <div key={i} onClick={() => setSelectedSize(selectedSize === i ? null : i)}
              style={{ background: selectedSize === i ? `rgba(${ad.color === "#06b6d4" ? "6,182,212" : ad.color === "#8b5cf6" ? "139,92,246" : ad.color === "#f59e0b" ? "245,158,11" : ad.color === "#10b981" ? "16,185,129" : ad.color === "#ec4899" ? "236,72,153" : "249,115,22"},0.06)` : "rgba(255,255,255,0.02)", border: `1px solid ${selectedSize === i ? ad.color + "44" : "rgba(255,255,255,0.06)"}`, borderTop: `2px solid ${ad.color}`, borderRadius: "0 0 12px 12px", padding: 24, cursor: "pointer", position: "relative", transition: "all 0.2s" }}>
              {ad.popular && <div style={{ position: "absolute", top: -1, right: 16, background: ad.color, color: "white", fontSize: 10, fontWeight: 900, letterSpacing: 1, padding: "3px 10px", borderRadius: "0 0 6px 6px" }}>MOST POPULAR</div>}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 900, color: ad.color }}>{ad.name}</div>
                  <div style={{ fontSize: 12, color: "#4b5563", letterSpacing: 1, fontFamily: "monospace", marginTop: 2 }}>{ad.size} px</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#f1f5f9" }}>{ad.monthly}<span style={{ fontSize: 12, color: "#6b7280", fontWeight: 400 }}>/mo</span></div>
                  {selectedDuration === "7 Days" && <div style={{ fontSize: 13, color: ad.color }}>{ad.weekly}/wk</div>}
                  {selectedDuration === "90 Days" && <div style={{ fontSize: 13, color: "#10b981" }}>{ad.quarterly}/qtr</div>}
                  {selectedDuration === "6 Months" && <div style={{ fontSize: 13, color: "#10b981" }}>{ad.biannual}/6mo</div>}
                  {selectedDuration === "12 Months" && <div style={{ fontSize: 11, color: "#10b981" }}>{ad.annual}/yr · {ad.annualSave}</div>}
                </div>
              </div>

              {/* Visual size preview */}
              <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${ad.color}22`, borderRadius: 6, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: ad.color, opacity: 0.7, textTransform: "uppercase" }}>{ad.size} preview area</div>
                <div style={{ fontSize: 12, color: "#374151", marginTop: 4, fontStyle: "italic" }}>Your ad here</div>
              </div>

              <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 8 }}>{ad.placement}</div>
              <div style={{ fontSize: 12, color: "#4b5563" }}>Est. {ad.impressions}</div>

              {selectedSize === i && (
                <button onClick={(e) => { e.stopPropagation(); setFormStep("form"); }}
                  style={{ marginTop: 16, width: "100%", padding: "12px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14, background: `linear-gradient(135deg,${ad.color},${ad.color}cc)`, color: "white" }}>
                  Book This Space →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PLACEMENT TABLE */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>PAGE PLACEMENTS</div>
            <h2 style={{ fontSize: "clamp(20px,3vw,34px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Choose exactly where your ad appears.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
            {PLACEMENTS.map((p, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{p.page}</div>
                <div style={{ fontSize: 11, color: p.traffic === "Highest" ? "#10b981" : p.traffic === "Very High" ? "#06b6d4" : p.traffic === "High" ? "#8b5cf6" : "#f59e0b", fontWeight: 700, marginBottom: 4 }}>{p.traffic}</div>
                <div style={{ fontSize: 12, color: "#4b5563" }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PACKAGES */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8b5cf6", marginBottom: 12 }}>AD PACKAGES</div>
          <h2 style={{ fontSize: "clamp(20px,3vw,34px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Bundle and save. Built for dealers who want real presence.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {PACKAGES.map((pkg, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${pkg.popular ? pkg.color + "44" : "rgba(255,255,255,0.06)"}`, borderTop: `3px solid ${pkg.color}`, borderRadius: "0 0 12px 12px", padding: 28, position: "relative" }}>
              {pkg.popular && <div style={{ position: "absolute", top: -1, right: 16, background: pkg.color, color: "white", fontSize: 10, fontWeight: 900, letterSpacing: 1, padding: "3px 10px", borderRadius: "0 0 6px 6px" }}>MOST POPULAR</div>}
              <div style={{ fontSize: 17, fontWeight: 900, color: pkg.color, marginBottom: 4 }}>{pkg.name}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#f1f5f9", marginBottom: 4 }}>{pkg.price}</div>
              <div style={{ fontSize: 13, color: "#10b981", fontWeight: 700, marginBottom: 20 }}>{pkg.annual} · {pkg.save}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                {pkg.includes.map((inc, j) => (
                  <div key={j} style={{ display: "flex", gap: 8 }}>
                    <span style={{ color: pkg.color, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#d1d5db" }}>{inc}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setFormStep("form")}
                style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14, background: `linear-gradient(135deg,${pkg.color},${pkg.color}cc)`, color: "white" }}>
                Book This Package →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING FORM MODAL */}
      {formStep === "form" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 40, width: "100%", maxWidth: 500 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#f59e0b", marginBottom: 12 }}>BOOK AD SPACE</div>
            <h3 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 24px", fontFamily: "'Georgia',serif" }}>Tell us about your campaign.</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { key: "name", label: "Your Name", placeholder: "John Smith" },
                { key: "company", label: "Company / Dealership", placeholder: "Smith Auto Group" },
                { key: "email", label: "Email", placeholder: "john@smithauto.com" },
                { key: "phone", label: "Phone", placeholder: "(555) 123-4567" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input value={formData[f.key]} onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, color: "white", padding: "10px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>What are you looking for?</label>
                <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Ad size, duration, budget, pages you want to target..."
                  rows={3} style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, color: "white", padding: "10px 14px", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
              <button onClick={() => setFormStep(null)} style={{ padding: "12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", cursor: "pointer", fontSize: 14 }}>Cancel</button>
              <button onClick={handleFormSubmit} style={{ padding: "12px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "white" }}>Submit →</button>
            </div>
          </div>
        </div>
      )}

      {formStep === "sent" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#0f0f1a", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 16, padding: 48, textAlign: "center", maxWidth: 400 }}>
            <div style={{ fontSize: 52, marginBottom: 20 }}>🎩</div>
            <h3 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 12px", fontFamily: "'Georgia',serif" }}>We'll be in touch.</h3>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 28 }}>Your inquiry has been received. Our team will reach out within 1 business day to discuss your campaign.</p>
            <button onClick={() => setFormStep(null)} style={{ padding: "12px 32px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14, background: "linear-gradient(135deg,#10b981,#059669)", color: "white" }}>Done</button>
          </div>
        </div>
      )}

    </div>
  );
}
