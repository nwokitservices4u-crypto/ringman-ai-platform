import { useState, useEffect } from "react";
import RingmanAI from "../components/RingmanAI.jsx";
import { Vehicle, Bid } from "@/api/entities";
import Nav from "../components/Nav.jsx";
import { Link, useSearchParams } from "react-router-dom";

const GRADE_COLOR = { "5": "#10b981", "4": "#67eeff", "3": "#f59e0b", "2": "#f97316", "1": "#ef4444" };
const GRADE_LABEL = { "5": "Excellent", "4": "Good", "3": "Fair", "2": "Below Average", "1": "Poor" };

export default function VehicleDetail() {
  const [params] = useSearchParams();
  const [vehicle, setVehicle] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.get("id");
    if (id) {
      Vehicle.get(id).then(v => { setVehicle(v); setLoading(false); });
      Bid.filter({ vehicle_id: id }).then(b => setBids(b.sort((a, z) => z.amount - a.amount)));
    }
  }, []);

  const jsonLd = vehicle ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim || ""}`,
    "description": vehicle.ai_description || vehicle.condition_report || "",
    "sku": vehicle.vin,
    "offers": { "@type": "Offer", "price": vehicle.estimated_value || 0, "priceCurrency": "USD" }
  } : null;

  if (loading) return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Nav />
      <div style={{ textAlign: "center", color: "#4b5563" }}>Loading vehicle...</div>
    </div>
  );

  if (!vehicle) return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />
      <div style={{ textAlign: "center", padding: "80px", color: "#4b5563" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚗</div>
        <div style={{ fontSize: "20px", fontWeight: "700" }}>Vehicle not found</div>
        <Link to="/RunList" style={{ display: "inline-block", marginTop: "20px", background: "rgba(16,185,129,0.12)", color: "#10b981", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", fontWeight: "700" }}>← Back to Run List</Link>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      <Nav />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px" }}>
        <Link to="/RunList" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#6b7280", textDecoration: "none", fontSize: "14px", marginBottom: "24px", fontWeight: "600" }}>← Back to Run List</Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "24px" }}>
          {/* LEFT */}
          <div>
            {/* PHOTO */}
            <div style={{ borderRadius: "4px", overflow: "hidden", background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", height: "340px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: "20px" }}>
              {vehicle.photos?.[0] ? (
                <img src={vehicle.photos[0]} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ textAlign: "center", color: "#1e1e26" }}>
                  <div style={{ fontSize: "80px" }}>🚗</div>
                  <div style={{ fontSize: "14px", marginTop: "8px" }}>No Photo</div>
                </div>
              )}
              {vehicle.condition_grade && (
                <div style={{ position: "absolute", top: 14, right: 14, background: GRADE_COLOR[vehicle.condition_grade], color: "white", fontWeight: "800", padding: "6px 14px", borderRadius: "4px", fontSize: "14px" }}>
                  Grade {vehicle.condition_grade} · {GRADE_LABEL[vehicle.condition_grade]}
                </div>
              )}
            </div>

            {/* TITLE */}
            <h1 style={{ fontSize: "28px", fontWeight: "900", margin: "0 0 6px" }}>
              {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
            </h1>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "18px" }}>
              VIN: <span style={{ fontFamily: "monospace", color: "#6b7280" }}>{vehicle.vin || "—"}</span> &nbsp;·&nbsp; {vehicle.mileage?.toLocaleString() || "—"} miles &nbsp;·&nbsp; {vehicle.color || "—"}
            </div>

            {/* SPECS */}
            <div style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "4px", padding: "20px", marginBottom: "18px" }}>
              <div style={{ fontWeight: "800", fontSize: "15px", color: "#10b981", marginBottom: "14px" }}>Vehicle Specifications</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[["Engine", vehicle.engine], ["Transmission", vehicle.transmission], ["Drivetrain", vehicle.drivetrain], ["Fuel Type", vehicle.fuel_type], ["Body Style", vehicle.body_style], ["Title Status", vehicle.title_status]].map(([k, v]) => v ? (
                  <div key={k} style={{ padding: "10px 14px", background: "rgba(16,185,129,0.04)", borderRadius: "4px" }}>
                    <div style={{ fontSize: "11px", color: "#4b5563", fontWeight: "600", marginBottom: "3px" }}>{k}</div>
                    <div style={{ fontWeight: "700", fontSize: "14px" }}>{v}</div>
                  </div>
                ) : null)}
              </div>
            </div>

            {/* CONDITION REPORT */}
            {(vehicle.condition_report || vehicle.damage_notes) && (
              <div style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "4px", padding: "20px", marginBottom: "18px" }}>
                <div style={{ fontWeight: "800", fontSize: "15px", color: "#10b981", marginBottom: "14px" }}>Condition Report</div>
                {vehicle.condition_report && (
                  <div style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.75", marginBottom: vehicle.damage_notes ? "14px" : 0 }}>{vehicle.condition_report}</div>
                )}
                {vehicle.damage_notes && (
                  <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "4px", padding: "12px 14px", fontSize: "13px", color: "#fca5a5", lineHeight: "1.6" }}>
                    ⚠️ <strong>Damage Notes:</strong> {vehicle.damage_notes}
                  </div>
                )}
              </div>
            )}

            {/* AI DESCRIPTION */}
            {vehicle.ai_description && (
              <div style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "20px", marginBottom: "18px" }}>
                <div style={{ fontWeight: "800", fontSize: "15px", color: "#10b981", marginBottom: "10px" }}>🤖 AI Lot Description</div>
                <div style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.75" }}>{vehicle.ai_description}</div>
              </div>
            )}

            {/* SELLER */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {vehicle.carfax_url && (
                <a href={vehicle.carfax_url} target="_blank" rel="noreferrer" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "10px 20px", borderRadius: "4px", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>
                  View Carfax Report →
                </a>
              )}
              {vehicle.seller_name && (
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(16,185,129,0.08)", borderRadius: "4px", padding: "10px 16px", fontSize: "13px", color: "#6b7280" }}>
                  Seller: <strong style={{ color: "#6b7280" }}>{vehicle.seller_name}</strong>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — BID CARD */}
          <div>
            <div style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "24px", position: "sticky", top: "80px" }}>
              <div style={{ fontWeight: "800", fontSize: "15px", color: "#10b981", marginBottom: "18px" }}>Pricing & Bidding</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div style={{ background: "rgba(16,185,129,0.08)", borderRadius: "4px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px" }}>AI Estimated Value</div>
                  <div style={{ fontSize: "24px", fontWeight: "900", color: "#10b981" }}>${(vehicle.estimated_value || 0).toLocaleString()}</div>
                </div>
                <div style={{ background: "rgba(16,185,129,0.04)", borderRadius: "4px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px" }}>Floor Price</div>
                  <div style={{ fontSize: "24px", fontWeight: "900", color: "#6b7280" }}>${(vehicle.floor_price || 0).toLocaleString()}</div>
                </div>
              </div>

              <Link to="/LiveAuction" style={{ display: "block", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", padding: "14px", borderRadius: "4px", textDecoration: "none", fontWeight: "800", fontSize: "15px", textAlign: "center", marginBottom: "12px" }}>
                🔨 Bid on This Vehicle →
              </Link>
              <Link to="/RunList" style={{ display: "block", background: "rgba(16,185,129,0.06)", color: "#10b981", padding: "12px", borderRadius: "4px", textDecoration: "none", fontWeight: "700", fontSize: "14px", textAlign: "center", border: "1px solid rgba(16,185,129,0.15)" }}>
                ← Back to Run List
              </Link>

              {/* BID HISTORY */}
              {bids.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                  <div style={{ fontWeight: "700", fontSize: "13px", color: "#6b7280", marginBottom: "10px" }}>Recent Bids</div>
                  {bids.slice(0, 5).map((b, i) => (
                    <div key={b.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(16,185,129,0.06)", fontSize: "13px" }}>
                      <span style={{ fontWeight: "700", color: i === 0 ? "#10b981" : "#6b7280" }}>${b.amount.toLocaleString()}</span>
                      <span style={{ color: "#4b5563" }}>{b.bidder_name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <RingmanAI page="VehicleDetail" />
    </div>
  );
}
