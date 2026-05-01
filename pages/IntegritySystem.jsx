import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "For Dealers", href: "/ForIndependentDealers" },
  { label: "Dealer Groups", href: "/ForDealerGroups" },
  { label: "Private Sellers", href: "/SellYourCar" },
  { label: "The Inspection", href: "/TheInspection" },
  { label: "Integrity", href: "/IntegritySystem" },
  { label: "Why Ringman", href: "/WhyRingman" },
];

const TIERS = [
  { name: "Bronze", icon: "🥉", color: "#cd7f32", range: "0–9 clean sales", perks: ["Standard platform rates", "Full platform access", "Basic AI descriptions", "Standard run list placement"], desc: "Where everyone starts. Do your job right and you move up fast." },
  { name: "Silver", icon: "🥈", color: "#94a3b8", range: "10–49 clean sales", perks: ["Reduced listing fee", "Enhanced AI descriptions", "Priority support", "Silver badge on profile"], desc: "You're consistent. The platform rewards that." },
  { name: "Gold", icon: "🥇", color: "#f59e0b", range: "50–99 clean sales", perks: ["Discounted history reports", "Featured run list placement", "Free AI vehicle descriptions", "Gold badge — buyers trust it", "Reduced advertising rates"], desc: "You're building a reputation. Buyers seek you out." },
  { name: "Platinum", icon: "👑", color: "#06b6d4", range: "100+ clean sales", perks: ["Lowest platform fees", "Homepage badge + spotlight", "Free AI descriptions always", "Priority transport booking", "AI Arbitration Defense included", "Founding member recognition"], desc: "The top tier. You've earned everything this platform has to offer." },
];

const STRIKES = [
  { num: 1, color: "#f59e0b", title: "Warning Issued", desc: "First offense. You get a formal warning and an increased per-vehicle fee on your next 5 listings. Your score is flagged but recovery is possible." },
  { num: 2, color: "#f97316", title: "Membership Fee Increase + Listing Restrictions", desc: "Pattern of issues. Monthly membership cost goes up. Listing frequency may be restricted pending review. Score drops to probationary status." },
  { num: 3, color: "#ef4444", title: "90-Day Suspension", desc: "Serious pattern. Account suspended for 90 days. No buying, no selling. Reinstatement requires a review with our team and a clean record going forward." },
  { num: 4, color: "#7f1d1d", title: "Permanent Ban", desc: "You're done. No appeal. No reinstatement. Ever. This platform is built on trust — four strikes means you refused to operate with integrity." },
];

const SCORE_BUILDERS = [
  { action: "Clean sale closed", points: "+2", color: "#10b981" },
  { action: "Positive buyer feedback", points: "+3", color: "#10b981" },
  { action: "Disclosure report 100% complete", points: "+1", color: "#10b981" },
  { action: "Title transferred within 3 days", points: "+2", color: "#10b981" },
  { action: "Volume milestone reached", points: "+5", color: "#10b981" },
  { action: "Zero arbitrations (30 days)", points: "+4", color: "#10b981" },
  { action: "Arbitration filed against you", points: "-8", color: "#ef4444" },
  { action: "Arbitration ruled against you", points: "-15", color: "#ef4444" },
  { action: "Incomplete disclosure submitted", points: "-3", color: "#ef4444" },
  { action: "Late title transfer", points: "-4", color: "#ef4444" },
  { action: "Buyer complaint upheld", points: "-6", color: "#ef4444" },
];

export default function IntegritySystem() {
  useEffect(() => {
    document.title = "The Integrity System — Bronze to Platinum | Ringman's AI";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Bronze, Silver, Gold, and Platinum dealer scoring. 4-strike permanent ban system. 3-tier dispute resolution. The accountability system wholesale has never had.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "The Integrity System — Bronze to Platinum | Ringman's AI", "property");
    setMeta("og:description", "Bronze, Silver, Gold, and Platinum dealer scoring. 4-strike permanent ban system. 3-tier dispute resolution. The accountability system wholesale has never had.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "The Integrity System — Bronze to Platinum | Ringman's AI");
    setMeta("twitter:description", "Bronze, Silver, Gold, and Platinum dealer scoring. 4-strike permanent ban system. 3-tier dispute resolution. The accountability system wholesale has never had.");
  }, []);

  const [activeTab, setActiveTab] = useState("sellers");

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: l.href === "/IntegritySystem" ? "#f59e0b" : "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <a href="/" style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Get Started</a>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "100px 24px 80px", background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 70%)" }}>
        <div style={{ display: "inline-block", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 20, padding: "6px 16px", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#fbbf24", marginBottom: 24 }}>The Integrity System</div>
        <h1 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 900, fontFamily: "'Georgia',serif", lineHeight: 1.05, margin: "0 0 24px" }}>
          Finally.<br />
          <span style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Accountability in wholesale.</span>
        </h1>
        <p style={{ fontSize: "clamp(16px,2.5vw,20px)", color: "#9ca3af", maxWidth: 650, margin: "0 auto", lineHeight: 1.8, fontFamily: "'Georgia',serif", fontStyle: "italic" }}>
          Every dealer. Every private seller. Every transaction. Scored. Tracked. Rewarded for integrity. Penalized for misrepresentation. This is how trust is built in a market that's never had it.
        </p>
      </div>

      {/* TIER CARDS */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#f59e0b", marginBottom: 12 }}>THE TIERS</div>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>The more you sell clean, the less you pay and the more you earn.</h2>
          <p style={{ color: "#6b7280", fontSize: 15 }}>Everyone starts at Bronze. The platform rewards consistency — automatically.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
          {TIERS.map((t, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.06)`, borderTop: `3px solid ${t.color}`, borderRadius: "0 0 12px 12px", padding: 28, position: "relative" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{t.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: t.color, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: "#4b5563", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>{t.range}</div>
              <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>{t.desc}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {t.perks.map((p, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ color: t.color, fontSize: 14 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#d1d5db" }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SCORE BUILDER */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>HOW YOUR SCORE MOVES</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Every action on the platform counts.</h2>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
            {["sellers", "buyers"].map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                style={{ padding: "10px 24px", borderRadius: 6, border: `1px solid ${activeTab === t ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.06)"}`, background: activeTab === t ? "rgba(6,182,212,0.1)" : "transparent", color: activeTab === t ? "#06b6d4" : "#6b7280", cursor: "pointer", fontSize: 13, fontWeight: 700, textTransform: "capitalize" }}>
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SCORE_BUILDERS.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, padding: "14px 20px" }}>
                <span style={{ fontSize: 14, color: "#d1d5db" }}>{s.action}</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: s.color, minWidth: 40, textAlign: "right" }}>{s.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STRIKE SYSTEM */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#ef4444", marginBottom: 12 }}>THE STRIKE SYSTEM</div>
          <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>Bad actors don't get unlimited chances here.</h2>
          <p style={{ color: "#6b7280", fontSize: 15 }}>Four strikes. That's it. There is no fifth chance.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {STRIKES.map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 20, background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.05)`, borderLeft: `3px solid ${s.color}`, borderRadius: "0 10px 10px 0", padding: 24 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>#{s.num}</div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: s.color, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DISPUTE PIPELINE */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8b5cf6", marginBottom: 12 }}>DISPUTE RESOLUTION</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>Three tiers before a fine. Because fairness matters.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { tier: "Tier 1", color: "#10b981", title: "Direct Resolution", time: "48 hours", desc: "Buyer and seller work it out directly. Most disputes end here." },
              { tier: "Tier 2", color: "#f59e0b", title: "Ringman Mediation", time: "72 hours", desc: "Our team steps in. Reviews all data. Proposes a fair outcome. Small mediation fee." },
              { tier: "Tier 3", color: "#ef4444", title: "Formal Arbitration", time: "Binding ruling", desc: "Final. Fee charged to losing party. Strike recorded. No appeal." },
            ].map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.05)`, borderTop: `2px solid ${t.color}`, borderRadius: "0 0 10px 10px", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: t.color, textTransform: "uppercase", marginBottom: 8 }}>{t.tier}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: t.color, fontWeight: 700, marginBottom: 12 }}>{t.time}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.08),rgba(239,68,68,0.06))", borderTop: "1px solid rgba(245,158,11,0.12)", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>Build your score. Earn your tier.</h2>
        <p style={{ color: "#6b7280", fontSize: 16, marginBottom: 40 }}>Every clean deal moves you up. Start at Bronze. Earn Platinum. The platform works for you.</p>
        <a href="/" style={{ padding: "18px 48px", borderRadius: 8, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "white", fontWeight: 800, fontSize: 18, textDecoration: "none" }}>JOIN THE RINGMAN'S AI →</a>
      </div>

    </div>
  );
}
