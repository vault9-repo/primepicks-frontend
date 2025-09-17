import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // You can verify payment here with backend if needed
    // For now, just redirect to login
    navigate("/");
  }, [navigate]);

  return <p>Processing payment... Redirecting to login.</p>;
}

export default PaymentCallback;
