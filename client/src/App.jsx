import React from "react";
import Home from "./pages/booking/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes className="bg-slate-400 flex">
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
