import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerification = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("OTP verified!");
        if (onVerified) onVerified();
        setTimeout(() => {
          navigate("/userdashboard");
        }, 1000);
      } else {
        setError(data.message || "OTP verification failed");
      }
    } catch (err) {
      setError("Server error");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", background: "#fff" }}>
      <h2 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 16 }}>OTP Verification</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc", fontSize: 16, marginBottom: 16 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: 12, borderRadius: 8, background: "#007bff", color: "#fff", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: 17 }}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      {error && <div style={{ color: "red", textAlign: "center", marginTop: 12 }}>{error}</div>}
      {message && <div style={{ color: "green", textAlign: "center", marginTop: 12 }}>{message}</div>}
    </div>
  );
};

export default OtpVerification;
