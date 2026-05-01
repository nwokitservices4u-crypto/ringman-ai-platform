import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "For Dealers", href: "/ForIndependentDealers" },
  { label: "Dealer Groups", href: "/ForDealerGroups" },
  { label: "Private Sellers", href: "/SellYourCar" },
  { label: "The Inspection", href: "/TheInspection" },
  { label: "Integrity", href: "/IntegritySystem" },
  { label: "Why Ringman", href: "/WhyRingman" },
];

const FREE_SCAN_LOCATIONS = [
  { name: "AutoZone", note: "Free scan + printed results — just ask" },
  { name: "O'Reilly Auto Parts", note: "Free diagnostic scan, no appointment needed" },
  { name: "Advance Auto Parts", note: "Free scan with printed code report" },
  { name: "NAPA Auto Parts", note: "Free scan at most locations" },
  { name: "Pep Boys", note: "Free scan, most locations" },
  { name: "Firestone", note: "Free inspection at select locations" },
];

const STEPS = [
  { num: "01", icon: "🚗", title: "Tell Us About Your Vehicle", body: "VIN number or license plate scan. We pull every piece of data on your vehicle from federal databases — year, make, model, trim, engine, recalls, everything. You confirm it's right." },
  { num: "02", icon: "📸", title: "Complete the Guided Inspection", body: "12 required photos with silhouette overlays showing you exactly where to stand and what to capture. Then an undercarriage video — just lay your phone flat and drive over it. No special equipment needed." },
  { num: "03", icon: "📋", title: "Complete Your Disclosure Report", body: "Tell buyers what you know. Mechanical condition, electrical, climate, any mods you've done, any issues you know about. Be honest — it protects you and it sells the car. Buyers trust sellers who disclose." },
  { num: "04", icon: "⚡", title: "It Goes Live in a Flash Auction", body: "Licensed dealers across the country bid on your vehicle in real time. 20-minute auction format — fast, competitive, no waiting around for weeks like a private sale." },
  { num: "05", icon: "💰", title: "Get Paid. Arrange Transport.", body: "Accept the winning bid, sign the paperwork digitally, and book transport through Ringman Transport — powered by Montway, the nation's most trusted carrier. Your vehicle is picked up and you get paid." },
];

const FLAGS = [
  { flag: "🟢 Green — All Clear", desc: "Full inspection complete, disclosure signed, OBD clean. Goes straight to the run list." },
  { flag: "🟡 Yellow — Minor Gaps", desc: "A few optional items missing. Can list with a notation. Buyers can see exactly what's missing." },
  { flag: "🔴 Red — Hold", desc: "Required items missing or a conflict detected. We'll tell you exactly what to fix before it lists." },
  { flag: "⛔ Black — Admin Review", desc: "Something doesn't add up. Our team reviews before anything goes live. Rare — but it happens." },
];

export default function SellYourCar() {
  useEffect(() => {
    document.title = "Sell Your Car — Get Dealer Money Without the Dealership";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "List your vehicle in a live dealer auction and get competitive bids from licensed dealers across the country. Free to browse. Easy 20-minute inspection. No games.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "Sell Your Car — Get Dealer Money Without the Dealership", "property");
    setMeta("og:description", "List your vehicle in a live dealer auction and get competitive bids from licensed dealers across the country. Free to browse. Easy 20-minute inspection. No games.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Sell Your Car — Get Dealer Money Without the Dealership");
    setMeta("twitter:description", "List your vehicle in a live dealer auction and get competitive bids from licensed dealers across the country. Free to browse. Easy 20-minute inspection. No games.");
  }, []);

  const [showScanHelp, setShowScanHelp] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: l.href === "/SellYourCar" ? "#10b981" : "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <a href="/" style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#10b981,#059669)", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Sell My Car</a>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "100px 24px 80px", background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)" }}>
        <div style={{ display: "inline-block", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 20, padding: "6px 16px", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#34d399", marginBottom: 24 }}>For Private Sellers</div>
        <h1 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 900, fontFamily: "'Georgia',serif", lineHeight: 1.05, margin: "0 0 24px" }}>
          Get dealer money.<br />
          <span style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Skip the dealership games.</span>
        </h1>
        <p style={{ fontSize: "clamp(16px,2.5vw,20px)", color: "#9ca3af", maxWidth: 620, margin: "0 auto 48px", lineHeight: 1.8, fontFamily: "'Georgia',serif", fontStyle: "italic" }}>
          When you sell to a dealership, they profit on the spread. When you sell here, licensed dealers compete for your vehicle directly. You get the spread.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/" style={{ padding: "16px 36px", borderRadius: 8, background: "linear-gradient(135deg,#10b981,#059669)", color: "white", fontWeight: 800, fontSize: 16, textDecoration: "none" }}>Start My Listing →</a>
          <button onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: "16px 36px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db", fontWeight: 700, fontSize: 16, background: "transparent", cursor: "pointer" }}>How It Works</button>
        </div>
      </div>

      {/* THE HONEST PART */}
      <div style={{ background: "rgba(16,185,129,0.04)", borderTop: "1px solid rgba(16,185,129,0.1)", borderBottom: "1px solid rgba(16,185,129,0.1)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#10b981", marginBottom: 16 }}>THE HONEST PART</div>
          <h2 style={{ fontSize: "clamp(20px,3vw,32px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>We ask for everything. Because buyers deserve to know.</h2>
          <p style={{ color: "#9ca3af", fontSize: 15, lineHeight: 1.8 }}>We're going to ask you to do a full inspection, a full disclosure, and an OBD scan. That sounds like a lot. It's about 20 minutes. And it's why buyers on this platform pay more than they would at a blind auction — because they trust the data. More trust = better bids = more money for you.</p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how-it-works" style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#10b981", marginBottom: 12 }}>THE PROCESS</div>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Five steps. One sold vehicle.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 24, alignItems: "flex-start", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: 28 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#10b981", fontWeight: 900, letterSpacing: 2, marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontSize: 32 }}>{s.icon}</div>
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.8 }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OBD HELP SECTION */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 12, padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showScanHelp ? 20 : 0 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#fbbf24", marginBottom: 4 }}>⚠️ Check Engine Light On?</div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>No OBD scanner? No problem. Get a free scan at any of these locations.</div>
            </div>
            <button onClick={() => setShowScanHelp(!showScanHelp)}
              style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.1)", color: "#fbbf24", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
              {showScanHelp ? "Hide" : "Show Locations"}
            </button>
          </div>
          {showScanHelp && (
            <div>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>Ask for a <strong style={{ color: "#fbbf24" }}>printed results sheet</strong> — then upload a photo of it to complete your OBD submission. It's free at all of these:</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
                {FREE_SCAN_LOCATIONS.map((loc, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "12px 16px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{loc.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{loc.note}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 13, color: "#6b7280", fontStyle: "italic" }}>
                💡 Tip: If a shop finds serious codes, it's better to know now and disclose them than have a buyer discover them and file a dispute after the sale.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FLAG SYSTEM */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>HOW WE REVIEW YOUR LISTING</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>AI reviews every submission. You'll always know your status.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FLAGS.map((f, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "18px 24px" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>{f.flag}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 10, padding: "16px 20px", fontSize: 14, color: "#9ca3af", lineHeight: 1.7 }}>
            <strong style={{ color: "#10b981" }}>Important:</strong> If our AI detects a warning light in any of your photos but you indicated no warning lights in your disclosure — we'll flag the conflict and ask you to clarify. This protects you from a dispute after the sale. We're on your side.
          </div>
        </div>
      </div>

      {/* WHY SELL HERE vs DEALERSHIP */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Why sell here instead of a dealership?</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)", borderRadius: 12, padding: 28 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#ef4444", marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>Selling to a Dealership</div>
            {["They know what your car is worth — you don't", "They profit on the spread between what they pay you and what they sell it for", "One offer. Take it or leave it.", "They control the entire process", "You might wait weeks for them to decide"].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ color: "#ef4444" }}>✕</span>
                <span style={{ fontSize: 13, color: "#9ca3af" }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 12, padding: 28 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#10b981", marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>Selling on Ringman's AI</div>
            {["AI shows you what your car is worth before you list", "Dealers compete — multiple bids drive the price up", "You set the floor. Nobody buys below it.", "You control the listing, the price, the timeline", "20-minute auctions — fast, competitive, done"].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ color: "#10b981" }}>✓</span>
                <span style={{ fontSize: 13, color: "#d1d5db" }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(6,182,212,0.06))", borderTop: "1px solid rgba(16,185,129,0.12)", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>Your car deserves a real auction.</h2>
        <p style={{ color: "#6b7280", fontSize: 16, marginBottom: 40 }}>Start your listing for free. It takes about 20 minutes. Dealers are waiting.</p>
        <a href="/" style={{ padding: "18px 48px", borderRadius: 8, background: "linear-gradient(135deg,#10b981,#059669)", color: "white", fontWeight: 800, fontSize: 18, textDecoration: "none", letterSpacing: 1 }}>START MY LISTING →</a>
      </div>

    </div>
  );
}
