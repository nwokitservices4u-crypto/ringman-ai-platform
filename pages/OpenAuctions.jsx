import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Auctions", href: "/RunList" },
  { label: "Classifieds", href: "/Classifieds" },
  { label: "Open Auctions", href: "/OpenAuctions" },
  { label: "News", href: "/NewsRoom" },
  { label: "Pricing", href: "/Pricing" },
  { label: "Why Ringman", href: "/WhyRingman" },
];

const AUCTION_TYPES = [
  { id: "flash", label: "⚡ Flash", desc: "20-min running vehicles", color: "#06b6d4" },
  { id: "push", label: "🚗 Push", desc: "Won't drive, has value", color: "#f59e0b" },
  { id: "deadrow", label: "💀 Dead Row", desc: "Non-runners, parts", color: "#ef4444" },
  { id: "open", label: "🌐 Open", desc: "Public, any buyer", color: "#10b981" },
];

const SAMPLE_AUCTIONS = [
  { id: 1, type: "open", year: 2020, make: "Ford", model: "Explorer", trim: "XLT", mileage: 61000, currentBid: 18400, reserveMet: true, bids: 14, endsIn: 3600 * 2 + 1240, photos: 12, city: "Tulsa", state: "OK", condition: "Good", verified: true, seller: "Chapman Auto", sellerScore: "Gold" },
  { id: 2, type: "flash", year: 2018, make: "Chevrolet", model: "Tahoe", trim: "LT", mileage: 94000, currentBid: 22100, reserveMet: false, bids: 7, endsIn: 1200, photos: 10, city: "OKC", state: "OK", condition: "Fair", verified: false, seller: "Private Seller", sellerScore: "Bronze" },
  { id: 3, type: "push", year: 2017, make: "Ram", model: "2500", trim: "Big Horn", mileage: 132000, currentBid: 8900, reserveMet: true, bids: 5, endsIn: 7200, photos: 9, city: "Dallas", state: "TX", condition: "Rough", verified: false, seller: "DFW Wholesale", sellerScore: "Silver" },
  { id: 4, type: "open", year: 2022, make: "Toyota", model: "Camry", trim: "SE", mileage: 31000, currentBid: 21500, reserveMet: true, bids: 22, endsIn: 5400, photos: 14, city: "Wichita", state: "KS", condition: "Excellent", verified: true, seller: "Verified Dealer", sellerScore: "Platinum" },
  { id: 5, type: "deadrow", year: 2016, make: "Honda", model: "Accord", trim: "EX", mileage: 178000, currentBid: 1200, reserveMet: false, bids: 3, endsIn: 14400, photos: 8, city: "Memphis", state: "TN", condition: "Rough", verified: false, seller: "City Salvage", sellerScore: "Silver" },
  { id: 6, type: "open", year: 2019, make: "Jeep", model: "Cherokee", trim: "Latitude", mileage: 73000, currentBid: 15600, reserveMet: true, bids: 11, endsIn: 900, photos: 11, city: "KC", state: "MO", condition: "Good", verified: true, seller: "MO Auto Group", sellerScore: "Gold" },
];

const SCORE_COLORS = { Bronze: "#cd7f32", Silver: "#94a3b8", Gold: "#f59e0b", Platinum: "#06b6d4" };
const COND_COLORS = { Excellent: "#10b981", Good: "#06b6d4", Fair: "#f59e0b", Rough: "#ef4444" };
const TYPE_COLORS = { flash: "#06b6d4", push: "#f59e0b", deadrow: "#ef4444", open: "#10b981" };
const TYPE_LABELS = { flash: "⚡ Flash", push: "🚗 Push", deadrow: "💀 Dead Row", open: "🌐 Open" };

function formatTime(seconds) {
  if (seconds <= 0) return "ENDED";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s.toString().padStart(2, "0")}s`;
  return `${s}s`;
}

function RegisterWall({ action, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#0f0f1a", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 16, padding: 48, textAlign: "center", maxWidth: 420 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎩</div>
        <h3 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 12px", fontFamily: "'Georgia',serif" }}>
          {action === "bid" ? "Place Your Bid" : "List Your Vehicle"}
        </h3>
        <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>
          {action === "bid"
            ? "Create a free account to place bids on open auctions. No dealer license required — just register and start bidding."
            : "Register to list your vehicle in an open auction. Listing fee from $9.99. 1.5% success fee on sale."}
        </p>
        <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 8, padding: "12px 16px", marginBottom: 24, textAlign: "left" }}>
          <div style={{ fontSize: 12, color: "#10b981", fontWeight: 700, marginBottom: 8 }}>✓ What you get free:</div>
          {["Browse all active auctions", "View full inspection reports", "See current bids and history", "Watch list any vehicle"].map((f, i) => (
            <div key={i} style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>· {f}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="/" style={{ padding: "14px", borderRadius: 8, background: "linear-gradient(135deg,#10b981,#059669)", color: "white", fontWeight: 800, fontSize: 15, textDecoration: "none" }}>Create Free Account →</a>
          <a href="/" style={{ padding: "14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Already have an account? Sign In</a>
          <button onClick={onClose} style={{ padding: "10px", background: "transparent", border: "none", color: "#4b5563", cursor: "pointer", fontSize: 13 }}>Continue Browsing</button>
        </div>
      </div>
    </div>
  );
}

export default function OpenAuctions() {
  useEffect(() => {
    document.title = "Open Auctions — Live Vehicle Bidding Open to Everyone | Ringman's AI";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Live vehicle auctions open to all registered users. Flash, Push, Dead Row, and Open formats. Real-time bidding with countdown timers. Register free to bid or list.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "Open Auctions — Live Vehicle Bidding Open to Everyone | Ringman's AI", "property");
    setMeta("og:description", "Live vehicle auctions open to all registered users. Flash, Push, Dead Row, and Open formats. Real-time bidding with countdown timers. Register free to bid or list.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Open Auctions — Live Vehicle Bidding Open to Everyone | Ringman's AI");
    setMeta("twitter:description", "Live vehicle auctions open to all registered users. Flash, Push, Dead Row, and Open formats. Real-time bidding with countdown timers. Register free to bid or list.");
  }, []);

  const [wall, setWall] = useState(null);
  const [activeType, setActiveType] = useState("All");
  const [timers, setTimers] = useState({});
  const [sortBy, setSortBy] = useState("ending");

  useEffect(() => {
    const init = {};
    SAMPLE_AUCTIONS.forEach(a => { init[a.id] = a.endsIn; });
    setTimers(init);
    const interval = setInterval(() => {
      setTimers(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(k => { if (next[k] > 0) next[k]--; });
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filtered = SAMPLE_AUCTIONS.filter(a => activeType === "All" || a.type === activeType)
    .sort((a, b) => sortBy === "ending" ? (timers[a.id] || 0) - (timers[b.id] || 0) : sortBy === "bid_high" ? b.currentBid - a.currentBid : b.bids - a.bids);

  const totalActive = SAMPLE_AUCTIONS.length;
  const totalBids = SAMPLE_AUCTIONS.reduce((s, a) => s + a.bids, 0);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {wall && <RegisterWall action={wall} onClose={() => setWall(null)} />}

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 20 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: l.href === "/OpenAuctions" ? "#10b981" : "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <button onClick={() => setWall("list")} style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#10b981,#059669)", color: "white", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>+ List in Auction</button>
      </nav>

      {/* HERO */}
      <div style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)", padding: "60px 24px 40px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#10b981", marginBottom: 12 }}>OPEN AUCTIONS</div>
          <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>
            Real auctions.<br />
            <span style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Open to everyone.</span>
          </h1>
          <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 520, margin: "0 auto 24px" }}>Browse free. Register to bid or list. Flash, Push, Dead Row, and Open format auctions — all in one place.</p>

          {/* Live stats */}
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: 13, color: "#10b981", fontWeight: 700 }}>LIVE</span>
            </div>
            <span style={{ fontSize: 13, color: "#6b7280" }}>{totalActive} active auctions</span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>{totalBids} total bids today</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px 80px", display: "grid", gridTemplateColumns: "1fr 280px", gap: 28 }}>

        {/* MAIN */}
        <div>
          {/* Type filter + sort */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={() => setActiveType("All")}
                style={{ padding: "7px 16px", borderRadius: 6, border: `1px solid ${activeType === "All" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.06)"}`, background: activeType === "All" ? "rgba(255,255,255,0.06)" : "transparent", color: activeType === "All" ? "#f1f5f9" : "#6b7280", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
                All Formats
              </button>
              {AUCTION_TYPES.map(t => (
                <button key={t.id} onClick={() => setActiveType(t.id)}
                  style={{ padding: "7px 16px", borderRadius: 6, border: `1px solid ${activeType === t.id ? t.color + "55" : "rgba(255,255,255,0.06)"}`, background: activeType === t.id ? t.color + "15" : "transparent", color: activeType === t.id ? t.color : "#6b7280", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
                  {t.label}
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, color: "#d1d5db", padding: "8px 12px", fontSize: 13, outline: "none" }}>
              <option value="ending" style={{ background: "#1a1a2e" }}>Ending Soonest</option>
              <option value="bid_high" style={{ background: "#1a1a2e" }}>Highest Bid</option>
              <option value="bids" style={{ background: "#1a1a2e" }}>Most Active</option>
            </select>
          </div>

          {/* Auction cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((a, i) => {
              const timeLeft = timers[a.id] || 0;
              const urgent = timeLeft < 300 && timeLeft > 0;
              return (
                <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${urgent ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.05)"}`, borderLeft: `3px solid ${TYPE_COLORS[a.type]}`, borderRadius: "0 12px 12px 0", padding: 20, display: "grid", gridTemplateColumns: "110px 1fr auto", gap: 20, alignItems: "center" }}>
                  {/* Photo */}
                  <div style={{ height: 80, borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: 22 }}>🚗</div>
                    <div style={{ fontSize: 10, color: "#4b5563", marginTop: 2 }}>{a.photos} photos</div>
                  </div>

                  {/* Info */}
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: TYPE_COLORS[a.type], background: TYPE_COLORS[a.type] + "15", border: `1px solid ${TYPE_COLORS[a.type]}33`, borderRadius: 4, padding: "2px 8px" }}>{TYPE_LABELS[a.type]}</span>
                      {a.verified && <span style={{ fontSize: 10, color: "#f59e0b", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 4, padding: "2px 8px" }}>🎩 Verified</span>}
                      <span style={{ fontSize: 11, color: SCORE_COLORS[a.sellerScore] }}>★ {a.sellerScore}</span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#f1f5f9", marginBottom: 4 }}>{a.year} {a.make} {a.model} <span style={{ color: "#6b7280", fontWeight: 400, fontSize: 13 }}>{a.trim}</span></div>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, color: "#9ca3af" }}>🔢 {a.mileage.toLocaleString()} mi</span>
                      <span style={{ fontSize: 12, color: "#9ca3af" }}>📍 {a.city}, {a.state}</span>
                      <span style={{ fontSize: 12, color: COND_COLORS[a.condition], fontWeight: 700 }}>● {a.condition}</span>
                      <span style={{ fontSize: 12, color: "#6b7280" }}>👤 {a.seller}</span>
                    </div>
                  </div>

                  {/* Bid panel */}
                  <div style={{ textAlign: "right", minWidth: 140 }}>
                    <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Current Bid</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#f1f5f9" }}>${a.currentBid.toLocaleString()}</div>
                    <div style={{ fontSize: 12, color: a.reserveMet ? "#10b981" : "#f59e0b", fontWeight: 700, marginBottom: 4 }}>{a.reserveMet ? "✓ Reserve Met" : "Reserve Not Met"}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{a.bids} bids</div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: urgent ? "#ef4444" : "#06b6d4", marginBottom: 10 }}>
                      {urgent && "🔴 "}{formatTime(timeLeft)}
                    </div>
                    <button onClick={() => setWall("bid")}
                      style={{ padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 13, background: urgent ? "linear-gradient(135deg,#ef4444,#b91c1c)" : "linear-gradient(135deg,#10b981,#059669)", color: "white", width: "100%" }}>
                      {urgent ? "🔥 Bid Now!" : "Place Bid"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* List CTA */}
          <div style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(6,182,212,0.06))", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>🎙️</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>List Your Vehicle</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 16, lineHeight: 1.6 }}>$9.99 listing fee. 1.5% success fee ($49 min). All formats — Flash, Push, Dead Row, Open.</div>
            <button onClick={() => setWall("list")}
              style={{ width: "100%", padding: "11px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: "linear-gradient(135deg,#10b981,#059669)", color: "white" }}>
              Start My Auction →
            </button>
          </div>

          {/* Format guide */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#6b7280", marginBottom: 16 }}>Auction Formats</div>
            {AUCTION_TYPES.map((t, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: i < AUCTION_TYPES.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.color, marginBottom: 2 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: "#4b5563" }}>{t.desc}</div>
              </div>
            ))}
          </div>

          {/* Ad space */}
          <div style={{ background: "rgba(6,182,212,0.04)", border: "1px dashed rgba(6,182,212,0.2)", borderRadius: 10, padding: 20, textAlign: "center", minHeight: 250, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#06b6d4", marginBottom: 8 }}>300×250 Ad Space</div>
            <div style={{ fontSize: 13, color: "#4b5563", marginBottom: 16 }}>Available for advertisers</div>
            <a href="/Advertising" style={{ padding: "8px 20px", borderRadius: 6, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>Book This Space →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
