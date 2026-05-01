import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "For Dealers", href: "/ForIndependentDealers" },
  { label: "Dealer Groups", href: "/ForDealerGroups" },
  { label: "Private Sellers", href: "/SellYourCar" },
  { label: "The Inspection", href: "/TheInspection" },
  { label: "Integrity", href: "/IntegritySystem" },
  { label: "Why Ringman", href: "/WhyRingman" },
];

const COMPETITORS = [
  { name: "ACV Auctions", issues: ["Sends their own inspectors — adds days", "Black box pricing", "Corporate fees buried in fine print", "One-size-fits-all for mega groups and small lots", "No seller coaching or guidance"] },
  { name: "Manheim / OVE", issues: ["Owned by Cox Automotive — they compete with you", "Built for volume, not for the independent dealer", "Simulcast chaos — not built for speed", "Data stays theirs, not yours", "Physical lanes still required for best results"] },
  { name: "CarOffer", issues: ["Shut down transactions in August 2025", "Was acquired and gutted by CarGurus", "Gone."] },
];

const PILLARS = [
  { icon: "🔍", title: "We Inspect Differently", body: "No inspector needed. Dealers and sellers do it themselves — guided by AI silhouette overlays, angle-by-angle. Every photo is analyzed by forensic AI. We catch what humans miss and we log everything permanently." },
  { icon: "📋", title: "We Demand Disclosure", body: "Every vehicle comes with a full seller disclosure report — mechanical, electrical, climate, body, aftermarket mods, known issues. Signed and timestamped. Misrepresent a car and it follows you forever." },
  { icon: "🏆", title: "We Reward Integrity", body: "Bronze to Platinum. Every clean sale builds your score. Better scores mean lower fees, free tools, and homepage badges. Every bad actor gets a strike. Four strikes — you're out. For life." },
  { icon: "⚖️", title: "We Mediate Before We Arbitrate", body: "Disputes go through a 3-tier system. Direct resolution first. Then our mediation team. Then formal arbitration if needed. Most disputes never reach arbitration. That's by design." },
  { icon: "🤖", title: "The Ringman Never Sleeps", body: "AI that lives on every page. Not a chatbot. A presence. He reads your run list, coaches your listings, calls your auctions, and flags deals worth watching — at 2am if that's when you're working." },
  { icon: "📊", title: "Data That Compounds", body: "Every inspection, bid, sale, and arbitration feeds a proprietary intelligence engine. Over time that becomes pricing data, dealer profiles, and market reports nobody else can replicate." },
];

export default function WhyRingman() {
  useEffect(() => {
    document.title = "The Ringman's AI — Built by Auction People, For Auction People";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "The manifesto behind The Ringman's AI. Built by an automotive arbitration inspector who lived every problem this platform solves. Not ACV. Not Manheim. Something better.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "The Ringman's AI — Built by Auction People, For Auction People", "property");
    setMeta("og:description", "The manifesto behind The Ringman's AI. Built by an automotive arbitration inspector who lived every problem this platform solves. Not ACV. Not Manheim. Something better.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "The Ringman's AI — Built by Auction People, For Auction People");
    setMeta("twitter:description", "The manifesto behind The Ringman's AI. Built by an automotive arbitration inspector who lived every problem this platform solves. Not ACV. Not Manheim. Something better.");
  }, []);

  const [activeComp, setActiveComp] = useState(0);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <div style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🎩 The Ringman's AI</div>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: "#6b7280", fontSize: 13, textDecoration: "none", letterSpacing: 0.5 }}>{l.label}</a>)}
        </div>
        <a href="/" style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Get Started</a>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "100px 24px 80px", background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,182,212,0.07) 0%, transparent 70%)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#06b6d4", marginBottom: 20 }}>THE MANIFESTO</div>
        <h1 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, fontFamily: "'Georgia',serif", lineHeight: 1.05, margin: "0 0 28px" }}>
          We Understand<br />
          <span style={{ background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Auctions.</span>
        </h1>
        <p style={{ fontSize: "clamp(16px,2.5vw,22px)", color: "#9ca3af", maxWidth: 700, margin: "0 auto 40px", lineHeight: 1.8, fontFamily: "'Georgia',serif", fontStyle: "italic" }}>
          Not software people who toured an auction once.<br />Not a VC firm that saw a market gap on a spreadsheet.<br />People who have stood in the ring. Called the bids. Filed the arbitrations. Felt the handshake deals go sideways at 4pm on a Friday.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/ForIndependentDealers" style={{ padding: "14px 32px", borderRadius: 8, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontWeight: 800, fontSize: 15, textDecoration: "none", letterSpacing: 0.5 }}>I'm a Dealer</a>
          <a href="/SellYourCar" style={{ padding: "14px 32px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", color: "#e2e8f0", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>I'm a Private Seller</a>
        </div>
      </div>

      {/* THE PROBLEM */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#ef4444", marginBottom: 16 }}>THE PROBLEM</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>The old platforms forgot who they were built for.</h2>
          <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 600, margin: "0 auto" }}>They got big. They got corporate. They started building for investors instead of dealers. You can feel it every time you log in.</p>
        </div>

        {/* Competitor tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
          {COMPETITORS.map((c, i) => (
            <button key={c.name} onClick={() => setActiveComp(i)}
              style={{ padding: "10px 20px", borderRadius: 6, border: `1px solid ${activeComp === i ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.06)"}`, background: activeComp === i ? "rgba(239,68,68,0.1)" : "transparent", color: activeComp === i ? "#fca5a5" : "#6b7280", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
              {c.name}
            </button>
          ))}
        </div>
        <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 12, padding: 32, maxWidth: 700, margin: "0 auto" }}>
          {COMPETITORS[activeComp].issues.map((issue, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", borderBottom: i < COMPETITORS[activeComp].issues.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <span style={{ color: "#ef4444", fontSize: 18, marginTop: 1 }}>✕</span>
              <span style={{ color: "#d1d5db", fontSize: 15, lineHeight: 1.6 }}>{issue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* OUR PILLARS */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 16 }}>HOW WE'RE DIFFERENT</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Six things we do that nobody else does.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {PILLARS.map((p, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: "3px solid #06b6d4", borderRadius: "0 12px 12px 0", padding: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{p.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 10, color: "#f1f5f9" }}>{p.title}</div>
                <div style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.8 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* THE STAT BAR */}
      <div style={{ padding: "60px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32, textAlign: "center" }}>
          {[
            { value: "12", label: "Required inspection shots", sub: "per vehicle, AI-verified" },
            { value: "3", label: "Dispute resolution tiers", sub: "before a fine is issued" },
            { value: "4", label: "Strikes to permanent ban", sub: "zero tolerance for fraud" },
            { value: "6", label: "Revenue streams", sub: "built into one platform" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: "clamp(40px,5vw,60px)", fontWeight: 900, background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* THE ORIGIN */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#f59e0b", marginBottom: 24 }}>THE ORIGIN</div>
        <div style={{ fontSize: "clamp(18px,3vw,28px)", fontFamily: "'Georgia',serif", fontStyle: "italic", color: "#d1d5db", lineHeight: 1.9, marginBottom: 40 }}>
          "This platform was built by someone who has stood in the ring, called bids, filed arbitrations, and watched dealers get burned by bad disclosures and worse software. We didn't build this because we saw a market gap. We built it because we lived the problem."
        </div>
        <div style={{ fontSize: 14, color: "#6b7280", letterSpacing: 2, textTransform: "uppercase" }}>— William Chapman, Founder</div>
        <div style={{ fontSize: 13, color: "#4b5563", marginTop: 6 }}>Automotive Arbitration Inspector & Creator of The Ringman's AI</div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.08),rgba(139,92,246,0.08))", borderTop: "1px solid rgba(6,182,212,0.15)", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 20px" }}>Ready to auction the right way?</h2>
        <p style={{ color: "#6b7280", fontSize: 16, marginBottom: 40 }}>Join the platform built by auction people, for auction people.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/ForIndependentDealers" style={{ padding: "16px 36px", borderRadius: 8, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontWeight: 800, fontSize: 16, textDecoration: "none" }}>Independent Dealers →</a>
          <a href="/ForDealerGroups" style={{ padding: "16px 36px", borderRadius: 8, background: "linear-gradient(135deg,#8b5cf6,#7c3aed)", color: "white", fontWeight: 800, fontSize: 16, textDecoration: "none" }}>Dealer Groups →</a>
          <a href="/SellYourCar" style={{ padding: "16px 36px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", color: "#e2e8f0", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>Private Sellers →</a>
        </div>
      </div>

    </div>
  );
}
