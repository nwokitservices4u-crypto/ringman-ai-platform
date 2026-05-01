import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "For Dealers", href: "/ForIndependentDealers" },
  { label: "The Inspection", href: "/TheInspection" },
  { label: "Integrity", href: "/IntegritySystem" },
  { label: "Pricing", href: "/Pricing" },
  { label: "Transport", href: "/RingmanTransport" },
];

const CHAPTERS = [
  {
    num: "01",
    color: "#f59e0b",
    icon: "🎩",
    title: "The Ringman Was Born in the Ring",
    body: "Not in a boardroom. Not in a venture fund. In the lane. Calling bids. Processing arbitrations. Standing between buyers and sellers when things went sideways. The Ringman's AI was built by someone who has lived every problem this platform solves.",
  },
  {
    num: "02",
    color: "#06b6d4",
    icon: "🔍",
    title: "We Built the Inspection Nobody Built",
    body: "Every other platform asks for photos and hopes for the best. We built a forensic inspection system — guided silhouette overlays, AI-verified angles, undercarriage video frame analysis, OBD scan interpretation. The most thorough digital condition report in wholesale. No inspector needed. Ever.",
  },
  {
    num: "03",
    color: "#8b5cf6",
    icon: "📋",
    title: "We Demand Honesty. And We Enforce It.",
    body: "Seller disclosure reports. Timestamped. Digitally signed. Every system. Every mod. Every known issue. AI cross-references your photos against your disclosure in real time. If something doesn't match — it gets flagged before it hits the run list. The days of buying a car with hidden issues are over on this platform.",
  },
  {
    num: "04",
    color: "#10b981",
    icon: "🏆",
    title: "We Reward the Right People",
    body: "Bronze to Platinum. Every clean sale builds your score. Scores unlock lower fees, better placement, free tools. Bad actors get strikes. Four strikes — permanent ban. This isn't just a marketplace. It's a meritocracy. The cleanest dealers win the most.",
  },
  {
    num: "05",
    color: "#ef4444",
    icon: "⚡",
    title: "Speed Is a Feature",
    body: "20-minute Flash Auctions. IF-SALE engine that negotiates automatically when a floor isn't met. Real-time bidding. Transport booked at checkout. The goal is to get deals done in the time it used to take to find the run list.",
  },
  {
    num: "06",
    color: "#f97316",
    icon: "📊",
    title: "Data That Compounds Forever",
    body: "Every inspection. Every bid. Every sale. Every arbitration. Every OBD scan. Every photo. Every dealer behavior pattern. It all goes into the intelligence engine. Over time this becomes the most complete vehicle and dealer dataset in the industry. Cradle to grave. VIN by VIN.",
  },
];

const QUOTES = [
  { text: "Finally a platform that actually gets it. The inspection system alone is worth the membership.", attr: "Independent Dealer, Tulsa OK" },
  { text: "I sold my truck here and got $4,200 more than the dealership offered me. Did the inspection in my driveway in 20 minutes.", attr: "Private Seller, Kansas City MO" },
  { text: "The integrity scoring changed how I buy. I filter for Gold and Platinum sellers first every single time.", attr: "Dealer Group Buyer, Dallas TX" },
];

const FEATURES_VS = [
  { feature: "AI-guided photo inspection", us: true, acv: false, manheim: false },
  { feature: "Undercarriage video analysis", us: true, acv: false, manheim: false },
  { feature: "OBD scan interpretation", us: true, acv: false, manheim: false },
  { feature: "Signed seller disclosure", us: true, acv: false, manheim: false },
  { feature: "Integrity scoring system", us: true, acv: false, manheim: false },
  { feature: "3-tier dispute resolution", us: true, acv: false, manheim: false },
  { feature: "Flash 20-min auction format", us: true, acv: false, manheim: false },
  { feature: "Push + Dead Row auctions", us: true, acv: false, manheim: false },
  { feature: "Open classifieds + auctions", us: true, acv: false, manheim: false },
  { feature: "Built-in transport booking", us: true, acv: true, manheim: true },
  { feature: "Market intelligence data", us: true, acv: true, manheim: true },
  { feature: "Online bidding", us: true, acv: true, manheim: true },
];

export default function WhyUs() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveQuote(q => (q + 1) % QUOTES.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <a href="/Register" style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Join Free</a>
      </nav>

      {/* CINEMATIC HERO */}
      <div style={{ minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 24px", background: "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(245,158,11,0.06) 0%, rgba(6,182,212,0.04) 50%, transparent 80%)", position: "relative", overflow: "hidden" }}>
        {/* Background rings */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", border: "1px solid rgba(245,158,11,0.04)", top: "50%", left: "50%", transform: `translate(-50%,-50%) scale(${1 + scrollY * 0.0005})`, transition: "transform 0.1s" }} />
        <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", border: "1px solid rgba(6,182,212,0.03)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "clamp(60px,12vw,120px)", marginBottom: 8, filter: "drop-shadow(0 0 40px rgba(245,158,11,0.3))" }}>🎩</div>
          <h1 style={{ fontSize: "clamp(38px,7vw,84px)", fontWeight: 900, fontFamily: "'Georgia',serif", lineHeight: 1.0, margin: "0 0 28px" }}>
            The Ringman's AI.<br />
            <span style={{ background: "linear-gradient(135deg,#f59e0b,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Built different.</span>
          </h1>
          <p style={{ fontSize: "clamp(16px,2.5vw,22px)", color: "#9ca3af", maxWidth: 680, margin: "0 auto 48px", lineHeight: 1.9, fontFamily: "'Georgia',serif", fontStyle: "italic" }}>
            Wholesale auto auctions have been broken for decades. Bad disclosures. Hidden damage. Platforms built for their own profit. We built the platform we always wished existed.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/Register" style={{ padding: "18px 44px", borderRadius: 8, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "white", fontWeight: 900, fontSize: 17, textDecoration: "none", letterSpacing: 0.5 }}>Join Free →</a>
            <a href="/WhyRingman" style={{ padding: "18px 44px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db", fontWeight: 700, fontSize: 17, textDecoration: "none" }}>Read the Manifesto</a>
          </div>
        </div>
      </div>

      {/* STAT BAR */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 32, textAlign: "center" }}>
          {[
            { val: "12", label: "Required inspection angles" },
            { val: "6", label: "Revenue streams built in" },
            { val: "4", label: "Auction formats" },
            { val: "3", label: "Dispute resolution tiers" },
            { val: "∞", label: "Cradle-to-grave VIN records" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, background: "linear-gradient(135deg,#f59e0b,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#4b5563", textTransform: "uppercase", letterSpacing: 1, marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* THE STORY CHAPTERS */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#f59e0b", marginBottom: 16 }}>THE STORY</div>
          <h2 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Six reasons this platform exists.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {CHAPTERS.map((c, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 32, alignItems: "flex-start" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40 }}>{c.icon}</div>
                <div style={{ fontSize: 11, color: c.color, fontWeight: 900, letterSpacing: 2, marginTop: 8 }}>{c.num}</div>
              </div>
              <div style={{ borderLeft: `2px solid ${c.color}22`, paddingLeft: 28 }}>
                <div style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 900, fontFamily: "'Georgia',serif", color: c.color, marginBottom: 12 }}>{c.title}</div>
                <div style={{ fontSize: 16, color: "#9ca3af", lineHeight: 1.9 }}>{c.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURE COMPARISON */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#ef4444", marginBottom: 12 }}>FEATURE COMPARISON</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,38px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>What we have that nobody else does.</h2>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Feature", "Ringman's AI", "ACV", "Manheim"].map((h, i) => (
                  <th key={h} style={{ padding: "12px 16px", color: i === 1 ? "#f59e0b" : "#6b7280", fontWeight: 700, textAlign: i === 0 ? "left" : "center", fontSize: 12, background: i === 1 ? "rgba(245,158,11,0.03)" : "transparent" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES_VS.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "13px 16px", color: "#9ca3af", fontSize: 13 }}>{row.feature}</td>
                  <td style={{ padding: "13px 16px", textAlign: "center", background: "rgba(245,158,11,0.02)" }}><span style={{ fontSize: 18, color: "#10b981" }}>✓</span></td>
                  <td style={{ padding: "13px 16px", textAlign: "center" }}>{row.acv ? <span style={{ fontSize: 18, color: "#10b981" }}>✓</span> : <span style={{ fontSize: 18, color: "#374151" }}>✕</span>}</td>
                  <td style={{ padding: "13px 16px", textAlign: "center" }}>{row.manheim ? <span style={{ fontSize: 18, color: "#10b981" }}>✓</span> : <span style={{ fontSize: 18, color: "#374151" }}>✕</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROTATING TESTIMONIALS */}
      <div style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 32 }}>WHAT THEY'RE SAYING</div>
          <div style={{ minHeight: 140, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: "clamp(17px,2.5vw,24px)", fontFamily: "'Georgia',serif", fontStyle: "italic", color: "#d1d5db", lineHeight: 1.9, marginBottom: 20, transition: "all 0.5s" }}>
              "{QUOTES[activeQuote].text}"
            </div>
            <div style={{ fontSize: 13, color: "#4b5563", letterSpacing: 1 }}>— {QUOTES[activeQuote].attr}</div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 24 }}>
            {QUOTES.map((_, i) => (
              <div key={i} onClick={() => setActiveQuote(i)}
                style={{ width: i === activeQuote ? 24 : 8, height: 8, borderRadius: 4, background: i === activeQuote ? "#06b6d4" : "rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.1),rgba(6,182,212,0.06),rgba(139,92,246,0.06))", borderTop: "1px solid rgba(245,158,11,0.15)", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🎩</div>
        <h2 style={{ fontSize: "clamp(30px,5vw,56px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 20px", lineHeight: 1.1 }}>
          The auction house<br />you've been waiting for.
        </h2>
        <p style={{ color: "#6b7280", fontSize: 17, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.8 }}>Start free. No credit card. No dealer license needed to browse. Join the platform that actually gets it.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/Register" style={{ padding: "20px 56px", borderRadius: 8, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "white", fontWeight: 900, fontSize: 19, textDecoration: "none", letterSpacing: 0.5 }}>JOIN FREE →</a>
          <a href="/Pricing" style={{ padding: "20px 56px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db", fontWeight: 700, fontSize: 19, textDecoration: "none" }}>See Pricing</a>
        </div>
      </div>

    </div>
  );
}
