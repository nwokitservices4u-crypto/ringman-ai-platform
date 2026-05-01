import { useState, useEffect, useRef } from "react";
import RingmanAI from "../components/RingmanAI.jsx";
import Nav from "../components/Nav.jsx";
import { Bid, Vehicle, Auction } from "@/api/entities";
import { Link } from "react-router-dom";

const GRADE_COLOR = { "5": "#10b981", "4": "#67eeff", "3": "#f59e0b", "2": "#f97316", "1": "#ef4444" };
const GRADE_LABEL = { "5": "Excellent", "4": "Good", "3": "Fair", "2": "Below Avg", "1": "Poor" };

export default function LiveAuction() {
  const [vehicles, setVehicles] = useState([]);
  const [bids, setBids] = useState([]);
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [proxyMax, setProxyMax] = useState("");
  const [mode, setMode] = useState("bidder");
  const [bidderName] = useState("Dealer #" + Math.floor(Math.random() * 900 + 100));
  const [lotIndex, setLotIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [increment, setIncrement] = useState(250);
  const [ifSaleOffer, setIfSaleOffer] = useState("");
  const [bidFlash, setBidFlash] = useState(false);

  const currentLot = vehicles[lotIndex] || null;

  useEffect(() => {
    Vehicle.filter({ status: "In Auction" }).then(vs => {
      if (vs.length === 0) Vehicle.filter({ status: "Listed" }).then(setVehicles);
      else setVehicles(vs);
    });
  }, []);

  useEffect(() => {
    if (currentLot) {
      setCurrentBid(currentLot.floor_price || 1000);
      Bid.filter({ vehicle_id: currentLot.id }).then(b => setBids(b.sort((a, z) => z.amount - a.amount).slice(0, 10)));
    }
  }, [currentLot?.id]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const getInc = b => b < 1000 ? 100 : b < 5000 ? 250 : b < 10000 ? 500 : b < 25000 ? 1000 : 2500;

  const placeBid = async (amt) => {
    const amount = amt || parseFloat(bidAmount);
    if (!amount || amount <= currentBid || !currentLot) return;
    await Bid.create({ vehicle_id: currentLot.id, bidder_name: bidderName, amount, bid_type: "Online", status: "Active", timestamp: new Date().toISOString() });
    setCurrentBid(amount);
    setBidAmount("");
    setIncrement(getInc(amount));
    setBidFlash(true);
    setTimeout(() => setBidFlash(false), 500);
    setTimeLeft(tl => Math.max(tl, 30));
    Bid.filter({ vehicle_id: currentLot.id }).then(b => setBids(b.sort((a, z) => z.amount - a.amount).slice(0, 10)));
  };

  const nextLot = () => { if (lotIndex < vehicles.length - 1) { setLotIndex(i => i + 1); setTimeLeft(1200); } };
  const prevLot = () => { if (lotIndex > 0) { setLotIndex(i => i - 1); setTimeLeft(1200); } };

  if (!currentLot) return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", flexDirection: "column", gap: "16px", textAlign: "center", padding: "40px" }}>
        <div style={{ fontSize: "56px" }}>🔨</div>
        <div style={{ fontSize: "22px", fontWeight: "800", color: "#4b5563" }}>No Active Auction Right Now</div>
        <p style={{ color: "#4b5563", maxWidth: "420px", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>
          The live auction room is waiting for an auction to go live. Admins launch auctions from the Dashboard — once active, vehicles appear here in lot order and bidding opens immediately for all registered dealers.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/RunList" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", fontWeight: "700" }}>Preview Run List →</Link>
          <Link to="/VehicleIntake" style={{ background: "rgba(255,255,255,0.04)", color: "#888", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", fontWeight: "700", border: "1px solid rgba(255,255,255,0.08)" }}>List a Vehicle</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", height: "calc(100vh - 62px)", overflow: "hidden" }}>

        {/* LEFT — MAIN AUCTION AREA */}
        <div style={{ overflowY: "auto", padding: "20px 24px" }}>

          {/* MODE TOGGLE */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", alignItems: "center" }}>
            <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", display: "flex", padding: "3px" }}>
              {["bidder", "clerk"].map(m => (
                <button key={m} onClick={() => setMode(m)} style={{ padding: "6px 16px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "700", fontSize: "12px", background: mode === m ? "rgba(16,185,129,0.2)" : "transparent", color: mode === m ? "#10b981" : "#6b7280" }}>
                  {m === "bidder" ? "🛒 Bidder View" : "🔨 Clerk Console"}
                </button>
              ))}
            </div>
            <div style={{ marginLeft: "auto", fontSize: "13px", color: "#6b7280" }}>Logged in as <span style={{ color: "#10b981", fontWeight: "700" }}>{bidderName}</span></div>
          </div>

          {/* LOT NAV + TIMER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button onClick={prevLot} disabled={lotIndex === 0} style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", color: "#10b981", width: 34, height: 34, borderRadius: "4px", cursor: "pointer", fontSize: "16px", opacity: lotIndex === 0 ? 0.3 : 1 }}>←</button>
              <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "6px 16px" }}>
                <span style={{ color: "#6b7280", fontSize: "12px" }}>LOT </span>
                <span style={{ fontWeight: "900", fontSize: "15px" }}>{currentLot.lot_number || lotIndex + 1}</span>
                <span style={{ color: "#4b5563", fontSize: "12px" }}> / {vehicles.length}</span>
              </div>
              <button onClick={nextLot} disabled={lotIndex === vehicles.length - 1} style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", color: "#10b981", width: 34, height: 34, borderRadius: "4px", cursor: "pointer", fontSize: "16px", opacity: lotIndex === vehicles.length - 1 ? 0.3 : 1 }}>→</button>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "10px", color: "#4b5563", fontWeight: "600", marginBottom: "2px" }}>TIME LEFT</div>
              <div style={{ fontWeight: "900", fontSize: "24px", color: timeLeft < 60 ? "#ef4444" : "#10b981", fontVariantNumeric: "tabular-nums" }}>{fmt(timeLeft)}</div>
            </div>
          </div>

          {/* VEHICLE PHOTO */}
          <div style={{ borderRadius: "4px", overflow: "hidden", marginBottom: "16px", background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", position: "relative", height: "290px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {currentLot.photos?.[0] ? (
              <img src={currentLot.photos[0]} alt="vehicle" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ textAlign: "center", color: "#1e1e26" }}>
                <div style={{ fontSize: "72px" }}>🚗</div>
                <div style={{ fontSize: "14px", marginTop: "8px" }}>No Photo</div>
              </div>
            )}
            {currentLot.condition_grade && (
              <div style={{ position: "absolute", top: 12, right: 12, background: GRADE_COLOR[currentLot.condition_grade], color: "white", fontWeight: "800", padding: "5px 12px", borderRadius: "4px", fontSize: "13px" }}>
                G{currentLot.condition_grade} · {GRADE_LABEL[currentLot.condition_grade]}
              </div>
            )}
          </div>

          {/* VEHICLE INFO */}
          <div style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "4px", padding: "20px", marginBottom: "14px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 6px" }}>
              {currentLot.year} {currentLot.make} {currentLot.model} {currentLot.trim}
            </h2>
            <div style={{ fontSize: "13px", color: "#4b5563", marginBottom: "12px" }}>
              VIN: {currentLot.vin || "—"} &nbsp;·&nbsp; {currentLot.mileage?.toLocaleString() || "—"} mi &nbsp;·&nbsp; {currentLot.color || "—"}
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
              {[currentLot.transmission, currentLot.drivetrain, currentLot.fuel_type, currentLot.engine, currentLot.title_status].filter(Boolean).map(t => (
                <span key={t} style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "4px", padding: "4px 10px", fontSize: "12px", color: "#6b7280" }}>{t}</span>
              ))}
            </div>
            {currentLot.ai_description && (
              <div style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "4px", padding: "12px", fontSize: "13px", color: "#6b7280", lineHeight: "1.6" }}>
                🤖 {currentLot.ai_description}
              </div>
            )}
            {currentLot.damage_notes && (
              <div style={{ marginTop: "10px", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "4px", padding: "12px", fontSize: "13px", color: "#fca5a5" }}>
                ⚠️ {currentLot.damage_notes}
              </div>
            )}
          </div>

          {/* IF-SALE */}
          {timeLeft === 0 && (
            <div style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "20px" }}>
              <div style={{ fontWeight: "800", marginBottom: "10px", color: "#10b981", fontSize: "15px" }}>🤝 IF-SALE — Post-Auction Negotiation</div>
              <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "16px", lineHeight: "1.7" }}>
                Auction closed below the seller's floor price. The IF-SALE engine is now active — submit a post-auction offer directly to the seller. If they accept, the sale closes at your offer. If they counter, you'll have a chance to respond. Offers expire after the seller's set window (typically 24 hours).
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <input type="number" placeholder={`Your offer (last bid: $${currentBid.toLocaleString()})`} value={ifSaleOffer} onChange={e => setIfSaleOffer(e.target.value)}
                  style={{ flex: 1, background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "10px 14px", color: "white", fontSize: "14px" }} />
                <button style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "4px", padding: "0 20px", fontWeight: "800", cursor: "pointer" }}>
                  Submit IF-SALE
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — BID PANEL */}
        <div style={{ borderLeft: "1px solid rgba(16,185,129,0.1)", overflowY: "auto", display: "flex", flexDirection: "column" }}>

          {/* CURRENT BID */}
          <div style={{ padding: "20px", borderBottom: "1px solid rgba(16,185,129,0.08)", background: bidFlash ? "rgba(16,185,129,0.08)" : "transparent", transition: "background 0.3s" }}>
            <div style={{ fontSize: "11px", color: "#4b5563", fontWeight: "600", marginBottom: "4px" }}>CURRENT HIGH BID</div>
            <div style={{ fontSize: "38px", fontWeight: "900", color: "#10b981" }}>${currentBid.toLocaleString()}</div>
            <div style={{ fontSize: "12px", color: "#4b5563", marginTop: "4px" }}>Next increment: +${increment.toLocaleString()}</div>
            {currentLot.estimated_value && (
              <div style={{ fontSize: "12px", color: "#4b5563", marginTop: "6px" }}>
                AI Est: <span style={{ color: "#67eeff", fontWeight: "700" }}>${currentLot.estimated_value.toLocaleString()}</span>
                &nbsp;·&nbsp; Floor: <span style={{ color: "#6b7280" }}>${(currentLot.floor_price || 0).toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* BIDDING */}
          {mode === "bidder" && timeLeft > 0 && (
            <div style={{ padding: "18px", borderBottom: "1px solid rgba(16,185,129,0.08)" }}>
              <button onClick={() => placeBid(currentBid + increment)} style={{ width: "100%", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "4px", padding: "14px", fontWeight: "900", fontSize: "16px", cursor: "pointer", marginBottom: "12px" }}>
                ⚡ Quick Bid ${(currentBid + increment).toLocaleString()}
              </button>
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                <input type="number" placeholder="Custom amount" value={bidAmount} onChange={e => setBidAmount(e.target.value)}
                  style={{ flex: 1, background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "4px", padding: "10px 12px", color: "white", fontSize: "14px" }} />
                <button onClick={() => placeBid()} style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "4px", padding: "0 14px", fontWeight: "700", cursor: "pointer" }}>Bid</button>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input type="number" placeholder="Proxy max $..." value={proxyMax} onChange={e => setProxyMax(e.target.value)}
                  style={{ flex: 1, background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "4px", padding: "10px 12px", color: "white", fontSize: "13px" }} />
                <button onClick={() => { if (proxyMax && parseFloat(proxyMax) > currentBid) placeBid(currentBid + increment); }} style={{ background: "rgba(255,255,255,0.04)", color: "#6b7280", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px", padding: "0 12px", fontWeight: "600", cursor: "pointer", fontSize: "13px" }}>Proxy</button>
              </div>
              <div style={{ fontSize: "11px", color: "#4b5563", marginTop: "8px" }}>Proxy bid = auto-compete up to your max while you focus on other lots.</div>
            </div>
          )}

          {/* CLERK CONSOLE */}
          {mode === "clerk" && (
            <div style={{ padding: "18px", borderBottom: "1px solid rgba(16,185,129,0.08)" }}>
              <div style={{ fontWeight: "700", fontSize: "13px", color: "#10b981", marginBottom: "12px" }}>🔨 Clerk Controls</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                {[100, 250, 500, 1000].map(inc => (
                  <button key={inc} onClick={() => setIncrement(inc)} style={{ padding: "10px", borderRadius: "4px", border: `1px solid ${increment === inc ? "#10b981" : "rgba(16,185,129,0.12)"}`, background: increment === inc ? "rgba(16,185,129,0.15)" : "transparent", color: increment === inc ? "#10b981" : "#6b7280", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}>
                    +${inc.toLocaleString()}
                  </button>
                ))}
              </div>
              <button onClick={() => placeBid(currentBid + increment)} style={{ width: "100%", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "4px", padding: "13px", fontWeight: "900", cursor: "pointer", marginBottom: "8px" }}>
                🔨 Advance Bid +${increment.toLocaleString()}
              </button>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={prevLot} style={{ flex: 1, background: "rgba(16,185,129,0.06)", color: "#6b7280", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "4px", padding: "10px", fontWeight: "700", cursor: "pointer" }}>← Prev Lot</button>
                <button onClick={nextLot} style={{ flex: 1, background: "rgba(16,185,129,0.06)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "10px", fontWeight: "700", cursor: "pointer" }}>Next Lot →</button>
              </div>
            </div>
          )}

          {/* BID HISTORY */}
          <div style={{ padding: "18px", flex: 1 }}>
            <div style={{ fontWeight: "700", fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>Bid History</div>
            {bids.length === 0 ? (
              <div style={{ color: "#4b5563", fontSize: "13px", textAlign: "center", padding: "20px" }}>No bids yet — be the first.</div>
            ) : (
              bids.map((b, i) => (
                <div key={b.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(16,185,129,0.06)", fontSize: "13px" }}>
                  <div>
                    <span style={{ fontWeight: "700", color: i === 0 ? "#10b981" : "#6b7280" }}>${b.amount.toLocaleString()}</span>
                    {i === 0 && <span style={{ marginLeft: "6px", fontSize: "10px", background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "2px 6px", borderRadius: "4px", fontWeight: "700" }}>HIGH</span>}
                  </div>
                  <div style={{ color: "#4b5563" }}>{b.bidder_name}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <RingmanAI page="LiveAuction" />
    </div>
  );
}
