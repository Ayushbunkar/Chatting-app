import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import OtpVerification from "../components/OtpVerification";

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "OTP sent! Please verify OTP to complete registration.");
        setShowOtp(true);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 p-6">
      <motion.div
        className="w-full max-w-md p-10 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/70 border border-gray-200"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-primary drop-shadow mb-6">
          Create Account ✨
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join us and start your chat journey today 🚀
        </p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        

        {!showOtp ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="input input-bordered w-full bg-white/80 focus:ring-2 focus:ring-primary rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full bg-white/80 focus:ring-2 focus:ring-primary rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="input input-bordered w-full bg-white/80 focus:ring-2 focus:ring-secondary rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="input input-bordered w-full bg-white/80 focus:ring-2 focus:ring-secondary rounded-xl"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="btn w-full bg-gradient-to-r from-primary to-secondary text-white text-lg rounded-xl shadow-lg hover:scale-105 transition"
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "🚀 Sign Up"}
            </motion.button>
          </form>
        ) : (
          <OtpVerification email={form.email} onVerified={() => setMessage("OTP verified! Account activated.")} />
        )}
        <p className="text-center text-gray-600 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-secondary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;