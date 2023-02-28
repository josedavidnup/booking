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
      console.log(response);

      if (response.data) {
        console.log(response);
        window.localStorage.setItem("auth", JSON.stringify(response.data));
        dispatch(logInUser(response.data));
        toast.success("Login user success!");
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response);
    }
  };
  return (
    <>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
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
