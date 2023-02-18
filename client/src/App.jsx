import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/booking/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes className="bg-slate-400 flex">
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer pauseOnFocusLoss={true} />
    </>
  );
}

export default App;
