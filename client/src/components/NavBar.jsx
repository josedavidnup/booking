import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../redux/slices/authUserSlice";

const NavBar = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logOutUser());
    window.localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="flex justify-around">
      <Link to={"/"}>Home</Link>
      {!auth.token && !auth.user ? (
        <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Sign Up</Link>
        </>
      ) : (
        <a onClick={logout}>Logout</a>
      )}
    </div>
  );
};

export default NavBar;
