import { useEffect, useState } from "react";
import RingmanAI from "../components/RingmanAI.jsx";
import { Vehicle } from "@/api/entities";
import Nav from "../components/Nav.jsx";
import { Link } from "react-router-dom";

const STATIC_PAGES = [
  { url: "/", title: "Home — The Ringman's AI Wholesale Auto Auction Platform", desc: "AI-powered dealer-to-dealer wholesale auto auction. Live simulcast bidding, AI pricing, IF-SALE negotiations." },
  { url: "/RunList", title: "Run List — Preview All Vehicles Before Auction", desc: "Browse every vehicle scheduled for upcoming auctions with full condition reports, AI estimated values, and photos." },
  { url: "/LiveAuction", title: "Live Auction — Real-Time Simulcast Bidding", desc: "Enter the live auction room and bid in real time alongside in-lane dealers from any device." },
  { url: "/Dashboard", title: "Admin Dashboard — Auction Management & Analytics", desc: "Create and manage auctions, approve vehicles, track transactions, manage dealer accounts, and monitor IF-SALE." },
  { url: "/VehicleIntake", title: "List a Vehicle — AI-Powered Seller Intake", desc: "VIN decode, condition report, AI pricing, and listing submission in one 4-step flow." },
  { url: "/Dealers", title: "Dealer Registration — Join the Network", desc: "Licensed dealer registration form. No upfront fees. Approval in 1–2 business days." },
  { url: "/WhyUs", title: "Why The Ringman's AI — Platform Comparison", desc: "Feature-by-feature comparison vs. Webtron, Auction Streaming, and ACV Auctions." },
  { url: "/FAQ", title: "FAQ — Frequently Asked Questions", desc: "Complete answers about buying, selling, IF-SALE, post-sale workflow, and platform features." },
  { url: "/Sitemap", title: "Sitemap", desc: "All pages on The Ringman's AI platform." },
];

export default function Sitemap() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    document.title = "Sitemap — The Ringman's AI";
    Vehicle.filter({ status: "Listed" }).then(setVehicles);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "52px 32px 80px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "900", margin: "0 0 6px" }}>Sitemap</h1>
        <p style={{ color: "#6b7280", margin: "0 0 40px", fontSize: "14px" }}>Complete index of all pages on The Ringman's AI platform.</p>

        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#10b981", margin: "0 0 16px" }}>Platform Pages</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "48px" }}>
          {STATIC_PAGES.map(p => (
            <div key={p.url} style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "4px", padding: "14px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <div>
                  <Link to={p.url} style={{ fontWeight: "700", fontSize: "14px", color: "#10b981", textDecoration: "none" }}>{p.title}</Link>
                  <div style={{ fontSize: "12px", color: "#4b5563", marginTop: "3px" }}>{p.desc}</div>
                </div>
                <div style={{ fontSize: "12px", color: "#4b5563", fontFamily: "monospace", flexShrink: 0 }}>{p.url}</div>
              </div>
            </div>
          ))}
        </div>

        {vehicles.length > 0 && (
          <>
            <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#10b981", margin: "0 0 8px" }}>Vehicle Listings ({vehicles.length})</h2>
            <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 16px" }}>Each vehicle has its own SEO-indexed page with structured data for Google search.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {vehicles.map(v => (
                <div key={v.id} style={{ background: "rgba(16,185,129,0.02)", border: "1px solid rgba(16,185,129,0.07)", borderRadius: "4px", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Link to={`/VehicleDetail?id=${v.id}`} style={{ fontWeight: "600", fontSize: "14px", color: "#6b7280", textDecoration: "none" }}>
                    {v.year} {v.make} {v.model} {v.trim} — Lot #{v.lot_number || "—"}
                  </Link>
                  <span style={{ fontSize: "11px", color: "#4b5563", fontFamily: "monospace" }}>/VehicleDetail?id={v.id.slice(0, 8)}…</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <RingmanAI page="Sitemap" />
    </div>
  );
}
