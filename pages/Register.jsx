import { useState, useEffect } from "react";

const ROLES = [
  { id: "buyer", label: "Buyer", desc: "Browse and bid on vehicles" },
  { id: "seller", label: "Seller", desc: "List and sell vehicles" },
  { id: "both", label: "Buyer + Seller", desc: "Full marketplace access", default: true },
  { id: "accounting", label: "Accounting", desc: "Invoices and payments" },
  { id: "title", label: "Title Clerk", desc: "Title and transfer tracking" },
  { id: "logistics", label: "Logistics", desc: "Transport and shipping" },
  { id: "arbitration", label: "Arbitration", desc: "Dispute management" },
  { id: "sales_manager", label: "Sales Manager", desc: "Reporting and oversight" },
];

const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

export default function Register() {
  useEffect(() => {
    document.title = "Create Your Account — Join Ringman's AI Free";
    const setMeta = (name, content, prop = "name") => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Register as an independent dealer, dealer group, or private seller. Free to join. AI-powered wholesale auctions, integrity scoring, and built-in transport. Get started today.");
    setMeta("robots", "index, follow");
    setMeta("og:title", "Create Your Account — Join Ringman's AI Free", "property");
    setMeta("og:description", "Register as an independent dealer, dealer group, or private seller. Free to join. AI-powered wholesale auctions, integrity scoring, and built-in transport. Get started today.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "The Ringman's AI", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Create Your Account — Join Ringman's AI Free");
    setMeta("twitter:description", "Register as an independent dealer, dealer group, or private seller. Free to join. AI-powered wholesale auctions, integrity scoring, and built-in transport. Get started today.");
  }, []);

  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null); // 'dealer' | 'group' | 'private'
  const [formData, setFormData] = useState({
    // Company
    businessName: "", dealerLicense: "", state: "", city: "", address: "", phone: "",
    // Role
    roles: ["both"],
    // Personal
    fullName: "", email: "", password: "", confirmPassword: "",
    // Agreement
    agreed: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key, val) => setFormData(p => ({ ...p, [key]: val }));
  const toggleRole = (id) => {
    setFormData(p => {
      if (id === "both") return { ...p, roles: ["both"] };
      const current = p.roles.filter(r => r !== "both");
      return { ...p, roles: current.includes(id) ? current.filter(r => r !== id) : [...current, id] };
    });
  };

  const totalSteps = userType === "private" ? 3 : 4;

  const validate = () => {
    const e = {};
    if (step === 2 && userType !== "private") {
      if (!formData.businessName) e.businessName = "Required";
      if (!formData.dealerLicense) e.dealerLicense = "Required";
      if (!formData.state) e.state = "Required";
      if (!formData.phone) e.phone = "Required";
    }
    if ((step === 3 && userType === "private") || (step === 4 && userType !== "private")) {
      if (!formData.fullName) e.fullName = "Required";
      if (!formData.email || !formData.email.includes("@")) e.email = "Valid email required";
      if (!formData.password || formData.password.length < 8) e.password = "Min 8 characters";
      if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords don't match";
      if (!formData.agreed) e.agreed = "You must agree to continue";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);
  const submit = () => { if (validate()) setSubmitted(true); };

  const inputStyle = (key) => ({
    width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${errors[key] ? "#ef4444" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 8, color: "white", padding: "12px 14px", fontSize: 14, outline: "none", boxSizing: "border-box",
  });
  const labelStyle = { fontSize: 11, color: "#6b7280", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 };
  const errorStyle = { fontSize: 12, color: "#ef4444", marginTop: 4 };

  if (submitted) return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 480, padding: 40 }}>
        <div style={{ fontSize: 72, marginBottom: 24 }}>🎩</div>
        <h1 style={{ fontSize: 36, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 16px" }}>Welcome to the ring.</h1>
        <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
          {userType === "private"
            ? "Your account is ready. Start by listing your vehicle and let dealers compete for it."
            : "Your account is ready. The Ringman's AI platform is yours — start exploring the run list, listing vehicles, and building your integrity score."}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a href="/RunList" style={{ padding: "16px", borderRadius: 8, background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", fontWeight: 800, fontSize: 16, textDecoration: "none" }}>Browse the Run List →</a>
          {userType !== "private" && <a href="/VehicleIntake" style={{ padding: "16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", color: "#d1d5db", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>List a Vehicle</a>}
          {userType === "private" && <a href="/SellYourCar" style={{ padding: "16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", color: "#d1d5db", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Sell My Vehicle</a>}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080810", minHeight: "100vh", color: "white" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, background: "rgba(8,8,16,0.95)" }}>
        <a href="/" style={{ fontFamily: "'Georgia',serif", fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#f59e0b,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>🎩 The Ringman's AI</a>
        <a href="/" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>Already have an account? <span style={{ color: "#06b6d4" }}>Sign In</span></a>
      </nav>

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "60px 24px 100px" }}>

        {/* Progress bar */}
        {userType && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: step > i + 1 ? "#10b981" : step === i + 1 ? "#06b6d4" : "rgba(255,255,255,0.06)", border: `2px solid ${step > i + 1 ? "#10b981" : step === i + 1 ? "#06b6d4" : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: step >= i + 1 ? "white" : "#4b5563" }}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1, position: "relative", marginTop: 4 }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 1, background: "linear-gradient(90deg,#06b6d4,#8b5cf6)", width: `${((step - 1) / (totalSteps - 1)) * 100}%`, transition: "width 0.4s ease" }} />
            </div>
          </div>
        )}

        {/* STEP 1 — Who are you? */}
        {step === 1 && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 16 }}>GET STARTED</div>
            <h1 style={{ fontSize: 36, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 12px" }}>Who are you?</h1>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 40, lineHeight: 1.7 }}>This determines your registration path and what features you'll have access to.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { id: "dealer", icon: "🏪", title: "Independent Dealer", desc: "Single dealership, small to mid-size lot. Buyer, seller, or both.", color: "#06b6d4" },
                { id: "group", icon: "🏢", title: "Dealer Group", desc: "Multiple rooftops, team management, volume buying and selling.", color: "#8b5cf6" },
                { id: "private", icon: "👤", title: "Private Seller / Buyer", desc: "No dealer license. Sell your personal vehicle or buy from dealers.", color: "#10b981" },
              ].map(t => (
                <div key={t.id} onClick={() => { setUserType(t.id); setStep(2); }}
                  style={{ background: userType === t.id ? `rgba(${t.color === "#06b6d4" ? "6,182,212" : t.color === "#8b5cf6" ? "139,92,246" : "16,185,129"},0.08)` : "rgba(255,255,255,0.02)", border: `2px solid ${userType === t.id ? t.color : "rgba(255,255,255,0.06)"}`, borderRadius: 12, padding: "20px 24px", cursor: "pointer", display: "flex", gap: 16, alignItems: "center", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = t.color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = userType === t.id ? t.color : "rgba(255,255,255,0.06)"}>
                  <div style={{ fontSize: 36 }}>{t.icon}</div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>{t.title}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>{t.desc}</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: t.color, fontSize: 20 }}>→</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — Company Info (dealer/group) or skip to step 3 for private */}
        {step === 2 && userType !== "private" && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 16 }}>STEP 2 OF {totalSteps}</div>
            <h2 style={{ fontSize: 30, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Your Dealership</h2>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 32 }}>This is your company's profile on the platform.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={labelStyle}>Business Name *</label>
                <input value={formData.businessName} onChange={e => update("businessName", e.target.value)} placeholder="Smith Auto Group" style={inputStyle("businessName")} />
                {errors.businessName && <div style={errorStyle}>{errors.businessName}</div>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Dealer License # *</label>
                  <input value={formData.dealerLicense} onChange={e => update("dealerLicense", e.target.value)} placeholder="DL-123456" style={inputStyle("dealerLicense")} />
                  {errors.dealerLicense && <div style={errorStyle}>{errors.dealerLicense}</div>}
                </div>
                <div>
                  <label style={labelStyle}>State *</label>
                  <select value={formData.state} onChange={e => update("state", e.target.value)} style={{ ...inputStyle("state"), cursor: "pointer" }}>
                    <option value="" style={{ background: "#1a1a2e" }}>Select State</option>
                    {STATES.map(s => <option key={s} value={s} style={{ background: "#1a1a2e" }}>{s}</option>)}
                  </select>
                  {errors.state && <div style={errorStyle}>{errors.state}</div>}
                </div>
              </div>
              <div>
                <label style={labelStyle}>City</label>
                <input value={formData.city} onChange={e => update("city", e.target.value)} placeholder="Tulsa" style={inputStyle("city")} />
              </div>
              <div>
                <label style={labelStyle}>Address</label>
                <input value={formData.address} onChange={e => update("address", e.target.value)} placeholder="1234 Auto Row Blvd" style={inputStyle("address")} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input value={formData.phone} onChange={e => update("phone", e.target.value)} placeholder="(555) 123-4567" style={inputStyle("phone")} />
                {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 32 }}>
              <button onClick={back} style={{ padding: "14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>← Back</button>
              <button onClick={next} style={{ padding: "14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", cursor: "pointer", fontSize: 15, fontWeight: 800 }}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 3 — Role Selection (dealer/group only) */}
        {step === 3 && userType !== "private" && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 16 }}>STEP 3 OF {totalSteps}</div>
            <h2 style={{ fontSize: 30, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Your Role</h2>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 32 }}>What will you be doing on the platform? You can always adjust this later in settings.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
              {ROLES.map(r => {
                const selected = formData.roles.includes(r.id);
                return (
                  <div key={r.id} onClick={() => toggleRole(r.id)}
                    style={{ background: selected ? "rgba(6,182,212,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${selected ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.06)"}`, borderRadius: 8, padding: "14px 16px", cursor: "pointer", transition: "all 0.15s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: selected ? "#06b6d4" : "#d1d5db" }}>{r.label}</span>
                      <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${selected ? "#06b6d4" : "rgba(255,255,255,0.15)"}`, background: selected ? "#06b6d4" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {selected && <span style={{ fontSize: 10, color: "white", fontWeight: 900 }}>✓</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: "#4b5563" }}>{r.desc}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button onClick={back} style={{ padding: "14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>← Back</button>
              <button onClick={next} style={{ padding: "14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white", cursor: "pointer", fontSize: 15, fontWeight: 800 }}>Continue →</button>
            </div>
          </div>
        )}

        {/* FINAL STEP — Login + Agreement */}
        {((step === 3 && userType === "private") || (step === 4 && userType !== "private")) && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#06b6d4", marginBottom: 16 }}>ALMOST THERE</div>
            <h2 style={{ fontSize: 30, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Create Your Login</h2>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 32 }}>This is your personal account — even if you're part of a dealership team.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input value={formData.fullName} onChange={e => update("fullName", e.target.value)} placeholder="John Smith" style={inputStyle("fullName")} />
                {errors.fullName && <div style={errorStyle}>{errors.fullName}</div>}
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input type="email" value={formData.email} onChange={e => update("email", e.target.value)} placeholder="john@smithauto.com" style={inputStyle("email")} />
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </div>
              <div>
                <label style={labelStyle}>Password * (min 8 characters)</label>
                <input type="password" value={formData.password} onChange={e => update("password", e.target.value)} placeholder="••••••••" style={inputStyle("password")} />
                {errors.password && <div style={errorStyle}>{errors.password}</div>}
              </div>
              <div>
                <label style={labelStyle}>Confirm Password *</label>
                <input type="password" value={formData.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} placeholder="••••••••" style={inputStyle("confirmPassword")} />
                {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
              </div>

              {/* Agreement */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${errors.agreed ? "#ef4444" : "rgba(255,255,255,0.06)"}`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.8, marginBottom: 16 }}>
                  By creating an account you agree to the <span style={{ color: "#06b6d4" }}>Platform Membership Agreement</span>, <span style={{ color: "#06b6d4" }}>Seller Disclosure Policy</span>, <span style={{ color: "#06b6d4" }}>Arbitration Policy</span>, and <span style={{ color: "#06b6d4" }}>Auto-Billing Authorization</span>. You certify you hold a valid dealer license (if registering as a dealer) and that all information provided is accurate.
                </div>
                <div onClick={() => update("agreed", !formData.agreed)}
                  style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${formData.agreed ? "#06b6d4" : "rgba(255,255,255,0.2)"}`, background: formData.agreed ? "#06b6d4" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {formData.agreed && <span style={{ fontSize: 12, color: "white", fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 14, color: "#d1d5db", fontWeight: 600 }}>I agree to all terms and policies</span>
                </div>
                {errors.agreed && <div style={{ ...errorStyle, marginTop: 8 }}>{errors.agreed}</div>}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 28 }}>
              <button onClick={back} style={{ padding: "14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>← Back</button>
              <button onClick={submit} style={{ padding: "14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#10b981,#059669)", color: "white", cursor: "pointer", fontSize: 15, fontWeight: 800 }}>Create Account 🎩</button>
            </div>
          </div>
        )}

        {/* Private seller step 2 — just login, skip company/role */}
        {step === 2 && userType === "private" && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#10b981", marginBottom: 16 }}>STEP 2 OF 3</div>
            <h2 style={{ fontSize: 30, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>About You</h2>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 32 }}>No dealer license needed. Just your name, email, and a password.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input value={formData.fullName} onChange={e => update("fullName", e.target.value)} placeholder="John Smith" style={inputStyle("fullName")} />
                {errors.fullName && <div style={errorStyle}>{errors.fullName}</div>}
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input type="email" value={formData.email} onChange={e => update("email", e.target.value)} placeholder="john@email.com" style={inputStyle("email")} />
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </div>
              <div>
                <label style={labelStyle}>Password *</label>
                <input type="password" value={formData.password} onChange={e => update("password", e.target.value)} placeholder="••••••••" style={inputStyle("password")} />
                {errors.password && <div style={errorStyle}>{errors.password}</div>}
              </div>
              <div>
                <label style={labelStyle}>Confirm Password *</label>
                <input type="password" value={formData.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} placeholder="••••••••" style={inputStyle("confirmPassword")} />
                {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 28 }}>
              <button onClick={back} style={{ padding: "14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>← Back</button>
              <button onClick={next} style={{ padding: "14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#10b981,#059669)", color: "white", cursor: "pointer", fontSize: 15, fontWeight: 800 }}>Continue →</button>
            </div>
          </div>
        )}

        {/* Private step 3 — agreement */}
        {step === 3 && userType === "private" && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#10b981", marginBottom: 16 }}>STEP 3 OF 3</div>
            <h2 style={{ fontSize: 30, fontWeight: 900, fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Almost Done</h2>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 32 }}>Review and agree to the platform terms.</p>
            <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${errors.agreed ? "#ef4444" : "rgba(255,255,255,0.06)"}`, borderRadius: 10, padding: 20, marginBottom: 28 }}>
              <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.8, marginBottom: 16 }}>
                By creating an account you agree to the <span style={{ color: "#10b981" }}>Platform Terms</span>, <span style={{ color: "#10b981" }}>Seller Disclosure Policy</span>, and <span style={{ color: "#10b981" }}>Arbitration Policy</span>. If selling a vehicle, you agree to complete a full inspection and honest disclosure report. Misrepresentation may result in account suspension.
              </div>
              <div onClick={() => update("agreed", !formData.agreed)} style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${formData.agreed ? "#10b981" : "rgba(255,255,255,0.2)"}`, background: formData.agreed ? "#10b981" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {formData.agreed && <span style={{ fontSize: 12, color: "white", fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{ fontSize: 14, color: "#d1d5db", fontWeight: 600 }}>I agree to all terms and policies</span>
              </div>
              {errors.agreed && <div style={{ ...errorStyle, marginTop: 8 }}>{errors.agreed}</div>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button onClick={back} style={{ padding: "14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>← Back</button>
              <button onClick={submit} style={{ padding: "14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#10b981,#059669)", color: "white", cursor: "pointer", fontSize: 15, fontWeight: 800 }}>Create Account 🎩</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
