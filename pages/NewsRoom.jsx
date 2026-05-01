import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Auctions", href: "/RunList" },
  { label: "Classifieds", href: "/Classifieds" },
  { label: "Open Auctions", href: "/OpenAuctions" },
  { label: "News", href: "/NewsRoom" },
  { label: "Pricing", href: "/Pricing" },
  { label: "Why Ringman", href: "/WhyRingman" },
];

// RSS feeds proxied through allorigins to avoid CORS
const FEEDS = [
  { name: "Auto Remarketing", url: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.autoremarketing.com/feed"), category: "Wholesale", color: "#06b6d4" },
  { name: "Automotive News", url: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.autonews.com/arc/outboundfeeds/rss/"), category: "Industry", color: "#8b5cf6" },
  { name: "WardsAuto", url: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.wardsauto.com/rss.xml"), category: "Industry", color: "#f59e0b" },
  { name: "Motor Authority", url: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.motorauthority.com/rss.xml"), category: "Vehicles", color: "#10b981" },
  { name: "EIN Automotive", url: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://automotive.einnews.com/rss/news-automotive"), category: "Breaking", color: "#ef4444" },
];

const CATEGORIES = ["All", "Wholesale", "Industry", "Vehicles", "Breaking"];

function parseRSS(xmlText) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "text/xml");
    const items = Array.from(doc.querySelectorAll("item")).slice(0, 8);
    return items.map(item => ({
      title: item.querySelector("title")?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, "").trim() || "",
      link: item.querySelector("link")?.textContent?.trim() || "#",
      description: item.querySelector("description")?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]+>/g, "").trim().slice(0, 160) + "..." || "",
      pubDate: item.querySelector("pubDate")?.textContent || "",
      image: item.querySelector("enclosure")?.getAttribute("url") || item.querySelector("image url")?.textContent || null,
    }));
  } catch {
    return [];
  }
}

function timeAgo(dateStr) {
  try {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
    return `${Math.round(diff / 86400)}d ago`;
  } catch { return ""; }
}

export default function NewsRoom() {
  useEffect(() => {
    document.title = "Auto Industry Newsroom — Live Feeds | Ringman's AI";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Live automotive industry news from Auto Remarketing, Automotive News, WardsAuto, Motor Authority, and EIN Automotive. Updated hourly for dealers and auto professionals.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "Auto Industry Newsroom — Live Feeds | Ringman's AI", "property");
    setMeta("og:description", "Live automotive industry news from Auto Remarketing, Automotive News, WardsAuto, Motor Authority, and EIN Automotive. Updated hourly for dealers and auto professionals.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Auto Industry Newsroom — Live Feeds | Ringman's AI");
    setMeta("twitter:description", "Live automotive industry news from Auto Remarketing, Automotive News, WardsAuto, Motor Authority, and EIN Automotive. Updated hourly for dealers and auto professionals.");
  }, []);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSource, setActiveSource] = useState("All");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchAllFeeds();
  }, []);

  const fetchAllFeeds = async () => {
    setLoading(true);
    const results = [];
    await Promise.allSettled(
      FEEDS.map(async (feed) => {
        try {
          const res = await fetch(feed.url);
          const data = await res.json();
          const items = parseRSS(data.contents || "");
          items.forEach(item => results.push({ ...item, source: feed.name, category: feed.category, sourceColor: feed.color }));
        } catch { /* skip failed feed */ }
      })
    );
    // Sort by date, newest first
    results.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    setArticles(results);
    setLastUpdated(new Date());
    setLoading(false);
  };

  const filtered = articles.filter(a => {
    const catMatch = activeCategory === "All" || a.category === activeCategory;
    const srcMatch = activeSource === "All" || a.source === activeSource;
    return catMatch && srcMatch;
  });

  const S = { fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" };

  return (
    <div style={S}>
      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <div style={{ display: "flex", gap: 20 }}>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: l.href === "/NewsRoom" ? "#06b6d4" : "#6b7280", fontSize: 13, textDecoration: "none" }}>{l.label}</a>)}
        </div>
        <a href="/" style={{ padding: "8px 20px", borderRadius: 6, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Get Started</a>
      </nav>

      {/* HERO */}
      <div style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 70%)", padding: "60px 24px 40px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#06b6d4", marginBottom: 12 }}>AUTO INDUSTRY NEWSROOM</div>
        <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>
          The Pulse of the <span style={{ background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Industry.</span>
        </h1>
        <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 500, margin: "0 auto 20px" }}>Live feeds from Auto Remarketing, Automotive News, WardsAuto, Motor Authority, and more — updated every hour.</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 12, color: "#10b981" }}>LIVE</span>
          {lastUpdated && <span style={{ fontSize: 12, color: "#4b5563" }}>— Updated {lastUpdated.toLocaleTimeString()}</span>}
          <button onClick={fetchAllFeeds} style={{ marginLeft: 8, padding: "4px 12px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#6b7280", fontSize: 12, cursor: "pointer" }}>Refresh</button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 32 }}>

        {/* MAIN FEED */}
        <div>
          {/* Filters */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)}
                  style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${activeCategory === c ? "rgba(6,182,212,0.5)" : "rgba(255,255,255,0.06)"}`, background: activeCategory === c ? "rgba(6,182,212,0.1)" : "transparent", color: activeCategory === c ? "#06b6d4" : "#6b7280", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Source tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
            {["All", ...FEEDS.map(f => f.name)].map(s => (
              <button key={s} onClick={() => setActiveSource(s)}
                style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${activeSource === s ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}`, background: activeSource === s ? "rgba(255,255,255,0.06)" : "transparent", color: activeSource === s ? "#e2e8f0" : "#4b5563", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 0.3 }}>
                {s}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 16, animation: "spin 1s linear infinite", display: "inline-block" }}>⚙️</div>
              <div style={{ color: "#6b7280" }}>Pulling live feeds...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#4b5563" }}>No articles found for this filter.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map((article, i) => (
                <a key={i} href={article.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderLeft: `3px solid ${article.sourceColor}`, borderRadius: "0 10px 10px 0", padding: "18px 20px", transition: "all 0.15s", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: article.sourceColor, background: article.sourceColor + "15", border: `1px solid ${article.sourceColor}33`, borderRadius: 4, padding: "2px 8px" }}>{article.source}</span>
                      <span style={{ fontSize: 10, color: "#4b5563", letterSpacing: 1, textTransform: "uppercase", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 4, padding: "2px 8px" }}>{article.category}</span>
                      <span style={{ fontSize: 11, color: "#4b5563", marginLeft: "auto" }}>{timeAgo(article.pubDate)}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 6, lineHeight: 1.4 }}>{article.title}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{article.description}</div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Sources */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#6b7280", marginBottom: 16 }}>News Sources</div>
            {FEEDS.map((f, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < FEEDS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color }} />
                  <span style={{ fontSize: 13, color: "#d1d5db" }}>{f.name}</span>
                </div>
                <span style={{ fontSize: 11, color: f.color, background: f.color + "15", padding: "2px 8px", borderRadius: 4 }}>{f.category}</span>
              </div>
            ))}
          </div>

          {/* Ad space */}
          <div style={{ background: "rgba(6,182,212,0.04)", border: "1px dashed rgba(6,182,212,0.2)", borderRadius: 10, padding: 20, textAlign: "center", minHeight: 250, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#06b6d4", marginBottom: 8 }}>300×250 Ad Space</div>
            <div style={{ fontSize: 13, color: "#4b5563", marginBottom: 16 }}>Available for advertisers</div>
            <a href="/Advertising" style={{ padding: "8px 20px", borderRadius: 6, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>Book This Space →</a>
          </div>

          {/* Market pulse */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#f59e0b", marginBottom: 16 }}>Market Pulse</div>
            {[
              { label: "Wholesale Used Car Index", value: "↑ 2.3%", color: "#10b981" },
              { label: "Avg Days to Sale", value: "34 days", color: "#06b6d4" },
              { label: "Manheim MMR Trend", value: "↓ 0.8%", color: "#ef4444" },
              { label: "Rental Returns Volume", value: "↑ High", color: "#f59e0b" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{m.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: m.color }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}
