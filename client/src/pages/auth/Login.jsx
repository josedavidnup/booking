import React, { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../api/auth";
import LoginForm from "../../components/forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUser } from "../../redux/slices/authUserSlice";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.email, user.password);
    try {
      const response = await login({
        email: user.email,
        password: user.password,
      });

      if (response.data) {
        console.log(response.data);
        // console.log("Save in redux and save in local storage");
        window.localStorage.setItem("auth", JSON.stringify(response.data));
        dispatch(logInUser(response.data));
        toast.success("Login user success!");
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };
  return (
    <>
      <div>
        <h1>Login</h1>
      </div>
      <div>
        <LoginForm
          handleSubmit={handleSubmit}
          user={user}
          handleOnChange={handleOnChange}
        />
      </div>
    </>
  );
};

export default Login;
