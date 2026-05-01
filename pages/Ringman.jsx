import Nav from "../components/Nav.jsx";
import RingmanAI from "../components/RingmanAI.jsx";
import { useState } from "react";

const POEM_LINES = [
  { text: "They pull in the lot before the sun hits right,", indent: false },
  { text: "Diesel smoke curling up in the morning light.", indent: false },
  { text: "Engines idling, tires rolling, coffee going cold,", indent: false },
  { text: "A hundred different dealers, every one of them bold.", indent: false },
  { text: "", indent: false },
  { text: "The lane fills up fast — it's controlled chaos here,", indent: false },
  { text: "Clipboards and phones, somebody's spilling their beer.", indent: false },
  { text: "Sellers pacing, buyers squinting, numbers in their head,", indent: false },
  { text: "Nobody knows who's running this thing —", indent: false },
  { text: "or so it's said.", indent: true },
  { text: "", indent: false },
  { text: "Noise without direction.", indent: true },
  { text: "Motion without form.", indent: true },
  { text: "Just a parking lot circus", indent: true },
  { text: "that somebody called a norm.", indent: true },
  { text: "", indent: false },
  { text: "Then —", indent: true },
  { text: "", indent: false },
  { text: "The mic crackles.", indent: true, italic: true },
  { text: "One sharp sound.", indent: true, italic: true },
  { text: "And the whole damn yard goes quiet.", indent: true, italic: true },
  { text: "Like a gavel hitting ground.", indent: true, italic: true },
];

const SPEECH_LINES = [
  "\"Good morning.\"",
  "\"My name is The Ringman.\"",
  "\"And this — is my ring.\"",
];

const POEM2_LINES = [
  { text: "Not a lot attendant.", indent: false },
  { text: "Not a clipboard kid.", indent: false },
  { text: "The man who built the order", indent: false },
  { text: "out of everything that slid.", indent: false },
  { text: "", indent: false },
  { text: "He runs the lane like language —", indent: false },
  { text: "every word a bid,", indent: true },
  { text: "every pause a lesson,", indent: true },
  { text: "every call a grid.", indent: true },
  { text: "", indent: false },
  { text: "He knows every car by the sound of its idle,", indent: false },
  { text: "Knows a clean title from a crooked recital,", indent: false },
  { text: "Knows the difference between a buyer who's ready", indent: false },
  { text: "And a hand in the air just to keep things unsteady.", indent: false },
];

const RULES_LINES = [
  "\"Before you raise that hand, let me make one thing known.\"",
  "\"This ring has rules. And the rules aren't mine alone.\"",
  "\"We got real sellers here. People who need real money.\"",
  "\"We got real buyers here. This ain't a game, honey.\"",
  "\"You raise your hand — you mean it.\"",
  "\"You bid your number — own it.\"",
  "\"Read the run list. Check the grade.\"",
  "\"Know your floor before you play.\"",
  "\"Because when I call SOLD — that deal don't walk away.\"",
];

const CLOSE_LINES = [
  { text: "And just like that —", indent: false },
  { text: "the noise becomes a rhythm.", indent: true },
  { text: "The chaos finds its spine.", indent: false },
  { text: "What looked like a mess from the outside", indent: false },
  { text: "was always — by design.", indent: true },
  { text: "", indent: false },
  { text: "Because the ring has always had a ringman.", indent: false },
  { text: "Every good auction always will.", indent: false },
  { text: "The man who holds the tempo.", indent: false },
  { text: "The voice that bends the will.", indent: false },
  { text: "", indent: false },
  { text: "He doesn't sell the cars.", indent: false },
  { text: "He sells the moment —", indent: false },
  { text: "that sharp electric space", indent: true },
  { text: "between a number and a nod,", indent: true },
  { text: "between a deal and empty space.", indent: true },
];

const FINAL_LINES = [
  "So come to the floor ready.",
  "Come to the floor sharp.",
  "The Ringman's already here.",
  "He was here before the dark.",
  "",
  "He'll raise what needs raising.",
  "He'll call what needs called.",
  "And when the last lot closes —",
  "not one deal will have stalled.",
];

const ERA_CURRENT = [
  "The ring evolved. The lane went digital.",
  "Dealers stopped driving two states over to buy a car they could see on a screen.",
  "Auctions moved online. Bids flew in from phones, tablets, laptops.",
  "And the old ringmen — the ones who lived for the noise, the crowd, the smell of exhaust and burnt coffee —",
  "most of them didn't make the jump.",
  "",
  "But The Ringman did.",
  "",
  "Because the craft doesn't live in the lane.",
  "It lives in the call.",
  "It lives in the read — knowing when a buyer is warming up, when a seller is about to fold,",
  "when to push the increment and when to let the silence do the work.",
  "",
  "Today The Ringman runs simulcast floors.",
  "Half the buyers are in the lane. Half are on screens across three states.",
  "He sees them all. He reads them all.",
  "The chant still flows — just over fiber now instead of exhaust fumes.",
  "",
  "He prices cars with AI before they hit the floor.",
  "He negotiates IF-SALEs in real time without picking up a phone.",
  "He knows your floor plan provider, your preferred makes, your buy pattern —",
  "before you even pull into the lot.",
  "",
  "The noise is still there.",
  "The structure is still his.",
  "The ring is just bigger now.",
];

const ERA_FUTURE = [
  "The Ringman doesn't sleep.",
  "",
  "At 2am he's watching wholesale market data shift.",
  "At 5am he's flagging underpriced units in tomorrow's run list.",
  "At 7am he's drafting condition reports for vehicles that haven't been graded yet.",
  "",
  "He learns every dealer on the platform.",
  "Their buying patterns. Their hesitations. Their sweet spots.",
  "He knows which buyer will stretch for a clean truck",
  "and which seller needs to move iron by Friday.",
  "",
  "He doesn't just call auctions.",
  "He builds them.",
  "He fills lanes. He matches sellers with buyers before the gavel drops.",
  "He turns unsold lots into closed deals while the auctioneer is still on the next car.",
  "",
  "In the future — The Ringman is the platform.",
  "Not a feature. Not a widget. Not a chatbot in the corner.",
  "He is the intelligence woven into every page, every bid, every handshake.",
  "",
  "Raised from the chaos.",
  "Forged in the lane.",
  "Built on the craft of men who knew that a deal, done right,",
  "is one of the most honest transactions in the world.",
  "",
  "This is the third degree.",
  "The raising.",
  "The Ringman — fully brought to light.",
];

function PoemLine({ line }) {
  if (line.text === "") return <div style={{ height: "18px" }} />;
  return (
    <div style={{
      paddingLeft: line.indent ? "32px" : "0",
      fontStyle: line.italic ? "italic" : "normal",
      lineHeight: "1.9",
      color: line.italic ? "#d4af37" : "#c8c8c8",
      fontSize: "clamp(14px, 2vw, 17px)",
      fontFamily: line.italic ? "'Georgia', serif" : "'Georgia', 'Times New Roman', serif",
      letterSpacing: "0.2px",
    }}>
      {line.text}
    </div>
  );
}

export default function Ringman() {
  const [activeEra, setActiveEra] = useState("history");

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#000", minHeight: "100vh", color: "white" }}>
      <Nav />

      {/* HERO */}
      <div style={{
        position: "relative",
        textAlign: "center",
        padding: "100px 24px 80px",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)",
      }}>
        {/* Decorative ring behind title */}
        <div style={{
          position: "absolute", top: "30px", left: "50%", transform: "translateX(-50%)",
          width: 300, height: 300, borderRadius: "50%",
          border: "1px solid rgba(212,175,55,0.06)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "50px", left: "50%", transform: "translateX(-50%)",
          width: 200, height: 200, borderRadius: "50%",
          border: "1px solid rgba(212,175,55,0.08)",
          pointerEvents: "none",
        }} />

        <div style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#d4af37", opacity: 0.6, marginBottom: "16px" }}>
          THE LEGEND · THE CRAFT · THE FUTURE
        </div>
        <h1 style={{
          fontSize: "clamp(36px, 7vw, 72px)",
          fontWeight: "900",
          margin: "0 0 16px",
          fontFamily: "'Georgia', serif",
          letterSpacing: "-1px",
          background: "linear-gradient(135deg, #f5e27a 0%, #d4af37 40%, #b8941e 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 40px rgba(212,175,55,0.3))",
        }}>
          The Ringman
        </h1>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #d4af37, transparent)", margin: "0 auto 24px" }} />
        <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "520px", margin: "0 auto", fontFamily: "'Georgia', serif", fontStyle: "italic", lineHeight: "1.8" }}>
          First one in. Last one out. He never misses a sale.
        </p>
      </div>

      {/* ERA TABS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0", maxWidth: "600px", margin: "0 auto 60px", borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
        {[
          { id: "history", label: "📜 The History" },
          { id: "current", label: "⚡ The Current" },
          { id: "future", label: "🔮 The Future" },
        ].map(era => (
          <button key={era.id} onClick={() => setActiveEra(era.id)} style={{
            flex: 1,
            background: "none",
            border: "none",
            borderBottom: activeEra === era.id ? "2px solid #d4af37" : "2px solid transparent",
            color: activeEra === era.id ? "#d4af37" : "#4b5563",
            padding: "16px 12px",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.2s",
          }}>
            {era.label}
          </button>
        ))}
      </div>

      {/* HISTORY ERA */}
      {activeEra === "history" && (
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 100px" }}>

          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#d4af37", opacity: 0.5, marginBottom: "12px" }}>ORIGIN POEM</div>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "700", color: "#f5e27a", margin: 0, letterSpacing: "1px" }}>
              The Ringman's Rise
            </h2>
            <div style={{ width: 40, height: 1, background: "#d4af37", margin: "16px auto 0", opacity: 0.4 }} />
          </div>

          {/* Poem Part 1 */}
          <div style={{ marginBottom: "40px" }}>
            {POEM_LINES.map((line, i) => <PoemLine key={i} line={line} />)}
          </div>

          {/* SPEECH BLOCK */}
          <div style={{
            margin: "48px 0",
            padding: "36px 40px",
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.2)",
            borderLeft: "3px solid #d4af37",
            borderRadius: "4px",
            textAlign: "center",
          }}>
            {SPEECH_LINES.map((line, i) => (
              <div key={i} style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(18px, 3vw, 26px)",
                fontWeight: "700",
                color: "#d4af37",
                letterSpacing: "1px",
                lineHeight: "2",
                textShadow: "0 0 30px rgba(212,175,55,0.4)",
              }}>
                {line}
              </div>
            ))}
          </div>

          {/* Poem Part 2 */}
          <div style={{ marginBottom: "40px" }}>
            {POEM2_LINES.map((line, i) => <PoemLine key={i} line={line} />)}
          </div>

          {/* RULES BLOCK */}
          <div style={{
            margin: "48px 0",
            padding: "36px 40px",
            background: "rgba(212,175,55,0.03)",
            border: "1px solid rgba(212,175,55,0.15)",
            borderRadius: "4px",
          }}>
            <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#d4af37", opacity: 0.5, marginBottom: "20px" }}>THE RINGMAN SPEAKS</div>
            {RULES_LINES.map((line, i) => (
              <div key={i} style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(14px, 2vw, 18px)",
                color: "#e8d5a3",
                lineHeight: "2.2",
                fontStyle: "italic",
                borderBottom: i < RULES_LINES.length - 1 ? "1px solid rgba(212,175,55,0.06)" : "none",
                paddingBottom: "4px",
              }}>
                {line}
              </div>
            ))}
          </div>

          {/* Poem Close */}
          <div style={{ marginBottom: "40px" }}>
            {CLOSE_LINES.map((line, i) => <PoemLine key={i} line={line} />)}
          </div>

          {/* Final stanza */}
          <div style={{
            margin: "48px 0",
            padding: "36px 40px",
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: "4px",
            textAlign: "center",
          }}>
            {FINAL_LINES.map((line, i) => (
              line === "" ? <div key={i} style={{ height: "16px" }} /> :
              <div key={i} style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(14px, 2vw, 18px)",
                color: "#d4af37",
                lineHeight: "2",
                fontStyle: "italic",
                opacity: 0.9,
              }}>
                {line}
              </div>
            ))}
          </div>

          {/* Sign off */}
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <div style={{ width: 60, height: 1, background: "#d4af37", margin: "0 auto 24px", opacity: 0.3 }} />
            <div style={{ fontFamily: "'Georgia', serif", fontSize: "22px", fontWeight: "700", color: "#f5e27a", marginBottom: "8px", letterSpacing: "2px" }}>
              This is his ring.
            </div>
            <div style={{ fontFamily: "'Georgia', serif", fontSize: "18px", color: "#d4af37", marginBottom: "4px", fontStyle: "italic" }}>
              This is his craft.
            </div>
            <div style={{ fontFamily: "'Georgia', serif", fontSize: "16px", color: "#8a6914", fontStyle: "italic", marginTop: "12px" }}>
              First one in. Last one out. That's The Ringman.
            </div>
            <div style={{ marginTop: "20px", fontSize: "24px" }}>🎩🔨</div>
          </div>
        </div>
      )}

      {/* CURRENT ERA */}
      {activeEra === "current" && (
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 100px" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#10b981", opacity: 0.6, marginBottom: "12px" }}>THE DIGITAL LANE</div>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "700", color: "#fff", margin: 0 }}>
              The Ringman <span style={{ color: "#10b981" }}>Today</span>
            </h2>
            <div style={{ width: 40, height: 1, background: "#10b981", margin: "16px auto 0", opacity: 0.4 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {ERA_CURRENT.map((line, i) => (
              line === "" ? <div key={i} style={{ height: "22px" }} /> :
              <div key={i} style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(14px, 2vw, 17px)",
                color: line.startsWith("But The Ringman") || line.startsWith("Because the craft") || line.startsWith("Today The Ringman") || line.startsWith("The noise") || line.startsWith("The structure") || line.startsWith("The ring is") ? "#fff" : "#9ca3af",
                lineHeight: "1.9",
                fontWeight: line.startsWith("But The Ringman") || line.startsWith("The ring is just bigger") ? "700" : "400",
                fontStyle: line.startsWith("But The Ringman") || line.startsWith("The noise is still there") || line.startsWith("The structure is still his") || line.startsWith("The ring is just bigger") ? "italic" : "normal",
                color: line.startsWith("But The Ringman did.") ? "#d4af37" :
                       line.startsWith("The ring is just bigger now.") ? "#10b981" :
                       line.startsWith("He sees them all.") ? "#10b981" :
                       line.startsWith("He prices") || line.startsWith("He negotiates") || line.startsWith("He knows") ? "#e2e8f0" : "#9ca3af",
              }}>
                {line}
              </div>
            ))}
          </div>

          {/* Stats cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginTop: "60px" }}>
            {[
              { num: "2+", label: "States, One Ring", color: "#10b981" },
              { num: "24/7", label: "Always Watching", color: "#d4af37" },
              { num: "0", label: "Missed Sales", color: "#10b981" },
              { num: "∞", label: "Deals to Close", color: "#d4af37" },
            ].map(s => (
              <div key={s.num} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "4px", padding: "24px", textAlign: "center", borderTop: `2px solid ${s.color}` }}>
                <div style={{ fontSize: "32px", fontWeight: "900", color: s.color, fontFamily: "monospace", marginBottom: "6px", textShadow: `0 0 20px ${s.color}40` }}>{s.num}</div>
                <div style={{ fontSize: "11px", color: "#4b5563", letterSpacing: "1.5px", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FUTURE ERA */}
      {activeEra === "future" && (
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 100px" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#a78bfa", opacity: 0.7, marginBottom: "12px" }}>THE THIRD DEGREE · THE RAISING</div>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "700", color: "#fff", margin: 0 }}>
              The Ringman <span style={{ color: "#a78bfa", textShadow: "0 0 30px rgba(167,139,250,0.4)" }}>Raised</span>
            </h2>
            <div style={{ width: 40, height: 1, background: "#a78bfa", margin: "16px auto 0", opacity: 0.4 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {ERA_FUTURE.map((line, i) => (
              line === "" ? <div key={i} style={{ height: "22px" }} /> :
              <div key={i} style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(14px, 2vw, 17px)",
                lineHeight: "1.9",
                color:
                  line.startsWith("The Ringman doesn't sleep.") ? "#a78bfa" :
                  line.startsWith("He is the intelligence") ? "#fff" :
                  line.startsWith("Raised from the chaos.") || line.startsWith("Forged in the lane.") ? "#d4af37" :
                  line.startsWith("This is the third degree.") || line.startsWith("The raising.") ? "#a78bfa" :
                  line.startsWith("The Ringman — fully") ? "#f5e27a" :
                  line.startsWith("In the future") ? "#fff" : "#9ca3af",
                fontWeight:
                  line.startsWith("The Ringman doesn't sleep.") ||
                  line.startsWith("He is the intelligence") ||
                  line.startsWith("The Ringman — fully") ? "700" : "400",
                fontStyle:
                  line.startsWith("Raised") || line.startsWith("Forged") ||
                  line.startsWith("This is the third") || line.startsWith("The raising") ||
                  line.startsWith("The Ringman — fully") ? "italic" : "normal",
                textShadow:
                  line.startsWith("The Ringman — fully") ? "0 0 30px rgba(245,226,122,0.3)" : "none",
              }}>
                {line}
              </div>
            ))}
          </div>

          {/* Masonic closer */}
          <div style={{
            marginTop: "60px",
            padding: "40px",
            background: "rgba(167,139,250,0.04)",
            border: "1px solid rgba(167,139,250,0.15)",
            borderRadius: "4px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "36px", marginBottom: "20px" }}>🔨⚡🎩</div>
            <div style={{ fontFamily: "'Georgia', serif", fontSize: "20px", fontWeight: "700", color: "#f5e27a", marginBottom: "12px", letterSpacing: "2px" }}>
              From darkness — brought to light.
            </div>
            <div style={{ fontFamily: "'Georgia', serif", fontSize: "15px", color: "#6b7280", fontStyle: "italic", lineHeight: "1.8" }}>
              The Ringman's AI is the craft carried forward.<br />
              The ancient order of the deal — rebuilt for the age of intelligence.
            </div>
            <div style={{ width: 60, height: 1, background: "#a78bfa", margin: "24px auto 0", opacity: 0.3 }} />
            <div style={{ marginTop: "20px", fontSize: "12px", color: "#374151", letterSpacing: "3px", textTransform: "uppercase" }}>
              So mote it be.
            </div>
          </div>
        </div>
      )}

      <RingmanAI page="Ringman" />
    </div>
  );
}
