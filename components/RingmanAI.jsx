import { useState, useEffect, useRef } from "react";

const FUNCTION_URL = "https://chap-c489b18c.base44.app/functions/ringmanChat";

const SESSION_KEY = "ringman_session";
function getSession() {
  let s = sessionStorage.getItem(SESSION_KEY);
  if (!s) { s = "s_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8); sessionStorage.setItem(SESSION_KEY, s); }
  return s;
}

const PAGE_PROMPTS = {
  Home: "Welcome — I'm watching the market. What can I find for you?",
  RunList: "I've got eyes on every lot. Which unit do you want to know about?",
  LiveAuction: "We're live. Ask fast — I don't miss a bid.",
  VehicleIntake: "Bring it to the ring. I'll help you price it right.",
  Dashboard: "Numbers are in. Want me to break them down?",
  Dealers: "I know every dealer on this floor. What do you need?",
  VehicleDetail: "I'm reading this unit. Ask me anything about it.",
  Ringman: "You're in my house now. Ask me anything.",
  FAQ: "Got questions? Good. I've got answers.",
  WhyUs: "You want to know why we're better? I'll show you.",
};

export default function RingmanAI({ page = "Home", contextData = {} }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [marketPoints, setMarketPoints] = useState(null);
  const [predAccuracy, setPredAccuracy] = useState(null);
  const messagesEndRef = useRef(null);
  const sessionId = useRef(getSession());

  // Greeting on open
  useEffect(() => {
    if (open && messages.length === 0) {
      const greeting = PAGE_PROMPTS[page] || "I'm The Ringman. Ask me anything.";
      setMessages([{ role: "ringman", text: greeting, ts: Date.now() }]);
    }
  }, [open]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Pulse effect every 30s when closed
  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1500);
    }, 30000);
    return () => clearInterval(interval);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text, ts: Date.now() }]);
    setLoading(true);

    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          page,
          context_data: contextData,
          session_id: sessionId.current,
        }),
      });
      const data = await res.json();
      if (data.response) {
        setMessages(prev => [...prev, { role: "ringman", text: data.response, ts: Date.now() }]);
        if (data.market_data_points != null) setMarketPoints(data.market_data_points);
        if (data.prediction_accuracy != null) setPredAccuracy(data.prediction_accuracy);
      } else {
        setMessages(prev => [...prev, { role: "ringman", text: "Something went sideways in the ring. Try again.", ts: Date.now() }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "ringman", text: "Lost connection. Check your signal and try again.", ts: Date.now() }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <>
      {/* FLOATING BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            width: 62,
            height: 62,
            borderRadius: "50%",
            background: pulse
              ? "radial-gradient(circle, #f5e27a, #d4af37)"
              : "radial-gradient(circle, #d4af37, #b8941e)",
            border: "none",
            cursor: "pointer",
            zIndex: 9998,
            boxShadow: pulse
              ? "0 0 0 8px rgba(212,175,55,0.2), 0 0 40px rgba(212,175,55,0.6), 0 4px 20px rgba(0,0,0,0.5)"
              : "0 0 20px rgba(212,175,55,0.4), 0 4px 20px rgba(0,0,0,0.5)",
            transform: pulse ? "scale(1.08)" : "scale(1)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
          }}
          title="Ask The Ringman"
        >
          🎩
        </button>
      )}

      {/* CHAT PANEL */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: "min(400px, calc(100vw - 32px))",
          height: "min(580px, calc(100vh - 80px))",
          background: "#0d0d12",
          border: "1px solid rgba(212,175,55,0.25)",
          borderRadius: "8px",
          zIndex: 9998,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 0 60px rgba(212,175,55,0.12), 0 24px 60px rgba(0,0,0,0.7)",
          overflow: "hidden",
        }}>

          {/* HEADER */}
          <div style={{
            padding: "14px 16px",
            borderBottom: "1px solid rgba(212,175,55,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(212,175,55,0.04)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "radial-gradient(circle, #d4af37, #8a6914)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
                boxShadow: "0 0 12px rgba(212,175,55,0.4)",
              }}>🎩</div>
              <div>
                <div style={{ fontWeight: "800", fontSize: "13px", color: "#f5e27a", letterSpacing: "0.5px" }}>THE RINGMAN</div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
                  <span style={{ fontSize: "10px", color: "#4b5563", letterSpacing: "1px", textTransform: "uppercase" }}>
                    {loading ? "Thinking..." : "Online · " + page}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {marketPoints !== null && (
                <div style={{ fontSize: "10px", color: "#4b5563", letterSpacing: "1px" }}>
                  {marketPoints} data pts
                </div>
              )}
              {predAccuracy !== null && (
                <div style={{ fontSize: "10px", color: "#10b981", letterSpacing: "1px" }}>
                  {predAccuracy}% accurate
                </div>
              )}
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#4b5563", fontSize: "18px", cursor: "pointer", padding: "2px 4px", lineHeight: 1 }}>✕</button>
            </div>
          </div>

          {/* MESSAGES */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(212,175,55,0.2) transparent",
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: "8px",
              }}>
                {msg.role === "ringman" && (
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "radial-gradient(circle, #d4af37, #8a6914)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0 }}>🎩</div>
                )}
                <div style={{
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: msg.role === "user"
                    ? "rgba(0,229,255,0.1)"
                    : "rgba(212,175,55,0.07)",
                  border: msg.role === "user"
                    ? "1px solid rgba(0,229,255,0.2)"
                    : "1px solid rgba(212,175,55,0.2)",
                  fontSize: "13px",
                  lineHeight: "1.7",
                  color: msg.role === "user" ? "#e2e8f0" : "#e8d5a3",
                  fontFamily: msg.role === "ringman" ? "'Georgia', serif" : "inherit",
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "radial-gradient(circle, #d4af37, #8a6914)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>🎩</div>
                <div style={{ padding: "10px 16px", background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "14px 14px 14px 4px", display: "flex", gap: "5px", alignItems: "center" }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: "50%", background: "#d4af37",
                      animation: `bounce 1.2s ${i * 0.2}s infinite`,
                      opacity: 0.7,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div style={{
            padding: "12px 14px",
            borderTop: "1px solid rgba(212,175,55,0.1)",
            display: "flex",
            gap: "8px",
            background: "rgba(0,0,0,0.3)",
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask The Ringman..."
              rows={1}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: "8px",
                color: "white",
                padding: "10px 12px",
                fontSize: "13px",
                resize: "none",
                outline: "none",
                fontFamily: "inherit",
                lineHeight: "1.5",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: 42, height: 42,
                borderRadius: "8px",
                background: loading || !input.trim()
                  ? "rgba(212,175,55,0.2)"
                  : "linear-gradient(135deg, #d4af37, #b8941e)",
                border: "none",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                color: "#0d0d12",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s",
                boxShadow: !loading && input.trim() ? "0 0 12px rgba(212,175,55,0.3)" : "none",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
