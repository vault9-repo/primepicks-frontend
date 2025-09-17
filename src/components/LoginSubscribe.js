// src/components/LoginSubscribe.js
import React, { useState } from "react";
import { API_BASE } from "../config";

export default function LoginSubscribe({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const packages = [
    { plan: "daily", label: "Daily - 50 KES" },
    { plan: "weekly", label: "Weekly - 300 KES" },
    { plan: "biweekly", label: "Biweekly - 600 KES" },
    { plan: "monthly", label: "Monthly - 1000 KES" },
  ];

  // Handle login
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.token);
        if (onLoginSuccess) onLoginSuccess();
      }
    } catch (err) {
      setMessage("Login error");
    } finally {
      setLoading(false);
    }
  }

  // Handle subscription & payment
  async function handleSubscribeInit(e) {
    e.preventDefault();
    setMessage("");
    if (!email || !password) return setMessage("Please fill email & password");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/subscription/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, plan }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Failed to start payment");
        setLoading(false);
        return;
      }
      window.location.href = data.authorization_url;
    } catch (err) {
      console.error(err);
      setMessage("Error starting payment");
      setLoading(false);
    }
  }

  // Inline styles
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('/assets/BACKGROUND.PNG')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const cardStyle = {
    background: "rgba(0,0,0,0.7)",
    padding: "24px",
    borderRadius: "12px",
    color: "#fff",
    minWidth: "320px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "12px" }}>
          {isLogin ? "Login" : "Subscribe"}
        </h2>

        <form
          onSubmit={isLogin ? handleLogin : handleSubscribeInit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />

          {!isLogin && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {packages.map((p) => (
                <button
                  type="button"
                  key={p.plan}
                  onClick={() => setPlan(p.plan)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      plan === p.plan
                        ? "#3498db"
                        : "rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                  disabled={loading}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "#2ecc71",
              color: "#fff",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <div
                style={{
                  width: 18,
                  height: 18,
                  border: "3px solid #f3f3f3",
                  borderTop: "3px solid #3498db",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
            ) : isLogin ? (
              "Login"
            ) : (
              "Pay & Subscribe"
            )}
          </button>
        </form>

        <p style={{ marginTop: 12, textAlign: "center" }}>
          {isLogin ? "No account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "#3498db", cursor: "pointer" }}
          >
            {isLogin ? "Subscribe" : "Login"}
          </span>
        </p>

        {message && (
          <p style={{ color: "salmon", marginTop: 8, textAlign: "center" }}>
            {message}
          </p>
        )}

        {/* Spinner animation */}
        <style>
          {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
        </style>
      </div>
    </div>
  );
}
