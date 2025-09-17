// src/pages/PaymentCallback.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

export default function PaymentCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref") || params.get("reference");

    if (!reference) {
      setMessage("No payment reference found. Redirecting to login...");
      setTimeout(() => navigate("/"), 2500);
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/subscription/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });
        const data = await res.json();
        if (!res.ok) {
          setMessage(data.message || "Payment verification failed");
          // optionally redirect back to subscribe page:
          setTimeout(() => navigate("/"), 3500);
          return;
        }
        setMessage("Payment verified. Please login.");
        setTimeout(() => navigate("/"), 2000);
      } catch (err) {
        setMessage("Verification error. Try login and check subscription.");
        setTimeout(() => navigate("/"), 3000);
      }
    })();
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "url('/assets/BACKGROUND.PNG') center/cover no-repeat" }}>
      <div style={{ background: "rgba(0,0,0,0.7)", padding: 24, borderRadius: 12, color: "#fff" }}>
        <p>{message}</p>
      </div>
    </div>
  );
}
