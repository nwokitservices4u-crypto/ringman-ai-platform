import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "For Dealers", href: "/ForIndependentDealers" },
  { label: "Dealer Groups", href: "/ForDealerGroups" },
  { label: "Private Sellers", href: "/SellYourCar" },
  { label: "Integrity", href: "/IntegritySystem" },
  { label: "Pricing", href: "/Pricing" },
  { label: "Why Ringman", href: "/WhyRingman" },
];

const PLANS = [
  {
    name: "Free", icon: "🆓", color: "#6b7280",
    monthly: 0, annual: 0, annualSave: 0,
    tag: null,
    features: [
      { text: "Browse last 24hrs of run list", included: true },
      { text: "1 free VIN decode per day", included: true },
      { text: "View vehicle summaries", included: true },
      { text: "Bidding on vehicles", included: false },
      { text: "List vehicles for auction", included: false },
      { text: "History reports", included: false },
      { text: "AI descriptions", included: false },
      { text: "Market intelligence", included: false },
    ],
    cta: "Browse Free", ctaHref: "/",
  },
  {
    name: "Basic", icon: "💙", color: "#06b6d4",
    monthly: 49, annual: 470, annualSave: 118,
    tag: null,
    features: [
      { text: "Full run list access — all formats", included: true },
      { text: "Bid on Flash, Push & Dead Row auctions", included: true },
      { text: "List up to 5 vehicles/month", included: true },
      { text: "Basic AI description (100 words)", included: true },
      { text: "1 free history report/month", included: true },
      { text: "IF-SALE negotiation engine", included: true },
      { text: "Standard run list placement", included: true },
      { text: "Email support", included: true },
    ],
    cta: "Start Basic", ctaHref: "/",
  },
  {
    name: "Pro", icon: "⚡", color: "#8b5cf6",
    monthly: 99, annual: 950, annualSave: 238,
    tag: "MOST POPULAR",
    features: [
      { text: "Everything in Basic", included: true },
      { text: "List up to 20 vehicles/month", included: true },
      { text: "Enhanced AI descriptions (300 words + SEO)", included: true },
      { text: "5 free history reports/month", included: true },
      { text: "Priority run list placement", included: true },
      { text: "OBD AI interpretation included", included: true },
      { text: "Market intel — MMR + 30-day comp", included: true },
      { text: "3 team sub-users included", included: true },
    ],
    cta: "Start Pro", ctaHref: "/",
  },
  {
    name: "Business", icon: "🏆", color: "#f59e0b",
    monthly: 199, annual: 1910, annualSave: 478,
    tag: "BEST VALUE",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited vehicle listings", included: true },
      { text: "Free AI descriptions always", included: true },
      { text: "15 free history reports/month", included: true },
      { text: "Featured run list placement", included: true },
      { text: "Full market intel — 90-day trend + comps", included: true },
      { text: "10 team sub-users included", included: true },
      { text: "AI Arbitration Defense included", included: true },
    ],
    cta: "Start Business", ctaHref: "/",
  },
];

const TRANSACTION_FEES = [
  { range: "$0 – $999", buyer: "$75", seller: "$50", total: "$125" },
  { range: "$1,000 – $2,999", buyer: "$125", seller: "$75", total: "$200" },
  { range: "$3,000 – $4,999", buyer: "$175", seller: "$100", total: "$275" },
  { range: "$5,000 – $7,499", buyer: "$225", seller: "$125", total: "$350" },
  { range: "$7,500 – $9,999", buyer: "$275", seller: "$150", total: "$425" },
  { range: "$10,000 – $14,999", buyer: "$325", seller: "$175", total: "$500" },
  { range: "$15,000 – $19,999", buyer: "$375", seller: "$200", total: "$575" },
  { range: "$20,000+", buyer: "$425", seller: "$225", total: "$650" },
];

const ADDONS = [
  {
    category: "📸 Photos & Video", items: [
      { name: "Extra 10 Photos", monthly: null, oneTime: "$4.99", annual: null, annualSave: null },
      { name: "Unlimited Photos (per listing)", monthly: null, oneTime: "$9.99", annual: "$79/yr", annualSave: "Save $41" },
      { name: "Walk-Around Video Upload", monthly: null, oneTime: "$7.99", annual: "$99/yr", annualSave: "Save $57" },
    ]
  },
  {
    category: "🤖 AI Descriptions", items: [
      { name: "Enhanced Description (300 words + SEO)", monthly: null, oneTime: "$9.99", annual: null, annualSave: null },
      { name: "Premium Description (full story + social)", monthly: null, oneTime: "$19.99", annual: "$149/yr", annualSave: "Save $91" },
    ]
  },
  {
    category: "📋 Vehicle History Reports", items: [
      { name: "Single History Report", monthly: null, oneTime: "$14.99", annual: null, annualSave: null },
      { name: "Bundle — 5 Reports", monthly: null, oneTime: "$49.99", annual: null, annualSave: "Save $25" },
      { name: "Bundle — 20 Reports", monthly: null, oneTime: "$149.99", annual: null, annualSave: "Save $150" },
      { name: "Unlimited Reports", monthly: null, oneTime: null, annual: "$599/yr", annualSave: "Best rate" },
    ]
  },
  {
    category: "🔍 VIN & Tag Decodes", items: [
      { name: "Deep VIN Decode PDF (recalls + full specs)", monthly: null, oneTime: "$4.99", annual: "$49/yr", annualSave: "Unlimited" },
      { name: "License Plate / Tag Report", monthly: null, oneTime: "$9.99", annual: "$199/yr", annualSave: "Unlimited" },
    ]
  },
  {
    category: "💻 OBD Intelligence", items: [
      { name: "Full Code Interpretation + Severity", monthly: null, oneTime: "$4.99", annual: null, annualSave: null },
      { name: "Mechanical Forecast Report", monthly: null, oneTime: "$9.99", annual: "$79/yr", annualSave: "Unlimited" },
    ]
  },
  {
    category: "📊 Market Intelligence", items: [
      { name: "30-Day Comp Analysis", monthly: null, oneTime: "$9.99", annual: null, annualSave: null },
      { name: "90-Day Trend + Regional Breakdown", monthly: null, oneTime: "$19.99", annual: "$299/yr", annualSave: "Unlimited" },
    ]
  },
  {
    category: "📢 Placement & Advertising", items: [
      { name: "Run List Priority Placement", monthly: null, oneTime: "$9.99", annual: null, annualSave: null },
      { name: "'Hot Deal' Badge on Listing", monthly: null, oneTime: "$4.99", annual: null, annualSave: null },
      { name: "Homepage Featured Spotlight (7 days)", monthly: null, oneTime: "$29.99", annual: null, annualSave: null },
      { name: "Dealer Profile Badge Ad", monthly: "$49.99/mo", oneTime: null, annual: "$479/yr", annualSave: "Save $121" },
    ]
  },
  {
    category: "🛡️ Seller Protection", items: [
      { name: "Ringman Verified Badge", monthly: null, oneTime: "$14.99", annual: null, annualSave: null },
      { name: "IF-SALE Extended Window (72hr)", monthly: null, oneTime: "$4.99", annual: null, annualSave: null },
      { name: "Listing Boost — Re-run in Next Auction", monthly: null, oneTime: "$9.99", annual: null, annualSave: null },
    ]
  },
  {
    category: "⚖️ Dispute & Arbitration", items: [
      { name: "Tier 2 Mediation Filing", monthly: null, oneTime: "$49", annual: null, annualSave: null },
      { name: "AI Arbitration Defense Report", monthly: null, oneTime: "$29.99", annual: null, annualSave: "Free in Business" },
      { name: "Expedited Arbitration (48hr ruling)", monthly: null, oneTime: "$99", annual: null, annualSave: null },
    ]
  },
];

const BUNDLES = [
  { name: "Starter Bundle", color: "#06b6d4", price: "$299/yr", saves: "Save $150+", includes: ["Basic membership (1yr)", "20 deep VIN decodes", "10 history reports", "OBD basic interpretation"] },
  { name: "Seller Power Bundle", color: "#8b5cf6", price: "$599/yr", saves: "Save $400+", includes: ["Pro membership (1yr)", "Unlimited AI descriptions", "50 history reports", "Market intel basic", "Unlimited OBD"] },
  { name: "Dealer Bundle", color: "#f59e0b", price: "$999/yr", saves: "Save $900+", includes: ["Business membership (1yr)", "Unlimited history reports", "Full market intel", "Unlimited VIN decodes", "Transport priority", "Unlimited OBD"] },
];

const COMPETITOR = [
  { feature: "Transaction fee — $10K vehicle", us: "$500 combined", acv: "$535+ avg per unit", openlane: "$250–400 est.", manheim: "$300–500 est." },
  { feature: "Membership / access fee", us: "$49–$199/mo", acv: "$0 (fees only)", openlane: "$0 (fees only)", manheim: "$103/yr AuctionACCESS" },
  { feature: "History report (per report)", us: "$14.99", acv: "$25–40 est.", openlane: "N/A", manheim: "Included/bundled" },
  { feature: "AI vehicle description", us: "$9.99", acv: "N/A", openlane: "N/A", manheim: "N/A" },
  { feature: "OBD scan interpretation", us: "$4.99", acv: "N/A", openlane: "N/A", manheim: "N/A" },
  { feature: "Market intelligence report", us: "$9.99–$19.99", acv: "$$$$ (ACV Estimate tool)", openlane: "N/A", manheim: "$$$$ (Market Report)" },
  { feature: "License plate / tag report", us: "$9.99", acv: "N/A", openlane: "N/A", manheim: "N/A" },
  { feature: "Dispute mediation (before arb.)", us: "$49 flat", acv: "Jump to arbitration", openlane: "Jump to arbitration", manheim: "NAAA arbitration only" },
  { feature: "Integrity scoring / rewards", us: "✅ Built in", acv: "❌", openlane: "❌", manheim: "❌" },
];

export default function Pricing() {
  useEffect(() => {
    document.title = "Pricing — Transparent Wholesale Auction Fees | Ringman's AI";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Simple transparent pricing for wholesale auto auctions. Plans from $49/month. Transaction fees from $75. Add-ons, annual bundles, and integrity tier discounts.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "Pricing — Transparent Wholesale Auction Fees | Ringman's AI", "property");
    setMeta("og:description", "Simple transparent pricing for wholesale auto auctions. Plans from $49/month. Transaction fees from $75. Add-ons, annual bundles, and integrity tier discounts.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Pricing — Transparent Wholesale Auction Fees | Ringman's AI");
    setMeta("twitter:description", "Simple transparent pricing for wholesale auto auctions. Plans from $49/month. Transaction fees from $75. Add-ons, annual bundles, and integrity tier discounts.");
  }, []);

  const [billing, setBilling] = useState("monthly");
  const [openAddon, setOpenAddon] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: l.href === "/Pricing" ? "#06b6d4" : "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <a href="/" style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Get Started</a>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "80px 24px 60px", background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 70%)" }}>
        <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#06b6d4", marginBottom: 16 }}>TRANSPARENT PRICING</div>
        <h1 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>
          Simple. Fair. <span style={{ background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>No surprises.</span>
        </h1>
        <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.8 }}>Start free. Pay only when you're ready. Every plan includes a 2-month bonus when you go annual.</p>

        {/* Billing toggle */}
        <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 30, padding: 4 }}>
          {["monthly", "annual"].map(b => (
            <button key={b} onClick={() => setBilling(b)}
              style={{ padding: "8px 24px", borderRadius: 26, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, textTransform: "capitalize", background: billing === b ? "linear-gradient(135deg,#06b6d4,#0891b2)" : "transparent", color: billing === b ? "white" : "#6b7280", transition: "all 0.2s" }}>
              {b} {b === "annual" && <span style={{ color: billing === "annual" ? "#a7f3d0" : "#10b981", fontSize: 11 }}>2 MONTHS FREE</span>}
            </button>
          ))}
        </div>
      </div>

      {/* PLAN CARDS */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
          {PLANS.map((p, i) => (
            <div key={i} style={{ background: p.tag ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${p.tag ? p.color + "44" : "rgba(255,255,255,0.06)"}`, borderTop: `3px solid ${p.color}`, borderRadius: "0 0 12px 12px", padding: 28, position: "relative" }}>
              {p.tag && <div style={{ position: "absolute", top: -1, right: 16, background: p.color, color: "white", fontSize: 10, fontWeight: 900, letterSpacing: 1.5, padding: "3px 10px", borderRadius: "0 0 6px 6px" }}>{p.tag}</div>}
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: p.color, marginBottom: 16 }}>{p.name}</div>
              <div style={{ marginBottom: 24 }}>
                {p.monthly === 0 ? (
                  <div style={{ fontSize: 36, fontWeight: 900, color: "#f1f5f9" }}>Free</div>
                ) : (
                  <>
                    <div style={{ fontSize: 36, fontWeight: 900, color: "#f1f5f9" }}>
                      ${billing === "annual" ? Math.round(p.annual / 12) : p.monthly}
                      <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 400 }}>/mo</span>
                    </div>
                    {billing === "annual" && p.annualSave > 0 && (
                      <div style={{ fontSize: 13, color: "#10b981", marginTop: 4 }}>
                        ${p.annual}/yr — Save ${p.annualSave}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 24 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: f.included ? p.color : "#374151", fontSize: 14, marginTop: 1, flexShrink: 0 }}>{f.included ? "✓" : "✕"}</span>
                    <span style={{ fontSize: 13, color: f.included ? "#d1d5db" : "#4b5563", lineHeight: 1.4 }}>{f.text}</span>
                  </div>
                ))}
              </div>
              <a href={p.ctaHref} style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: 8, border: p.monthly === 0 ? "1px solid rgba(255,255,255,0.1)" : "none", background: p.monthly === 0 ? "transparent" : `linear-gradient(135deg,${p.color},${p.color}cc)`, color: "white", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#4b5563" }}>
          All plans include: guided inspection system, silhouette overlays, OBD scan tool, undercarriage video, IF-SALE engine, Ringman Transport access.<br />
          Integrity tier discounts apply automatically — Bronze to Platinum.
        </div>
      </div>

      {/* TRANSACTION FEES */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>TRANSACTION FEES</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>Pay only when a vehicle sells.</h2>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Integrity tier members receive 5–15% off all transaction fees automatically.</p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["Sale Price", "Buyer Fee", "Seller Fee", "Combined"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", color: "#6b7280", fontWeight: 700, textAlign: "left", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRANSACTION_FEES.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                    <td style={{ padding: "14px 16px", color: "#f1f5f9", fontWeight: 600 }}>{row.range}</td>
                    <td style={{ padding: "14px 16px", color: "#06b6d4" }}>{row.buyer}</td>
                    <td style={{ padding: "14px 16px", color: "#8b5cf6" }}>{row.seller}</td>
                    <td style={{ padding: "14px 16px", color: "#10b981", fontWeight: 700 }}>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
            <div style={{ background: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.15)", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: "#06b6d4", fontWeight: 700, marginBottom: 6 }}>🚗 Push Auction</div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>20% lower fees across all price tiers — reflects reduced vehicle value</div>
            </div>
            <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: "#ef4444", fontWeight: 700, marginBottom: 6 }}>💀 Dead Row Auction</div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>Flat $75 buyer / $50 seller — regardless of sale price</div>
            </div>
          </div>
        </div>
      </div>

      {/* ADD-ONS */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8b5cf6", marginBottom: 12 }}>ADD-ONS</div>
          <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>Only pay for what you actually use.</h2>
          <p style={{ color: "#6b7280", fontSize: 14 }}>Every add-on has an annual option — always saves you at least 2 months of cost.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ADDONS.map((cat, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, overflow: "hidden" }}>
              <button onClick={() => setOpenAddon(openAddon === i ? null : i)}
                style={{ width: "100%", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none", cursor: "pointer", color: "white" }}>
                <span style={{ fontSize: 15, fontWeight: 800 }}>{cat.category}</span>
                <span style={{ color: "#6b7280", fontSize: 18 }}>{openAddon === i ? "−" : "+"}</span>
              </button>
              {openAddon === i && (
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {cat.items.map((item, j) => (
                    <div key={j} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 16, alignItems: "center", padding: "14px 24px", borderBottom: j < cat.items.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                      <span style={{ fontSize: 14, color: "#d1d5db" }}>{item.name}</span>
                      <div style={{ textAlign: "right" }}>
                        {item.oneTime && <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>{item.oneTime}</div>}
                        {item.monthly && <div style={{ fontSize: 13, color: "#9ca3af" }}>{item.monthly}</div>}
                      </div>
                      <div style={{ textAlign: "right", minWidth: 120 }}>
                        {item.annual && (
                          <>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>{item.annual}</div>
                            {item.annualSave && <div style={{ fontSize: 11, color: "#059669" }}>{item.annualSave}</div>}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* BUNDLES */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#f59e0b", marginBottom: 12 }}>ANNUAL BUNDLES</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Stack and save. Everything you need in one annual price.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {BUNDLES.map((b, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${b.color}33`, borderTop: `3px solid ${b.color}`, borderRadius: "0 0 12px 12px", padding: 28 }}>
                <div style={{ fontSize: 17, fontWeight: 900, color: b.color, marginBottom: 4 }}>{b.name}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#f1f5f9", marginBottom: 4 }}>{b.price}</div>
                <div style={{ fontSize: 13, color: "#10b981", fontWeight: 700, marginBottom: 20 }}>{b.saves}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  {b.includes.map((inc, j) => (
                    <div key={j} style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: b.color }}>✓</span>
                      <span style={{ fontSize: 13, color: "#d1d5db" }}>{inc}</span>
                    </div>
                  ))}
                </div>
                <a href="/" style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: 8, background: `linear-gradient(135deg,${b.color},${b.color}aa)`, color: "white", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                  Get This Bundle →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPETITOR COMPARISON */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#ef4444", marginBottom: 12 }}>VS. THE COMPETITION</div>
          <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>The math doesn't lie.</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Feature", "Ringman's AI", "ACV Auctions", "OPENLANE", "Manheim"].map((h, i) => (
                  <th key={h} style={{ padding: "12px 16px", color: i === 1 ? "#06b6d4" : "#6b7280", fontWeight: 700, textAlign: "left", fontSize: 12, letterSpacing: 0.5, background: i === 1 ? "rgba(6,182,212,0.04)" : "transparent" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPETITOR.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 13 }}>{row.feature}</td>
                  <td style={{ padding: "14px 16px", color: "#10b981", fontWeight: 700, background: "rgba(6,182,212,0.02)" }}>{row.us}</td>
                  <td style={{ padding: "14px 16px", color: "#6b7280" }}>{row.acv}</td>
                  <td style={{ padding: "14px 16px", color: "#6b7280" }}>{row.openlane}</td>
                  <td style={{ padding: "14px 16px", color: "#6b7280" }}>{row.manheim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.08),rgba(139,92,246,0.06))", borderTop: "1px solid rgba(6,182,212,0.12)", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>Start free. Scale when you're ready.</h2>
        <p style={{ color: "#6b7280", fontSize: 16, marginBottom: 40 }}>No credit card required to browse. Upgrade any time. Cancel any time.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/" style={{ padding: "18px 48px", borderRadius: 8, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontWeight: 800, fontSize: 18, textDecoration: "none" }}>JOIN FREE →</a>
          <a href="/WhyRingman" style={{ padding: "18px 48px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db", fontWeight: 700, fontSize: 18, textDecoration: "none" }}>See Why We're Different</a>
        </div>
      </div>

    </div>
  );
}
