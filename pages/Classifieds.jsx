import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Auctions", href: "/RunList" },
  { label: "Classifieds", href: "/Classifieds" },
  { label: "Open Auctions", href: "/OpenAuctions" },
  { label: "News", href: "/NewsRoom" },
  { label: "Pricing", href: "/Pricing" },
  { label: "Why Ringman", href: "/WhyRingman" },
];

const SAMPLE_LISTINGS = [
  { id: 1, year: 2021, make: "Ford", model: "F-150", trim: "XLT", mileage: 42000, price: 34900, color: "Agate Black", city: "Tulsa", state: "OK", condition: "Good", photos: 12, verified: true, days: 2, badge: "🎩 Ringman Verified" },
  { id: 2, year: 2019, make: "Chevrolet", model: "Silverado 1500", trim: "LTZ", mileage: 67000, price: 28500, color: "Iridescent Pearl", city: "Oklahoma City", state: "OK", condition: "Fair", photos: 10, verified: false, days: 5, badge: null },
  { id: 3, year: 2022, make: "Toyota", model: "4Runner", trim: "TRD Off-Road", mileage: 28000, price: 41500, color: "Army Green", city: "Dallas", state: "TX", condition: "Excellent", photos: 15, verified: true, days: 1, badge: "🎩 Ringman Verified" },
  { id: 4, year: 2020, make: "Jeep", model: "Wrangler", trim: "Rubicon", mileage: 53000, price: 36800, color: "Bright White", city: "Wichita", state: "KS", condition: "Good", photos: 8, verified: false, days: 7, badge: null },
  { id: 5, year: 2023, make: "RAM", model: "1500", trim: "Big Horn", mileage: 18000, price: 44200, color: "Patriot Blue", city: "Kansas City", state: "MO", condition: "Excellent", photos: 14, verified: true, days: 3, badge: "🎩 Ringman Verified" },
  { id: 6, year: 2018, make: "Honda", model: "Accord", trim: "Sport 2.0T", mileage: 89000, price: 18900, color: "Lunar Silver", city: "Memphis", state: "TN", condition: "Fair", photos: 9, verified: false, days: 10, badge: null },
];

const LISTING_PACKAGES = [
  { name: "Basic", price: "$19.99", duration: "7 days", photos: "8 photos", placement: "Standard", features: ["Basic listing", "Contact form", "8 photo slots", "7-day duration"] },
  { name: "Featured", price: "$39.99", duration: "30 days", photos: "20 photos", placement: "Priority", features: ["Priority placement", "Contact form", "20 photo slots", "30-day duration", "History report add-on available"], popular: true },
  { name: "Premium", price: "$69.99", duration: "60 days", photos: "Unlimited", placement: "Homepage", features: ["Homepage featured slot", "Unlimited photos", "60-day duration", "Free AI description", "History report included", "Ringman Verified badge eligible"] },
];

const COND_COLOR = { Excellent: "#10b981", Good: "#06b6d4", Fair: "#f59e0b", Rough: "#ef4444" };

function RegisterWall({ action, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#0f0f1a", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 16, padding: 48, textAlign: "center", maxWidth: 420 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎩</div>
        <h3 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 12px", fontFamily: "'Georgia',serif" }}>
          {action === "list" ? "List Your Vehicle" : "Contact the Seller"}
        </h3>
        <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>
          {action === "list"
            ? "Create a free account to list your vehicle on the Ringman's AI classifieds. Reach dealers and buyers across the region."
            : "Register for free to contact this seller, get their information, and start the conversation."}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="/" style={{ padding: "14px", borderRadius: 8, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontWeight: 800, fontSize: 15, textDecoration: "none" }}>Create Free Account →</a>
          <a href="/" style={{ padding: "14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Already have an account? Sign In</a>
          <button onClick={onClose} style={{ padding: "10px", background: "transparent", border: "none", color: "#4b5563", cursor: "pointer", fontSize: 13 }}>Continue Browsing</button>
        </div>
      </div>
    </div>
  );
}

export default function Classifieds() {
  useEffect(() => {
    document.title = "Vehicle Classifieds — Buy and Sell Cars at Fixed Price | Ringman's AI";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Browse fixed-price vehicle listings from dealers and private sellers. Free to browse. Register to list or contact sellers. Listings start at $19.99.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "Vehicle Classifieds — Buy and Sell Cars at Fixed Price | Ringman's AI", "property");
    setMeta("og:description", "Browse fixed-price vehicle listings from dealers and private sellers. Free to browse. Register to list or contact sellers. Listings start at $19.99.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Vehicle Classifieds — Buy and Sell Cars at Fixed Price | Ringman's AI");
    setMeta("twitter:description", "Browse fixed-price vehicle listings from dealers and private sellers. Free to browse. Register to list or contact sellers. Listings start at $19.99.");
  }, []);

  const [wall, setWall] = useState(null); // null | 'list' | 'contact'
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterCondition, setFilterCondition] = useState("All");

  const filtered = SAMPLE_LISTINGS.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${l.year} ${l.make} ${l.model} ${l.trim}`.toLowerCase().includes(q);
    const matchCond = filterCondition === "All" || l.condition === filterCondition;
    return matchSearch && matchCond;
  }).sort((a, b) => sortBy === "price_asc" ? a.price - b.price : sortBy === "price_desc" ? b.price - a.price : sortBy === "mileage" ? a.mileage - b.mileage : a.days - b.days);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {wall && <RegisterWall action={wall} onClose={() => setWall(null)} />}

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 20 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: l.href === "/Classifieds" ? "#10b981" : "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <button onClick={() => setWall("list")} style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#10b981,#059669)", color: "white", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>+ List Your Vehicle</button>
      </nav>

      {/* HERO */}
      <div style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)", padding: "60px 24px 40px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#10b981", marginBottom: 12 }}>VEHICLE CLASSIFIEDS</div>
            <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>
              Buy and sell vehicles.<br />
              <span style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>No auction. Fixed price.</span>
            </h1>
            <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 500, margin: "0 auto" }}>Browse free. Register to list or contact sellers. Dealers and private owners welcome.</p>
          </div>

          {/* Search bar */}
          <div style={{ display: "flex", gap: 10, maxWidth: 700, margin: "0 auto", flexWrap: "wrap" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by year, make, model..."
              style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white", padding: "12px 16px", fontSize: 15, outline: "none", minWidth: 200 }} />
            <select value={filterCondition} onChange={e => setFilterCondition(e.target.value)}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#d1d5db", padding: "12px 14px", fontSize: 14, outline: "none" }}>
              {["All", "Excellent", "Good", "Fair", "Rough"].map(c => <option key={c} value={c} style={{ background: "#1a1a2e" }}>{c} Condition</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#d1d5db", padding: "12px 14px", fontSize: 14, outline: "none" }}>
              <option value="newest" style={{ background: "#1a1a2e" }}>Newest First</option>
              <option value="price_asc" style={{ background: "#1a1a2e" }}>Price: Low to High</option>
              <option value="price_desc" style={{ background: "#1a1a2e" }}>Price: High to Low</option>
              <option value="mileage" style={{ background: "#1a1a2e" }}>Lowest Mileage</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 32 }}>

        {/* LISTINGS */}
        <div>
          <div style={{ fontSize: 13, color: "#4b5563", marginBottom: 20 }}>{filtered.length} vehicles found</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.map((l, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: 20, display: "grid", gridTemplateColumns: "140px 1fr auto", gap: 20, alignItems: "center" }}>
                {/* Photo placeholder */}
                <div style={{ height: 90, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 24 }}>🚗</div>
                  <div style={{ fontSize: 10, color: "#4b5563", marginTop: 4 }}>{l.photos} photos</div>
                </div>

                {/* Details */}
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#f1f5f9" }}>{l.year} {l.make} {l.model}</span>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{l.trim}</span>
                    {l.badge && <span style={{ fontSize: 10, color: "#f59e0b", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 4, padding: "2px 8px" }}>{l.badge}</span>}
                  </div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, color: "#9ca3af" }}>🔢 {l.mileage.toLocaleString()} mi</span>
                    <span style={{ fontSize: 13, color: "#9ca3af" }}>🎨 {l.color}</span>
                    <span style={{ fontSize: 13, color: "#9ca3af" }}>📍 {l.city}, {l.state}</span>
                    <span style={{ fontSize: 12, color: COND_COLOR[l.condition], fontWeight: 700 }}>● {l.condition}</span>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: "#4b5563" }}>Listed {l.days} day{l.days !== 1 ? "s" : ""} ago</div>
                </div>

                {/* Price + CTA */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#f1f5f9", marginBottom: 12 }}>${l.price.toLocaleString()}</div>
                  <button onClick={() => setWall("contact")}
                    style={{ padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: "linear-gradient(135deg,#10b981,#059669)", color: "white", whiteSpace: "nowrap" }}>
                    Contact Seller
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* List CTA */}
          <div style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(6,182,212,0.06))", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🚗</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>Sell Your Vehicle</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.6 }}>Listings start at $19.99. Reach dealers and buyers across the region.</div>
            <button onClick={() => setWall("list")}
              style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: "linear-gradient(135deg,#10b981,#059669)", color: "white" }}>
              List My Vehicle →
            </button>
          </div>

          {/* Listing packages */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#6b7280", marginBottom: 16 }}>Listing Packages</div>
            {LISTING_PACKAGES.map((pkg, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: i < LISTING_PACKAGES.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: pkg.popular ? "#10b981" : "#d1d5db" }}>{pkg.name} {pkg.popular ? "⭐" : ""}</span>
                  <span style={{ fontSize: 14, fontWeight: 900, color: "#f1f5f9" }}>{pkg.price}</span>
                </div>
                <div style={{ fontSize: 12, color: "#4b5563" }}>{pkg.duration} · {pkg.photos}</div>
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
