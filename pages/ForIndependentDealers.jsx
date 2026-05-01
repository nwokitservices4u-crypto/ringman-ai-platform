import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "For Dealers", href: "/ForIndependentDealers" },
  { label: "Dealer Groups", href: "/ForDealerGroups" },
  { label: "Private Sellers", href: "/SellYourCar" },
  { label: "The Inspection", href: "/TheInspection" },
  { label: "Integrity", href: "/IntegritySystem" },
  { label: "Why Ringman", href: "/WhyRingman" },
];

const FEATURES = [
  { icon: "🔍", title: "AI Inspection — No Inspector Needed", body: "You do it yourself in 15 minutes. Guided silhouette overlays tell you exactly where to stand. AI verifies every photo. Undercarriage video. OBD scan. The most thorough condition report in wholesale — and you never waited for an inspector to show up." },
  { icon: "📋", title: "Seller Disclosure Protection", body: "Every vehicle you buy comes with a timestamped, seller-signed disclosure report. Mechanical, electrical, climate, body, aftermarket mods, known issues. If they lied — it's on record. That's your arbitration case, built before you even bid." },
  { icon: "⚡", title: "Flash Auction Format", body: "20-minute auctions. No all-day barn sessions. No waiting three hours for your lot to come up. Set your floor, list it, watch bids come in. If it doesn't hit your floor — the IF-SALE engine takes over automatically." },
  { icon: "🤖", title: "The Ringman AI On Your Side", body: "He reads the run list with you. Flags vehicles worth watching. Tells you when a price is below market. Helps you write descriptions that sell. He's on every page — not a chatbot, a co-pilot." },
  { icon: "🏆", title: "Build Your Reputation Here", body: "Every clean deal builds your Integrity Score. Bronze → Silver → Gold → Platinum. Platinum dealers get lower fees, free AI descriptions, and a homepage badge that tells every buyer you're the real deal." },
  { icon: "🚛", title: "Transport Built In", body: "Won a vehicle three states away? Book transport without leaving the platform. Ringman Transport — powered by Montway, the industry's most trusted carrier network. One click at checkout." },
];

const PAIN_POINTS = [
  { pain: "Paying ACV fees on every single vehicle", fix: "Tiered membership — your cost goes DOWN as your volume goes up" },
  { pain: "Waiting days for an inspector to show up", fix: "You inspect it yourself in 15 minutes with AI guidance" },
  { pain: "Buying blind from blurry photos and vague descriptions", fix: "12 required AI-verified shots + undercarriage video + OBD scan" },
  { pain: "No recourse when a seller misrepresents a car", fix: "Signed disclosure report + 3-tier dispute resolution + integrity strikes" },
  { pain: "Platforms built for mega groups, not small lots", fix: "Built by an independent. For independents. Every feature earns its place." },
];

export default function ForIndependentDealers() {
  useEffect(() => {
    document.title = "For Independent Dealers — Ringman's AI Wholesale Auctions";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "The wholesale auto auction platform built for independent dealers. AI-powered inspections, Flash Auctions, IF-SALE engine, integrity scoring, and transport built in. Join free.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "For Independent Dealers — Ringman's AI Wholesale Auctions", "property");
    setMeta("og:description", "The wholesale auto auction platform built for independent dealers. AI-powered inspections, Flash Auctions, IF-SALE engine, integrity scoring, and transport built in. Join free.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "For Independent Dealers — Ringman's AI Wholesale Auctions");
    setMeta("twitter:description", "The wholesale auto auction platform built for independent dealers. AI-powered inspections, Flash Auctions, IF-SALE engine, integrity scoring, and transport built in. Join free.");
  }, []);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: l.href === "/ForIndependentDealers" ? "#06b6d4" : "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <a href="/" style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Get Started</a>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "100px 24px 80px", background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,182,212,0.07) 0%, transparent 70%)" }}>
        <div style={{ display: "inline-block", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", borderRadius: 20, padding: "6px 16px", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 24 }}>For Independent Dealers</div>
        <h1 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 900, fontFamily: "'Georgia',serif", lineHeight: 1.05, margin: "0 0 24px" }}>
          Finally.<br />
          <span style={{ background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Built for the little guy.</span>
        </h1>
        <p style={{ fontSize: "clamp(16px,2.5vw,20px)", color: "#9ca3af", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.8, fontFamily: "'Georgia',serif", fontStyle: "italic" }}>
          You don't need a 200-car lot to compete here. You need hustle, a dealer license, and the willingness to do business the right way. We handle the rest.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/" style={{ padding: "16px 36px", borderRadius: 8, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontWeight: 800, fontSize: 16, textDecoration: "none", letterSpacing: 0.5 }}>Start For Free →</a>
          <a href="/TheInspection" style={{ padding: "16px 36px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>See How It Works</a>
        </div>
      </div>

      {/* PAIN → FIX */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#f59e0b", marginBottom: 12 }}>WE HEARD YOU</div>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Every complaint about every platform. Fixed.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PAIN_POINTS.map((p, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "20px 24px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ color: "#ef4444", fontSize: 18, flexShrink: 0 }}>✕</span>
                <span style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.5 }}>{p.pain}</span>
              </div>
              <div style={{ color: "#374151", fontSize: 20, textAlign: "center" }}>→</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ color: "#10b981", fontSize: 18, flexShrink: 0 }}>✓</span>
                <span style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.5, fontWeight: 600 }}>{p.fix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>WHAT YOU GET</div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Every tool you need. Nothing you don't.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderTop: "2px solid #06b6d4", borderRadius: "0 0 12px 12px", padding: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#f1f5f9", marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.8 }}>{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INTEGRITY TEASER */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#f59e0b", marginBottom: 20 }}>YOUR REPUTATION MATTERS HERE</div>
        <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 20px" }}>The more you sell clean, the less you pay.</h2>
        <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>Clean dealers build Bronze → Silver → Gold → Platinum scores. Platinum members get lower fees, free AI descriptions, homepage badges, and priority placement. Bad actors get strikes. Four strikes — gone forever. This is wholesale done right.</p>
        <a href="/IntegritySystem" style={{ padding: "14px 32px", borderRadius: 8, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "white", fontWeight: 800, fontSize: 15, textDecoration: "none" }}>See the Integrity System →</a>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.08),rgba(139,92,246,0.08))", borderTop: "1px solid rgba(6,182,212,0.12)", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>You've been waiting for this platform.</h2>
        <p style={{ color: "#6b7280", fontSize: 16, marginBottom: 40 }}>It's here. Get in early. Build your score before the lot fills up.</p>
        <a href="/" style={{ padding: "18px 48px", borderRadius: 8, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontWeight: 800, fontSize: 18, textDecoration: "none", letterSpacing: 1 }}>JOIN THE RINGMAN'S AI →</a>
      </div>

    </div>
  );
}
