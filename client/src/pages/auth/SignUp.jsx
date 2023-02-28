import React, { useState } from "react";
import SignUpForm from "../../components/forms/SignUpForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
    try {
      const response = await signup({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      console.log(response);
      toast.success("Signup user success. Please login");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <SignUpForm
          handleSubmit={handleSubmit}
          user={user}
          handleOnChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default SignUp;
