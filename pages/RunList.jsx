import { useState, useEffect } from "react";
import RingmanAI from "../components/RingmanAI.jsx";
import { Vehicle, Auction } from "@/api/entities";
import Nav from "../components/Nav.jsx";
import { Link } from "react-router-dom";

const GRADE = { "5": "Excellent", "4": "Good", "3": "Fair", "2": "Below Avg", "1": "Poor" };
const GRADE_COLOR = { "5": "#10b981", "4": "#67eeff", "3": "#f59e0b", "2": "#f97316", "1": "#ef4444" };

export default function RunList() {
  const [vehicles, setVehicles] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState("all");
  const [search, setSearch] = useState("");
  const [filterMake, setFilterMake] = useState("all");
  const [filterGrade, setFilterGrade] = useState("all");
  const [sortBy, setSortBy] = useState("lot");
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    Vehicle.filter({ status: "Listed" }).then(setVehicles);
    Auction.filter({ status: "Scheduled" }).then(setAuctions);
  }, []);

  const makes = [...new Set(vehicles.map(v => v.make).filter(Boolean))];

  const filtered = vehicles
    .filter(v => selectedAuction === "all" || v.auction_id === selectedAuction)
    .filter(v => filterMake === "all" || v.make === filterMake)
    .filter(v => filterGrade === "all" || v.condition_grade === filterGrade)
    .filter(v => !search || [v.year, v.make, v.model, v.trim, v.vin].some(f => String(f || "").toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === "lot") return (a.lot_number || 999) - (b.lot_number || 999);
      if (sortBy === "price_asc") return (a.floor_price || 0) - (b.floor_price || 0);
      if (sortBy === "price_desc") return (b.floor_price || 0) - (a.floor_price || 0);
      if (sortBy === "mileage") return (a.mileage || 0) - (b.mileage || 0);
      return 0;
    });

  const toggleWatch = id => setWatchlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const sel = { background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "10px 14px", color: "white", fontSize: "14px" };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />

      {/* HEADER */}
      <div style={{ background: "rgba(16,185,129,0.03)", borderBottom: "1px solid rgba(16,185,129,0.1)", padding: "40px 32px 32px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
            <div style={{ maxWidth: "660px" }}>
              <h1 style={{ fontSize: "30px", fontWeight: "900", margin: "0 0 10px" }}>Run List</h1>
              <p style={{ color: "#6b7280", margin: "0 0 10px", fontSize: "15px", lineHeight: "1.65" }}>
                Preview every vehicle scheduled for upcoming auctions — before bidding starts. Review condition grades, AI-generated estimated values, floor prices, photos, and full condition reports. Add vehicles to your watchlist so you're ready when the auction goes live.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "12px", color: "#4b5563" }}>
                {Object.entries(GRADE).reverse().map(([g, l]) => (
                  <span key={g} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: GRADE_COLOR[g], display: "inline-block" }}></span>
                    {g} — {l}
                  </span>
                ))}
              </div>
            </div>
            <Link to="/LiveAuction" style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white", padding: "13px 24px", borderRadius: "4px", textDecoration: "none", fontWeight: "700", fontSize: "14px", whiteSpace: "nowrap" }}>
              🔴 Enter Live Auction
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px 32px" }}>
        {/* FILTERS */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
          <input placeholder="🔍 Search VIN, year, make, model..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: "220px", ...sel }} />
          <select value={selectedAuction} onChange={e => setSelectedAuction(e.target.value)} style={sel}>
            <option value="all">All Auctions</option>
            {auctions.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <select value={filterMake} onChange={e => setFilterMake(e.target.value)} style={sel}>
            <option value="all">All Makes</option>
            {makes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={filterGrade} onChange={e => setFilterGrade(e.target.value)} style={sel}>
            <option value="all">All Grades</option>
            {["5","4","3","2","1"].map(g => <option key={g} value={g}>Grade {g} — {GRADE[g]}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={sel}>
            <option value="lot">Lot # (Run Order)</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="mileage">Mileage: Low → High</option>
          </select>
        </div>

        <div style={{ color: "#4b5563", fontSize: "13px", marginBottom: "18px" }}>
          {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""} found
          {watchlist.length > 0 && <span style={{ marginLeft: "12px", color: "#10b981" }}>★ {watchlist.length} on watchlist</span>}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 40px", background: "rgba(16,185,129,0.03)", borderRadius: "4px", border: "1px solid rgba(16,185,129,0.1)" }}>
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>🚗</div>
            <div style={{ fontSize: "20px", fontWeight: "700", color: "#6b7280", marginBottom: "8px" }}>No vehicles on the run list yet</div>
            <p style={{ color: "#4b5563", maxWidth: "360px", margin: "0 auto 20px", fontSize: "14px", lineHeight: "1.65" }}>Once vehicles are listed and approved, they'll appear here sorted by lot number — ready for dealers to preview before the auction starts.</p>
            <Link to="/VehicleIntake" style={{ display: "inline-block", background: "rgba(16,185,129,0.12)", color: "#10b981", padding: "10px 22px", borderRadius: "4px", textDecoration: "none", fontWeight: "700" }}>+ List a Vehicle</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "16px" }}>
            {filtered.map(v => (
              <div key={v.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                {/* PHOTO */}
                <div style={{ height: "185px", background: "linear-gradient(135deg, #080810, #0f0f18)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {v.photos?.[0] ? (
                    <img src={v.photos[0]} alt="vehicle" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ textAlign: "center", color: "#1e1e26" }}>
                      <div style={{ fontSize: "46px" }}>🚗</div>
                      <div style={{ fontSize: "12px", marginTop: "6px" }}>No Photo</div>
                    </div>
                  )}
                  <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,0.7)", color: "white", fontSize: "12px", fontWeight: "800", padding: "4px 10px", borderRadius: "6px" }}>
                    LOT #{v.lot_number || "—"}
                  </div>
                  {v.condition_grade && (
                    <div style={{ position: "absolute", top: 10, right: 10, background: GRADE_COLOR[v.condition_grade], color: "white", fontSize: "11px", fontWeight: "800", padding: "4px 10px", borderRadius: "6px" }}>
                      G{v.condition_grade} · {GRADE[v.condition_grade]}
                    </div>
                  )}
                  <button onClick={() => toggleWatch(v.id)} style={{ position: "absolute", bottom: 10, right: 10, background: watchlist.includes(v.id) ? "#10b981" : "rgba(0,0,0,0.65)", border: "none", borderRadius: "6px", padding: "5px 10px", cursor: "pointer", fontSize: "13px", color: "white", fontWeight: "700" }}>
                    {watchlist.includes(v.id) ? "★ Watching" : "☆ Watch"}
                  </button>
                </div>

                {/* INFO */}
                <div style={{ padding: "18px" }}>
                  <div style={{ fontWeight: "800", fontSize: "17px", marginBottom: "4px" }}>
                    {v.year} {v.make} {v.model} {v.trim}
                  </div>
                  <div style={{ fontSize: "12px", color: "#4b5563", marginBottom: "12px" }}>
                    VIN: {v.vin || "—"} &nbsp;·&nbsp; {v.mileage ? v.mileage.toLocaleString() + " mi" : "Mileage N/A"}
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                    {[v.transmission, v.drivetrain, v.fuel_type, v.title_status].filter(Boolean).map(t => (
                      <span key={t} style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "4px", padding: "3px 8px", fontSize: "11px", color: "#6b7280" }}>{t}</span>
                    ))}
                  </div>

                  {/* PRICING */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "4px", padding: "12px 14px" }}>
                    <div>
                      <div style={{ fontSize: "11px", color: "#4b5563", marginBottom: "2px" }}>AI Est. Value</div>
                      <div style={{ fontWeight: "900", fontSize: "20px", color: "#10b981" }}>${(v.estimated_value || 0).toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "11px", color: "#4b5563", marginBottom: "2px" }}>Floor Price</div>
                      <div style={{ fontWeight: "700", fontSize: "16px", color: "#6b7280" }}>${(v.floor_price || 0).toLocaleString()}</div>
                    </div>
                  </div>

                  {v.condition_report && (
                    <div style={{ marginBottom: "10px", padding: "10px 12px", background: "rgba(255,255,255,0.02)", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.05)", fontSize: "12px", color: "#6b7280", lineHeight: "1.55" }}>
                      📋 {v.condition_report}
                    </div>
                  )}
                  {v.ai_description && (
                    <div style={{ marginBottom: "12px", padding: "10px 12px", background: "rgba(16,185,129,0.04)", borderRadius: "4px", border: "1px solid rgba(16,185,129,0.1)", fontSize: "12px", color: "#6b7280", lineHeight: "1.55" }}>
                      🤖 {v.ai_description}
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "12px", color: "#4b5563" }}>
                      {v.seller_name || "Dealer"}
                      {v.carfax_url && <> · <a href={v.carfax_url} target="_blank" rel="noreferrer" style={{ color: "#10b981", textDecoration: "none" }}>Carfax</a></>}
                    </div>
                    <Link to={`/VehicleDetail?id=${v.id}`} style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white", padding: "8px 16px", borderRadius: "4px", textDecoration: "none", fontWeight: "700", fontSize: "13px" }}>
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <RingmanAI page="RunList" />
    </div>
  );
}
