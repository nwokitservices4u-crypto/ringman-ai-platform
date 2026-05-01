import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "For Dealers", href: "/ForIndependentDealers" },
  { label: "Dealer Groups", href: "/ForDealerGroups" },
  { label: "Private Sellers", href: "/SellYourCar" },
  { label: "The Inspection", href: "/TheInspection" },
  { label: "Integrity", href: "/IntegritySystem" },
  { label: "Why Ringman", href: "/WhyRingman" },
];

const ENTERPRISE_FEATURES = [
  { icon: "👥", title: "Multi-User Team Management", body: "One Company Admin. Unlimited sub-users. Assign roles — Buyer, Seller, Accounting, Title Clerk, Logistics, Arbitration, Sales Manager. Every person sees only what they need to see. Full audit trail on every action." },
  { icon: "📊", title: "Group-Level Analytics Dashboard", body: "Consolidated view across all buyers and sellers under your organization. Total spend, total earned, sell-through rates, average days to sale, arbitration rate, and more. One dashboard for every rooftop." },
  { icon: "🤖", title: "AI Market Intelligence Reports", body: "The platform tracks every sale across every make, model, year, and region. Your team gets real-time comp data before every bid. Not MMR alone — actual transaction data from our platform combined with AI-powered trend analysis." },
  { icon: "🔍", title: "Fleet Inspection at Scale", body: "Got 40 trade-ins to wholesale this week? Your team runs the guided inspection on every one. AI verifies, scores, and flags issues automatically. No bottleneck. No waiting for outside inspectors. Consistent quality every time." },
  { icon: "⚖️", title: "Arbitration History & Risk Scoring", body: "Know your risk before you bid. Every vehicle carries the seller's integrity score, full disclosure history, and arbitration record. Your buying team makes decisions on data, not gut feel." },
  { icon: "💰", title: "Volume Pricing & Platinum Benefits", body: "High-volume groups reach Platinum status faster. Lower per-vehicle fees. Free AI descriptions. Priority run list placement. Bulk transport booking through Ringman Transport. Your volume is your leverage." },
  { icon: "🔗", title: "DMS Integration (Coming Soon)", body: "We're building direct connections to major Dealer Management Systems. Your inventory flows in and out without double entry. Sold at auction? It updates your DMS automatically." },
  { icon: "📋", title: "Disclosure & Compliance Records", body: "Every disclosure report, every inspection session, every OBD scan — stored permanently under your organization. Full paper trail for compliance, internal audits, and dispute defense." },
];

const ROI_POINTS = [
  { metric: "20 hrs/month", desc: "Average time saved vs traditional wholesale", source: "Industry benchmark" },
  { metric: "$316/unit", desc: "Average profit increase per sourced vehicle with AI data", source: "Comparable AI platforms" },
  { metric: "0 inspectors", desc: "Needed on payroll — AI handles verification", source: "Platform design" },
  { metric: "3 tiers", desc: "Of dispute resolution before a fee is charged", source: "Our policy" },
];

export default function ForDealerGroups() {
  useEffect(() => {
    document.title = "For Dealer Groups — Enterprise Wholesale Auction Platform";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Multi-user team management, volume pricing, and full market intelligence for dealer groups. 8 roles, consolidated analytics, unlimited listings. Request a demo.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "For Dealer Groups — Enterprise Wholesale Auction Platform", "property");
    setMeta("og:description", "Multi-user team management, volume pricing, and full market intelligence for dealer groups. 8 roles, consolidated analytics, unlimited listings. Request a demo.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "For Dealer Groups — Enterprise Wholesale Auction Platform");
    setMeta("twitter:description", "Multi-user team management, volume pricing, and full market intelligence for dealer groups. 8 roles, consolidated analytics, unlimited listings. Request a demo.");
  }, []);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: l.href === "/ForDealerGroups" ? "#8b5cf6" : "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <a href="/" style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#8b5cf6,#7c3aed)", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Request Demo</a>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "100px 24px 80px", background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)" }}>
        <div style={{ display: "inline-block", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 20, padding: "6px 16px", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#a78bfa", marginBottom: 24 }}>For Dealer Groups</div>
        <h1 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 900, fontFamily: "'Georgia',serif", lineHeight: 1.05, margin: "0 0 24px" }}>
          Enterprise intelligence.<br />
          <span style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Wholesale speed.</span>
        </h1>
        <p style={{ fontSize: "clamp(16px,2.5vw,20px)", color: "#9ca3af", maxWidth: 650, margin: "0 auto 48px", lineHeight: 1.8, fontFamily: "'Georgia',serif", fontStyle: "italic" }}>
          Your group moves volume. You need data, team controls, and a platform that scales with you — not one that gets slower and more expensive the bigger you get.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/" style={{ padding: "16px 36px", borderRadius: 8, background: "linear-gradient(135deg,#8b5cf6,#7c3aed)", color: "white", fontWeight: 800, fontSize: 16, textDecoration: "none" }}>Request a Demo →</a>
          <a href="/WhyRingman" style={{ padding: "16px 36px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>See Why We're Different</a>
        </div>
      </div>

      {/* ROI BAR */}
      <div style={{ background: "rgba(139,92,246,0.05)", borderTop: "1px solid rgba(139,92,246,0.12)", borderBottom: "1px solid rgba(139,92,246,0.12)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32, textAlign: "center" }}>
          {ROI_POINTS.map((r, i) => (
            <div key={i}>
              <div style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#a78bfa", lineHeight: 1 }}>{r.metric}</div>
              <div style={{ fontSize: 14, color: "#e2e8f0", marginTop: 8, fontWeight: 600 }}>{r.desc}</div>
              <div style={{ fontSize: 11, color: "#4b5563", marginTop: 4, letterSpacing: 1 }}>{r.source}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8b5cf6", marginBottom: 12 }}>BUILT FOR YOUR SCALE</div>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: 0 }}>Every feature your group needs to dominate wholesale.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {ENTERPRISE_FEATURES.map((f, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: "3px solid #8b5cf6", borderRadius: "0 12px 12px 0", padding: 28 }}>
              <div style={{ fontSize: 30, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#f1f5f9", marginBottom: 10 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.8 }}>{f.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ROLES SECTION */}
      <div style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8b5cf6", marginBottom: 12 }}>TEAM ROLES</div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>Your team. Your rules. Your platform.</h2>
            <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 600, margin: "0 auto" }}>One Company Admin manages the whole operation. Sub-users see only what their role allows. Full audit trail on every action.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
            {[
              { role: "Company Admin", color: "#f59e0b", perms: "Full access — manages team, billing, all transactions" },
              { role: "Buyer", color: "#06b6d4", perms: "Run list, bidding, own transactions" },
              { role: "Seller", color: "#10b981", perms: "Vehicle submission, own transactions" },
              { role: "Accounting", color: "#8b5cf6", perms: "All transactions, invoices, payments" },
              { role: "Title Clerk", color: "#ec4899", perms: "Title status tracking, transaction read" },
              { role: "Logistics", color: "#f97316", perms: "Transport booking, shipment tracking" },
              { role: "Arbitration", color: "#ef4444", perms: "Dispute management, all transactions" },
              { role: "Sales Manager", color: "#64748b", perms: "Transaction read, invoice read, reporting" },
            ].map((r, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.06)`, borderTop: `2px solid ${r.color}`, borderRadius: "0 0 8px 8px", padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: r.color, marginBottom: 6 }}>{r.role}</div>
                <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{r.perms}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,rgba(139,92,246,0.1),rgba(6,182,212,0.06))", borderTop: "1px solid rgba(139,92,246,0.15)", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>Let's talk about your group's volume.</h2>
        <p style={{ color: "#6b7280", fontSize: 16, marginBottom: 40 }}>Custom pricing available for high-volume dealer groups. Get in early — founding members lock in the best rates.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/" style={{ padding: "18px 48px", borderRadius: 8, background: "linear-gradient(135deg,#8b5cf6,#7c3aed)", color: "white", fontWeight: 800, fontSize: 18, textDecoration: "none" }}>REQUEST A DEMO →</a>
          <a href="/WhyRingman" style={{ padding: "18px 48px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db", fontWeight: 700, fontSize: 18, textDecoration: "none" }}>Read the Manifesto</a>
        </div>
      </div>

    </div>
  );
}
