import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSubscribe from "./components/LoginSubscribe";
import Dashboard from "./pages/Dashboard";
import PaymentCallback from "./pages/PaymentCallback";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const onLogin = () => setLoggedIn(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSubscribe onLoginSuccess={onLogin} />} />
        <Route path="/payment-callback" element={<PaymentCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
