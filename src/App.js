import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSubscribe from "./components/LoginSubscribe";
import PaymentCallback from "./pages/PaymentCallback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSubscribe />} />
        <Route path="/payment-callback" element={<PaymentCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
