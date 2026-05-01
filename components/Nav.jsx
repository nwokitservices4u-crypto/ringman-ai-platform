import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LOGO = "https://media.base44.com/images/public/69cecf03f993d438c489b18c/9e6040534_generated_image.png";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/RunList", label: "Run List" },
  { to: "/LiveAuction", label: "🔴 Live" },
  { to: "/Dashboard", label: "Dashboard" },
  { to: "/VehicleIntake", label: "Sell" },
  { to: "/Ringman", label: "🎩 The Ringman" },
  { to: "/Forensics", label: "🔍 Forensics" },
  { to: "/VINScanner", label: "📷 VIN Scanner" },
  { to: "/WhyUs", label: "Why Us" },
  { to: "/FAQ", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <nav style={{
        background: "rgba(12,12,16,0.95)",
        borderBottom: "1px solid rgba(0,229,255,0.12)",
        padding: "0 28px",
        height: "62px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(20px)",
        boxShadow: "0 1px 0 rgba(0,229,255,0.08), 0 4px 30px rgba(0,0,0,0.5)"
      }}>
        {/* LOGO */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ position: "relative" }}>
            <img src={LOGO} alt="The Ringman's AI" style={{ width: 34, height: 34, borderRadius: "6px", objectFit: "cover", border: "1px solid rgba(0,229,255,0.3)", display: "block" }} />
            <div style={{ position: "absolute", inset: -1, borderRadius: "6px", boxShadow: "0 0 12px rgba(0,229,255,0.3)", pointerEvents: "none" }}></div>
          </div>
          <div>
            <span style={{ fontWeight: "900", fontSize: "15px", color: "white", letterSpacing: "-0.5px" }}>THE RINGMAN'S </span>
            <span style={{ fontWeight: "900", fontSize: "15px", color: "#00e5ff", letterSpacing: "-0.5px", textShadow: "0 0 20px rgba(0,229,255,0.5)" }}>AI</span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }} className="desktop-nav">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: "7px 13px",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              background: pathname === l.to ? "rgba(0,229,255,0.1)" : "transparent",
              color: pathname === l.to ? "#00e5ff" : "#6b7280",
              borderBottom: pathname === l.to ? "1px solid #00e5ff" : "1px solid transparent",
              transition: "all 0.15s"
            }}>
              {l.label}
            </Link>
          ))}
          <Link to="/Dealers" style={{
            marginLeft: "12px",
            background: "linear-gradient(135deg, #00e5ff, #0099bb)",
            color: "#0c0c10",
            padding: "8px 18px",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "800",
            fontSize: "12px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            boxShadow: "0 0 20px rgba(0,229,255,0.2)"
          }}>
            Register →
          </Link>
        </div>

        {/* HAMBURGER */}
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: "#00e5ff", fontSize: "22px", cursor: "pointer" }} className="hamburger">
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div style={{ position: "fixed", top: "62px", left: 0, right: 0, background: "rgba(12,12,16,0.98)", borderBottom: "1px solid rgba(0,229,255,0.12)", zIndex: 99, padding: "12px 20px 20px", display: "flex", flexDirection: "column", gap: "4px", backdropFilter: "blur(20px)" }}>
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ padding: "12px 16px", borderRadius: "4px", textDecoration: "none", fontSize: "14px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase", color: pathname === l.to ? "#00e5ff" : "#6b7280", background: pathname === l.to ? "rgba(0,229,255,0.08)" : "transparent", borderLeft: pathname === l.to ? "2px solid #00e5ff" : "2px solid transparent" }}>
              {l.label}
            </Link>
          ))}
          <Link to="/Dealers" onClick={() => setOpen(false)} style={{ marginTop: "10px", background: "linear-gradient(135deg, #00e5ff, #0099bb)", color: "#0c0c10", padding: "13px 18px", borderRadius: "4px", textDecoration: "none", fontWeight: "800", fontSize: "13px", textAlign: "center", letterSpacing: "1px", textTransform: "uppercase" }}>
            Register as a Dealer →
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
