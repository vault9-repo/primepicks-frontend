// src/pages/PaymentCallback.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: verify payment with backend
    // axios.get(`${API_BASE}/subscription/verify?reference=${reference}`)

    // Redirect to login page with success state
    const timer = setTimeout(() => {
      navigate("/", { state: { paymentSuccess: true } });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Payment Successful!</h2>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default PaymentCallback;
