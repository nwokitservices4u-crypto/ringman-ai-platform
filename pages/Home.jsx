import { useState, useEffect, useRef } from "react";
import { Auction, Vehicle, DealerProfile } from "@/api/entities";
import { Link, useLocation } from "react-router-dom";

const LOGO = "https://media.base44.com/images/public/69cecf03f993d438c489b18c/9e6040534_generated_image.png";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/RunList", label: "Run List" },
  { to: "/LiveAuction", label: "🔴 Live" },
  { to: "/Dashboard", label: "Dashboard" },
  { to: "/VehicleIntake", label: "Sell" },
  { to: "/Ringman", label: "🎩 Ringman" },
  { to: "/Forensics", label: "🔍 Forensics" },
  { to: "/VINScanner", label: "📷 VIN" },
  { to: "/WhyUs", label: "Why Us" },
  { to: "/FAQ", label: "FAQ" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(16,185,129,0.15)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <img src={LOGO} alt="Logo" style={{ width: 32, height: 32, borderRadius: "8px", objectFit: "cover" }} />
        <span style={{ fontWeight: "900", fontSize: "15px", color: "white", letterSpacing: "-0.5px" }}>The Ringman's <span style={{ color: "#10b981" }}>AI</span></span>
      </Link>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }} className="desktop-nav">
        {LINKS.map(l => (
          <Link key={l.to} to={l.to} style={{ color: loc.pathname === l.to ? "#10b981" : "#9ca3af", textDecoration: "none", fontSize: "13px", fontWeight: "600", padding: "6px 10px", borderRadius: "4px", background: loc.pathname === l.to ? "rgba(16,185,129,0.08)" : "transparent" }}>{l.label}</Link>
        ))}
      </div>
      <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: "white", fontSize: "22px", cursor: "pointer" }} className="hamburger">☰</button>
      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(8,8,16,0.98)", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px" }}>
          <button onClick={() => setOpen(false)} style={{ position: "absolute", top: "20px", right: "24px", background: "none", border: "none", color: "white", fontSize: "28px", cursor: "pointer" }}>✕</button>
          {LINKS.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ color: "white", textDecoration: "none", fontSize: "22px", fontWeight: "700" }}>{l.label}</Link>)}
        </div>
      )}
      <style>{`@media(max-width:768px){.desktop-nav{display:none!important}.hamburger{display:block!important}}`}</style>
    </nav>
  );
}

function RingmanWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "ai", text: "Hey! I'm The Ringman 🎩 — ask me anything about buying, selling, or bidding." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  const send = async () => {
    if (!input.trim()) return;
    const q = input.trim();
    setInput("");
    setMsgs(m => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await fetch("https://chap-c489b18c.base44.app/functions/ringmanChat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, page: "Home", session_id: "home_" + Date.now() })
      });
      const data = await res.json();
      setMsgs(m => [...m, { role: "ai", text: data.response || "I'll get back to you on that." }]);
    } catch { setMsgs(m => [...m, { role: "ai", text: "Having trouble connecting — try again in a moment." }]); }
    setLoading(false);
  };
  return (
    <>
      <button onClick={() => setOpen(!open)} style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 999, background: "linear-gradient(135deg,#10b981,#059669)", color: "white", border: "none", borderRadius: "50px", padding: "14px 22px", fontWeight: "800", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 24px rgba(16,185,129,0.4)", display: "flex", alignItems: "center", gap: "8px" }}>🎩 Ask The Ringman</button>
      {open && (
        <div style={{ position: "fixed", bottom: "80px", right: "24px", zIndex: 998, width: "340px", maxHeight: "480px", background: "#0f0f1a", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "12px", display: "flex", flexDirection: "column", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(16,185,129,0.15)", fontWeight: "800", fontSize: "14px", color: "#10b981" }}>🎩 The Ringman's AI</div>
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", background: m.role === "user" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)", color: m.role === "user" ? "#10b981" : "#e5e7eb", padding: "8px 12px", borderRadius: "8px", fontSize: "13px", maxWidth: "90%" }}>{m.text}</div>
            ))}
            {loading && <div style={{ alignSelf: "flex-start", color: "#4b5563", fontSize: "13px" }}>Thinking…</div>}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(16,185,129,0.1)", display: "flex", gap: "8px" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask anything…" style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "6px", padding: "8px 12px", color: "white", fontSize: "13px", outline: "none" }} />
            <button onClick={send} style={{ background: "#10b981", color: "white", border: "none", borderRadius: "6px", padding: "8px 14px", cursor: "pointer", fontWeight: "700", fontSize: "13px" }}>→</button>
          </div>
        </div>
      )}
    </>
  );
}

// Cinematic intro
const RINGMAN_LINES = [
  { text: "Ladies and gentlemen...", delay: 500, duration: 2200 },
  { text: "Welcome to the auction floor.", delay: 2800, duration: 2000 },
  { text: "Where every deal starts with a ring.", delay: 5000, duration: 2400 },
  { text: "I'm The Ringman.", delay: 7600, duration: 2000 },
  { text: "And I never miss a sale.", delay: 9800, duration: 2200 },
];

function Intro({ onComplete }) {
  const [phase, setPhase] = useState("smoke");
  const [smokeOpacity, setSmokeOpacity] = useState(1);
  const [ringScale, setRingScale] = useState(0);
  const [ringOpacity, setRingOpacity] = useState(0);
  const [hatY, setHatY] = useState(-120);
  const [hatOpacity, setHatOpacity] = useState(0);
  const [currentLine, setCurrentLine] = useState(-1);
  const [exitOpacity, setExitOpacity] = useState(1);
  const [particles, setParticles] = useState([]);
  const [smokeParticles, setSmokeParticles] = useState([]);

  useEffect(() => {
    const smokes = Array.from({ length: 28 }, (_, i) => ({
      id: i, x: 30 + Math.random() * 40, delay: Math.random() * 2,
      size: 40 + Math.random() * 80, duration: 3 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 120,
    }));
    setSmokeParticles(smokes);
    const ps = Array.from({ length: 20 }, (_, i) => ({
      id: i, x: 20 + Math.random() * 60, y: 20 + Math.random() * 60,
      size: 2 + Math.random() * 4, delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 2,
    }));
    setParticles(ps);

    const t1 = setTimeout(() => { setSmokeOpacity(0); setPhase("ring"); setTimeout(() => { setRingScale(1); setRingOpacity(1); }, 200); }, 2000);
    const t2 = setTimeout(() => { setPhase("hat"); setHatY(0); setHatOpacity(1); }, 3800);
    const t3 = setTimeout(() => { setPhase("speak"); }, 5200);
    RINGMAN_LINES.forEach((line, i) => {
      setTimeout(() => setCurrentLine(i), line.delay + 5200);
      setTimeout(() => setCurrentLine(-1), line.delay + line.duration + 5200);
    });
    const t4 = setTimeout(() => { setExitOpacity(0); setTimeout(onComplete, 800); }, 16000);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <div onClick={onComplete} style={{ position: "fixed", inset: 0, background: "#000", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", opacity: exitOpacity, transition: "opacity 0.8s ease", cursor: "pointer" }}>
      <div style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", width: "300px", height: "300px", pointerEvents: "none" }}>
        {smokeParticles.map(p => (
          <div key={p.id} style={{ position: "absolute", bottom: 0, left: `${p.x}%`, width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,180,180,0.15) 0%, transparent 70%)", opacity: smokeOpacity, transition: "opacity 1.5s ease", animation: `smokeRise ${p.duration}s ${p.delay}s ease-out infinite`, transform: `translateX(${p.drift}px)` }} />
        ))}
      </div>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "0px" }}>
        <div style={{ fontSize: "clamp(80px,15vw,140px)", lineHeight: 1, opacity: hatOpacity, transform: `translateY(${hatY}px)`, transition: "transform 1.2s cubic-bezier(0.34,1.56,0.64,1), opacity 0.8s ease", filter: hatOpacity ? "drop-shadow(0 0 40px rgba(255,215,0,0.6))" : "none" }}>🎩</div>
        <div style={{ width: "clamp(100px,18vw,160px)", height: "clamp(100px,18vw,160px)", borderRadius: "50%", border: "6px solid #ffd700", opacity: ringOpacity, transform: `scale(${ringScale})`, transition: "transform 1s cubic-bezier(0.34,1.56,0.64,1), opacity 0.6s ease", boxShadow: ringOpacity ? "0 0 60px rgba(255,215,0,0.8), 0 0 120px rgba(255,215,0,0.4), inset 0 0 40px rgba(255,215,0,0.1)" : "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "70%", height: "70%", borderRadius: "50%", border: "3px solid rgba(255,215,0,0.3)" }} />
        </div>
        {particles.map(p => (
          <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%", background: "#ffd700", opacity: ringOpacity * 0.8, animation: `sparkle ${p.duration}s ${p.delay}s ease-in-out infinite` }} />
        ))}
      </div>
      <div style={{ position: "absolute", bottom: "18%", left: "50%", transform: "translateX(-50%)", textAlign: "center", minHeight: "60px" }}>
        {currentLine >= 0 && (
          <div style={{ color: "white", fontSize: "clamp(18px,3vw,28px)", fontWeight: "300", fontStyle: "italic", letterSpacing: "0.05em", textShadow: "0 0 30px rgba(255,215,0,0.5)", animation: "fadeInUp 0.5s ease" }}>
            {RINGMAN_LINES[currentLine]?.text}
          </div>
        )}
      </div>
      <div style={{ position: "absolute", bottom: "8%", color: "rgba(255,255,255,0.25)", fontSize: "12px", letterSpacing: "2px" }}>tap to skip</div>
      <style>{`
        @keyframes smokeRise { 0%{transform:translateY(0) scale(1);opacity:0.3} 100%{transform:translateY(-200px) scale(2);opacity:0} }
        @keyframes sparkle { 0%,100%{opacity:0;transform:scale(0)} 50%{opacity:0.8;transform:scale(1)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

const FEATURES = [
  { icon: "🤖", title: "Ringman AI Assistant", desc: "An intelligent AI guide lives on every page. Bidders get real-time help with grades, increments, and proxy bidding. Sellers get answers about pricing, condition reports, and listing requirements." },
  { icon: "💰", title: "AI Pricing Engine", desc: "Enter a VIN and get an instant wholesale market estimate. AI analyzes year, make, mileage, condition, and market trends to generate a suggested floor price — typically 88% of estimated value." },
  { icon: "📡", title: "Live Simulcast Bidding", desc: "Dealers in the lane and dealers online compete in the exact same auction simultaneously. Every bid reflects instantly on all screens. True real-time simulcast, not a delayed relay." },
  { icon: "⚡", title: "Flash Auctions (20-Min)", desc: "Vehicles go live at a scheduled time and close exactly 20 minutes later. Fast, clean, creates real urgency. Perfect for dealers who want to move inventory quickly." },
  { icon: "🤝", title: "IF-SALE Negotiation Engine", desc: "When a vehicle falls short of floor, the IF-SALE engine auto-activates. Buyer submits an offer, seller accepts, declines, or counters — zero staff involvement." },
  { icon: "📋", title: "Condition Reports & Grading", desc: "Every listing includes a structured 1–5 grade, written condition description, damage notes, Carfax link, and multi-angle photos. AI assists grading to reduce disputes." },
  { icon: "🔨", title: "Auctioneer Console", desc: "Tablet-optimized interface built for ringmen and clerks. Full vehicle details, live bid feed, increment controls, lot advancement, and IF-SALE flagging. Built for speed under pressure." },
  { icon: "📊", title: "BI Dashboard & Analytics", desc: "Real-time analytics: sold rate, average sale price vs. estimate, bidder activity, top makes/models, revenue from fees, payment pipeline, and title/transport tracking." },
  { icon: "🔍", title: "SEO-Indexed Vehicle Pages", desc: "Every vehicle gets its own Google-indexed page with structured JSON-LD data. Your auction drives organic search traffic no competitor can touch." },
  { icon: "🔑", title: "VIN Decode (NHTSA)", desc: "Enter a VIN, hit Decode — year, make, model, trim, engine, transmission, drivetrain auto-fill instantly from the official NHTSA database." },
  { icon: "🏢", title: "Dealer CRM", desc: "Every dealer has a full profile: license number, payment method, floor plan provider, buyer/seller ratings, transaction history, and admin notes." },
  { icon: "📦", title: "Post-Sale Workflow", desc: "Invoices auto-generate at close. Payment, title transfer, and transport tracked from start to finish inside the platform. No spreadsheets, no phone tag." },
];

const STEPS = [
  { n: "01", title: "Register as a Dealer", body: "Submit your dealer license, business info, and payment method. No upfront fees. Approval in 1–2 business days." },
  { n: "02", title: "Browse the Run List", body: "Preview every vehicle before bidding opens — photos, condition grade, VIN, AI estimated value, floor price, and full condition report." },
  { n: "03", title: "Bid Live or Set a Proxy", body: "Bid in real time from any device when the auction goes live. Or set a proxy max and let the system auto-compete for you." },
  { n: "04", title: "IF-SALE or Close", body: "Sold above floor — invoice generated instantly. Below floor — IF-SALE activates and buyer/seller negotiate automatically." },
  { n: "05", title: "Post-Sale in One Place", body: "Invoice, payment tracking, title transfer, and transport coordination — all inside the platform, tracked through delivery." },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(() => {
    const seen = sessionStorage.getItem("intro_seen");
    if (seen) return false;
    sessionStorage.setItem("intro_seen", "1");
    return true;
  });
  const [auctions, setAuctions] = useState([]);
  const [stats, setStats] = useState({ live: 0, scheduled: 0, vehicles: 0, dealers: 0 });

  useEffect(() => {
    document.title = "The Ringman's AI — AI-Powered Dealer Wholesale Auto Auction Platform";
    Auction.list().then(d => {
      setAuctions(d.filter(a => ["Live","Scheduled"].includes(a.status)).slice(0, 6));
      setStats(s => ({ ...s, live: d.filter(a => a.status === "Live").length, scheduled: d.filter(a => a.status === "Scheduled").length }));
    });
    Vehicle.list().then(d => setStats(s => ({ ...s, vehicles: d.length })));
    DealerProfile.list().then(d => setStats(s => ({ ...s, dealers: d.length })));
  }, []);

  const auctionColor = s => ({ Live: "#10b981", Scheduled: "#3b82f6", Completed: "#4b5563", Cancelled: "#ef4444" }[s] || "#6b7280");

  if (showIntro) return <Intro onComplete={() => setShowIntro(false)} />;

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />

      {/* HERO */}
      <div style={{ padding: "90px 32px 70px", textAlign: "center", maxWidth: "960px", margin: "0 auto" }}>
        <img src={LOGO} alt="The Ringman's AI" style={{ width: 88, height: 88, borderRadius: "20px", objectFit: "cover", marginBottom: "28px", border: "2px solid rgba(16,185,129,0.3)", boxShadow: "0 0 60px rgba(16,185,129,0.2)" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "3px", padding: "6px 18px", fontSize: "12px", color: "#10b981", fontWeight: "700", marginBottom: "28px", letterSpacing: "2px", textTransform: "uppercase" }}>
          <span style={{ width: 6, height: 6, background: "#10b981", borderRadius: "50%", display: "inline-block" }}></span>
          AI-Powered · Dealer-to-Dealer · Wholesale Auction Platform
        </div>
        <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: "900", lineHeight: "1.05", margin: "0 0 22px", letterSpacing: "-2px" }}>
          The Future of<br />
          <span style={{ background: "linear-gradient(135deg,#10b981,#67eeff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Wholesale Auto Auctions</span>
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", maxWidth: "680px", margin: "0 auto 14px", lineHeight: "1.75" }}>
          Live simulcast bidding, AI-generated pricing, automated IF-SALE negotiations, full post-sale workflow, and an AI assistant on every page — one platform you actually own.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "40px" }}>
          <Link to="/RunList" style={{ background: "linear-gradient(135deg,#10b981,#059669)", color: "white", padding: "15px 32px", borderRadius: "4px", textDecoration: "none", fontWeight: "800", fontSize: "16px" }}>Browse Run List →</Link>
          <Link to="/Dealers" style={{ background: "rgba(16,185,129,0.08)", color: "#10b981", padding: "15px 28px", borderRadius: "4px", textDecoration: "none", fontWeight: "700", fontSize: "15px", border: "1px solid rgba(16,185,129,0.25)" }}>Register as a Dealer</Link>
          <Link to="/WhyUs" style={{ background: "rgba(255,255,255,0.04)", color: "#888", padding: "15px 28px", borderRadius: "4px", textDecoration: "none", fontWeight: "700", fontSize: "15px", border: "1px solid rgba(255,255,255,0.08)" }}>See How We Compare</Link>
        </div>
      </div>

      {/* STATS */}
      <div style={{ maxWidth: "860px", margin: "0 auto 70px", background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "4px", display: "flex", flexWrap: "wrap" }}>
        {[["🔴", "Live Auctions", stats.live], ["📅", "Scheduled", stats.scheduled], ["🚗", "Vehicles Listed", stats.vehicles], ["🏢", "Dealers", stats.dealers]].map(([icon, label, val]) => (
          <div key={label} style={{ flex: "1 1 160px", padding: "24px", textAlign: "center", borderRight: "1px solid rgba(16,185,129,0.08)" }}>
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>{icon}</div>
            <div style={{ fontSize: "32px", fontWeight: "900", color: "#10b981" }}>{val}</div>
            <div style={{ fontSize: "12px", color: "#4b5563", marginTop: "4px", fontWeight: "600" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* UPCOMING AUCTIONS */}
      {auctions.length > 0 && (
        <div style={{ maxWidth: "960px", margin: "0 auto 70px", padding: "0 32px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 20px" }}>Upcoming Auctions</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "16px" }}>
            {auctions.map(a => (
              <Link key={a.id} to="/RunList" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "20px", textDecoration: "none", color: "white", display: "block" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div style={{ fontWeight: "800", fontSize: "15px" }}>{a.name}</div>
                  <span style={{ background: auctionColor(a.status) + "22", color: auctionColor(a.status), fontSize: "11px", fontWeight: "700", padding: "3px 8px", borderRadius: "3px" }}>{a.status}</span>
                </div>
                <div style={{ fontSize: "13px", color: "#4b5563" }}>{a.auction_date} · {a.format}</div>
                <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px" }}>{a.total_lots || 0} lots</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FEATURES */}
      <div style={{ maxWidth: "960px", margin: "0 auto 80px", padding: "0 32px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 8px", textAlign: "center" }}>Everything You Need to Run a Wholesale Auction</h2>
        <p style={{ color: "#4b5563", textAlign: "center", margin: "0 0 40px", fontSize: "15px" }}>Built for auctioneers, dealers, and ringmen who actually know how this business works.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "16px" }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "8px", padding: "22px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{f.icon}</div>
              <div style={{ fontWeight: "800", fontSize: "15px", marginBottom: "8px", color: "#f0fdf4" }}>{f.title}</div>
              <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.65" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ maxWidth: "860px", margin: "0 auto 80px", padding: "0 32px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 8px", textAlign: "center" }}>How It Works</h2>
        <p style={{ color: "#4b5563", textAlign: "center", margin: "0 0 40px", fontSize: "15px" }}>From registration to post-sale — the whole lifecycle in one platform.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {STEPS.map(s => (
            <div key={s.n} style={{ display: "flex", gap: "20px", alignItems: "flex-start", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "20px 24px" }}>
              <div style={{ fontSize: "28px", fontWeight: "900", color: "#10b981", opacity: 0.4, fontVariantNumeric: "tabular-nums", minWidth: "40px" }}>{s.n}</div>
              <div>
                <div style={{ fontWeight: "800", fontSize: "15px", marginBottom: "6px" }}>{s.title}</div>
                <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.65" }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "60px 32px 80px", borderTop: "1px solid rgba(16,185,129,0.08)" }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: "900", margin: "0 0 16px" }}>Ready to Run a Smarter Auction?</h2>
        <p style={{ color: "#4b5563", margin: "0 0 36px", fontSize: "16px" }}>Join the platform built by people who've actually stood in the ring.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/Dealers" style={{ background: "linear-gradient(135deg,#10b981,#059669)", color: "white", padding: "16px 36px", borderRadius: "4px", textDecoration: "none", fontWeight: "800", fontSize: "16px" }}>Get Started Free →</Link>
          <Link to="/FAQ" style={{ background: "rgba(255,255,255,0.04)", color: "#888", padding: "16px 28px", borderRadius: "4px", textDecoration: "none", fontWeight: "700", fontSize: "15px", border: "1px solid rgba(255,255,255,0.08)" }}>Read the FAQ</Link>
        </div>
      </div>

      <RingmanWidget />
    </div>
  );
}
