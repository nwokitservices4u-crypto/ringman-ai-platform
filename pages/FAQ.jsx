import { useState } from "react";
import RingmanAI from "../components/RingmanAI.jsx";
import Nav from "../components/Nav.jsx";
import { Link } from "react-router-dom";

const LOGO = "https://media.base44.com/images/public/69cecf03f993d438c489b18c/9e6040534_generated_image.png";

const FAQS = [
  {
    category: "Getting Started", icon: "🚀",
    questions: [
      { q: "What is The Ringman's AI?", a: "The Ringman's AI is a dealer-to-dealer wholesale auto auction platform powered by artificial intelligence. It combines live simulcast bidding, AI-generated pricing and condition reports, automated IF-SALE post-auction negotiations, and a full post-sale workflow into one unified platform. Built exclusively for licensed dealers." },
      { q: "Who can use the platform?", a: "Licensed auto dealers only. Whether you're buying, selling, or both — you must hold a valid state dealer license to register. This keeps the marketplace professional, competitive, and free of retail interference." },
      { q: "How do I get started?", a: "Click 'Register' and complete the 3-step registration form. You'll need your dealer license number, business contact info, and a payment method. Approval takes 1–2 business days while we verify your license. Once approved, you can browse the run list, bid on vehicles, and list your own inventory immediately." },
      { q: "Is there a registration fee?", a: "No upfront registration fee. The platform charges a buyer premium (a percentage added to the hammer price for buyers) and a flat seller fee per vehicle sold. Pricing is displayed clearly during auction registration — no hidden fees." },
      { q: "What states do you operate in?", a: "The Ringman's AI is a nationwide digital platform. Any licensed dealer in the United States can register. Auctions run online so geography is never a barrier — buy or sell from anywhere." },
    ]
  },
  {
    category: "Buying at Auction", icon: "🛒",
    questions: [
      { q: "How does bidding work?", a: "When an auction goes live, registered dealers bid in real time from any device. You'll see the current high bid, a countdown timer, and the full bid history. Click 'Quick Bid' to jump to the next increment automatically, enter a custom amount, or set a proxy bid to auto-compete up to your maximum." },
      { q: "What is a proxy bid?", a: "A proxy bid lets you set your maximum price and walk away. The system automatically bids on your behalf in the smallest increment needed to stay winning — up to your cap. You only pay what's necessary to beat the competition, not necessarily your maximum. Great for busy dealers who can't watch every lot." },
      { q: "What are the bid increments?", a: "Standard increments: $100 under $1,000 · $250 from $1,000–$5,000 · $500 from $5,000–$10,000 · $1,000 from $10,000–$25,000 · $2,500 above $25,000. The auctioneer can adjust increments in real time during a live sale." },
      { q: "What is the buyer premium?", a: "The buyer premium is a percentage fee added on top of the hammer price, paid by the buyer. Example: $12,000 hammer price with a 5% buyer premium = $12,600 total due. Always displayed clearly before you bid — no surprises." },
      { q: "What is a Flash Auction?", a: "A Flash Auction is a 20-minute dealer-to-dealer auction. Vehicles go live at a scheduled time and close exactly 20 minutes later. Fast, focused, creates real bidding urgency. Perfect for dealers who want quick transactions without a long auction day." },
      { q: "What happens when I win?", a: "When you win, a transaction record is created automatically and an invoice is generated with the hammer price, buyer premium, and total due. Payment, title transfer, and transport can all be arranged through the platform." },
    ]
  },
  {
    category: "Selling at Auction", icon: "💰",
    questions: [
      { q: "How do I list a vehicle?", a: "Click 'Sell a Car' and complete the 4-step intake flow: (1) Enter your VIN — our decoder auto-fills year/make/model/trim/engine from NHTSA. (2) Complete the condition report and damage notes. (3) Run AI pricing — get an instant market estimate and suggested floor price. (4) Review and submit. Your listing enters the admin approval queue." },
      { q: "What is the floor price?", a: "The floor price is the minimum you're willing to accept. Bidding can happen below your floor, but the vehicle won't sell unless bids reach it. If bidding falls short, the IF-SALE engine activates automatically — giving the highest bidder a chance to negotiate with you post-auction." },
      { q: "How does AI pricing work?", a: "Our AI pricing engine analyzes your vehicle's year, make, model, mileage, condition grade, and current wholesale market trends to generate an estimated market value and suggested floor price (typically 88% of estimated value). It also writes a professional lot description. You can override the floor price manually." },
      { q: "What is the seller fee?", a: "A flat fee per vehicle sold, deducted from your proceeds. The fee is set by the auction house and displayed clearly when your vehicle is listed. No charge if your vehicle doesn't sell." },
      { q: "What photos should I upload?", a: "Best practice: front 3/4, rear 3/4, driver side, passenger side, engine bay, interior dashboard, odometer, and any damage areas. Good photos directly correlate to higher sale prices. Multi-angle coverage builds buyer confidence and reduces disputes." },
    ]
  },
  {
    category: "IF-SALE Negotiations", icon: "🤝",
    questions: [
      { q: "What is IF-SALE?", a: "IF-SALE is an automated post-auction negotiation tool. When a vehicle doesn't meet its floor price at auction, the platform automatically initiates a negotiation between the highest bidder and the seller. Both parties can counter back and forth — entirely through the platform — with no auction staff involvement required." },
      { q: "How does IF-SALE work step by step?", a: "(1) Auction closes below reserve. (2) The highest bidder is presented with an IF-SALE offer option. (3) Buyer submits an offer. (4) Seller is notified and can accept, decline, or counter. (5) Buyer can counter back. This continues until a deal is reached or the offer expires. All automated — no staff needed." },
      { q: "How long does an IF-SALE offer last?", a: "IF-SALE offers have a time limit set by the auction house — typically 24 hours. If no agreement is reached before expiration, the offer closes as Expired and the vehicle is marked Unsold. The seller can then re-list it in the next auction." },
    ]
  },
  {
    category: "Post-Sale & Logistics", icon: "📦",
    questions: [
      { q: "How does payment work after a sale?", a: "After a sale, the buyer receives an invoice with the hammer price, buyer premium, and total due. Accepted payment methods include ACH (bank transfer), debit card, and floor plan financing (NextGear, AFC, Dealer Line, etc.). Payment status is tracked as Pending → Paid." },
      { q: "How does title transfer work?", a: "Title status is tracked per transaction: Pending → In Transit → Received → Transferred. Both buyer and seller have full visibility into title location at all times. If an issue arises, it can be flagged for arbitration." },
      { q: "Does the platform handle transport?", a: "Yes. Transport status is tracked per transaction: Not Arranged → Scheduled → In Transit → Delivered. Arrange transport through your own carrier or a platform-recommended provider. The provider name is logged in the transaction record." },
      { q: "What is arbitration?", a: "Arbitration lets a buyer dispute a purchase if undisclosed damage or issues are discovered after delivery. The buyer submits a claim through the platform. The admin reviews and makes a decision: uphold the sale or void it. Arbitration protects both parties and incentivizes honest condition reporting." },
    ]
  },
];

export default function FAQ() {
  const [open, setOpen] = useState({});
  const toggle = (ci, qi) => setOpen(o => ({ ...o, [`${ci}-${qi}`]: !o[`${ci}-${qi}`] }));

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>
      <Nav />

      {/* HEADER */}
      <div style={{ background: "rgba(16,185,129,0.03)", borderBottom: "1px solid rgba(16,185,129,0.1)", padding: "60px 32px 52px", textAlign: "center" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <img src={LOGO} alt="" style={{ width: 52, height: 52, borderRadius: "4px", objectFit: "cover", marginBottom: "20px", border: "1px solid rgba(16,185,129,0.3)" }} />
          <h1 style={{ fontSize: "36px", fontWeight: "900", margin: "0 0 12px" }}>Frequently Asked Questions</h1>
          <p style={{ color: "#6b7280", fontSize: "16px", margin: "0 0 8px", lineHeight: "1.65" }}>
            Everything you need to know about The Ringman's AI — buying, selling, IF-SALE negotiations, post-sale workflow, and how the platform works.
          </p>
          <p style={{ color: "#4b5563", fontSize: "13px" }}>
            Can't find what you're looking for? &nbsp;
            <Link to="/Dealers" style={{ color: "#10b981", textDecoration: "none", fontWeight: "600" }}>Contact us via the dealer registration form</Link>.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "52px 32px 80px" }}>
        {FAQS.map((section, ci) => (
          <div key={section.category} style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <span style={{ fontSize: "22px" }}>{section.icon}</span>
              <h2 style={{ fontSize: "20px", fontWeight: "900", margin: 0, color: "#10b981" }}>{section.category}</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {section.questions.map((faq, qi) => (
                <div key={qi} style={{ background: "rgba(16,185,129,0.03)", border: `1px solid ${open[`${ci}-${qi}`] ? "rgba(16,185,129,0.25)" : "rgba(16,185,129,0.1)"}`, borderRadius: "4px", overflow: "hidden", transition: "border-color 0.2s" }}>
                  <button onClick={() => toggle(ci, qi)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "transparent", border: "none", cursor: "pointer", color: "white", textAlign: "left", gap: "12px" }}>
                    <span style={{ fontWeight: "700", fontSize: "15px", lineHeight: "1.4" }}>{faq.q}</span>
                    <span style={{ color: "#10b981", fontSize: "18px", fontWeight: "300", flexShrink: 0 }}>{open[`${ci}-${qi}`] ? "−" : "+"}</span>
                  </button>
                  {open[`${ci}-${qi}`] && (
                    <div style={{ padding: "0 20px 18px", fontSize: "14px", color: "#6b7280", lineHeight: "1.75" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", padding: "32px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>🔨</div>
          <div style={{ fontWeight: "900", fontSize: "20px", marginBottom: "10px" }}>Ready to get started?</div>
          <p style={{ color: "#6b7280", marginBottom: "24px", fontSize: "14px", lineHeight: "1.65" }}>Register your dealership and access the full platform — live bidding, AI pricing, run list, IF-SALE, and post-sale workflow. No upfront fees.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/Dealers" style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white", padding: "13px 28px", borderRadius: "4px", textDecoration: "none", fontWeight: "700" }}>Register as a Dealer →</Link>
            <Link to="/RunList" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", padding: "13px 24px", borderRadius: "4px", textDecoration: "none", fontWeight: "700" }}>Browse Run List</Link>
          </div>
        </div>
      </div>

      <RingmanAI page="FAQ" />
    </div>
  );
}
