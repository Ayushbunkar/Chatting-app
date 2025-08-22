import React, { useState } from "react";
import { Link } from "react-router-dom";
import OtpVerification from "../components/OtpVerification";
// Google SVG icon
const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" style={{ marginRight: 8 }}>
    <g>
      <path fill="#4285F4" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.22l6.9-6.9C36.62 2.34 30.7 0 24 0 14.64 0 6.27 5.48 1.98 13.44l8.06 6.27C12.6 13.13 17.87 9.5 24 9.5z"/>
      <path fill="#34A853" d="M46.1 24.5c0-1.56-.14-3.07-.41-4.53H24v9.08h12.44c-.54 2.9-2.17 5.36-4.62 7.02l7.18 5.59C43.73 37.13 46.1 31.29 46.1 24.5z"/>
      <path fill="#FBBC05" d="M13.04 28.09c-.62-1.85-.98-3.81-.98-5.84s.36-3.99.98-5.84l-8.06-6.27C2.34 13.38 0 18.44 0 24c0 5.56 2.34 10.62 6.27 14.86l8.06-6.27z"/>
      <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.14 15.9-5.82l-7.18-5.59c-2.01 1.35-4.59 2.15-8.72 2.15-6.13 0-11.4-3.63-13.96-8.86l-8.06 6.27C6.27 42.52 14.64 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </g>
  </svg>
);

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful! Please verify OTP sent to your email.");
        setShowOtp(true);
        await fetch("http://localhost:5000/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email }),
        });
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error");
    }
    setLoading(false);
  };
  // Demo Google login handler
  const handleGoogleLogin = async () => {
    // Simulate Google user info (replace with real Google OAuth in production)
    const googleUser = {
      name: "Google User",
      email: "googleuser@example.com",
      googleId: "demo-google-id-123"
    };
    try {
      const res = await fetch("http://localhost:5000/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleUser),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Google login successful! Please verify OTP sent to your email.");
        setShowOtp(true);
        await fetch("http://localhost:5000/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: googleUser.email }),
        });
      } else {
        setError(data.message || "Google login failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <div style={{ width: "100%", maxWidth: 400, padding: 32, borderRadius: 18, boxShadow: "0 2px 16px rgba(0,0,0,0.10)", background: "#fff" }}>
        <h1 style={{ fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 18 }}>Sign In</h1>
        {error && <div style={{ color: "red", textAlign: "center", marginBottom: 12 }}>{error}</div>}
        {message && <div style={{ color: "green", textAlign: "center", marginBottom: 12 }}>{message}</div>}
        {!showOtp ? (
          <>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: "500" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc", fontSize: 16 }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: "500" }}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc", fontSize: 16 }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ width: "100%", padding: 12, borderRadius: 8, background: "#007bff", color: "#fff", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: 17 }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p style={{ textAlign: "center", marginTop: 18, fontSize: 15 }}>
              Don’t have an account? <Link to="/register">Sign Up</Link>
            </p>
            <hr style={{ margin: "28px 0 18px 0" }} />
            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{ width: "100%", padding: 12, borderRadius: 8, background: "#fff", color: "#444", fontWeight: "bold", border: "1px solid #db4437", cursor: "pointer", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <GoogleIcon /> Login with Google
            </button>
          </>
        ) : (
          <OtpVerification email={form.email || "googleuser@example.com"} onVerified={() => setMessage("OTP verified! Login complete.")} />
        )}
      </div>
    </div>
  );
}

export default LoginPage;