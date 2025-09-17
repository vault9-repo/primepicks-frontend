import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

function LoginSubscribe() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("daily");
  const [isLogin, setIsLogin] = useState(true); // toggle form
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // new loading state

  // Handle user login
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      setMessage("Login successful! Redirecting...");
      console.log(res.data.token);
      // TODO: Redirect to dashboard when ready
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
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2>{isLogin ? "Login" : "Subscribe"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", margin: "10px auto", width: "100%", padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", margin: "10px auto", width: "100%", padding: "10px" }}
        />

        {!isLogin && (
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            style={{ margin: "10px auto", width: "100%", padding: "10px" }}
          >
            <option value="daily">Daily - 50 KES</option>
            <option value="weekly">Weekly - 300 KES</option>
            <option value="biweekly">Biweekly - 600 KES</option>
            <option value="monthly">Monthly - 1000 KES</option>
          </select>
        )}

        <button
          onClick={isLogin ? handleLogin : handleSubscribe}
          disabled={loading} // disable during loading
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
                border: "3px solid #f3f3f3",
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
          style={{ cursor: "pointer", color: "blue", marginTop: "15px" }}
        >
          {isLogin ? "New user? Subscribe here" : "Already have an account? Login"}
        </p>

        {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
      </div>

      {/* Spinner animation */}
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
