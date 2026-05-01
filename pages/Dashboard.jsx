import { useState, useEffect } from "react";
import RingmanAI from "../components/RingmanAI.jsx";
import { Auction, Vehicle, Transaction, DealerProfile, Bid, IfSaleOffer } from "@/api/entities";
import Nav from "../components/Nav.jsx";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tab, setTab] = useState("overview");
  const [auctions, setAuctions] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [ifSales, setIfSales] = useState([]);
  const [newAuction, setNewAuction] = useState({ name: "", auction_date: "", format: "Live Simulcast", lane_count: 1, buyer_premium_pct: 5, seller_fee: 150, description: "" });
  const [showNewAuction, setShowNewAuction] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      Auction.list().then(setAuctions),
      Vehicle.list().then(setVehicles),
      Transaction.list().then(setTransactions),
      DealerProfile.list().then(setDealers),
      IfSaleOffer.list().then(setIfSales),
    ]).then(() => setLoading(false));
  }, []);

  const stats = {
    totalSold: transactions.filter(t => t.payment_status !== "Disputed").length,
    grossRevenue: transactions.reduce((s, t) => s + (t.sale_price || 0), 0),
    avgSalePrice: transactions.length ? Math.round(transactions.reduce((s, t) => s + (t.sale_price || 0), 0) / transactions.length) : 0,
    pendingPayments: transactions.filter(t => t.payment_status === "Pending").length,
    arbitrations: transactions.filter(t => t.arbitration_status && t.arbitration_status !== "None").length,
    unsoldVehicles: vehicles.filter(v => v.status === "Unsold").length,
    pendingVehicles: vehicles.filter(v => v.status === "Pending").length,
    ifSalePending: ifSales.filter(i => i.status && i.status.includes("Pending")).length,
  };

  const createAuction = async () => {
    await Auction.create({ ...newAuction, status: "Scheduled", lane_count: parseInt(newAuction.lane_count), buyer_premium_pct: parseFloat(newAuction.buyer_premium_pct), seller_fee: parseFloat(newAuction.seller_fee), total_lots: 0, total_sold: 0 });
    Auction.list().then(setAuctions);
    setShowNewAuction(false);
    setNewAuction({ name: "", auction_date: "", format: "Live Simulcast", lane_count: 1, buyer_premium_pct: 5, seller_fee: 150, description: "" });
  };

  const approveVehicle = async (id) => {
    await Vehicle.update(id, { status: "Listed" });
    Vehicle.list().then(setVehicles);
  };

  const rejectVehicle = async (id) => {
    await Vehicle.update(id, { status: "Rejected" });
    Vehicle.list().then(setVehicles);
  };

  const approveDealer = async (id) => {
    await DealerProfile.update(id, { status: "Approved" });
    DealerProfile.list().then(setDealers);
  };

  const inp = (label, key, opts = {}) => (
    <div>
      <label style={{ display: "block", fontSize: "12px", color: "#6b7280", fontWeight: "600", marginBottom: "6px" }}>{label}</label>
      {opts.options ? (
        <select value={newAuction[key]} onChange={e => setNewAuction(f => ({ ...f, [key]: e.target.value }))} style={{ width: "100%", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "10px 12px", color: "white", fontSize: "14px" }}>
          {opts.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={opts.type || "text"} value={newAuction[key]} onChange={e => setNewAuction(f => ({ ...f, [key]: e.target.value }))} style={{ width: "100%", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "10px 12px", color: "white", fontSize: "14px", boxSizing: "border-box" }} />
      )}
    </div>
  );

  const statusColor = { Live: "#10b981", Scheduled: "#3b82f6", Draft: "#6b7280", Completed: "#4b5563", Cancelled: "#ef4444" };
  const payColor = { Paid: "#10b981", Pending: "#f59e0b", Overdue: "#ef4444" };

  const TABS = [
    ["📊", "overview", "Overview", null],
    ["🔨", "auctions", "Auctions", null],
    ["🚗", "vehicles", "Vehicles", stats.pendingVehicles],
    ["💰", "transactions", "Transactions", stats.pendingPayments],
    ["🏢", "dealers", "Dealers", dealers.filter(d => d.status === "Pending").length],
    ["🤝", "if-sale", "IF-SALE", stats.ifSalePending],
  ];

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />
      <div style={{ display: "flex", height: "calc(100vh - 62px)" }}>

        {/* SIDEBAR */}
        <div style={{ width: "220px", borderRight: "1px solid rgba(16,185,129,0.1)", padding: "18px 10px", display: "flex", flexDirection: "column", gap: "3px", background: "rgba(16,185,129,0.02)" }}>
          {TABS.map(([icon, key, label, badge]) => (
            <button key={key} onClick={() => setTab(key)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "4px", border: "none", cursor: "pointer", background: tab === key ? "rgba(16,185,129,0.12)" : "transparent", color: tab === key ? "#10b981" : "#6b7280", fontWeight: tab === key ? "700" : "500", fontSize: "14px", textAlign: "left" }}>
              <span>{icon}</span>{label}
              {badge > 0 && <span style={{ marginLeft: "auto", background: key === "vehicles" ? "#f59e0b" : "#ef4444", color: "white", fontSize: "10px", fontWeight: "800", padding: "2px 6px", borderRadius: "100px" }}>{badge}</span>}
            </button>
          ))}
          <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: "1px solid rgba(16,185,129,0.08)" }}>
            <Link to="/LiveAuction" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 12px", borderRadius: "4px", textDecoration: "none", background: "rgba(16,185,129,0.1)", color: "#10b981", fontWeight: "700", fontSize: "14px" }}>
              <span>🔴</span> Go Live
            </Link>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>

          {/* OVERVIEW */}
          {tab === "overview" && (
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 6px" }}>Dashboard Overview</h2>
              <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 24px" }}>Real-time snapshot of platform activity — revenue, vehicle pipeline, active negotiations, and dealer stats.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "12px", marginBottom: "32px" }}>
                {[
                  ["💰", "Gross Revenue", "$" + stats.grossRevenue.toLocaleString(), "all time"],
                  ["🚗", "Vehicles Sold", stats.totalSold, "transactions"],
                  ["📈", "Avg Sale Price", "$" + stats.avgSalePrice.toLocaleString(), "per vehicle"],
                  ["⏳", "Pending Payments", stats.pendingPayments, "awaiting"],
                  ["⚖️", "Arbitrations", stats.arbitrations, "open cases"],
                  ["🔄", "IF-SALE Active", stats.ifSalePending, "negotiating"],
                  ["🔨", "Live Auctions", auctions.filter(a => a.status === "Live").length, "right now"],
                  ["🏢", "Dealers", dealers.length, "registered"],
                ].map(([icon, label, val, sub]) => (
                  <div key={label} style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "4px", padding: "18px" }}>
                    <div style={{ fontSize: "22px", marginBottom: "8px" }}>{icon}</div>
                    <div style={{ fontSize: "22px", fontWeight: "900", color: "white" }}>{val}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>{label}</div>
                    <div style={{ fontSize: "11px", color: "#4b5563", marginTop: "2px" }}>{sub}</div>
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: "800", marginBottom: "12px" }}>Recent Transactions</h3>
              {transactions.length === 0 ? (
                <div style={{ color: "#4b5563", padding: "40px", textAlign: "center", background: "rgba(16,185,129,0.02)", borderRadius: "4px", border: "1px solid rgba(16,185,129,0.08)" }}>No transactions yet.</div>
              ) : (
                <div style={{ background: "rgba(16,185,129,0.02)", borderRadius: "4px", border: "1px solid rgba(16,185,129,0.08)", overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "12px", padding: "10px 16px", borderBottom: "1px solid rgba(16,185,129,0.08)", fontSize: "11px", fontWeight: "700", color: "#4b5563" }}>
                    <span>LOT</span><span>BUYER</span><span>SALE PRICE</span><span>PAYMENT</span><span>TITLE</span>
                  </div>
                  {transactions.slice(0, 8).map((t, i) => (
                    <div key={t.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "12px", padding: "11px 16px", borderBottom: i < 7 ? "1px solid rgba(16,185,129,0.05)" : "none", fontSize: "13px" }}>
                      <span style={{ color: "#6b7280" }}>#{t.lot_number || "—"}</span>
                      <span style={{ color: "#6b7280" }}>{t.buyer_name || "—"}</span>
                      <span style={{ fontWeight: "700", color: "#10b981" }}>${(t.sale_price || 0).toLocaleString()}</span>
                      <span style={{ color: payColor[t.payment_status] || "#6b7280" }}>{t.payment_status}</span>
                      <span style={{ color: "#4b5563" }}>{t.title_status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AUCTIONS */}
          {tab === "auctions" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div>
                  <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 4px" }}>Auctions</h2>
                  <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>Create and manage auction events. Set date, format (Live Simulcast, Flash, or Timed), lane count, buyer premium %, and seller fee. Launch from the Live Auction page.</p>
                </div>
                <button onClick={() => setShowNewAuction(true)} style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "4px", padding: "10px 20px", fontWeight: "700", cursor: "pointer", fontSize: "14px", whiteSpace: "nowrap", marginLeft: "16px" }}>+ New Auction</button>
              </div>

              {showNewAuction && (
                <div style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "24px", marginBottom: "24px" }}>
                  <h3 style={{ margin: "0 0 18px", fontWeight: "800", color: "#10b981" }}>Create New Auction</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                    {inp("Auction Name", "name")}
                    {inp("Date", "auction_date", { type: "date" })}
                    {inp("Format", "format", { options: ["Live Simulcast", "Flash (20-Min)", "Timed Online"] })}
                    {inp("Number of Lanes", "lane_count", { type: "number" })}
                    {inp("Buyer Premium %", "buyer_premium_pct", { type: "number" })}
                    {inp("Seller Fee ($)", "seller_fee", { type: "number" })}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={createAuction} style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "4px", padding: "12px 24px", fontWeight: "800", cursor: "pointer" }}>Create Auction</button>
                    <button onClick={() => setShowNewAuction(false)} style={{ background: "transparent", color: "#6b7280", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "12px 20px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {auctions.length === 0 ? (
                  <div style={{ color: "#4b5563", padding: "40px", textAlign: "center", background: "rgba(16,185,129,0.02)", borderRadius: "4px", border: "1px solid rgba(16,185,129,0.08)" }}>No auctions yet. Create your first one above.</div>
                ) : auctions.map(a => (
                  <div key={a.id} style={{ background: "rgba(16,185,129,0.02)", border: "1px solid rgba(16,185,129,0.08)", borderRadius: "4px", padding: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: "800", marginBottom: "4px" }}>{a.name}</div>
                      <div style={{ fontSize: "13px", color: "#6b7280" }}>{a.format} · {a.auction_date} · {a.total_lots || 0} lots · {a.buyer_premium_pct}% BP · ${a.seller_fee} seller fee</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ background: statusColor[a.status] || "#6b7280", color: "white", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "100px" }}>{a.status}</span>
                      <Link to={`/LiveAuction?id=${a.id}`} style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", padding: "7px 14px", borderRadius: "4px", textDecoration: "none", fontWeight: "700", fontSize: "13px" }}>Open →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VEHICLES */}
          {tab === "vehicles" && (
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 4px" }}>Vehicles</h2>
              <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 20px" }}>Review and approve submitted vehicle listings. Pending vehicles are waiting for admin approval before appearing on the run list.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {vehicles.length === 0 ? (
                  <div style={{ color: "#4b5563", padding: "40px", textAlign: "center", background: "rgba(16,185,129,0.02)", borderRadius: "4px", border: "1px solid rgba(16,185,129,0.08)" }}>No vehicles listed yet.</div>
                ) : vehicles.map(v => (
                  <div key={v.id} style={{ background: "rgba(16,185,129,0.02)", border: `1px solid ${v.status === "Pending" ? "rgba(245,158,11,0.3)" : "rgba(16,185,129,0.08)"}`, borderRadius: "4px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: "800", marginBottom: "4px" }}>{v.year} {v.make} {v.model} {v.trim}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        VIN: {v.vin || "—"} · {v.mileage?.toLocaleString() || "—"} mi · Grade {v.condition_grade} · Est: ${(v.estimated_value || 0).toLocaleString()} · Floor: ${(v.floor_price || 0).toLocaleString()}
                      </div>
                      {v.seller_name && <div style={{ fontSize: "12px", color: "#4b5563", marginTop: "2px" }}>Seller: {v.seller_name}</div>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "700", padding: "3px 10px", borderRadius: "100px", background: v.status === "Pending" ? "rgba(245,158,11,0.15)" : v.status === "Listed" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", color: v.status === "Pending" ? "#f59e0b" : v.status === "Listed" ? "#10b981" : "#6b7280" }}>{v.status}</span>
                      {v.status === "Pending" && (
                        <>
                          <button onClick={() => approveVehicle(v.id)} style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "4px", padding: "6px 14px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}>Approve</button>
                          <button onClick={() => rejectVehicle(v.id)} style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "4px", padding: "6px 14px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}>Reject</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRANSACTIONS */}
          {tab === "transactions" && (
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 4px" }}>Transactions</h2>
              <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 20px" }}>Full post-sale record for every vehicle sold — invoice, payment status, title transfer, transport, and arbitration all tracked here.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {transactions.length === 0 ? (
                  <div style={{ color: "#4b5563", padding: "40px", textAlign: "center", background: "rgba(16,185,129,0.02)", borderRadius: "4px", border: "1px solid rgba(16,185,129,0.08)" }}>No transactions yet.</div>
                ) : transactions.map(t => (
                  <div key={t.id} style={{ background: "rgba(16,185,129,0.02)", border: "1px solid rgba(16,185,129,0.08)", borderRadius: "4px", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div style={{ fontWeight: "800" }}>Lot #{t.lot_number || "—"} · {t.buyer_name || "Unknown Buyer"}</div>
                      <div style={{ fontWeight: "900", fontSize: "18px", color: "#10b981" }}>${(t.sale_price || 0).toLocaleString()}</div>
                    </div>
                    <div style={{ display: "flex", gap: "16px", fontSize: "12px", flexWrap: "wrap" }}>
                      <span style={{ color: payColor[t.payment_status] || "#6b7280" }}>💳 {t.payment_status || "—"}</span>
                      <span style={{ color: "#6b7280" }}>📄 Title: {t.title_status || "—"}</span>
                      <span style={{ color: "#6b7280" }}>🚛 Transport: {t.transport_status || "—"}</span>
                      {t.arbitration_status && t.arbitration_status !== "None" && <span style={{ color: "#ef4444" }}>⚖️ {t.arbitration_status}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DEALERS */}
          {tab === "dealers" && (
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 4px" }}>Dealers</h2>
              <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 20px" }}>Manage registered dealer accounts. Approve pending applications, review dealer profiles, payment methods, and transaction history.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {dealers.length === 0 ? (
                  <div style={{ color: "#4b5563", padding: "40px", textAlign: "center", background: "rgba(16,185,129,0.02)", borderRadius: "4px", border: "1px solid rgba(16,185,129,0.08)" }}>No dealers registered yet.</div>
                ) : dealers.map(d => (
                  <div key={d.id} style={{ background: "rgba(16,185,129,0.02)", border: `1px solid ${d.status === "Pending" ? "rgba(245,158,11,0.25)" : "rgba(16,185,129,0.08)"}`, borderRadius: "4px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: "800", marginBottom: "3px" }}>{d.business_name || "—"}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>{d.contact_name} · {d.email} · {d.city}, {d.state} · License: {d.dealer_license}</div>
                      <div style={{ fontSize: "12px", color: "#4b5563", marginTop: "2px" }}>Role: {d.role} · Payment: {d.payment_method} · Bought: {d.total_bought || 0} · Sold: {d.total_sold || 0}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "700", padding: "3px 10px", borderRadius: "100px", background: d.status === "Pending" ? "rgba(245,158,11,0.15)" : d.status === "Approved" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", color: d.status === "Pending" ? "#f59e0b" : d.status === "Approved" ? "#10b981" : "#6b7280" }}>{d.status}</span>
                      {d.status === "Pending" && <button onClick={() => approveDealer(d.id)} style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "4px", padding: "6px 14px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}>Approve</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IF-SALE */}
          {tab === "if-sale" && (
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 4px" }}>IF-SALE Negotiations</h2>
              <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 20px" }}>Post-auction negotiations for vehicles that closed below floor. The IF-SALE engine automatically opens a negotiation channel between the highest bidder and seller — track all active, pending, accepted, and expired offers here.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ifSales.length === 0 ? (
                  <div style={{ color: "#4b5563", padding: "40px", textAlign: "center", background: "rgba(16,185,129,0.02)", borderRadius: "4px", border: "1px solid rgba(16,185,129,0.08)" }}>No IF-SALE negotiations yet.</div>
                ) : ifSales.map(i => (
                  <div key={i.id} style={{ background: "rgba(16,185,129,0.02)", border: "1px solid rgba(16,185,129,0.08)", borderRadius: "4px", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div style={{ fontWeight: "800" }}>Lot #{i.lot_number || "—"} · {i.buyer_name || "Buyer"} → {i.seller_name || "Seller"}</div>
                      <span style={{ fontSize: "12px", fontWeight: "700", padding: "3px 10px", borderRadius: "100px", background: i.status === "Accepted" ? "rgba(16,185,129,0.15)" : i.status === "Expired" ? "rgba(255,255,255,0.05)" : "rgba(245,158,11,0.15)", color: i.status === "Accepted" ? "#10b981" : i.status === "Expired" ? "#6b7280" : "#f59e0b" }}>{i.status}</span>
                    </div>
                    <div style={{ display: "flex", gap: "16px", fontSize: "12px", flexWrap: "wrap", color: "#6b7280" }}>
                      <span>High Bid: <strong style={{ color: "#10b981" }}>${(i.highest_bid || 0).toLocaleString()}</strong></span>
                      {i.buyer_counter && <span>Buyer Counter: <strong style={{ color: "#67eeff" }}>${i.buyer_counter.toLocaleString()}</strong></span>}
                      {i.seller_counter && <span>Seller Counter: <strong style={{ color: "#6b7280" }}>${i.seller_counter.toLocaleString()}</strong></span>}
                      {i.final_price && <span>Final: <strong style={{ color: "#10b981" }}>${i.final_price.toLocaleString()}</strong></span>}
                      {i.expires_at && <span>Expires: {new Date(i.expires_at).toLocaleString()}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <RingmanAI page="Dashboard" />
    </div>
  );
}
