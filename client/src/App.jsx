import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/booking/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import NavBar from "./components/nav/NavBar";
import UserRoute from "./components/routes/UserRoute";
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
        <Route path="/user/*" element={<UserRoute />} />
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} />
    </>
  );
}

export default App;
