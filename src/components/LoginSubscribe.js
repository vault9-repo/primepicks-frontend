import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

function LoginSubscribe() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("daily");
  const [isLogin, setIsLogin] = useState(true); // toggle form
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle user login
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      setMessage("Login successful! Redirecting...");
      console.log(res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle user subscription
  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/subscription/subscribe`, { email, password, plan });
      const paymentUrl = res.data.payment_url;
      window.location.href = paymentUrl; // redirect to Paystack
    } catch (err) {
      setMessage(err.response?.data?.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  // Subscription plans
  const plans = [
    { key: "daily", label: "Daily - 50 KES" },
    { key: "weekly", label: "Weekly - 300 KES" },
    { key: "biweekly", label: "Biweekly - 600 KES" },
    { key: "monthly", label: "Monthly - 1000 KES" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/assets/BACKGROUND.PNG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)", // black glassy
          padding: "30px",
          borderRadius: "15px",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
          color: "#fff",
        }}
      >
        <h2>{isLogin ? "Login" : "Subscribe"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: "block",
            margin: "10px auto",
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            margin: "10px auto",
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        {!isLogin && (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", margin: "15px 0" }}>
            {plans.map((p) => (
              <button
                key={p.key}
                onClick={() => setPlan(p.key)}
                style={{
                  flex: "1 1 45%",
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor: plan === p.key ? "#007bff" : "rgba(255,255,255,0.1)",
                  color: plan === p.key ? "#fff" : "#fff",
                  border: "none",
                  borderRadius: "8px",
                  transition: "0.3s",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={isLogin ? handleLogin : handleSubscribe}
          disabled={loading}
          style={{
            margin: "10px auto",
            padding: "10px 20px",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <div
              style={{
                border: "3px solid rgba(255,255,255,0.3)",
                borderTop: "3px solid #fff",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                animation: "spin 1s linear infinite",
              }}
            ></div>
          ) : (
            isLogin ? "Login" : "Subscribe & Pay"
          )}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{ cursor: "pointer", color: "#00f", marginTop: "15px" }}
        >
          {isLogin ? "New user? Subscribe here" : "Already have an account? Login"}
        </p>

        {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoginSubscribe;
